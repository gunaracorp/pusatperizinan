#!/usr/bin/env bash
# ============================================================
# PUSATPERIZINAN.COM — PRUNE INODE HOSTING (jalankan di public_html)
# ------------------------------------------------------------
# Fungsi : menghapus file sisa deploy LAMA yang tidak ada di paket
#          TERKINI (.inode-manifest.txt) — khusus aset teknis:
#           • _next/**            (aset ber-hash — nama lama tak pernah
#                                  dirujuk HTML baru, cache browser lama
#                                  masih valid dari file baru bila hash sama)
#           • __next.*.txt        (payload RSC ter-segment per rute)
#         Sitemap/robots/HTML TIDAK disentuh → SEO aman.
# Pakai  : bash prune-inode-hosting.sh            (dry-run — hanya laporan)
#          bash prune-inode-hosting.sh --apply    (hapus sungguhan)
#          bash prune-inode-hosting.sh --apply --include-html
#              (IKUT SERTAKAN HTML lama yang tak ada di manifest —
#               hanya untuk redeploy mode SAMA, lihat DEPLOY-IDWEBHOST.md)
# Catatan: aman dijalankan berkali-kali. Idempoten.
# ============================================================
set -euo pipefail

APPLY=0
INCLUDE_HTML=0
for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=1 ;;
    --include-html) INCLUDE_HTML=1 ;;
    *) echo "Argumen tidak dikenal: $arg"; exit 1 ;;
  esac
done

MANIFEST=".inode-manifest.txt"
if [ ! -f "$MANIFEST" ]; then
  echo "❌ $MANIFEST tidak ditemukan di $(pwd)"
  echo "   Script ini harus dijalankan di folder yang baru di-extract dari"
  echo "   paket pusatperizinan-static-hosting.tar.gz versi >= 1.25.1"
  exit 1
fi

TMP_MANIFEST="$(mktemp)"
grep -v '^$' "$MANIFEST" | sort > "$TMP_MANIFEST"
trap 'rm -f "$TMP_MANIFEST"' EXIT

STALE=0
STALE_HTML=0
BYTES=0
LIST="$(mktemp)"
trap 'rm -f "$TMP_MANIFEST" "$LIST"' EXIT

# --- Kandidat prune: aset teknis ber-hash / payload ter-segment ---
find . -type f \( -path "./_next/*" -o -name "__next.*" \) | sort > "$LIST"
if [ "$INCLUDE_HTML" = "1" ]; then
  find . -type f -name "*.html" | sort >> "$LIST"
  sort -u "$LIST" -o "$LIST"
fi

while IFS= read -r f; do
  rel="${f#./}"
  # File yang memang bagian dari paket terkini → pertahankan
  if grep -qxF "$rel" "$TMP_MANIFEST"; then
    continue
  fi
  sz=$(stat -c %s "$f" 2>/dev/null || echo 0)
  BYTES=$((BYTES + sz))
  case "$rel" in
    *.html) STALE_HTML=$((STALE_HTML + 1)) ;;
    *) STALE=$((STALE + 1)) ;;
  esac
  if [ "$APPLY" = "1" ]; then
    rm -f "$f"
    echo "  🗑️  $rel"
  else
    echo "  (dry-run) $rel"
  fi
done < "$LIST"

# --- Dir payload yang menjadi kosong → hapus (hemat inode dir) ---
# Kerangka wajib _next TIDAK dihapus walau kosong sesaat.
EMPTY_DIRS=$(find . -type d -empty ! -name "." \
  ! -path "./_next" ! -path "./_next/static" ! -path "./_next/static/chunks" \
  ! -path "./_next/static/media" ! -path "./_next/server" | sort)
if [ -n "$EMPTY_DIRS" ] && [ "$APPLY" = "1" ]; then
  while IFS= read -r d; do rmdir "$d" 2>/dev/null && echo "  📁 dir kosong dihapus: ${d#./}" || true; done <<< "$EMPTY_DIRS"
fi

echo "──────────────────────────────────────────────"
if [ "$APPLY" = "1" ]; then
  echo "✅ SELESAI — sisa deploy lama dihapus."
else
  echo "🔍 DRY-RUN — belum ada file dihapus. Jalankan ulang dengan --apply."
fi
echo "   File aset teknis sisa deploy lama : $STALE"
[ "$INCLUDE_HTML" = "1" ] && echo "   HTML lama tak ada di manifest     : $STALE_HTML (PERIKSA MODE BUILD dulu!)"
echo "   Estimasi hemat                    : $((BYTES / 1024)) KB · inode ≈ $((STALE + STALE_HTML))"
