import { CategoryGrid } from "@/components/home/category-grid";
import { CollectionSplit } from "@/components/home/collection-split";
import { EditorialStory } from "@/components/home/editorial-story";
import { Hero } from "@/components/home/hero";
import { ServicesStrip } from "@/components/home/services-strip";
import { ProductGridSection } from "@/components/product/product-grid-section";
import { editorialStory, featuredCollections, heroCampaign } from "@/data/sample-catalog";
import { getHomepageCategories, getProducts } from "@/lib/catalog";

// Catalog data comes from the database; refresh the prerendered page at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const [categories, newArrivals] = await Promise.all([getHomepageCategories(), getProducts()]);

  return (
    <main className="flex-1">
      <Hero collection={heroCampaign} />
      <CategoryGrid categories={categories} />
      <CollectionSplit collections={featuredCollections} />
      <ProductGridSection
        id="new-arrivals-title"
        title="New Arrivals"
        subtitle="Pieces newly arrived from the atelier"
        href="/collections/new-in"
        products={newArrivals}
      />
      <EditorialStory story={editorialStory} />
      <ServicesStrip />
    </main>
  );
}
