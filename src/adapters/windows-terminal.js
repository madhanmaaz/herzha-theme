/** @type {import('../@types/adapter').AdapterModule} */
module.exports = {
    ext: "json",

    component: (theme) => ({
        name: theme.name,

        background: theme.terminalBackground,
        foreground: theme.terminalForeground,

        cursorColor: theme.cursor,
        selectionBackground: theme.selectionBackground,

        black: theme.terminalAnsiBlack,
        red: theme.terminalAnsiRed,
        green: theme.terminalAnsiGreen,
        yellow: theme.terminalAnsiYellow,
        blue: theme.terminalAnsiBlue,
        purple: theme.terminalAnsiMagenta,
        cyan: theme.terminalAnsiCyan,
        white: theme.terminalAnsiWhite,

        brightBlack: theme.terminalAnsiBrightBlack,
        brightRed: theme.terminalAnsiBrightRed,
        brightGreen: theme.terminalAnsiBrightGreen,
        brightYellow: theme.terminalAnsiBrightYellow,
        brightBlue: theme.terminalAnsiBrightBlue,
        brightPurple: theme.terminalAnsiBrightMagenta,
        brightCyan: theme.terminalAnsiBrightCyan,
        brightWhite: theme.terminalAnsiBrightWhite,
    }),
};
