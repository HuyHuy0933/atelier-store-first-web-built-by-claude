// Catalog domain types shared by pages and components (server and client).
// Type-only: importing this never pulls in the database client.

export type CatalogImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: { slug: string; name: string };
  /** Price in cents */
  price: number;
  image: CatalogImage;
  /** Optional second shot revealed on hover */
  hoverImage?: CatalogImage;
  /** Extra product-page images shown after `image` */
  gallery: CatalogImage[];
  badge?: string;
  styleCode: string;
  color: string;
  /** Units available; 0 means sold out */
  stock: number;
  description: string;
  details: string[];
  care: string;
};

export type Category = {
  slug: string;
  title: string;
  href: string;
  image: CatalogImage;
};
