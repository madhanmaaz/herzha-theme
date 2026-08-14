const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

const projectRoot = process.cwd();
const packagesDir = path.join(projectRoot, "packages");

function updateJsonVersion(filePath, newVersion) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, "utf8");
    const packageJson = JSON.parse(content);

    packageJson.version = newVersion;

    fs.writeFileSync(
        filePath,
        `${JSON.stringify(packageJson, null, 4)}\n`,
        "utf8",
    );
}

function updateTomlVersion(filePath, newVersion) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    let content = fs.readFileSync(filePath, "utf8");

    const versionPattern = /^version\s*=\s*"[^"]*"\s*$/m;

    if (!versionPattern.test(content)) {
        throw new Error(`Version field not found in: ${filePath}`);
    }

    content = content.replace(versionPattern, `version = "${newVersion}"`);

    fs.writeFileSync(filePath, content, "utf8");
}

const updateList = {
    mainPackage(newVersion) {
        updateJsonVersion(path.join(projectRoot, "package.json"), newVersion);
    },

    packageVscode(newVersion) {
        updateJsonVersion(
            path.join(packagesDir, "vscode", "package.json"),
            newVersion,
        );
    },

    packageZed(newVersion) {
        updateTomlVersion(
            path.join(packagesDir, "zed", "extension.toml"),
            newVersion,
        );
    },
};

module.exports = {
    updateList,
};
