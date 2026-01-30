const path = require("path");
const fs = require("fs");
const { themeOptions, REQUIRED } = require("./theme-config");
const {
    muted,
    darken,
    withAlpha,
    lighten,
    blend,
    generateContrastForeground,
    setThemeMetadata,
} = require("./helpers");

function themeOptionProxy(theme) {
    return new Proxy(theme, {
        get(target, key) {
            if (!Object.prototype.hasOwnProperty.call(target, key)) {
                throw new Error(
                    `KeyNotFound: Theme="${theme.name}" Key="${String(key)}"`,
                );
            }

            const value = target[key];

            if (value === null || value === undefined || value === "") {
                throw new Error(
                    `InvalidValue: Theme="${theme.name}" Key="${String(key)}"`,
                );
            }

            return value;
        },
    });
}

function createTheme(palette = themeOptions, overrideCallback) {
    for (const key of REQUIRED) {
        if (palette[key] == null) {
            throw new Error(`Missing required: ${key}`);
        }
    }

    const theme = { ...palette };
    function resolveColor({ dark, light }, appearance = theme.appearance) {
        switch (appearance) {
            case "dark":
                return dark;
            case "light":
                return light;
            default:
                return dark;
        }
    }

    theme.primaryForeground ??= generateContrastForeground(theme.primary);
    theme.secondaryForeground ??= generateContrastForeground(theme.secondary);
    theme.accentForeground ??= generateContrastForeground(theme.accent);
    theme.neutralForeground ??= generateContrastForeground(theme.neutral);
    theme.infoForeground ??= generateContrastForeground(theme.info);
    theme.successForeground ??= generateContrastForeground(theme.success);
    theme.warningForeground ??= generateContrastForeground(theme.warning);
    theme.dangerForeground ??= generateContrastForeground(theme.danger);

    theme.primaryAltForeground ??= generateContrastForeground(theme.primaryAlt);
    theme.secondaryAltForeground ??= generateContrastForeground(
        theme.secondaryAlt,
    );
    theme.accentAltForeground ??= generateContrastForeground(theme.accentAlt);
    theme.neutralAltForeground ??= generateContrastForeground(theme.neutralAlt);
    theme.infoAltForeground ??= generateContrastForeground(theme.infoAlt);
    theme.successAltForeground ??= generateContrastForeground(theme.successAlt);
    theme.warningAltForeground ??= generateContrastForeground(theme.warningAlt);
    theme.dangerAltForeground ??= generateContrastForeground(theme.dangerAlt);

    theme.cursor ??= theme.primary;
    theme.shadow ??= theme.background;
    theme.transparent = "#00000000";
    theme.dropTargetBackground ??= withAlpha(theme.primary, 0.2);

    theme.border ??= resolveColor({
        dark: lighten(theme.background, 0.06),
        light: darken(theme.background, 0.2),
    });

    theme.borderAlt ??= resolveColor({
        dark: lighten(theme.background, 0.12),
        light: darken(theme.background, 0.3),
    });

    theme.borderHover ??= resolveColor({
        dark: lighten(theme.background, 0.24),
        light: darken(theme.background, 0.5),
    });

    theme.borderActive ??= theme.primary;
    theme.borderDisabled ??= blend(theme.transparent, theme.primary, 0.3);

    theme.backgroundHover ??= withAlpha(theme.foreground, 0.1);
    theme.backgroundActive ??= withAlpha(theme.foreground, 0.13);
    theme.backgroundDisabled ??= withAlpha(theme.foreground, 0.08);

    theme.foregroundHover ??= lighten(theme.foreground, 0.1);
    theme.foregroundDisabled ??= withAlpha(theme.foreground, 0.4);
    theme.foregroundPlaceholder ??= withAlpha(theme.foreground, 0.7);

    theme.linkText ??= theme.primary;
    theme.linkUri ??= theme.info;
    theme.linkUriHover ??= theme.infoAlt;

    theme.selectionBorder ??= blend(theme.transparent, theme.primary, 0.7);
    theme.selectionForeground ??= theme.primary;
    theme.selectionBackground ??= blend(theme.transparent, theme.primary, 0.35);
    theme.selectionInactiveBackground ??= blend(
        theme.background,
        theme.primary,
        0.25,
    );

    theme.findMatchBackground ??= blend(theme.transparent, theme.accent, 0.35);
    theme.findMatchForeground ??= theme.warning;
    theme.findMatchBorder ??= blend(theme.transparent, theme.warning, 0.7);
    theme.findMatchActiveBackground ??= blend(
        theme.transparent,
        theme.warning,
        0.5,
    );

    theme.editorBackground ??= theme.background;
    theme.editorForeground ??= theme.foreground;
    theme.editorWhitespace ??= withAlpha(theme.foreground, 0.4);
    theme.editorActiveLineBackground ??= resolveColor({
        dark: blend(theme.transparent, theme.foreground, 0.2),
        light: blend(theme.transparent, theme.background, 0.85),
    });

    theme.editorLineNumber ??= blend(theme.transparent, theme.foreground, 0.5);
    theme.editorLineNumberActive ??= theme.foreground;
    theme.editorMatch ??= blend(theme.background, theme.primary, 0.35);
    theme.editorMatchBorder ??= blend(theme.background, theme.primary, 0.7);

    theme.minimapThumbBackground ??= withAlpha(theme.primary, 0.25);
    theme.minimapThumbHoverBackground ??= withAlpha(theme.primary, 0.4);
    theme.minimapThumbActiveBackground ??= withAlpha(theme.primary, 0.55);
    theme.minimapThumbBorder ??= withAlpha(theme.primary, 0.35);

    theme.indentGuide ??= blend(theme.transparent, theme.foreground, 0.25);
    theme.indentGuideHover ??= blend(theme.transparent, theme.foreground, 0.45);
    theme.indentGuideActive ??= blend(
        theme.transparent,
        theme.foreground,
        0.52,
    );
    theme.indentGuideDisabled ??= blend(theme.transparent, theme.neutral, 0.15);

    theme.tabsBackground ??= theme.backgroundAlt;
    theme.tabActiveBackground ??= theme.background;
    theme.tabInactiveBackground ??= theme.backgroundAlt;
    theme.tabHoverBackground ??= theme.backgroundHover;
    theme.tabActiveForeground ??= theme.foreground;
    theme.tabInactiveForeground ??= theme.foregroundAlt;
    theme.tabBorder ??= theme.border;
    theme.tabActiveBorder ??= theme.primary;
    theme.tabInactiveBorder ??= theme.border;

    theme.titlebarBackground ??= theme.backgroundAlt;
    theme.titlebarInactiveBackground ??= theme.background;
    theme.toolbarBackground ??= theme.background;

    theme.gitAdded ??= theme.success;
    theme.gitModified ??= theme.warning;
    theme.gitDeleted ??= theme.danger;
    theme.gitRenamed ??= theme.info;
    theme.gitCopied ??= theme.info;
    theme.gitUntracked ??= theme.secondaryAlt;
    theme.gitIgnored ??= theme.foregroundAlt;
    theme.gitConflict ??= theme.dangerAlt;
    theme.gitSubmodule ??= theme.accent;

    theme.gitAddedBackground ??= withAlpha(theme.gitAdded, 0.15);
    theme.gitModifiedBackground ??= withAlpha(theme.gitModified, 0.15);
    theme.gitDeletedBackground ??= withAlpha(theme.gitDeleted, 0.15);
    theme.gitRenamedBackground ??= withAlpha(theme.gitRenamed, 0.15);
    theme.gitCopiedBackground ??= withAlpha(theme.gitCopied, 0.15);
    theme.gitUntrackedBackground ??= withAlpha(theme.gitUntracked, 0.15);
    theme.gitIgnoredBackground ??= withAlpha(theme.gitIgnored, 0.15);
    theme.gitConflictBackground ??= withAlpha(theme.gitConflict, 0.15);
    theme.gitSubmoduleBackground ??= withAlpha(theme.gitSubmodule, 0.15);

    theme.scrollbarTrackBackground ??= theme.background;
    theme.scrollbarTrackBorder ??= withAlpha(theme.border, 0.4);
    theme.scrollbarThumbBackground ??= withAlpha(theme.foreground, 0.15);
    theme.scrollbarThumbHoverBackground ??= withAlpha(theme.foreground, 0.25);
    theme.scrollbarThumbActiveBackground ??= withAlpha(theme.foreground, 0.4);

    theme.terminalBackground ??= theme.background;
    theme.terminalForeground ??= theme.foreground;
    theme.terminalBrightForeground ??= lighten(theme.foreground, 0.15);
    theme.terminalDimForeground ??= theme.foregroundAlt;

    theme.terminalAnsiBlack ??= theme.background;
    theme.terminalAnsiRed ??= theme.danger;
    theme.terminalAnsiGreen ??= theme.success;
    theme.terminalAnsiYellow ??= theme.warning;
    theme.terminalAnsiBlue ??= theme.info;
    theme.terminalAnsiMagenta ??= theme.primary;
    theme.terminalAnsiCyan ??= theme.accent;
    theme.terminalAnsiWhite ??= theme.foreground;

    theme.terminalAnsiBrightBlack ??= resolveColor({
        dark: lighten(theme.background, 0.38),
        light: lighten(theme.foreground, 0.38),
    });
    theme.terminalAnsiBrightRed ??= theme.dangerAlt;
    theme.terminalAnsiBrightGreen ??= theme.successAlt;
    theme.terminalAnsiBrightYellow ??= theme.warningAlt;
    theme.terminalAnsiBrightBlue ??= theme.secondaryAlt;
    theme.terminalAnsiBrightMagenta ??= theme.primaryAlt;
    theme.terminalAnsiBrightCyan ??= theme.infoAlt;
    theme.terminalAnsiBrightWhite ??= resolveColor({
        dark: lighten(theme.foreground, 0.2),
        light: lighten(theme.background, 0.2),
    });

    theme.terminalAnsiDimBlack ??= resolveColor({
        dark: darken(theme.background, 0.05),
        light: darken(theme.foreground, 0.05),
    });
    theme.terminalAnsiDimRed ??= muted(theme.danger);
    theme.terminalAnsiDimGreen ??= muted(theme.success);
    theme.terminalAnsiDimYellow ??= muted(theme.warning);
    theme.terminalAnsiDimBlue ??= muted(theme.secondary);
    theme.terminalAnsiDimMagenta ??= muted(theme.primary);
    theme.terminalAnsiDimCyan ??= muted(theme.info);
    theme.terminalAnsiDimWhite ??= muted(theme.foreground);

    theme.syntaxComment ??= blend(
        blend(theme.background, theme.foreground, 0.4),
        theme.primary,
        0.05,
    );
    theme.syntaxKeyword ??= theme.primaryAlt;
    theme.syntaxBoolean ??= theme.primary;
    theme.syntaxNumber ??= theme.primary;
    theme.syntaxOperator ??= theme.danger;
    theme.syntaxProperty ??= theme.info;
    theme.syntaxConstant ??= theme.dangerAlt;

    theme.syntaxType ??= theme.accent;
    theme.syntaxNamespace ??= theme.accentAlt;

    theme.syntaxVariable ??= theme.foreground;
    theme.syntaxVariableParameter ??= theme.syntaxVariable;
    theme.syntaxVariableSpecial ??= theme.danger;

    theme.syntaxTag ??= theme.danger;
    theme.syntaxAttribute ??= theme.primaryAlt;

    theme.syntaxFunction ??= theme.secondaryAlt;
    theme.syntaxConstructor ??= theme.primaryAlt;

    theme.syntaxString ??= theme.success;
    theme.syntaxStringEscape ??= theme.primary;
    theme.syntaxStringRegex ??= theme.successAlt;

    theme.syntaxPunctuation ??= blend(theme.foreground, theme.primary, 0.25);
    theme.syntaxPunctuationSpecial ??= theme.infoAlt;

    theme.syntaxSelector ??= theme.primaryAlt;
    theme.syntaxSelectorSpecial ??= theme.primary;

    theme.syntaxTitle ??= theme.accentAlt;
    theme.syntaxTextLiteral ??= theme.foregroundAlt;
    theme.syntaxEmphasis ??= theme.primaryAlt;
    theme.syntaxEmphasisStrong ??= theme.primary;
    theme.syntaxEmphasisItalic ??= theme.primaryAlt;
    theme.syntaxEmphasisStrikethrough = theme.primaryAlt;

    const overrides =
        typeof overrideCallback === "function"
            ? overrideCallback(theme) || {}
            : {};

    setThemeMetadata(theme.name, theme.appearance);
    return {
        overrides,
        theme: themeOptionProxy(theme),
    };
}

module.exports = {
    createTheme,
};
