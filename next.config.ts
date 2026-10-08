import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["preview-chat-69b4661b-23db-47bf-80ba-030569a93596.space-z.ai", "*.space-z.ai"],
};

export default nextConfig;
