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

Stage Summary (FINAL — Task 39):
- QA lulus semua: lint 0/0 · verify-recovery.ts 6/6 PASS · verify-order-cta PASS · verify-followup PASS · browser E2E (checkout→order INV tercatat→panel admin Pemulihan Checkout menampilkan order + tombol Bayar/Chat step 1 + Jalankan Sweep OK)
- Verifikasi privasi: /api/activity respons tanpa PII (grep telepon/nama = 0), anonimisasi "B***" bekerja
- Bukti visual: download/v115-checkout-social-proof-garansi.png, v115-checkout-badge-area.png, v115-halaman-garansi.png
- Commit lokal 0fb180e (32 file, +1.459/-71) — push GitHub menunggu kredensial (token tidak tersedia di sandbox sesi ini)
- SEO kajian: robots 200 · sitemap 15 seksi · JSON-LD Service/Offer/FAQPage/HowTo/BreadcrumbList terverifikasi · verify scripts PASS · /garansi masuk sitemap static → indeks 11.877

---
Task ID: 40
Agent: main
Task: Revisi seluruh halaman lowongan kerja menjadi KHUSUS WANITA (perintah owner): tim perempuan unggul yang menguasai IT & perizinan dari hulu ke hilir — konsultan pajak wanita, programmer full-stack, SEO specialist, konsultan perizinan senior.

Work Log:
- jobs-data.ts: field baru `femaleOnly` (interface + 16/16 lowongan), kategori baru "IT & Teknologi" & "Pajak & Keuangan", konstanta FEMALE_ONLY_LABEL; semua judul diberi akhiran "— Khusus Wanita"; kualifikasi tiap lowongan dibuka baris "Wanita — posisi ini diperuntukkan khusus bagi perempuan"; deskripsi 4 posisi kunci diperkuat pesan hulu-hilir
- 4 POSISI BARU (semua featured, khusus wanita): Konsultan Pajak (Coretax & Kepatuhan) Rp9-15jt · Programmer Full-Stack Next.js Rp9-16jt · SEO Specialist (Technical & Content) Rp7-12jt remote · Konsultan Senior Perizinan Hulu ke Hilir Rp10-15jt — total 12 → 16 lowongan
- /lowongan-kerja: metadata+keywords SEO wanita (lowongan kerja khusus wanita, konsultan pajak wanita, programmer wanita, seo specialist wanita, dst), badge rose "Khusus Wanita — Seluruh Rekrutmen", H1 baru, kotak info "Seluruh Lowongan Khusus untuk Perempuan (lamaran laki-laki tidak diproses)", badge Khusus Wanita di 16 kartu, teks WA khusus wanita
- /lowongan-kerja/[slug]: badge + kotak "Posisi Khusus Wanita", JSON-LD JobPosting diberi paragraf "Khusus Wanita", FAQ baru "Apakah posisi ini hanya untuk wanita?", template lamaran WA "saya perempuan...", metadata "Lowongan khusus wanita:", hapus import ShieldCheck tak terpakai
- header.tsx (Karier → "Lowongan khusus wanita — IT & perizinan") + footer.tsx ("Lowongan Kerja Khusus Wanita")
- QA: tsc 0 error pada file lowongan (4 error lama file lain, pre-existing); semua 16 slug render 200; badge terhitung 16/16; JSON-LD JobPosting terverifikasi; screenshot download/verifikasi-lowongan-khusus-wanita-list.png & verifikasi-lowongan-konsultan-pajak-wanita.png

Stage Summary:
- Seluruh mesin lowongan kini eksklusif wanita sesuai perintah owner: 16 posisi (4 prioritas rekrutmen baru), halaman daftar + 16 halaman detail + JSON-LD siap Google Jobs dengan pesan khusus wanita konsisten dari metadata sampai template lamaran

---
Task ID: 41
Agent: main
Task: Revisi penuh daftar lowongan sesuai perintah owner: hapus semua 16 lowongan lama, ganti 7 posisi baru (semua remote, gaji awal UMR + bonus target perusahaan, jenjang karier jelas, tetap khusus wanita).

