# 🔑 CHECKLIST KREDENSIAL — Langkah 1–2 ROADMAP-99 (Plus Langkah 4)

> **Tujuan:** mempermudah owner menyediakan kredensial sehingga **langkah 1 (aktifkan pembayaran produksi)**, **langkah 2 (submit sitemap ke GSC + Bing)**, dan **langkah 4 (aktifkan GA4 + Clarity)** bisa dieksekusi tanpa campur tangan kode lagi.
> **Status kode:** semua kode **sudah siap sejak v1.11.0** — gateway Midtrans/Tripay, tag verifikasi 6 mesin pencari, GA4, dan Microsoft Clarity semuanya *env-gated*. Begitu nilai env diisi, fitur aktif otomatis (tanpa deploy ulang kode).
> Disusun: 2026-10-25 (WIB) · Task 27 · rilis v1.11.0 "Sapa Langsung"

---

## 1️⃣ Langkah 1 — Aktifkan Pembayaran Produksi (Midtrans / Tripay)

### Kondisi saat ini
- `.env` hanya berisi `DATABASE_URL` → resolver `src/lib/payment/config.ts` jatuh ke **provider "manual"** (transfer + konfirmasi WA). Checkout, order, dan webhook **sudah berfungsi** — hanya jalur uang yang belum otomatis.
- Flag `PAYMENT_DEMO_MODE` tidak ada di `.env` (aman: mode uji tidak akan menyala selama keys terpasang — resolver memprioritaskan gateway).

