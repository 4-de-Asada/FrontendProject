import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. La configuración que ya tenías para las imágenes del marketplace
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 2. La nueva configuración para permitir los Server Actions en Codespaces
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