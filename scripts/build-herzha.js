const process = require("node:process");
const path = require("node:path");
const fs = require("node:fs");

const chokidar = require("chokidar");

const formatters = require("../src/formatters");
const helpers = require("../src/helpers");
const { createResolverOptions } = require("../src/resolverHelpers");

const args = process.argv;
const isDev = args.includes("--dev");
const isView = args.includes("--view");
const isCleanup = args.includes("--cleanup");
const isNoPlugin = args.includes("--no-plugin");

const projectRoot = process.cwd();
const palettesDir = path.join(projectRoot, "src", "palettes");
const resolversDir = path.join(projectRoot, "src", "resolvers");
const adaptersDir = path.join(projectRoot, "src", "adapters");
const packagesDir = path.join(projectRoot, "packages");

function requireFresh(filepath, fresh = false) {
    if (fresh) {
        const resolved = require.resolve(filepath);

        if (require.cache[resolved]) {
            delete require.cache[resolved];
        }
    }

    return require(filepath);
}

function getAppName(filepath) {
    return helpers.toSlug(path.basename(filepath, path.extname(filepath)));
}

function requireResolver(resolverName, fresh = false) {
    const filepath = path.join(resolversDir, `${resolverName}.js`);
    const mod = requireFresh(filepath, fresh);

    if (typeof mod.resolveTheme !== "function") {
        throw new Error(
            `Resolver "${resolverName}" does not export a "resolveTheme" function`,
        );
    }

    return mod;
}

function loadPalette(filepath, fresh = false) {
    const paletteModule = requireFresh(filepath, fresh);
    try {
        helpers.validatePalette(paletteModule.palette, path.basename(filepath));
    } catch (err) {
        console.error(
            `[-] Skipping invalid palette "${path.basename(filepath)}":`,
            err.message,
        );
        return null;
    }

    if (fresh) {
        const { palette } = paletteModule;
        helpers.themeMetadataStore.set(palette.name, palette.appearance);
    }

    return paletteModule;
}

function getPalettes({ changedPaletteFilepath, changedResolver } = {}) {
    try {
        if (changedPaletteFilepath) {
            return [loadPalette(changedPaletteFilepath, true)].filter(Boolean);
        }

        const allPalettes = fs
            .readdirSync(palettesDir)
            .filter((file) => file.endsWith(".js") || file.endsWith(".json"))
            .map((filename) => loadPalette(path.join(palettesDir, filename)))
            .filter(Boolean);

        if (changedResolver) {
            return allPalettes.filter(
                (paletteModule) =>
                    (paletteModule.resolver ?? "default") === changedResolver,
            );
        }

        return allPalettes;
    } catch (err) {
        console.error("[-] Failed to load palettes:", err);
        return [];
    }
}

function formatSource(content, ext) {
    const formatFn = formatters[ext];
    if (!formatFn) {
        throw new Error(`No formatter registered for extension: "${ext}"`);
    }

    let output;
    try {
        output = formatFn(content);
    } catch (cause) {
        throw new Error(`Formatter "${ext}" threw an error`, { cause });
    }

    if (typeof output !== "string") {
        throw new TypeError(
            `Formatter "${ext}" must return a string, got ${typeof output}`,
        );
    }

    return output.trim();
}

function resolveOutputFilepath(adapterFilepath, filename, ext = "txt") {
    const appName = getAppName(adapterFilepath);
    const dirname = path.join(packagesDir, appName, "themes");

    fs.mkdirSync(dirname, { recursive: true });

    const basename = `${helpers.toSlug(filename)}.${ext}`;

    return {
        outFile: path.join(dirname, basename),
        filename: basename,
        dirname,
    };
}

// palette -> resolver -> themeOverrides -> themeOverridesForApp -> component -> adapterOutputOverrides
function renderTheme(paletteModule, adapterModule, appName) {
    const resolverName = paletteModule.resolver ?? "default";
    const { resolveTheme } = requireResolver(resolverName, true);

    const resolverOptions = createResolverOptions(paletteModule.palette);
    let theme = resolveTheme(paletteModule.palette, resolverOptions);

    theme = { ...theme, ...paletteModule.themeOverrides };

    const appThemeOverride = paletteModule.themeOverridesForApp?.[appName];
    if (appThemeOverride) {
        theme = { ...theme, ...appThemeOverride };
    }

    let output = adapterModule.component(helpers.themeProxy(theme));

    const outputOverride = paletteModule.adapterOutputOverrides?.[appName];
    if (typeof outputOverride === "function") {
        const result = outputOverride(output);

        if (result === undefined) {
            throw new Error(
                `adapterOutputOverrides.${appName} in palette "${theme.name}" returned undefined — did you forget to return?`,
            );
        }

        output = result;
    }

    return { theme, output };
}