Work Log:
- Riset & verifikasi angka UMR 2026 via web: UMP DKI Jakarta 2026 Rp5.729.876 (Kegub 33/2026), UMK Kota Bekasi 2026 Rp5.999.422, UMK Kab. Bekasi Rp5.938.885
- jobs-data.ts REWRITE TOTAL: interface + field baru `salaryDisplay` & helper `salaryText()`, konstanta UMR_NOTE, kategori baru (IT & Teknologi, Pajak & Keuangan, Perizinan & Legal, Administrasi & Layanan, Marketing & Media Sosial); 16 lowongan lama DIHAPUS (marketing consultant, staf admin legalitas, konsultan junior, content writer SEO, telemarketing, legal officer, trainer Jepang LPK, coordinator PMI LPK, digital marketing, data entry OSS, graphic designer, AE pajak, konsultan pajak, SEO specialist, konsultan senior perizinan)
- 7 POSISI BARU (semua femaleOnly + remote + UMR + bonus): 1) Programmer Full-Stack (featured) 2) Admin Marketing (featured) 3) Admin Melayani Pelanggan 4) Staf Perpajakan PPh/PPN/Coretax (featured) 5) Staf Perizinan NIB & OSS-RBA (featured) 6) Admin Customer Service WA & Chat 7) Admin Media Sosial semua platform — tiap posisi ada jenjang karier eksplisit (Staff→Senior→Lead→Manager)
- /lowongan-kerja: metadata & keywords baru (loker umr plus bonus, lowongan wanita remote, dst), H1 baru "Remote, Gaji UMR + Bonus Target", seksi 4 kartu "Gaji, Bonus & Jenjang Karier" (UMR / Bonus Target / Jenjang / Remote Penuh), kartu gaji pakai salaryText
- /lowongan-kerja/[slug]: metadata+JSON-LD pakai salaryText (baseSalary tetap numerik UMR utk Google Jobs), FAQ baru: "Berapa gaji awalnya?" (UMR + bonus target), "Apakah bisa dikerjakan remote?", "Bagaimana jenjang kariernya?"
- QA: tsc 0 error di file lowongan; list + 7 slug render 200; slug lama 404 benar; 7/7 kartu berbadge Khusus Wanita & "UMR + Bonus Target/bln"; screenshot download/verifikasi-lowongan-umr-remote-list.png & -skema.png

Stage Summary:
- Halaman lowongan kini presisi sesuai brief owner: 7 posisi khusus wanita, remote penuh, gaji awal UMR + bonus target perusahaan, jenjang karier jelas — semua lowongan lama yang tidak relevan sudah dihapus dari data, sitemap, dan Google Jobs schema

---
Task ID: 42
Agent: main
Task: Update README & worklog terbaru (perintah owner): sinkronisasi dokumentasi penuh untuk dua rilis rekrutmen (Task 40–41) yang belum tercatat di CHANGELOG/README/versi — merilis v1.16.0 "Rekrutmen Khusus Wanita", v1.17.0 "Loker UMR Remote", dan v1.17.1 "Dokumen Terkini".

