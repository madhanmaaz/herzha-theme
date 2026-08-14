/**
 * Loose hex string — not validated at the type level, just documents intent.
 * "#RRGGBB" or "#RRGGBBAA".
 */
export type ColorHex = string;

/**
 * Raw palette — what a palette author actually writes by hand.
 * Alt/foreground fields are NOT required here; the resolver fills in
 * anything the palette itself doesn't specify.
 */
export interface Palette {
    name: string;
    appearance: "dark" | "light";
    author: string;

    primary: ColorHex;
    primaryAlt: ColorHex;
    secondary: ColorHex;
    secondaryAlt: ColorHex;
    accent: ColorHex;
    accentAlt: ColorHex;
    neutral: ColorHex;
    neutralAlt: ColorHex;
    info: ColorHex;
    infoAlt: ColorHex;
    success: ColorHex;
    successAlt: ColorHex;
    warning: ColorHex;
    warningAlt: ColorHex;
    danger: ColorHex;
    dangerAlt: ColorHex;

    foreground: ColorHex;
    foregroundAlt: ColorHex;
    background: ColorHex;
    backgroundAlt: ColorHex;

    [key: string]: ColorHex;
}

/** Every base color that gets an auto-generated `<key>Foreground` pair. */
export type ContrastKey =
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "primaryAlt"
    | "secondaryAlt"
    | "accentAlt"
    | "neutralAlt"
    | "infoAlt"
    | "successAlt"
    | "warningAlt"
    | "dangerAlt";

/**
 * Output of a resolver's `resolveTheme(palette)` — a Palette with every
 * derived field filled in. This is the shape `component()` receives and
 * the shape `themeOverrides` / `themeOverridesForApp` patch against.
 */
