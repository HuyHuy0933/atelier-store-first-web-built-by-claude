import Link from "next/link";

import { GiftIcon, ReturnIcon, TruckIcon } from "@/components/icons";
import { AddToBag } from "@/components/product/add-to-bag";
import { ProductAccordion } from "@/components/product/product-accordion";
import { StockStatus } from "@/components/product/stock-status";
import type { Product } from "@/lib/catalog-types";
import { formatPrice } from "@/lib/format";
import { getStockState } from "@/lib/stock";

const services = [
  { icon: TruckIcon, text: "Complimentary express delivery in 2–4 business days" },
  { icon: ReturnIcon, text: "Free returns and exchanges within 30 days" },
  { icon: GiftIcon, text: "Arrives in signature packaging" },
];

/** Two columns under the gallery: purchase block (left) and product content (right). Stacks below lg. */
export function ProductInfo({ product }: { product: Product }) {
  const categoryHref = `/collections/${product.category.slug}`;
  const soldOut = getStockState(product.stock) === "sold_out";

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-gutter xl:gap-32">
      <div className="flex flex-col gap-8 lg:max-w-md">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-2xs text-ink-muted">
            <li>
              <Link href="/" className="link-quiet">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryHref} className="link-quiet">
                {product.category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-3">
          <Link
            href={categoryHref}
            className="text-label w-fit text-ink-muted hover:text-ink"
          >
            {product.category.name}
          </Link>
          <h1 className="text-page-title">{product.name}</h1>
          <p className="text-base font-medium">{formatPrice(product.price)}</p>
          <StockStatus stock={product.stock} />
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-xs">
          <dt className="text-ink-muted">Color</dt>
          <dd>{product.color}</dd>
          <dt className="text-ink-muted">Style</dt>
          <dd>{product.styleCode}</dd>
        </dl>

        <AddToBag productName={product.name} soldOut={soldOut} />

        <ul className="flex flex-col gap-3">
          {services.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-xs">
              <Icon className="size-4 shrink-0" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-8">
        <ProductAccordion
          items={[
            {
              title: "Description",
              defaultOpen: true,
              content: <p className="text-ink">{product.description}</p>,
            },
            {
              title: "Product details",
              content: (
                <ul className="flex list-disc flex-col gap-1.5 pl-4">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ),
            },
            { title: "Care", content: <p>{product.care}</p> },
            {
              title: "Delivery & returns",
              content: (
                <p>
                  Orders are delivered by express courier with tracking. Returns are free within 30
                  days of delivery; items must be unworn, with tags and original packaging.
                </p>
              ),
            },
          ]}
        />

        <p className="text-xs text-ink-muted">
          Questions about this piece?{" "}
          <Link href="/client-services" className="link text-ink">
            Contact a client advisor
          </Link>
        </p>
      </div>
    </div>
  );
}
