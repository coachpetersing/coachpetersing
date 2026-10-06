import type { NextConfig } from "next";

// Pages still prerender to static HTML. Not using `output: "export"` so Vercel can serve
// next/image in AVIF and WebP at the right size for each device.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
  },
};

export default nextConfig;
