# 📌 File ini dipindah — Moved

Dokumen rekam jejak resmi proyek **PusatPerizinan.com** sekarang bernama:

## 👉 [`WORKLOG.md`](./WORKLOG.md)

Perubahan dilakukan pada **v1.4.0 "Version Master" (2026-10-22)** sebagai bagian dari standardisasi internasional:

- `worklog.md` → **`WORKLOG.md`** (nama kapital, standard open-source internasional)
- Semua entri kini **ber-versi SemVer 2.0.0** (tag `🏷️ Rilis` pada tiap entri)
- Riwayat versi naratif: [`CHANGELOG.md`](./CHANGELOG.md) · identitas versi di kode: `src/lib/version.ts` · API: `GET /api/version`

Stub ini dipertahankan agar semua tautan lama & kebiasaan agent tetap valid.

---

Task ID: 21
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Install github.com/gunaracorp/pusatperizinan ke workspace + full upgrade SEO (ROADMAP-99 FASE 4 langkah 23/24/26/27) + perbaikan Core Web Vitals berbasis data PSI mobile produksi.

Work Log:
- Init fullstack env, clone repo (367 file), merge ke /home/z/my-project, bun install + db:push — dev server OK (Next.js 16.1.3 Turbopack, port 3000)
- Audit SEO menyeluruh: metadata, sitemap 14 seksi, JSON-LD sitewide, robots, llms.txt, IndexNow, webmaster tools, arsitektur halaman lokal /layanan/wilayah/*
- Ambil data PSI produksi via link owner: Perf 38, LCP 9,2s, TBT 1520ms, SEO 100
- Buat src/lib/catalog/detail-seo.ts (generator FAQ/HowTo/snippet/province-links deterministik FNV-1a)
- Upgrade katalog-v2-detail.tsx: + FAQPage/HowTo schema di @graph, section Ringkasan Cepat (55 kata), Proses 5 Langkah, FAQ Accordion, Jangkauan Nasional (6 hub provinsi + /wilayah)
- HowTo schema ditambahkan ke layanan/[...slug]/page.tsx (halaman v1)
- E-E-A-T blog/[slug]/page.tsx: author.url → /#tim, knowsAbout per kategori, speakable, isPartOf
- PERF-01: i18n/index.ts dirombak lazy-load (core id+en statis; 28 bahasa dynamic import per request bahasa) + language-provider.tsx (ensureTranslations + dictVersion)
- PERF-02: chat-widget-lazy.tsx (idle-mount via requestIdleCallback, chunk split next/dynamic)
- FIX overflow mobile (543→390px): min-w-0 pada grid item kolom + sidebar, span wrap pada teks flex, bersihkan pelaku pre-existing (pill harga & catatan)
- Verifikasi agent-browser: beranda, /layanan/nib, /layanan/pendaftaran-nib-umkm-perorangan-pp-bu-001, /blog/panduan-nib-oss-rba — schema & section terverifikasi, accordion interaktif, ?lang=en lazy-load jalan, footer sticky, tanpa error console
- bun run lint: 0 error 0 warning
- Versioning: version.ts 1.5.0 "SEO Titan", package.json, CHANGELOG.md, WORKLOG.md (baru), ROADMAP-99 centang 23/24/26/27

Stage Summary:
- Deliverable: situs v1.5.0 "SEO Titan" berjalan di port 3000, semua upgrade terverifikasi browser
- ±1.033 halaman kini punya FAQPage+HowTo schema & konten nyata; 1.000 halaman punya blok featured snippet + internal link ke 38 hub wilayah; blog E-E-A-T lengkap
- Bundle client −360KB sumber (28 bahasa lazy) + chat widget idle-mount → target perbaikan TBT/LCP PSI
- Nol perubahan URL → indeks 11.207 URL aman
- File tambahan: src/lib/catalog/detail-seo.ts, src/components/landing/chat-widget-lazy.tsx, WORKLOG.md

---
Task ID: 22
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 berikutnya (FASE 4 langkah 25): halaman level kota untuk seluruh 514 kabupaten/kota resmi di bawah /layanan/wilayah/{prov}/{kota} — rilis v1.6.0 "Peta Nusantara".

Work Log:
- Seleksi langkah dari sisa FASE 4 (25/28–34): langkah 25 terpilih (🔥🔥🔥, self-contained, kelanjutan alami engine lokal)
- Verifikasi data resmi via Wikipedia + UU pemekaran Papua 2022: 416 kab + 98 kota = 514; distribusi per provinsi dicocokkan 1:1 (termasuk resolve Kalbar 12 kab — Kayong Barat tak pernah terbentuk)
- File baru src/lib/kabkota-data.ts (516 entri = 514 resmi + 2 alias existing: Luwuk, Sorong-Pabar); konvensi nama menjaga URL existing 100%
- generators.ts: buildCityHubPage memoized per-slug, allCityNames() export, getCityHubs() 516 hub + cache array, getAnyPage lookup penuh
- wilayah.ts: kabkotaHrefs + TOTAL_KABKOTA_HUBS; /wilayah dirombak multi-anchor (fix anchor bersarang) + <details> 516 link internal + ItemList JSON-LD 516
- Sitemap hubs 137→559 URL; indeks 11.207→11.629 (+422, nol URL berubah); PLATFORM_STATS + footer + /api/version singkron
- QA: verify-kabkota.ts (nol duplikat slug; menangkap duplikat Sungai Penuh) + smoke-city-hubs.ts PASS
- agent-browser: kabupaten-deli-serdang/toba, kota-sukabumi render penuh + schema; /wilayah 598 link + ItemList 38+516; 404 valid; mobile 390px tanpa overflow; lint 0 error
- Versioning: version.ts 1.6.0 "Peta Nusantara" (Task 22), package.json, CHANGELOG.md entri 1.6.0 + badge header disingkronkan, WORKLOG.md Task 22, ROADMAP-99 centang langkah 25, api/version nextRelease → v1.7.0

Stage Summary:
- Situs v1.6.0 "Peta Nusantara": 554 halaman lokal (38 hub provinsi + 516 hub kab/kota) — seluruh 514 kab/kota resmi kini punya halaman
- Indeks target 11.629 URL; nol perubahan URL lama → 11.207 URL terindeks aman
- FASE 4 ROADMAP-99 kini 23/24/25/26/27 ✅ — sisa 28–34 menunggu sesi berikutnya
