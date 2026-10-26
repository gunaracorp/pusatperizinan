#!/bin/bash
# Prisma ORM 8 database runtime is an external PostgreSQL service.
# Do not copy SQLite files into deployment artifacts or run schema changes
# automatically during a web build.
set -euo pipefail

if [[ "${DATABASE_URL:-}" != postgresql://* && "${DATABASE_URL:-}" != postgres://* ]]; then
  echo "ERROR: Prisma ORM 8 needs DATABASE_URL for PostgreSQL. Set it in the hosting environment." >&2
  echo "No local SQLite file will be created, copied, or bundled." >&2
  exit 1
fi

echo "Prisma ORM 8: external PostgreSQL configured. No database files copied into build output."
