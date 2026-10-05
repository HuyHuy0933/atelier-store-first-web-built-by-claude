export type StockState = "in_stock" | "low_stock" | "sold_out";

/** At or below this many units a product is shown as "low stock". */
export const LOW_STOCK_THRESHOLD = 3;

export function getStockState(stock: number): StockState {
  if (stock <= 0) return "sold_out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}
