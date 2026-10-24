# 📜 WORKLOG — PusatPerizinan.com

> Rekam jejak resmi 1:1 dengan [`CHANGELOG.md`](./CHANGELOG.md) · tag versi SemVer 2.0.0 pada tiap entri.
> Format entri: `Task ID / Agent / Task / Work Log / Stage Summary` + tag `🏷️ Rilis vX.Y.Z`.

---

## Task 23 — Anti-Thin Content ±300 Kata/Halaman (ROADMAP-99 langkah 33)

> 🏷️ Rilis v1.7.0 — "Konten Raja" · type: minor
> Tanggal: 2026-10-25 (WIB) · Agent: Z.ai Code (Master Polymath · Sage Universal · The Ultimate Problem Solver)

**Task:** Eksekusi langkah ROADMAP-99 berikutnya — langkah 33 FASE 4: anti-thin content, perkaya halaman detail dengan ±300 kata unik per layanan (syarat, proses, konteks bisnis, pasca-terbit).

**Work Log:**
- Seleksi langkah: dari sisa FASE 4 (28–34), langkah 33 dipilih — 🔥🔥🔥, murni kode (28–30 butuh kredensial/data GSC eksternal, 31–32 kampanye luar), kelanjutan alami engine deterministik `detail-seo.ts`; target gap teridentifikasi via audit: 1.000 halaman Katalog v2/v3 berisi blok terstruktur TANPA prosa panjang, 65 halaman induk v1 longDesc-nya seragam-template
- **Modul baru `src/lib/catalog/rich-content.ts`**: `buildRichParagraphs()` — 4 paragraf per layanan (① konteks & urgensi legal ② dokumen & jebakan umum — 2 dari 8 jebakan + interpolasi syarat aktual ③ timeline jujur — estimasi + alur 5 fase + faktor penundaan ④ kewajiban pasca-terbit — 2 dari 5 + masa berlaku + kalender kepatuhan); FNV-1a dari seed kode/id — deterministik antar build; `richSectionTitle()` — 4 varian judul section; `splitRequirements()` — split koma sadar-kurung
- **katalog-v2-detail.tsx**: section "Panduan Lengkap" (aria `#panduan`, ikon BookOpen) antara "Proses Pengurusan" dan "Catatan Penting" — server-rendered di seluruh 1.000 halaman PP/PP3
- **generators.ts `buildBasePage`**: 4 paragraf rich content di-append ke `longDesc` 65 halaman induk v1 — menghilangkan pola "3 paragraf sama untuk semua layanan"
- **detail-seo.ts**: FAQ syarat kini memakai `splitRequirements` — memperbaiki syarat terpotong di dalam kurung (kasus nyata: "dokumen 8 SNP (isi, proses, …)" → sebelumnya tampil "…(isi")
- QA baru `scripts/verify-rich-content.ts` — hasil: 1.000 layanan min 264 / rata-rata **304** / max 401 kata; **1.000/1.000 (100%) kombinasi paragraf unik** + 1.000 judul unik; 65/65 halaman induk unik (rata-rata 410 kata); determinisme dua-run PASS; verdict PASS
- Verifikasi browser (agent-browser 390×844): halaman v2 (PP-BU-001 → 4 paragraf/291 kata), v3 (PP3-PN-018 → 4 paragraf/315 kata), v1 (`/layanan/nib` → 8 paragraf/422 kata) — tanpa error console; **overflow mobile latent ditemukan & dimitigasi**: `<Link>` bundle bert class `truncate` tetap `display:inline` → nama layanan panjang meluber scrollWidth (529px > 390px) → wajib `block w-full` (kini 390 persis); dev.log bersih
- `bun run lint` → 0 error, 0 warning
- Versioning: `version.ts` (1.7.0 "Konten Raja" + entri RELEASES taskId 23), `package.json`, `CHANGELOG.md` (entri 1.7.0 + badge header + Unreleased→v1.8.0), `ROADMAP-99` (centang langkah 33), `/api/version` nextRelease → v1.8.0

**Stage Summary:**
- ±1.065 halaman detail kini membawa prosa unik ±300–400 kata di atas data aktual layanan → depth seo-policy naik signifikan, gap thin-content FASE 4 tertutup
- Kualitas anti-spam terjaga: 100% kombinasi unik (bukan satu template diulang), konten business-real tanpa klaim kuota/sitasi karangan, deterministik (konsisten antar build — anti sinyal instabilitas)
- 2 bug latent ikut dimitigasi: overflow bundle mobile + syarat FAQ terpotong kurung
- Nol perubahan URL → indeks 11.629 URL aman; `PLATFORM_STATS` tidak berubah
- FASE 4 ROADMAP-99: 23 ✅ 24 ✅ 25 ✅ 26 ✅ 27 ✅ 33 ✅ — sisa 28/29/30/31/32/34 (Indexing API & GSC audit butuh kredensial/data eksternal; 34 comparison kandidat sesi berikutnya)

---

## Task 22 — Halaman Level Kota 514 Kab/Kota (ROADMAP-99 langkah 25)

