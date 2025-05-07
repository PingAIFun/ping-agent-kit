import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  serverExternalPackages: ["@solana-agent-kit/plugin-defi"],
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
