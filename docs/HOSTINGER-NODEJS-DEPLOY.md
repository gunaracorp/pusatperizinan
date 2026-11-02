# Deploy PusatPerizinan.com — Hostinger + Prisma ORM 8 + PostgreSQL

This branch's production database runtime is Prisma ORM 8 with PostgreSQL. SQLite is only used as a **source** during the one-time data import. Do not configure `DATABASE_URL=file:./db/custom.db` for the application runtime.

## Runtime requirements

- Node.js 22.18+ (Node.js 24.11+ is also supported; Node.js 24 is recommended by Prisma).
- TypeScript 5.9+.
- Hostinger's Node.js Web App environment, not static export or PHP-only `public_html` hosting.
- A PostgreSQL database reachable from Hostinger. The connection string must be supplied privately from your database provider's dashboard.

## Hostinger deployment settings

- Git repository: `gunaracorp/pusatperizinan`
- Branch: use the reviewed Prisma 8 branch for staging first; change production only after CI succeeds and the migration plan below is completed.
- Build command: `npm run build`
- Start command: `npm run start`
- Node version: 22.18+ (or a supported newer version)
- Next.js output: `.next/standalone` if Hostinger asks for the output setting.

The build uses `next build --webpack` because Hostinger's previous Turbopack build failed while spawning the CSS worker for `src/app/globals.css`. The build copies `public`, `.next/static`, and generated Prisma 8 contract artifacts into the standalone output.

## Required environment variables

Add these under Hostinger → Node.js Web App → Environment Variables. Do not commit real values or paste them in chat.

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
ADMIN_PASSWORD=<your-unique-admin-password>
ADMIN_SECRET=<at-least-32-random-characters>
CRON_SECRET=<a-different-long-random-secret>
PAYMENT_DEMO_MODE=false
FOLLOWUP_SWEEP_MINUTES=15
```

Replace placeholders using real values; do not include angle brackets. `DATABASE_URL` is a real PostgreSQL URL, not the SQLite path from old configuration. The sample connection string in `.env.example` is a placeholder and will not connect.

Optional values, only for features you actually enable:

- Midtrans: `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION`
- Tripay: `TRIPAY_API_KEY`, `TRIPAY_PRIVATE_KEY`, `TRIPAY_MERCHANT_CODE`, `TRIPAY_IS_PRODUCTION`, optionally `TRIPAY_METHODS`
- Manual transfer details: `BANK_TRANSFER_INFO`
- Telegram notifications: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- WhatsApp gateway: `FONNTE_TOKEN`
- Search Console/analytics: `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`
- Error monitoring: `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`

All variables must be present before the build if the bundler or Prisma configuration reads them during build. Keep secrets server-side: never prefix database URLs, admin secrets, payment keys, or notification tokens with `NEXT_PUBLIC_`.

## Database setup: new/empty PostgreSQL

Run commands only against the intended PostgreSQL database.

1. Set `DATABASE_URL` securely in your Hostinger environment or local secure shell.
2. Install dependencies and emit the contract: `npm install` (the postinstall also emits it).
3. Initialize the tables once: `npm run db:init`.
4. Check the contract: `npm run db:verify`.
5. Before accepting leads/orders, open the website and verify admin, lead creation, consultation, checkout, payment status, and notification routes.

`db:init` is an initialization operation for a new/empty database. Do not repeat it as a generic deployment command.

## Move the existing SQLite data

Do not change the production website's database URL until a backup and a successful staging import have been verified.

1. Keep a private copy of the existing SQLite file. The historical repository file is not guaranteed to match the latest live Hostinger database.
2. Create a new PostgreSQL database and use a separate staging `DATABASE_URL`.
3. In a staging checkout, emit the contract and run `npm run db:init`.
4. Run `npm run db:import-sqlite -- /secure/path/to/custom.db`. The importer opens SQLite read-only, checks for the expected 14 model tables, preserves existing IDs, converts SQLite Boolean fields, batches inserts, skips IDs already imported, and can resume after an interrupted batch.
5. Run `npm run db:verify`, then check counts and sample records from leads, orders, articles, subscribers, consultations, and follow-up logs. Test the complete lead → admin → order → webhook path against staging.
6. Back up the new PostgreSQL database with `npm run db:backup`. The resulting compressed NDJSON files include business/customer data and must remain private.
7. Only after successful comparison, switch the production app to the PostgreSQL `DATABASE_URL`, deploy, and repeat the golden-path test. Keep the old SQLite backup private until the new site has been verified.

If the SQLite database contains real client records, handle it as confidential personal data. Do not upload it to chat or commit it to Git.

## Backups and restore

- `npm run db:backup` — exports all 14 model tables as compressed NDJSON under `backups/`, mode 0600, retains the latest 14 files.
- `npm run db:restore -- /secure/path/to/backup.ndjson.gz` — restores the backup into an already initialized, empty PostgreSQL target. Use a new staging database for restore tests; the script refuses a non-empty target.
- Keep off-host copies as well. A backup on the same hosting account is not a complete disaster-recovery plan.

## Prisma ORM 8 migration workflow

- `npm run prisma8:emit` — emit the contract artifacts.
- `npm run db:init` — initialize a new database once.
- `npm run db:sign` — sign an already-existing database only after its schema matches the contract.
- `npm run db:verify` — verify the database against the emitted contract.
- `npm run db:plan` — plan a schema change for review.
- `npm run db:migrate:preview` — preview pending migration operations.
- `npm run db:migrate` — development command that applies the planned change and advances the local `db` ref. Production migrations should use a committed and reviewed migration plan and must not advance repository refs from the deployment job.

## CI verification

The GitHub Actions workflow provisions a disposable PostgreSQL 16 service and runs contract emission, initializes a blank schema, verifies it, runs a CRUD/query smoke test against all 14 models, and performs the Next.js production build. CI success is necessary but is not proof that the Hostinger environment variables or production data migration are correct.

## Official references

- Prisma ORM 8 release status: https://www.prisma.io/docs/orm/release-status
- Prisma ORM 7 → 8 PostgreSQL migration: https://www.prisma.io/docs/guides/upgrade-prisma-orm/postgresql
- Prisma ORM 8 database migrations: https://www.prisma.io/docs/orm/migrations/how-migrations-work
- Hostinger environment variables: https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/
