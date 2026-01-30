const { colord, extend: colordExtend } = require("colord");
const path = require("path");
const fs = require("fs");

colordExtend([require("colord/plugins/a11y")]);

function withAlpha(color, a = 0.25) {
    return colord(color).alpha(a).toHex();
}

function lighten(color, v = 0.25) {
    return colord(color).lighten(v).toHex();
}

function darken(color, v = 0.25) {
    return colord(color).darken(v).toHex();
}

function muted(color, d = 0.2, a = 0.7) {
    return colord(color).desaturate(d).alpha(a).toHex();
}

function blend(bg, fg, amount = 0.25) {
    const b = colord(bg).toRgb();
    const f = colord(fg).toRgb();

    return colord({
        r: Math.round(b.r + (f.r - b.r) * amount),
        g: Math.round(b.g + (f.g - b.g) * amount),
        b: Math.round(b.b + (f.b - b.b) * amount),
    }).toHex();
}

function adaptiveBackground(color, appearance, strength = 0.01) {
    const c = colord(color);
    const luminance = c.luminance(); // 0 → black, 1 → white

    if (appearance === "dark") {
        // Dark themes: lift dark colors more, barely touch lighter ones
        const factor = (1 - luminance) * strength;
        return c.lighten(factor).toHex();
    }

    // Light themes: darken light colors more, barely touch darker ones
    const factor = luminance * strength;
    return c.darken(factor).toHex();
}

function generateContrastForeground(background = "#ffffff", minContrast = 10) {
    const bg = colord(background);
    if (!bg.isValid()) return "#000000";

    const towardsLight = bg.isDark();
    let fg = bg;
    let step = 0;

    while (fg.contrast(bg) < minContrast && step < 20) {
        fg = towardsLight ? fg.lighten(0.05) : fg.darken(0.05);
        step++;
    }

    return fg.toHex();
}

function escapeXML(value) {
    if (value == null) return "";

    return String(value)
        .replace(/&/g, "&amp;") // must be first
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

const themeMetadataFile = path.join(__dirname, "..", "themeMetadata.json");

function getThemeMetadata() {
    return JSON.parse(fs.readFileSync(themeMetadataFile, "utf-8"));
}

function setThemeMetadata(name, appearance) {
    let output = {};

    if (fs.existsSync(themeMetadataFile)) {
        output = getThemeMetadata();
    }

    const safeName = name
        ? name.replace(/\s+/g, "-").toLowerCase()
        : "herzha-theme";

    output[safeName] = {
        name,
        appearance,
        filename: safeName,
    };

    fs.writeFileSync(themeMetadataFile, JSON.stringify(output, null, 4));
}

function removeThemeMetadata() {
    try {
        fs.rmSync(themeMetadataFile);
    } catch (err) {}
}

module.exports = {
    withAlpha,
    lighten,
    darken,
    muted,
    blend,
    escapeXML,
    adaptiveBackground,
    generateContrastForeground,
    setThemeMetadata,
    getThemeMetadata,
    removeThemeMetadata,
};
