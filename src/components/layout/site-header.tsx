"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BagIcon, MenuIcon, PlusIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MenuDrawer } from "@/components/layout/menu-drawer";

/** Routes whose first section is a full-bleed hero the header should float over. */
const OVERLAY_ROUTES = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const overlay = OVERLAY_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const transparent = overlay && !scrolled && !menuOpen;

  return (
    <>
      <header className="site-header" data-transparent={transparent}>
        <div className="container-page grid h-full grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-2">
            <Link
              href="/client-services"
              className="hidden items-center gap-2 text-xs font-bold transition-opacity hover:opacity-60 lg:inline-flex"
            >
              <PlusIcon className="size-3.5" />
              Client Services
            </Link>
            <button type="button" aria-label="Search" className="btn-icon -ml-2.5 lg:hidden">
              <SearchIcon />
            </button>
          </div>

          <Link href="/" className="wordmark" aria-label="Atelier, home">
            Atelier
          </Link>

          <nav aria-label="Utility" className="flex items-center justify-end gap-1 lg:gap-2">
            <Link href="/bag" aria-label="Shopping bag, 0 items" className="btn-icon">
              <BagIcon />
            </Link>
            <Link href="/account" aria-label="Account" className="btn-icon hidden lg:inline-flex">
              <UserIcon />
            </Link>
            <button type="button" aria-label="Search" className="btn-icon hidden lg:inline-flex">
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-drawer"
              className="-mr-2.5 inline-flex h-10 cursor-pointer items-center gap-2 px-2.5 text-xs font-bold uppercase transition-opacity hover:opacity-60"
            >
              <MenuIcon className="size-5" />
              <span className="hidden lg:inline">Menu</span>
              <span className="sr-only lg:hidden">Open menu</span>
            </button>
          </nav>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
