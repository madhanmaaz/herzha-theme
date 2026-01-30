const { execSync } = require("child_process");
const { getThemeMetadata } = require("../../core/helpers");
const packageJson = require("./package.json");
const fs = require("fs");
const path = require("path");

module.exports.main = function ({ isDev }) {
    const themes = [];
    for (const value of Object.values(getThemeMetadata())) {
        themes.push({
            label: value.name,
            uiTheme: `vs-${value.appearance}`,
            path: `./themes/${value.filename}.json`,
        });
    }

    packageJson.contributes.themes = themes;
    fs.writeFileSync(
        path.join(__dirname, "package.json"),
        JSON.stringify(packageJson, null, 4),
    );
};
