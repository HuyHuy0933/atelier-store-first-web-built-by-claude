import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/lib/catalog-types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categories-title" className="section">
      <h2 id="categories-title" className="sr-only">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-grid lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={category.href} className="group flex flex-col">
              <div className="relative aspect-portrait overflow-hidden bg-surface">
                <Image
                  src={category.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                />
              </div>
              <span className="py-4 text-center text-xs font-medium lg:py-5">
                {category.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
