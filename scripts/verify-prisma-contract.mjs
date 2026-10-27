#!/usr/bin/env node
// Fail early with an actionable message if Prisma contract output is missing
// or the repository's intentionally pinned Prisma CLI/adapter pair drifts.
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const expected = [
  { name: "prisma", declared: packageJson.devDependencies?.prisma ?? packageJson.dependencies?.prisma, version: "8.0.0-rc.27" },
  { name: "@prisma/orm-postgres", declared: packageJson.dependencies?.["@prisma/orm-postgres"] ?? packageJson.devDependencies?.["@prisma/orm-postgres"], version: "8.0.0-rc.20" },
];

function fail(message) {
  console.error(`❌ Prisma build preflight failed: ${message}`);
  process.exit(1);
}

for (const item of expected) {
  if (item.declared !== item.version) {
    fail(`${item.name} must be pinned to ${item.version}; package.json declares ${item.declared ?? "nothing"}.`);
  }
  const installedPath = path.join(root, "node_modules", item.name, "package.json");
  if (!existsSync(installedPath)) {
    fail(`installed package metadata not found: node_modules/${item.name}/package.json. Run npm install first.`);
  }
  const installed = JSON.parse(readFileSync(installedPath, "utf8"));
  if (installed.version !== item.version) {
    fail(`${item.name} version mismatch: expected ${item.version}, found ${installed.version}.`);
  }
}

const artifacts = [
  path.join(root, "generated", "prisma8", "contract.json"),
  path.join(root, "generated", "prisma8", "contract.d.ts"),
];
for (const file of artifacts) {
  if (!existsSync(file) || !statSync(file).isFile() || statSync(file).size === 0) {
    fail(`required generated contract artifact is missing or empty: ${path.relative(root, file)}. Ensure "prisma contract emit" runs successfully before next build.`);
  }
}
try {
  JSON.parse(readFileSync(artifacts[0], "utf8"));
} catch (error) {
  fail(`generated/prisma8/contract.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}
console.log("✅ Prisma preflight passed: prisma@8.0.0-rc.27 + @prisma/orm-postgres@8.0.0-rc.20");
console.log("✅ generated/prisma8/contract.json and contract.d.ts exist and are valid.");
