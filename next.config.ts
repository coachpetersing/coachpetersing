import type { NextConfig } from "next";

// Pages from the old site. Each one 301s to the home page.
const oldRoutes = ["/work", "/coaching", "/about", "/contact", "/thanks"];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920],
  },
  async redirects() {
    return oldRoutes.flatMap((source) => [
      { source, destination: "/", statusCode: 301 as const },
      { source: `${source}/:path*`, destination: "/", statusCode: 301 as const },
    ]);
  },
};

export default nextConfig;
