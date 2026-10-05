// Catalog access. Pages call these instead of querying the database directly,
// so the storage details stay in this file.

import { asc, desc, eq, isNotNull, ne, sql } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { categories, productImages, products } from "@/db/schema";
import type { CatalogImage, Category, Product } from "@/lib/catalog-types";

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  images: (typeof productImages.$inferSelect)[];
};

const withRelations = {
  category: true as const,
  images: { orderBy: [asc(productImages.position)] },
};

function toImage(row: { url: string; alt: string }): CatalogImage {
  return { src: row.url, alt: row.alt };
}

function toProduct(row: ProductRow): Product | undefined {
  const primary = row.images.find((image) => image.kind === "primary");
  if (!primary) {
    console.warn(`[catalog] Product "${row.slug}" has no primary image; skipping it.`);
    return undefined;
  }
  const hover = row.images.find((image) => image.kind === "hover");

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: { slug: row.category.slug, name: row.category.name },
    price: row.priceCents,
    image: toImage(primary),
    hoverImage: hover ? toImage(hover) : undefined,
    gallery: row.images.filter((image) => image.kind === "gallery").map(toImage),
    badge: row.badge ?? undefined,
    styleCode: row.styleCode,
    color: row.color,
    stock: row.stockQuantity,
    description: row.description,
    details: row.details,
    care: row.care,
  };
}

function toProducts(rows: ProductRow[]): Product[] {
  return rows.map(toProduct).filter((product) => product !== undefined);
}

/** All products, newest first. */
export async function getProducts(): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt), asc(products.slug)],
  });
  return toProducts(rows);
}

/** Cached per request: the product page calls it from both generateMetadata and the page. */
export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
});

/** Same-category products first, then the rest of the catalog. Never includes the product itself. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const categoryId = db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, product.category.slug));
  const rows = await db.query.products.findMany({
    where: (p) => ne(p.id, product.id),
    with: withRelations,
    // Use the callback's columns: the relational query aliases the products table.
    orderBy: (p) => [desc(sql`${p.categoryId} = (${categoryId})`), desc(p.createdAt), asc(p.slug)],
    limit,
  });
  return toProducts(rows);
}

/** Categories shown as homepage tiles: those with an image, in display order. */
export async function getHomepageCategories(): Promise<Category[]> {
  const rows = await db
    .select()
    .from(categories)
    .where(isNotNull(categories.imageUrl))
    .orderBy(asc(categories.position), asc(categories.name));

  return rows.map((row) => ({
    slug: row.slug,
    title: row.name,
    href: `/collections/${row.slug}`,
    image: { src: row.imageUrl!, alt: row.imageAlt ?? row.name },
  }));
}
