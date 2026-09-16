import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock photography is a stop-gap until dude & Co. supplies its own site photos.
    // Every remote image is declared in content/images.ts and rendered through
    // components/ui/ImageWithCredit so the credit + referral requirements are met.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [70, 75],
  },
};

export default nextConfig;
