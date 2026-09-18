import type { ImageLoaderProps } from "next/image";
import { photoUrl } from "./photos";

/**
 * Custom next/image loader.
 *
 * - Own photography ("/photos/<key>", built by `pnpm photos`) is served from the pre-rendered
 *   WebP rendition nearest the requested width, with a content hash for long caching. Quality
 *   is fixed when the renditions are built, so `quality` is ignored for these.
 * - Unsplash stock is served straight from Unsplash's CDN at the requested width and quality,
 *   so the browser gets a proper srcset without our server re-encoding every image (which
 *   timed out in development).
 * - Anything else (the small logo mark) is returned as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("/photos/")) return photoUrl(src, width);
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    return url.toString();
  }
  return src;
}