> 🏷️ Rilis v1.6.0 — "Peta Nusantara" · type: minor
> Tanggal: 2026-10-25 (WIB) · Agent: Z.ai Code (Master Polymath · Sage Universal · The Ultimate Problem Solver)

**Task:** Eksekusi langkah ROADMAP-99 berikutnya — langkah 25 FASE 4: halaman level kota (±500 kota/kab) di bawah `/wilayah/[provinsi]/[kota]` untuk menggandakan permukaan SEO lokal.

**Work Log:**
- Seleksi langkah: dari sisa FASE 4 (25/28/29/30/31/32/33/34), langkah 25 dipilih — 🔥🔥🔥, self-contained (tanpa kredensial eksternal), dan lanjut alami dari engine lokal yang ada
- Riset & verifikasi data resmi: jumlah kab/kota per provinsi via Wikipedia "Daftar kabupaten dan kota di Indonesia menurut provinsi" (total 416 kab + 98 kota = 514) + resolusi distribusi Papua pasca UU 14/15/16/13-2022 (Tengah: Nabire, Paniai, Mimika, Puncak, Puncak Jaya, Intan Jaya, Dogiyai, Deiyai; Pegunungan: Jayawijaya, Lanny Jaya, Mamberamo Tengah, Nduga, Pegunungan Bintang, Tolikara, Yahukimo, Yalimo; dst.) + konfirmasi Kalbar 12 kab (Kayong Barat TIDAK pernah terbentuk — hanya Kayong Utara/Sukadana)
- **Modul baru `src/lib/kabkota-data.ts`**: 516 entri (514 resmi + 2 alias existing yang dipertahankan: Luwuk & Sorong di hub Papua Barat); konvensi nama menjaga URL: majors ditulis exact ("Medan", "Jambi (Kota)", "Jakarta Selatan (SCBD)"), kota baru ber-prefix "Kota", kabupaten "Kabupaten" (membedakan Bogor/Bekasi/Tangerang kota vs kab)
- **generators.ts**: `buildCityHubPage` di-memoize (Map per-slug) + dipecah jadi `buildCityHubPageUncached`; helper export `allCityNames(provIdx)` (majors dulu, sisanya kabkota-data); `getCityHubs()` bangun 516 hub dari seluruh kab/kota + cache array; `getAnyPage("wilayah/{prov}/{kota}")` lookup penuh — sitemap/staticParams/request jadi O(1) pasca build pertama
- **wilayah.ts**: `WilayahEntry.kabkotaHrefs` (seluruh kab/kota per provinsi) + export `TOTAL_KABKOTA_HUBS` (=516)
- **/wilayah**: kartu provinsi dirombak — `<Link>` tunggal jadi `<div>` multi-anchor (fix anchor bersarang invalid sebelum sempat ter-render), tambah `<details>` per provinsi berisi link SELURUH kab/kota (516 link internal) + ItemList JSON-LD baru "Kabupaten & Kota yang dilayani" (numberOfItems 516)
- Sitemap seksi `hubs` otomatis 137 → 559 URL (getHubSlugs); indeks total 11.207 → 11.629 (+422, nol URL berubah); `PLATFORM_STATS.indexedUrls` disesuaikan
- QA data: script verify (516 entri, per-provinsi = rujukan, nol duplikat slug) — menangkap 2 bug saat dev: duplikat Sungai Penuh (Jambi) & tidak ada duplikat lain
- Verifikasi browser (agent-browser): halaman baru `kabupaten-deli-serdang` / `kabupaten-toba` / `kota-sukabumi` (H1 + breadcrumb 4 level + 108+ layanan + 5 FAQ + schema FAQPage/BreadcrumbList/rating, tanpa error console); `/wilayah` 598 link internal + ItemList 38+516; expand details Aceh = 23 link; slug invalid → 404; URL existing (Medan, Jambi (Kota), Jakarta Selatan (SCBD), Luwuk, Sorong, Timika (Mimika)) identik; mobile 390px tanpa overflow
- `bun run lint` → 0 error, 0 warning
- Versioning: `version.ts` (1.6.0 "Peta Nusantara" + entri RELEASES + indexedUrls), `package.json`, `CHANGELOG.md` (entri 1.6.0 + badge header disingkronkan — tertinggal di v1.4.0), ROADMAP-99 (centang langkah 25)

**Stage Summary:**
- 422 halaman kota baru live → total 516 hub kab/kota + 38 hub provinsi = 554 halaman lokal; situs kini punya halaman untuk SELURUH 514 kab/kota resmi Indonesia
- Internal-linking lokal diperkuat dua arah: /wilayah → 516 hub (details), hub kota → provinsi/kota saudara, sitemap hubs 559 URL
- Nol perubahan URL existing → 11.207 URL terindeks aman; indeks target 11.629
- FASE 4 ROADMAP-99: 23 ✅ 24 ✅ 25 ✅ 26 ✅ 27 ✅ — sisa 28–34 (Indexing API, GSC audit, backlink, GBP, thin content, comparison)

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
