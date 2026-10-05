import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductListing } from "@/components/product/product-listing";
import { getCategoryCollection, getCategorySlugs } from "@/lib/catalog";

// Products and stock live in the database; refresh each prerendered page at most once a minute.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCategoryCollection(slug);
  if (!collection) return {};

  return {
    title: collection.category.name,
    description: `Shop ${collection.category.name.toLowerCase()} from the atelier.`,
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = await getCategoryCollection(slug);
  if (!collection) notFound();

  return (
    <ProductListing
      title={collection.category.name}
      products={collection.products}
      emptyMessage="There are no pieces in this collection right now. Please check back soon."
    />
  );
}
