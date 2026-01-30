const { themeOptions } = require("../core/theme-config");
const { withAlpha, blend } = require("../core/helpers");

module.exports = {
    ext: "json",
};

module.exports.component = (theme = themeOptions) => ({
    name: theme.name,
    type: theme.appearance,
    colors: {
        focusBorder: theme.borderActive,
        foreground: theme.foreground,
        disabledForeground: theme.foregroundDisabled,
        "widget.border": theme.border,
        "widget.shadow": theme.shadow,
        "selection.background": theme.selectionBackground,
        descriptionForeground: theme.foregroundAlt,
        errorForeground: theme.danger,
        "icon.foreground": theme.foreground,

        "textLink.activeForeground": theme.linkUriHover,
        "textLink.foreground": theme.linkText,
        "textSeparator.foreground": theme.foregroundAlt,

        "toolbar.hoverBackground": theme.backgroundHover,
        "toolbar.hoverOutline": theme.neutralAlt,
        "toolbar.activeBackground": theme.backgroundActive,

        "button.background": theme.primary,
        "button.foreground": theme.primaryForeground,
        "button.border": theme.transparent,
        "button.separator": theme.foreground,
        "button.hoverBackground": theme.primaryAlt,
        "button.secondaryBackground": theme.neutral,
        "button.secondaryForeground": theme.neutralForeground,
        "button.secondaryHoverBackground": theme.neutralAlt,

        "dropdown.background": theme.backgroundAlt,
        "dropdown.foreground": theme.foreground,
        "dropdown.border": theme.border,
        "dropdown.listBackground": theme.background,

        "input.background": theme.background,
        "input.foreground": theme.foreground,
        "input.border": theme.border,
        "input.placeholderForeground": theme.foregroundPlaceholder,
        "inputOption.activeBackground": theme.backgroundActive,
        "inputOption.activeBorder": theme.borderActive,
        "inputOption.activeForeground": theme.foreground,
        "inputOption.hoverBackground": theme.backgroundHover,
        "inputValidation.errorBackground": withAlpha(theme.danger, 0.25),
        "inputValidation.errorBorder": theme.danger,
        "inputValidation.infoBackground": withAlpha(theme.info, 0.25),
        "inputValidation.infoBorder": theme.info,
        "inputValidation.warningBackground": withAlpha(theme.warning, 0.25),
        "inputValidation.warningBorder": theme.warning,

        "scrollbar.background": theme.scrollbarTrackBackground,
        "scrollbar.shadow": theme.shadow,
        "scrollbarSlider.background": theme.scrollbarThumbBackground,
        "scrollbarSlider.activeBackground":
            theme.scrollbarThumbActiveBackground,
        "scrollbarSlider.hoverBackground": theme.scrollbarThumbHoverBackground,

        "badge.foreground": theme.primaryForeground,
        "badge.background": theme.primary,

        "progressBar.background": theme.primary,

        "list.activeSelectionBackground": theme.backgroundActive,
        "list.activeSelectionForeground": theme.foreground,
        "list.activeSelectionIconForeground": theme.foreground,
        "list.dropBackground": theme.dropTargetBackground,
        "list.invalidItemForeground": theme.danger,
        "list.errorForeground": theme.danger,
        "list.focusBackground": theme.backgroundActive,
        "list.focusForeground": theme.foreground,
        "list.highlightForeground": theme.primary,
        "list.hoverBackground": theme.backgroundHover,
        "list.hoverForeground": theme.foreground,
        "list.inactiveSelectionBackground": theme.backgroundActive,
        "list.inactiveSelectionForeground": theme.foreground,
        "tree.indentGuidesStroke": theme.indentGuide,

        "activityBar.background": theme.backgroundAlt,
        "activityBar.foreground": theme.foreground,
        "activityBar.inactiveForeground": theme.foregroundAlt,
        "activityBar.border": theme.border,
        "activityBarBadge.background": theme.primary,
        "activityBarBadge.foreground": theme.primaryForeground,
        "activityBar.activeBorder": theme.primary,

        "sideBar.background": theme.backgroundAlt,
        "sideBar.foreground": theme.foreground,
        "sideBar.border": theme.border,
        "sideBar.dropBackground": theme.dropTargetBackground,
        "sideBarTitle.foreground": theme.foreground,
        "sideBarSectionHeader.background": theme.backgroundAlt,
        "sideBarSectionHeader.foreground": theme.foreground,
        "sideBarSectionHeader.border": theme.transparent,

        "minimap.background": theme.background,
        "minimapSlider.background": theme.minimapThumbBackground,
        "minimapSlider.hoverBackground": theme.minimapThumbHoverBackground,
        "minimapSlider.activeBackground": theme.minimapThumbActiveBackground,

        "editorGroup.border": theme.border,
        "editorGroup.dropBackground": theme.dropTargetBackground,
        "editorGroupHeader.noTabsBackground": theme.backgroundAlt,
        "editorGroupHeader.tabsBackground": theme.tabsBackground,
        "editorGroupHeader.tabsBorder": theme.transparent,
        "editorGroupHeader.border": theme.borderAlt,
        "tab.activeBackground": theme.tabActiveBackground,
        "tab.activeForeground": theme.tabActiveForeground,
        "tab.border": theme.transparent,
        "tab.inactiveBackground": theme.tabInactiveBackground,
        "tab.inactiveForeground": theme.tabInactiveForeground,
        "tab.activeBorderTop": theme.tabActiveBorder,

        "editor.background": theme.background,
        "editor.foreground": theme.foreground,
        "editorLineNumber.foreground": theme.editorLineNumber,
        "editorLineNumber.activeForeground": theme.editorLineNumberActive,
        "editorCursor.foreground": theme.cursor,
        "editor.selectionBackground": theme.selectionBackground,
        "editor.inactiveSelectionBackground": theme.selectionInactiveBackground,
        "editorIndentGuide.background": theme.indentGuide,
        "editorIndentGuide.activeBackground": theme.indentGuideActive,
        "editor.selectionHighlightBackground": theme.editorMatch,
        "editor.wordHighlightBackground": theme.transparent,
        "editor.wordHighlightStrongBackground": theme.transparent,
        "editor.findMatchBackground": theme.findMatchActiveBackground,
        "editor.findMatchHighlightBackground": theme.findMatchBackground,
        "editor.lineHighlightBackground": theme.editorActiveLineBackground,
        "editor.lineHighlightBorder": theme.transparent,
        "editor.stackFrameHighlightBackground": blend(
            theme.transparent,
            theme.warning,
            0.25,
        ),
        "editorInlayHint.background": theme.backgroundAlt,
        "editorInlayHint.foreground": theme.foreground,
        "editorLink.activeForeground": theme.primary,
        "editorWhitespace.foreground": theme.editorWhitespace,
        "editorIndentGuide.background": theme.indentGuide,
        "editorError.foreground": theme.danger,
        "editorError.border": theme.transparent,
        "editorWarning.foreground": theme.warning,
        "editorWarning.border": theme.transparent,
        "editorGutter.modifiedBackground": theme.gitModified,
        "editorGutter.addedBackground": theme.gitAdded,
        "editorGutter.deletedBackground": theme.gitDeleted,
        "editorWidget.background": theme.backgroundAlt,
        "editorWidget.border": theme.border,
        "editorSuggestWidget.background": theme.backgroundAlt,
        "editorSuggestWidget.border": theme.border,
        "editorSuggestWidget.foreground": theme.foreground,
        "editorSuggestWidget.highlightForeground": theme.primary,
        "editorSuggestWidget.selectedBackground": theme.selectionBackground,
        "editorHoverWidget.background": theme.backgroundAlt,
        "editorHoverWidget.border": theme.border,
        "editorBracketMatch.background": theme.editorMatch,
        "editorBracketMatch.border": theme.editorMatchBorder,

        "menu.separatorBackground": theme.border,
        "quickInput.background": theme.backgroundAlt,
        "quickInput.foreground": theme.foreground,
        "pickerGroup.foreground": theme.primary,
        "pickerGroup.border": theme.borderAlt,

        "peekViewResult.selectionBackground": theme.backgroundActive,
        "peekViewResult.matchHighlightBackground": theme.editorMatch,
        "peekViewResult.lineForeground": theme.foregroundAlt,
        "peekViewResult.fileForeground": theme.foreground,
        "peekViewResult.background": theme.backgroundAlt,
        "peekViewEditor.matchHighlightBackground": theme.editorMatch,
        "peekViewEditor.background": theme.backgroundAlt,
        "peekViewTitleLabel.foreground": theme.foreground,
        "peekViewTitleDescription.foreground": theme.foregroundAlt,
        "peekViewTitle.background": theme.backgroundAlt,
        "peekView.border": theme.borderAlt,

        "titleBar.activeBackground": theme.titlebarBackground,
        "titleBar.inactiveBackground": theme.titlebarInactiveBackground,
        "titleBar.border": theme.border,
        "titleBar.activeForeground": theme.foreground,
        "titleBar.inactiveForeground": theme.foregroundAlt,

        "statusBar.background": theme.backgroundAlt,
        "statusBar.foreground": theme.foreground,
        "statusBar.border": theme.border,
        "statusBar.debuggingForeground": theme.warningForeground,
        "statusBar.debuggingBackground": theme.warning,
        "statusBarItem.activeBackground": theme.backgroundActive,
        "statusBarItem.hoverBackground": theme.backgroundHover,
        "statusBarItem.remoteBackground": theme.primary,
        "statusBarItem.remoteForeground": theme.primaryForeground,
        "statusBarItem.remoteHoverBackground": theme.primaryAlt,

        "panel.background": theme.backgroundAlt,
        "panel.border": theme.border,
        "panelTitle.activeBorder": theme.borderActive,
        "panelTitle.activeForeground": theme.foreground,
        "panelTitle.inactiveForeground": theme.foregroundAlt,

        "terminal.background": theme.terminalBackground,
        "terminal.foreground": theme.terminalForeground,
        "terminal.ansiBlack": theme.terminalAnsiBlack,
        "terminal.ansiBlue": theme.terminalAnsiBlue,
        "terminal.ansiCyan": theme.terminalAnsiCyan,
        "terminal.ansiGreen": theme.terminalAnsiGreen,
        "terminal.ansiMagenta": theme.terminalAnsiMagenta,
        "terminal.ansiRed": theme.terminalAnsiRed,
        "terminal.ansiWhite": theme.terminalAnsiWhite,
        "terminal.ansiYellow": theme.terminalAnsiYellow,
        "terminal.ansiBrightBlack": theme.terminalAnsiBrightBlack,
        "terminal.ansiBrightBlue": theme.terminalAnsiBrightBlue,
        "terminal.ansiBrightCyan": theme.terminalAnsiBrightCyan,
        "terminal.ansiBrightGreen": theme.terminalAnsiBrightGreen,
        "terminal.ansiBrightMagenta": theme.terminalAnsiBrightMagenta,
        "terminal.ansiBrightRed": theme.terminalAnsiBrightRed,
        "terminal.ansiBrightWhite": theme.terminalAnsiBrightWhite,
        "terminal.ansiBrightYellow": theme.terminalAnsiBrightYellow,
        "terminal.selectionBackground": theme.selectionBackground,
        "terminalCursor.background": theme.cursor,
        "terminalCursor.foreground": theme.cursor,
        "gitDecoration.modifiedResourceForeground": theme.gitModified,
        "gitDecoration.deletedResourceForeground": theme.gitDeleted,
        "gitDecoration.untrackedResourceForeground": theme.gitUntracked,
        "gitDecoration.ignoredResourceForeground": theme.gitIgnored,
        "gitDecoration.conflictingResourceForeground": theme.gitConflict,
        "gitDecoration.submoduleResourceForeground": theme.gitSubmodule,
        "diffEditor.insertedTextBackground": theme.gitAddedBackground,
        "diffEditor.removedTextBackground": theme.gitDeletedBackground,

        "editorBracketHighlight.foreground1": theme.syntaxPunctuation,
        "editorBracketHighlight.foreground2": theme.syntaxPunctuation,
        "editorBracketHighlight.foreground3": theme.syntaxPunctuation,
        "editorBracketHighlight.foreground4": theme.syntaxPunctuation,
        "editorBracketHighlight.foreground5": theme.syntaxPunctuation,
        "editorBracketHighlight.foreground6": theme.syntaxPunctuation,

        "welcomePage.tileBackground": theme.backgroundAlt,
        "welcomePage.progress.background": theme.neutral,

        "settings.headerForeground": theme.foreground,
        "settings.modifiedItemIndicator": theme.warning,

        "keybindingLabel.background": theme.backgroundAlt,
        "keybindingLabel.foreground": theme.foregroundAlt,
        "keybindingLabel.border": theme.neutral,
        "keybindingLabel.bottomBorder": theme.neutralAlt,

        "notificationCenter.border": theme.border,
        "notificationCenterHeader.foreground": theme.foreground,
        "notificationCenterHeader.background": theme.background,
        "notificationToast.border": theme.borderAlt,
        "notifications.foreground": theme.foreground,
        "notifications.background": theme.backgroundAlt,
        "notifications.border": theme.border,
    },

    semanticHighlighting: true,
    tokenColors: [
        {
            name: "Foreground",
            scope: ["entity.name.function.preprocessor"],
            settings: {
                foreground: theme.foreground,
            },
        },
        {
            name: "Attribute",
            scope: ["entity.other.attribute-name"],
            settings: {
                foreground: theme.syntaxAttribute,
            },
        },
        {
            name: "Boolean",
            scope: ["constant", "constant.language"],
            settings: {
                foreground: theme.syntaxBoolean,
            },
        },
        {
            name: "Comment",
            scope: ["comment"],
            settings: {
                foreground: theme.syntaxComment,
            },
        },
        {
            name: "Function",
            scope: ["entity.name.function"],
            settings: {
                foreground: theme.syntaxFunction,
            },
        },
        {
            name: "Keyword",
            scope: [
                "keyword",
                "storage.type",
                "storage.modifier",
                "storage.type.enum",
                "storage.type.struct",
                "storage.type.template",
            ],
            settings: {
                foreground: theme.syntaxKeyword,
            },
        },
        {
            name: "Number",
            scope: ["constant.numeric"],
            settings: {
                foreground: theme.syntaxNumber,
            },
        },
        {
            name: "Operator",
            scope: ["keyword.operator", "entity.name.function.operator"],
            settings: {
                foreground: theme.syntaxOperator,
            },
        },
        {
            name: "Property",
            scope: [
                "variable.other.property",
                "variable.other.constant.property",
                "support.type.property-name",
            ],
            settings: {
                foreground: theme.syntaxProperty,
            },
        },
        {
            name: "Selector",
            scope: ["entity.other.attribute-name.class.css"],
            settings: {
                foreground: theme.syntaxSelector,
            },
        },
        {
            name: "SelectorId",
            scope: ["entity.other.attribute-name.id.css"],
            settings: {
                foreground: theme.syntaxSelectorSpecial,
            },
        },
        {
            name: "SelectorPseudo",
            scope: ["entity.other.attribute-name.pseudo-element"],
            settings: {
                foreground: theme.syntaxSelectorSpecial,
            },
        },
        {
            name: "String",
            scope: ["string", "constant.other.symbol"],
            settings: {
                foreground: theme.syntaxString,
            },
        },
        {
            name: "String Escape",
            scope: ["constant.character", "constant.other"],
            settings: {
                foreground: theme.syntaxStringEscape,
            },
        },
        {
            name: "String Regex",
            scope: ["string.regexp"],
            settings: {
                foreground: theme.syntaxStringRegex,
            },
        },
        {
            name: "Tag",
            scope: ["entity.name.tag", "meta.tag.sgml"],
            settings: {
                foreground: theme.syntaxTag,
            },
        },
        {
            name: "Type",
            scope: [
                "entity.name.class",
                "entity.name.module",
                "entity.name.type",
                "storage.identifier",
                "support.class",
                "storage.type.built-in.primitive",
                "support.type",
            ],
            settings: {
                foreground: theme.syntaxType,
            },
        },
        {
            name: "Namespace",
            scope: ["entity.name.scope-resolution"],
            settings: {
                foreground: theme.syntaxNamespace,
            },
        },
        {
            name: "Variable",
            scope: ["variable", "variable.parameter.function-call"],
            settings: {
                foreground: theme.syntaxVariable,
            },
        },
        {
            name: "Variable Special",
            scope: [
                "variable.language",
                "variable.parameter.function.language.special.self.python",
            ],
            settings: {
                foreground: theme.syntaxVariableSpecial,
            },
        },
        {
            name: "Variable Parameter & Arguments",
            scope: ["variable.parameter", "meta.parameter"],
            settings: {
                foreground: theme.syntaxVariableParameter,
            },
        },
        {
            name: "Text Literal",
            scope: ["text.html.markdown markup.inline.raw"],
            settings: {
                foreground: theme.syntaxTextLiteral,
            },
        },
        {
            name: "Emphasis",
            scope: ["markup.bold"],
            settings: {
                foreground: theme.syntaxEmphasis,
            },
        },
        {
            name: "Emphasis Strong",
            scope: ["punctuation.definition.bold"],
            settings: {
                foreground: theme.syntaxEmphasisStrong,
            },
        },
        {
            name: "Link Text",
            scope: [
                "string.other.link.title",
                "punctuation.definition.link.title",
                "string.other.link.description",
                "punctuation.definition.link.description",
            ],
            settings: {
                foreground: theme.linkText,
            },
        },
        {
            name: "Link Uri",
            scope: ["markup.underline.link", "punctuation.definition.metadata"],
            settings: {
                foreground: theme.linkUri,
            },
        },
        {
            name: "Title",
            scope: ["markup.heading"],
            settings: {
                foreground: theme.syntaxTitle,
            },
        },
        {
            name: "Punctuation",
            scope: [
                "punctuation.definition.markdown",
                "punctuation.separator",
                "punctuation.terminator",
                "punctuation.section",
                "punctuation.accessor",
                "punctuation.definition.template-expression",
                "punctuation.section.embedded",
                "punctuation.definition.tag.end",
                "punctuation.definition.tag.begin",
                "punctuation.definition.tag",
                "meta.decorator punctuation.decorator",
                "markup.list punctuation.definition.list.begin",
            ],
            settings: {
                foreground: theme.syntaxPunctuation,
            },
        },
        {
            name: "Punctuation Special",
            scope: [
                "punctuation.definition.template-expression",
                "punctuation.section.embedded",
                "punctuation.definition.template-expression.begin.js",
                "punctuation.definition.template-expression.end.js",
            ],
            settings: {
                foreground: theme.syntaxPunctuationSpecial,
            },
        },
    ],
});
