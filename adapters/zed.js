const os = require("node:os");
const path = require("node:path");

const { themeOptions } = require("../core/theme-config");

module.exports = {
    ext: "json",
    plugin() {
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
            themeFolder = path.join(os.homedir(), ".config", "themes");
        }

        return themeFolder;
    },
};

module.exports.component = (theme = themeOptions) => ({
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Herzha Theme",
    author: theme.author,
    themes: [
        {
            name: theme.name,
            appearance: theme.appearance,
            style: {
                "background.appearance": "opaque",
                background: theme.background,
                "surface.background": theme.background,
                "elevated_surface.background": theme.backgroundAlt,

                border: theme.border,
                "border.variant": theme.borderAlt,
                "border.focused": theme.borderActive,
                "border.selected": theme.borderActive,
                "border.transparent": theme.transparent,
                "border.disabled": theme.borderDisabled,

                "element.background": theme.background,
                "element.hover": theme.backgroundHover,
                "element.active": theme.backgroundActive,
                "element.selected": theme.backgroundActive,
                "element.disabled": theme.backgroundDisabled,

                "drop_target.background": theme.dropTargetBackground,

                "ghost_element.background": theme.background,
                "ghost_element.hover": theme.backgroundHover,
                "ghost_element.active": theme.backgroundActive,
                "ghost_element.selected": theme.backgroundActive,
                "ghost_element.disabled": theme.backgroundDisabled,

                text: theme.foreground,
                "text.muted": theme.foregroundAlt,
                "text.placeholder": theme.foregroundPlaceholder,
                "text.disabled": theme.foregroundDisabled,
                "text.accent": theme.primary,

                "editor.background": theme.editorBackground,
                "editor.gutter.background": theme.editorBackground,
                "editor.foreground": theme.editorForeground,
                "editor.line_number": theme.editorLineNumber,
                "editor.active_line_number": theme.editorLineNumberActive,
                "editor.active_line.background":
                    theme.editorActiveLineBackground,
                "editor.indent_guide": theme.indentGuide,
                "editor.indent_guide_active": theme.indentGuideActive,
                "editor.selection.background": theme.selectionBackground,
                "editor.document_highlight.read_background": theme.transparent,
                "editor.document_highlight.write_background": theme.editorMatch,
                "editor.document_highlight.bracket_background":
                    theme.editorMatch,

                "search.match_background": theme.findMatchBackground,
                "search.active_match_background":
                    theme.findMatchActiveBackground,
                "search.match_border": theme.findMatchBorder,

                link_text: theme.linkText,
                "link_text.hover": theme.linkUriHover,

                "pane.focused_border": theme.borderActive,
                "pane_group.border": theme.borderAlt,

                "panel.background": theme.backgroundAlt,
                "panel.focused_border": theme.borderActive,
                "panel.indent_guide": theme.indentGuide,
                "panel.indent_guide_active": theme.indentGuideActive,
                "panel.indent_guide_hover": theme.indentGuideHover,
                "panel.overlay_background": theme.backgroundAlt,

                icon: theme.foreground,
                "icon.muted": theme.foregroundAlt,
                "icon.disabled": theme.foregroundDisabled,
                "icon.placeholder": theme.foregroundPlaceholder,
                "icon.accent": theme.primary,

                conflict: theme.gitConflict,
                "conflict.background": theme.gitConflictBackground,
                "conflict.border": theme.gitConflict,

                created: theme.gitAdded,
                "created.background": theme.gitAddedBackground,
                "created.border": theme.gitAdded,

                deleted: theme.gitDeleted,
                "deleted.background": theme.gitDeletedBackground,
                "deleted.border": theme.gitDeleted,

                hidden: theme.neutralAlt,
                "hidden.background": theme.backgroundAlt,
                "hidden.border": theme.neutralAlt,

                hint: theme.info,
                "hint.background": theme.backgroundAlt,
                "hint.border": theme.infoAlt,

                ignored: theme.gitIgnored,
                "ignored.background": theme.backgroundAlt,
                "ignored.border": theme.gitIgnored,

                modified: theme.gitModified,
                "modified.background": theme.gitModifiedBackground,
                "modified.border": theme.gitModified,

                predictive: theme.foregroundAlt,
                "predictive.background": theme.backgroundAlt,
                "predictive.border": theme.foregroundAlt,

                renamed: theme.gitRenamed,
                "renamed.background": theme.gitRenamedBackground,
                "renamed.border": theme.gitRenamed,

                info: theme.info,
                "info.background": theme.backgroundAlt,
                "info.border": theme.infoAlt,

                warning: theme.warning,
                "warning.background": theme.backgroundAlt,
                "warning.border": theme.warningAlt,

                success: theme.success,
                "success.background": theme.backgroundAlt,
                "success.border": theme.successAlt,

                error: theme.danger,
                "error.background": theme.backgroundAlt,
                "error.border": theme.danger,

                unreachable: theme.danger,
                "unreachable.background": theme.backgroundAlt,
                "unreachable.border": theme.danger,

                "status_bar.background": theme.backgroundAlt,
                "title_bar.background": theme.titlebarBackground,
                "toolbar.background": theme.toolbarBackground,

                "tab_bar.background": theme.tabsBackground,
                "tab.active_background": theme.tabActiveBackground,
                "tab.active_foreground": theme.tabActiveForeground,
                "tab.inactive_background": theme.tabInactiveBackground,
                "tab.border": theme.tabBorder,

                "scrollbar.track.background": theme.scrollbarTrackBackground,
                "scrollbar.track.border": theme.scrollbarTrackBorder,
                "scrollbar.thumb.background": theme.scrollbarThumbBackground,
                "scrollbar.thumb.hover_background":
                    theme.scrollbarThumbHoverBackground,
                "scrollbar.thumb.active_background":
                    theme.scrollbarThumbActiveBackground,

                "minimap.thumb.background": theme.minimapThumbBackground,
                "minimap.thumb.hover_background":
                    theme.minimapThumbHoverBackground,
                "minimap.thumb.active_background":
                    theme.minimapThumbActiveBackground,
                "minimap.thumb.border": theme.minimapThumbBorder,

                "terminal.background": theme.terminalBackground,
                "terminal.foreground": theme.terminalForeground,
                "terminal.bright_foreground": theme.terminalBrightForeground,
                "terminal.dim_foreground": theme.terminalDimForeground,
                "terminal.selection.background": theme.selectionBackground,
                "terminal.selection.foreground": theme.selectionForeground,

                "terminal.ansi.black": theme.terminalAnsiBlack,
                "terminal.ansi.red": theme.terminalAnsiRed,
                "terminal.ansi.green": theme.terminalAnsiGreen,
                "terminal.ansi.yellow": theme.terminalAnsiYellow,
                "terminal.ansi.blue": theme.terminalAnsiBlue,
                "terminal.ansi.magenta": theme.terminalAnsiMagenta,
                "terminal.ansi.cyan": theme.terminalAnsiCyan,
                "terminal.ansi.white": theme.terminalAnsiWhite,

                "terminal.ansi.bright_black": theme.terminalAnsiBrightBlack,
                "terminal.ansi.bright_red": theme.terminalAnsiBrightRed,
                "terminal.ansi.bright_green": theme.terminalAnsiBrightGreen,
                "terminal.ansi.bright_yellow": theme.terminalAnsiBrightYellow,
                "terminal.ansi.bright_blue": theme.terminalAnsiBrightBlue,
                "terminal.ansi.bright_magenta": theme.terminalAnsiBrightMagenta,
                "terminal.ansi.bright_cyan": theme.terminalAnsiBrightCyan,
                "terminal.ansi.bright_white": theme.terminalAnsiBrightWhite,

                "terminal.ansi.dim_black": theme.terminalAnsiDimBlack,
                "terminal.ansi.dim_red": theme.terminalAnsiDimRed,
                "terminal.ansi.dim_green": theme.terminalAnsiDimGreen,
                "terminal.ansi.dim_yellow": theme.terminalAnsiDimYellow,
                "terminal.ansi.dim_blue": theme.terminalAnsiDimBlue,
                "terminal.ansi.dim_magenta": theme.terminalAnsiDimMagenta,
                "terminal.ansi.dim_cyan": theme.terminalAnsiDimCyan,
                "terminal.ansi.dim_white": theme.terminalAnsiDimWhite,

                players: [
                    {
                        cursor: theme.primary,
                        selection: theme.selectionBackground,
                        background: theme.background,
                    },
                ],

                syntax: {
                    attribute: {
                        color: theme.syntaxAttribute,
                    },
                    boolean: {
                        color: theme.syntaxBoolean,
                    },
                    comment: {
                        color: theme.syntaxComment,
                    },
                    constructor: {
                        color: theme.syntaxConstructor,
                    },
                    constant: {
                        color: theme.syntaxConstant,
                    },
                    function: {
                        color: theme.syntaxFunction,
                    },
                    keyword: {
                        color: theme.syntaxKeyword,
                    },
                    number: {
                        color: theme.syntaxNumber,
                    },
                    operator: {
                        color: theme.syntaxOperator,
                    },
                    property: {
                        color: theme.syntaxProperty,
                    },
                    selector: {
                        color: theme.syntaxSelector,
                    },
                    "selector.pseudo": {
                        color: theme.syntaxSelectorSpecial,
                    },
                    "selector.id": {
                        color: theme.syntaxSelectorSpecial,
                    },
                    string: {
                        color: theme.syntaxString,
                    },
                    "string.escape": {
                        color: theme.syntaxStringEscape,
                    },
                    "string.regex": {
                        color: theme.syntaxStringRegex,
                    },
                    tag: {
                        color: theme.syntaxTag,
                    },
                    type: {
                        color: theme.syntaxType,
                    },
                    namespace: {
                        color: theme.syntaxNamespace,
                    },
                    namespace: {
                        color: theme.syntaxType,
                    },
                    variable: {
                        color: theme.syntaxVariable,
                    },
                    "variable.special": {
                        color: theme.syntaxVariableSpecial,
                    },
                    "variable.parameter": {
                        color: theme.syntaxVariableParameter,
                    },
                    text: {
                        color: theme.foreground,
                    },
                    "text.literal": {
                        color: theme.syntaxTextLiteral,
                    },
                    emphasis: {
                        color: theme.syntaxEmphasis,
                        font_weight: 700,
                        font_style: "italic",
                    },
                    "emphasis.strong": {
                        color: theme.syntaxEmphasisStrong,
                        font_weight: 700,
                    },
                    link_text: {
                        color: theme.linkText,
                    },
                    link_uri: {
                        color: theme.linkUri,
                    },
                    title: {
                        color: theme.syntaxTitle,
                    },
                    punctuation: {
                        color: theme.syntaxPunctuation,
                    },
                    "punctuation.special": {
                        color: theme.syntaxPunctuationSpecial,
                    },
                },
            },
        },
    ],
});
