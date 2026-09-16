import type { ImageLoaderProps } from "next/image";

/**
 * Custom next/image loader.
 *
 * Unsplash photos are served straight from Unsplash's own CDN at the requested width and
 * quality, so the browser gets a proper srcset without our server having to fetch and
 * re-encode every image (which timed out in development). Local assets - only the small
 * logo mark - are returned as-is. When real site photos replace the stock ones, drop them
 * in public/photos/ and they will also be served as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
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
