const { hexToRGB } = require("../colorUtils");

/** @type {import('../@types/adapter').AdapterModule} */
module.exports = {
    ext: "colorscheme",
    component: (theme) => `
[General]
Description=${theme.name}
Blur=true
Opacity=0.95

[Background]
Color=${hexToRGB(theme.terminalBackground)}

[BackgroundIntense]
Color=${hexToRGB(theme.terminalBrightForeground)}

[Foreground]
Color=${hexToRGB(theme.terminalForeground)}

[ForegroundIntense]
Color=${hexToRGB(theme.terminalBrightForeground)}

[Color0]
Color=${hexToRGB(theme.terminalAnsiBlack)}

[Color0Intense]
Color=${hexToRGB(theme.terminalAnsiBrightBlack)}

[Color1]
Color=${hexToRGB(theme.terminalAnsiRed)}

[Color1Intense]
Color=${hexToRGB(theme.terminalAnsiBrightRed)}

[Color2]
Color=${hexToRGB(theme.terminalAnsiGreen)}

[Color2Intense]
Color=${hexToRGB(theme.terminalAnsiBrightGreen)}

[Color3]
Color=${hexToRGB(theme.terminalAnsiYellow)}

[Color3Intense]
Color=${hexToRGB(theme.terminalAnsiBrightYellow)}

[Color4]
Color=${hexToRGB(theme.terminalAnsiBlue)}

[Color4Intense]
Color=${hexToRGB(theme.terminalAnsiBrightBlue)}

[Color5]
Color=${hexToRGB(theme.terminalAnsiMagenta)}

[Color5Intense]
Color=${hexToRGB(theme.terminalAnsiBrightMagenta)}

[Color6]
Color=${hexToRGB(theme.terminalAnsiCyan)}

[Color6Intense]
Color=${hexToRGB(theme.terminalAnsiBrightCyan)}

[Color7]
Color=${hexToRGB(theme.terminalAnsiWhite)}

[Color7Intense]
Color=${hexToRGB(theme.terminalAnsiBrightWhite)}
    `,
};
