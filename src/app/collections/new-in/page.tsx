import type { Metadata } from "next";

import { ProductListing } from "@/components/product/product-listing";
import { getNewArrivals } from "@/lib/catalog";

// Catalog data comes from the database; refresh the prerendered page at most once a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest pieces from the atelier: handbags, shoes, jewelry and ready-to-wear, newly arrived.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <ProductListing
      title="New Arrivals"
      subtitle="Pieces newly arrived from the atelier"
      products={products}
      emptyMessage="New pieces are on their way. Please check back soon."
    />
  );
}
