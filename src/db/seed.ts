// Seeds the catalog tables from the sample fixtures in src/data/sample-catalog.ts.
// Idempotent: categories and products are upserted on slug, product images are replaced.
// Run with `pnpm db:seed` after `pnpm db:migrate`.

import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

async function main() {
  // Imported after dotenv: src/lib/env.ts throws on import if DATABASE_URL is missing.
  const { eq, sql } = await import("drizzle-orm");
  const { db } = await import("@/db");
  const { categories, productImages, products } = await import("@/db/schema");
  const sample = await import("@/data/sample-catalog");

  // Tile categories keep their images and order; categories that only appear on products get none.
  const categoryRows: (typeof categories.$inferInsert)[] = sample.categories.map((category, index) => ({
    slug: category.slug,
    name: category.title,
    imageUrl: category.image.src,
    imageAlt: category.image.alt,
    position: index,
  }));
  for (const product of sample.products) {
    if (!categoryRows.some((row) => row.name === product.category)) {
      categoryRows.push({
        slug: product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: product.category,
        imageUrl: null,
        imageAlt: null,
        position: categoryRows.length,
      });
    }
  }

  const savedCategories = await db
    .insert(categories)
    .values(categoryRows)
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: sql`excluded.name`,
        imageUrl: sql`excluded.image_url`,
        imageAlt: sql`excluded.image_alt`,
        position: sql`excluded.position`,
      },
    })
    .returning({ id: categories.id, name: categories.name });
  const categoryIdByName = new Map(savedCategories.map((row) => [row.name, row.id]));

  // Fixture order is newest first, so stagger created_at to keep it.
  const now = Date.now();
  for (const [index, product] of sample.products.entries()) {
    const categoryId = categoryIdByName.get(product.category);
    if (!categoryId) throw new Error(`No category for "${product.slug}"`);

    const values = {
      categoryId,
      slug: product.slug,
      name: product.name,
      description: product.description,
      care: product.care,
      styleCode: product.styleCode,
      color: product.color,
      priceCents: product.price,
      stockQuantity: product.stock,
      badge: product.badge ?? null,
      details: product.details,
      createdAt: new Date(now - index * 60_000),
    };
    const [{ id: productId }] = await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({ target: products.slug, set: { ...values, updatedAt: new Date() } })
      .returning({ id: products.id });

    const images = [
      { kind: "primary" as const, ...product.image, position: 0 },
      ...(product.hoverImage ? [{ kind: "hover" as const, ...product.hoverImage, position: 0 }] : []),
      ...product.gallery.map((image, i) => ({ kind: "gallery" as const, ...image, position: i })),
    ].map(({ kind, src, alt, position }) => ({ productId, kind, url: src, alt, position }));

    await db.batch([
      db.delete(productImages).where(eq(productImages.productId, productId)),
      db.insert(productImages).values(images),
    ]);
  }

  const [counts] = await db.execute<{ categories: number; products: number; images: number }>(sql`
    select
      (select count(*)::int from ${categories}) as categories,
      (select count(*)::int from ${products}) as products,
      (select count(*)::int from ${productImages}) as images
  `).then((result) => result.rows);
  console.log("Seeded catalog:", counts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
