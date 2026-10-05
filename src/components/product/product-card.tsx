import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/catalog-types";
import { formatPrice } from "@/lib/format";
import { getStockState } from "@/lib/stock";

const SIZES = "(min-width: 90rem) 25vw, (min-width: 64rem) 33vw, 50vw";

export function ProductCard({ product }: { product: Product }) {
  const { slug, name, price, image, hoverImage, badge, stock } = product;
  const soldOut = getStockState(stock) === "sold_out";

  return (
    <article className="group relative flex flex-col bg-surface">
      <Link href={`/products/${slug}`} className="flex flex-1 flex-col">
        <div className="media-well">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={SIZES}
            className="object-cover transition-opacity duration-500 ease-luxe group-hover:opacity-90"
          />
          {hoverImage && (
            <Image
              src={hoverImage.src}
              alt=""
              fill
              sizes={SIZES}
              className="object-cover opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100"
            />
          )}
          {badge && (
            <span className="absolute top-3 left-3 z-10 bg-paper px-1.5 py-0.5 text-2xs font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 bg-paper px-3 pt-3 pb-8 lg:pb-12">
          <h3 className="text-xs font-normal">{name}</h3>
          <p className="text-xs font-medium">{formatPrice(price)}</p>
          {soldOut && <p className="text-xs text-ink-muted">Sold out</p>}
        </div>
      </Link>
    </article>
  );
}
