const REQUIRED = [
    "name",
    "appearance",
    "author",

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

const themeOptions = {
    name: "",
    appearance: "",
    author: "",

    primary: "",
    secondary: "",
    accent: "",
    neutral: "",
    info: "",
    success: "",
    warning: "",
    danger: "",

    primaryAlt: "",
    secondaryAlt: "",
    accentAlt: "",
    neutralAlt: "",
    infoAlt: "",
    successAlt: "",
    warningAlt: "",
    dangerAlt: "",

    primaryForeground: "",
    secondaryForeground: "",
    accentForeground: "",
    neutralForeground: "",
    infoForeground: "",
    successForeground: "",
    warningForeground: "",
    dangerForeground: "",

    primaryAltForeground: "",
    secondaryAltForeground: "",
    accentAltForeground: "",
    neutralAltForeground: "",
    infoAltForeground: "",
    successAltForeground: "",
    warningAltForeground: "",
    dangerAltForeground: "",

    cursor: "",
    shadow: "",
    transparent: "",
    dropTargetBackground: "",

    // borders
    border: "",
    borderAlt: "",
    borderHover: "",
    borderActive: "",
    borderDisabled: "",

    // background
    background: "",
    backgroundAlt: "",
    backgroundHover: "",
    backgroundActive: "",
    backgroundDisabled: "",

    // text
    foreground: "",
    foregroundAlt: "",
    foregroundHover: "",
    foregroundDisabled: "",
    foregroundPlaceholder: "",

    linkText: "",
    linkUri: "",
    linkUriHover: "",

    // selection
    selectionBorder: "",
    selectionForeground: "",
    selectionBackground: "",
    selectionInactiveBackground: "",

    // find match
    findMatchBorder: "",
    findMatchBackground: "",
    findMatchForeground: "",
    findMatchActiveBackground: "",

    // editor
    editorBackground: "",
    editorForeground: "",
    editorWhitespace: "",
    editorActiveLineBackground: "",
    editorLineNumber: "",
    editorLineNumberActive: "",
    editorMatch: "",
    editorMatchBorder: "",

    // minimap
    minimapThumbBackground: "",
    minimapThumbHoverBackground: "",
    minimapThumbActiveBackground: "",
    minimapThumbBorder: "",

    // indent guides
    indentGuide: "",
    indentGuideHover: "",
    indentGuideActive: "",
    indentGuideDisabled: "",

    // tabs
    tabsBackground: "",
    tabActiveBackground: "",
    tabInactiveBackground: "",
    tabHoverBackground: "",
    tabActiveForeground: "",
    tabInactiveForeground: "",
    tabBorder: "",
    tabActiveBorder: "",
    tabInactiveBorder: "",

    // title bar
    titlebarBackground: "",
    titlebarInactiveBackground: "",
    toolbarBackground: "",

    // git / vcs
    gitAdded: "",
    gitModified: "",
    gitDeleted: "",
    gitRenamed: "",
    gitCopied: "",
    gitUntracked: "",
    gitIgnored: "",
    gitConflict: "",
    gitSubmodule: "",

    gitAddedBackground: "",
    gitModifiedBackground: "",
    gitDeletedBackground: "",
    gitRenamedBackground: "",
    gitCopiedBackground: "",
    gitUntrackedBackground: "",
    gitIgnoredBackground: "",
    gitConflictBackground: "",
    gitSubmoduleBackground: "",

    // scrollbar
    scrollbarTrackBackground: "",
    scrollbarTrackBorder: "",
    scrollbarThumbBackground: "",
    scrollbarThumbHoverBackground: "",
    scrollbarThumbActiveBackground: "",

    // terminal
    terminalBackground: "",
    terminalForeground: "",
    terminalBrightForeground: "",
    terminalDimForeground: "",

    // terminal ansi
    terminalAnsiBlack: "",
    terminalAnsiRed: "",
    terminalAnsiGreen: "",
    terminalAnsiYellow: "",
    terminalAnsiBlue: "",
    terminalAnsiMagenta: "",
    terminalAnsiCyan: "",
    terminalAnsiWhite: "",

    terminalAnsiBrightBlack: "",
    terminalAnsiBrightRed: "",
    terminalAnsiBrightGreen: "",
    terminalAnsiBrightYellow: "",
    terminalAnsiBrightBlue: "",
    terminalAnsiBrightMagenta: "",
    terminalAnsiBrightCyan: "",
    terminalAnsiBrightWhite: "",

    terminalAnsiDimBlack: "",
    terminalAnsiDimRed: "",
    terminalAnsiDimGreen: "",
    terminalAnsiDimYellow: "",
    terminalAnsiDimBlue: "",
    terminalAnsiDimMagenta: "",
    terminalAnsiDimCyan: "",
    terminalAnsiDimWhite: "",

    // syntax
    syntaxComment: "",
    syntaxKeyword: "",
    syntaxBoolean: "",
    syntaxNumber: "",
    syntaxOperator: "",
    syntaxProperty: "",
    syntaxConstant: "",

    syntaxType: "",
    syntaxNamespace: "",

    syntaxVariable: "",
    syntaxVariableParameter: "",
    syntaxVariableSpecial: "",

    syntaxTag: "",
    syntaxAttribute: "",

    syntaxFunction: "",
    syntaxConstructor: "",

    syntaxString: "",
    syntaxStringEscape: "",
    syntaxStringRegex: "",

    syntaxPunctuation: "",
    syntaxPunctuationSpecial: "",

    syntaxSelector: "",
    syntaxSelectorSpecial: "",

    syntaxTitle: "",
    syntaxTextLiteral: "",
    syntaxEmphasis: "",
    syntaxEmphasisStrong: "",
    syntaxEmphasisItalic: "",
    syntaxEmphasisStrikethrough: "",
};

module.exports = {
    REQUIRED,
    themeOptions,
};
