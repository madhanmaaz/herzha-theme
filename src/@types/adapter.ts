import type { ResolvedTheme } from "./palette";

/**
 * Renders a resolved theme into whatever shape this adapter's target app
 * expects (a JSON theme file, a CSS string, etc). Whatever this returns is
 * passed through `formatSource()` (src/formatters.js) using `ext`, and is
 * also what `adapterOutputOverrides[appName]` in a palette receives/returns
 * (see AdapterOutputOverride in @types/palette.ts) — keep TOutput here
 * consistent with the TOutput used there for a given adapter.
 */
export type ComponentFn<TOutput = unknown> = (theme: ResolvedTheme) => TOutput;

/** Args /scripts/build-herzha.js passes into `plugin()` after writing the formatted output to disk. */
export interface PluginArgs {
    /** Formatted (string) output, already run through formatSource(). */
    content: string;
    /** Output file's basename, e.g. "herzha-azure.json". */
    filename: string;
    isDev: boolean;
    /** Palette's `name` field, unslugged. */
    themeName: string;
}

/**
 * Dev-mode side effect — e.g. writing a live copy into a running app's own
 * theme folder for hot preview. Return an absolute directory path to have
 * /scripts/build-herzha.js also write `content` there; return nothing to skip that.
 */
export type PluginFn = (args: PluginArgs) => string | void;

/**
 * The full shape of a `src/adapters/*.js` module, i.e. what
 * `module.exports` (or `exports.<field> = `) must add up to.
 */
export interface AdapterModule<TOutput = unknown> {
    /** Output file extension, used to pick a formatter in src/formatters.js (e.g. "json"). */
    ext: string;

    component: ComponentFn<TOutput>;

    /** Optional — most adapters won't need a dev-mode live-write step. */
    plugin?: PluginFn;
}
