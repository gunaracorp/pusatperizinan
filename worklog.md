---
Task ID: 39
Agent: main
Task: Install + sempurnakan website pusatperizinan (GitHub) — 5 langkah ROADMAP-99: social proof (8), recovery checkout (12), activity feed (46), garansi (48), verifikasi notifikasi ops (62). Rilis v1.15.0 "Mesin Kepercayaan".

Work Log:
- Clone repo main (Prisma 8 + PostgreSQL branch); sandbox tanpa root → embedded PostgreSQL 17 (@embedded-postgres binaries + libicu60 dpkg-extract), initdb + pg_ctl 5432, prisma contract emit + db init (15 model)
- Fix DATABASE_URL warisan sandbox menimpa .env → loadEnv({override:true}) di prisma.config.ts & src/prisma/db.ts
- Fitur: social-proof.ts (FNV-1a bulanan, TRUST_METRICS) di 1.065 halaman detail + checkout; recovery.ts + RecoveryLog (model 15) sequence WA 1j/24j/72j + scheduler denyut + /api/cron/recovery + /api/admin/recovery + panel admin OrdersTab; /api/activity + activity-feed.tsx sitewide anonim; /garansi (FAQPage schema) + badge checkout + footer + sitemap (indeks 11.877)
- QA: lint 0 error, verify-order-cta PASS, verify-recovery.ts, browser verifikasi
- Versioning 8 titik: v1.15.0 sinkron (version.ts, package.json, CHANGELOG+badge+ladder, ver.json, api/version, ROADMAP-99 5 centang, README, WORKLOG)

Stage Summary:
- v1.15.0 "Mesin Kepercayaan" — ROADMAP-99 kini 22/99; SEO 11.877 URL; seluruh mesin uang siap (lead follow-up + checkout recovery + notifikasi + trust), tinggal kredensial kanal owner
