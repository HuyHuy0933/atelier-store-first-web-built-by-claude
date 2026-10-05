import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGridSection } from "@/components/product/product-grid-section";
import { ProductInfo } from "@/components/product/product-info";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";

// Stock and prices live in the database; refresh each prerendered page at most once a minute.
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, alt: product.image.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const images = [product.image, ...product.gallery, ...(product.hoverImage ? [product.hoverImage] : [])];

  return (
    <main className="flex-1">
      <ProductGallery images={images} />

      <div className="container-page py-10 lg:py-16">
        <ProductInfo product={product} />
      </div>

      <div className="border-t">
        <ProductGridSection id="related-title" title="You May Also Like" products={related} />
      </div>
    </main>
  );
}
