# Atelier Store

A luxury-fashion eCommerce storefront. The visual language takes cues from premium fashion sites: large editorial imagery, a monochrome UI, small type and square corners. No other brand's text, assets or branding is used.

**Stack:** Next.js 16.3 (App Router, Turbopack, `src/` dir, `@/*` → `src/*`) · React 19 · TypeScript · Tailwind CSS v4 · Better Auth 1.7 · Drizzle ORM 0.45 · Neon Postgres (`@neondatabase/serverless`).

## Current state

| Area                             | Status                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Homepage (`/`)                   | Built: hero, category tiles, two collection campaigns, product grid, editorial story, services, footer |
| Product page (`/products/[slug]`) | Built: full-screen image carousel, then purchase block (category, name, price, stock, add to bag) beside a details accordion, then "You may also like". Statically generated with ISR (`revalidate = 60`); unknown slugs 404 |
| Header, menu drawer, footer      | Built, shared via the root layout                                                                      |
| Design system                    | Built (tokens, base, components, layout utilities)                                                     |
| Data                             | Products, categories, stock and product images come from Postgres through `src/lib/catalog.ts` (homepage and product pages use ISR, `revalidate = 60`). Editorial content (hero, collections, story, nav) is still static in `src/data/sample-catalog.ts` |
| DB schema                        | Catalog tables (`categories`, `products` with `stock_quantity`, `product_images`) in `src/db/schema/catalog.ts`; migrations in `drizzle/`; seeded by `pnpm db:seed`. No auth tables yet |
| Auth                             | Server/client instances and `/api/auth/*` route wired. No providers, tables or UI                      |
| Other routes                     | None. Nav, collection/category, account and footer links all 404                                       |
| Newsletter, add to bag, back-in-stock | UI only. Each confirms locally; nothing is stored or sent                                       |
| Cart, checkout, payments, search | Not started                                                                                            |
| Tests                            | No test framework configured                                                                           |

## Commands

The project uses pnpm (a stale `package-lock.json` from the initial npm scaffold also exists).

```bash
pnpm dev               # dev server at http://localhost:3000 (pass -p <port> to change)
pnpm build             # production build; needs a migrated + seeded DB (generateStaticParams queries it)
pnpm lint              # eslint
pnpm typecheck         # tsc --noEmit
pnpm auth:generate     # Better Auth CLI → src/db/schema/auth.ts
pnpm db:generate       # drizzle-kit: SQL migrations into ./drizzle
pnpm db:migrate        # apply migrations
pnpm db:push           # push schema directly (dev only)
pnpm db:studio         # Drizzle Studio
pnpm db:seed           # upsert sample catalog into the DB (idempotent; run after db:migrate)
```

Before finishing a change, run `pnpm lint && pnpm typecheck`. For UI work, also check the page in a browser at mobile (~390px), tablet (~820px) and desktop widths.

## Environment

Template: `.env.example`. Real values live in `.env` / `.env.local`. These are secret: agents must not read or edit them.

