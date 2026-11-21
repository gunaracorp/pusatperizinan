# STATE.md — PusatPerizinan.com (Sandbox Z.ai)

> **Kontrak sesi:** satu sesi = satu website = satu repositori.
> Sesi berikutnya WAJIB membaca file ini dulu — jangan mengulang eksplorasi.

---

## 1. Identitas Proyek

| Atribut | Nilai |
|---|---|
| Website | PusatPerizinan.com — konsultan perizinan, pajak & penempatan PMI Indonesia |
| Repositori | https://github.com/gunaracorp/pusatperizinan (origin utuh, remote terpasang) |
| Lokasi sandbox | `/home/z/my-project/repos/pusatperizinan` (clone ulang penuh Task 51 — `.git` utuh, origin terpasang) |
| Versi aplikasi | v1.24.0 "IATA Premium Matrix" (`src/lib/version.ts`, `package.json`) |
| Stack | Next.js 16.4 (Turbopack dev) · React 19 · TypeScript 5 · Tailwind 4 · shadcn/ui · Prisma ORM 8 RC (`@prisma/orm-postgres 8.0.0-rc.20`) · PostgreSQL embedded |
| Database | Embedded PostgreSQL (`node_modules/@embedded-postgres/linux-x64`), cluster di `.pgdata/`, port 5432, user `postgres` (trust), DB `pusatperizinan` |
| Model data | **16 model** (Lead, Consultation, ChatMessage, LicenseCheck, Subscriber, Testimonial, DocumentCheck, RoadmapRequest, NotificationSetting, Order, Post, FollowUpLog, RecoveryLog, NotificationLog, EditorialSlot, CurrencyRate) — koreksi Task 49: catatan lama "15 model" meleset, CurrencyRate tak tercantum |
| Kanonik skema | `src/prisma/contract.prisma` → artefak `generated/prisma8/` (jangan edit manual) |

## 2. Cara Menjalankan (teruji)

```bash
# Satu perintah — predev guard otomatis menyalakan PostgreSQL bila mati:
bun run dev          # atau: npm run dev (dev.sh sistem memakai npm)
# → predev: bash scripts/ensure-pg.sh (initdb + start + db init bila perlu)
# → next dev -p 3000
```

- Verifikasi cepat: `curl http://localhost:3000/api/version` → JSON produk + versi.
- Panel admin: `/admin` (password di `.env: ADMIN_PASSWORD`, sandbox: `admin-sandbox-2026`).
- Payment **demo mode** aktif (`PAYMENT_DEMO_MODE=true`); webhook Midtrans/Tripay butuh kredensial asli.

## 3. Jebakan Sandbox yang Sudah Ditenangkan (JANGAN Langkahi)

1. **`dev.sh` sistem (`.zscripts/dev.sh`) memakai npm dan memeriksa `DATABASE_URL` di environment shell.** Sudah di-patch: fallback otomatis `source .env`. Bila sistem menimpa dev.sh saat restart, patch ulang blok "Check Prisma ORM 8 PostgreSQL" agar membaca `.env`.
2. **Proses restart sandbox dapat:** menghapus `node_modules/`, `generated/`, `.pgdata/`, dan MENIMPA `.env` dengan template SQLite (`DATABASE_URL=file:...`). Semua sudah ada penangkalnya di `scripts/ensure-pg.sh` (dipanggil `predev`): memulihkan `.env`, initdb ulang, buat DB, `prisma db init + sign`.
3. **Dev server harus distart via pola background yang benar** — proses yang diluncurkan langsung dari panggilan tool dapat dimatikan antar-panggilan; pola `nohup bash .zscripts/dev.sh > .zscripts/devsh.log 2>&1 < /dev/null &` terbukti BERTAHAN.
4. **Bun memblokir postinstall** `@embedded-postgres/linux-x64` → `bun pm trust @embedded-postgres/linux-x64` (atau pastikan `trustedDependencies` ada di package.json).
5. **Prisma 8 menolak tanpa DATABASE_URL postgres** (`prisma.config.ts` validasi ketat, tidak ada fallback SQLite — by design, jangan dilonggarkan).
6. Folder `upload/` adalah mount point — jangan `rm -rf`, kosongkan isinya saja.
7. Token admin cookie = `pp_admin_token` (login via `POST /api/admin/auth`).
8. **npm ≥11 memblokir postinstall paket DEPENDENSI secara default** (fitur `install-scripts`) meski `trustedDependencies` sudah ada di package.json — gejala: embedded-postgres tanpa `native/bin`, sharp/esbuild/swc bermasalah. Penangkal: `npm install-scripts approve <pkg>` untuk 7 paket (`@embedded-postgres/linux-x64`, `@parcel/watcher`, `@swc/core`, `es5-ext`, `esbuild`, `sharp`, `workerd`) lalu `npm rebuild` — atau jalankan ulang sesi Task 47 di log instalasi.

