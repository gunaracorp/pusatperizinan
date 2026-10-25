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

---
Task ID: 24
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 berikutnya (FASE 4 langkah 34): halaman perbandingan programatik — perluas comparisons-generated.ts ("NIB vs SIUP", "PT vs CV vs Perseorangan", dst) — rilis v1.8.0 "Arena Banding".

Work Log:
- Seleksi langkah 34 dari sisa FASE 4 (28–32 & 34): 🔥🔥, murni kode (28–30 butuh kredensial/data GSC eksternal; 31–32 kampanye luar), kedua contoh eksplisit roadmap dieksekusi utuh
- Enumerasi pool via scripts/list-base-services.ts + validate-pairs.ts: 114 base page di ALL_SERVICE_PAGES (bukan 65 BASE_SERVICES) — 30 kandidat pasangan baru tervalidasi 30/30, nol duplikat slug
- comparisons-generated.ts: PAIRS 38 → 68 (+SHORT_MAP 14 slug baru); 30 pasangan lintas domain: badan usaha/entitas, ISO & sertifikasi, 8 pasangan pajak, PMI & penempatan, tambang (RKAB-IUP), operasional (reklame-PBG, NIB-LKPM), virtual office
- Handmade "nib-vs-siup" di comparisons.ts: 10 aspek status hukum (NIB berlaku sebagai SIUP — Pasal 12 PP 5/2018 jo. UU Cipta Kerja), 4 poin chooseA/chooseB per kondisi (usaha baru / pemegang SIUP lama / PMA-SIUPULG), FAQ 5 (SIUP masih berlaku?, pengganti, migrasi, SIUPULG, izin khusus), 8 keyword warisan
- comparisons-trio.ts (baru): tipe TrioComparison {parties, rows 3-sel + best:0|1|2|null, choose 3 jalur, verdict, faq}; entri "pt-vs-cv-vs-perseorangan" 10 aspek (UU 40/2007 vs KUHD vs UU Cipta Kerja; biaya Rp0 PPO; pajak final 0,5%; investor/tender PT; naik-kelas PPO→PT)
- TrioView (src/components/bandingkan/): desktop grid [210px|3 kolom] berpewarnaan per pihak + crown "Terbaik di aspek ini"; mobile kartu per aspek; FAQPage+BreadcrumbList JSON-LD; WA CTA
- Integrasi: [slug]/page.tsx (generateStaticParams+metadata+render trio, SERVICE_SLUG_MAP fallback → id sendiri + siup→nib), /bandingkan (kartu trio "Paling dicari" + badge 78 dinamis), sitemap-sections.ts (trio masuk seksi bandingkan)
- QA scripts/verify-comparisons.ts: 68/68 pasangan resolve, 78 slug unik, ≥6 aspek & ≥4 FAQ semua, winner/best valid, determinisme PASS, prosa rata-rata 405 kata
- Fix sendiri: duplikat key iso-45001/iso-22000 di SHORT_MAP (TS1117) + key ber-hyphen tanpa kutip di alias TrioView (syntax)
- curl dev (server di-restart via setsid — dev server sempat mati antar sesi): /bandingkan 200 (badge+kartu trio), nib-vs-siup & nib-vs-lkpm & ekspansi-asing-vs-pt & trio 200 dengan FAQPage+BreadcrumbList, internal-link base baru /layanan/{slug} ✓, /sitemap/bandingkan 78 <loc>
- lint 0 error 0 warning; tsc 0 error pada file sentuhan (baseline 181 pre-existing tak berubah 181→183→181)
- Versioning: version.ts 1.8.0 "Arena Banding" (Task 24, +RELEASES, indexedUrls 11629→11661), package.json, CHANGELOG.md entri 1.8.0 + badge (Total Rilis 24, Berikutnya v1.9.0, 11.661 URL), WORKLOG.md Task 24, ROADMAP-99 centang langkah 34, api/version nextRelease → v1.9.0

