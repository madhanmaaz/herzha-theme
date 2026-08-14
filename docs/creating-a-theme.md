# Creating a Theme

Three pieces make up a theme build: a **palette** (colors), a **resolver** (fills in derived fields), and an **adapter** (renders to a target editor's format). The pipeline runs in this order:

```
palette → resolver → themeOverrides → themeOverridesForApp → component() → adapterOutputOverrides
```

Most of the time you only need Step 1 — resolvers and adapters are reusable across many palettes, so you'll write those far less often.

---

## Step 1 — Create a Palette

**1.1 Create the file:** `src/palettes/<palette-name>.js`

**1.2 File structure:**

```js
/** @type {import('../@types/palette').PaletteModule} */
module.exports = {
    resolver: "default",
    palette: {
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
    },

    // Patches the RESOLVED theme (palette + resolver-derived fields).
    // Always applied, for every adapter, after the resolver runs.
    themeOverrides: {
        border: "#2A2E3A",
    },

    // Same as themeOverrides, but only for one specific adapter — keyed by
    // the adapter's filename under src/adapters/ (no extension, lowercase).
    // Applied after themeOverrides, right before that adapter's component() runs.
    // If both set the same field, this one wins.
    themeOverridesForApp: {
        zed: {
            border: "#3C4152",
        },
    },

    // Patches an adapter's RENDERED OUTPUT — runs after component(), not
    // before. Keyed by adapter name, same as themeOverridesForApp. Each fn
    // must return a value — a bare `return` is treated as a build error.
    adapterOutputOverrides: {
        zed(output) {
            return {
                ...output,
                style: {
                    ...output.style,
                    "editor.line_height": 1.5,
                },
            };
        },
    },
};
```

**1.3 How each field works:**

- `resolver`
    - Name (no extension) of the file under `src/resolvers/` to run this palette through — e.g. `"default"` runs `src/resolvers/default.js`.
    - Optional. Defaults to `"default"` if omitted.
    - The resolver takes your raw `palette` (which only needs `name`, `author`, `appearance`, and the base colors — see required fields below) and fills in everything derived: `*Foreground` contrast pairs, `cursor`, `shadow`, `border`, etc, depending on what that resolver computes.
- `palette`
    - The raw colors and metadata you write by hand.
    - Required fields (enforced by `validatePalette` in `src/helpers.js` — a palette missing any of these fails to build with a clear error listing what's missing): `name`, `author`, `appearance` (`"dark"` or `"light"` only), `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `danger`.
    - Everything else (`*Alt` fields, `foreground`, `background`, etc) is optional at this stage — either you supply it, or the resolver derives it, or it's left undefined for an adapter that doesn't need it.
- `themeOverrides`
    - Patches the **resolved** theme (palette + everything the resolver added) — not the raw palette.
    - Always applied, for every adapter, after the resolver runs and before any adapter-specific step.
    - Use this for a tweak that should apply everywhere, e.g. `{ border: "#00ff00" }`.
- `themeOverridesForApp`
    - Same as `themeOverrides`, but only applied when building for one specific adapter.
    - Keyed by adapter name (the adapter's filename under `src/adapters/`, no extension, lowercase) — e.g. `{ zed: { border: "#ff0000" } }` only patches the theme when building the `zed` adapter.
    - Applied after `themeOverrides`, immediately before that adapter's `component()` runs. If both are set, `themeOverridesForApp` wins on any overlapping field.
- `adapterOutputOverrides`
    - Patches an adapter's **rendered output** — i.e. runs _after_ `component()`, not before. This is the only override stage that doesn't touch the theme object at all; it touches what the adapter produced from it.
    - Keyed by adapter name, same as `themeOverridesForApp`.
    - Each entry is a function: `(output) => output`. **Must return a value** — a bare `return` (returning `undefined`) is treated as a build error on purpose, since silently writing `undefined` to a theme file is worse than failing loudly.

---

## Step 2 — Create a Resolver

_Skip this step if `"default"` already produces everything your adapters need._

A resolver turns a raw `palette` into a fully-populated theme — filling in whatever derived fields your adapters expect (contrast foregrounds, borders, shadows, etc). It runs once per palette, per build, before any overrides or `component()`.

**2.1 Create the file:** `src/resolvers/<resolver-name>.js`

A palette selects this resolver by filename (no extension): `resolver: "<resolver-name>"` in its `PaletteModule`. Omitting `resolver` in a palette defaults to `"default"`, i.e. `src/resolvers/default.js`.

**2.2 File structure:**

```js
const { darken, lighten, withAlpha } = require("../colorUtils");

/** @type {import('../@types/resolver').ResolveThemeFn} */
exports.resolveTheme = (palette, { getColorByAppearance }) => {
    const theme = { ...palette };

    theme.cursor = theme.primary;
    theme.shadow = theme.background;
    theme.transparent = "#00000000";
    theme.dropTargetBackground = withAlpha(theme.primary, 0.2);

    theme.border = getColorByAppearance({
        dark: lighten(theme.background, 0.06),
        light: darken(theme.background, 0.2),
    });
    theme.borderAlt = getColorByAppearance({
        dark: lighten(theme.background, 0.12),
        light: darken(theme.background, 0.3),
    });
    theme.borderHover = getColorByAppearance({
        dark: lighten(theme.background, 0.24),
        light: darken(theme.background, 0.5),
    });

    // .... 150+
    
    return theme;
};
```

**2.3 How it works:**

- `resolveTheme(palette, options)`
    - `palette` — the raw `palette` object from the palette file. Only guaranteed to have the fields `validatePalette` requires (`name`, `author`, `appearance`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `danger`) — everything else may be missing.
    - **Must not mutate `palette`.** Spread into a new object (`{ ...palette }`) first, like the example does — the build script may reuse the same palette object across multiple adapters in one build pass, so mutating it would leak changes from one adapter's build into another's.
    - **Must return** the completed theme object.
- `options.getColorByAppearance({ dark, light }, appearance?)`
    - Provided by `src/resolverHelpers.js`, built fresh per palette before your resolver is called.
    - Picks `dark` or `light` based on the palette's own `appearance` field — you don't need to write `theme.appearance === "dark" ? x : y` by hand for every derived color.
    - The second, optional `appearance` argument lets you force a branch regardless of the palette's actual appearance (rare — most resolvers never pass it).

**2.4 Helpers available** (`src/colorUtils.js`):

`withAlpha`, `lighten`, `darken`, `muted`, `blend`, `adaptiveBackground`, `generateContrastForeground` — import only the ones you actually use; unused imports in a resolver file are dead weight and make it harder to see which color operations the resolver actually performs.

> **Note:** `src/resolvers/default.js` additionally auto-generates a `<key>Foreground` pair (via `generateContrastForeground`) for every base/alt color — `primaryForeground`, `secondaryAltForeground`, etc. A custom resolver like the one above does **not** do this by default. If any adapter's `component()` reads `theme.primaryForeground` (or similar), and a palette uses a resolver that doesn't generate it, that field comes through as `undefined` with no build error. Either have your custom resolver generate the same `*Foreground` fields `default.js` does, or make sure no adapter you're targeting depends on them.

---

## Step 3 — Create an Adapter

_Skip this step if you're only building for editors that already have an adapter under `src/adapters/`._

Adapters convert a resolved theme into a specific editor or tool's file format.

**3.1 Create the file:** `src/adapters/<adapter-name>.js`

**3.2 File structure:**

```js
const os = require("node:os");
const path = require("node:path");

/** @type {import('../@types/adapter').AdapterModule} */
module.exports = {
    // Output file extension.
    // Must be registered in `src/formatters.js` or the build throws
    // "No formatter registered for extension".
    ext: "json",

    // Optional: dev-mode side effect, e.g. writing a live copy into a
    // running app's own theme folder so you can see changes without reinstalling.
    plugin({ isDev, content, themeName, filename }) {
        if (!isDev) return; // skip the live-write outside --dev

        const themeFolder =
            os.platform() === "win32"
                ? path.join(os.homedir(), "AppData", "Roaming", "Zed", "themes")
                : path.join(os.homedir(), ".config", "zed", "themes");

        return themeFolder;
    },

    // Convert a resolved theme into this adapter's target format.
    // Receives the theme AFTER themeOverrides + themeOverridesForApp have
    // already been applied. Whatever this returns is passed to the
    // formatter registered for `ext`, then to adapterOutputOverrides (if
    // the palette defines one for this adapter), then written to disk.
    component: (theme) => ({
        name: theme.name,
        author: theme.author,
        appearance: theme.appearance,
        theme: {
            background: theme.background,
            foreground: theme.foreground,
        },
    }),
};
```

**3.3 Adapter API explained:**

- `ext`
    - Output file extension (`json`, `xml`, `tmTheme`, etc).
    - Must be registered in `src/formatters.js`.
- `plugin({ content, filename, isDev, themeName })` (optional)
    - Runs after the main output file is already written to `packages/<app-name>/themes/`.
    - Use it when the target editor also needs a copy in its own config directory for local/dev testing.
    - **Must return a string (an absolute directory path) or nothing**. Returning a string tells the build script to also write `content` there, under the same `filename`. Returning nothing (or any other falsy value) skips this step.
- `component(theme)`
    - Receives the fully resolved theme — resolver output, with `themeOverrides` and any `themeOverridesForApp[<this-adapter>]` already merged in.
    - Returns this adapter's own theme structure, in whatever shape the target editor/tool expects.
    - Does **not** see `adapterOutputOverrides` — that runs on `component`'s return value, one layer up in the build script, not inside the adapter itself.