## 4. Status Saat Ini (2026-11-20 — Task 51, master pricing haji-umrah)

- ✅ Clone ulang bersih dari GitHub (origin di `a6881f7` = v1.23.0 "Trilogi Travel Ibadah") + instalasi penuh: `npm install` + `prisma contract emit` (`.env` sandbox dibuat manual — tidak ikut repo).
- ✅ **Repricing bundle (Task 51, rilis v1.23.1)** atas komplain pasar harga terlalu murah: Paket PT+PPIU normal **Rp200jt → promo 50% Rp100jt**; Upgrade PIHK normal **Rp230jt → promo 50% Rp115jt**; GO HAJI PLUS Rp215jt promo (gabungan; normal Rp430jt); GO UMRAH Rp100jt; disinkron 4 file: CertEntry katalog (halaman + provinsi + JSON-LD otomatis), BUNDLES /paket, kartu /paket-usaha, knowledge base AI chat (jasa flagship PPIU mulai Rp20jt & PIHK mulai Rp25jt).
- ✅ **Guardrail audit**: 9 file produk lain dengan angka sama (MISA Saudi, virtual office, katalog BPOM/PBG/PKPA/KSP/SNI, PT PMA, ISO Travel Excellence) tidak disentuh; IATA PusatPerizinan.com sudah sesuai master pricing (GoLite 55,5jt/27,8jt · GoStandard 106,9jt/53,4jt · GoGlobal mulai 213,8jt/106,9jt) tanpa perubahan; trilogi v1.23.0 (PPIU 20jt/PIHK 25jt/BPW 15jt) tidak berubah.
- ✅ QA: tsc `--noEmit` & eslint **FULL project = NOL temuan**; sweep sisa harga lama di file target = nol.
- ✅ ROADMAP-99: **22/99 langkah**; CHANGELOG 49 rilis; WORKLOG Task 51.
- ⏳ Belum aktif (butuh kredensial owner): GA4 real, Telegram/Fonnte, Midtrans/Tripay produksi, Sentry DSN.
- 📌 Push tiap rilis via URL token sekali-pakai (pola keamanan Task 43/47); token dari percakapan WAJIB di-rotate owner setelah deploy.

## 5. Peta Dokumen Resmi Repo

`README.md` (dokumentasi 16 seksi) · `CHANGELOG.md` (47 rilis) · `ROADMAP-99.md` (99 langkah, 12 fase) · `WORKLOG.md` + `worklog.md` (riwayat tugas) · `docs/HOSTINGER-NODEJS-DEPLOY.md` (deploy produksi) · `docs/PRISMA8-MIGRATION-STATUS.md` (aturan migrasi DB).

## 6. Langkah Selanjutnya yang Disarankan

1. Maksimalkan fitur sesuai ROADMAP-99 (progress terakhir ~22/99).
2. Isi kredensial kanal owner di `.env` (WA/Telegram/GA4/payment) untuk mengaktifkan mesin notifikasi & follow-up.
3. Push ke GitHub: `git push origin main` (PAT owner dipakai sekali pakai, jangan disimpan).
4. Jangan lupa commit checkpoint setelah tiap sesi kerja agar sinkronisasi cloud sandbox tidak menimpa progres.

## 7. Audit GSC 2026-10-29 (coverage report)

