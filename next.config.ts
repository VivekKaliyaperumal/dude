import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Own photography lives in photos/ and is pre-rendered by `pnpm photos` into public/photos/
    // (WebP at several widths) plus a manifest; the custom loader picks the rendition. Remaining
    // stock photos are served from Unsplash's CDN. Every image is declared in content/images.ts
    // and rendered with its credit (components/ui/ImageWithCredit). See lib/images/loader.ts.
    loader: "custom",
    loaderFile: "./lib/images/loader.ts",
    qualities: [50, 60, 70, 75],
  },
  async headers() {
    return [
      {
        // Rendition URLs carry the source's content hash (?v=…), so they can be cached indefinitely.
        source: "/photos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
