// Sample content. `products` and `categories` are seed fixtures: only src/db/seed.ts reads them,
// and the storefront gets catalog data from the database through src/lib/catalog.ts.
// The editorial content (hero, collections, story, navigation) is still read directly.
// Images are free-licensed photos from Unsplash (https://unsplash.com/license).

import type { CatalogImage, Category, Product } from "@/lib/catalog-types";

/** Product as written in this fixture: category is the display name, resolved to a row by the seed. */
export type SampleProduct = Omit<Product, "category"> & { category: string };

export type Collection = {
  slug: string;
  title: string;
  description?: string;
  href: string;
  image: CatalogImage;
};

function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Square close-up of a photo, zoomed in on a focal point (x/y as 0–1). */
function zoom(id: string, alt: string, x: number, y: number, z = 2.2): CatalogImage {
  return {
    src: `${unsplash(id, 1200)}&h=1200&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${z}`,
    alt,
  };
}

export const heroCampaign: Collection = {
  slug: "autumn-winter",
  title: "The Autumn–Winter Collection",
  description: "Tailoring in wool and cashmere, cut for the cold months.",
  href: "/collections/autumn-winter",
  image: {
    src: unsplash("1645561305502-63a9ba09ab09", 2400),
    alt: "Woman in sunglasses and a long tailored coat",
  },
};

export const categories: Category[] = [
  {
    slug: "handbags",
    title: "Handbags",
    href: "/collections/handbags",
    image: { src: unsplash("1624687943971-e86af76d57de", 1000), alt: "Brown leather handbag" },
  },
  {
    slug: "shoes",
    title: "Shoes",
    href: "/collections/shoes",
    image: { src: unsplash("1641893843833-a006778dc00b", 1000), alt: "Pair of leather shoes" },
  },
  {
    slug: "eyewear",
    title: "Eyewear",
    href: "/collections/eyewear",
    image: { src: unsplash("1610136649349-0f646f318053", 1000), alt: "Black framed sunglasses" },
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    href: "/collections/jewelry",
    image: { src: unsplash("1682823544433-aae34df4e3da", 1000), alt: "Gold jewelry in a white box" },
  },
];

export const featuredCollections: Collection[] = [
  {
    slug: "women",
    title: "Women's Collection",
    href: "/collections/women",
    image: {
      src: unsplash("1580478491436-fd6a937acc9e"),
      alt: "Woman in a red blazer sitting on stairs",
    },
  },
  {
    slug: "men",
    title: "Men's Collection",
    href: "/collections/men",
    image: {
      src: unsplash("1602346693719-c1c05078679e"),
      alt: "Man in a black leather jacket",
    },
  },
];

export const editorialStory: Collection = {
  slug: "the-atelier",
  title: "Made by Hand",
  description:
    "Every piece begins at the workbench. Our artisans cut, stitch and finish each bag over several days, using vegetable-tanned leathers that soften and deepen with wear.",
  href: "/stories/made-by-hand",
  image: {
    src: unsplash("1613800811878-3ef4c86da350"),
    alt: "Woman in a black coat standing in soft light",
  },
};

