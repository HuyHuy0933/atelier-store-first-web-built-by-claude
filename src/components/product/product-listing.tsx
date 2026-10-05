import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/catalog-types";

type ProductListingProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  /** Shown instead of the grid when there are no products */
  emptyMessage: string;
};

/** Full listing page body: page title, item count, then an edge-to-edge product grid. */
export function ProductListing({ title, subtitle, products, emptyMessage }: ProductListingProps) {
  const count = `${products.length} ${products.length === 1 ? "item" : "items"}`;

  return (
    <main className="flex-1">
      <header className="container-page flex flex-col items-center gap-2 pt-10 pb-8 text-center lg:pt-16 lg:pb-12">
        <h1 className="text-page-title">{title}</h1>
        {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
      </header>

      <section aria-label={title} className="border-t pb-section">
        <div className="container-page flex h-12 items-center">
          <p className="text-xs text-ink-muted">{count}</p>
        </div>

        {products.length > 0 ? (
          <div className="grid-products">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="container-page flex flex-col items-center gap-6 py-section text-center">
            <p className="text-xs text-ink-muted">{emptyMessage}</p>
            <Link href="/collections/new-in" className="btn btn-secondary">
              Shop new arrivals
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
