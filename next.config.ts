// ============================================================
// PUSATPERIZINAN.COM — Next Config
// DEV/PRODUCTION: Next.js standalone output for Node.js hosting.
// Use Webpack for production builds to avoid the Hostinger Turbopack
// CSS worker process failure observed in the deployment logs.
// ============================================================

import type { NextConfig } from "next";

// NEXT_CPU_COUNT is an application-defined build variable (not a built-in
// Next.js environment variable). Default to 2 on constrained builders and
// clamp overrides to 1..4 so a generous reported CPU count cannot create
// an oversized worker pool.
const requestedBuildCpus = Number(process.env.NEXT_CPU_COUNT ?? "2");
const buildCpus =
  Number.isInteger(requestedBuildCpus) && requestedBuildCpus > 0
    ? Math.min(requestedBuildCpus, 4)
    : 2;

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/orm-postgres"],
  output: "standalone",
  experimental: {
    cpus: buildCpus,
    // Lower per-worker page-generation concurrency for process-limited builders.
    staticGenerationMaxConcurrency: 2,
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
