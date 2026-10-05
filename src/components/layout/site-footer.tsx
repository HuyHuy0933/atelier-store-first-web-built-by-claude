import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";

const footerLinks = [
  {
    title: "Client Services",
    links: [
      { title: "Contact Us", href: "/client-services" },
      { title: "Shipping", href: "/client-services/shipping" },
      { title: "Returns & Exchanges", href: "/client-services/returns" },
      { title: "Care Guide", href: "/client-services/care" },
      { title: "FAQ", href: "/client-services/faq" },
    ],
  },
  {
    title: "The House",
    links: [
      { title: "Our Story", href: "/stories/our-story" },
      { title: "Craftsmanship", href: "/stories/made-by-hand" },
      { title: "Sustainability", href: "/stories/sustainability" },
      { title: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/legal/privacy" },
      { title: "Terms of Sale", href: "/legal/terms" },
      { title: "Cookie Settings", href: "/legal/cookies" },
      { title: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-paper">
      <div className="container-page grid gap-12 py-section lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-gutter">
        <div className="flex max-w-md flex-col gap-4">
          <h2 className="text-label">Newsletter</h2>
          <p className="text-sm text-ink-muted">
            Be the first to hear about new collections, private events and stories from the
            atelier.
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-4">
              <h2 className="text-label">{group.title}</h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-quiet text-xs">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container-page flex flex-col items-center gap-6 border-t py-10">
        <p className="wordmark text-[clamp(3rem,14vw,12rem)] leading-none">Atelier</p>
        <p className="text-2xs text-ink-muted">
          © {new Date().getFullYear()} Atelier Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
