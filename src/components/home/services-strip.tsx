import type { ComponentType, SVGProps } from "react";

import { ChatIcon, GiftIcon, ReturnIcon, TruckIcon } from "@/components/icons";

const services: {
  title: string;
  body: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "Complimentary Shipping",
    body: "Free express delivery on every order, tracked to your door.",
    icon: TruckIcon,
  },
  {
    title: "Easy Returns",
    body: "Return or exchange within 30 days, collected from your home.",
    icon: ReturnIcon,
  },
  {
    title: "Signature Packaging",
    body: "Every order arrives wrapped and ready to give.",
    icon: GiftIcon,
  },
  {
    title: "Client Advisors",
    body: "Personal styling advice by chat, phone or appointment.",
    icon: ChatIcon,
  },
];

export function ServicesStrip() {
  return (
    <section aria-labelledby="services-title" className="section">
      <div className="container-page">
        <h2 id="services-title" className="text-section-title mb-10 text-center lg:mb-14">
          Atelier Services
        </h2>
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-gutter">
          {services.map(({ title, body, icon: Icon }) => (
            <li key={title} className="flex flex-col items-center gap-3 text-center">
              <Icon className="size-6" />
              <h3 className="text-label">{title}</h3>
              <p className="max-w-64 text-xs text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
