const fs = require("node:fs");
const path = require("node:path");

const { themeMetadataStore } = require("../../src/helpers");

const packageJsonFilePath = path.join(__dirname, "package.json");

module.exports.main = function ({ isDev }) {
    const packageJson = JSON.parse(
        fs.readFileSync(packageJsonFilePath, "utf-8"),
    );

    const themes = [];
    for (const value of Object.values(themeMetadataStore.get())) {
        themes.push({
            label: value.name,
            uiTheme: `vs-${value.appearance}`,
            path: `./themes/${value.filename}.json`,
        });
    }

    packageJson.contributes.themes = themes;

    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, null, 4));
};
