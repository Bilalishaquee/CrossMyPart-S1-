import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Hides the floating “N” Next.js dev tools button (Route / Turbopack menu) in development. */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
