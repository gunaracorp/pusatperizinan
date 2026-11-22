#!/usr/bin/env bash
# ============================================================
# PUSATPERIZINAN.COM — CEK INODE AKUN cPanel (READ-ONLY)
# ------------------------------------------------------------
# Memetakan ke mana 566K inode akun Anda terpakai TANPA menghapus
# apa pun. Jalankan di cPanel → Terminal (atau SSH) dari folder mana pun:
#
#   bash cek-inode.sh
#
# Aman: hanya find/stat/df. Tidak ada rm.
# ============================================================
set -euo pipefail

HOME_DIR="${HOME:-$(cd ~ && pwd)}"
BLUE='\033[1;34m'; GREEN='\033[1;32m'; YEL='\033[1;33m'; NC='\033[0m'

echo "════════════════════════════════════════════════════════════"
echo " 🔍 DIAGNOSTIK INODE AKUN — $(hostname 2>/dev/null || echo cPanel)"
echo "════════════════════════════════════════════════════════════"

# --- 0. Kuota filesystem ---
echo -e "\n${BLUE}[0] Kuota inode filesystem${NC}"
df -i "$HOME_DIR" 2>/dev/null | tail -1 | awk '{printf "   Terpakai: %s dari %s (%s)\n", $3, $2, $5}'

# --- 1. Satu pass find → agregasi per prefix depth 1/2/3 ---
echo -e "\n${BLUE}[1] Pemakaian inode per folder utama akun (depth 1)${NC}"
ALL_LIST="$(mktemp)"
trap 'rm -f "$ALL_LIST"' EXIT
find "$HOME_DIR" -xdev \( -type f -o -type d \) 2>/dev/null \
  | sed "s|^${HOME_DIR}||; s|^/||" > "$ALL_LIST"
TOTAL=$(wc -l < "$ALL_LIST")
echo "   Total inode di bawah home: $TOTAL"

awk -F'/' '{ if (NF >= 1 && $1 != "") c[$1]++ } END { for (k in c) printf "%10d  %s\n", c[k], k }' "$ALL_LIST" \
  | sort -rn | head -15 | sed 's/^/   /' || true

echo -e "\n${BLUE}[2] Top 15 folder detail (depth 2-3) — pelacak sumber${NC}"
awk -F'/' '
  NF >= 2 && $1 != "" { p2[$1"/"$2]++ }
  NF >= 3 { p3[$1"/"$2"/"$3]++ }
  END {
    for (k in p2) printf "%10d  %s\n", p2[k], k
    for (k in p3) printf "%10d  %s\n", p3[k], k
  }' "$ALL_LIST" | sort -rn | head -15 | sed 's/^/   /' || true

# --- 3. Kategori yang biasanya memakan ratusan ribu inode ---
echo -e "\n${BLUE}[3] Kategori pemakan inode klasik di shared hosting${NC}"
count_dir() { # $1 = relative path
  if [ -e "$HOME_DIR/$1" ]; then
    awk -v p="$1" -F'/' '$1 == p || index($0, p"/") == 1' "$ALL_LIST" | wc -l \
      | awk -v n="$1" '{ printf "   %-45s %8s inode\n", n":", $1 }'
  else
    printf "   %-45s %8s\n" "$1:" "(tidak ada)"
  fi
}
count_dir "mail"
count_dir ".trash"
count_dir ".cpanel"
count_dir "public_html"
count_dir "backup"
count_dir "backups"
count_dir ".cpanel/caches"
count_dir "tmp"

# --- 4. Audit public_html khusus situs ini ---
PH="$HOME_DIR/public_html"
if [ -d "$PH" ]; then
  echo -e "\n${BLUE}[4] Audit public_html — pusatperizinan${NC}"
  if [ -d "$PH/_next" ]; then
    FULL_CNT=$(find "$PH" -type f -name "__next._full.txt" 2>/dev/null | wc -l)
    IDX_ALL=$(find "$PH" -type f -name "__next._index.txt" 2>/dev/null | wc -l)
    IDX_ROOT=0; [ -f "$PH/__next._index.txt" ] && IDX_ROOT=1
    IDX_NF=0;  [ -f "$PH/_not-found/__next._index.txt" ] && IDX_NF=1
    IDX_DUP=$((IDX_ALL - IDX_ROOT - IDX_NF))
    HT_NEW=0; grep -qs "__next._index" "$PH/.htaccess" && HT_NEW=1
    echo "   Paket terpasang : $([ "$FULL_CNT" -gt 0 ] && echo 'LAMA (v<=1.25.0)' || echo 'BARU (>=1.25.1, sudah ter-prune)')"
    printf "   Payload mati __next._full.txt     : %s file  → hapus dengan bersihkan-inode.sh\n" "$FULL_CNT"
    printf "   Duplikat __next._index.txt per-dir: %s file  → %s\n" "$IDX_DUP" \
      "$([ "$HT_NEW" = "1" ] && echo 'AMAN dihapus (htaccess baru aktif)' || echo 'dihapus SETELAH htaccess baru ter-deploy')"
    NEXT_CNT=$(find "$PH/_next" \( -type f -o -type d \) 2>/dev/null | wc -l)
    echo "   Aset _next/ (semua generasi)      : $NEXT_CNT inode"
  else
    echo "   (folder _next tidak ditemukan — situs mungkin bukan paket statis ini)"
  fi
  echo "   Tip                 : sisa .tar.gz / file bawaan paket di public_html ikut dihitung:"
  find "$PH" -maxdepth 1 -type f \( -name "*.tar.gz" -o -name "*.zip" -o -name "error_log" \) -exec ls -lh {} \; 2>/dev/null | awk '{printf "     %s (%s)\n", $NF, $5}' || true
fi

# --- 5. Rekomendasi ---
echo -e "\n${GREEN}[5] Rekomendasi (urut dampak)${NC}"
echo "   1. Bersihkan email lama/spam  — pemapak [mail] di atas. 1 email = 1+ inode."
echo "      cPanel → Email → hapus mailbox tak terpakai / purge spam folder."
echo "   2. Kosongkan .trash           — cPanel → File Manager → View Trash → Empty Trash."
echo "   3. Jalankan bersihkan-inode.sh di public_html (payload mati + sisa paket)."
echo "   4. Untuk update berikutnya     — pakai prune-inode-hosting.sh dari paket v1.25.1+."
echo "════════════════════════════════════════════════════════════"
