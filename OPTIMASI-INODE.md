# ♾️ OPTIMASI INODE — pusatperizinan.com (v1.25.1)

> Masalah: akun cPanel idwebhost memakai **566K dari 600K kuota inode**.
> Solusi di bawah mengurangi pemakaian **tanpa mengubah fitur, performa,
> atau SEO sedikit pun** — setiap klaim diverifikasi empiris, bukan asumsi.

---

## 1. Di mana inode sebenarnya terpakai?

Tiga lapis, dari kecil ke besar:

| Lapis | Isi | Inode | Catatan |
|---|---|---|---|
| Source repo | 590 file + 198 dir | ± 800 | Tidak masalah |
| **Paket deploy statis** (LIGHT, v1.25.0) | 2.433 file + 284 dir | **2.717** | 2.086 di antaranya = payload RSC `.txt` |
| **Sisa akun cPanel** (di luar `public_html`) | mail, `.trash`, `.cpanel`, backup, sisa deploy lama | **± 563K** | **Ini sumber utama** — wajib didiagnosis di akun Anda |

> Paket LIGHT hanya 2.717 inode. Angka 566K berarti ± 95% pemborosan ada
> **di luar** paket: email lama (1 email = 1+ inode), `.trash`, sisa
> extract bertumpuk, backup, atau aplikasi lain di akun yang sama.

---

## 2. Temuan forensik (paket deploy)

Paket memuat 2.086 file payload React Server Components (`.txt`) vs hanya
266 halaman HTML. Diverifikasi dengan **grep seluruh chunk runtime JS**
dan **browsing nyata dengan access-log** (headless browser + server logging):

| Payload | Jumlah | Ukuran | Status | Bukti |
|---|---|---|---|---|
| `__next._full.txt` | 265 | 22,3 MB | **MATI** | string `_full` tidak ada di satu pun chunk runtime → browser tak punya jalur memintanya; isinya duplikat payload rute |
| `__next._index.txt` per-dir | 264 (dari 265) | 14,5 MB | **DUPLIKAT** | md5 identik dengan salinan root (pengecualian satu-satunya: `_not-found`) |
| `_tree`, `_head`, `__PAGE__`, pattern, `<route>.txt` | ± 1.557 | ± 30 MB | **DIPAKAI** | ter-request nyata saat navigasi/prefetch → semua dipertahankan |

Temuan tambahan: URL tanpa ekstensi (`/katalog`, `/glosarium/ahu`) hanya
berfungsi jika MultiViews kebetulan aktif di hosting — `.htaccess` baru
menjadikannya deterministik via rewrite internal (tanpa redirect, aman SEO).

---

## 3. Perubahan yang diterapkan

| File | Perubahan |
|---|---|
| `scripts/build-static.mjs` | Prune payload mati setelah export (`PRUNE_RSC=0` untuk menonaktifkan) |
| `.htaccess` | Rewrite: dedup `_index` ke salinan root + routing extensionless deterministik |
| `scripts/deploy-pack.mjs` | Menulis `.inode-manifest.txt` + meng-include `prune-inode-hosting.sh` ke setiap paket; `pack-info.json` + field `inodeCount` |
| `scripts/prune-inode-hosting.sh` | **BARU** — jalankan di `public_html` setelah extract; hapus aset teknis sisa deploy lama berdasar manifest (dry-run default) |
| `scripts/cek-inode.sh` | **BARU** — diagnostik read-only seluruh akun cPanel |
| `scripts/bersihkan-inode.sh` | **BARU** — cleanup aman kategori terbukti (dry-run default) |
| `DEPLOY-IDWEBHOST.md` | Seksi baru "♾️ Hemat Inode" |

---

## 4. Hasil terukur

### Paket deploy (per deployment)

| Metrik | Sebelum | Sesudah | Δ |
|---|---|---|---|
| Inode paket | 2.717 | 2.191 | **−526 (−19,4%)** |
| File | 2.433 | 1.918 | −515 |
| Ukuran tar.gz | 28,67 MB | 20,11 MB | **−8,56 MB (−29,9%)** |
| Halaman HTML | 266 | 266 | 0 (SEO utuh) |
| Request payload saat browsing | 200 OK | 200 OK | 0 gagal fetch |

### Akun simulasi (siklus penuh: bersihkan → deploy → prune)

```
2.883 → 2.616 inode (bersihkan-inode.sh: 265 _full + sisa arsip + log)
2.616 → 2.292 inode (deploy v1.25.1 + duplikat _index + 60 chunk sisa + dir kosong)
Total −591 inode, integritas: index/404/htaccess/robots/sitemap/glosarium ✓
```

### Verifikasi fungsi (setelah prune)

- Homepage, `/layanan/nib` (soft-nav), `/glosarium/ahu`, `/katalog`: semua render ✓
- Log server: **nol 404** pada semua payload `.txt`; `_index` per-dir tersaji
  dari salinan root via rewrite (byte-identik)
- `_not-found/__next._index.txt` tetap dilayani dari file uniknya sendiri ✓

---

## 5. Langkah di akun Anda (idwebhost cPanel)

1. **Diagnosis** — cPanel → Terminal (atau SSH):
   ```bash
   bash cek-inode.sh
   ```
   Lihat pema-pemakaian per folder. Yang biasanya ratusan ribu: `mail`
   (email lama/spam), `.trash`, backup lama.
2. **Bersihkan aman** di `public_html`:
   ```bash
   bash bersihkan-inode.sh           # dry-run dulu
   bash bersihkan-inode.sh --apply   # eksekusi
   ```
3. **Email/trash** — lewat UI cPanel (File Manager → Empty Trash; Email →
   hapus mailbox tak terpakai). Angka ratusan ribu hampir selalu di sini.
4. **Update berikutnya** — paket v1.25.1 membawa `prune-inode-hosting.sh`;
   setelah extract:
   ```bash
   bash prune-inode-hosting.sh && bash prune-inode-hosting.sh --apply
   ```

Estimasi pemulihan: paket −526 inode/deploy; sisa `_next` lama (ratusan–
ribuan tergantung jumlah redeploy); sisanya tergantung isi `mail`/`.trash`
yang terlihat di laporan `cek-inode.sh`.

---

## 6. Jaminan "tidak menurunkan apa pun"

- **SEO**: sitemap/robots/HTML tidak disentuh; payload `.txt` tidak ikut
  indeks (Google membaca HTML); URL publik tidak berubah (rewrite internal,
  tanpa redirect).
- **Fitur**: semua payload yang benar-benar diminta browser tetap ada
  (diverifikasi via access-log). Fallback WhatsApp & 404 branded utuh.
- **Performa**: jumlah request tidak berubah; konten yang diterima browser
  byte-identik; paket 30% lebih kecil → upload/update lebih cepat.
- **Rollback**: `PRUNE_RSC=0 node scripts/build-static.mjs` mengembalikan
  perilaku lama; file yang dihapus script regenerasi penuh via rebuild.
