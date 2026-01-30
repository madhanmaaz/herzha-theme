
#### Creating an Adapter
Adapters convert a theme into a specific editor or tool format.

1. Create an Adapter File `adapters/<adapter-name>.js`
2. Adapter Structure
```js
const { themeOptions } = require("../core/theme-config");
const os = require("node:os");
const path = require("node:path");
const {
    escapeXML,
    blend,
    lighten,
    darken,
    adaptiveBackground,
} = require("../core/helpers");

module.exports = {
    // Output file extension
    ext: "json", // register this in `core/formatter.js`

    // Optional: return a custom theme folder path (useful for development)
    plugin({ content, filename, isDev, themeName }) {
        let themeFolder;

        if (os.platform() === "win32") {
            themeFolder = path.join(
                os.homedir(),
                "AppData",
                "Roaming",
                "Zed",
                "themes",
            );
        } else {
            themeFolder = path.join(
                os.homedir(),
                ".config",
                "themes",
            );
        }

        return themeFolder;
    },

    // Convert theme options into adapter-specific format
    component(theme) {
        return {
            background: theme.background,
            border: theme.border,
        };
    },
};
```

3. Adapter API Explained

- `ext`
    - Output file extension (`json`, `xml`, `tmTheme`, etc.)
    - Must be registered in `core/formatter.js`
- `plugin({ ... })` (optional)
    - The editor requires a specific theme directory. Used for local development
    - *Return value:* Absolute path to the theme folder
- `component(theme)`
    - Receives the resolved themeOptions
    - Returns editor-specific theme structure
    - Applies all overrides
    - Output is passed to the formatter