Work Log:
- Riset & verifikasi ulang angka UMR 2026 via web (beritajakarta.id, idnfinancials, Kompas): UMP DKI Jakarta 2026 Rp5.729.876 (+6,17%, Kegub 33/2026, berlaku 1 Jan 2026) & UMK Kota Bekasi 2026 Rp5.999.422 (+Rp308.670) — konsisten dengan data yang sudah dipakai jobs-data.ts
- version.ts: APP_VERSION 1.15.0 → 1.17.1 ("Dokumen Terkini"), RELEASES +3 entri (38 → 41 rilis, comment diperbarui), PLATFORM_STATS.indexedUrls 11.877 → 11.872 (lowongan aktif 12 → 7 = −5 URL, dengan komentar sinkron)
- package.json → 1.17.1; scripts/ver.json → current 1.17.1, label "v1.17.1 — Dokumen Terkini", nextRelease v1.18.0, stats.indexedUrls 11872, releases.total 41, history +3 entri, duplikat entri 1.13.5 di history dihapus (JSON tervalidasi python json.load)
- CHANGELOG.md: badge header 4 titik (Versi Saat Ini v1.17.1, Total Rilis 41, Entri Worklog 49, Rilis Berikutnya v1.18.0), teks berjalan + footer subline 11.872 URL, konvensi rilis-berikutnya v1.18.0, nav ladder 41 Rilis, 3 seksi rilis baru lengkap (1.17.1 Docs+QA / 1.17.0 Added+Removed+QA / 1.16.0 Added+Changed+QA) dengan anchor v1-17-1, v1-17-0, v1-16-0, ladder +3 baris (#39–41) dan v1.15.0 tidak lagi ⭐ AKTIF
- README.md: 3 identitas versi → 1.17.1 (badge atas, "Versi aplikasi" + link CHANGELOG, badge footer); tabel "Gambaran kemampuan" + baris "Karier & rekrutmen" (7 posisi khusus wanita, remote, UMR + bonus, jenjang karier); §2.4 bullet "Testimoni dan lowongan" dipecah — Testimoni terpisah + "Karier & rekrutmen (khusus wanita)" lengkap (7 posisi: programmer full-stack, admin marketing, admin melayani pelanggan, staf perpajakan PPh/PPN/Coretax, staf perizinan NIB & OSS-RBA, admin customer service WA & chat, admin media sosial; UMP DKI Jakarta Rp5.729.876 / UMK Kota Bekasi Rp5.999.422; jenjang Staff → Senior → Lead → Manager; JSON-LD JobPosting Google Jobs); tabel rute /lowongan-kerja diperbarui
- WORKLOG.md (kanonik) + worklog.md (lanjutan sesi): entri Task 42 ini ditulis di kedua berkas agar rantai 40 → 41 → 42 utuh di kedua lokasi
- QA: tsc --noEmit nol error pada file versi/lowongan (4 error lama file lain, pre-existing); GET /api/version 200 → 1.17.1; / 200; /lowongan-kerja 200; 7 slug detail 200; grep konsistensi versi lulus

Stage Summary:
- Seluruh sistem dokumentasi kini 1:1 dengan kode: tiga rilis tercatat resmi (v1.16.0 "Rekrutmen Khusus Wanita", v1.17.0 "Loker UMR Remote", v1.17.1 "Dokumen Terkini"), README menampilkan 7 posisi khusus wanita (UMR + bonus target, remote penuh, jenjang karier), angka indeks sitemap tersinkron 11.872 — repo github.com/gunaracorp/pusatperizinan siap push dengan dokumentasi terbaru

---
Task ID: 43
Agent: main
Task: Push ke GitHub (perintah owner + PAT disediakan): dorong seluruh backlog commit lokal (v1.15.0 + Task 40/41/42) ke origin/main github.com/gunaracorp/pusatperizinan.

Work Log:
- Token PAT owner diverifikasi via git ls-remote — remote main masih 1790870 (merge PR #14), lokal ahead 5 commit fast-forward bersih (0fb180e v1.15.0 + 4 checkpoint UUID berisi Task 40 rekrutmen khusus wanita, Task 41 loker UMR remote, Task 42 sinkron dokumen + bukti screenshot)
- Push 1: 1790870..92f6724 main → main — BERHASIL; origin/main = local main = 92f6724 (terverifikasi ls-remote)
- Catatan: Task 39 dulu mencatat "push menunggu kredensial" — kini tuntas; token TIDAK disimpan di .git/config (satu pakai, keamanan)

Stage Summary:
- github.com/gunaracorp/pusatperizinan kini mutakhir penuh: 41 rilis terdokumentasi, 7 lowongan khusus wanita (UMR + bonus, remote, jenjang karier) live di repo — sinkronisasi lokal ⇄ remote 100%