| Var                   | Used by                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`        | `src/lib/env.ts` → db client; `drizzle.config.ts`                                                      |
| `BETTER_AUTH_SECRET`  | Better Auth (read automatically). If unset, the build logs a "default secret" error but still succeeds |
| `BETTER_AUTH_URL`     | Better Auth base URL                                                                                   |
| `NEXT_PUBLIC_APP_URL` | `src/lib/auth-client.ts`                                                                               |

## Structure

```
src/
  app/
    layout.tsx                 fonts (Jost, Cormorant Garamond), SiteHeader + SiteFooter
    page.tsx                   homepage: composes src/components/home/* + ProductGridSection
    products/[slug]/page.tsx   product page (generateStaticParams, generateMetadata, notFound)
    globals.css                imports tailwindcss + src/styles/*
    api/auth/[...all]/route.ts Better Auth handler
  components/
    layout/                    site-header (client), menu-drawer (client), site-footer, newsletter-form (client)
    home/                      hero, category-grid, collection-split, editorial-story, services-strip
    product/
      product-card.tsx         grid tile: optional hover image, badge, sold-out label
      product-grid-section.tsx titled product grid (homepage New Arrivals, product page recommendations)
      product-gallery.tsx      (client) full-screen carousel: scroll-snap, arrows, ←/→ keys, dots, counter
      product-info.tsx         purchase block + details accordion, two columns at lg
      add-to-bag.tsx           (client) add-to-bag / sold-out + notify-me states
      product-accordion.tsx    native <details> disclosure list
      stock-status.tsx         dot + "In stock" / "Only N left" / "Sold out"
    icons.tsx                  inline SVG icon set (1.25 stroke, 24px grid)
  data/sample-catalog.ts       seed fixtures (products, categories) + static editorial content (hero, collections, story) + main nav
  db/index.ts                  Drizzle client (neon-http)
  db/seed.ts                   seeds the catalog tables from sample-catalog.ts (`pnpm db:seed`)
  db/schema/index.ts           schema entry point (re-exports ./catalog)
  db/schema/catalog.ts         categories, products (price_cents, stock_quantity), product_images (primary/hover/gallery) + relations
  lib/
    auth.ts / auth-client.ts   Better Auth server / React client
    catalog.ts                 async DB access: getProducts, getProductBySlug (React cache), getRelatedProducts, getHomepageCategories
    catalog-types.ts           domain types (Product, Category, CatalogImage); import with `import type`
    stock.ts                   getStockState(stock) → in_stock | low_stock (≤3) | sold_out (client-safe)
    env.ts                     throws on import if DATABASE_URL is missing
    format.ts                  formatPrice(cents) → "$3,650"
  styles/                      design system (see below)
drizzle.config.ts              loads .env.local / .env itself through dotenv
next.config.ts                 images.remotePatterns (images.unsplash.com/photo-**), qualities [75]
```

Server components are the default. Mark a component `"use client"` only when it needs state or effects (header scroll state, drawer, forms).

## Design system

Tailwind v4 is configured in CSS (there is no `tailwind.config.*`). `globals.css` imports four files:

- **`styles/theme.css`: tokens.** The default color, font-size, font-weight, tracking, radius and breakpoint scales are **reset** with `--*: initial`, so stock classes like `bg-white`, `text-gray-500`, `rounded-lg` and `text-4xl` **do not exist**.
  - Colors: `ink` (#000), `ink-muted` (#767676, AA-safe secondary text), `ink-subtle`, `paper` (#fff), `surface` (#fbfbfb image wells), `surface-strong`, `line` (#e6e6e6 hairlines), `line-strong`, `scrim`, `error`, `success`. The UI is monochrome; color comes from photography.
  - Type: `font-sans` = Jost (UI), `font-display` = Cormorant Garamond (display headings, wordmark). Sizes run `text-2xs`…`text-3xl` with built-in line height and slight negative tracking. Most UI text is 12px (`text-xs`).
  - Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1440 · `2xl` 1920.
  - Containers `max-w-prose|content|page`. Aspect ratios `aspect-product` (1/1), `aspect-portrait` (3/4), `aspect-landscape`, `aspect-hero`. Easing `ease-luxe`.
  - Responsive CSS vars on `:root`, exposed as spacing utilities: `--gutter` → `px-gutter` (16/24/40/64px), `--header-height` → `h-header` / `-mt-header`, `--section-space` → `py-section`, `--grid-gap` → `gap-grid`.
- **`styles/base.css`:** body defaults, hairline border color by default, `:focus-visible` outline, reduced-motion handling.
- **`styles/components.css`** (components layer, so utilities override it):
  - Buttons: `.btn` (48px, square corners, 12px bold uppercase) plus one of `.btn-primary` (solid black, one per view), `.btn-secondary` (1px outline), `.btn-inverse` / `.btn-outline-inverse` (on imagery), `.btn-sm`, and `.btn-icon` (icon-only; needs an `aria-label`).
  - Links: `.link` (always underlined), `.link-quiet` (underline on hover), `.link-nav` (muted, `aria-current="page"` makes it bold).
  - Type roles: `.text-label`, `.text-section-title`, `.text-page-title`, `.text-display`, `.wordmark`.
  - Forms and dividers: `.input`, `.divider`.
- **`styles/utilities.css`:** layout primitives defined with `@utility` (they work with variants):
  - Containers: `container-page`, `container-content`, `full-bleed`.
  - Spacing: `section` (vertical rhythm).
  - Grids: `grid-products` (2→3→4 columns, edge to edge) and `grid-editorial` (1→2→N columns, where N is set by `[--editorial-cols:N]`).
  - Media and layout: `layout-split`, `media-well` (square surface for `next/image fill`), `hero`, `site-header`, `scroller`.

Rules of thumb: square corners, hairline dividers, imagery edge to edge with text inset by `px-gutter`, at most one solid black button per view, and small uppercase bold labels for buttons and section kickers.

## Conventions and gotchas

- **Header overlay:** `SiteHeader` is transparent over the hero on routes listed in `OVERLAY_ROUTES` (`src/components/layout/site-header.tsx`). A page in that list must pull its first section under the header with `-mt-header`.
- **Images:** use `next/image` with `fill` + `sizes` inside a sized box. Remote images must match `images.remotePatterns`. Next 16 uses `preload` instead of the deprecated `priority`; use it only for the above-the-fold hero. Sample image URLs come from the `unsplash()` helper in `sample-catalog.ts`.
- **Prices** are integer cents. Format them with `formatPrice`.
- **Catalog data:** pages and components get catalog data from `src/lib/catalog.ts` and types from `src/lib/catalog-types.ts`. Only `src/db/seed.ts` imports `products` / `categories` from `sample-catalog.ts`. Category URLs are `/collections/{category.slug}`. Stock state comes from `src/lib/stock.ts`. Gallery close-ups use the `zoom()` helper (Unsplash focal-point crop).
- **Catalog changes:** edit `src/db/schema/catalog.ts`, then `pnpm db:generate` (review the SQL), `pnpm db:migrate`. Product images need exactly one `primary` row; a product without one is skipped with a warning.
- **Sample photos must not show brand names or logos.** Check new images at full size before using them. Several stock photos of watches, perfume and shoes show luxury brand logos.
- **Page titles** use the root layout template `%s | Atelier Store`. Set `title` in `generateMetadata`.
- **DB schema:** `src/db/schema/index.ts` is the single entry point for `drizzle.config.ts`, the db client and the Better Auth adapter. Re-export every new table file from it.
- **Adding auth tables:** run `pnpm auth:generate`, re-export `./auth` from the schema index, then `pnpm db:generate && pnpm db:migrate`. Re-run the generator whenever auth plugins or options change.
- **`nextCookies()`** must stay the last Better Auth plugin.
- **No `server-only` import** in `src/lib/auth.ts` or anything it imports (`src/db/*`, `src/lib/env.ts`). The Better Auth CLI can't load configs that import it.
- **Better Auth CLI** is the `auth` package (`pnpm exec auth …`), not the deprecated `@better-auth/cli`.
- **Hydration warnings in dev** that mention attributes on `<body>` (e.g. `cz-shortcut-listen`) come from browser extensions, not the app.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
