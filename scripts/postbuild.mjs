// ============================================================
// PUSATPERIZINAN.COM — Post-build validation + standalone packaging
// ------------------------------------------------------------
// Hostinger/VPS requires a complete Next.js standalone bundle.
// Do not silently succeed when the standalone output or Prisma
// contract is missing: fail here with the exact missing artifact.
// Vercel owns its own packaging and intentionally skips this step.
// ============================================================
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NEXT = path.join(ROOT, ".next");
const STANDALONE = path.join(NEXT, "standalone");

function fail(message) {
  console.error(`❌ Build artifact validation failed: ${message}`);
  process.exitCode = 1;
  throw new Error(message);
}

function requirePath(file, label, type = "file") {
  if (!existsSync(file)) fail(`${label} is missing: ${path.relative(ROOT, file)}`);
  const stat = statSync(file);
  if (type === "directory" ? !stat.isDirectory() : !stat.isFile()) {
    fail(`${label} has the wrong filesystem type: ${path.relative(ROOT, file)}`);
  }
}

function copyDirectory(source, destination, label) {
  requirePath(source, label, "directory");
  mkdirSync(path.dirname(destination), { recursive: true });
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
  requirePath(destination, `copied ${label}`, "directory");
  console.log(`  ✓ ${path.relative(ROOT, source)} → ${path.relative(ROOT, destination)}`);
}

// Vercel's builder manages its own deployment packaging.
if (process.env.VERCEL === "1") {
  console.log("↩️  VERCEL detected — custom standalone packaging skipped.");
} else {
  console.log("🔎 Validating Next.js standalone and Prisma artifacts...");

  requirePath(STANDALONE, "Next.js standalone output", "directory");
  requirePath(path.join(STANDALONE, "server.js"), "standalone server entry");
  requirePath(path.join(NEXT, "static"), "Next.js static assets", "directory");
  requirePath(path.join(ROOT, "public"), "public assets directory", "directory");

  const generatedDir = path.join(ROOT, "generated");
  const contractJson = path.join(generatedDir, "prisma8", "contract.json");
  const contractTypes = path.join(generatedDir, "prisma8", "contract.d.ts");
  requirePath(generatedDir, "generated runtime directory", "directory");
  requirePath(contractJson, "Prisma contract JSON");
  requirePath(contractTypes, "Prisma contract TypeScript declarations");
  try {
    JSON.parse(readFileSync(contractJson, "utf8"));
  } catch (error) {
    fail(`generated/prisma8/contract.json is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }

  console.log("✅ Prisma contract artifacts verified.");
  copyDirectory(
    path.join(NEXT, "static"),
    path.join(STANDALONE, ".next", "static"),
    "Next.js static assets",
  );
  copyDirectory(
    path.join(ROOT, "public"),
    path.join(STANDALONE, "public"),
    "public assets",
  );
  copyDirectory(
    generatedDir,
    path.join(STANDALONE, "generated"),
    "generated runtime artifacts",
  );

  // Assert the output used by the deployment's start command is present.
  requirePath(path.join(STANDALONE, "server.js"), "final standalone server entry");
  requirePath(path.join(STANDALONE, ".next", "static"), "final standalone static assets", "directory");
  requirePath(path.join(STANDALONE, "generated", "prisma8", "contract.json"), "final standalone Prisma contract");
  console.log("✅ Standalone bundle validated. Start with: NODE_ENV=production node .next/standalone/server.js");
}
