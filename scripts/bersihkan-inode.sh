#!/usr/bin/env bash
# ============================================================
# PUSATPERIZINAN.COM — BERSIHKAN INODE (MODE AMAN, DRY-RUN DEFAULT)
# ------------------------------------------------------------
# Menghapus HANYA kategori yang 100% terbukti aman untuk situs ini:
#   1. __next._full.txt            — payload RSC mati (nol referensi di
#                                    seluruh runtime JS; konten duplikat)
#   2. duplikat __next._index.txt  — HANYA jika .htaccess baru (v1.25.1,
#                                    berisi rule rewrite _index) sudah
#                                    terpasang; salinan root + _not-found
#                                    selalu dipertahankan
#   3. sisa arsip upload           — *.tar.gz / *.zip di root public_html
#   4. dokumen bawaan paket        — download/{DEPLOY-IDWEBHOST.md,
#                                    ISI-PACK.txt,pack-info.json}
#                                    (PDF katalog DIPERTAHANKAN — dipakai
#                                    halaman katalog)
#   5. log error_log / dev.log     — log lama aman dihapus
#   6. dir payload jadi kosong     — dir __next sisa prune
# TIDAK disentuh: HTML, sitemap, robots, mail, .trash, .cpanel, backup.
#
# Pakai:
#   bash bersihkan-inode.sh            → dry-run (laporan saja)
#   bash bersihkan-inode.sh --apply    → eksekusi
# Jalankan di folder mana pun; public_html dideteksi otomatis
# (override: PUBLIC_HTML=/path bash bersihkan-inode.sh --apply)
# ============================================================
set -euo pipefail

APPLY=0
[ "${1:-}" = "--apply" ] && APPLY=1
PH="${PUBLIC_HTML:-$HOME/public_html}"
YEL='\033[1;33m'; GREEN='\033[1;32m'; RED='\033[1;31m'; NC='\033[0m'

if [ ! -d "$PH" ]; then
  echo -e "${RED}❌ public_html tidak ditemukan di $PH${NC}"
  echo "   Untuk subdomain: PUBLIC_HTML=\$HOME/public_html/namasubdomain bash $0 --apply"
  exit 1
fi

BEFORE=$(df -i "$PH" 2>/dev/null | tail -1 | awk '{print $3}')
CNT=0; BYTES=0
TAG=$([ "$APPLY" = "1" ] && echo "🗑️ " || echo "(dry-run)")
LIST="$(mktemp)"; trap 'rm -f "$LIST"' EXIT

add() { # $@ = paths
  for p in "$@"; do
    [ -e "$p" ] || continue
    sz=$(stat -c %s "$p" 2>/dev/null || echo 0)
    BYTES=$((BYTES + sz)); CNT=$((CNT + 1))
    echo "$p" >> "$LIST"
    printf "   %s %s\n" "$TAG" "${p#"$PH"/}"
  done
}

echo "════════════════════════════════════════════════════════════"
echo " 🧹 BERSIHKAN INODE — $PH  $([ "$APPLY" = "1" ] && echo '(APPLY)' || echo '(DRY-RUN)')"
echo "════════════════════════════════════════════════════════════"

# --- 1. Payload RSC mati: __next._full.txt ---
echo -e "\n${YEL}[1] Payload RSC mati __next._full.txt${NC}"
while IFS= read -r f; do add "$f"; done < <(find "$PH" -type f -name "__next._full.txt" 2>/dev/null)

# --- 2. Duplikat __next._index.txt (hanya dgn htaccess baru) ---
echo -e "\n${YEL}[2] Duplikat __next._index.txt${NC}"
if grep -qs "__next._index" "$PH/.htaccess"; then
  while IFS= read -r f; do
    case "$f" in
      "$PH/__next._index.txt") continue ;;
      "$PH/_not-found/__next._index.txt") continue ;;
    esac
    add "$f"
  done < <(find "$PH" -type f -name "__next._index.txt" 2>/dev/null)
else
  echo "   ⏭️  Dilewati — .htaccess v1.25.1 (rule rewrite _index) belum terpasang."
  echo "      Deploy paket v1.25.1+ dulu, lalu jalankan script ini lagi."
fi

# --- 3. Arsip sisa upload di root public_html ---
echo -e "\n${YEL}[3] Arsip sisa upload (*.tar.gz / *.zip di root)${NC}"
find "$PH" -maxdepth 1 -type f \( -name "*.tar.gz" -o -name "*.zip" \) 2>/dev/null | while IFS= read -r f; do add "$f"; done

# --- 4. Dokumen bawaan paket di download/ (PDF katalog tetap aman) ---
echo -e "\n${YEL}[4] Dokumen bawaan paket di download/${NC}"
if [ -d "$PH/download" ]; then
  for f in "$PH/download/DEPLOY-IDWEBHOST.md" "$PH/download/ISI-PACK.txt" "$PH/download/pack-info.json"; do
    add "$f"
  done
fi

# --- 5. Log lama ---
echo -e "\n${YEL}[5] Log lama${NC}"
find "$PH" -maxdepth 2 -type f \( -name "error_log" -o -name "dev.log" -o -name "php_errorlog" \) 2>/dev/null | while IFS= read -r f; do add "$f"; done

# --- Eksekusi / ringkasan ---
if [ "$APPLY" = "1" ] && [ "$CNT" -gt 0 ]; then
  while IFS= read -r p; do rm -f "$p"; done < "$LIST"
  # dir payload yang jadi kosong (bukan _next — aset hashnya mungkin masih dipakai)
  while IFS= read -r d; do
    rmdir "$d" 2>/dev/null && printf "   📁 dir kosong dihapus: %s\n" "${d#"$PH"/}" || true
  done < <(find "$PH" -mindepth 2 -type d -empty 2>/dev/null | grep -E "/[^/]*(__next|\.[0-9a-f]{6,})[^/]*$" || true)
fi

AFTER=$(df -i "$PH" 2>/dev/null | tail -1 | awk '{print $3}')
echo "──────────────────────────────────────────────"
echo "   File teridentifikasi : $CNT (± $((BYTES / 1024)) KB)"
[ "$APPLY" = "1" ] && echo "   Inode filesystem     : $BEFORE → $AFTER (hemat $((BEFORE - AFTER)))" \
                   || echo "   Jalankan dengan --apply untuk menghapus yang terdaftar di atas"
echo ""
echo -e "   ${GREEN}Lanjutkan dengan:${NC} bash cek-inode.sh  — lihat pema-pemakaian inode akun penuh"
echo -e "   ${RED}Pemborosan besar biasanya di luar public_html${NC} (mail / .trash) — lihat laporan cek-inode.sh"
echo "════════════════════════════════════════════════════════════"
