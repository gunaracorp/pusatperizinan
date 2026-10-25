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

---
Task ID: 23
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 berikutnya (FASE 4 langkah 33): anti-thin content — perkaya halaman detail dengan prosa deterministik ±300 kata per layanan — rilis v1.7.0 "Konten Raja".

Work Log:
- Seleksi langkah 33 dari sisa FASE 4 (28–34): 🔥🔥🔥, murni kode (28–30 butuh kredensial/data GSC eksternal; 31–32 kampanye luar), kelanjutan alami engine detail-seo.ts
- Modul baru src/lib/catalog/rich-content.ts: buildRichParagraphs (4 paragraf: konteks legal, dokumen & jebakan, timeline jujur, pasca-terbit — FNV-1a deterministik), richSectionTitle (4 varian), splitRequirements (sadar-kurung)
- Integrasi: katalog-v2-detail.tsx (section "Panduan Lengkap" #panduan di 1.000 halaman PP/PP3) + generators.ts buildBasePage (longDesc 65 halaman induk v1) + detail-seo.ts FAQ pakai splitRequirements
- QA scripts/verify-rich-content.ts: 1.000 layanan min 264 / rata 304 / max 401 kata, 100% kombinasi unik, 65/65 induk unik, determinisme PASS
- agent-browser 390×844: v2/v3/v1 render 4 paragraf tanpa error console; overflow mobile latent (link bundle truncate inline, 529>390px) dimitigasi dengan block w-full → 390 persis; dev.log bersih
- lint 0 error 0 warning
- Versioning: version.ts 1.7.0 "Konten Raja" (Task 23), package.json, CHANGELOG.md entri 1.7.0 + badge + Unreleased→v1.8.0, WORKLOG.md Task 23, ROADMAP-99 centang langkah 33, api/version nextRelease → v1.8.0

Stage Summary:
- Situs v1.7.0 "Konten Raja": ±1.065 halaman detail membawa prosa unik ±300–400 kata di atas data aktual — gap thin-content FASE 4 tertutup
- 2 bug latent ikut dibereskan: overflow bundle mobile + syarat FAQ terpotong kurung
- Nol perubahan URL → indeks 11.629 aman; FASE 4 kini 23/24/25/26/27/33 ✅ — sisa 28–32 & 34 (34 comparison kandidat sesi berikutnya)

---
Task ID: 26
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: ROADMAP-99 langkah 35 — Kalender editorial blog 3×/minggu via CMS admin (rilis v1.10.0 "Mesin Redaksi")

Work Log:
- Model Prisma EditorialSlot (unik weekStart+slotIndex, pilar, status PLANNED/DRAFTED/PUBLISHED/SKIPPED, postId) + prisma db push
- src/lib/editorial.ts: bank topik kurasi 36 (12 minggu × Senin=Panduan/Rabu=Regulasi/Jumat=Tips Pajak), helper minggu WIB, rotasi deterministik tanpa pengulangan 12 minggu, ensureUpcomingWeeks idempoten, scaffold H2 per pilar, syncSlotForPost
- API /api/admin/editorial: GET board / PATCH skip-unskip-update / POST start-draft (prefill Post CMS: slug, kategori, kata kunci, excerpt, 3 kerangka H2) — guard cookie admin
- Wire PUT/DELETE /api/admin/posts/[id] → sinkron status slot (publish/unpublish/hapus)
- UI components/admin/editorial.tsx + switcher di CmsTab (Artikel ⇄ Kalender Editorial): statistik, kartu minggu MINGGU INI, slot beraksi (Tulis draft/Edit topik/Dari bank/Lewati/Lanjutkan)
- QA scripts/verify-editorial.ts PASS 0 warning; runtime curl & browser (agent-browser) lulus; lint 0/0; tsc 181→178 (3 error lama helpers.ts ikut diperbaiki)
- Version trio: package.json 1.10.0, version.ts (RELEASES Task 26, prismaModels 13), CHANGELOG entri 1.10.0 + badge, /api/version nextRelease v1.11.0, ROADMAP centang langkah 35, WORKLOG.md Task 26

Stage Summary:
- Kalender editorial 12 minggu hidup di Mission Control: klik "Tulis draft" → editor CMS ter-prefill → terbit via alur lama (sitemap/RSS/IndexNow otomatis)
- Nol URL publik baru (indeks 11.876 aman); FASE 5: 35 ✅ 41 ✅; sisa 36–40, 42–44 menunggu sesi berikutnya

---
Task ID: 27
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: "Lanjutkan langkah selanjutnya" — eksekusi Quick Wins FASE 1 yang bisa dikerjakan murni kode: menuntaskan langkah 3 (bundle −10% di detail v1) + langkah 5 (Floating WhatsApp sitewide) + kode lengkap langkah 4 (Clarity env-gated) + checklist kredensial langkah 1–2 — rilis v1.11.0 "Sapa Langsung".

Work Log:
- Survei state (Explore agent): CTA Pesan Sekarang sudah ada di 1.500 detail; bundle −10% hanya v2/v3; floating WA belum ada; Clarity belum ada; GA4 env-gated menunggu ID
- src/components/landing/floating-whatsapp.tsx (baru): WA bottom-right sitewide, kontekstual saat klik, GA4 event whatsapp_click, sembunyi di / · /admin · /webmaster · /checkout, nomor tunggal landing-data.ts; mount di layout.tsx
- src/app/[slug]/page.tsx: blok "Sering Diambil Bersama — Paket Hemat 10%" (2 pelengkap lintas kategori FNV-1a, CTA WA + checkout) → paritas bundle v1 = v2/v3
- src/components/landing/analytics.tsx: refactor GA4 + Microsoft Clarity independen env-gated
- scripts/verify-order-cta.ts PASS (6 seksi: determinisme bundle 500/500, marker, aturan sembunyi, paritas WA, env-gating)
- Verifikasi: lint 0/0; tsc 178 (baseline, nol error baru); curl 7 halaman sesuai ekspektasi; agent-browser: snapshot + konsol bersih + homepage WA=0; screenshot bukti download/verifikasi-v1-*.png
- Rilis: version.ts/package.json/api-version 1.11.0 "Sapa Langsung" (nextRelease v1.12.0), CHANGELOG entri 1.11.0 + ladder 21–27 dilengkapi, WORKLOG.md Task 27, ROADMAP-99 centang 3 & 5 + catatan kode-siap 4
- docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md: panduan kredensial Midtrans/Tripay (webhook /api/payment/webhook/*), GSC/Bing (env tag), GA4/Clarity, template .env produksi, checklist eksekusi 8 butir

Stage Summary:
- v1.11.0 live di /api/version; jalur order FASE 1 paritas penuh (1.500 detail ber-bundle −10%, WA melayang sitewide, klik terukur)
- FASE 1 ROADMAP: 3 ✅ 5 ✅, 4 kode-siap; langkah 1–2 menunggu owner mengisi env sesuai checklist → lalu eksekusi 8 butir
- Nol URL baru → indeks 11.876 aman
