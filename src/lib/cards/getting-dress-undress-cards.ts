/**
 * PixtoLearn getting dressed / undressed visual cards —
 * `public/cards/getting-dress-&-undress/`
 * `GETTING_DRESS_UNDRESS_CARD_FILES` mirrors every PNG in that folder (source of truth).
 */

/**
 * URL path for `next/image` and the browser: `&` in a path must be `%26` or the HTML
 * parser can treat `&` as starting a query/entity — then Pixto URLs fail `isPixtoLearnBundledCardUrl`
 * and Schedule/Focus lose bleed/focus scaling (same issue would not affect `/cards/brushing-teeth/`).
 * On disk the folder remains `getting-dress-&-undress`; Next resolves this encoded segment correctly.
 */
export const GETTING_DRESS_UNDRESS_PUBLIC_DIR =
  "/cards/getting-dress-%26-undress";

/** Back-of-card asset in this folder (not a routine step). */
export const GETTING_DRESS_UNDRESS_BACK_CARD_FILE = "backcard2.png" as const;

/** Every PNG currently under public/cards/getting-dress-&-undress/ (sorted A–Z). */
export const GETTING_DRESS_UNDRESS_CARD_FILES = [
  "backcard2.png",
  "bra-off.png",
  "bra-on.png",
  "bra.png",
  "cap-off.png",
  "cap-on.png",
  "cap.png",
  "gloves-off.png",
  "gloves-on.png",
  "gloves.png",
  "hat-off.png",
  "hat-on.png",
  "hat.png",
  "jacket-off.png",
  "jacket-on.png",
  "jacket.png",
  "jumper-off.png",
  "jumper-on.png",
  "jumper.png",
  "knickers-off.png",
  "knickers-on.png",
  "knickers.png",
  "pants-off.png",
  "pants-on.png",
  "pants.png",
  "scarf-off.png",
  "scarf-on.png",
  "scarf.png",
  "shirt-off.png",
  "shirt-on.png",
  "shirt.png",
  "shoes-off.png",
  "shoes-on.png",
  "shoes.png",
  "shorts-off.png",
  "shorts-on.png",
  "shorts.png",
  "socks-off.png",
  "socks-on.png",
  "socks.png",
  "swimsuit-off.png",
  "swimsuit-on.png",
  "swimsuit.png",
  "trainers-off.png",
  "trainers-on.png",
  "trainers.png",
  "trousers-off.png",
  "trousers-on.png",
  "trousers.png",
  "trunks-off.png",
  "trunks-on.png",
  "trunks.png",
  "tshirt-off.png",
  "tshirt-on.png",
  "tshirt.png",
  "vest-off.png",
  "vest-on.png",
  "vest.png",
] as const;

export type GettingDressUndressCardFile =
  (typeof GETTING_DRESS_UNDRESS_CARD_FILES)[number];

export function gettingDressUndressImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${GETTING_DRESS_UNDRESS_PUBLIC_DIR}/${base}.png`;
}

export function gettingDressUndressBackCardUrl(): string {
  return `${GETTING_DRESS_UNDRESS_PUBLIC_DIR}/${GETTING_DRESS_UNDRESS_BACK_CARD_FILE}`;
}
