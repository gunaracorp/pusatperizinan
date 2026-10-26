# Prisma ORM 8 — PusatPerizinan.com production target

This branch removes Prisma ORM 7 and the SQLite runtime package from the app's runtime dependencies. Application query traffic now runs through the Prisma ORM 8 PostgreSQL runtime in `src/prisma/db.ts`. `src/lib/db.ts` is a compatibility-shaped application facade that translates the existing route layer's established query patterns into Prisma ORM 8 calls; it does **not** import `@prisma/client`, Prisma 7, or a SQLite adapter.

## Runtime design

- CLI: `prisma@8.0.0-rc.27` (pin to the Prisma 8 version supported by the deployment integration).
- Runtime: `@prisma/orm-postgres@8.0.0-rc.20`.
- Contract: `src/prisma/contract.prisma`.
- Emitted artifacts: `generated/prisma8/contract.json` and `generated/prisma8/contract.d.ts`.
- Runtime client: `src/prisma/db.ts`.
- App facade: `src/lib/db.ts`, backed by the Prisma ORM 8 client only.
- Database: PostgreSQL. The previous SQLite DB is only a source file for a one-time import.

## Current migration status

- [x] Prisma ORM 8 CLI and PostgreSQL runtime configured.
- [x] Remove Prisma 7 CLI/client and SQLite adapter from runtime/package dependencies.
- [x] Centralize all app database requests behind the Prisma ORM 8 runtime.
- [x] Remove SQLite-specific raw SQL from the admin overview; date series is calculated from filtered timestamp rows.
- [x] Replace SQLite backup with compressed PostgreSQL/Prisma ORM 8 NDJSON backup.
- [x] Add resumable SQLite-to-PostgreSQL data importer.
- [x] Add backup restore tool for an initialized, empty PostgreSQL target.
- [x] Add GitHub Actions PostgreSQL integration environment and smoke test for the 14 models.
- [ ] Confirm the latest GitHub Actions run is green after the last commit.
- [ ] Run the staging import against a verified copy of the actual production SQLite DB, compare row counts and sample records.
- [ ] Set the real PostgreSQL connection string privately in Hostinger and test live app flows before routing production traffic.

The source-code/configuration change can be prepared in GitHub, but production data cannot be safely moved or production credentials populated without access to the actual database/provider. Do not point the live application at an empty PostgreSQL database and assume the old leads/orders have been migrated.

## One-time SQLite → PostgreSQL import

1. Preserve a private backup of the actual source database.
2. Set `DATABASE_URL` to a fresh staging PostgreSQL database.
3. Run `npm install`, then `npm run db:init`.
4. Run `npm run db:import-sqlite -- /secure/path/to/custom.db`.
5. Run `npm run db:verify` and compare per-model counts/critical records.
6. Exercise lead capture, admin dashboard, consultation, CMS, follow-up, orders, payment webhooks and notifications.
7. Snapshot PostgreSQL with `npm run db:backup` before any production switch.

The importer intentionally does not drop tables or overwrite rows. It preserves identifiers, converts SQLite's integer booleans, imports the Lead table before FollowUpLog because of its foreign key, and skips IDs already present so a partially interrupted import can resume. If the source DB is missing any expected model table, it fails instead of silently omitting data.

## ORM 8 query facade

The current route files use a facade with methods such as `db.lead.findMany` for compatibility. The facade translates query builders/filters to Prisma ORM 8's `where`, `orderBy`, `select`, `include`, `create`, `update`, `upsert`, `aggregate`, and `groupBy` API. This avoids a risky one-shot rewrite across every endpoint while eliminating Prisma 7 from the running process. The compatibility facade must remain under integration tests before production release; unsupported filter operators fail visibly rather than broadening the query.

## CI

`/.github/workflows/prisma8-migration.yml` provisions disposable PostgreSQL 16, emits the contract, initializes the schema, verifies it, exercises create/read/update/count/groupBy/aggregate/upsert/include paths across all 14 models, and runs the production build. No production credentials are stored in GitHub Actions.
