// ============================================================
// PUSATPERIZINAN.COM — Next Config
// DEV/PRODUCTION: Next.js standalone output for Node.js hosting.
// Use Webpack for production builds to avoid the Hostinger Turbopack
// CSS worker process failure observed in the deployment logs.
// ============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/orm-postgres"],
  output: "standalone",
  // Shared hosting can report dozens of CPUs despite a much smaller thread quota.
  // Limiting Next's build worker pool avoids SIGABRT/EAGAIN during page-data collection.
  experimental: {
    cpus: 2,
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/sitemap.xml", destination: "/api/sitemap-index" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
