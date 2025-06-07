import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: {
    position: 'bottom-right'
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Disable all developer comments
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Remove powered-by header
  poweredByHeader: false
};

export default nextConfig;
