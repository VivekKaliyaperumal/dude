#!/usr/bin/env node
/**
 * Builds the site's own photography for the web.
 *
 *   photos/<key>.jpg  ──▶  public/photos/<key>-<width>.webp  (one per width)
 *                      ──▶  lib/images/photos.manifest.json   (native size, widths, content hash)
 *
 * Run `pnpm photos` after adding or replacing a file under photos/. Originals are never
 * served; the manifest lets lib/images/loader.ts pick the right rendition for a request and
 * append a cache-busting hash. public/photos/ is generated output and is cleared each run.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "photos");
const OUT = path.join(ROOT, "public", "photos");
const MANIFEST = path.join(ROOT, "lib", "images", "photos.manifest.json");

/** Candidate widths; anything at or above the native width is replaced by the native width. */
const WIDTHS = [640, 960, 1280, 1920];
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp|tiff?)$/i.test(entry.name)) yield full;
  }
}

const manifest = {};
await rm(OUT, { recursive: true, force: true });

for await (const file of walk(SRC)) {
  const key = path.relative(SRC, file).split(path.sep).join("/").replace(/\.\w+$/, "");
  const input = await readFile(file);
  const hash = createHash("sha1").update(input).digest("hex").slice(0, 8);
  const meta = await sharp(input).metadata();
  // EXIF orientation 5-8 means the stored pixels are rotated 90°; .rotate() will fix that below.
  const swapped = (meta.orientation ?? 1) >= 5;
  const nativeWidth = swapped ? meta.height : meta.width;
  const nativeHeight = swapped ? meta.width : meta.height;
  const widths = [...WIDTHS.filter((w) => w < nativeWidth), nativeWidth];

  await mkdir(path.dirname(path.join(OUT, key)), { recursive: true });
  const sizes = [];
  for (const width of widths) {
    const out = path.join(OUT, `${key}-${width}.webp`);
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 6 }).toFile(out);
    sizes.push(`${width}w=${Math.round((await stat(out)).size / 1024)}KB`);
  }
  manifest[key] = { width: nativeWidth, height: nativeHeight, widths, hash };
  console.log(`${key}  ${nativeWidth}x${nativeHeight}  ${sizes.join("  ")}`);
}

const ordered = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, JSON.stringify(ordered, null, 2) + "\n");
console.log(`\n${Object.keys(ordered).length} photo(s) → ${path.relative(ROOT, OUT)}, manifest ${path.relative(ROOT, MANIFEST)}`);
