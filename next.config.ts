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
        // Baseline security headers (SEO audit 18-Nov-2026: only HSTS was sent). Microphone stays allowed
        // for this origin because the voice assistant (components/assistant/useLiveSession.ts) needs it.
        // A full Content-Security-Policy is left for a report-only trial: inline scripts and remote images need mapping first.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)" },
        ],
      },
      {
        // Rendition URLs carry the source's content hash (?v=…), so they can be cached indefinitely.
        source: "/photos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
