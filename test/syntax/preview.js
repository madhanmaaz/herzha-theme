import { ThemeAPI } from "@herzha/core"
import { join } from "node:path"

export async function buildTheme(api = new ThemeAPI()) {
    const {
        createTheme,
        writeFile,
        logger,
        constants,
    } = api

    const { paths, meta } = constants

    const themeName = "Herzha Dark"
    const themeType = "dark"
    const themeVersion = "1.0.0"

    const templateDir = join(__dirname, "templates")
    const outputDir = join(paths.dist, "vscode", "themes")

    const colors = {
        background: "#0b0f14",
        foreground: "#cdd6f4",
        primary: "#7aa2f7",
        secondary: "#bb9af7",
        accent: "#f7768e",
    }

    logger.info(`Building ${themeName} (${themeType})`)

    await createTheme({
        name: themeName,
        type: themeType,
        version: themeVersion,
        colors,
    })

    await writeFile(
        join(outputDir, `${themeName}.json`),
        JSON.stringify(colors, null, 4),
    )

    return {
        success: true,
        theme: themeName,
        output: outputDir,
        templateDir,
        meta
    }
}

/* ---------- Helpers ---------- */

export const isHex = (value = "") =>
    /^#[0-9a-f]{6}$/i.test(value)

export const normalizeName = (name) =>
    name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .trim()

class PreviewState {
    static status = "idle"
    static update(next) {
        this.status = next
    }
}

/* ---------- Example ---------- */

await buildTheme()
    .then(result => console.log("✔ Done:", result))
    .catch(error => console.error("✖ Error:", error))
