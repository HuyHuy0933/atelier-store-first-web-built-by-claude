import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/catalog-types";

type ProductGridSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  /** Optional "View all" destination */
  href?: string;
  products: Product[];
};

/** Centered uppercase title over an edge-to-edge product grid. */
export function ProductGridSection({ id, title, subtitle, href, products }: ProductGridSectionProps) {
  return (
    <section aria-labelledby={id} className="section">
      <div className="container-page mb-8 flex flex-col items-center gap-2 text-center lg:mb-12">
        <h2 id={id} className="text-section-title">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
      </div>

      <div className="grid-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {href && (
        <div className="container-page mt-10 flex justify-center lg:mt-14">
          <Link href={href} className="btn btn-secondary">
            View all
          </Link>
        </div>
      )}
    </section>
  );
}
