import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "chart.js": path.resolve("./node_modules/chart.js"),
    };
    return config;
  },
};

export default nextConfig;
