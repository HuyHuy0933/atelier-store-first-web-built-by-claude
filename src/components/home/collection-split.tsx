import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/data/sample-catalog";

/** Two full-bleed campaign images side by side (stacked on mobile), each with an overlaid call to action. */
export function CollectionSplit({ collections }: { collections: Collection[] }) {
  return (
    <section aria-label="Featured collections" className="grid-editorial">
      {collections.map((collection) => (
        <article
          key={collection.slug}
          className="relative isolate flex aspect-portrait items-end justify-center overflow-hidden text-paper md:aspect-auto md:h-[min(100svh,64rem)]"
        >
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_60%,rgb(0_0_0/0.45))]"
          />
          <div className="flex flex-col items-center gap-4 px-gutter pb-12 text-center lg:pb-16">
            <h2 className="text-base font-medium">{collection.title}</h2>
            <Link href={collection.href} className="btn btn-outline-inverse">
              Shop now
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
