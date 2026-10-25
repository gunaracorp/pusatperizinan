<div align="center">
<a id="top"></a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:059669,50:10b981,100:f59e0b&height=170&section=header&text=CHANGELOG&fontSize=54&fontColor=ffffff&fontAlignY=34&desc=PusatPerizinan.com%20%C2%B7%20Riwayat%20Versi%20Resmi%20%C2%B7%20Official%20Version%20History&descSize=17&descAlignY=58&animation=fadeIn" width="100%" alt="CHANGELOG — PusatPerizinan.com"/>

<br>

[![Versi Saat Ini](https://img.shields.io/badge/Versi_Saat_Ini-v1.13.2_Peta_Live-059669?style=for-the-badge&logo=semanticweb&logoColor=white)](#v1-13-2)
[![SemVer](https://img.shields.io/badge/Versioning-Semantic_2.0.0-3178C6?style=for-the-badge&logo=semver&logoColor=white)](#aturan)
[![Format](https://img.shields.io/badge/Format-Keep_a_Changelog_1.1.0-8B5CF6?style=for-the-badge&logo=markdown&logoColor=white)](#aturan)
[![Status](https://img.shields.io/badge/Channel-stable-059669?style=for-the-badge&logo=vercel&logoColor=white)](#top)

![Total Rilis](https://img.shields.io/badge/Total_Rilis-31_(0.1.0_%E2%86%92_1.13.2)-059669?style=flat-square)
![Entri Worklog](https://img.shields.io/badge/Entri_Worklog-41_ber_versi-059669?style=flat-square)
![Rilis Berikutnya](https://img.shields.io/badge/Rilis_Berikutnya-v1.14.0_(Unreleased)-f59e0b?style=flat-square)
![Zona Waktu](https://img.shields.io/badge/Zona_Waktu-Asia%2FJakarta_(WIB)-059669?style=flat-square)

<br>

**📆 `pusatperizinan.com` → sekarang berjalan di `v1.13.2 — "Peta Live"`**

<sub>Versi terlihat hidup di: footer setiap halaman (11.876 URL) · <a href="/api/version"><code>GET /api/version</code></a> · <code>package.json</code> · JSON-LD <code>softwareVersion</code> · dokumen ini</sub>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:059669,100:f59e0b&height=3&section=footer" width="100%" alt=""/>

</div>

---

## 📖 Konvensi Dokumen Ini

| Aspek | Standar |
|---|---|
| Format | [Keep a Changelog 1.1.0](https://keepachangelog.com/id/1.1.0/) — kategori `Added / Changed / Fixed / Removed / Security / Docs` |
| Versioning | [Semantic Versioning 2.0.0](https://semver.org/lang/id/) — `MAJOR.MINOR.PATCH` |
| Zona waktu | `Asia/Jakarta` (WIB, UTC+7) — tanggal rilis memakai WIB |
| Sumber kebenaran | [`WORKLOG.md`](./WORKLOG.md) (rekam jejak 1:1) · `src/lib/version.ts` (data mesin) · `package.json` (runtime) |
| Ritme | **1 task/permintaan user = 1 nomor versi baru** — fitur → `MINOR`, perbaikan → `PATCH`, perombakan arah produk → `MAJOR` |
| Presisi tanggal | Era `0.x` (Sesi 1–2) direkonstruksi dari metadata file & jejak invoice (`INV-20261021`) → presisi bulan; era `1.x` → presisi hari (terverifikasi) |
| Rilis berikutnya | **`v1.14.0`** — diisi dari seksi `[Unreleased]` saat ROADMAP-99 lanjut dieksekusi |

> 🔗 Navigasi cepat: **[Tabel Lengkap 31 Rilis](#ladder)** · **[Aturan Versioning](#aturan)** · **[WORKLOG.md](./WORKLOG.md)** · **[README.md](./README.md)** · **[ROADMAP-99.md](./ROADMAP-99.md)**

---

<a id="unreleased"></a>

## [Unreleased] — akan menjadi `v1.14.0`

> 📦 **Sisa langkah ROADMAP-99** tetap TERSIMPAN di [`ROADMAP-99.md`](./ROADMAP-99.md) — langkah **7**, 23, 24, 25, 26, 27, **3**, **5**, 33, 34, **35**, 41 kini DIEKSEKUSI (dicentang di roadmap); **langkah 4 kode lengkap** (GA4 + Clarity env-gated — menunggu ID produksi). Sisanya menunggu sesi berikutnya.

### Planned — Quick Wins P0 teratas (dari ROADMAP-99 Tabel A, sisa)
- **Aktifkan pembayaran produksi** Midtrans/Tripay — matikan `PAYMENT_DEMO_MODE` (langkah 1) — *checklist kredensial: `docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md`*
- **Submit 15 sitemap** (11.876 URL) ke Google Search Console + Bing Webmaster (langkah 2) — *checklist kredensial: `docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md`*
- **Langkah 4 eksekusi akhir**: set `NEXT_PUBLIC_GA_ID` + `NEXT_PUBLIC_CLARITY_ID` di env → GA4 & Clarity aktif (kode v1.11.0 sudah siap)
- Verifikasi token 6 mesin pencari via env → meta tag otomatis (lanjutan `v1.3.0`)
- Re-ukur PSI mobile setelah deploy v1.5.0–v1.11.0 — target LCP < 4 s & TBT < 500 ms

---

<a id="v1-13-2"></a>

## [1.13.2] — 2026-10-25 — 🗺️ "Peta Live" (Task 32)

Rilis patch deployment: merespons laporan **Google Search Console** — `GET https://pusatperizinan.com/sitemap.xml` → **404** ("Kesalahan HTTP umum", 0 halaman ditemukan). Diagnosis: aplikasi lokal sehat (indeks sitemap 200 + seksi programatik), masalah ada di sisi hosting statis idwebhost — paket yang live adalah build **2026-10-16** (LIGHT, 48 halaman) dan `sitemap.xml` tidak terbaca Google di root domain.

### Fixed
- **Paket deploy statis dibangun ulang dari kode v1.13.1** (`build-static.mjs` PACK_LIGHT + `deploy-pack.mjs`): **266 halaman HTML** (sebelumnya 48), 2.443 file, 28,67 MB — mencakup seluruh pembaruan konten v1.6.0–v1.13.1
- **Sitemap statis konsisten otomatis**: `out/sitemap.xml` (indeks 3 seksi: blog, glosarium, static 35 URL) + `robots.txt` disinkronkan saat build; seksi yang kosong setelah prune (layanan, layanan500, panduan, seo-expansion, testimoni) dihapus — GSC tidak akan menemui 404 pada seksi hantu
- **File deploy root dipulihkan**: `.htaccess` (routing/404/gzip/cache cPanel) & `DEPLOY-IDWEBHOST.md` kembali ke root proyek — sebelumnya hilang, padahal `deploy-pack.mjs` menempelkannya hanya `if existsSync` (paket baru bisa lahir tanpa keduanya)

### Verifikasi
- Isi tar diverifikasi: `sitemap.xml` + 3 seksi + `robots.txt` (4 baris Sitemap, 1:1 dengan file fisik) + `.htaccess` ✓; build-static memulihkan seluruh folder yang digeser; dev server restart → `/` 200 & `/sitemap.xml` 200
- Live site dilindungi challenge anti-bot JS ("Checking your browser") — Googlebot bisa terdampak; sarankan whitelist Googlebot / cek WAF di panel hosting

---

<a id="v1-13-1"></a>

## [1.13.1] — 2026-10-25 — 🛡️ "Logo Resmi" (Task 31)

Rilis patch pembersihan identitas: sisa logo template **"Z"** (huruf Z putih + animasi breathe — warisan template awal proyek) yang masih terlayani di URL `/logo.svg` dihapus dan diganti marka resmi situs. Rilis `v1.14.0 "Identitas Visual"` yang keliru dipasang pada sesi sebelumnya telah **di-revert penuh** (commit revert `eab4f49`) sebelum patch ini dibuat — tidak ada logo baru yang dipasang, website kembali ke logo PP semula.

### Fixed
- **`public/logo.svg` — sisa logo template Z dihapus**: file berisi huruf "Z" putih dengan animasi CSS `z-breathe` (warisan template Next.js awal) kini diganti marka resmi PusatPerizinan.com — perisai emerald + centang emas, geometri identik dengan `favicon.svg` — sehingga seluruh URL aset identitas situs bebas logo Z
- **Audit identitas menyeluruh**: 3 PNG utama (`logo-icon.png`, `logo-icon-white.png`, `logo.png` — karangan PP + bintang emas + "PUSATPERIZINAN.COM") diverifikasi visual; `manifest.json`, metadata `icons` layout, header, footer, dan 27 komponen `<img>` lainnya tetap mengarah ke aset PP; cache `.next` bersih; **nol referensi `/logo.svg` di kode** sehingga penggantian isi berisiko nol

### Removed
- Logo template "Z" (SVG + animasi `z-breathe`) dari aset publik situs — satu-satunya jejak logo Z pada `pusatperizinan.com`

### Verifikasi
- `GET /logo.svg` → marka perisai + centang (tanpa huruf Z, tanpa `z-breathe`); `rg "logo\.svg"` di `src/` → 0 hasil; QA visual PNG (Read) → semua logo PP
- `bun run lint` 0 error · `bunx tsc --noEmit` 178 (baseline v1.11.0) · homepage 200

---

<a id="v1-13-0"></a>

## [1.13.0] — 2026-10-25 — 🗺️ "Peta Provinsi" (Task 29)

Rilis local-SEO schema: **ROADMAP-99 langkah 7** — 38 hub provinsi + 516 hub kota kini membawa schema **Service + OfferCatalog/Offer** dengan `areaServed` State/City (kode ISO 3166-2:ID + koordinat ibu kota) — lapisan sinyal lokal yang sebelumnya belum ada pada lapisan halaman wilayah. Nol URL baru — indeks 11.876 aman.

### Added
- **Schema `Service` + `OfferCatalog` per wilayah** (hub-page.tsx `HubJsonLd`): node `Service` dengan `provider` → `LEGAL_ENTITY` (PT Top Konsultan Internasional), `areaServed` `State` (hub provinsi: nama + `identifier` ISO 3166-2:ID + `GeoCoordinates` ibu kota dari `PROVINCE_GEO`) atau `City` ⊂ `State` (hub kota), dan `hasOfferCatalog` berisi `Offer` per layanan anggota (`priceNumeric` IDR nyata + `itemOffered Service`) — langkah 7 "schema Service + Offer per wilayah" penuh
- **QA `scripts/verify-wilayah-schema.ts`**: sapu 38 hub provinsi + spot-check 3 kota (Denpasar/Bandung/Serang) + regresi hub kategori — semua PASS

### Fixed
- **Bug laten geo**: `PROVINCE_GEO` (geo.ts) kehilangan entri **Banten** → seluruh halaman `/layanan/wilayah/banten*` terkirim tanpa meta `geo.region` dan tanpa koordinat; kini lengkap **38/38** (ID-BT, ibu kota Serang)
- **Bug laten JSON-LD**: pola lama hanya menaruh `@context` pada node pertama array top-level — node ke-2+ (FAQPage/ItemList) berada di luar konteks schema.org saat diparse; kini **setiap node membawa `@context` sendiri**

### Verifikasi
- `bun run lint` → **0 error, 0 warning**; `tsc --noEmit` → **178 error pre-existing** (baseline v1.11.0 persis — nol error pada berkas sentuhan)
- QA `verify-wilayah-schema.ts` → **PASS**: 38/38 provinsi (Service + Offer + areaServed + ISO), 3/3 kota (City ⊂ State), regresi non-wilayah bersih
- curl: `/layanan/wilayah/banten` → `"@type":"Service"` + `hasOfferCatalog` + `ID-BT` + `geo.region` ✓; `/layanan/wilayah/jawa-barat` → State + GeoCoordinates ✓; `/layanan/wilayah/bali/denpasar` → City + containedInPlace ✓; `/layanan/kategori/pajak` → tanpa `#service` (tak berubah) ✓
- `version.ts`: `APP_VERSION 1.13.0 "Peta Provinsi"`, `RELEASES` +1 entri (Task 29) — **nol URL publik baru → indeks 11.876 URL tetap**; `package.json` 1.13.0; `/api/version` `nextRelease → v1.14.0`

---

<a id="v1-12-0"></a>

## [1.12.0] — 2026-10-25 — 🏛️ "Identitas Resmi" (Task 28)

Rilis identitas: entitas legal resmi **pusatperizinan.com** kini **PT Top Konsultan Internasional**, dengan kredit **support system by PT Digital Bisnis Manajemen (digiman.id)** — konsisten di schema, metadata, footer 30 bahasa, halaman legal, hingga invoice.

### Changed
- **Entitas legal sitewide** — `LEGAL_ENTITY` (site.ts, satu sumber): `PT Digital Bisnis Manajemen` → **`PT Top Konsultan Internasional`**; mengalir otomatis ke JSON-LD Organization (`legalName` + `alternateName`), meta `publisher` (layout), `ProfessionalService` /kontak (legalName + catatan "dikelola oleh …"), pengendali data /kebijakan-privasi (id+en), FAQ invoice resmi (id+en), halaman biaya & generator katalog (rekening perusahaan resmi), dokumen deploy publik
- **Konstanta baru** di `site.ts`: `SUPPORT_SYSTEM = "PT Digital Bisnis Manajemen"` + `SUPPORT_SYSTEM_URL = "https://digiman.id"`
- **Kredit footer** — `footerMade` 30 locale: "Support system by PT Top Konsultan Internasional — McKinsey Partner Indonesia" → **"Support system by PT Digital Bisnis Manajemen — digiman.id"**; badge footer kini **tautan keluar ke digiman.id** (`target="_blank"`, `rel="noopener noreferrer"`, hover state)
- **`footerRights` 30 locale**: "© {year} PusatPerizinan.com — PT Top Konsultan Internasional"
- **/tentang-kami**: kartu Badan Usaha kini menyebut entitas + dukungan sistem dengan tautan digiman.id
- `version.ts`: `APP_VERSION 1.12.0 "Identitas Resmi"`, `RELEASES` +1 entri (Task 28) — **nol URL publik baru → indeks 11.876 URL tetap**; `package.json` 1.12.0; `/api/version` `nextRelease → v1.13.0`

### Verifikasi
- `bun run lint` → **0 error, 0 warning**; `tsc --noEmit` → **178 error pre-existing** (baseline v1.11.0 tak berubah — nol error pada berkas/baris sentuhan)
- curl runtime: `/` (kredit footer baru + `"legalName":"PT Top Konsultan Internasional"` + `"alternateName"` + `<meta name="publisher">` + `<a href="https://digiman.id">`), `/kontak` (legalName + "dikelola oleh …"), `/tentang-kami` (12× Top Konsultan · 2× Digital Bisnis · 4× digiman.id), `/kebijakan-privasi` ("Pengendali data pribadi Anda adalah PT Top Konsultan Internasional") — **semua 200 & sesuai**
- Sapu grep: nol hardcode "PT Digital Bisnis Manajemen" tersisa di luar konstanta `SUPPORT_SYSTEM`, komentar footer, dan 30 locale `footerMade`; nol sisa "McKinsey"

---

<a id="v1-11-0"></a>

## [1.11.0] — 2026-10-25 — 📣 "Sapa Langsung" (Task 27)

Rilis jalur order & jangkauan — menuntaskan **langkah 3 (paritas bundle di v1)** dan **langkah 5 (Floating WhatsApp CTA)** dari FASE 1 Quick Wins ROADMAP-99, sekaligus melengkapi kode **langkah 4 (GA4 + Microsoft Clarity)** — tinggal pasang ID di env.

### Added
- **Komponen `FloatingWhatsApp`** (langkah 5, 🔥 · 🟢 · P0): tombol WhatsApp melayang bottom-right di **seluruh halaman publik** — ikon WA resmi inline SVG (nol dependensi baru), ikon-saja di mobile → pil **"Konsultasi WhatsApp"** di layar ≥sm, cincin denyut compositor-only yang hilang pada `prefers-reduced-motion` (WCAG 2.2), `aria-label` eksplisit, `rel="noopener noreferrer"`
  - **Kontekstual per halaman**: pesan chat menyertakan URL aktif ("saya sedang membuka: …") — dibangun **saat klik** (nol state/effect → bebas hydration mismatch & lint `set-state-in-effect`); tanpa JS, fallback `wa.me` polos tetap berfungsi
  - **Event GA4 `whatsapp_click`** (params `page`) via `trackEvent()` — no-op aman saat GA belum aktif
  - **Sembunyi otomatis** di `/` (sudah ada chat AI RIZKI fixed bottom-right), `/admin*`, `/webmaster*`, `/checkout*` — dipasang sekali di root layout (z-40, di bawah widget chat z-[60])
  - Nomor tunggal `WHATSAPP_NUMBER` dari `landing-data.ts` (paritas dengan `CONTACT.whatsapp` site.ts terverifikasi QA)
- **Blok bundle "Sering Diambil Bersama — Paket Hemat 10%" di 500 halaman detail v1** (menuntaskan langkah 3 — sebelumnya hanya di 1.000 halaman v2/v3): 2 layanan pelengkap **lintas kategori** dipilih deterministik FNV-1a per kode (500/500 kombinasi unik, stabil antar build), daftar 3 layanan ber-harga dengan tautan internal, total kupon dicoret → harga bundle ×0,9 + chip hemat, CTA ganda: **WA "Ambil Paket Hemat 3 Layanan"** (pesan ter-prefill berisi 3 kode + total katalog) + **checkout "Ambil <kode> saja"**
- **Microsoft Clarity env-gated** di `analytics.tsx` (langkah 4, kode siap): set `NEXT_PUBLIC_CLARITY_ID` (10 karakter alfanumerik) → snippet resmi clarity.ms aktif dengan `strategy=afterInteractive` (tidak menggeser LCP) — heatmap & session recording tanpa deploy ulang kode; GA4 kini koeksisten secara independen
- **QA `scripts/verify-order-cta.ts`**: 6 seksi — determinisme & matematika bundle 500/500, marker blok bundle v1, aturan sembunyi floating WA + mount layout, paritas nomor WA, env-gating analitik — **PASS**

### Changed
- `layout.tsx`: mount `<FloatingWhatsApp />` setelah `<Toaster />` — sitewide, sekali pasang
- `analytics.tsx`: refactor — GA4 & Clarity kini independen; tanpa keduanya komponen tetap `null` (nol script pihak ketiga, performa bersih)
- `version.ts`: `APP_VERSION 1.11.0 "Sapa Langsung"`, `RELEASES` +1 entri (Task 27) — **nol URL publik baru → indeks 11.876 URL tetap**; `package.json` 1.11.0; `/api/version` `nextRelease → v1.12.0`
- CHANGELOG: ladder dilengkapi baris 21–27 (v1.5.0–v1.11.0 yang sebelumnya tertinggal)

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → **0 error, 0 warning** (1 temuan `react-hooks/set-state-in-effect` pada implementasi awal dihapus lewat refactor klik-saat-ini); `tsc --noEmit` → **178 error pre-existing** (baseline v1.10.0 tak berubah — nol error pada file sentuhan)
- QA script `verify-order-cta.ts`: **PASS** — 500/500 bundle deterministik lintas kategori & hemat −10% valid · 500/500 kombinasi unik (tanpa kolapsi hash) · marker blok lengkap · aturan sembunyi `"/", /admin, /webmaster, /checkout` · paritas WA `6281269999910`
- curl runtime: v1 `/jasa-pendirian-pt-lokal` **200** (floating WA + bundle + 2 CTA + checkout href) · v2 `/layanan/pendaftaran-nib-umkm-perorangan-pp-bu-001` **200** (WA + bundle) · v3 detail **200** (WA) · `/blog`, `/glosarium`, `/katalog` **200** (WA) · `/` **tanpa WA** ✓ · `/checkout` **tanpa WA** ✓
- Verifikasi browser (agent-browser): snapshot v1 menampilkan link **"Chat WhatsApp — konsultasi perizinan gratis"** + label "Konsultasi WhatsApp", blok bundle ter-render (total Rp 16.760.000 → **Rp 15.084.000**, hemat Rp 1.676.000), konsol **bersih**, homepage count WA = **0**; bukti: `download/verifikasi-v1-*.png`

---

<a id="v1-10-0"></a>

## [1.10.0] — 2026-10-25 — 🗓️ "Mesin Redaksi" (Task 26)

Rilis kalender editorial — mengeksekusi **langkah 35 ROADMAP-99 FASE 5** (🔥🔥, P1): **Kalender editorial blog 3×/minggu** (panduan, berita regulasi, tips pajak) yang berjalan penuh di **CMS admin yang sudah ada** (Mission Control → Konten & SEO → tab baru **Kalender Editorial**).

### Added
- **Model Prisma `EditorialSlot`** (prismaModels 12 → 13): satu sel kalender per (minggu-Senin WIB, slotIndex) — unik `[weekStart, slotIndex]`, pilar `PANDUAN | REGULASI | PAJAK`, status siklus `PLANNED → DRAFTED → PUBLISHED` (+ `SKIPPED`), tautan `postId` ke Post CMS, judul kerja + kata kunci + sudut pandang yang bisa diedit admin
- **Modul `src/lib/editorial.ts`**: **bank topik kurasi 36 topik** (12 × 3 pilar) dengan kata kunci fokus + sudut pandang penulisan per topik; helper minggu **WIB (UTC+7, minggu mulai Senin)**; rotasi topik deterministik per minggu absolut (tidak berulang dalam 12 minggu); `ensureUpcomingWeeks()` **idempoten** — menggulir horizonta 12 minggu tanpa menimpa editan admin; scaffold kerangka H2 per pilar (Panduan: Syarat/Langkah/Kesalahan · Regulasi: Isi/Terdampak/Kepatuhan · Pajak: Dasar/Contoh Hitung/Pelaporan)
- **API `/api/admin/editorial`** (terlindungi cookie admin): `GET` papan 12 minggu + statistik (join Post untuk slug/status), `PATCH` slot (`skip`/`unskip`/`update` topik — ditolak bila slot sudah dipakai), `POST {action:"start-draft"}` — satu klik membuat **Post CMS ter-prefill** (slug unik, judul, kategori sesuai pilar, kata kunci, starter excerpt, kerangka 3 H2) dan menautkan slot → `DRAFTED`
- **Tab UI baru "Kalender Editorial"** di CMS admin (switcher Artikel ⇄ Kalender): kartu statistik (Rencana/Draft/Terbit/Dilewati), kartu minggu ber-highlight **MINGGU INI** dengan hitungan status, baris slot ber-chip hari+tanggal & badge pilar berwarna (Senin=Panduan hijau · Rabu=Regulasi biru · Jumat=Tips Pajak kuning), aksi per status — **Tulis draft** (langsung membuka editor terisi), **Edit topik** (inline), **Dari bank** (pemilih topik kurasi), **Lewati/Batalkan**, **Lanjutkan draft/Edit/Lihat** untuk slot berjalan
- **QA baru `scripts/verify-editorial.ts`**: kelengkapan & keunikan bank (judul/kata kunci global unik), rotasi tanpa pengulangan 12 minggu per pilar, helper minggu WIB (Senin, label rentang, tanggal slot +0/+2/+4), scaffold & starter excerpt, **idempotensi DB** (ensure 2× → 36 slot tetap), sinkron pilar↔slotIndex↔hari — **PASS, 0 warning**

### Changed
- **Sinkron siklus hidup**: `PUT /api/admin/posts/[id]` kini memperbarui status slot tertaut (terbit → `PUBLISHED`, unpublish → `DRAFTED`); `DELETE` mengembalikan slot ke `PLANNED` dan melepas tautan — slot tidak pernah menggantung
- Pratinjau draft kalender mengikuti alur CMS yang ada (mode pratinjau admin di `/blog/{slug}`)
- `version.ts`: `APP_VERSION 1.10.0 "Mesin Redaksi"`, `RELEASES` +1 entri (Task 26), `PLATFORM_STATS` — `prismaModels 12 → 13` (nol URL publik baru — alat internal redaksi); `package.json` 1.10.0; `/api/version` `nextRelease → v1.11.0`

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → **0 error, 0 warning**; `tsc --noEmit` → **181 → 178 error pre-existing** (3 error lama di `posts/helpers.ts` ikut diperbaiki; nol error pada file baru)
- QA script `verify-editorial.ts`: **36/36 topik unik** · rotasi 12/12 minggu tanpa pengulangan × 3 pilar · minggu WIB Senin-tepat · ensure idempoten (36 slot) · pilar↔hari sinkron — **PASS**
- curl runtime (cookie admin): `GET /api/admin/editorial` **200** (12 minggu × 3 slot = 36, minggu-0 MINGGU INI) · skip/unskip **200** · update/restore topik **200** · `start-draft` **201** (slug, DRAFT, kategori Panduan, scaffold 3 H2, excerpt starter) · `PUT` publish → slot `PUBLISHED` · `DELETE` → slot kembali `PLANNED` post-null · tanpa auth **401**
- Verifikasi browser (agent-browser): login → tab Konten & SEO → switcher **Kalender Editorial** ter-render (statistik + kartu minggu + baris slot ber-aksi), klik **Tulis draft** membuka editor CMS ter-prefill (judul + 3 kerangka H2 + panel Skor SEO), konsol bersih

---

<a id="v1-9-0"></a>

## [1.9.0] — 2026-10-25 — 📖 "Kamus Raja" (Task 25)

Rilis glosarium — mengeksekusi **langkah 41 ROADMAP-99 FASE 5** (🔥): **Glosarium 214 istilah perizinan** ramah SEO sekaligus rujukan kutipan LLM/AI search. +215 URL baru (214 istilah + 1 indeks) dengan skema `DefinedTerm` penuh.

### Added
- **Modul data `src/lib/glosarium/`** (types + 8 file kategori + index): **214 istilah** dalam 8 kategori — perizinan dasar & OSS (26), badan usaha & kepemilikan (28), perpajakan (31), izin sektor & sertifikasi (37), ketenagakerjaan & PMI (22), perdagangan & ekspor-impor (17), regulasi & lembaga (24), proses-dokumen & kepatuhan (29)
- Struktur konten per istilah: **definisi inti 30–60 kata** (jawaban langsung siap kutip featured snippet/AI) + **2 paragraf pendalaman** (konteks, cara kerja, praktik, jebakan) + **dasar hukum eksplisit** (UU/PP/Perpres statis, tanpa pola "freshness year") + **729 tautan related** antar-istilah + **207 tautan layanan internal terverifikasi**
- **Halaman indeks `/glosarium`**: 14 kartu "Paling Sering Dicari", **pencarian & filter kategori client-side** (static-export friendly), ringkasan 8 kategori, **indeks A–Z 214 istilah**, CTA WA — JSON-LD **`DefinedTermSet`** dengan 214 `hasDefinedTerm` (nama + URL) untuk citasi AI/LLM
- **Halaman detail `/glosarium/[slug]` × 214**: Definisi Singkat ber-border (blok snippet), Pendalaman & Praktiknya, kartu Dasar Hukum, CTA layanan terkait per istilah, grid Istilah Terkait — JSON-LD **`DefinedTerm`** (`inDefinedTermSet`) + `BreadcrumbList`
- **QA baru `scripts/verify-glossary.ts`**: jumlah ≥200, slug unik & URL-safe, kategori valid, konten minimum (short ≥30 kata, detail ≥2 paragraf ≥30 kata), related resolve tanpa self-ref, href layanan tervalidasi ke `ALL_SERVICE_PAGES` + allowlist statis — **PASS 214/729/207, 0 warning**

### Changed
- **Sitemap**: seksi baru `glosarium` (214 URL, prioritas 0.8) — seksi sitemap **14 → 15**; `/glosarium` masuk seksi static (weekly 0.9)
- **llms.txt**: seksi baru "Glosarium perizinan (rujukan istilah untuk AI & pencari)" — satu baris ringkas 214 istilah + pola URL `{slug}`
- **Navigasi**: header dropdown Informasi + item "Glosarium Perizinan"; footer 2 kolom (+"Database KBLI" company links & quick-links "📖 Glosarium Perizinan (200+ Istilah)")
- `version.ts`: `APP_VERSION 1.9.0 "Kamus Raja"`, `RELEASES` +1 entri (Task 25), `PLATFORM_STATS` — `indexedUrls 11.661 → 11.876`, `sitemapSections 14 → 15`; `package.json` 1.9.0; `/api/version` `nextRelease → v1.10.0`

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → **0 error, 0 warning**; `tsc --noEmit` → baseline **181 error pre-existing** tidak berubah (nol error pada file glosarium/wiring)
- QA script: **214 istilah** (≥200 ✓) · slug unik & URL-safe · 8 kategori valid (min 17) · **729 related resolve** tanpa self-ref · **207 service-link valid** · sort deterministik PASS
- curl dev: `/glosarium` 200 (DefinedTermSet + hasDefinedTerm + indeks A–Z) · 7 sampel detail (nib, oss-rba, pt-perorangan, halal, rptka, api-u, uu-cipta-kerja, kalender-kepatuhan) 200 dengan DefinedTerm + BreadcrumbList · slug invalid → **404** · `/sitemap/glosarium.xml` **214 `<loc>`** · sitemap index memuat seksi glosarium · llms.txt terisi · footer landing 2 tautan glosarium · `dev.log` bersih
- Indeks 11.661 → **11.876 URL** (+215: 214 istilah + 1 indeks); nol perubahan URL lama → indeks aman

---

<a id="v1-8-0"></a>

## [1.8.0] — 2026-10-25 — ⚖️ "Arena Banding" (Task 24)

Rilis perbandingan programatik — mengeksekusi **langkah 34 ROADMAP-99 FASE 4** (🔥🔥): memperluas `comparisons-generated.ts` menjadi arena perbandingan layanan berskala penuh. Dua contoh eksplisit roadmap kini hidup: **"NIB vs SIUP"** (lisensi warisan yang dihapus UU Cipta Kerja) dan **"PT vs CV vs Perseorangan"** (perbandingan trio pertama).

### Added
- **+30 pasangan programatik** di `comparisons-generated.ts` (38 → 68) — semuanya resolve ke base page katalog nyata: badan usaha & entitas (ekspansi-asing vs PT/PPO, koperasi-yayasan vs CV), sertifikasi (ISO 14001/45001/22000/27001/9001-SMK3, halal-PIRT, BPOM-alkes, higiene sanitasi, halal restoran), pajak (8 pasangan: SPT OP vs Badan, NPWP-PKP Badan, audit-restitusi-sengketa, planning-audit, UMKM-PKP OP, SPT masa OP vs Badan, transfer pricing), PMI (P3MI-LPK, BNSP-P3MI, bahasa-LPK, barat-timur tengah, Korea-Taiwan/HK/SG), tambang (RKAB-IUP), operasional (reklame-PBG, **NIB-LKPM**) & virtual office (2 pasangan)
- **Perbandingan handmade `nib-vs-siup`** (comparisons.ts) — jawaban SEO untuk kueri "perbedaan NIB dan SIUP": 10 aspek status-hukum (NIB berlaku sebagai SIUP sejak Pasal 12 PP 5/2018), FAQ migrasi SIUP lama, SIUPULG PMA, izin khusus komoditas — verdict jujur "ini bukan duel"
- **Engine trio `comparisons-trio.ts` + `TrioView`** — tipe `TrioComparison` (rows 3-sel + `best: 0|1|2|null`), halaman `pt-vs-cv-vs-perseorangan`: tabel 10 aspek 3-kolom berpewarnaan per pihak (crown "Terbaik di aspek ini"), peta keputusan 3 jalur, verdict naik-kelas (PPO → PT biasa, CV → PT), FAQ 5 — kartu mobile per aspek / grid desktop 4 kolom
- **Kartu trio unggulan "Paling dicari"** di index `/bandingkan` (di atas grid) + badge jumlah dinamis `COMPARISONS.length + TRIO_TOTAL`

### Changed
- `SERVICE_SLUG_MAP` di `/bandingkan/[slug]`: fallback kini **id itu sendiri** (`/layanan/{slug}` — semua 114 base page hidup di sana), map alias hanya untuk entitas warisan + `siup: "nib"` — memperbaiki internal-link 30 pasangan baru (iso-14001, lkpm, ekspansi-asing, dst. sebelumnya salah arah ke nib)
- `generateStaticParams` + `generateMetadata` `/bandingkan/[slug]` mendukung trio; sitemap seksi `bandingkan` memasukkan trio (78 URL)
- QA baru `scripts/verify-comparisons.ts`: resolusi pasangan, slug unik lintas sumber, kualitas minimal (≥6 aspek & ≥4 FAQ), winner/best valid, determinisme dua-run

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → 0 error, 0 warning; `tsc --noEmit` → 0 error pada seluruh file yang disentuh (baseline proyek 181 error pre-existing di scripts/examples tidak tersentuh)
- QA script: 68/68 pasangan programatik resolve · **78 slug unik** · semua ≥6 aspek & ≥4 FAQ · determinisme PASS · prosa rata-rata **405 kata** per perbandingan
- curl dev: `/bandingkan` 200 (badge 78 + kartu trio) · `/bandingkan/nib-vs-siup` 200 FAQPage+BreadcrumbList · `/bandingkan/nib-vs-lkpm` 200 + link `/layanan/lkpm` ✓ · `/bandingkan/ekspansi-asing-vs-pt` link `/layanan/ekspansi-asing` ✓ · `/bandingkan/pt-vs-cv-vs-perseorangan` 200 (10 crown, peta keputusan, verdict, FAQ accordion) · `/sitemap/bandingkan` **78 `<loc>`**
- Indeks 11.629 → **11.661 URL** (+32: 30 programatik + 1 handmade + 1 trio); `PLATFORM_STATS.indexedUrls` disingkronkan

---

<a id="v1-7-0"></a>

## [1.7.0] — 2026-10-25 — 👑 "Konten Raja" (Task 23)

Rilis anti-thin content — mengeksekusi **langkah 33 ROADMAP-99 FASE 4** (🔥🔥🔥): memperkaya halaman detail dengan prosa panjang ±300 kata per layanan. Target: 1.000 halaman Katalog v2/v3 yang sebelumnya hanya berisi blok terstruktur (syarat/langkah/FAQ tanpa prosa) + 65 halaman induk v1 yang sebelumnya seragam-template.

### Added
- **Modul `src/lib/catalog/rich-content.ts`** — generator prosa deterministik (FNV-1a dari kode/id layanan, pola `detail-seo.ts`): 4 paragraf per layanan — ① konteks & urgensi legal, ② dokumen & jebakan umum (2 jebakan dipilih dari 8, interpolasi syarat aktual), ③ timeline jujur (estimasi + alur 5 fase + faktor penundaan), ④ kewajiban pasca-terbit (2 dari 5, masa berlaku, kalender kepatuhan). Bank varian per slot → ruang kombinasi besar anti-doorway
- **Section "Panduan Lengkap"** (judul 4 varian deterministik) di semua 1.000 halaman detail Katalog v2/v3 — ditempatkan setelah "Proses Pengurusan", server-rendered
- **Pengayaan `buildBasePage`** — 4 paragraf rich content ditambahkan ke `longDesc` 65 halaman induk v1, menghapus pola longDesc seragam-template antar layanan
- `splitRequirements()` sadar-kurung — koma di dalam "(...)" tidak dipecah; dipakai juga oleh FAQ `detail-seo.ts`

### Changed
- `KatalogV2Detail` memakai rich content via adapter `RichContentInput` (seed = kode layanan; price terformat IDR); `generators.ts` (seed = id layanan, tanpa validity → kalimat generik instansi)
- QA baru `scripts/verify-rich-content.ts`: word-count, keunikan kombinasi, determinisme dua-run — keluaran di Verifikasi

### Fixed
- **Overflow mobile latent di blok bundle** — `<Link>` dengan `truncate` tetap `display:inline` sehingga teks nama layanan panjang meluber `scrollWidth` (terdeteksi di halaman v3 dengan nama terkait panjang, 529px > 390px) → wajib `block w-full`
- **Syarat FAQ terpotong di dalam kurung** — split koma naif memecah "dokumen 8 SNP (isi, proses, …)" menjadi "…(isi" → kini split sadar-kurung

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → 0 error, 0 warning
- QA script: 1.000 layanan — min 264 · rata-rata **304** · max 401 kata; **1.000/1.000 (100%) kombinasi paragraf unik** + 1.000 judul unik; 65/65 halaman induk unik (rata-rata 410 kata); determinisme dua-run PASS
- agent-browser (390×844): halaman v2/v3/v1 render section panduan (4 paragraf) tanpa error console; overflow v3 terdeteksi lalu dimitigasi (`scrollW` 529 → 390); `/layanan/nib` 8 paragraf isi (422 kata)
- Nol perubahan URL → indeks 11.629 URL aman; `PLATFORM_STATS` tidak berubah

---

<a id="v1-6-0"></a>

## [1.6.0] — 2026-10-25 — 🗺️ "Peta Nusantara" (Task 22)

Rilis programmatic SEO lokal terbesar dalam sejarah proyek — mengeksekusi **langkah 25 ROADMAP-99 FASE 4**: halaman level kota diperluas dari 94 "kota utama" menjadi **seluruh 514 kabupaten/kota resmi Indonesia** (BPS, pasca pemekaran Papua 2022) + 2 alias yang sudah live. Indeks naik **11.207 → 11.629 URL** (+422), nol URL lama berubah.

### Added
- **Modul data `src/lib/kabkota-data.ts`** — 516 entri kab/kota per 38 provinsi, seluruhnya diverifikasi terhadap rujukan resmi (Wikipedia "Daftar kabupaten dan kota di Indonesia menurut provinsi" + UU pemekaran 14/15/16/13-2022); jumlah per provinsi cocok 1:1 dengan rujukan (Aceh 23, Sumut 33, … total 416 kab + 98 kota = 514)
- **422 halaman hub kab/kota baru** di `/layanan/wilayah/{prov}/{kab-kota}` — mewarisi generator hub kota yang sudah terbukti: 108+ layanan, 5 FAQ lokal, schema BreadcrumbList + FAQPage + rating, breadcrumb 4 level, kota saudara
- **`/wilayah` jadi engine internal-linking penuh** — setiap kartu provinsi kini membuka <details> berisi link ke SELURUH kab/kota provinsi itu (516 link internal + 38 hub provinsi = 554 halaman lokal diperkuat), plus ItemList JSON-LD baru: "Kabupaten & Kota yang dilayani" (numberOfItems: 516)
- **API baru `allCityNames(provIdx)`** di generators.ts + `TOTAL_KABKOTA_HUBS` di wilayah.ts (konsumen UI/sitemap)

### Changed
- `getCityHubs()` kini membangun hub dari **majors + kabkota-data** (dedup per string, majors tetap di depan — slug existing terjaga 100%) dan **di-memoize** (array + Map per-slug) sehingga sitemap, `generateStaticParams`, dan render per-request semuanya O(1) setelah build pertama — penting karena volume halaman naik 3,8×
- `getAnyPage("wilayah/{prov}/{kota}")` kini lookup ke seluruh 514 kab/kota, bukan majors saja
- Sitemap seksi `hubs` otomatis membesar 137 → 559 URL via `getHubSlugs()`; komentar sitemap & worklog disesuaikan ("±654 halaman lokal")
- `PLATFORM_STATS.indexedUrls` 11.207 → 11.629 (terekspose di `/api/version` + JSON-LD softwareVersion)

### Fixed
- **Anchor bersarang di `/wilayah`** — kartu provinsi sebelumnya satu `<Link>` raksasa; dengan <details> berisi 500+ anchor di dalamnya jadi HTML invalid + merusak hidrasi React → kartu dirombak jadi `<div>` berisi beberapa `<Link>` (judul, link kab/kota, CTA)
- **Duplikat Sungai Penuh** (Jambi) — "Sungai Penuh" sudah major existing; entri "Kota Sungai Penuh" di data baru akan membuat 2 halaman untuk kota yang sama → data disamakan dengan string major
- Badge header dokumen ini sebelumnya tertinggal di v1.4.0 meski v1.5.0 sudah rilis — kini singkron

### Verifikasi (definisi selesai ROADMAP-99)
- `bun run lint` → 0 error, 0 warning
- Smoke test data: 516 entri, jumlah per provinsi = rujukan resmi, nol duplikat slug (514 + 2 alias)
- agent-browser: halaman baru (Kabupaten Deli Serdang, Kabupaten Toba, Kota Sukabumi) render H1/breadcrumb/FAQ/schema tanpa error console; `/wilayah` 598 link internal + ItemList 38+516 + tanpa overflow mobile 390px; slug invalid tetap 404; URL existing (Medan, Jambi (Kota), Jakarta Selatan (SCBD), Luwuk, Sorong, Timika (Mimika)) tidak berubah
- sitemap `hubs.xml` = 559 URL; total 14 seksi = 11.629 URL

---

<a id="v1-5-0"></a>

## [1.5.0] — 2026-10-24 — 🦾 "SEO Titan" (Task 21)

Rilis upgrade SEO menyeluruh — mengeksekusi FASE 4 ROADMAP-99 (langkah 23, 24, 26, 27) + perbaikan Core Web Vitals berbasis data PSI mobile produksi (Performance 38 · LCP 9,2 s · TBT 1.520 ms · SEO 100).

### Added
- **FAQPage + HowTo schema & section untuk 1.000 halaman Katalog v2/v3** (langkah 23) — modul baru `src/lib/catalog/detail-seo.ts`: 5 FAQ bisnis-nyata + 5 langkah proses per layanan, semua **deterministik** (FNV-1a dari kode layanan — stabil antar-build). Section on-page server-rendered: "Pertanyaan Umum" (Accordion) + "Proses Pengurusan — 5 Langkah"; schema digabung ke `@graph` Product/Breadcrumb yang ada
- **Blok "Ringkasan Cepat"** di 1.000 halaman detail (langkah 27) — jawaban langsung 40–60 kata (terukur: 55 kata) + dl biaya/estimasi/penerbit; target featured snippet Google untuk query "biaya/jasa pengurusan X"
- **Engine internal-linking "Urus X dari Mana Saja"** (langkah 24) — 6 hub provinsi `/layanan/wilayah/<prov>` deterministik per kode layanan + link induk `/wilayah`; menyalurkan link equity 1.000 halaman katalog ke 200+ halaman lokal
- **HowTo schema di halaman detail v1** (`/layanan/...`) — `page.steps` yang sudah ada kini di-emisi sebagai HowToStep (ambang ≥ 3 langkah)

### Changed
- **E-E-A-T blog** (langkah 26) — `author` Person diperkaya: `url` → profil tim nyata (`/#tim`), `knowsAbout` per kategori artikel (Pajak / Tambang & Energi / Travel Ibadah / default perizinan), + `speakable` (h1 + paragraf pertama) untuk asisten suara & AI-GEO, + `isPartOf` → `#blog`
- **PERF-01 — i18n lazy-load**: 28 bahasa non-inti (≈360 KB sumber) tidak lagi di-bundle statis di semua halaman; hanya core id+en (22 KB) yang statis, sisanya diunduh on-demand via dynamic import per kode bahasa (`ensureTranslations()`), cache per sesi, fallback id tetap aman
- **PERF-02 — ChatWidget idle-mount**: widget chat (framer-motion + chunk sendiri) baru di-mount saat browser idle (`requestIdleCallback`, fallback 1,5 s) via `chat-widget-lazy.tsx` — keluar dari jalur hidrasi kritis

### Fixed
- **Horizontal scroll mobile di halaman detail katalog** — grid item kolom utama tanpa `min-w-0` membiarkan teks `truncate`/nowrap melebarkan track (PSI mobile: sw 543 px vs vw 390 px); kini kolom utama & sidebar diberi `min-w-0`, teks flex panjang dibungkus `span.min-w-0.break-words` — terverifikasi browser: scrollWidth = viewport persis
- **H2 flex baru** tidak lagi memicu overflow (ikon `shrink-0` + teks dalam `span` wrap-able)

---

<a id="v1-4-0"></a>

## [1.4.0] — 2026-10-22 — ⭐ "Version Master" (Task 20)

Rilis pertama dengan **identitas versi resmi**. Seluruh proyek kini punya nomor versi yang hidup di produk, API, dan dokumentasi.

### Added
- **Sistem versi SemVer 2.0.0 resmi** — seluruh riwayat proyek dipetakan ke 20 rilis (`v0.1.0` → `v1.4.0`) tanpa satu pun entri worklog terlewat
- **`CHANGELOG.md`** (file ini) — format Keep a Changelog 1.1.0, bilingual-ringkas, header animatif + 8 badge + tabel ladder 20 rilis + aturan versioning proyek
- **`src/lib/version.ts`** — single source of truth versi di kode: `APP_VERSION`, `RELEASE_NAME`, `RELEASE_DATE`, dan array `RELEASES` (20 entri ber-type/name/taskId/highlights)
- **`GET /api/version`** — API publik metadata rilis (force-static, ikut ter-deploy di 3 mode deployment): versi, nama rilis, tanggal, statistik platform, dan riwayat lengkap semua versi
- **Badge versi di footer seluruh situs** — pil `pusatperizinan.com · v1.4.0` di bottom-bar, tampil di 11.207 halaman, menaut ke `/api/version`
- **`softwareVersion` pada JSON-LD** — schema.org `SoftwareApplication` di `/cek-izin` kini membawa versi aplikasi aktual (sinyal freshness untuk mesin pencari & AI-GEO)

### Changed
- **Rename `worklog.md` → `WORKLOG.md`** (kapital, standard internasional) + stub pointer `worklog.md` agar referensi lama & kebiasaan agent tetap valid
- **Semua 29 entri historis WORKLOG diberi tag rilis aditif** (`> 🏷️ Rilis vX.Y.Z — "Nama" · type`) — nol byte historis diubah, hanya baris baru disisipkan
- **WORKLOG.md** kini punya seksi `🏷️ Peta Versi Resmi (SemVer)` berisi ladder 20 rilis + aturan versioning wajib untuk agent penerus
- **`README.md`** — badge versi for-the-badge di header (ID & EN), callout "Versi Saat Ini", seksi dokumentasi menaut CHANGELOG/WORKLOG/ROADMAP, API Reference + `/api/version`, peta rute + struktur + aturan agent disinkronkan
- **`package.json`** — `name: pusatperizinan`, `version: 1.4.0` (sebelumnya boilerplate `nextjs_tailwind_shadcn_ts` / `0.2.1`)

---

<a id="v1-3-0"></a>

## [1.3.0] — 2026-10-21 — 🔎 "Search Master" (Task 19)

### Added
- **Panel `/webmaster`** (noindex) — alat verifikasi situs untuk **26 mesin pencari dunia** dalam 4 tier (Wajib · Regional · Privasi · AI-GEO), Google diprioritaskan penuh: panduan 5 langkah + 15 URL sitemap siap salin + cheat code Import GSC→Bing; jawaban resmi "ada berapa mesin pencari": **200+ aktif, 6 kategori, ≈10 indeks independen, 3 portal inti menutup 99%+**
- **`src/lib/webmaster-tools.ts`** — katalog terkurasi 26 mesin (pangsa pasar, jenis index, metode verifikasi, meta tag resmi, env var, prioritas P0–P3)
- **API IndexNow `/api/indexnow`** — GET status + POST ping server-side ke `api.indexnow.org`; kunci statis `public/<key>.txt` sesuai spek; **terbukti hidup: HTTP 202 diterima jaringan nyata**
- **Meta verifikasi 6 mesin** di `layout.tsx` via env (Google, Bing, Yandex, Baidu, Naver, Seznam) — tanpa token = tag tidak dirender

### Fixed
- **`robots.txt`** — 2 deklarasi Sitemap hilang (`layanan-pp.xml`, `layanan-pp3.xml`) ditemukan & diperbaiki (12 → 14 baris)
- **Pelajaran lapangan #7** — rewrite `/:param(regex{32}).txt` gagal di Next.js 16 (path-to-regexp tak lagi dukung regex inline) → solusi file statis permanen

---

<a id="v1-2-0"></a>

## [1.2.0] — 2026-10-21 — 🗺️ "Blueprint 99" (Task 18)

### Added
- **`ROADMAP-99.md`** — dokumen strategi **99 langkah penyempurnaan menuju #1 dunia** dalam 12 fase (Monetisasi → World-Class Finishing), tag 3 dimensi per item (Impact 🔥 · Effort 🟢🟡🔴 · Prioritas P0–P3), Tabel Quick Wins Top-10, strategi 3 Horison (bln 1–3 / 3–9 / 9–18), milestone kuartalan Q1–Q4
- **Status: TERSIMPAN — tidak dieksekusi** (permintaan eksplisit owner: "untuk nanti kamu simpan dan nanti tinggal aku buka")
- Callout penunjuk ROADMAP-99 di README.md seksi 22 (versi ID & EN), semua anchor tetap valid

---

<a id="v1-1-0"></a>

## [1.1.0] — 2026-10-21 — 📚 "Emerald Docs" (Task 17)

### Added
- **`WORKLOG.md` terlengkap** — 650 baris: header eksekutif, daftar isi ber-anchor, timeline ringkas, Lampiran A (statistik: 15+ bug produksi tertembang, 100+ skenario E2E kumulatif) & Lampiran B (peta artefak), aturan append-only untuk agent penerus
- **`README.md` standard internasional** — 1.427 baris bilingual penuh 🇮🇩/🇬🇧: header/footer capsule-render animatif, typing-svg 5 baris, 16 badge, 5 diagram Mermaid, 16 blok collapsible, 25 seksi per bahasa
- **Validasi otomatis 53 link internal** via replika algoritma github-slugger → **53/53 valid 100%**

---

<a id="v1-0-1"></a>

## [1.0.1] — 2026-10-21 — 🔌 "Restart" (Task fix-preview)

### Fixed
- **Preview hanya menampilkan logo Z** — root cause: dev server mati antar sesi (port 3000 kosong, bukan bug aplikasi); restart `nohup bun run dev` + verifikasi E2E penuh (beranda, `/kepatuhan-pro`, checkout katalog) — nol perubahan kode

---

<a id="v1-0-0"></a>

## [1.0.0] — 2026-10-21 — 🚀 "Mesin Revenue" (Task 16) — MAJOR

> 🎉 **Rilis mayor pertama** — situs berubah dari "katalog besar" menjadi **mesin revenue lengkap** dengan 4 lever monetisasi aktif. 11.207 URL terindeks.

### Added
- **KepatuhanPRO (MRR engine)** — langganan kepatuhan 6 SKU: Starter/Growth/Scale × Bulanan/Tahunan (Rp 499rb – 39,9jt; tahunan hemat 2 bulan); landing `/kepatuhan-pro` + JSON-LD Service 6 Offer + FAQPage
- **Instant Order 1.500 layanan** — resolver server-side `resolveAnyService()` (katalog v1 `BU-*` · v2 `PP-*` · v3 `PP3-*`), `GET /api/payment/service-resolve`, checkout langsung `/checkout?paket={kode}`
- **Bundle "Sering Diambil Bersama"** — 2 pelengkap lintas kategori deterministik (FNV-1a) dengan total/hemat −10% di 1.000 halaman detail
- **Social proof per kode** — "±N perusahaan memilih layanan sejenis" deterministik per layanan
- **Hub `/wilayah`** — navigasi ItemList 38 provinsi yang memperkuat 200+ halaman local SEO existing (arsitektur anti-kanibalisasi)

### Security
- **Harga permanen server-side** — `/api/payment/create` menolak harga dari client; nilai dikunci dari `pricing.ts`/katalog (anti-manipulasi penuh)

---

## 🏛️ ERA FONDASI — Sesi 1 & 2 (0.x)

> Tanggal presisi bulan (direkonstruksi); detail teknis utuh di [`WORKLOG.md`](./WORKLOG.md).

## [0.10.0] — 2026-10 — 🧬 "Pro v3" (Task 4-a/b/c, 5 · Sesi 2)

### Added
- Generator Katalog v3: 500 layanan `PP3-XX-NNN` (6 kategori baru, lifecycle variants) → total **11.206 URL**, hemat kumulatif Rp 629,2 jt
- Wiring penuh: halaman detail, browser, metadata, sitemap

## [0.9.1] — 2026-10 — 🐦‍🔥 "Phoenix" (Task 1 reinstall · Sesi 2)

### Fixed
- Clone ulang ke sandbox baru + seed 132 data demo + resep OOM-safe (infra pulih tanpa kehilangan artefak)

## [0.9.0] — 2026-10 — 💎 "Premium v2" (Task 14 · Sesi 1)

### Added
- Parser MD→TS 500 layanan `PP-XX-NNN` (file "Terlengkap Se Asia" v1.0) → 500 halaman `/layanan/*-pp-*` + browser premium → **10.706 URL**, total hemat Rp 3,55 M (persis statistik file sumber)
- Integrasi aditif non-destruktif: nol URL lama rusak

## [0.8.0] — 2026-10 — 🤝 "Kemitraan" (Task 13 · Sesi 1)

### Added
- Program Kemitraan `/mitra` — 3 tier komisi + simulasi profit + JSON-LD

### Fixed
- 10 anchor footer mati diperbaiki

## [0.7.0] — 2026-10 — 🧲 "Funnel Emas" (Task 12/12-b · Sesi 1)

### Added
- 4 halaman dedikasi CTA + 19 CTA sitewide diarahkan + sinkronisasi paket/README

### Fixed
- 2 bug produksi dimitigasi (kontrak LeadForm 400 di 6 halaman, dll.)

## [0.6.1] — 2026-10 — 📄 "Dokumen Hidup" (Task 11 · Sesi 1)

### Docs
- README "terlengkap" 959 baris berbasis kode aktual (pendahulu README bilingual `v1.1.0`)

## [0.6.0] — 2026-10 — 🚚 "Mesin Deploy" (Task 10 · Sesi 1)

### Added
- Halaman `/download` + panel AdminDeploy + pipeline static export (PACK_LIGHT/FULL, checksum MD5, badge kesegaran) — siap cPanel/idwebhost

## [0.5.0] — 2026-10 — 🏢 "Kepercayaan Visual" (Task 8–9 · Sesi 1)

### Added
- 5 foto kantor asli (optimasi sharp q82), menu mega-dropdown 5 grup, galeri beranda

## [0.4.1] — 2026-10 — 🚑 "Patch Sitemap" (Task 7 · Sesi 1)

### Fixed
- 🚨 EMERGENCY: konflik route-tree membuat situs **500 sitewide** → arsitektur sitemap permanen (fondasi 14 seksi hari ini)

## [0.4.0] — 2026-10 — 🎬 "Gerak & Presisi" (Task 6-a/b/c/final · Sesi 1)

### Added
- Motion system compositor-only (60fps), audit SEO 25 masukan, rebuild `/kontak`

## [0.3.0] — 2026-10 — 🌍 "Nusantara 30 Bahasa" (Task 4-a/b, 4, 5 · Sesi 1)

### Added
- UI **30 bahasa** (RTL penuh: Arab, Farsi, Urdu, Ibrani), FAQ 51 Q&A, kebijakan privasi v2.0 (UU PDP + GDPR), footer kredit internasional

## [0.2.0] — 2026-10 — 🗂️ "Katalog 500" (Task 3 · Sesi 1)

### Added
- Katalog 500 layanan pertama (kode `BU-XX-NNN`) + sitemap **10.201 URL** + rebranding logo & foto kantor

## [0.1.1] — 2026-10 — ✅ "Verifikasi Pertama" (Task 2 · Sesi 1)

### Verified
- E2E agent-browser pertama: form lead → SQLite → dashboard admin

## [0.1.0] — 2026-10 — 🏗️ "Fondasi" (Task 1 · Sesi 1)

### Added
- Instalasi penuh dari [`github.com/prabudanling/pusatperizinan`](https://github.com/prabudanling/pusatperizinan) → situs hidup di port 3000: 12 model Prisma + SQLite seeded, Admin Mission Control, checkout, blog, 5 alat AI
- Paywall pembayaran mode uji (`PAYMENT_DEMO_MODE=true`) — Midtrans/Tripay menunggu API keys

---

<a id="ladder"></a>

## 🪜 Tabel Lengkap 31 Rilis

| # | Versi | Tanggal (WIB) | Tipe | Nama Rilis | Task WORKLOG | Status |
|---|---|---|---|---|---|---|
| 31 | **v1.13.2** ⭐ | **2026-10-25** | patch | **Peta Live** | Task 32 | **🟢 AKTIF — versi berjalan** |
| 30 | v1.13.1 | 2026-10-25 | patch | Logo Resmi | Task 31 | ✅ Rilis |
| 29 | v1.13.0 | 2026-10-25 | minor | Peta Provinsi | Task 29 | ✅ Rilis |
| 28 | v1.12.0 | 2026-10-25 | minor | Identitas Resmi | Task 28 | ✅ Rilis |
| 27 | v1.11.0 | 2026-10-25 | minor | Sapa Langsung | Task 27 | ✅ Rilis |
| 26 | v1.10.0 | 2026-10-25 | minor | Mesin Redaksi | Task 26 | ✅ Rilis |
| 25 | v1.9.0 | 2026-10-25 | minor | Kamus Raja | Task 25 | ✅ Rilis |
| 24 | v1.8.0 | 2026-10-25 | minor | Arena Banding | Task 24 | ✅ Rilis |
| 23 | v1.7.0 | 2026-10-25 | minor | Konten Raja | Task 23 | ✅ Rilis |
| 22 | v1.6.0 | 2026-10-25 | minor | Peta Nusantara | Task 22 | ✅ Rilis |
| 21 | v1.5.0 | 2026-10-24 | minor | SEO Titan | Task 21 | ✅ Rilis |
| 20 | v1.4.0 ⭐ | **2026-10-22** | minor | **Version Master** | Task 20 | ✅ Rilis |
| 19 | v1.3.0 | 2026-10-21 | minor | Search Master | Task 19 | ✅ Rilis |
| 18 | v1.2.0 | 2026-10-21 | minor | Blueprint 99 | Task 18 | ✅ Rilis |
| 17 | v1.1.0 | 2026-10-21 | minor | Emerald Docs | Task 17 | ✅ Rilis |
| 16 | v1.0.1 | 2026-10-21 | patch | Restart | Task fix-preview | ✅ Rilis |
| 15 | **v1.0.0** 🚀 | 2026-10-21 | **major** | **Mesin Revenue** | Task 16 | ✅ Rilis |
| 14 | v0.10.0 | 2026-10 | minor | Pro v3 | Task 4-a/b/c, 5 (S2) | ✅ Rilis |
| 13 | v0.9.1 | 2026-10 | patch | Phoenix | Task 1 reinstall (S2) | ✅ Rilis |
| 12 | v0.9.0 | 2026-10 | minor | Premium v2 | Task 14 | ✅ Rilis |
| 11 | v0.8.0 | 2026-10 | minor | Kemitraan | Task 13 | ✅ Rilis |
| 10 | v0.7.0 | 2026-10 | minor | Funnel Emas | Task 12/12-b | ✅ Rilis |
| 9 | v0.6.1 | 2026-10 | patch | Dokumen Hidup | Task 11 | ✅ Rilis |
| 8 | v0.6.0 | 2026-10 | minor | Mesin Deploy | Task 10 | ✅ Rilis |
| 7 | v0.5.0 | 2026-10 | minor | Kepercayaan Visual | Task 8–9 | ✅ Rilis |
| 6 | v0.4.1 | 2026-10 | patch | Patch Sitemap | Task 7 🚨 | ✅ Rilis |
| 5 | v0.4.0 | 2026-10 | minor | Gerak & Presisi | Task 6-a/b/c/final | ✅ Rilis |
| 4 | v0.3.0 | 2026-10 | minor | Nusantara 30 Bahasa | Task 4-a/b, 4, 5 | ✅ Rilis |
| 3 | v0.2.0 | 2026-10 | minor | Katalog 500 | Task 3 | ✅ Rilis |
| 2 | v0.1.1 | 2026-10 | patch | Verifikasi Pertama | Task 2 | ✅ Rilis |
| 1 | v0.1.0 | 2026-10 | minor | Fondasi | Task 1 | ✅ Rilis |

---

<a id="aturan"></a>

## 📏 Aturan Versioning Proyek Ini

1. **Satu task = satu versi.** Setiap permintaan user yang mengubah kode/dokumen wajib menghasilkan nomor versi baru — tidak ada perubahan tanpa versi.
2. **Kapan naik apa** (SemVer 2.0.0):
   - `MAJOR` (x.0.0) — perombakan arah produk, breaking change API/kontrak data, migrasi platform.
   - `MINOR` (1.x.0) — fitur baru, halaman baru, lever revenue baru, integrasi baru.
   - `PATCH` (1.4.x) — bug fix, hotfix, restore infra, perbaikan dokumen kecil.
3. **5 titik sinkronisasi wajib** setiap rilis (checklist agent):
   - [ ] Entri baru di **`WORKLOG.md`** (format baku + baris `🏷️ Rilis`)
   - [ ] Section baru di **`CHANGELOG.md`** (kategori Keep a Changelog)
   - [ ] Update **`src/lib/version.ts`** (`APP_VERSION`, `RELEASE_NAME`, `RELEASE_DATE`, +1 entri `RELEASES`)
   - [ ] Update **`package.json`** (`version`)
   - [ ] Footer & JSON-LD **otomatis ikut** (membaca `version.ts` — tidak perlu edit)
4. **`[Unreleased]` adalah antrean resmi** — item dari ROADMAP-99 dipindah ke sini saat mulai dikerjakan, lalu diberi nomor versi saat rilis.
5. **Append-only untuk sejarah** — entri versi lama tidak pernah diubah/dihapus; koreksi = versi baru (patch) + catatan.
6. **Tanggal = WIB** (`Asia/Jakarta`), presisi hari untuk era 1.x, presisi bulan untuk era fondasi 0.x.

---

<div align="center">

<sub>📦 Di-maintain manual oleh tim <strong>PusatPerizinan.com</strong> · Format <a href="https://keepachangelog.com/id/1.1.0/">Keep a Changelog</a> · Semantik <a href="https://semver.org/lang/id/">SemVer 2.0.0</a></sub><br>
<sub>🔎 Versi juga tersedia secara programatik: <code>GET /api/version</code> · Rekam jejak 1:1: <a href="./WORKLOG.md">WORKLOG.md</a></sub>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:059669,50:10b981,100:f59e0b&height=110&section=footer&text=v1.4.0%20%E2%80%94%20Version%20Master&fontSize=26&fontColor=ffffff&fontAlignY=60&animation=fadeIn" width="100%" alt="Footer CHANGELOG"/>

</div>
