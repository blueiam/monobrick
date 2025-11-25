import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 https 이미지 허용
      },
      {
        protocol: "http",
        hostname: "**", // 모든 http 이미지 허용
      },
    ],
  },
};

export default nextConfig;