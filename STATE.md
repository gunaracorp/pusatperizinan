# STATE.md — PusatPerizinan.com (Sandbox Z.ai)

> **Kontrak sesi:** satu sesi = satu website = satu repositori.
> Sesi berikutnya WAJIB membaca file ini dulu — jangan mengulang eksplorasi.

---

## 1. Identitas Proyek

| Atribut | Nilai |
|---|---|
| Website | PusatPerizinan.com — konsultan perizinan, pajak & penempatan PMI Indonesia |
| Repositori | https://github.com/gunaracorp/pusatperizinan (origin utuh, remote terpasang) |
| Lokasi sandbox | `/home/z/my-project` (= root repositori, `.git` utuh) |
| Versi aplikasi | v1.17.1 "Dokumen Terkini" (`src/lib/version.ts`, `package.json`) |
| Stack | Next.js 16.4 (Turbopack dev) · React 19 · TypeScript 5 · Tailwind 4 · shadcn/ui · Prisma ORM 8 RC (`@prisma/orm-postgres 8.0.0-rc.20`) · PostgreSQL embedded |
| Database | Embedded PostgreSQL (`node_modules/@embedded-postgres/linux-x64`), cluster di `.pgdata/`, port 5432, user `postgres` (trust), DB `pusatperizinan` |
| Model data | 14 model (Lead, Consultation, ChatMessage, LicenseCheck, Subscriber, Testimonial, DocumentCheck, RoadmapRequest, NotificationSetting, Order, Post, FollowUpLog, RecoveryLog, NotificationLog, EditorialSlot) |
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

## 4. Status Saat Ini (2026-10-29)

- ✅ Instalasi penuh: 1.148 paket, kontrak ter-emisi, DB ter-inisialisasi + ter-sign + ter-verify.
- ✅ 12 endpoint kritis = 200 (/, /api/version, /api/stats, /sitemap.xml, /katalog, /lowongan-kerja, /admin, /checkout, /garansi, /blog, /glosarium, /kbli, /kalkulator-pajak).
- ✅ E2E terverifikasi via browser: form konsultasi hero → lead tersimpan di PostgreSQL (source: hero; normalisasi WA 0812… → 62812… bekerja).
- ✅ Keamanan: API admin menolak request tanpa `pp_admin_token`.
- 📸 Bukti: `download/verifikasi-install-sesi-ini.png`.
- ⏳ Belum aktif (butuh kredensial owner): GA4 real, Telegram/Fonnte, Midtrans/Tripay produksi, Sentry DSN, IndexNow key.

## 5. Peta Dokumen Resmi Repo

`README.md` (dokumentasi 16 seksi) · `CHANGELOG.md` (41 rilis) · `ROADMAP-99.md` (99 langkah, 12 fase) · `WORKLOG.md` + `worklog.md` (riwayat tugas) · `docs/HOSTINGER-NODEJS-DEPLOY.md` (deploy produksi) · `docs/PRISMA8-MIGRATION-STATUS.md` (aturan migrasi DB).

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
