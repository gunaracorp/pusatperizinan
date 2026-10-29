#!/bin/bash
# ============================================================
# AUDIT SEO GSC — crawl sitemap lokal pusatperizinan
# Output: /home/z/my-project/download/seo-audit-gsc/
# ============================================================
set -u
BASE="http://localhost:3000"
OUT="/home/z/my-project/download/seo-audit-gsc"
mkdir -p "$OUT"

SECTIONS="static blog panduan testimoni layanan kbli hubs jobs bandingkan glosarium katalog layanan500 layanan-pp layanan-pp3 seo-expansion"

echo "=== 1. Unduh semua seksi sitemap ==="
for S in $SECTIONS; do
  curl -s --max-time 60 "$BASE/sitemap/$S.xml" -o "$OUT/$S.xml"
  N=$(rg -c "<loc>" "$OUT/$S.xml" 2>/dev/null || echo 0)
  echo "  $S.xml: $N URL"
done

echo "=== 2. Gabungkan semua URL ==="
cat "$OUT"/*.xml | rg -o "<loc>[^<]+</loc>" | sed 's/<loc>//;s/<\/loc>//' | sort > "$OUT/all-urls.txt"
TOTAL=$(wc -l < "$OUT/all-urls.txt")
echo "  Total unik: $TOTAL"

echo "=== 3. Duplikat lintas-seksi ==="
cat "$OUT"/*.xml | rg -o "<loc>[^<]+</loc>" | sed 's/<loc>//;s/<\/loc>//' | sort | uniq -d > "$OUT/dup-urls.txt"
NDUP=$(wc -l < "$OUT/dup-urls.txt")
echo "  URL tercatat >1 kali di sitemap: $NDUP"
head -20 "$OUT/dup-urls.txt"

echo "=== 4. Crawl: seksi kecil penuh, seksi besar sampel ==="
> "$OUT/crawl-results.tsv"
# Seksi kecil = crawl penuh
SMALL="static.xml blog.xml panduan.xml testimoni.xml hubs.xml jobs.xml bandingkan.xml katalog.xml glosarium.xml seo-expansion.xml"
URLS_SMALL=""
for F in $SMALL; do URLS_SMALL="$URLS_SMALL $(rg -o 'https[^<]+' "$OUT/$F" | tr '\n' ' ')"; done
# Seksi besar = sampel acak 80 per seksi
URLS_BIG=""
for F in layanan.xml kbli.xml layanan500.xml layanan-pp.xml layanan-pp3.xml; do
  URLS_BIG="$URLS_BIG $(rg -o 'https[^<]+' "$OUT/$F" | shuf -n 80 | tr '\n' ' ')"
done

for U in $URLS_SMALL $URLS_BIG; do
  # Ganti domain ke localhost agar menguji kode lokal
  LP="${U/https:\/\/pusatperizinan.com/$BASE}"
  KODE=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" --max-time 60 "$LP")
  echo -e "$KODE\t$U" >> "$OUT/crawl-results.tsv"
done
echo "  Selesai crawl $(wc -l < "$OUT/crawl-results.tsv") URL"

echo "=== 5. Non-200 ==="
rg -v "^200\s*$|^200\t" "$OUT/crawl-results.tsv" | head -40
echo "  Total non-200: $(rg -c -v '^200' "$OUT/crawl-results.tsv" || echo 0)"
