# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

1. `npm install`
2. `cp .env.example .env.local` and fill in `DATABASE_URL` (Neon) and `BETTER_AUTH_SECRET` (`npx auth secret`).
3. `npm run dev` and open http://localhost:3000

`DATABASE_URL` is required at build time as well; the app fails fast without it.

## Structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
    layout.tsx, page.tsx
  db/
    index.ts                     Drizzle client (Neon HTTP driver)
    schema/index.ts              Schema entry point (export all tables here)
  lib/
    auth.ts                      Better Auth server instance (Drizzle adapter)
    auth-client.ts               Better Auth React client
    env.ts                       Server env validation
drizzle.config.ts                drizzle-kit config (reads .env.local)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/schema/auth.ts` (then re-export from `schema/index.ts`) |
| `npm run db:generate` / `db:migrate` | Create / apply SQL migrations in `./drizzle` |
| `npm run db:push` | Push schema directly (dev only) |
| `npm run db:studio` | Drizzle Studio |