export const products: SampleProduct[] = [
  {
    id: "p-001",
    slug: "satchel-grey-calfskin",
    name: "Structured satchel in grey calfskin",
    category: "Handbags",
    price: 289000,
    badge: "New in",
    styleCode: "AT-H1024-GRY",
    color: "Grey",
    stock: 12,
    description:
      "A compact satchel with a softly structured body and a fold-over flap. Twin buckle straps close over a hidden magnetic fastening, and the top handle pairs with a detachable shoulder strap.",
    details: [
      "Grey calfskin with tonal stitching",
      "Gold-toned hardware",
      "Top handle and detachable, adjustable shoulder strap",
      "Magnetic closure under buckle straps",
      "Interior zip pocket and card slot",
      "W 26cm × H 19cm × D 9cm",
    ],
    care: "Store in the dust bag provided, away from direct sunlight. Wipe with a soft, dry cloth; do not use solvents.",
    image: { src: unsplash("1605733513597-a8f8341084e6", 1200), alt: "Grey leather satchel" },
    hoverImage: {
      src: unsplash("1613800812511-f094b509f9fb", 1200),
      alt: "Model in a black coat carrying a bag",
    },
    gallery: [zoom("1605733513597-a8f8341084e6", "Close-up of the satchel's buckles", 0.5, 0.6)],
  },
  {
    id: "p-002",
    slug: "duffle-black-pebbled",
    name: "Weekend duffle in black pebbled leather",
    category: "Handbags",
    price: 345000,
    styleCode: "AT-H2051-BLK",
    color: "Black",
    stock: 2,
    description:
      "A rounded duffle sized for a short trip. The full-grain pebbled leather is soft to the touch and resists everyday marks; buckled handle tabs and a two-way zip keep it secure.",
    details: [
      "Black pebbled full-grain leather",
      "Silver-toned buckles and zip",
      "Rolled double handles",
      "Two-way zip closure",
      "Cotton-twill lining with slip pocket",
      "W 40cm × H 24cm × D 22cm",
    ],
    care: "Fill with tissue when not in use to keep its shape. Treat with a neutral leather conditioner twice a year.",
    image: { src: unsplash("1705909237050-7a7625b47fac", 1200), alt: "Black leather duffle bag" },
    gallery: [zoom("1705909237050-7a7625b47fac", "Close-up of the duffle's buckle", 0.4, 0.55)],
  },
  {
    id: "p-003",
    slug: "top-handle-blush",
    name: "Mini top handle bag in blush leather",
    category: "Handbags",
    price: 215000,
    badge: "New in",
    styleCode: "AT-H0311-BLS",
    color: "Blush",
    stock: 0,
    description:
      "A small top handle bag with a quilted flap and a sculpted metal drop. Carry it by hand or wear it cross-body on the slim detachable strap.",
    details: [
      "Blush calfskin with quilted flap",
      "Gold-toned hardware",
      "Top handle and detachable cross-body strap",
      "Snap closure",
      "Leather lining",
      "W 20cm × H 15cm × D 8cm",
    ],
    care: "Keep away from dark fabrics, which may transfer colour. Wipe gently with a soft, dry cloth.",
    image: { src: unsplash("1681747685985-a401c271156c", 1200), alt: "Pink leather top handle bag" },
    gallery: [zoom("1681747685985-a401c271156c", "Close-up of the quilted flap", 0.5, 0.55)],
  },
  {
    id: "p-004",
    slug: "brogue-teal-calfskin",
    name: "Lace-up brogue in teal calfskin",
    category: "Shoes",
    price: 98000,
    styleCode: "AT-S4410-TEA",
    color: "Teal",
    stock: 5,
    description:
      "A classic wingtip brogue in hand-burnished calfskin, finished with tonal waxed laces and a stacked leather heel.",
    details: [
      "Teal calfskin with punched wingtip detailing",
      "Waxed cotton laces",
      "Leather lining and insole",
      "Stacked leather heel, 2.5cm",
      "Goodyear-welted leather sole",
    ],
    care: "Use shoe trees between wears. Clean with a soft brush and a neutral leather cream.",
    image: { src: unsplash("1571859856639-d54ab2c18ba0", 1200), alt: "Teal leather brogues" },
    gallery: [zoom("1571859856639-d54ab2c18ba0", "Close-up of the brogue detailing", 0.4, 0.55)],
  },
  {
    id: "p-005",
    slug: "sunglasses-browline-black",
    name: "Browline sunglasses in black acetate",
    category: "Eyewear",
    price: 54000,
    styleCode: "AT-E0702-BLK",
    color: "Black / gunmetal",
    stock: 20,
    description:
      "A browline frame pairing polished black acetate with a fine gunmetal rim and bridge. Gradient grey lenses offer full UV protection.",
    details: [
      "Black acetate brow and temples",
      "Gunmetal metal rims and bridge",
      "Gradient grey lenses, 100% UVA/UVB protection",
      "Lens width 51mm, bridge 21mm, temple 145mm",
      "Supplied with case and cleaning cloth",
    ],
    care: "Clean the lenses with the cloth provided. Store in the case to avoid scratches.",
    image: { src: unsplash("1584036553516-bf83210aa16c", 1200), alt: "Black browline sunglasses" },
    gallery: [zoom("1584036553516-bf83210aa16c", "Close-up of the browline frame", 0.5, 0.5)],
  },
  {
    id: "p-006",
    slug: "dress-watch-rose-gold",
    name: "Dress watch in rose gold, 36mm",
    category: "Watches",
    price: 185000,
    styleCode: "AT-W3601-RG",
    color: "Rose gold / taupe",
    stock: 1,
    description:
      "A slim dress watch with a clean white dial and fine rose-gold indices. The ultra-thin case slips easily under a shirt cuff.",
    details: [
      "36mm rose-gold-plated steel case, 6mm thick",
      "White lacquered dial with applied indices",
      "Swiss quartz movement",
      "Sapphire crystal",
      "Taupe calfskin strap with pin buckle",
    ],
    care: "Keep the strap away from water and perfume. Service every five years.",
    image: { src: unsplash("1524592094714-0f0654e20314", 1200), alt: "Rose-gold watch with a white dial" },
    gallery: [zoom("1524592094714-0f0654e20314", "Close-up of the watch dial", 0.45, 0.45)],
  },
  {
    id: "p-007",
    slug: "stacking-bangles-gold",
    name: "Stacking bangles in 18k yellow gold",
    category: "Jewelry",
    price: 198000,
    styleCode: "AT-J1802-YG",
    color: "Yellow gold",
    stock: 8,
    description:
      "A set of twisted openwork bangles in 18k yellow gold, set with pavé crystals and finished by hand. Wear them stacked or on their own.",
    details: [
      "18k yellow gold",
      "Twisted openwork design with pavé crystals",
      "Set of three",
      "Inner diameter 6cm",
      "Hallmarked",
    ],
    care: "Remove before swimming or applying fragrance. Polish with a soft jewelry cloth.",
    image: { src: unsplash("1611107683227-e9060eccd846", 1200), alt: "Gold bangles and rings" },
    gallery: [zoom("1611107683227-e9060eccd846", "Close-up of the openwork bangles", 0.6, 0.45)],
  },
  {
    id: "p-008",
    slug: "eau-de-parfum-ambre",
    name: "Ambre eau de parfum, 100ml",
    category: "Fragrance",
    price: 32000,
    styleCode: "AT-F0100-AMB",
    color: "100ml",
    stock: 30,
    description:
      "A warm, resinous amber built on labdanum and vanilla, lifted by bergamot and pink pepper. Long-lasting and close to the skin.",
    details: [
      "Top notes: bergamot, pink pepper",
      "Heart notes: iris, cedarwood",
      "Base notes: labdanum, vanilla, musk",
      "Eau de parfum concentration",
      "100ml refillable glass bottle",
    ],
    care: "Store upright, away from heat and direct light.",
    image: { src: unsplash("1594125311687-3b1b3eafa9f4", 1200), alt: "Square glass perfume bottles" },
    gallery: [zoom("1594125311687-3b1b3eafa9f4", "Close-up of the bottle", 0.5, 0.45)],
  },
];

export const navigation = [
  { title: "New In", href: "/collections/new-in" },
  { title: "Women", href: "/collections/women" },
  { title: "Men", href: "/collections/men" },
  { title: "Handbags", href: "/collections/handbags" },
  { title: "Shoes", href: "/collections/shoes" },
  { title: "Jewelry & Watches", href: "/collections/jewelry" },
  { title: "Fragrance", href: "/collections/fragrance" },
  { title: "Gifts", href: "/collections/gifts" },
];
