# Prisma 8 compatibility stage — PusatPerizinan.com

## Why this change exists

Prisma's deployment integration now expects repositories to use the Prisma ORM 8 CLI. The old application was written with Prisma ORM 7, its `@prisma/client`, and a SQLite driver adapter. A numeric version bump alone would break the application, so this branch introduces Prisma 8 alongside the existing Prisma 7 runtime.

## What this stage changes

- `prisma` is pinned to the Prisma ORM 8 release candidate available for this migration (`8.0.0-rc.27`).
- Prisma 7 tooling is namespaced as `@prisma/prisma7`, with the CLI `prisma7` and configuration `prisma7.config.ts`.
- `@prisma/orm-sqlite` and a Prisma ORM 8 contract are added in `src/prisma/contract.prisma`.
- The build emits the Prisma 8 contract artifacts and generates the existing Prisma 7 client.
- `src/prisma/db.ts` defines the new Prisma 8 SQLite runtime, separate from `src/lib/db.ts`.

## Important limitations

**This is a staged compatibility upgrade, not a completed migration of every database query.** Existing API routes still import `@/lib/db` and continue to use Prisma 7 until they can be moved and tested one by one.

Prisma ORM 8's SQLite package is marked experimental by Prisma. For a production deployment on Prisma Compute, PostgreSQL / Prisma Postgres is the preferred target. Moving the current SQLite data and changing every route to Prisma ORM 8 are separate migration tasks; do not change `DATABASE_URL` to a PostgreSQL URL before that work is complete.

The live database file `db/custom.db` has historically been committed to the public repository. This branch intentionally does not delete that tracked file without a verified backup and migration plan. Check it for real customer records privately and remove it from Git history / rotate any exposed secrets as needed before production.

## Commands

- `npm run prisma8:emit` — emit Prisma ORM 8 contract files.
- `npm run prisma8:verify` — verify that a database has been signed and matches the contract; this is for after database setup, not an initial build check.
- `npm run db:generate` — regenerate the legacy Prisma 7 client.
- `npm run db:migrate` — run the legacy Prisma 7 migration command until ownership is explicitly migrated.

## Requirements and checks before production

- Node.js 22.18+ (Prisma ORM 8 minimum; Node.js 24 is recommended in its docs).
- Run npm install and the production build in a clean environment. This assistant session could not run the repository's build because outbound network access for cloning / npm install was unavailable.
- Confirm the emitted contract is accepted by the current Prisma ORM 8 CLI.
- Test lead creation, consultations, admin lists, orders, CMS, and follow-up.
- Before Prisma ORM 8 handles production writes, sign / verify the actual database and make a tested backup.
