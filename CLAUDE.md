# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The project guide (stack, current state, commands, structure, design system, gotchas) lives in AGENTS.md so other coding agents share it. Keep it up to date there rather than duplicating it here.

@AGENTS.md

## Claude Code specifics

- `.claude/settings.json` denies reading or editing `.env` / `.env.*`. Don't try to work around it. Ask the user for any value you need.
- It pre-approves `pnpm build`, `pnpm typecheck`, `git status` and `git diff`. `git push` always asks first.
- To verify UI, start the dev server on a spare port (e.g. `pnpm dev -p 3123`) and use the Chrome browser tools. To check mobile and tablet widths when the window can't be resized, load the page in 390px and 820px iframes. Afterwards, stop the server's node processes: stopping the background shell alone leaves `next dev` running.

## Database conventions

- **Scope:** the catalog is just `categories`, `products` and `product_images` (`src/db/schema/catalog.ts`). Don't add carts, orders, payments, reviews, wishlists or variants unless asked.
- **Stock** is `products.stock_quantity`, not a separate table. It moves to a variants table only when variants are introduced.
- **Images** are rows in `product_images` with `kind` = `primary` | `hover` | `gallery` (ordered by `position`), not JSON. Each product needs exactly one `primary`.
- **Money** is integer cents (`price_cents`). Columns use explicit snake_case names; keys are `uuid` with `defaultRandom()`; slugs are unique and drive URLs (`/collections/{category.slug}`, `/products/{slug}`).
- **Migrations:** always `pnpm db:generate` → read the SQL → `pnpm db:migrate`, and commit the files in `drizzle/`. Never use `db:push` for schema changes.
- **Data access:** only `src/lib/catalog.ts` queries catalog tables. It maps rows to the types in `src/lib/catalog-types.ts`, which components import with `import type` (client components must never import `catalog.ts`). Wrap lookups that are called from both `generateMetadata` and the page in React `cache()`.
- **Freshness:** catalog pages are ISR with `export const revalidate = 60` (no `cacheComponents`). Keep that model on new catalog routes.
- **neon-http:** no interactive transactions. Group writes with `db.batch([...])`. In relational queries, use the `orderBy`/`where` callback's columns for raw `sql` (the root table is aliased).
- **Seed:** `pnpm db:seed` (`src/db/seed.ts`) is the only consumer of the sample products and categories, and must stay idempotent (upsert on slug). It loads dotenv before importing `@/db`.
- **When `drizzle-kit` reports `injected env (0)` or a DB command fails silently**, the problem is probably `DATABASE_URL`. Ask the user to check `.env`; don't try to read it.