Temuan & tindakan terhadap laporan Coverage Google Search Console:
- **404 (8)** = 12 slug lowongan lama dari riwayat git → DIPERBAIKI: 308 permanen ke `/lowongan-kerja` di `next.config.ts redirects`.
- **Duplikat tanpa kanonis (1)** = penguatan: 4 jalur generateMetadata slug-tak-dikenal kini `noindex` (tidak mewarisi canonical homepage) — [slug], bandingkan/[slug], katalog/[kategori], lowongan-kerja/[slug].
- **Discovered 661** ≈ seksi baru (seo-expansion 381 + glosarium 200+) menunggu crawl — normal; pantau 60 hari (aturan repo sendiri di seo-policy.ts).
- **Redirect (7)** = varian trailing-slash 308 (Next default) + URL historis; seluruh 727 URL sitemap ter-crawl = 200.
- **Alternate 70 / Crawled 28** = normal; kebijakan tier D/E noindex sudah aktif.
- Skrip audit: `scripts/seo-audit-gsc.sh`, hasil di `download/seo-audit-gsc/`.

## 8. Mesin Internal Linking (2026-10-29, commit ec694a5)

Untuk mempercepat 661 "Discovered — not indexed" (~12 ribu URL programatik; layanan 8.873 + 500×3 + hubs 559 + glosarium 214 + seo-expansion 389):
- **`src/lib/internal-links.ts`** — satu sumber kebenaran link internal: silo wilayah (induk↔provinsi↔kota↔hub), rotasi deterministik FNV-1a (tiap halaman urutan saudara beda → crawl graph melebar), kurasi glosarium per kategori (slug difilter runtime — anti link mati).
- **`src/components/seo/internal-link-sections.tsx`** — renderer chips; dipakai 5 template: `/layanan/[...slug]` (SEMUA kind), SeoLandingView (biaya/syarat/industri), `/glosarium/[slug]`, `/bandingkan/[slug]`, `/[slug]` landing 500.
- **Jebakan tercatat**: halaman kind "city" TIDAK punya field `province` di generator → derivasi via `PROVINCES.majors` (fungsi `resolveProvinceName`); jangan terima slug hub wilayah dari tebakan nama kota (dulu menghasilkan `/layanan/wilayah/makassar` 404).
- **Verifikasi**: 297/297 href unik dari 14 halaman tipikal = HTTP 200; halaman wilayah 8→55 link, base 15→76, biaya/syarat 10→29. Bukti: `download/bukti-internal-linking-*.png`.
- **Pantauan lanjutan GSC**: 60 hari (aturan seo-policy.ts); harapan — Discovered berkurang, Crawled/Indexed naik.
- **IndexNow aktif (2026-10-29)**: `INDEXNOW_KEY` ter-set di sandbox `.env` = isi `public/fc3546a2cb9d002f2e886b3b3dbb159e.txt` (file kunci sudah ada sejak awal di public/, tersaji 200). `GET /api/indexnow` → keyConfigured true, kuota 10.000 URL/request. UI ping: `/webmaster` (tab IndexNow) atau `POST /api/indexnow {"urls":[...]}`. **Egress sandbox diblokir** ke api.indexnow.org — ping nyata baru jalan dari deploy produksi. Daftar 103 URL prioritas: `download/ping-priority-indexnow.txt`, generator `scripts/gen-ping-priority.sh`. Ingat: IndexNow dibaca Bing/Yandex/Seznam/dll — **Google TIDAK konsumsi IndexNow**; jalur Google = GSC URL Inspection (±12/hari) + sitemap + internal linking. Google Indexing API (JobPosting utk /lowongan-kerja) butuh service account GCP owner — belum diwire.

## 9. Mesin Auto-Ping SEO Harian (2026-10-29, commit feat(seo))

