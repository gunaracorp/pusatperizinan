# 📜 WORKLOG — PusatPerizinan.com

> Rekam jejak resmi 1:1 dengan [`CHANGELOG.md`](./CHANGELOG.md) · tag versi SemVer 2.0.0 pada tiap entri.
> Format entri: `Task ID / Agent / Task / Work Log / Stage Summary` + tag `🏷️ Rilis vX.Y.Z`.

---

## Task 21 — Full Upgrade SEO (ROADMAP-99 FASE 4) + Core Web Vitals

> 🏷️ Rilis v1.5.0 — "SEO Titan" · type: minor
> Tanggal: 2026-10-24 (WIB) · Agent: Z.ai Code (Master Polymath · Sage Universal · The Ultimate Problem Solver)

**Task:** Install repo dari GitHub + full upgrade SEO. Eksekusi langkah ROADMAP-99 FASE 4 yang code-executable (23, 24, 26, 27) + perbaikan performa berbasis data PageSpeed Insights mobile produksi.

**Work Log:**
- Audit menyeluruh infra SEO existing: metadata system, 14 sitemap (lastmod deterministik), JSON-LD sitewide 6 blok, hreflang M04, robots GEO, llms.txt, IndexNow, webmaster tools 26 mesin, halaman lokal `/layanan/wilayah/*` — fondasi sudah kuat (PSI SEO = 100/100)
- Analisis PSI mobile produksi (link analisis owner): Performance 38 · LCP 9,2 s · TBT 1.520 ms · CLS 0,011 → gap utama = bundle JS & render path
- **[Langkah 23]** Modul `src/lib/catalog/detail-seo.ts`: generator FAQ (5 Q&A bisnis-nyata) + HowTo (5 langkah) + snippet answer, seluruhnya deterministik FNV-1a per kode layanan; dipasang di `katalog-v2-detail.tsx` (1.000 halaman PP/PP3) — section on-page + schema `FAQPage` & `HowTo` di `@graph`; halaman v1 (`layanan/[...slug]`) ditambah HowTo schema dari `page.steps`
- **[Langkah 27]** Blok "Ringkasan Cepat" (jawaban langsung 55 kata + dl biaya/estimasi/penerbit) di atas grid konten 1.000 halaman detail
- **[Langkah 24]** Blok internal-linking "Urus X dari Mana Saja": 6 hub provinsi deterministik + `/wilayah` di setiap halaman katalog
- **[Langkah 26]** E-E-A-T blog: `author.url` → `/#tim`, `knowsAbout` per kategori (data kategori diverifikasi dari `blog-content.ts`), `speakable`, `isPartOf`
- **PERF-01** `src/lib/i18n/index.ts` dirombak: core id+en statis, 28 bahasa dynamic-import on-demand (`ensureTranslations`), provider ditambah `dictVersion` (useReducer) agar `t()` re-memo saat dict tiba; switcher bahasa terverifikasi di browser (?lang=en → nav berubah "Services | …" tanpa error)
- **PERF-02** `chat-widget-lazy.tsx`: ChatWidget di-mount saat idle (requestIdleCallback/fallback 1,5 s), chunk di-split via next/dynamic ssr:false
- **FIX mobile overflow**: scrollWidth 543 vs viewport 390 di halaman detail katalog — root cause grid item tanpa `min-w-0` + teks flex panjang; diperbaiki di kolom utama, sidebar, H2 baru, dan pill/catatan harga pre-existing; verifikasi browser: scrollWidth = 390 persis
- Verifikasi browser menyeluruh (agent-browser): beranda, detail v1 (`/layanan/nib` → schema [Service, FAQPage, HowTo, BreadcrumbList]), detail v2 (`PP-BU-001` → @graph [BreadcrumbList, Product, FAQPage, HowTo] + 5 FAQ + 5 langkah + 6 link provinsi + accordion interaktif 1-open), blog (author E-E-A-T + speakable teremisi), sticky footer & mobile screenshot OK
- `bun run lint` → 0 error, 0 warning
- Versioning: `version.ts` (APP_VERSION 1.5.0, RELEASES +1 entri), `package.json` 1.5.0, `CHANGELOG.md` (entri 1.5.0 + Unreleased→v1.6.0), ROADMAP-99 (centang langkah 23/24/26/27)

**Stage Summary:**
- ~1.033 halaman (1.000 katalog v2/v3 + 33 detail v1) kini membawa FAQPage + HowTo schema + konten FAQ/langkah nyata → kualifikasi rich result SERP
- 1.000 halaman detail membawa blok featured-snippet + 7 internal link ke halaman lokal → link equity mengalir ke 200+ URL `/layanan/wilayah/*`
- Bundle client turun ±360 KB sumber (±200 KB+ minified) untuk pengunjung id/en (mayoritas trafik) → direktuk TBT/LCP
- Nol URL baru/changed → indeks 11.207 URL tidak terganggu; tidak ada kanibalizasi (arsitektur lokal mengikuti keputusan wilayah.ts yang ada)
- Catatan lanjutan untuk sesi berikutnya: kompresi gambar `public/kantor/*.jpg` (156–336 KB, unoptimized di static export), evaluasi framer-motion di landing (kandidat lazy per-section), re-ukur PSI pasca-deploy