Stage Summary:
- Situs v1.8.0 "Arena Banding": 78 halaman /bandingkan/* (68 programatik dari katalog nyata + 9 handmade + 1 trio PT vs CV vs PT Perorangan) — kueri komersial "X vs Y" & "perbedaan X dan Y" kini punya landing bernilai
- Dua contoh eksplisit roadmap hidup utuh: NIB vs SIUP (lisensi warisan) + trio badan usaha; bonus fix internal-link fallback 30 pasangan baru
- Indeks 11.629 → 11.661 URL (+32); nol perubahan URL lama → indeks aman
- FASE 4 ROADMAP-99 kini 23/24/25/26/27/33/34 ✅ — sisa 28–32 (butuh kredensial GSC / kampanye eksternal / GBP) menunggu sesi dengan akses eksternal

---
Task ID: 25
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 FASE 5 langkah 41: Glossary 200+ istilah perizinan (ramah SEO sekaligus rujukan LLM/AI search) — rilis v1.9.0 "Kamus Raja".

Work Log:
- Seleksi langkah: user menawarkan FASE 5 (langkah 35 kalender editorial ATAU 41 glossary) atau langkah 1–2 (pembayaran produksi + GSC — butuh kredensial eksternal); langkah 41 dipilih karena 100% murni kode, +215 URL baru, dan lanjut alami programatik-SEO v1.5.0–v1.8.0
- **Modul data baru `src/lib/glosarium/`** (types.ts + 8 file kategori + index.ts): 214 istilah — dasar/OSS 26 (nib, oss-rba, lkpm, kbli, profil-risiko, sertifikat-standar, siup/tdp/HO warisan, dst.), badan-usaha 28 (pt, pt-perorangan, cv, firma, koperasi, yayasan, pma/pmdn/kppa, modal dasar-ditempatkan-disetor, rups, direksi, komisaris, akta, SK, dst.), pajak 31 (npwp, coretax, ppn, pkp, pph 21/22/23/25/29/badan/final-UMKM/4(2), spt, faktur, coretax, TER, NPPN, pemeriksaan, sanksi, dst.), sektor 37 (BPOM, PIRT, halal, SNI, IUP/IUPK/RKAB, PBG/SLF/IMB, SPPL/UKL-UPL/AMDAL, PPIU/PIHK/PPIH, PSE, alkes, SIP/SIK, SMK3, ISO, PROPER, B3, dst.), ketenagakerjaan 22 (RPTKA, notifikasi, KITAS/KITAP, DKP-TKA, BPJS, PKWT/PKWTT, UMP/UMK, PHK, pesangon, PMI, PPTKIS, SPO, LPK, BNSP, K3), perdagangan 17 (API-U/P, PEB, PIB/BC 2.0, HS code, bea masuk, PPN/PPh22 impor, lartas, LPSI, kawasan berikat, incoterms, dst.), regulasi 24 (UU Cipta Kerja, PP 5/2018, Perpres 5/2021, UU 25/2007, Perpres 10/2021, UU 40/2007, KUHD, PP 34/2021, UU JPH, PP 16/2021, PP 22/2021, UU HPP, UU PDP, BKPM, Kemendag, Kemenkumham, Kemnaker, Komdigi, DJP), proses 29 (PNBP, verifikasi, pemeriksaan lapangan, kuasa, materai, apostille, SLA, izin prinsip-operasional, perubahan data, pencabutan, denda, notaris, KAP, SLO, kalender kepatuhan, dst.)
- Struktur konten per istilah: definisi inti 30–60 kata (jawaban langsung snippet/AI) + 2 paragraf pendalaman (428 paragraf, median 37 kata) + dasar hukum statis + related + service-link; 729 tautan related antar-istilah, 207 tautan layanan internal
- **Halaman indeks /glosarium**: 14 kartu "Paling Sering Dicari", GlossarySearch client-side (search + filter 8 kategori, static-export friendly), ringkasan kategori, indeks A–Z, CTA WA — JSON-LD DefinedTermSet 214 hasDefinedTerm
- **Halaman detail /glosarium/[slug] × 214**: generateStaticParams dari sumber data tunggal; Definisi Singkat (blok snippet), Pendalaman, kartu Dasar Hukum, CTA layanan per istilah, Istilah Terkait — JSON-LD DefinedTerm (inDefinedTermSet) + BreadcrumbList; slug invalid → 404
- Wire: sitemap seksi `glosarium` (SITEMAP_SECTION_IDS 14→15, 214 URL @0.8) + /glosarium di seksi static; llms.txt seksi glosarium; header dropdown Informasi + item Glosarium; footer 2 kolom + link
- QA `scripts/verify-glossary.ts`: ≥200, slug unik/URL-safe, kategori valid, konten minimum (short ≥30 kata, detail ≥2 paragraf ≥30 kata), related resolve tanpa self-ref, service href tervalidasi ke ALL_SERVICE_PAGES + allowlist — PASS 214/729/207, 0 warning
- Fix saat QA: 21 related broken (menunjuk slug layanan/kategori, bukan istilah) → dialihkan ke istilah glosarium terkait; 2 self-ref sip/sik tertukar → dipulihkan; 11 paragraf <30 kata → diperluas; typo "ditemputkan"→"ditempatkan" + "Legalisisas"→"Legalisasi"
- Verifikasi: `bun run lint` 0 error 0 warning; tsc baseline 181 tak berubah (nol error file glosarium); curl dev (server di-restart setsid): /glosarium 200 DefinedTermSet, 7 sampel detail 200 (nib, oss-rba, pt-perorangan, halal, rptka, api-u, uu-cipta-kerja + kalender-kepatuhan) dengan DefinedTerm+BreadcrumbList, slug invalid 404, /sitemap/glosarium.xml 214 <loc>, sitemap index memuat glosarium, llms.txt terisi, footer landing 2 tautan, dev.log bersih
- Versioning: version.ts (1.9.0 "Kamus Raja", +RELEASES Task 25, indexedUrls 11661→11876, sitemapSections 14→15), package.json 1.9.0, api/version nextRelease → v1.10.0, CHANGELOG.md entri 1.9.0 + badge (Total Rilis 25, Berikutnya v1.10.0, 11.876 URL), ROADMAP-99 centang langkah 41 + footer versi

Stage Summary:
- Situs v1.9.0 "Kamus Raja": 214 halaman glosarium + indeks live dengan skema DefinedTerm penuh — kueri "apa itu X" perizinan (NIB, LKPM, RPTKA, faktur pajak, dst.) kini punya landing jawaban langsung yang dapat dikutip AI/LLM
- +215 URL (11.661 → 11.876), nol perubahan URL lama; sitemap 15 seksi; internal linking 729 related + 207 service-link mengalirkan link equity ke halaman layanan
- Konten konsisten dengan seo-policy: tanpa angka trust, tanpa harga spesifik, sitasi regulasi statis
- ROADMAP-99 FASE 5: 41 ✅ — sisa FASE 5 (35–40, 42–44) menunggu sesi berikutnya; langkah 1–2 (produksi pembayaran + GSC) tetap butuh kredensial owner (API keys Midtrans/Tripay + akses akun GSC/Bing)

---
Task ID: 26
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 FASE 5 langkah 35: Kalender editorial blog 3×/minggu (panduan, berita regulasi, tips pajak) via CMS admin yang sudah ada — rilis v1.10.0 "Mesin Redaksi".

Work Log:
- Seleksi langkah: user memilih "lanjut langkah 35 (kalender editorial via CMS admin)" dari opsi FASE 5; 🔥🔥 · P1, 100% murni kode, memakai infrastruktur CMS admin (Post, /api/admin/posts, CmsTab) yang sudah ada
- **Model Prisma baru `EditorialSlot`** (prismaModels 12 → 13): unik `[weekStart, slotIndex]` (weekStart = ISO Senin WIB), pilar PANDUAN|REGULASI|PAJAK, judul kerja + focusKeyword + keywords + notes, status PLANNED→DRAFTED→PUBLISHED (+SKIPPED), tautan postId; `prisma db push` SQLite OK
- **Modul `src/lib/editorial.ts`**: bank topik kurasi 36 topik (12 minggu × 3 pilar — Senin=Panduan, Rabu=Regulasi/berita, Jumat=Tips Pajak) masing-masing dengan focusKeyword + keywords + sudut pandang penulisan; helper minggu WIB UTC+7 (currentWeekStart Senin-tepat, weekLabel rentang "19 Okt – 25 Okt 2026", slotDate +0/+2/+4); rotasi topik deterministik per minggu absolut dari epoch Senin 2026-01-05 (tidak berulang dalam 12 minggu); ensureUpcomingWeeks() idempoten (cari-lalu-buat, tak pernah menimpa editan admin); scaffold kerangka H2 per pilar (Panduan: Syarat/Langkah/Kesalahan · Regulasi: Isi pokok/Terdampak/Kepatuhan · Pajak: Dasar & tarif/Contoh hitung/Pelaporan); starterExcerpt untuk draft; syncSlotForPost() sinkron status slot ⇄ Post
- **API `/api/admin/editorial`**: GET (ensure + papan 12 minggu + stats + join Post slug/status), PATCH slot (skip bila PLANNED/SKIPPED saja, unskip, update topik — ditolak bila slot DRAFTED/PUBLISHED), POST action start-draft (buat Post DRAFT ter-prefill: slug unik via ensureUniqueSlug, kategori pilar, kata kunci, starter excerpt, sections scaffold 3 H2, cta default → slot DRAFTED + postId); guard cookie admin sama dengan posts
- **Wire siklus hidup**: PUT /api/admin/posts/[id] kini memanggil syncSlotForPost (PUBLISHED ⇄ DRAFTED), DELETE mengembalikan slot ke PLANNED + lepas postId — try/catch agar kegagalan sinkron tak mematahkan operasi post
- **UI `src/components/admin/editorial.tsx`** + switcher di CmsTab (tablist Artikel ⇄ Kalender Editorial): 4 kartu statistik, info ritme, kartu minggu ber-highlight MINGGU INI + hitungan status, baris slot ber-chip hari/tanggal & badge pilar berwarna; aksi per status: Tulis draft (POST start-draft → langsung membuka editor terisi via onOpenEditor), Edit topik (inline form), Dari bank (pemilih topik kurasi per pilar), Lewati/Batalkan, Lanjutkan draft, Lihat/Pratinjau; memakai useAdminData + apiPatch + toast konvensi admin
- **QA `scripts/verify-editorial.ts`**: PASS 0 warning — 36/36 topik unik (judul & focusKeyword global), rotasi 12/12 minggu tanpa pengulangan × 3 pilar, helper WIB (Senin, label, tanggal slot), scaffold/excerpt valid, ensure idempoten (36 slot tetap), pilar↔slotIndex↔hari sinkron
- Verifikasi runtime curl (cookie admin): GET 200 (12 minggu × 3 = 36 slot, minggu-0 current), GET ke-2 tetap 36 (idempoten), skip/unskip/update/restore 200, start-draft 201 (slug benar, DRAFT, kategori Panduan, scaffold terisi), PUT publish → slot PUBLISHED, DELETE → slot kembali PLANNED post-null, tanpa auth 401
- Verifikasi browser (agent-browser): login Mission Control → tab Konten & SEO → switcher Kalender Editorial → statistik + kartu minggu + 3 baris slot + 4 aksi ter-render; klik Tulis draft membuka editor CMS ter-prefill (judul + 3 kerangka H2 + panel Skor SEO 12/100); pratinjau draft /blog dengan cookie admin 200 (Mode Pratinjau Admin); konsol bersih; data uji dihapus → kalender kembali 36 PLANNED
- Dev server di-restart (Prisma client regenerasi) — catatan: proses background mati antar tool-call di lingkungan ini, verifikasi runtime digabung dalam satu sesi skrip (scripts/verify-editorial-runtime.sh)
- `bun run lint` 0 error 0 warning; `tsc --noEmit` 181 → **178** (3 error pre-existing di api/admin/posts/helpers.ts ikut diperbaiki saat menyentuh modul tsb; nol error file baru)
- Versioning: version.ts (1.10.0 "Mesin Redaksi", +RELEASES Task 26, prismaModels 13), package.json 1.10.0, api/version nextRelease → v1.11.0, CHANGELOG.md entri 1.10.0 + badge (Total Rilis 26, Berikutnya v1.11.0), ROADMAP-99 centang langkah 35

Stage Summary:
- Situs v1.10.0 "Mesin Redaksi": kalender editorial 3×/minggu hidup di CMS admin — redaksi tinggal klik "Tulis draft" tiap Senin/Rabu/Jumat, artikel ter-prefill lengkap dengan kategori, kata kunci, sudut pandang, dan kerangka H2 siap isi
- Mesin konten kini ujung-ke-ujung: perencanaan (kalender 12 minggu otomatis) → penulisan (editor + skor SEO live) → publikasi (sitemap/RSS/IndexNow otomatis yang sudah ada) — mendukung langkah 36 (newsroom) di kemudian hari
- Nol URL publik baru → indeks 11.876 URL aman; PLATFORM_STATS hanya prismaModels 12→13; bank topik business-real (tanpa angka trust/harga spesifik) sesuai seo-policy
- ROADMAP-99 FASE 5: 35 ✅ 41 ✅ — sisa 36–40, 42–44 menunggu sesi berikutnya; langkah 1–2 (pembayaran produksi + submit sitemap GSC/Bing) tetap menunggu kredensial owner

---
Task ID: 27
Agent: Z.ai Code (main agent — Master Polymath mode)
Task: Eksekusi langkah ROADMAP-99 FASE 1 Quick Wins: menuntaskan langkah 3 (paritas bundle "Sering Diambil Bersama" −10% di detail v1) + langkah 5 (Floating WhatsApp CTA sitewide) + melengkapi kode langkah 4 (Microsoft Clarity env-gated) — rilis v1.11.0 "Sapa Langsung".

Work Log:
- Seleksi langkah: user minta "lanjutkan langkah selanjutnya"; survei Explore menyatakan CTA "Pesan Sekarang" SUDAH ada di semua detail v1/v2/v3, bundle −10% baru ada di v2/v3 (v1 hanya narasi), floating WA BELUM ada (hanya chat AI di homepage), Clarity belum ada → celah P0 paling bernilai yang bisa dieksekusi murni kode
- **Komponen baru `src/components/landing/floating-whatsapp.tsx`** (langkah 5, client component): tombol WA bottom-right sitewide — ikon WA inline SVG (nol dependensi), ikon-saja di mobile → pil "Konsultasi WhatsApp" ≥sm, cincin ping compositor-only `motion-reduce:hidden` (WCAG), aria-label eksplisit, rel noopener noreferrer; URL kontekstual (menyertakan halaman aktif) dibangun SAAT KLIK → nol state/effect (bebas hydration mismatch; lint `react-hooks/set-state-in-effect` yang muncul pada implementasi useState+useEffect awal tereliminasi) + fallback href wa.me polos untuk no-JS; event GA4 `whatsapp_click` via trackEvent (no-op aman); sembunyi otomatis di `/` (bentrok chat AI RIZKI fixed bottom-5 right-5), `/admin*`, `/webmaster*`, `/checkout*`; nomor tunggal WHATSAPP_NUMBER dari landing-data.ts
- **Mount di `src/app/layout.tsx`** setelah <Toaster /> — z-40 (di bawah chat widget z-[60])
- **Blok bundle v1** di `src/app/[slug]/page.tsx` (menuntaskan langkah 3): hashU32 FNV-1a + pickBundleV1 (2 pelengkap LINTAS kategori, deterministik per kode — paritas pola v2), section "Sering Diambil Bersama — Paket Hemat 10%" antara Layanan Terkait & FAQ: daftar 3 layanan ber-harga (self + 2 tautan internal truncate block — pelajaran overflow mobile v1.7.0), total dicoret → ×0,9 + chip Hemat, CTA ganda WA (pesan ter-prefill 3 kode + total) + checkout "Ambil <kode> saja"
- **`analytics.tsx` refactor** (langkah 4 kode siap): GA4 & Microsoft Clarity kini independen env-gated — NEXT_PUBLIC_CLARITY_ID (regex 10-12 alfanumerik) → snippet resmi clarity.ms afterInteractive (tidak menggeser LCP); tanpa keduanya → null (nol script pihak ketiga)
- **QA `scripts/verify-order-cta.ts`**: 6 seksi PASS — 500/500 bundle deterministik lintas kategori & matematika −10% valid, 500/500 kombinasi unik (tanpa kolapsi hash), marker blok v1 lengkap, aturan sembunyi + mount layout, paritas WA site.ts === landing-data.ts (6281269999910), env-gating analitik
- Verifikasi runtime curl: v1 /jasa-pendirian-pt-lokal 200 (floating WA + bundle + 2 CTA + checkout href), v2 /layanan/pendaftaran-nib-umkm-perorangan-pp-bu-001 200 (WA + bundle + ping + pill), v3 detail 200 (WA), /blog /glosarium /katalog 200 (WA), / TANPA WA, /checkout TANPA WA; dev.log bersih (server di-restart setsid — mati antar sesi)
- Verifikasi browser (agent-browser): snapshot v1 menampilkan link "Chat WhatsApp — konsultasi perizinan gratis" + StaticText "Konsultasi WhatsApp", bundle ter-render (BU-PT-001 Rp 3.380.000 + LH-AM-002 Rp 10.000.000 + SK-AG-006 Rp 3.380.000 → total Rp 16.760.000 → Rp 15.084.000, hemat Rp 1.676.000), konsol bersih, homepage count 'a[aria-label^="Chat WhatsApp"]' = 0; bukti screenshot download/verifikasi-v1-sapa-langsung.png + verifikasi-v1-bundle.png
- `bun run lint` 0 error 0 warning; `tsc --noEmit` 178 error pre-existing (baseline v1.10.0 tak berubah — nol error file sentuhan)
- Versioning: version.ts (1.11.0 "Sapa Langsung" + RELEASES Task 27, indexedUrls 11.876 tetap), package.json 1.11.0, api/version nextRelease → v1.12.0, CHANGELOG.md entri 1.11.0 + badge (Total Rilis 27, Berikutnya v1.12.0) + ladder dilengkapi baris 21–27 yang tertinggal, ROADMAP-99 centang langkah 3 & 5

Stage Summary:
- Situs v1.11.0 "Sapa Langsung": jalur order FASE 1 kini paritas penuh — 1.500 halaman detail (500 v1 + 1.000 v2/v3) semuanya membawa blok bundle "Sering Diambil Bersama" −10%, dan satu tombol WhatsApp mengapung di seluruh halaman publik dengan konteks halaman otomatis
- Saluran closing favorit pasar Indonesia (WA) kini selalu 1 klik jauhnya di halaman traffic SEO; klik terukur (whatsapp_click) begitu GA4 diaktifkan
- Langkah 4 tinggal eksekusi akhir: pasang NEXT_PUBLIC_GA_ID + NEXT_PUBLIC_CLARITY_ID di env — nol deploy ulang kode
- Nol URL publik baru → indeks 11.876 URL aman; ROADMAP-99 FASE 1: 3 ✅ 5 ✅ (4 kode-siap) — sisa P0: langkah 1–2 menunggu kredensial owner (checklist: docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md), langkah 6–8 menyusul

---
Task ID: 28
Agent: Z.ai Code (main agent)
Task: Ganti identitas resmi situs atas permintaan owner — website adalah milik/operasi **PT Top Konsultan Internasional**, dengan kredit **support system by PT Digital Bisnis Manajemen (digiman.id)** — rilis v1.12.0 "Identitas Resmi".

Work Log:
- Survei identitas (grep sitewide): `LEGAL_ENTITY` di `src/lib/site.ts` = sumber tunggal (dipakai JSON-LD kontak, pengendali privasi, catatan "dikelola oleh" /kontak); hardcode "PT Digital Bisnis Manajemen" ditemukan di seo-jsonld (alternateName), layout.tsx (meta publisher), faq-data (id+en), seo-pages/biaya.ts, catalog/generators.ts, privacy-content (id+en), tentang-kami, 30 locale `footerRights`, public/download/DEPLOY-IDWEBHOST.md; kredit footer lama "Support system by PT Top Konsultan Internasional — McKinsey Partner Indonesia" di 30 locale `footerMade` — peran dua entitas DIBALIK sesuai permintaan owner
- `site.ts`: `LEGAL_ENTITY` → "PT Top Konsultan Internasional"; konstanta baru `SUPPORT_SYSTEM = "PT Digital Bisnis Manajemen"` + `SUPPORT_SYSTEM_URL = "https://digiman.id"`
- `seo-jsonld.tsx`: Organization kini `legalName: LEGAL_ENTITY` + `alternateName: LEGAL_ENTITY` (impor dari site.ts — hapus hardcode)
- `layout.tsx`: meta `publisher: LEGAL_ENTITY` (impor)
- `footer.tsx`: badge kredit jadi `<a href={SUPPORT_SYSTEM_URL} target="_blank" rel="noopener noreferrer">` (span menggantikan p, hover state ditambah); komentar seksi diperbarui
- i18n 30 locale / 6 file (sed berurutan — urutan penting): `footerRights` "— PT Digital Bisnis Manajemen" → "— PT Top Konsultan Internasional" (30), lalu `footerMade` → "Support system by PT Digital Bisnis Manajemen — digiman.id" (30); verifikasi grep: 0 sisa "McKinsey"
- Konten hardcoded: faq-data.ts id+en + seo-pages/biaya.ts + catalog/generators.ts "(PT Digital Bisnis Manajemen)" → "(PT Top Konsultan Internasional)" (invoice/rekening perusahaan resmi); privacy-content.ts id+en ringkasan → template `${LEGAL_ENTITY}`; tentang-kami kartu Badan Usaha → entitas + dukungan sistem + tautan digiman.id; DEPLOY-IDWEBHOST.md disinkronkan
- Verifikasi: `bun run lint` 0 error 0 warning; `tsc --noEmit` **178 error pre-existing** (baseline v1.11.0 persis — nol error file/baris sentuhan); sapu grep: "Digital Bisnis" tersisa HANYA di konstanta SUPPORT_SYSTEM, komentar footer, 30 locale footerMade (semua disengaja)
- curl runtime (dev server): `/` → footer "Support system by PT Digital Bisnis Manajemen — digiman.id" + `"legalName":"PT Top Konsultan Internasional"` + `"alternateName"` + `<meta name="publisher" content="PT Top Konsultan Internasional">` + `<a href="https://digiman.id">`; `/kontak` → legalName benar + "dikelola oleh …"; `/tentang-kami` → 12× Top Konsultan · 2× Digital Bisnis · 4× digiman.id; `/kebijakan-privasi` → "Pengendali data pribadi Anda adalah PT Top Konsultan Internasional" — semua 200
- Versioning: version.ts (1.12.0 "Identitas Resmi" + RELEASES Task 28), package.json 1.12.0, api/version nextRelease → v1.13.0, CHANGELOG.md entri 1.12.0 + badge (Total Rilis 28, Entri Worklog 38, Berikutnya v1.13.0) + ladder baris 28

Stage Summary:
- Situs v1.12.0 "Identitas Resmi": identitas legal konsisten satu sumber di site.ts — **PT Top Konsultan Internasional** (operator situs & penerbit invoice) + **PT Digital Bisnis Manajemen / digiman.id** (support system, kredit footer ber-tautan) — mengalir ke schema JSON-LD, meta publisher, footer 30 bahasa, halaman legal (privasi/kontak/tentang-kami), FAQ, halaman biaya & generator katalog, dokumen deploy
- Nol URL publik baru → indeks 11.876 URL aman; nol perubahan layout/performa; 5 titik sinkronisasi versioning terpenuhi (WORKLOG, CHANGELOG, version.ts, package.json, footer/JSON-LD otomatis)

## Task 29 — Schema Service + Offer per Wilayah 38 Provinsi (ROADMAP-99 langkah 7)

> 🏷️ Rilis v1.13.0 — "Peta Provinsi" · type: minor
> Tanggal: 2026-10-25 (WIB) · Agent: Z.ai Code (main agent)

**Task:** Eksekusi langkah ROADMAP-99 berikutnya — langkah 7 FASE 1: halaman wilayah provinsi (programmatic SEO lokal) dengan data `geo.ts` + `coverage-data.ts` dan schema `Service` + `Offer` per wilayah — menghormati arsitektur existing (halaman lokal ASLI di `/layanan/wilayah/{prov}` & `/layanan/wilayah/{prov}/{kota}` dari generators.ts; `/wilayah` = hub navigasi) → nol URL baru.

**Work Log:**
- Survei gap: 38 hub provinsi + 516 hub kota sudah live (v1.6.0) dengan JSON-LD BreadcrumbList + FAQPage + ItemList — tetapi TANPA `Service`/`Offer` (inti langkah 7); audit `PROVINCE_GEO` menemukan **Banten hilang** (37/38) → seluruh halaman `/layanan/wilayah/banten*` tanpa meta geo.region
- `src/lib/geo.ts`: +entri `banten` (ID-BT, ibu kota Serang, koordinat resmi) → PROVINCE_GEO lengkap 38/38
- `src/app/layanan/hub-page.tsx` (`HubJsonLd`): node `Service` baru khusus hub `wilayah/` — `provider` → `LEGAL_ENTITY`, `areaServed` = `State` (nama + `identifier` ISO 3166-2:ID + `GeoCoordinates` ibu kota) untuk hub provinsi, atau `City` ⊂ `State` (containedInPlace) untuk hub kota; `hasOfferCatalog` → `Offer` per layanan anggota (`priceNumeric` IDR nyata + `itemOffered Service`, cap 40 sejajar ItemList); berlaku untuk 554 hub wilayah tanpa menyentuh hub kategori/sertifikasi
- **Fix bug laten JSON-LD**: pola lama hanya menaruh `@context` di node pertama array top-level → FAQPage/ItemList di luar konteks schema.org saat diparse; kini setiap node membawa `@context` sendiri
- QA baru `scripts/verify-wilayah-schema.ts`: data-check 38 provinsi ↔ PROVINCE_GEO, sapu HTTP 38 hub provinsi (Service #service + Offer + hasOfferCatalog + areaServed + kode ISO), spot-check 3 kota (Denpasar/Bandung/Serang — City ⊂ State), regresi `/layanan/kategori/pajak` (non-wilayah bersih)
- Verifikasi: QA **PASS** (38/38 + 3/3 + regresi bersih); curl `/layanan/wilayah/banten` → `"@type":"Service"` + `ID-BT` + `geo.region` ✓, `/layanan/wilayah/jawa-barat` → State + GeoCoordinates ✓, `/layanan/wilayah/bali/denpasar` → City + containedInPlace ✓; `bun run lint` 0 error 0 warning; `tsc --noEmit` **178 error pre-existing** (baseline v1.11.0 persis — 1 error baru ditemukan & dimitigasi: narrowing `page.province`/`page.region` → pola `?? ""`)
- Versioning: `version.ts` (1.13.0 "Peta Provinsi" + entri RELEASES taskId 29), `package.json` 1.13.0, `/api/version` nextRelease → v1.14.0, `CHANGELOG.md` (entri 1.13.0 + badge 29 rilis/39 entri + ladder baris 29), ROADMAP-99 centang langkah 7, WORKLOG.md + worklog.md Task 29

**Stage Summary:**
- v1.13.0 "Peta Provinsi": lapisan sinyal lokal lengkap — 554 hub wilayah membawa schema Service + Offer (harga IDR nyata) + geo meta 38 provinsi utuh → target featured snippet & local pack SEO
- Nol URL baru → indeks 11.876 URL aman; FASE 1 kini 3 ✅ 5 ✅ 7 ✅ (4 kode-siap; 1–2 kredensial owner; 6 & 8 antre)
- Sisa ROADMAP-99: FASE 1 (1–2, 4 eksekusi-akhir, 6, 8), FASE 4 (28–32), FASE 5 (36–40, 42–44), FASE 6 dst.

## Task 30 — Logo Utama Baru "Z" PusatPerizinan.com (permintaan owner)

> 🏷️ Rilis v1.14.0 — "Identitas Visual" · type: minor
> Tanggal: 2026-10-25 (WIB) · Agent: Z.ai Code (main agent)

**Task:** Permintaan owner "tolong disini logo z" (dikonfirmasi via quick-question: ganti logo utama dengan desain huruf Z, brand PusatPerizinan, emerald+emas flat modern) — generate logo AI baru & tukar seluruh aset logo situs.

**Work Log:**
- Survey aset: logo lama = monogram PP + wreath hijau (logo-icon.png 512 / logo-icon-white.png 512 / logo.png 800) dipakai 14+ komponen dengan NAMA FILE sama; logo.svg = sisa logo Z template tak ter-referensi; favicon.svg = shield+check lama
- 2 kandidat AI di-generate (shield-Z vs roundel-Z) — kandidat A (perisai + wreath emas + Z + bintang emas) dipilih: paling setia DNA brand lama (wreath+shield+star) & sesuai gaya yang dikonfirmasi owner
- `scripts/make-logo-assets.py`: flood-fill background removal (threshold luminance 228, 4-connectivity dari tepi — putih di dalam shield aman) → bbox crop + pad 3% + kanvas persegi → logo-icon.png 512 (warna) → logo-icon-white.png 512 (shield frost alpha 64 + Z/wreath/star putih solid — siluet putih solid gagal karena wreath menyentuh shield, treatment dark-bg standar dipakai) → logo.png 800 (lockup ikon + wordmark Carlito-Bold emerald + tagline emas)
- favicon.svg & logo.svg digambar ulang (perisai gradien emerald + Z putih + bintang emas, koordinat star dihitung python); render cairosvg preview PASS; layout.tsx: favicon.svg jadi icon preferensi (PNG fallback)
- Verifikasi: sampling piksel white variant (Z=255/wreath=255/star=255/shield=64/bg=0) ✓; composite dark-bg preview ✓; dimensi file identik aset lama → nol perubahan kode komponen; `bun run lint` 0/0; `tsc --noEmit` 178 baseline
- Versioning: version.ts 1.14.0 "Identitas Visual" + RELEASES Task 30, package.json 1.14.0, api/version nextRelease v1.15.0, CHANGELOG entri 1.14.0 + badge (30 rilis/40 entri) + ladder (fix row 28 ter-drop saat edit), WORKLOG.md + worklog.md Task 30

**Stage Summary:**
- v1.14.0 "Identitas Visual": monogram Z resmi di seluruh situs — header, footer (varian frost), favicon (SVG preferensi), manifest, lockup /logo.png, /logo.svg kini logo resmi (bukan lagi sisa template)
- Nol URL baru & nol perubahan komponen; master + preview tersimpan di download/logo/ (2 kandidat, 3 aset baru, composite check, preview SVG)
