import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/data/sample-catalog";

export function Hero({ collection }: { collection: Collection }) {
  return (
    // Pulled up under the sticky header, which floats transparently over it.
    <section className="hero -mt-header">
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-[50%_30%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),transparent_25%,transparent_55%,rgb(0_0_0/0.55))]"
      />
      <div className="relative flex flex-col items-center gap-5 px-gutter pb-16 text-center lg:pb-20">
        <h1 className="text-display max-w-3xl">{collection.title}</h1>
        {collection.description && (
          <p className="max-w-md text-sm lg:text-base">{collection.description}</p>
        )}
        <Link href={collection.href} className="btn btn-inverse mt-2">
          Discover the collection
        </Link>
      </div>
    </section>
  );
}
