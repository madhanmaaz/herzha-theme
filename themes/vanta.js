const { themeOptions } = require("../core/theme-config");
const { createTheme } = require("../core/theme-creator");

const palette = {
    name: "Herzha Vanta",
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
    background: "#0A0A0D",
    backgroundAlt: "#08080b",
};

module.exports = createTheme(palette);