### Opsi A — Midtrans (rekomendasi: metode terlengkap)
| # | Aksi | Detail |
|---|---|---|
| A1 | Daftar & verifikasi akun produksi | [dashboard.midtrans.com](https://dashboard.midtrans.com) → naik ke **Production** (verifikasi KTP/NPWP badan usaha, ±1–2 hari kerja) |
| A2 | Ambil keys produksi | Dashboard **Settings → Access Keys**: `Server Key` (diawali `Prod-…`) + `Client Key` |
| A3 | Isi env (server) | `MIDTRANS_SERVER_KEY=Prod-xxxx` · `MIDTRANS_CLIENT_KEY=xxxx` · `MIDTRANS_IS_PRODUCTION=true` |
| A4 | Pasang webhook | Dashboard **Settings → Configuration → Payment Notification URL**: `https://pusatperizinan.com/api/payment/webhook/midtrans` (route sudah ada & teruji struktur datanya) |
| A5 | Uji end-to-end | Order 1 layanan termurah di produksi → bayar QRIS/VA sungguhan → halaman status berubah otomatis → order muncul di Admin Mission Control |

### Opsi B — Tripay (alternatif, lebih cepat aktivasi)
| # | Aksi | Detail |
|---|---|---|
| B1 | Daftar merchant | [tripay.co.id](https://tripay.co.id) → verifikasi merchant produksi |
| B2 | Ambil kredensial | `API Key` + `Private Key` + `Merchant Code` (menu Merchant → Pengaturan API) |
| B3 | Isi env (server) | `TRIPAY_API_KEY=…` · `TRIPAY_PRIVATE_KEY=…` · `TRIPAY_MERCHANT_CODE=…` · `TRIPAY_IS_PRODUCTION=true` |
| B4 | (Opsional) batasi metode | `TRIPAY_METHODS=QRIS,BRIVA,BCAVA,BNIVA,MANDIRIVA,SHOPEEPAY,ALFAMART,INDOMARET` (default sudah persis ini) |
| B5 | Pasang callback | Dashboard Tripay → **URL Callback**: `https://pusatperizinan.com/api/payment/webhook/tripay` |
| B6 | Uji end-to-end | Sama seperti A5 |

### Peringatan keamanan
- ⛔ **Jangan pernah** commit keys ke Git / taruh di kode — hanya di `.env` produksi atau environment variables hosting.
- ✅ Setelah keys aktif, `PAYMENT_DEMO_MODE` **harus tidak bernilai `true`** di produksi (hanya berguna di staging).
- ✅ Keys hanya dibaca di server (`/api/payment/*`) — tidak ada key yang dikirim ke browser klien.

---

## 2️⃣ Langkah 2 — Submit Sitemap ke Google Search Console + Bing

### Persiapan verifikasi (tag meta otomatis dari env — didukung sejak v1.3.0)
| Mesin | Env | Cara dapatkan |
|---|---|---|
| Google | `NEXT_PUBLIC_GSC_VERIFICATION` | [search.google.com/search-console](https://search.google.com/search-console) → buat properti → metode **HTML tag** → salin isi `content="…"` |
| Bing | `NEXT_PUBLIC_BING_VERIFICATION` | [bing.com/webmasters](https://www.bing.com/webmasters) → Sites → Meta tag → salin `content="…"` (atau impor langsung dari GSC — cara tercepat) |
| (Opsional) Yandex/Baidu/Naver/Seznam | `NEXT_PUBLIC_YANDEX/BADU/NAVER/SEZNAM_VERIFICATION` | Pola sama — panel `/webmaster` memantau 26 mesin |

> Alternatif Google: properti **Domain** dengan verifikasi **DNS TXT** — cakupan seluruh subdomain, disarankan bila akses DNS tersedia.

### Daftar submit (15 seksi + indeks)
Begitu properti terverifikasi, submit URL berikut di **GSC → Sitemaps** (dan Bing → Sitemaps):

```
https://pusatperizinan.com/sitemap.xml          ← indeks semua seksi (cukup 1 ini; anaknya ditemukan otomatis)

https://pusatperizinan.com/sitemap/static.xml
https://pusatperizinan.com/sitemap/blog.xml
https://pusatperizinan.com/sitemap/panduan.xml
https://pusatperizinan.com/sitemap/testimoni.xml
https://pusatperizinan.com/sitemap/layanan.xml
https://pusatperizinan.com/sitemap/kbli.xml
https://pusatperizinan.com/sitemap/hubs.xml
https://pusatperizinan.com/sitemap/jobs.xml
https://pusatperizinan.com/sitemap/bandingkan.xml
https://pusatperizinan.com/sitemap/glosarium.xml
https://pusatperizinan.com/sitemap/katalog.xml
https://pusatperizinan.com/sitemap/layanan500.xml
https://pusatperizinan.com/sitemap/layanan-pp.xml
https://pusatperizinan.com/sitemap/layanan-pp3.xml
https://pusatperizinan.com/sitemap/seo-expansion.xml
```

> Total ±**11.876 URL**. Submit eksplisit per seksi mempercepat laporan cakupan indeks per bagian katalog. `robots.txt` juga sudah memuat daftar sitemap.

---

## 3️⃣ Bonus — Langkah 4: Aktifkan GA4 + Microsoft Clarity (kode v1.11.0 siap)

| Layanan | Env | Format & cara dapatkan |
|---|---|---|
| Google Analytics 4 | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` — GA4 Admin → Data Streams → Web → Measurement ID |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | 10 karakter alfanumerik — [clarity.microsoft.com](https://clarity.microsoft.com) → New project → Settings → Project ID (heatmap + session recording **gratis**) |

> Event konversi `whatsapp_click` (termasuk klik Floating WhatsApp v1.11.0) otomatis terkirim begitu GA4 aktif. Panduan lengkap event: `docs/SEARCH-CONSOLE-ANALYTICS.md`.

---

## 4️⃣ Template `.env` Produksi (salin → isi → pasang)

```bash
# DATABASE (sudah ada)
DATABASE_URL="file:./dev.db"

# ── LANGKAH 1: PEMBAYARAN PRODUKSI (pilih salah satu gateway) ──
MIDTRANS_SERVER_KEY="Prod-xxxxxxxx"
MIDTRANS_CLIENT_KEY="xxxxxxxx"
MIDTRANS_IS_PRODUCTION="true"
# — atau —
# TRIPAY_API_KEY="xxxxx"
# TRIPAY_PRIVATE_KEY="xxxxx"
# TRIPAY_MERCHANT_CODE="Txxxxx"
# TRIPAY_IS_PRODUCTION="true"

# ── LANGKAH 2: VERIFIKASI MESIN PENCARI ──
NEXT_PUBLIC_GSC_VERIFICATION="kode-meta-tag-google"
NEXT_PUBLIC_BING_VERIFICATION="kode-meta-tag-bing"

# ── LANGKAH 4: ANALITIK ──
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_CLARITY_ID="abcdefghij"
```

> ⚠️ Env `NEXT_PUBLIC_*` dibundel saat build (perlu rebuild setelah diisi); key pembayaran dibaca runtime server (cukup restart). Setelah env terpasang: restart server produksi → uji 1 order end-to-end → baru umumkan jalur pembayaran baru.

---

## 5️⃣ Checklist Eksekusi Setelah Kredensial Diterima

- [ ] Owner memasang keys gateway (A3/B3) + webhook/callback URL (A4/B5) di dashboard gateway
- [ ] Owner memasang env verifikasi mesin pencari (§2) + ID analitik (§3)
- [ ] Agent: pasang env ke hosting → restart → `GET /api/payment/config` harus melaporkan `provider: midtrans|tripay, mode: production`
- [ ] Agent: curl halaman beranda → meta `google-site-verification` & `msvalidate.01` ter-render
- [ ] Agent: curl halaman mana pun → script `gtag` + `clarity.ms` ter-render di HTML
- [ ] Agent: order uji 1 layanan termurah → bayar QRIS nyata → status otomatis → order terlihat di Admin
- [ ] Agent: submit 16 URL sitemap (indeks + 15 seksi) di GSC & Bing → status "Success"
- [ ] Agent: centang langkah 1, 2, 4 di ROADMAP-99 → rilis versi baru + WORKLOG
