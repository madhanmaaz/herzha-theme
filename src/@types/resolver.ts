import type { Palette, ResolvedTheme } from "./palette";

/**
 * Colors given as a dark/light pair — resolved down to one via
 * ResolverOptions.getColorByAppearance().
 */
export interface AppearancePair {
    dark: string;
    light: string;
}

/**
 * Helpers built.js constructs (see src/resolverHelpers.js) and passes as a
 * resolver's second argument. Currently just appearance-based color
 * selection, scoped to a closure over the palette being resolved.
 */
export interface ResolverOptions {
    /**
     * Picks `dark` or `light` from the pair. Defaults to the palette's own
     * `appearance` field — pass `appearance` explicitly only to deviate
     * from that (e.g. a resolver that always wants the dark variant for
     * one specific field regardless of the palette's overall appearance).
     */
    getColorByAppearance(
        pair: AppearancePair,
        appearance?: "dark" | "light",
    ): string;
}

/**
 * A resolver's job: take a possibly-partial Palette (alt/foreground fields
 * may be missing) and return a fully-populated ResolvedTheme. Called once
 * per palette, per build, before any overrides or component() run.
 *
 * Must not mutate the input — /scripts/build-herzha.js may reuse the same palette object
 * across adapters in one build pass.
 */
export type ResolveThemeFn = (
    palette: ResolvedTheme,
    options: ResolverOptions,
) => ResolvedTheme;

/**
 * The full shape of a `src/resolvers/*.js` module, i.e. what
 * `module.exports` (or `exports.<field> = `) must add up to.
 */
export interface ResolverModule {
    resolveTheme: ResolveThemeFn;
}
