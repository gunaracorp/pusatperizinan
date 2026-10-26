#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")/../.zscripts" && pwd)"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

# Missing PostgreSQL URL must fail closed and must not create a local DB.
if DATABASE_URL="" BUILD_DIR="$TEST_ROOT/build" bash "$SCRIPT_DIR/database-runtime-build.sh" >"$TEST_ROOT/missing.log" 2>&1; then
  echo "expected failure without DATABASE_URL" >&2
  exit 1
fi
test ! -e "$TEST_ROOT/build/db/custom.db"
grep -q "No local SQLite file" "$TEST_ROOT/missing.log"

# PostgreSQL URL succeeds without copying/creating DB files.
DATABASE_URL="postgresql://test:test@127.0.0.1:5432/test" BUILD_DIR="$TEST_ROOT/build" \
  bash "$SCRIPT_DIR/database-runtime-build.sh" >"$TEST_ROOT/pg.log" 2>&1
test ! -e "$TEST_ROOT/build/db/custom.db"
grep -q "external PostgreSQL configured" "$TEST_ROOT/pg.log"

echo "Prisma 8 database build guard tests passed"
