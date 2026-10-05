import { getStockState } from "@/lib/stock";

const dotClass = {
  in_stock: "bg-success",
  low_stock: "bg-ink",
  sold_out: "border border-ink-subtle",
} as const;

export function StockStatus({ stock, className = "" }: { stock: number; className?: string }) {
  const state = getStockState(stock);
  const label =
    state === "sold_out"
      ? "Sold out"
      : state === "low_stock"
        ? `Only ${stock} left`
        : "In stock";

  return (
    <p
      className={`inline-flex items-center gap-2 text-xs ${state === "sold_out" ? "text-ink-muted" : ""} ${className}`}
      data-stock-state={state}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotClass[state]}`} />
      {label}
    </p>
  );
}
