import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 1. Ignore TypeScript Errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. (Optional) increase timeout for AI generation if needed
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
