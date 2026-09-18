import manifest from "./photos.manifest.json";

/**
 * Own site photography, pre-rendered by `pnpm photos` (scripts/photos.mjs).
 *
 * A photo is referenced as "/photos/<key>" (the original's path under photos/, extension
 * optional). The manifest lists the WebP renditions that exist for it, so the loader can pick
 * one without guessing, and a content hash so renditions can be cached immutably.
 */
export type PhotoEntry = { width: number; height: number; widths: number[]; hash: string };

const PREFIX = "/photos/";
const entries = manifest as Record<string, PhotoEntry>;

function keyOf(src: string): string {
  return src.slice(PREFIX.length).replace(/\.\w+$/, "");
}

/** Manifest entry for a "/photos/…" source, or undefined for anything else (remote URLs, the logo). */
export function photoEntry(src: string): PhotoEntry | undefined {
  return src.startsWith(PREFIX) ? entries[keyOf(src)] : undefined;
}

/**
 * URL of the rendition that best serves `width` device pixels: the smallest rendition at or
 * above it, else the largest that exists (never upscaled). Unknown sources come back unchanged.
 */
export function photoUrl(src: string, width: number): string {
  const entry = photoEntry(src);
  if (!entry) return src;
  const w = entry.widths.find((x) => x >= width) ?? entry.widths[entry.widths.length - 1];
  return `${PREFIX}${keyOf(src)}-${w}.webp?v=${entry.hash}`;
}
