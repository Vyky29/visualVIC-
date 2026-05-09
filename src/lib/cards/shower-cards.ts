/**
 * PixtoLearn shower visual cards — `public/cards/shower/`
 * Same URL pattern as other `/cards/...` Pixto assets (Schedule / Focus bleed & scale).
 */

export const SHOWER_PUBLIC_DIR = "/cards/shower";

/** Back-of-card for swipe flip in this category (not a routine step). */
export const SHOWER_BACK_CARD_FILE = "backcard4.png" as const;

/** Every PNG under public/cards/shower/ except the back card (sorted A–Z). */
export const SHOWER_CARD_FILES = [
  "body-lotion.png",
  "brush-hair.png",
  "brush.png",
  "comb.png",
  "conditioner.png",
  "dry-body.png",
  "dry-hair.png",
  "gel.png",
  "hair-dryer.png",
  "hydratate-body.png",
  "massage-hair.png",
  "rinse-body.png",
  "rinse-hair.png",
  "shampoo.png",
  "shower.png",
  "sponge.png",
  "squeeze-conditioner.png",
  "squeeze-gel.png",
  "squeeze-shampoo.png",
  "towel.png",
  "wash-body.png",
  "wash-hair.png",
  "wet-hair.png",
] as const;

export type ShowerCardFile = (typeof SHOWER_CARD_FILES)[number];

export function showerImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${SHOWER_PUBLIC_DIR}/${base}.png`;
}

export function showerBackCardUrl(): string {
  return `${SHOWER_PUBLIC_DIR}/${SHOWER_BACK_CARD_FILE}`;
}

/**
 * Routine order — basename without .png must exist in the folder above.
 * `backcard4` is only for flip feedback, not listed here.
 */
export const SHOWER_SEQUENCE = [
  { id: "shower-shower", slug: "shower", title: "Shower" },
  { id: "shower-wet-hair", slug: "wet-hair", title: "Wet hair" },
  { id: "shower-sponge", slug: "sponge", title: "Sponge" },
  { id: "shower-brush", slug: "brush", title: "Brush" },
  { id: "shower-wash-body", slug: "wash-body", title: "Wash body" },
  { id: "shower-rinse-body", slug: "rinse-body", title: "Rinse body" },
  { id: "shower-squeeze-shampoo", slug: "squeeze-shampoo", title: "Squeeze shampoo" },
  { id: "shower-shampoo", slug: "shampoo", title: "Shampoo" },
  { id: "shower-wash-hair", slug: "wash-hair", title: "Wash hair" },
  { id: "shower-massage-hair", slug: "massage-hair", title: "Massage hair" },
  { id: "shower-rinse-hair", slug: "rinse-hair", title: "Rinse hair" },
  { id: "shower-squeeze-conditioner", slug: "squeeze-conditioner", title: "Squeeze conditioner" },
  { id: "shower-conditioner", slug: "conditioner", title: "Conditioner" },
  { id: "shower-rinse-after-conditioner", slug: "rinse-hair", title: "Rinse conditioner" },
  { id: "shower-dry-body", slug: "dry-body", title: "Dry body" },
  { id: "shower-towel", slug: "towel", title: "Towel" },
  { id: "shower-dry-hair", slug: "dry-hair", title: "Dry hair" },
  { id: "shower-brush-hair", slug: "brush-hair", title: "Brush hair" },
  { id: "shower-comb", slug: "comb", title: "Comb" },
  { id: "shower-hair-dryer", slug: "hair-dryer", title: "Hair dryer" },
  { id: "shower-squeeze-gel", slug: "squeeze-gel", title: "Squeeze gel" },
  { id: "shower-gel", slug: "gel", title: "Gel" },
  { id: "shower-hydratate-body", slug: "hydratate-body", title: "Hydrate body" },
  { id: "shower-body-lotion", slug: "body-lotion", title: "Body lotion" },
] as const;
