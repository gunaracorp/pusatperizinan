# Deploy PusatPerizinan.com di Hostinger (Node.js Web App)

Panduan ini mengikuti konfigurasi repository saat ini: Next.js 16, output `standalone`, Node.js, Prisma ORM 7, dan SQLite. Ini **belum** merupakan migrasi ke PostgreSQL.

## 1. Pengaturan Hostinger

Pakai **Node.js Web App**, bukan upload source code ke `public_html` sebagai situs PHP/statis. Pilih Node.js 22 seperti build yang dipakai saat ini.

- Repository: `gunaracorp/pusatperizinan`
- Branch: gunakan branch perbaikan untuk menguji; setelah lolos baru arahkan produksi ke perubahan yang disetujui
- Build command: `npm run build`
- Start command: `npm run start` (atau biarkan Hostinger memakai script `start` dari package.json)
- Framework: Next.js bila terdeteksi otomatis
- Output: `.next` bila form meminta output directory

Script build memakai `next build --webpack`. Ini adalah fallback yang sesuai untuk error Turbopack Hostinger yang muncul saat memproses `src/app/globals.css`.

## 2. Variabel yang wajib disiapkan sebelum build

Prisma 7 membaca `DATABASE_URL` melalui `prisma.config.ts`; jadi variabel ini harus tersedia pada tahap install/build juga, bukan hanya setelah aplikasi hidup.

Untuk konfigurasi repository saat ini (SQLite), nilai awal yang diharapkan kode adalah:

```env
DATABASE_URL=file:./db/custom.db
ADMIN_PASSWORD=<buat-password-admin-yang-kuat>
ADMIN_SECRET=<minimal-32-karakter-acak>
CRON_SECRET=<secret-acak-berbeda>
PAYMENT_DEMO_MODE=false
FOLLOWUP_SWEEP_MINUTES=15
```

Jangan menyalin tanda kurung sudut dari contoh. Buat secret yang berbeda satu sama lain. Jangan gunakan contoh placeholder sebagai nilai produksi.

**Peringatan SQLite:** konfigurasi ini hanya layak bila lokasi database benar, dapat ditulis oleh proses Node, dan file tidak terhapus saat redeploy. Pastikan backup terlebih dulu. Shared/publish runtime yang tidak menjamin penyimpanan persisten dapat kehilangan perubahan database. Untuk data lead dan order produksi, rencanakan migrasi teruji ke PostgreSQL terkelola.

## 3. Environment variables opsional

Isi hanya jika fiturnya digunakan.

### Pembayaran
- Midtrans: `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION`
- Tripay: `TRIPAY_API_KEY`, `TRIPAY_PRIVATE_KEY`, `TRIPAY_MERCHANT_CODE`, `TRIPAY_IS_PRODUCTION`; opsional `TRIPAY_METHODS`
- Transfer manual: `BANK_TRANSFER_INFO`

Untuk produksi, jangan set `PAYMENT_DEMO_MODE=true`. Kalau belum ada gateway, mode manual lebih aman daripada menganggap transaksi demo sebagai pembayaran sungguhan.

### Notifikasi
- Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Gateway WhatsApp Fonnte: `FONNTE_TOKEN`

### Analitik dan pemantauan
- Search Console: `NEXT_PUBLIC_GSC_VERIFICATION`
- Google Analytics: `NEXT_PUBLIC_GA_ID` (kode fallback tersedia di aplikasi)
- Microsoft Clarity: `NEXT_PUBLIC_CLARITY_ID`
- Sentry: `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`
- Opsional IndexNow: `INDEXNOW_KEY`

Variabel dengan awalan `NEXT_PUBLIC_` masuk ke bundle browser saat build; isi sebelum build/redeploy agar nilainya terpasang. Jangan pernah memberi awalan tersebut kepada database password, secret, atau kunci payment gateway.

## 4. Prisma Postgres (opsi database gratis) — jangan langsung tempel URL-nya

Prisma ORM adalah library, sedangkan Prisma Postgres adalah layanan database. Plan gratis Prisma Postgres saat panduan ini ditulis mencakup 200.000 operasi dan 500 MB penyimpanan per bulan/plan; jika batas operasi habis, database dapat berhenti menerima query sampai kuota reset. Cek kembali harga/kuota resmi sebelum mengandalkannya.

Repository ini saat ini menggunakan `provider = "sqlite"` dan `@prisma/adapter-better-sqlite3`. Karena itu, URL PostgreSQL **tidak akan bekerja hanya dengan mengganti `DATABASE_URL`**. Migrasi juga perlu mengganti provider Prisma, adapter runtime, dependensi, membuat tabel di database baru, dan memindahkan/mengecek data SQLite yang ada. Lakukan sebagai perubahan terpisah dan uji sebelum mengalihkan produksi.

## 5. Sebelum membuka akses produksi

- [ ] Ganti password admin dan buat `ADMIN_SECRET` serta `CRON_SECRET` yang unik.
- [ ] Pastikan `.env` tidak dilacak Git; jangan commit token atau password.
- [ ] Database backup disimpan privat, bukan di repository publik.
- [ ] Pastikan database memiliki tabel Prisma dan uji form lead, login admin, order, serta webhook.
- [ ] Tes domain HTTPS, log runtime, dan proses redeploy sebelum mengalihkan trafik.
- [ ] Jangan aktifkan gateway pembayaran produksi sampai credential dan URL webhook diverifikasi.

## 6. Jika build masih gagal

Buka Hostinger → Website Dashboard → Deployments → detail build → Build logs. Catat perintah terakhir yang gagal dan pesan error paling bawah. Hilangkan password, token, URL database, serta data pelanggan sebelum membagikan log.

Rujukan resmi:
- Hostinger: https://www.hostinger.com/support/how-to-fix-next-js-16-turbopack-build-errors-on-hostinger/
- Hostinger environment variables: https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/
- Prisma Postgres pricing: https://www.prisma.io/pricing
- Prisma ORM 7 PostgreSQL: https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/postgresql
