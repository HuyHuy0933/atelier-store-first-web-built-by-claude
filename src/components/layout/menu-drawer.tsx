"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { CloseIcon } from "@/components/icons";
import { navigation } from "@/data/sample-catalog";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-500 ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={`absolute inset-0 bg-scrim transition-opacity duration-500 ease-luxe ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        id="menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper transition-transform duration-500 ease-luxe ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-header shrink-0 items-center justify-end px-gutter">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="btn-icon -mr-2.5">
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-gutter py-6">
          <ul className="flex flex-col gap-5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-xl font-medium transition-opacity hover:opacity-60"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 border-t px-gutter py-6">
          <Link href="/account" onClick={onClose} className="link-quiet text-xs font-medium">
            My Account
          </Link>
          <Link href="/client-services" onClick={onClose} className="link-quiet text-xs font-medium">
            Client Services
          </Link>
          <Link href="/stores" onClick={onClose} className="link-quiet text-xs font-medium">
            Store Locator
          </Link>
        </div>
      </div>
    </div>
  );
}
