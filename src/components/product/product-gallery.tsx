"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { CatalogImage } from "@/lib/catalog-types";

/**
 * Full-screen horizontal carousel: one image per slide, filling the viewport below the header.
 * Swipe or trackpad scroll (scroll-snap), arrow buttons, keyboard arrows and position dots.
 */
export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(count - 1, index));
    setActive(next);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Product images"
      onKeyDown={onKeyDown}
      className="relative h-[calc(100svh-var(--header-height))] min-h-80 bg-surface"
    >
      <ul
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        className="scroller h-full outline-offset-[-2px]"
      >
        {images.map((image, index) => (
          <li
            key={image.src}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className="relative h-full w-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous image"
            className="btn-icon absolute top-1/2 left-gutter hidden -translate-y-1/2 bg-paper/80 disabled:opacity-0 md:inline-flex"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
            aria-label="Next image"
            className="btn-icon absolute top-1/2 right-gutter hidden -translate-y-1/2 bg-paper/80 disabled:opacity-0 md:inline-flex"
          >
            <ChevronRightIcon />
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-paper px-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active}
                className="flex h-6 cursor-pointer items-center"
              >
                <span
                  className={`block h-0.5 transition-all duration-300 ease-luxe ${index === active ? "w-8 bg-ink" : "w-4 bg-ink/30"}`}
                />
              </button>
            ))}
          </div>

          <p aria-live="polite" className="absolute right-gutter bottom-5 bg-paper px-2 py-1 text-2xs font-medium">
            {active + 1} / {count}
          </p>
        </>
      )}
    </section>
  );
}
