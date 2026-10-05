// Catalog tables: categories, products (with stock) and product images.

import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  /** Homepage tile image. Categories without one get no tile. */
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    care: text("care").notNull(),
    styleCode: text("style_code").notNull().unique(),
    color: text("color").notNull(),
    priceCents: integer("price_cents").notNull(),
    /** Units available; 0 means sold out */
    stockQuantity: integer("stock_quantity").notNull().default(0),
    badge: text("badge"),
    details: text("details")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    check("products_price_cents_nonnegative", sql`${t.priceCents} >= 0`),
    check("products_stock_quantity_nonnegative", sql`${t.stockQuantity} >= 0`),
  ],
);

export const imageKind = pgEnum("image_kind", ["primary", "hover", "gallery"]);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    kind: imageKind("kind").notNull(),
    url: text("url").notNull(),
    alt: text("alt").notNull(),
    position: integer("position").notNull().default(0),
  },
  (t) => [
    index("product_images_product_id_idx").on(t.productId),
    uniqueIndex("product_images_one_primary_idx")
      .on(t.productId)
      .where(sql`${t.kind} = 'primary'`),
    uniqueIndex("product_images_one_hover_idx")
      .on(t.productId)
      .where(sql`${t.kind} = 'hover'`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));
