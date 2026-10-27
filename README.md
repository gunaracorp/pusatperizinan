<div align="center">
<a id="top"></a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:064e3b,45:059669,75:10b981,100:f59e0b&height=210&section=header&text=PUSATPERIZINAN.COM&fontSize=48&fontColor=ffffff&fontAlignY=34&desc=Platform%20Perizinan%20%7C%20Pajak%20%7C%20Kepatuhan%20Usaha&descSize=17&descAlignY=57&animation=fadeIn" width="100%" alt="PusatPerizinan.com — Platform perizinan, pajak, dan kepatuhan usaha"/>

<h1>Dokumentasi Proyek</h1>

<p><strong>Satu codebase untuk layanan perizinan, katalog digital, konsultasi berbantuan AI, pembayaran, CMS, dan operasi bisnis.</strong></p>

<p>
  <a href="https://pusatperizinan.com">🌐 Situs</a> ·
  <a href="https://github.com/gunaracorp/pusatperizinan">💻 Repository</a> ·
  <a href="./docs/HOSTINGER-NODEJS-DEPLOY.md">🚀 Panduan Deploy</a> ·
  <a href="./CHANGELOG.md">📦 Riwayat Versi</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24_direkomendasikan-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-8_RC-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

[![Versi](https://img.shields.io/badge/Versi-aplikasi_1.14.2-059669?style=flat-square)](./src/lib/version.ts)
[![Bahasa](https://img.shields.io/badge/Antarmuka-30_bahasa-0F766E?style=flat-square)](./src/lib/i18n/languages.ts)
[![Model Data](https://img.shields.io/badge/Model_Data-14-7C3AED?style=flat-square)](./src/prisma/contract.prisma)
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2563EB?style=flat-square&logo=githubactions&logoColor=white)](./.github/workflows/prisma8-migration.yml)

<br/>
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:064e3b,100:f59e0b&height=4&section=footer" width="100%" alt=""/>
</div>

> **Catatan akurasi:** dokumentasi ini diselaraskan dengan struktur kode, konfigurasi, dan perintah yang terdapat di repository. Data bisnis, kredensial integrasi, kesiapan database produksi, dan status layanan pihak ketiga tetap harus diverifikasi pada lingkungan masing-masing.

---

## 🧭 Navigasi

| Bagian | Isi |
|---|---|
| [01. Ringkasan](#01-ringkasan-proyek) | Tujuan dan kemampuan utama |
| [02. Fitur](#02-peta-fitur) | Fitur bisnis, AI, katalog, admin, dan operasional |
| [03. Peta Halaman](#03-peta-halaman) | Rute publik dan area privat |
| [04. Arsitektur](#04-arsitektur-aplikasi) | Alur request, API, database, dan integrasi |
| [05. Teknologi](#05-tumpukan-teknologi) | Framework dan dependensi utama |
| [06. Struktur Folder](#06-peta-struktur-repository) | Fungsi direktori dan file penting |
| [07. Menjalankan Lokal](#07-menjalankan-proyek-secara-lokal) | Instalasi dan pemeriksaan awal |
| [08. Environment](#08-konfigurasi-environment) | Variabel lingkungan dan keamanan |
| [09. Database](#09-database-prisma-dan-postgresql) | Kontrak Prisma, inisialisasi, backup, migrasi |
| [10. API](#10-ringkasan-api) | Endpoint publik dan admin |
| [11. SEO & Analitik](#11-seo-analitik-dan-distribusi-konten) | Sitemap, JSON-LD, GA4, feed |
| [12. Build & Deploy](#12-build-dan-deployment) | Standalone dan hosting statis |
| [13. Kualitas](#13-pemeriksaan-kualitas-dan-pengujian) | CI dan skrip verifikasi |
| [14. Troubleshooting](#14-pemecahan-masalah) | Gejala umum dan tindakan |
| [15. Keamanan](#15-keamanan-dan-data-produksi) | Rahasia, pembayaran, data klien |
| [16. Dokumentasi](#16-dokumen-pendukung) | Panduan dan kontribusi |

---

## 01. Ringkasan Proyek

**PusatPerizinan.com** adalah platform digital layanan konsultasi perizinan, perpajakan, legalitas usaha, sertifikasi, dan kepatuhan bisnis Indonesia. Repository ini tidak hanya berisi halaman pemasaran: di dalamnya juga terdapat katalog layanan, alur pemesanan/pembayaran, API, CMS, panel admin, automasi tindak lanjut lead, serta mesin SEO.

### Gambaran kemampuan

| Area | Isi |
|---|---|
| **Akuisisi pelanggan** | Landing page, formulir konsultasi, CTA WhatsApp, katalog layanan, halaman sektoral dan wilayah |
| **Katalog & transaksi** | Tiga generasi katalog layanan, resolver harga server-side, checkout, status order, webhook pembayaran |
| **Asisten digital** | Chat RIZKI, pemeriksaan izin berbantuan AI, pemeriksaan dokumen dengan model vision, roadmap usaha, kalkulator biaya/pajak |
| **Konten** | Blog statis dan CMS, FAQ, glosarium, panduan, KBLI, testimoni, kalender kepatuhan |
| **Operasional** | Panel admin, leads, pipeline, konsultasi, pesanan, percakapan, pemeriksaan AI, notifikasi, editorial, follow-up |
| **SEO & distribusi** | Metadata, halaman terprogram, sitemap tersegmentasi, JSON-LD, RSS, robots.txt, llms.txt, IndexNow |
| **Internasionalisasi** | Registry antarmuka 30 bahasa; dukungan arah teks RTL pada bahasa yang ditandai |
| **Keandalan** | Pemeriksaan kontrak database, skrip backup/restore, validasi artefak build, GitHub Actions |

### Identitas teknis utama

- **Versi aplikasi:** 1.14.2, didefinisikan di <code>src/lib/version.ts</code> dan <code>package.json</code>.
- **Framework:** Next.js App Router dengan TypeScript.
- **Output Node.js:** <code>output: "standalone"</code> untuk menjalankan <code>node .next/standalone/server.js</code>.
- **Data aplikasi:** kode saat ini menggunakan Prisma ORM 8 Release Candidate dan adapter PostgreSQL. Konfigurasi database produksi, impor data lama, serta kredensial hosting harus diverifikasi terpisah; jangan mengasumsikan data produksi otomatis telah berpindah.
- **Sumber harga checkout:** <code>src/lib/pricing.ts</code> dan resolver katalog server-side. Harga dari browser tidak boleh dipercaya sebagai sumber nominal transaksi.

---

## 02. Peta Fitur

### 2.1 Website publik dan pengalaman pengguna

| Fitur | Implementasi / lokasi |
|---|---|
| Beranda dan CTA konsultasi | <code>src/app/page.tsx</code>, <code>src/components/landing/</code> |
| Navigasi, menu layanan, footer | <code>header.tsx</code>, <code>footer.tsx</code> |
| Formulir lead dan konsultasi | <code>lead-form.tsx</code>, <code>src/app/konsultasi/</code>, <code>src/app/kontak/</code> |
| CTA WhatsApp mengambang | <code>floating-whatsapp.tsx</code> |
| Galeri kantor dan tim | <code>office-gallery.tsx</code>, <code>team.tsx</code> |
| Perbandingan layanan dan testimoni | <code>comparison.tsx</code>, <code>testimonials.tsx</code>, <code>src/app/testimoni/</code> |
| Kalkulator biaya | <code>cost-calculator.tsx</code>, <code>src/app/kalkulator/</code> |
| Kursus email | <code>email-course.tsx</code>, API subscribe |
| Hub wilayah | <code>src/app/wilayah/</code>, <code>src/lib/kabkota-data.ts</code>, generator katalog |
| Halaman legal dan profil | <code>tentang-kami</code>, <code>kontak</code>, <code>kebijakan-privasi</code>, <code>syarat-ketentuan</code> |

### 2.2 Katalog layanan dan pemesanan

Repository memiliki tiga kelompok data katalog, dengan kode dan generator di file masing-masing:

| Katalog | Sumber data | Kegunaan |
|---|---|---|
| Layanan dasar (v1) | <code>src/lib/layanan-500.ts</code> | Halaman layanan dengan slug dan kode katalog dasar |
| Premium (v2) | <code>src/lib/katalog-v2.ts</code> | Pilihan layanan premium dan detail terkait |
| Pro (v3) | <code>src/lib/katalog-v3.ts</code> | Katalog dengan kategori tambahan dan varian layanan |
| Paket dan harga | <code>src/lib/pricing.ts</code>, <code>src/lib/katalog-lengkap.ts</code> | Paket siap-pesan, kategori, harga, dan langkah berikutnya |
| Generator halaman | <code>src/lib/catalog/generators.ts</code> | Halaman detail, hub, dan halaman wilayah |
| Resolver order | <code>src/lib/service-order.ts</code> | Resolusi item layanan dan harga di sisi server |

Antarmuka katalog mendukung pencarian, filter, pengurutan, navigasi kategori, serta tautan menuju halaman detail. Untuk transaksi, API kembali memvalidasi kode layanan dan mengambil harga dari data server.

### 2.3 Fitur AI dan alat bantu

| Fitur | Halaman / endpoint | Catatan |
|---|---|---|
| Chatbot RIZKI | Komponen chat, <code>POST /api/chat</code> | Pemrosesan pesan melalui backend |
| Pemeriksaan izin AI | <code>/cek-izin</code>, <code>POST /api/license-checker</code> | Mengolah konteks usaha untuk membantu mengidentifikasi kebutuhan izin |
| Pemeriksaan dokumen | <code>/cek-dokumen</code>, <code>POST /api/document-checker</code> | Endpoint server untuk analisis dokumen/gambar |
| Roadmap usaha | <code>/roadmap</code>, <code>POST /api/roadmap</code> | Alur pengisian dan pembuatan roadmap |
| Kalkulator pajak | <code>/kalkulator-pajak</code> | Antarmuka kalkulator pajak |
| Kalkulator biaya | <code>/kalkulator</code> | Estimasi biaya layanan dan jalur konsultasi |

> Keluaran AI merupakan alat bantu informasi, bukan pengganti konfirmasi konsultan atau keputusan instansi berwenang. Kunci SDK AI harus berada di environment server dan tidak boleh dikirim ke browser.

### 2.4 CMS, konten, dan basis pengetahuan

- **Blog hybrid:** artikel statis dari <code>src/lib/blog-content.ts</code> dan konten database melalui <code>src/lib/blog-cms.ts</code>.
- **Editor konten admin:** pengelolaan artikel, metadata, status publikasi, dan pengaturan SEO.
- **FAQ:** data pertanyaan di <code>src/lib/faq-data.ts</code> dan antarmuka di <code>src/app/faq/</code>.
- **Glosarium:** istilah perizinan, badan usaha, perpajakan, perdagangan, proses, sektor, ketenagakerjaan, dan regulasi di <code>src/lib/glosarium/</code>.
- **KBLI:** katalog/kategori dan halaman detail yang sumbernya berada di <code>src/lib/kbli-catalog.ts</code> serta <code>src/lib/kbli-database.ts</code>.
- **Panduan:** daftar panduan dan konten SEO di <code>src/lib/seo-content.ts</code>.
- **Kalender kepatuhan:** <code>/kalender-kepatuhan</code>.
- **Testimoni dan lowongan:** halaman kategori dan detail masing-masing.

### 2.5 Panel admin — Mission Control

Area admin berada di <code>/admin</code>. Halaman admin dirancang tanpa indeks mesin pencari dan memeriksa token cookie sebelum menampilkan dashboard.

Modul yang tersedia di source meliputi:

- Ringkasan / Mission Control.
- Konten dan SEO (CMS).
- Pesanan dan status order.
- Leads dan pipeline.
- Konsultasi.
- Percakapan Chat RIZKI.
- Pemeriksaan AI.
- Database / collections.
- Editorial calendar.
- Follow-up lead.
- Pengaturan notifikasi.

Implementasi UI ada di <code>src/components/admin/</code>; endpoint-nya dikelompokkan di <code>src/app/api/admin/</code>.

### 2.6 Pembayaran, langganan, dan notifikasi

**Pembayaran**
- Midtrans Snap.
- Tripay dengan daftar metode yang dikonfigurasi.
- Mode demo atau manual sesuai konfigurasi.
- Halaman status transaksi di <code>/payment/[orderNo]</code>.
- Webhook untuk pembaruan status dari Midtrans dan Tripay.
- Nominal order dihitung di server, bukan dari input harga browser.

**KepatuhanPRO**
- Paket langganan bulanan dan tahunan didefinisikan di <code>src/lib/pricing.ts</code>.
- Tiga tingkat utama: Starter, Growth, dan Scale.
- Halaman produk: <code>/kepatuhan-pro</code>.

**Notifikasi dan follow-up**
- Integrasi Telegram dan gateway WhatsApp melalui konfigurasi.
- Log notifikasi dan status follow-up disimpan dalam model data.
- Scheduler follow-up tersedia di <code>src/lib/scheduler.ts</code> dan diaktifkan melalui instrumentation server sesuai environment.
- Pengaturan juga dapat disimpan melalui panel admin.

Kredensial gateway wajib disetel secara privat. Kehadiran kode integrasi tidak berarti akun gateway sudah terhubung atau pembayaran produksi sudah aktif.

---

## 03. Peta Halaman

Berikut rute utama yang terlihat pada App Router. Halaman dinamis menggunakan parameter yang ditunjukkan dalam tanda kurung siku.

### Halaman publik

| Rute | Tujuan |
|---|---|
| <code>/</code> | Beranda |
| <code>/layanan</code> dan <code>/layanan/[...slug]</code> | Hub, detail layanan, dan halaman layanan terprogram |
| <code>/&lt;slug&gt;</code> | Halaman layanan dari katalog dasar |
| <code>/katalog</code> dan <code>/katalog/[kategori]</code> | Penjelajahan katalog |
| <code>/wilayah</code> | Hub wilayah |
| <code>/kbli</code> dan <code>/kbli/[...slug]</code> | Pencarian dan detail KBLI |
| <code>/biaya</code> dan <code>/biaya/[slug]</code> | Halaman biaya |
| <code>/syarat</code> dan <code>/syarat/[slug]</code> | Halaman persyaratan |
| <code>/industri</code> dan <code>/industri/[slug]</code> | Halaman sektor industri |
| <code>/bandingkan</code> dan <code>/bandingkan/[slug]</code> | Perbandingan layanan |
| <code>/blog</code> dan <code>/blog/[slug]</code> | Artikel |
| <code>/faq</code> | Pusat FAQ |
| <code>/glosarium</code> dan <code>/glosarium/[slug]</code> | Glosarium |
| <code>/panduan</code> dan <code>/panduan/[id]</code> | Panduan perizinan |
| <code>/cek-izin</code> | Pemeriksaan izin berbantuan AI |
| <code>/cek-dokumen</code> | Pemeriksaan dokumen |
| <code>/roadmap</code> | Roadmap usaha |
| <code>/kalkulator</code> dan <code>/kalkulator-pajak</code> | Kalkulator biaya dan pajak |
| <code>/checkout</code> | Checkout |
| <code>/payment/[orderNo]</code> | Status order |
| <code>/kepatuhan-pro</code> | Langganan kepatuhan |
| <code>/paket</code> dan <code>/paket-usaha</code> | Paket layanan/paket usaha |
| <code>/kalender-kepatuhan</code> | Kalender kepatuhan |
| <code>/virtual-office</code> | Layanan virtual office |
| <code>/pma-company-registration</code> | Informasi layanan PMA berbahasa Inggris |
| <code>/mitra</code> | Program kemitraan |
| <code>/solusi-korporat</code> | Solusi korporat |
| <code>/bumdes</code> | Solusi BUMDes |
| <code>/lowongan-kerja</code> dan <code>/lowongan-kerja/[slug]</code> | Lowongan |
| <code>/testimoni</code> dan <code>/testimoni/[kategori]</code> | Testimoni |
| <code>/kanal-resmi</code> | Kanal institusi resmi |
| <code>/konsultasi</code>, <code>/kontak</code>, <code>/tentang-kami</code> | Konsultasi, kontak, dan profil |
| <code>/kebijakan-privasi</code>, <code>/syarat-ketentuan</code> | Dokumen legal |
| <code>/webmaster</code> | Halaman webmaster |

### File distribusi dan SEO

| URL / file | Fungsi |
|---|---|
| <code>/sitemap.xml</code> | Sitemap index melalui rewrite |
| <code>/sitemap/[id].xml</code> | Sitemap per bagian |
| <code>/feed.xml</code> | RSS feed |
| <code>/llms.txt</code> | Panduan ringkas untuk crawler AI |
| <code>/llms-full.txt</code> | Informasi konten lebih lengkap |
| <code>/robots.txt</code> | Aturan crawler |
| <code>/api/version</code> | Versi aplikasi |
| <code>/api/stats</code> | Statistik aplikasi yang diekspos API |
| <code>/api/vitals</code> | Endpoint terkait pelaporan metrik Web Vitals |

### Area privat

| Rute | Fungsi |
|---|---|
| <code>/admin</code> | Login dan dashboard admin |
| <code>/api/admin/*</code> | Endpoint operasional admin |
| <code>/api/cron/followup</code> | Pemicu sweep follow-up yang dilindungi secret |

---

## 04. Arsitektur Aplikasi

### Gambaran alur

<pre>
Pengunjung
   │
   ▼
Next.js App Router ───────► Metadata, JSON-LD, sitemap, feed
   │
   ├── Halaman & komponen UI
   │
   ▼
Route Handlers / API
   │
   ├── Validasi input dan aturan bisnis
   ├── AI server-side
   ├── Midtrans / Tripay
   ├── Telegram / WhatsApp
   │
   ▼
Facade database (src/lib/db.ts)
   │
   ▼
Runtime Prisma ORM ───────► PostgreSQL
   ▲
   │
Panel Admin ──────────────┘
</pre>

### Batas tanggung jawab

1. **Halaman dan UI** berada di <code>src/app/</code> dan <code>src/components/</code>.
2. **Aturan bisnis dan data katalog** berada di <code>src/lib/</code>.
3. **Route handler** memvalidasi request sebelum memanggil fungsi database atau integrasi eksternal.
4. **Facade database** berada di <code>src/lib/db.ts</code>, sedangkan runtime/kontrak Prisma berada di <code>src/prisma/</code>.
5. **Rahasia integrasi** hanya disimpan pada environment server; jangan pernah memasukkan API key ke konstanta client-side.
6. **Output standalone** dipaketkan bersama aset statis dan artefak runtime yang diperlukan oleh server.

---

## 05. Tumpukan Teknologi

| Lapisan | Teknologi | Penggunaan |
|---|---|---|
| Framework web | Next.js 16, App Router | Halaman, server rendering, route handlers, output standalone |
| Bahasa | TypeScript 5 | Tipe halaman, data, dan kontrak API |
| UI | React 19, Tailwind CSS 4, komponen UI lokal | Antarmuka responsif |
| Animasi | Framer Motion dan CSS | Transisi dan pengungkapan elemen |
| Database | PostgreSQL | Penyimpanan data aplikasi |
| ORM/runtime data | Prisma ORM 8 RC + <code>@prisma/orm-postgres</code> | Kontrak, query, serta validasi database |
| Formulir dan validasi | React Hook Form, Zod | Pengolahan input |
| AI | <code>z-ai-web-dev-sdk</code> | Endpoint AI di sisi server |
| Pembayaran | Midtrans Snap, Tripay | Checkout dan webhook |
| Analitik | Google Analytics 4, opsional Clarity | Pengukuran interaksi dan konversi |
| Monitoring | Sentry (opsional) | Pemantauan error |
| Pengujian skrip | <code>tsx</code>, skrip Node.js | Pemeriksaan kontrak dan smoke test |
| CI | GitHub Actions, PostgreSQL 16 | Validasi integrasi, build, dan smoke test |

> Versi dependensi yang benar selalu ditentukan oleh <code>package.json</code> dan lockfile yang digunakan proses build. Jika versi berubah, perbarui README melalui pemeriksaan ulang terhadap konfigurasi aktual.

---

## 06. Peta Struktur Repository

<pre>
pusatperizinan/
├── .github/
│   └── workflows/
│       └── prisma8-migration.yml    # Validasi Prisma/PostgreSQL dan production build
├── docs/
│   ├── HOSTINGER-NODEJS-DEPLOY.md   # Panduan deploy Node.js di Hostinger
│   ├── PRISMA8-MIGRATION-STATUS.md  # Status kontrak dan migrasi database
│   ├── CHECKLIST-KREDENSIAL-LANGKAH-1-2.md
│   ├── SEARCH-CONSOLE-ANALYTICS.md
│   └── SCRIPT-60-DETIK.md
├── public/                          # Logo, gambar, ikon, file publik, unduhan
├── scripts/                         # Build, backup/restore, migrasi, verifikasi
├── src/
│   ├── app/                         # Halaman App Router dan API
│   │   ├── api/                     # Endpoint publik, admin, pembayaran, AI
│   │   ├── admin/                   # Panel admin
│   │   ├── blog/                    # Blog dan detail artikel
│   │   ├── katalog/                 # Browser katalog
│   │   ├── layanan/                 # Hub dan detail layanan
│   │   └── ...                      # Halaman publik lainnya
│   ├── components/
│   │   ├── admin/                   # Modul UI Mission Control
│   │   ├── landing/                 # Komponen beranda dan konversi
│   │   ├── payment/                 # UI checkout/status pembayaran
│   │   ├── seo/                     # Renderer dan pelaporan SEO/Web Vitals
│   │   └── ui/                      # Komponen UI dasar
│   ├── lib/
│   │   ├── catalog/                 # Generator, mapping, detail, utilitas katalog
│   │   ├── glosarium/               # Data istilah
│   │   ├── i18n/                    # Registry 30 bahasa dan provider
│   │   ├── payment/                 # Konfigurasi, order, Midtrans, Tripay
│   │   ├── seo-pages/               # Generator halaman SEO sektoral
│   │   ├── db.ts                    # Facade database aplikasi
│   │   └── ...                      # Harga, konten, leads, follow-up, notifikasi
│   └── prisma/
│       ├── contract.prisma          # Kontrak model database
│       └── db.ts                    # Runtime Prisma ORM
├── prisma.config.ts                 # Konfigurasi Prisma dan koneksi PostgreSQL
├── next.config.ts                   # Konfigurasi Next.js, rewrite dan standalone
├── package.json                     # Dependensi serta perintah proyek
├── CHANGELOG.md                     # Riwayat rilis
├── WORKLOG.md                       # Penunjuk/rekam jejak pengembangan
├── ROADMAP-99.md                    # Roadmap pengembangan
├── README.md                        # Dokumentasi utama Bahasa Indonesia
└── DEPLOY-IDWEBHOST.md              # Panduan paket hosting statis
</pre>

### File yang sering disentuh

| File | Tanggung jawab |
|---|---|
| <code>src/app/page.tsx</code> | Susunan komponen beranda |
| <code>src/app/layout.tsx</code> | Layout global, metadata, provider bahasa, analitik |
| <code>src/lib/site.ts</code> | URL kanonis dan identitas situs |
| <code>src/lib/pricing.ts</code> | Paket siap-jual dan sumber nominal harga |
| <code>src/lib/service-order.ts</code> | Resolusi item katalog untuk alur order |
| <code>src/lib/sitemap-sections.ts</code> | Daftar bagian dan pembentukan sitemap |
| <code>src/lib/db.ts</code> | Akses database melalui facade |
| <code>src/prisma/contract.prisma</code> | Definisi model kontrak |
| <code>prisma.config.ts</code> | Koneksi PostgreSQL dan output artefak kontrak |
| <code>next.config.ts</code> | Konfigurasi Next.js |
| <code>scripts/verify-prisma-contract.mjs</code> | Validasi versi dan artefak kontrak |
| <code>scripts/postbuild.mjs</code> | Validasi dan pengemasan output standalone |
| <code>scripts/build-static.mjs</code> | Build ekspor statis khusus |
| <code>scripts/deploy-pack.mjs</code> | Membuat paket tar.gz untuk hosting statis |

---

## 07. Menjalankan Proyek Secara Lokal

### Prasyarat

- Git.
- Node.js 24 direkomendasikan agar sesuai dengan validasi CI.
- npm yang disertakan dengan instalasi Node.js.
- PostgreSQL yang dapat diakses oleh proses build dan runtime.
- Kredensial admin dan integrasi sesuai mode yang akan diuji.

### Langkah 1 — Ambil kode dan siapkan environment

<pre><code>git clone https://github.com/gunaracorp/pusatperizinan.git
cd pusatperizinan</code></pre>

Buat file <code>.env</code> secara lokal **sebelum** menjalankan instalasi karena konfigurasi Prisma membaca <code>DATABASE_URL</code> saat kontrak di-emisi oleh postinstall. Contoh berikut hanya template:

<pre><code>DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
ADMIN_PASSWORD=ganti-dengan-password-lokal
ADMIN_SECRET=ganti-dengan-random-secret-minimal-32-karakter
PAYMENT_DEMO_MODE=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
FOLLOWUP_SWEEP_MINUTES=0</code></pre>

Jangan menggunakan database produksi untuk pengujian sembarangan dan jangan commit file <code>.env</code>.

### Langkah 2 — Instal dependensi

<pre><code>npm install --no-audit --no-fund</code></pre>

Perintah <code>postinstall</code> akan menjalankan emisi kontrak Prisma. Jika gagal, periksa nilai <code>DATABASE_URL</code>, konektivitas database/config, dan versi dependensi sebelum lanjut.

### Langkah 3 — Siapkan atau verifikasi database

Untuk **database PostgreSQL baru yang masih kosong**:

<pre><code>npm run prisma8:emit
npm run db:init
npm run db:verify</code></pre>

<code>db:init</code> adalah inisialisasi, bukan perintah rutin setiap deployment. Untuk database yang sudah ada, pahami alur sign/verify dan migration plan di [panduan Prisma](./docs/PRISMA8-MIGRATION-STATUS.md) terlebih dahulu.

### Langkah 4 — Build dan jalankan

<pre><code>npm run build
npm run start</code></pre>

Server standalone memakai <code>node .next/standalone/server.js</code>. Secara default, situs tersedia di <code>http://localhost:3000</code> bila port tidak diubah oleh environment.

Untuk pengembangan dengan hot reload:

<pre><code>npm run dev</code></pre>

### Langkah 5 — Pemeriksaan dasar

<pre><code># Versi aplikasi
curl -i http://localhost:3000/api/version

# Statistik aplikasi
curl -i http://localhost:3000/api/stats

# Homepage
curl -I http://localhost:3000/

# Sitemap index
curl -i http://localhost:3000/sitemap.xml</code></pre>

Status HTTP yang sukses bukan pengganti pemeriksaan alur bisnis. Uji juga login admin, pembuatan lead, konsultasi, order, callback pembayaran pada sandbox, serta notifikasi sesuai integrasi yang diaktifkan.

---

## 08. Konfigurasi Environment

Nama variabel berikut ditemukan pada konfigurasi dan source aplikasi. Isi hanya yang diperlukan oleh lingkungan yang dipakai. **Jangan pernah menaruh nilai rahasia yang sebenarnya di README atau commit.**

| Variabel | Kegunaan | Wajib? |
|---|---|---|
| <code>DATABASE_URL</code> | String koneksi PostgreSQL yang dipakai Prisma | **Ya** untuk build/data |
| <code>ADMIN_PASSWORD</code> | Password login admin pada produksi | **Ya** pada produksi |
| <code>ADMIN_SECRET</code> | Kunci penandatangan token admin; panjang minimal 32 karakter pada produksi | **Ya** pada produksi |
| <code>PAYMENT_DEMO_MODE</code> | <code>true</code> untuk mode uji; nonaktifkan hanya setelah gateway dipersiapkan | Sesuai mode pembayaran |
| <code>MIDTRANS_SERVER_KEY</code> | Kredensial server Midtrans | Bila memakai Midtrans |
| <code>MIDTRANS_CLIENT_KEY</code> | Kredensial klien Midtrans | Bila memakai Midtrans |
| <code>MIDTRANS_IS_PRODUCTION</code> | Memilih endpoint produksi Midtrans | Sesuai lingkungan |
| <code>TRIPAY_API_KEY</code> | API key Tripay | Bila memakai Tripay |
| <code>TRIPAY_PRIVATE_KEY</code> | Kunci privat Tripay | Bila memakai Tripay |
| <code>TRIPAY_MERCHANT_CODE</code> | Kode merchant Tripay | Bila memakai Tripay |
| <code>TRIPAY_IS_PRODUCTION</code> | Memilih endpoint produksi Tripay | Sesuai lingkungan |
| <code>TRIPAY_METHODS</code> | Daftar metode Tripay yang diizinkan | Opsional |
| <code>BANK_TRANSFER_INFO</code> | Informasi pembayaran manual melalui konfigurasi | Bila memakai manual |
| <code>TELEGRAM_BOT_TOKEN</code> | Token bot notifikasi | Opsional |
| <code>TELEGRAM_CHAT_ID</code> | Target chat Telegram | Opsional |
| <code>FONNTE_TOKEN</code> | Token gateway WhatsApp Fonnte | Opsional |
| <code>WHATSAPP_TARGET</code> | Tujuan WhatsApp untuk notifikasi | Opsional |
| <code>CRON_SECRET</code> | Otorisasi endpoint cron follow-up | Bila memakai pemicu cron |
| <code>FOLLOWUP_SWEEP_MINUTES</code> | Interval sweep follow-up; nilai <code>0</code> menonaktifkan scheduler otomatis | Opsional |
| <code>NEXT_PUBLIC_GA_ID</code> | Measurement ID GA4 yang menimpa fallback dalam layout | Opsional |
| <code>NEXT_PUBLIC_CLARITY_ID</code> | ID Microsoft Clarity | Opsional |
| <code>SENTRY_DSN</code> | DSN Sentry untuk server | Opsional |
| <code>NEXT_PUBLIC_SENTRY_DSN</code> | DSN Sentry untuk browser | Opsional |
| <code>NEXT_PUBLIC_GSC_VERIFICATION</code> | Token verifikasi Google Search Console | Opsional |
| <code>NEXT_PUBLIC_BING_VERIFICATION</code> | Token verifikasi Bing Webmaster | Opsional |
| <code>NEXT_PUBLIC_YANDEX_VERIFICATION</code> | Token verifikasi Yandex | Opsional |
| <code>NEXT_PUBLIC_BAIDU_VERIFICATION</code> | Token verifikasi Baidu | Opsional |
| <code>NEXT_PUBLIC_NAVER_VERIFICATION</code> | Token verifikasi Naver | Opsional |
| <code>NEXT_PUBLIC_SEZNAM_VERIFICATION</code> | Token verifikasi Seznam | Opsional |
| <code>INDEXNOW_KEY</code> | Kunci endpoint IndexNow | Opsional |

### Aturan environment produksi

1. Simpan secret di pengelola environment hosting, bukan di repository.
2. Gunakan kredensial terpisah untuk lokal, staging, CI, dan produksi.
3. Pastikan <code>DATABASE_URL</code> menunjuk ke database yang benar sebelum menjalankan perintah Prisma.
4. Gunakan gateway pembayaran sandbox ketika melakukan uji integrasi.
5. Jangan aktifkan pembayaran produksi sampai callback/webhook dan alur rekonsiliasi sudah diuji.

---

## 09. Database Prisma dan PostgreSQL

### Kontrak dan runtime

| Bagian | Lokasi |
|---|---|
| Kontrak model | <code>src/prisma/contract.prisma</code> |
| Konfigurasi CLI | <code>prisma.config.ts</code> |
| Runtime Prisma | <code>src/prisma/db.ts</code> |
| Facade query aplikasi | <code>src/lib/db.ts</code> |
| Emisi kontrak | <code>generated/prisma8/contract.json</code> dan <code>contract.d.ts</code> |
| Verifikasi artefak build | <code>scripts/verify-prisma-contract.mjs</code> |

Empat belas model data yang didefinisikan pada kontrak saat ini:

<code>Lead</code>, <code>Consultation</code>, <code>ChatMessage</code>, <code>LicenseCheck</code>, <code>Subscriber</code>, <code>Testimonial</code>, <code>DocumentCheck</code>, <code>RoadmapRequest</code>, <code>NotificationSetting</code>, <code>Order</code>, <code>Post</code>, <code>FollowUpLog</code>, <code>NotificationLog</code>, dan <code>EditorialSlot</code>.

### Perintah yang tersedia

| Perintah | Tujuan |
|---|---|
| <code>npm run prisma8:emit</code> | Menghasilkan artefak kontrak |
| <code>npm run db:init</code> | Menginisialisasi database baru yang masih kosong |
| <code>npm run db:sign</code> | Menandatangani database setelah skema cocok |
| <code>npm run db:verify</code> | Memverifikasi database terhadap kontrak |
| <code>npm run db:plan</code> | Menyusun rencana perubahan skema |
| <code>npm run db:migrate:preview</code> | Meninjau operasi migrasi |
| <code>npm run db:migrate</code> | Perintah pengembangan untuk menerapkan rencana migrasi dan memajukan ref lokal |
| <code>npm run db:backup</code> | Backup tabel dalam bentuk NDJSON terkompresi |
| <code>npm run db:restore -- /jalur/backup.ndjson.gz</code> | Restore ke target PostgreSQL yang telah diinisialisasi dan kosong |
| <code>npm run db:import-sqlite -- /jalur/privat/custom.db</code> | Impor satu kali dari sumber database SQLite lama |

### Peringatan migrasi data

- Jangan menjalankan <code>db:init</code> terhadap database yang sudah berisi data tanpa memahami konsekuensinya.
- Jangan menganggap <code>DATABASE_URL</code> PostgreSQL sudah berisi seluruh data pelanggan hanya karena build berhasil.
- Untuk perpindahan dari SQLite lama, buat backup privat, gunakan database staging kosong, jalankan import, verifikasi jumlah dan sampel data, lalu uji alur lead, admin, CMS, follow-up, order dan webhook sebelum cutover.
- File backup mengandung data bisnis/klien dan harus diperlakukan sebagai data rahasia.
- Lihat [status migrasi Prisma](./docs/PRISMA8-MIGRATION-STATUS.md) untuk batasan dan checklist yang lebih lengkap.

---

## 10. Ringkasan API

Endpoint API berada di <code>src/app/api/</code>. Daftar di bawah adalah indeks endpoint yang tersedia pada source, bukan jaminan bahwa integrasi eksternal telah dikonfigurasi.

### Publik, lead, dan AI

| Method | Endpoint | Fungsi |
|---|---|---|
| <code>POST</code> | <code>/api/leads</code> | Pembuatan lead |
| <code>POST</code> | <code>/api/chat</code> | Chat RIZKI |
| <code>POST</code> | <code>/api/license-checker</code> | Pemeriksaan izin |
| <code>POST</code> | <code>/api/document-checker</code> | Pemeriksaan dokumen |
| <code>POST</code> | <code>/api/roadmap</code> | Permintaan roadmap |
| <code>POST</code> | <code>/api/subscribe</code> | Pendaftaran subscriber/kursus email |

### Pembayaran

| Method | Endpoint | Fungsi |
|---|---|---|
| <code>GET</code> | <code>/api/payment/config</code> | Informasi metode/config pembayaran yang boleh ditampilkan |
| <code>GET</code> | <code>/api/payment/service-resolve</code> | Resolve kode layanan katalog |
| <code>POST</code> | <code>/api/payment/create</code> | Membuat order dan transaksi/sesi pembayaran |
| <code>GET</code> | <code>/api/payment/status/[orderNo]</code> | Status order |
| <code>POST</code> | <code>/api/payment/webhook/midtrans</code> | Callback status Midtrans |
| <code>POST</code> | <code>/api/payment/webhook/tripay</code> | Callback status Tripay |
| <code>POST</code> | <code>/api/payment/demo-pay</code> | Alur pembayaran mode demo |

### Admin dan operasional

| Endpoint | Fungsi |
|---|---|
| <code>/api/admin/auth</code> | Autentikasi admin |
| <code>/api/admin/overview</code> | Ringkasan panel |
| <code>/api/admin/leads</code> | Pengelolaan leads |
| <code>/api/admin/orders</code> | Pengelolaan pesanan |
| <code>/api/admin/consultations</code> | Pengelolaan konsultasi |
| <code>/api/admin/chats</code> | Percakapan |
| <code>/api/admin/checks</code> | Pemeriksaan |
| <code>/api/admin/collections</code> | Data/collections |
| <code>/api/admin/posts</code> dan <code>/api/admin/posts/[id]</code> | CMS blog |
| <code>/api/admin/editorial</code> | Kalender editorial |
| <code>/api/admin/followup</code> | Follow-up lead |
| <code>/api/admin/notifications</code> | Pengaturan dan log notifikasi |
| <code>/api/admin/seed</code> | Seed data demo |

### Utilitas

| Endpoint | Fungsi |
|---|---|
| <code>/api/version</code> | Metadata versi aplikasi |
| <code>/api/stats</code> | Statistik aplikasi |
| <code>/api/vitals</code> | Penerimaan metrik Web Vitals |
| <code>/api/sitemap-index</code> | Sitemap index sumber |
| <code>/api/indexnow</code> | Integrasi IndexNow |
| <code>/api/cron/followup</code> | Trigger follow-up yang dilindungi secret |

Untuk mengubah kontrak request/response, periksa route handler terkait sebelum memperbarui dokumentasi atau client. Jangan menyimpulkan metode HTTP atau bentuk payload hanya dari nama endpoint.

---

## 11. SEO, Analitik, dan Distribusi Konten

### Mesin SEO

- Metadata tiap halaman melalui metadata Next.js.
- URL kanonis bersumber dari <code>src/lib/site.ts</code>.
- Sitemap index dan 15 bagian yang didefinisikan di <code>src/lib/sitemap-sections.ts</code>.
- Sitemap detail melalui <code>src/app/sitemap/[id]/route.ts</code>.
- JSON-LD dan structured data sesuai jenis halaman.
- Halaman SEO programatik untuk layanan, biaya, syarat, industri, perbandingan, KBLI, glosarium, dan wilayah.
- <code>robots.txt</code>, <code>llms.txt</code>, dan <code>llms-full.txt</code>.
- RSS feed melalui <code>/feed.xml</code>.
- IndexNow melalui API dan kunci environment.
- Token verifikasi webmaster dikonfigurasi melalui environment bila diperlukan.

**Catatan:** jumlah URL sitemap dapat berubah mengikuti data, filter kualitas halaman, dan konten CMS. Jangan menyalin angka jumlah URL dari README lama sebagai angka indeks yang selalu benar; hitung dari hasil sitemap aktual sebelum membuat klaim jumlah.

### Analitik

- GA4 dirender dari root layout melalui <code>NEXT_PUBLIC_GA_ID</code> dengan fallback yang saat ini ada di kode.
- Helper event analitik ada di <code>src/components/landing/analytics.tsx</code>.
- Microsoft Clarity opsional melalui environment.
- Web Vitals dilaporkan melalui komponen reporter dan <code>/api/vitals</code>.
- Sentry dapat diaktifkan untuk server/browser melalui environment DSN.

Untuk penyiapan Search Console, baca [panduan Search Console dan Analitik](./docs/SEARCH-CONSOLE-ANALYTICS.md). Gunakan ID properti milik organisasi yang benar dan verifikasi di dashboard penyedia.

---

## 12. Build dan Deployment

### Mode A — Node.js standalone

Mode utama untuk deployment yang menjalankan server Node.js.

Build dijalankan melalui <code>npm run build</code> dengan urutan:

1. <code>prisma contract emit</code>.
2. <code>scripts/verify-prisma-contract.mjs</code> memeriksa versi dan artefak hasil emisi.
3. <code>next build --webpack</code>.
4. <code>scripts/postbuild.mjs</code> memastikan output standalone tersedia, menyalin aset, dan memeriksa artefak akhir.

Perintah <code>npm run start</code> menjalankan <code>node .next/standalone/server.js</code>.

Prasyarat:
- <code>DATABASE_URL</code> yang benar tersedia saat instalasi/build.
- Koneksi dan kontrak PostgreSQL dapat diverifikasi.
- Environment runtime dan kredensial yang diperlukan telah dipasang pada hosting.
- Output build lengkap dan perintah start mengarah ke file yang benar.

Panduan khusus: [<code>docs/HOSTINGER-NODEJS-DEPLOY.md</code>](./docs/HOSTINGER-NODEJS-DEPLOY.md).

### Mode B — hosting statis / cPanel

Repository menyediakan alur ekspor statis terpisah. Mode ini tidak menjalankan route API, database, atau job server seperti mode Node.js.

<pre><code>PACK_LIGHT=1 node scripts/build-static.mjs
node scripts/deploy-pack.mjs</code></pre>

- Mode <code>PACK_LIGHT=1</code> menghasilkan paket lebih ringan dengan halaman inti.
- Tanpa <code>PACK_LIGHT=1</code>, skrip mencoba mengekspor halaman long-tail yang lebih luas dan dapat membutuhkan resource lebih besar.
- Paket statis siap diunggah ke document root hosting setelah hasil <code>out/</code> dibentuk.

Baca [<code>DEPLOY-IDWEBHOST.md</code>](./DEPLOY-IDWEBHOST.md) dan skrip build sebelum memilih mode. Pada mode statis, beberapa fitur backend memakai fallback atau tidak tersedia—jangan menyamakan kapabilitasnya dengan server Node.js penuh.

### Memilih mode

| Kebutuhan | Mode yang tepat |
|---|---|
| API AI, database, admin, pembayaran, webhook, follow-up | Node.js standalone |
| Hosting hanya menerima file statis | Ekspor statis, dengan fitur backend terbatas |
| Pengembangan lokal dengan hot reload | <code>npm run dev</code> |

### Batas worker build

Pada hosting dengan batas proses/thread ketat, <code>next build</code> dapat gagal saat pengumpulan data halaman meskipun TypeScript sudah berhasil. Jika log menunjukkan <code>OS can't spawn worker thread</code> atau <code>Resource temporarily unavailable</code>, catat log lengkap dan periksa konfigurasi worker serta kuota proses hosting. Jangan mengubah Node.js, entry file, atau output directory tanpa bukti bahwa salah satunya menjadi penyebab.

---

## 13. Pemeriksaan Kualitas dan Pengujian

### Pipeline CI

Workflow utama berada di <code>.github/workflows/prisma8-migration.yml</code>. Pemeriksaan yang dijalankan meliputi:

1. Menyiapkan Node.js 24 dan PostgreSQL 16 sementara.
2. Menginstal dependensi dan mengemisi kontrak Prisma.
3. Memastikan versi CLI Prisma.
4. Memverifikasi kontrak database.
5. Menjalankan production build.
6. Memulai server standalone.
7. Menjalankan smoke test follow-up.

Lihat hasil aktual di tab **Actions** repository. Status hijau pada sebuah commit tidak otomatis membuktikan environment produksi memiliki secrets, database, atau gateway yang benar.

### Skrip pemeriksaan tersedia

| Perintah | Tujuan |
|---|---|
| <code>npm run lint</code> | Menjalankan ESLint |
| <code>npm run prisma8:emit</code> | Emisi kontrak |
| <code>npm run db:verify</code> | Verifikasi kontrak database |
| <code>npm run db:smoke</code> | Smoke test akses Prisma |
| <code>npm run test:followup</code> | Verifikasi alur follow-up |
| <code>npx tsx scripts/verify-kabkota.ts</code> | Pemeriksaan data kabupaten/kota |
| <code>npx tsx scripts/smoke-city-hubs.ts</code> | Pemeriksaan hub kota |
| <code>npx tsx scripts/verify-editorial.ts</code> | Pemeriksaan editorial |
| <code>npx tsx scripts/verify-glossary.ts</code> | Pemeriksaan glosarium |
| <code>npx tsx scripts/verify-comparisons.ts</code> | Pemeriksaan halaman perbandingan |
| <code>npx tsx scripts/verify-order-cta.ts</code> | Pemeriksaan CTA pemesanan |
| <code>npx tsx scripts/verify-rich-content.ts</code> | Pemeriksaan konten terstruktur |

Jalankan skrip yang relevan terhadap perubahan yang dibuat dan pastikan variabel environment serta database menunjuk ke lingkungan pengujian yang benar.

---

## 14. Pemecahan Masalah

| Gejala | Yang perlu diperiksa |
|---|---|
| <code>DATABASE_URL harus diisi...</code> | <code>prisma.config.ts</code> memerlukan URL PostgreSQL sebelum emisi kontrak/build. Pastikan environment tersedia sebelum <code>npm install</code>. |
| <code>generated/prisma8/contract.json</code> tidak ada | Jalankan <code>npm run prisma8:emit</code> dan baca error lengkap dari <code>prisma contract emit</code>; jangan membuat file kontrak palsu secara manual. |
| <code>prisma</code> atau adapter berbeda versi | Bandingkan <code>package.json</code>, paket terpasang, dan log <code>npx prisma --version</code>. Sinkronkan versi sesuai kontrak yang dipakai proyek. |
| <code>.next/standalone/server.js</code> tidak ada | Periksa apakah <code>next build --webpack</code> selesai dan <code>output: "standalone"</code> tetap ada. <code>scripts/postbuild.mjs</code> memvalidasi artefak, bukan melewati bila folder hilang. |
| Build berhenti pada pengumpulan data halaman | Baca beberapa baris pertama error. <code>Resource temporarily unavailable</code> menunjukkan kemungkinan batas worker/thread pada host; error halaman tertentu memerlukan diagnosis rute dan data yang berbeda. |
| Server standalone tidak mau hidup | Periksa log start, <code>PORT</code>, <code>HOSTNAME</code>, environment server, artefak hasil build, dan koneksi database. |
| Admin menolak autentikasi | Pada produksi, pastikan <code>ADMIN_PASSWORD</code> dan <code>ADMIN_SECRET</code> tersedia; secret minimal 32 karakter. |
| Gateway pembayaran gagal | Pastikan kunci gateway, mode sandbox/produksi, metode pembayaran, dan URL webhook sesuai konfigurasi gateway. |
| Notifikasi tidak diterima | Periksa token Telegram/Fonnte, target chat/WhatsApp, konfigurasi notifikasi yang disimpan, dan log error server. |
| Konten lama masih tampil | Periksa sumber artikel statis vs CMS, status publikasi, cache, dan apakah build/deploy terbaru benar-benar digunakan. |

Saat melaporkan masalah, sertakan:
- commit SHA yang sedang dibangun,
- nama langkah yang gagal,
- pesan error lengkap sebelum dan sesudah error utama,
- versi Node.js/Next.js dari log,
- mode deployment (standalone atau statis),
- tanpa menyalin secret, token, atau data pelanggan.

---

## 15. Keamanan dan Data Produksi

- Jangan commit <code>.env</code>, kredensial database, API key, backup, token webhook, atau data pelanggan.
- Gunakan <code>ADMIN_SECRET</code> acak dengan panjang minimal 32 karakter pada produksi.
- Password dan secret admin produksi wajib diatur melalui environment.
- Gunakan validasi input server-side; jangan mempercayai harga dari browser.
- Webhook pembayaran harus memverifikasi signature provider sebelum mengubah status order.
- Lakukan impor database ke staging terlebih dahulu; bandingkan jumlah record dan sampel penting sebelum mengubah koneksi produksi.
- Backup/restore harus dicoba pada database staging yang kosong dan sesuai skema.
- Terapkan prinsip least privilege pada akun PostgreSQL dan kredensial integrasi.
- Jangan memasukkan contoh rahasia nyata ke issue, log publik, dokumentasi, atau pull request.
- Data backup yang memuat leads, orders, chat, dan kontak merupakan data sensitif dan harus disimpan secara privat.

---

## 16. Dokumen Pendukung

| Dokumen | Kapan dibaca |
|---|---|
| [Panduan Hostinger Node.js](./docs/HOSTINGER-NODEJS-DEPLOY.md) | Setup dan deployment Node.js di Hostinger |
| [Status migrasi Prisma](./docs/PRISMA8-MIGRATION-STATUS.md) | Kontrak database, impor data, backup dan restore |
| [Checklist kredensial](./docs/CHECKLIST-KREDENSIAL-LANGKAH-1-2.md) | Persiapan kredensial dan tugas operasional |
| [Search Console dan Analitik](./docs/SEARCH-CONSOLE-ANALYTICS.md) | Google Search Console dan pengukuran |
| [Script 60 detik](./docs/SCRIPT-60-DETIK.md) | Materi/script operasional |
| [CHANGELOG.md](./CHANGELOG.md) | Riwayat versi |
| [WORKLOG.md](./WORKLOG.md) | Penunjuk rekam jejak kerja |
| [ROADMAP-99.md](./ROADMAP-99.md) | Roadmap perbaikan dan pengembangan |
| [DEPLOY-IDWEBHOST.md](./DEPLOY-IDWEBHOST.md) | Ekspor statis dan paket hosting tanpa Node.js |

### Kontribusi dan alur perubahan

1. Buat branch dengan nama yang menjelaskan tujuan perubahan.
2. Pastikan perubahan sesuai pola kode yang sudah ada.
3. Jalankan pemeriksaan tipe/build atau skrip verifikasi yang relevan.
4. Sinkronkan dokumentasi bila route, environment, model, perintah, atau alur deployment berubah.
5. Ajukan pull request dengan ringkasan, alasan, cara uji, dan risiko.
6. Jangan menyatakan fitur siap produksi hanya berdasarkan keberadaan UI atau kode integrasi; sertakan hasil pengujian lingkungan yang relevan.

### Sinkronisasi README

Ketika menambah fitur, perbarui bagian yang berkaitan:
- Peta fitur dan peta halaman untuk rute/fitur pengguna.
- Peta API untuk endpoint baru atau perubahan kontrak.
- Struktur repository untuk folder/modul baru.
- Environment untuk variabel baru.
- Database untuk perubahan model, migrasi, backup, atau integritas data.
- Scripts/CI untuk perintah dan pemeriksaan baru.

README ini menggunakan Bahasa Indonesia sebagai bahasa utama agar onboarding dan panduan operasional konsisten.

---

<div align="center">

### Dibangun untuk membantu proses legalitas dan kepatuhan bisnis menjadi lebih terstruktur.

**PusatPerizinan.com** · [Situs](https://pusatperizinan.com) · [Repository](https://github.com/gunaracorp/pusatperizinan) · [Kembali ke atas ↑](#top)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:064e3b,45:059669,75:10b981,100:f59e0b&height=110&section=footer" width="100%" alt=""/>

</div>