export type ResolvedTheme = Palette & {
    [K in ContrastKey as `${K}Foreground`]?: ColorHex;
} & {
    cursor: ColorHex;
    shadow: ColorHex;
    transparent: ColorHex;
    dropTargetBackground: ColorHex;

    // borders
    border: ColorHex;
    borderAlt: ColorHex;
    borderHover: ColorHex;
    borderActive: ColorHex;
    borderDisabled: ColorHex;

    // background
    background: ColorHex;
    backgroundAlt: ColorHex;
    backgroundHover: ColorHex;
    backgroundActive: ColorHex;
    backgroundDisabled: ColorHex;

    // text
    foreground: ColorHex;
    foregroundAlt: ColorHex;
    foregroundHover: ColorHex;
    foregroundDisabled: ColorHex;
    foregroundPlaceholder: ColorHex;

    linkText: ColorHex;
    linkUri: ColorHex;
    linkUriHover: ColorHex;

    // selection
    selectionBorder: ColorHex;
    selectionForeground: ColorHex;
    selectionBackground: ColorHex;
    selectionInactiveBackground: ColorHex;

    // find match
    findMatchBorder: ColorHex;
    findMatchBackground: ColorHex;
    findMatchForeground: ColorHex;
    findMatchActiveBackground: ColorHex;

    // editor
    editorBackground: ColorHex;
    editorForeground: ColorHex;
    editorWhitespace: ColorHex;
    editorActiveLineBackground: ColorHex;
    editorLineNumber: ColorHex;
    editorLineNumberActive: ColorHex;
    editorMatch: ColorHex;
    editorMatchBorder: ColorHex;

    // minimap
    minimapThumbBackground: ColorHex;
    minimapThumbHoverBackground: ColorHex;
    minimapThumbActiveBackground: ColorHex;
    minimapThumbBorder: ColorHex;

    // indent guides
    indentGuide: ColorHex;
    indentGuideHover: ColorHex;
    indentGuideActive: ColorHex;
    indentGuideDisabled: ColorHex;

    // tabs
    tabsBackground: ColorHex;
    tabActiveBackground: ColorHex;
    tabInactiveBackground: ColorHex;
    tabHoverBackground: ColorHex;
    tabActiveForeground: ColorHex;
    tabInactiveForeground: ColorHex;
    tabBorder: ColorHex;
    tabActiveBorder: ColorHex;
    tabInactiveBorder: ColorHex;

    // title bar
    titlebarBackground: ColorHex;
    titlebarInactiveBackground: ColorHex;
    toolbarBackground: ColorHex;

    // git / vcs
    gitAdded: ColorHex;
    gitModified: ColorHex;
    gitDeleted: ColorHex;
    gitRenamed: ColorHex;
    gitCopied: ColorHex;
    gitUntracked: ColorHex;
    gitIgnored: ColorHex;
    gitConflict: ColorHex;
    gitSubmodule: ColorHex;

    gitAddedBackground: ColorHex;
    gitModifiedBackground: ColorHex;
    gitDeletedBackground: ColorHex;
    gitRenamedBackground: ColorHex;
    gitCopiedBackground: ColorHex;
    gitUntrackedBackground: ColorHex;
    gitIgnoredBackground: ColorHex;
    gitConflictBackground: ColorHex;
    gitSubmoduleBackground: ColorHex;

    // scrollbar
    scrollbarTrackBackground: ColorHex;
    scrollbarTrackBorder: ColorHex;
    scrollbarThumbBackground: ColorHex;
    scrollbarThumbHoverBackground: ColorHex;
    scrollbarThumbActiveBackground: ColorHex;

    // terminal
    terminalBackground: ColorHex;
    terminalForeground: ColorHex;
    terminalBrightForeground: ColorHex;
    terminalDimForeground: ColorHex;

    // terminal ansi
    terminalAnsiBlack: ColorHex;
    terminalAnsiRed: ColorHex;
    terminalAnsiGreen: ColorHex;
    terminalAnsiYellow: ColorHex;
    terminalAnsiBlue: ColorHex;
    terminalAnsiMagenta: ColorHex;
    terminalAnsiCyan: ColorHex;
    terminalAnsiWhite: ColorHex;

    terminalAnsiBrightBlack: ColorHex;
    terminalAnsiBrightRed: ColorHex;
    terminalAnsiBrightGreen: ColorHex;
    terminalAnsiBrightYellow: ColorHex;
    terminalAnsiBrightBlue: ColorHex;
    terminalAnsiBrightMagenta: ColorHex;
    terminalAnsiBrightCyan: ColorHex;
    terminalAnsiBrightWhite: ColorHex;

    terminalAnsiDimBlack: ColorHex;
    terminalAnsiDimRed: ColorHex;
    terminalAnsiDimGreen: ColorHex;
    terminalAnsiDimYellow: ColorHex;
    terminalAnsiDimBlue: ColorHex;
    terminalAnsiDimMagenta: ColorHex;
    terminalAnsiDimCyan: ColorHex;
    terminalAnsiDimWhite: ColorHex;

    // syntax
    syntaxComment: ColorHex;
    syntaxKeyword: ColorHex;
    syntaxBoolean: ColorHex;
    syntaxNumber: ColorHex;
    syntaxOperator: ColorHex;
    syntaxProperty: ColorHex;
    syntaxConstant: ColorHex;

    syntaxType: ColorHex;
    syntaxNamespace: ColorHex;

    syntaxVariable: ColorHex;
    syntaxVariableParameter: ColorHex;
    syntaxVariableSpecial: ColorHex;

    syntaxTag: ColorHex;
    syntaxAttribute: ColorHex;

    syntaxFunction: ColorHex;
    syntaxConstructor: ColorHex;

    syntaxColorHex: ColorHex;
    syntaxColorHexEscape: ColorHex;
    syntaxColorHexRegex: ColorHex;

    syntaxPunctuation: ColorHex;
    syntaxPunctuationSpecial: ColorHex;

    syntaxSelector: ColorHex;
    syntaxSelectorSpecial: ColorHex;

    syntaxTitle: ColorHex;
    syntaxTextLiteral: ColorHex;
    syntaxEmphasis: ColorHex;
    syntaxEmphasisStrong: ColorHex;
    syntaxEmphasisItalic: ColorHex;
    syntaxEmphasisStrikethrough: ColorHex;
};

/**
 * A palette-supplied fn that patches an adapter's already-rendered output.
 * TOutput should match that adapter's `ComponentFn` return type
 * (see @types/adapter.ts) — this file doesn't import it to avoid adapter
 * concerns leaking into palette types, so the link is by convention, not
 * enforced here.
 * Must return the new output — a bare `return` (returning undefined) is
 * treated as a build error by /scripts/build-herzha.js, on purpose.
 */
export type AdapterOutputOverride<TOutput = unknown> = (
    output: TOutput,
) => TOutput;

/**
 * The full shape of a `src/palettes/*.js` module, i.e. what
 * `module.exports` (or `exports.<field> = `) must add up to.
 */
export interface PaletteModule {
    /** Name of the file (no ext) under src/resolvers/ to run this through. Defaults to "default". */
    resolver?: string;

    palette: Palette;

    /** Patches the resolved theme. Always applied, for every adapter. */
    themeOverrides?: Partial<ResolvedTheme>;

    /**
     * Patches the resolved theme, only when building for the named adapter.
     * Applied after `themeOverrides`, before `component()` runs.
     * Key = adapter file name under src/adapters/ (no ext), e.g. "zed".
     */
    themeOverridesForApp?: Record<string, Partial<ResolvedTheme>>;

    /**
     * Patches the adapter's rendered output, only for the named adapter.
     * Key = adapter file name under src/adapters/ (no ext), e.g. "zed".
     */
    adapterOutputOverrides?: Record<string, AdapterOutputOverride>;
}
