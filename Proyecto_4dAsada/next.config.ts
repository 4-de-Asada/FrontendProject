import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wiwywhzwcmkukaagilxr.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
        "*.preview.app.github.dev",
        "fuzzy-cod-v67pj9jwjp4qhwx44-3000.app.github.dev"
      ]
    }
  }
};

export default nextConfig;