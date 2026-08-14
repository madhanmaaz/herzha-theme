const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

const { updateList } = require("./update-list");

const REMOTE_REPO_URL =
    "https://raw.githubusercontent.com/madhanmaaz/herzha-theme/refs/heads/main/package.json";

const PACKAGE_JSON_PATH = path.join(process.cwd(), "package.json");

function getLocalVersion() {
    if (!fs.existsSync(PACKAGE_JSON_PATH)) {
        throw new Error(`package.json not found: ${PACKAGE_JSON_PATH}`);
    }

    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));

    return packageJson.version;
}

async function getRemoteVersion() {
    const response = await fetch(REMOTE_REPO_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch remote package.json: ${response.status} ${response.statusText}`,
        );
    }

    const data = await response.json();

    if (!data.version) {
        throw new Error("Remote package.json does not contain a version.");
    }

    return data.version;
}

function parseVersion(version) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

    if (!match) {
        throw new Error(`Invalid version "${version}". Expected x.y.z`);
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

// 0.0.1 -> 0.0.2
// 0.0.9 -> 0.0.10
// 0.1.9 -> 0.1.10
function getNewVersion(version, type) {
    const { major, minor, patch } = parseVersion(version);

    switch (type || "patch") {
        case "major":
            return `${major + 1}.0.0`;

        case "minor":
            return `${major}.${minor + 1}.0`;

        case "patch":
            return `${major}.${minor}.${patch + 1}`;

        default:
            throw new Error(`Invalid version bump type: ${type}`);
    }
}

function updateVersion(newVersion) {
    for (const [updateName, updater] of Object.entries(updateList)) {
        try {
            updater(newVersion);

            console.log(`[+] ${updateName} updated successfully`);
        } catch (error) {
            console.error(`[-] Failed to update ${updateName}:`, error);

            throw error;
        }
    }
}

async function main() {
    try {
        const versionType = process.argv[2];
        const localVersion = getLocalVersion();
        const remoteVersion = await getRemoteVersion();

        console.log(`[+] Local version  : ${localVersion}`);
        console.log(`[+] Remote version : ${remoteVersion}`);

        const newVersion = getNewVersion(remoteVersion, versionType);

        console.log(`[+] New version    : ${newVersion} ${versionType}\n`);

        updateVersion(newVersion);

        console.log(
            `\n[+] Version update completed: ${newVersion} ${versionType}`,
        );
    } catch (error) {
        console.error(
            "[-] Version update failed:",
            error instanceof Error ? error.message : error,
        );

        process.exitCode = 1;
    }
}

main();