function buildAdapter(adapterFilepath, paletteFilter) {
    try {
        const adapterModule = requireFresh(adapterFilepath, true);
        const { ext, plugin } = adapterModule;

        if (typeof adapterModule.component !== "function" || !ext) {
            throw new Error(
                `Invalid adapter: ${path.basename(adapterFilepath)}`,
            );
        }

        const appName = getAppName(adapterFilepath);
        const palettes = getPalettes(paletteFilter);

        palettes.forEach((paletteModule) => {
            if (!paletteModule?.palette) return;

            const { theme, output } = renderTheme(
                paletteModule,
                adapterModule,
                appName,
            );
            const content = formatSource(output, ext);
            const { filename, outFile } = resolveOutputFilepath(
                adapterFilepath,
                theme.name,
                ext,
            );

            fs.writeFileSync(outFile, content);

            if (typeof plugin === "function" && !isNoPlugin) {
                try {
                    const themeFolder = plugin({
                        content,
                        filename,
                        isDev,
                        themeName: theme.name,
                    });

                    if (themeFolder) {
                        fs.mkdirSync(themeFolder, { recursive: true });
                        fs.writeFileSync(
                            path.join(themeFolder, filename),
                            content,
                        );
                    }
                } catch {
                    console.error(
                        `[-] Plugin failed: ${path.basename(adapterFilepath)}`,
                    );
                }
            }
        });

        if (palettes.length === 0) return;

        const runFile = path.join(packagesDir, appName, "onRun.js");
        if (fs.existsSync(runFile)) {
            try {
                const mod = requireFresh(runFile, false);

                if (typeof mod.main !== "function") {
                    throw new Error(
                        `${appName}/onRun.js does not export a "main" function`,
                    );
                }

                mod.main({ isDev });
            } catch (cause) {
                throw new Error(`Failed to execute ${runFile}`, { cause });
            }
        }

        console.log(`[+] Built: ${path.basename(adapterFilepath)}`);
    } catch (err) {
        console.error(`[-] Failed to build: ${adapterFilepath}`);
        console.error(err);
    }
}

function runBuild(paletteFilter) {
    fs.readdirSync(adaptersDir)
        .filter((file) => file.endsWith(".js"))
        .forEach((filename) => {
            buildAdapter(path.join(adaptersDir, filename), paletteFilter);
        });
}

function runWatch() {
    runBuild();

    chokidar
        .watch(palettesDir, { ignoreInitial: true })
        .on("change", (filepath) => {
            console.log(`[+] Palette updated: ${filepath}`);
            runBuild({ changedPaletteFilepath: filepath });
        })
        .on("error", (err) => console.error("[-] Palette watcher error:", err));

    chokidar
        .watch(adaptersDir, { ignoreInitial: true })
        .on("change", (filepath) => {
            console.log(`[+] Adapter changed: ${filepath}`);
            buildAdapter(filepath);
        })
        .on("error", (err) => console.error("[-] Adapter watcher error:", err));

    chokidar
        .watch(resolversDir, { ignoreInitial: true })
        .on("change", (filepath) => {
            console.log(`[+] Resolver changed: ${filepath}`);
            runBuild({
                changedResolver: path.basename(
                    filepath,
                    path.extname(filepath),
                ),
            });
        })
        .on("error", (err) =>
            console.error("[-] Resolver watcher error:", err),
        );
}

function runView() {
    const palettes = getPalettes();

    palettes.forEach(({ palette }) => {
        if (!palette) return;

        const colors = [
            palette.background,
            palette.backgroundAlt,
            palette.primary,
            palette.primaryAlt,
            palette.secondary,
            palette.secondaryAlt,
            palette.accent,
            palette.accentAlt,
            palette.neutral,
            palette.neutralAlt,
            palette.foreground,
            palette.foregroundAlt,
            palette.info,
            palette.infoAlt,
            palette.success,
            palette.successAlt,
            palette.warning,
            palette.warningAlt,
            palette.danger,
            palette.dangerAlt,
        ];

        const swatch = colors
            .map((value) => value?.slice(1).toLowerCase())
            .filter(Boolean);

        console.log(
            `[+] ${palette.name} - https://colorkit.co/palette/${swatch.join("-")}/`,
        );
    });
}

function runClean() {
    fs.readdirSync(packagesDir).forEach((appName) => {
        const outputThemesDir = path.join(packagesDir, appName, "themes");
        if (!fs.existsSync(outputThemesDir)) return;

        try {
            fs.rmSync(outputThemesDir, { recursive: true, force: true });
        } catch (err) {
            console.error(`[-] Failed to clean ${appName}/themes:`, err);
        }
    });
}

function main() {
    if (!fs.existsSync(packagesDir)) {
        fs.mkdirSync(packagesDir, { recursive: true });
    }

    if (isCleanup) {
        runClean();
        return console.log("[+] Success");
    }

    if (isView) {
        return runView();
    }

    runClean();

    const palettes = getPalettes();
    console.log(`[+] Loaded ${palettes.length} palettes`);

    helpers.themeMetadataStore.delete();
    palettes.forEach(({ palette }) => {
        helpers.themeMetadataStore.set(palette.name, palette.appearance);
    });

    if (isDev) {
        return runWatch();
    }

    runBuild();
}

main();
