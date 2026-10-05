const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Formats an integer amount in cents, e.g. 365000 → "$3,650". */
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}
