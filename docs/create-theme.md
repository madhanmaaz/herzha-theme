
#### Creating a Theme
1. Create a Theme File `themes/<theme-name>.js`
2. Theme File Structure
```js
const { themeOptions } = require("../core/theme-config");
const { createTheme } = require("../core/theme-creator");

const palette = {
    name: "Herzha Dark",
    appearance: "dark",
    author: "Madhanmaaz <madhanmaaz@gmail.com>",

    primary: "#A779F3",
    primaryAlt: "#BB9AF7",
    secondary: "#6A85E4",
    secondaryAlt: "#87A1FF",
    accent: "#03BDE5",
    accentAlt: "#2CCAF0",

    neutral: "#384059",
    neutralAlt: "#4C536F",

    info: "#7DCFFF",
    infoAlt: "#8BD5FF",
    success: "#85D0B7",
    successAlt: "#95DFC6",
    warning: "#F2C98B",
    warningAlt: "#F5D08A",
    danger: "#FB899E",
    dangerAlt: "#FF9FB1",

    foreground: "#a9b1d6",
    foregroundAlt: "#787c99",
    background: "#141418",
    backgroundAlt: "#0D0D0D",
};

module.exports = createTheme(palette, (theme = themeOptions) => {
    // Global override (applies to all adapters)
    theme.border = "#ff0000";

    // Adapter-specific overrides
    return {
        "sublime-text"(xmlStr) {
            return xmlStr.trim();
        },

        zed(obj) {
            const output = { ...obj };
            output.themes[0].style["background.appearance"] = "opaque";
            return output;
        },
    };
});
```

3. How `createTheme` Works
```js
createTheme(palette, overrideCallback)
```
- `palette`
    - Defines base colors and metadata
    - Used to generate all theme values
- `overrideCallback(theme)`
    - Receives `themeOptions` with defaults applied
    - Allows:
        - Global overrides
        - Adapter-specific customization
