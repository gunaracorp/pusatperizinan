#!/bin/bash
# ============================================================
# PUSATPERIZINAN.COM — [ensure-pg] Sandbox guard
# Menjamin embedded PostgreSQL + database + .env siap sebelum
# dev server naik. Dipanggil otomatis via "predev" pada
# `bun run dev`. Idempoten: aman dijalankan berulang kali.
# ============================================================
set -e
cd "$(dirname "$0")/.."
PGBIN="node_modules/@embedded-postgres/linux-x64/native/bin"
EXPECTED_URL='postgresql://postgres@127.0.0.1:5432/pusatperizinan'

# 1. Pulihkan .env sandbox bila hilang atau terkontaminasi template (DATABASE_URL=file:...)
if ! grep -q "$EXPECTED_URL" .env 2>/dev/null; then
  S1=$(openssl rand -hex 24)
  S2=$(openssl rand -hex 24)
  printf '# PusatPerizinan.com — sandbox lokal (jangan commit)\nDATABASE_URL="%s"\nADMIN_PASSWORD="admin-sandbox-2026"\nADMIN_SECRET="%s"\nCRON_SECRET="%s"\nPAYMENT_DEMO_MODE="true"\nFOLLOWUP_SWEEP_MINUTES="0"\nNEXT_PUBLIC_GA_ID="G-KMZRQJQXCB"\n' "$EXPECTED_URL" "$S1" "$S2" > .env
  echo "[ensure-pg] .env sandbox dipulihkan (DATABASE_URL PostgreSQL)"
fi

# 2. Initdb bila cluster hilang (mis. dibersihkan proses restart)
FRESH=0
if [ ! -f .pgdata/PG_VERSION ]; then
  echo "[ensure-pg] Cluster baru terdeteksi — initdb..."
  $PGBIN/initdb -D .pgdata -U postgres -A trust -E UTF8 --locale=C > .pgdata-init.log 2>&1
  FRESH=1
fi

# 3. Start server bila belum berjalan
if ! $PGBIN/pg_ctl -D .pgdata status >/dev/null 2>&1; then
  $PGBIN/pg_ctl -D .pgdata -l .pgdata/postgres.log -o "-p 5432 -c listen_addresses=127.0.0.1" start >/dev/null 2>&1
fi

# 4. Cluster segar → buat database + inisialisasi skema Prisma 8
if [ "$FRESH" = "1" ]; then
  $PGBIN/pg_ctl -D .pgdata stop -m fast >/dev/null 2>&1
  echo "CREATE DATABASE pusatperizinan;" | $PGBIN/postgres --single -D .pgdata postgres >/dev/null 2>&1
  $PGBIN/pg_ctl -D .pgdata -l .pgdata/postgres.log -o "-p 5432 -c listen_addresses=127.0.0.1" start >/dev/null 2>&1
  bunx prisma db init >> .pgdata-init.log 2>&1
  bunx prisma db sign >> .pgdata-init.log 2>&1
  echo "[ensure-pg] Database pusatperizinan + skema 14 model diinisialisasi"
fi

echo "[ensure-pg] PostgreSQL siap di 127.0.0.1:5432"
