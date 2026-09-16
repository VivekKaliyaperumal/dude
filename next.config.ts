import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock photography is a stop-gap until dude & Co. supplies its own site photos.
    // Every remote image is declared in content/images.ts and rendered through
    // components/ui/ImageWithCredit so the Unsplash credit requirement is met.
    // The custom loader serves Unsplash sizes from Unsplash's CDN (see lib/images/loader.ts).
    loader: "custom",
    loaderFile: "./lib/images/loader.ts",
    qualities: [50, 60, 70, 75],
  },
};

export default nextConfig;
