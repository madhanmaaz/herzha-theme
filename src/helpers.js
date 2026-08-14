const process = require("node:process");
const path = require("node:path");
const fs = require("node:fs");

const REQUIRED_PALETTE_FIELDS = [
    "name",
    "author",
    "appearance",

    "background",
    "backgroundAlt",
    "foreground",
    "foregroundAlt",
    "primary",
    "primaryAlt",
    "secondary",
    "secondaryAlt",
    "accent",
    "accentAlt",
    "neutral",
    "neutralAlt",
    "info",
    "infoAlt",
    "success",
    "successAlt",
    "warning",
    "warningAlt",
    "danger",
    "dangerAlt",
];

const VALID_APPEARANCES = ["dark", "light"];

function validatePalette(
    palette,
    label = palette?.name ?? "(unknown palette)",
) {
    if (!palette || typeof palette !== "object") {
        throw new Error(
            `Invalid palette "${label}": expected an object, got ${typeof palette}`,
        );
    }

    const missing = REQUIRED_PALETTE_FIELDS.filter(
        (key) => palette[key] == null,
    );
    if (missing.length > 0) {
        throw new Error(
            `Palette "${label}" is missing required field(s): ${missing.join(", ")}`,
        );
    }

    if (!VALID_APPEARANCES.includes(palette.appearance)) {
        throw new Error(
            `Palette "${label}" has an invalid "appearance": expected ${VALID_APPEARANCES.map((a) => `"${a}"`).join(" or ")}, got ${JSON.stringify(palette.appearance, null, 4)}`,
        );
    }
}

function toSlug(str) {
    return String(str)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
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

const themeMetadataStore = {
    filePath: path.join(process.cwd(), "themeMetadata.json"),
    data: null,
    get() {
        if (!fs.existsSync(this.filePath)) {
            return {};
        }

        if (!this.data) {
            this.data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
        }

        return this.data || {};
    },

    set(name, appearance) {
        let output = {};

        if (fs.existsSync(this.filePath)) {
            output = this.get();
        }

        const safeName = toSlug(name);

        output[safeName] = {
            name,
            appearance,
            filename: safeName,
        };

        fs.writeFileSync(this.filePath, JSON.stringify(output, null, 4));
        this.data = output
    },

    delete() {
        if (!fs.existsSync(this.filePath)) return;

        try {
            fs.rmSync(this.filePath);
        } catch {}
    },
};

function themeProxy(theme) {
    return new Proxy(theme, {
        get(target, key) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                throw new Error(
                    `KeyNotFound: Theme="${theme.name}" Key="${String(key)}"`,
                );
            }

            const value = target[key];

            if (value === null || value === undefined || value === "") {
                throw new Error(
                    `InvalidValue: Theme="${theme.name}" Key="${String(key)}"`,
                );
            }

            return value;
        },
    });
}

module.exports = {
    REQUIRED_PALETTE_FIELDS,
    themeMetadataStore,
    validatePalette,
    themeProxy,
    escapeXML,
    toSlug,
};
