#!/bin/bash
# ============================================================
# PUSATPERIZINAN.COM — Generator Daftar URL Prioritas Ping
# Output: download/ping-priority-indexnow.txt
# Dipakai: paste isi file ke /webmaster (tab IndexNow), atau
# curl -X POST https://pusatperizinan.com/api/indexnow \
#        -H "Content-Type: application/json" \
#        -d "{\"urls\": [$(sed 's/^/"/;s/$/",/' file | tr -d '\n' | sed 's/,$//')]}"
# ============================================================
set -euo pipefail
BASE="https://pusatperizinan.com"
OUT="download/ping-priority-indexnow.txt"
TMP=".tmp-ping-urls.txt"
: > "$TMP"

add() { echo "$1" >> "$TMP"; }

# --- Tier 1: beranda & indeks utama ---
add "$BASE/"
add "$BASE/layanan"
add "$BASE/katalog"
add "$BASE/kbli"
add "$BASE/kalkulator-pajak"
add "$BASE/cek-izin"
add "$BASE/kalender-kepatuhan"
add "$BASE/glosarium"
add "$BASE/biaya"
add "$BASE/syarat"
add "$BASE/blog"

# --- Tier 2: 5 hub kategori layanan ---
for cat in perizinan pajak kerja-luar-negeri virtual-office sertifikasi; do
  add "$BASE/layanan/kategori/$cat"
done

# --- Tier 3: 38 hub wilayah provinsi (sumber: dev server lokal — <loc> sudah berisi domain produksi) ---
curl -s --max-time 30 "http://localhost:3000/sitemap/hubs.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | grep '/layanan/wilayah/[a-z-]*$' | while read -r u; do echo "$u" >> "$TMP"; done || true

# --- Tier 4: halaman induk layanan dasar populer (dari sitemap layanan, kedalaman 2, ~40 pertama sesuai prioritas manual) ---
for s in nib pt cv pt-perorangan halal bpom sni merek patent-hki iso-9001 pse-komdigi \
         tax-npwp-badan tax-pkp-badan tax-spt-tahunan-badan tax-planning tax-umkm \
         pptkis rptka-kitas dokumen-pmi keberangkatan-pmi \
         virtual-office virtual-office-plus-pajak api-impex hscoo logistik tambang; do
  add "$BASE/layanan/$s"
done

# --- Tier 5: glosarium unggulan & seo-expansion utama ---
for g in nib oss-rba kbli lkpm pt cv pma npwp coretax ppn pph-badan faktur-pajak halal bpom rptka kitas pmi; do
  add "$BASE/glosarium/$g"
done
add "$BASE/biaya/nib"
add "$BASE/biaya/pt"
add "$BASE/biaya/cv"
add "$BASE/syarat/nib"
add "$BASE/syarat/pt"
add "$BASE/syarat/cv"

# --- Urutkan, buang duplikat, tulis ---
sort -u "$TMP" > "$OUT"
rm -f "$TMP"
echo "Selesai: $(wc -l < "$OUT") URL ditulis ke $OUT"
