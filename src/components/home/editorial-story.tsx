import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/data/sample-catalog";

/** Editorial block: large image with a short story beside it (stacked on mobile). */
export function EditorialStory({ story }: { story: Collection }) {
  return (
    <section aria-labelledby="story-title" className="grid border-y lg:grid-cols-2">
      <div className="relative aspect-portrait bg-surface lg:aspect-auto lg:min-h-[48rem]">
        <Image
          src={story.image.src}
          alt={story.image.alt}
          fill
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center px-gutter py-section">
        <div className="mx-auto flex max-w-md flex-col items-start gap-6">
          <p className="text-label text-ink-muted">The Atelier</p>
          <h2 id="story-title" className="text-display">
            {story.title}
          </h2>
          {story.description && <p className="text-base">{story.description}</p>}
          <Link href={story.href} className="link text-xs font-medium">
            Read the story
          </Link>
        </div>
      </div>
    </section>
  );
}
