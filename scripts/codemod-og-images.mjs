// ============================================================
// CODEMOD — Suntik og:image (via /api/og) ke semua blok
// openGraph yang belum punya `images`.
// ============================================================
// LATAR: metadata Next.js shallow-merge — page yang menyetel
// openGraph TANPA images MENGHAPUS og:image warisan root layout
// → 44+ halaman/family tampil tanpa gambar share (CTR SERP &
// WhatsApp jeblok). Codemod menyuntik:
//   images: [{ url: ogImageUrl({ title: <expr og:title> }), width: 1200, height: 630, alt: <expr og:title> }]
// + import ogImageUrl bila belum ada.
// SKIP: blog/[slug], panduan/[id] (sudah punya file-convention
// opengraph-image), layanan/[...slug] (sudah di-migrasi manual).
// ============================================================

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/home/z/my-project";
const SKIP = new Set([
  "src/app/blog/[slug]/page.tsx",
  "src/app/panduan/[id]/page.tsx",
  "src/app/layanan/[...slug]/page.tsx",
]);

// ---- scanner string-aware: temukan akhir blok { ... } ----
// Rekursif: interpolasi template literal ${...} dibaca ulang
// sebagai kode normal lewat pemanggilan matchBrace itu sendiri.
function matchBrace(src, openIdx) {
  let i = openIdx; // src[openIdx] === "{"
  let depth = 0;
  let smode = 0; // 0 normal, 1 'str, 2 "str, 3 `tpl`
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (smode === 0) {
      if (c === "/" && n === "/") {
        const nl = src.indexOf("\n", i);
        if (nl === -1) return -1;
        i = nl + 1;
        continue;
      }
      if (c === "/" && n === "*") {
        const end = src.indexOf("*/", i + 2);
        if (end === -1) return -1;
        i = end + 2;
        continue;
      }
      if (c === "'") smode = 1;
      else if (c === '"') smode = 2;
      else if (c === "`") smode = 3;
      else if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) return i;
      }
      i++;
    } else if (smode === 1 || smode === 2) {
      if (c === "\\") i += 2;
      else {
        if (c === (smode === 1 ? "'" : '"')) smode = 0;
        i++;
      }
    } else {
      // template literal
      if (c === "\\") i += 2;
      else if (c === "`") { smode = 0; i++; }
      else if (c === "$" && n === "{") {
        const inner = matchBrace(src, i + 1); // isi interpolasi = kode normal
        if (inner === -1) return -1;
        i = inner + 1;
      } else i++;
    }
  }
  return -1;
}

function findTitleExpr(block) {
  // cocokkan `title:` (bukan titleSize dll.) → ambil expr sampai koma level-0
  const re = /(^|[{\s,(])title\s*:\s*/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    let i = m.index + m[0].length;
    // lewati whitespace
    while (block[i] === " " || block[i] === "\n" || block[i] === "\t") i++;
    const start = i;
    const c = block[i];
    if (c === '"' || c === "'" || c === "`") {
      const q = c; i++;
      while (i < block.length) {
        if (block[i] === "\\") { i += 2; continue; }
        if (block[i] === q) { i++; break; }
        i++;
      }
      return block.slice(start, i);
    }
    // identifier / dotted / akses properti — sampai koma atau baris baru level rendah
    while (i < block.length && !/[,\n]/.test(block[i])) i++;
    let expr = block.slice(start, i).trim();
    if (/^[A-Za-z_$][\w$]*(\.[\w$]+|\(\s*\))?$/.test(expr)) return expr;
  }
  return null;
}

function processFile(rel) {
  const path = join(ROOT, rel);
  let src = readFileSync(path, "utf8");
  if (!src.includes("openGraph")) return `${rel}: tanpa openGraph (lewati)`;

  let changed = 0;
  let searchFrom = 0;
  for (;;) {
    const re = /openGraph\s*:\s*\{/g;
    re.lastIndex = searchFrom;
    const m = re.exec(src);
    if (!m) break;
    const openIdx = m.index + m[0].length - 1;
    const closeIdx = matchBrace(src, openIdx);
    if (closeIdx === -1) { searchFrom = m.index + 1; continue; }
    const block = src.slice(openIdx, closeIdx + 1);
    if (/\bimages\s*:/.test(block)) {
      searchFrom = closeIdx + 1;
      continue;
    }
    const titleExpr = findTitleExpr(block) ?? '"PusatPerizinan.com — Konsultan Perizinan Usaha #1 Indonesia"';
    const inject =
      `images: [{ url: ogImageUrl({ title: ${titleExpr} }), width: 1200, height: 630, alt: ${titleExpr} }],\n  `;
    // sisipkan tepat setelah "{"
    src = src.slice(0, openIdx + 1) + "\n    " + inject + src.slice(openIdx + 1);
    changed++;
    searchFrom = openIdx + inject.length + 8;
  }

  if (changed > 0 && !src.includes('from "@/lib/og-template"')) {
    // sisipkan import setelah blok import terakhir di atas file
    const importRe = /^import[^\n]*\n/gm;
    let lastEnd = 0;
    let im;
    while ((im = importRe.exec(src)) !== null) lastEnd = im.index + im[0].length;
    if (lastEnd === 0) {
      // tidak ada import di atas → taruh setelah "use client" bila ada
      const uc = src.match(/^(['"])use client\1;?\n/);
      const at = uc ? uc[0].length : 0;
      src = src.slice(0, at) + `import { ogImageUrl } from "@/lib/og-template";\n` + src.slice(at);
    } else {
      src = src.slice(0, lastEnd) + `import { ogImageUrl } from "@/lib/og-template";\n` + src.slice(lastEnd);
    }
  }

  if (changed > 0) writeFileSync(path, src);
  return `${rel}: ${changed} blok disuntik`;
}

// kumpulkan target
const { execSync } = await import("node:child_process");
const files = execSync(`rg -l "openGraph" src/app --glob "page.tsx"`, { cwd: ROOT, encoding: "utf8" })
  .split("\n").map((s) => s.trim()).filter(Boolean).filter((f) => !SKIP.has(f));

for (const f of files) {
  try {
    console.log(processFile(f));
  } catch (e) {
    console.log(`ERROR ${f}: ${e.message}`);
  }
}
console.log(`Total file diproses: ${files.length}`);
