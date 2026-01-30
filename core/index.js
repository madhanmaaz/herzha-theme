const fs = require("node:fs");
const path = require("node:path");
const chokidar = require("chokidar");
const themeOptions = require("./theme-config");
const formatter = require("./formatter");
const { removeThemeMetadata } = require("./helpers");

const isDev = process.argv.includes("--dev");
const isView = process.argv.includes("--view");
const isCleanup = process.argv.includes("--cleanup");

const ROOT = path.join(__dirname, "..");
const adaptersRoot = path.join(ROOT, "adapters");
const distRoot = path.join(ROOT, "packages");
const themesRoot = path.join(ROOT, "themes");

function requireFresh(filePath, fresh = false) {
    if (fresh) {
        const resolved = require.resolve(filePath);
        if (require.cache[resolved]) {
            delete require.cache[resolved];
        }
    }

    return require(filePath);
}

function getThemes(changedFilePath) {
    try {
        const themes = fs
            .readdirSync(themesRoot)
            .filter((file) => file.endsWith(".js") || file.endsWith(".json"))
            .map((filename) => {
                const f = path.join(themesRoot, filename);

                // Only fresh-require the changed file
                const shouldRefresh = changedFilePath === f;
                return requireFresh(f, shouldRefresh);
            });

        return themes;
    } catch (err) {
        console.error("[-] Failed to load themes:", err);
        return [];
    }
}

function getAppName(filePath) {
    return path.basename(filePath, path.extname(filePath));
}

function formatSrc(content, ext) {
    const formatterFn = formatter[ext];
    if (!formatterFn) {
        throw new Error(`No formatter registered for extension: "${ext}"`);
    }

    let output;
    try {
        output = formatterFn(content);
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

function resolveOutputFile(filePath, filename, ext = "txt") {
    const appName = getAppName(filePath);
    const dirname = path.join(distRoot, appName, "themes");

    fs.mkdirSync(dirname, { recursive: true });

    const safeName = filename
        ? filename.replace(/\s+/g, "-").toLowerCase()
        : "herzha-theme";
    const basename = `${safeName}.${ext}`;

    return {
        dirname,
        filename: basename,
        outFile: path.join(dirname, basename),
    };
}

function builder(filePath) {
    try {
        const mod = requireFresh(filePath, true);
        const { component, ext, plugin } = mod;

        if (typeof component !== "function" || !ext) {
            throw new Error(`Invalid adapter: ${path.basename(filePath)}`);
        }

        const themes = getThemes();

        themes.forEach((themeObject) => {
            if (!themeObject) return;

            const { theme, overrides } = themeObject;
            const themeName = theme.name;
            const overrideFunc = overrides[getAppName(filePath)];

            const componentOutput = component(theme);
            const rendered =
                typeof overrideFunc === "function"
                    ? overrideFunc(componentOutput)
                    : componentOutput;

            const content = formatSrc(rendered, ext);
            const { outFile, filename } = resolveOutputFile(
                filePath,
                themeName,
                ext,
            );

            fs.writeFileSync(outFile, content);
            if (typeof plugin === "function") {
                const themeFolder = plugin({
                    content,
                    filename,
                    isDev,
                    themeName,
                });

                if (themeFolder) {
                    fs.mkdirSync(themeFolder, { recursive: true });
                    fs.writeFileSync(path.join(themeFolder, filename), content);
                }
            }
        });

        const runFile = path.join(
            ROOT,
            "packages",
            getAppName(filePath),
            "onRun.js",
        );

        if (fs.existsSync(runFile)) {
            try {
                const mod = requireFresh(runFile, false);
                mod.main({
                    isDev,
                });
            } catch (err) {
                throw new Error(`Failed to execute ${appName}/onRun.js`);
            }
        }

        console.log(`[+] Built: ${path.basename(filePath)}`);
    } catch (err) {
        console.error(`[-] Failed to build: ${filePath}`);
        console.error(err);
    }
}

function runWatch() {
    chokidar
        .watch(themesRoot)
        .on("add", (filePath) => {
            console.log(`[+] Theme added: ${filePath}`);
            getThemes(filePath);
        })
        .on("change", (filePath) => {
            console.log(`[+] Themes updated: ${filePath}`);
            getThemes(filePath);
            runBuild();
        });

    chokidar
        .watch(adaptersRoot)
        .on("add", (filePath) => {
            console.log(`[+] Source added: ${filePath}`);
            builder(filePath);
        })
        .on("change", (filePath) => {
            console.log(`[+] Source changed: ${filePath}`);
            builder(filePath);
        });
}

function runBuild() {
    fs.readdirSync(adaptersRoot)
        .filter((file) => file.endsWith(".js"))
        .forEach((filename) => {
            const filePath = path.join(adaptersRoot, filename);
            builder(filePath);
        });
}

function runView() {
    const themes = getThemes();

    themes.forEach(({ theme }) => {
        const palette = themeOptions.REQUIRED.map((key) => {
            if (["name", "author", "appearance"].includes(key)) return;

            return theme[key].slice(1).toLowerCase();
        }).filter(Boolean);

        console.log(
            `[+] ${theme.name} - https://colorkit.co/palette/${palette.join("-")}`,
        );
    });
}

function runClean() {
    fs.readdirSync(distRoot).forEach((appName) => {
        const target = path.join(distRoot, appName, "themes");
        if (!fs.existsSync(target)) return;

        fs.rmSync(target, {
            recursive: true,
            force: true,
        });
    });

    removeThemeMetadata();
    console.log("[+] Cleanup success.");
}

function main() {
    fs.mkdirSync(distRoot, { recursive: true });

    if (isCleanup) {
        return runClean();
    }

    if (isView) {
        return runView();
    }

    runClean();
    const themes = getThemes();
    console.log(`[+] Loaded ${themes.length} themes`);

    if (isDev) {
        return runWatch();
    }

    runBuild();
}

main();