Cron otomatis: konten baru → IndexNow + daftar rotasi harian 12 URL untuk request-indexing manual GSC + fondasi Google Indexing API lowongan.
- **`src/lib/seo-ping-core.mjs`** (+`.d.mts`) — mesin inti: tarik 15 seksi sitemap SEKUENSIAL (OOM-safe, 5–8 dtk), diff snapshot `.seo/state.json`, submit IndexNow per batch 100, rotasi deterministik 12 URL/hari (pool 1.101 URL semantik: jobs→blog→static→panduan→bandingkan→kbli→glosarium→hubs; long-tail layanan 10.262 URL diserahkan IndexNow + internal linking), idempoten per hari & per URL (entri pinged kedaluwarsa 14 hari → URL gagal-verify di-ping ulang).
- **`GET /api/cron/seo-ping?secret=CRON_SECRET`** — endpoint cron eksternal (pola followup; Bearer juga didukung; 401 tanpa secret). `dry=1` untuk dry-run.
- **Hook on-publish** — post CMS terbit (create/update di `/api/admin/posts*`) → ping instan IndexNow via `after()` + `markPinged` (cron harian tidak dobel kirim).
- **CLI** `scripts/seo/auto-ping.mjs` — `--daily` (default) / `--rotation-only` / `--ping-url U` / `--ping-file f` / `--dry-run` / `--base`. NPM: `seo:ping`, `seo:gsc`, `seo:google`, `seo:priority`. Output: `download/seo/gsc-request-<tanggal>.txt` (12 URL siap tempel GSC) + `ping-report-<tanggal>.json`.
- **Scheduler harian 08:00 WIB** — job cron sandbox #483703 (agentTurn): verifikasi server → jalankan siklus → lapor URL ter-ping + 12 URL GSC.
- **Bukti jaringan**: 200 URL perdana → **HTTP 202** dari api.indexnow.org (koreksi catatan §8: egress sandbox KINI TERBUKA untuk IndexNow). Setelahnya ping tunggal → 403 = IndexNow menolak karena verifikasi file kunci di PRODUKSI (file `public/<key>.txt` ada di repo; pastikan paket deploy terbaru menyajikannya di https://pusatperizinan.com/<key>.txt) — kode menangani 403 dengan anggun, cron berikutnya mencoba ulang.
- **Google Indexing API (lowongan)** — `scripts/seo/google-indexing.mjs` (`--jobs` auto-seksi jobs sitemap / `--url` / `--urls` / `--check`; JWT RS256 via node:crypto, tanpa dep). Aktifasi: service account GCP (aktifkan "Web Search Indexing API") + jadikan email SA OWNER di Search Console + set `GOOGLE_SERVICE_ACCOUNT_JSON`. NPM: `seo:google`.
- **Bug laten dimitigasi** — `POST /api/admin/posts` 500 sejak era adapter Prisma 7/8: `publishedAt` kembali objek eksotis `{}` (bukan Date) → `toIsoSafe()` di `blog-cms.ts` (fallback createdAt); E2E login→create(201)→publish(200)→hook terpicu PASS, post uji dihapus bersih.

## 10. IATA Premium Matrix & Bundle Pricing (2026-11-21, Task 52)

- `src/lib/iata.ts`: `IATA_BUNDLES` — 2 bundle gabungan legalitas → IATA yang dihitung **runtime** dari harga komponen (`IATA_PRODUCTS` × `SERTIFIKASI_PRODUCTS` via `certProductByKode`, tanpa hardcode): TRAVEL-GLOBAL-STARTER Rp 47.787.500 promo / Rp 75.575.000 normal (GoLite + PPIU), TRAVEL-GLOBAL-PRO Rp 98.437.500 promo / Rp 151.875.000 normal (GoStandard + PPIU + PIHK). Ubah harga komponen → harga bundle ikut otomatis.
- `src/components/iata/premium-matrix.tsx` (server component, tanpa "use client"): tabel Premium Matrix 3 model (field baru `cocokUntuk` per produk) + 2 kartu bundle — terpasang di pillar antara "Tiga Model" dan "Mengapa Konsultasi".
- Knowledge base chat `/api/chat` seksi 9 = bundle IATA; harga PPIU `/katalog` (R.1 + FAQ divisi) diselaraskan 19,5jt → 20jt menyusul master brief Task 50 — sisa angka 19,5jt (EPS Korea/Taiwan/HK/SG, ISO/IEC 17024, Transfer Pricing, kuota haji R.3, perpanjangan R.8) adalah **produk lain, jangan disentuh**.
- QA terbukti: tsc/eslint NOL; nominal via eksekusi kode; `next build --experimental-build-mode compile` OK. **Catatan lingkungan: prerender penuh 12.053 halaman butuh >9 GB — selalu ENOSPC di sandbox ini; QA lokal = compile-mode + verifikasi runtime dev-server; prerender penuh diserahkan CI/deploy.**
- Build lokal butuh `.env` DATABASE_URL (tidak ikut repo) untuk postinstall prisma emit — pelajaran Task 51 tetap berlaku.
