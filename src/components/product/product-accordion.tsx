import type { ReactNode } from "react";

import { PlusIcon } from "@/components/icons";

export type AccordionItem = {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

/** Native <details> disclosure list with hairline dividers. No JavaScript needed. */
export function ProductAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="border-t">
      {items.map((item) => (
        <details key={item.title} open={item.defaultOpen} className="group border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
            {item.title}
            <PlusIcon className="size-4 shrink-0 transition-transform duration-300 ease-luxe group-open:rotate-45" />
          </summary>
          <div className="pb-6 text-sm text-ink-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
