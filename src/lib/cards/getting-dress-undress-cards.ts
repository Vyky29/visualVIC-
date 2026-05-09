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
  "14_gloves.png",
  "14_shirtoff.png",
  "15_jumperon.png",
  "15_scarf.png",
  "16_jumperoff.png",
  "16_trunks.png",
  "17_jacketon.png",
  "17_swimsuit.png",
  "18_bra.png",
  "18_jacketoff.png",
  "19_capon.png",
  "19_knickers.png",
  "20_capoff.png",
  "21_haton.png",
  "22_hatoff.png",
  "23_shortson.png",
  "24_shortsoff.png",
  "25_trainerson.png",
  "26_trainersoff.png",
  "27_gloveson.png",
  "28_glovesoff.png",
  "29_scarfon.png",
  "30_scarfoff.png",
  "31_trunkson.png",
  "32_trunksoff.png",
  "33_swimsuiton.png",
  "34_swimsuitoff.png",
  "35_braon.png",
  "36_braoff.png",
  "37_knickerson.png",
  "38_knickersoff.png",
  "backcard2.png",
  "cap.png",
  "hat.png",
  "jacket.png",
  "jumper.png",
  "pants-off.png",
  "pants-on.png",
  "pants.png",
  "shirt-on.png",
  "shirt.png",
  "shoes-off.png",
  "shoes-on.png",
  "shoes.png",
  "shorts.png",
  "socks-off.png",
  "socks-on.png",
  "socks.png",
  "trainers.png",
  "trousers-off.png",
  "trousers-on.png",
  "trousers.png",
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

/**
 * Live routine order — basename without .png must exist in the folder above.
 * Uses semantic + numbered filenames as listed on disk.
 */
export const GETTING_DRESS_UNDRESS_SEQUENCE = [
  { id: "gd-socks-on", slug: "socks-on", title: "Put socks on" },
  { id: "gd-pants-on", slug: "pants-on", title: "Put pants on" },
  { id: "gd-tshirt-on", slug: "tshirt-on", title: "Put t-shirt on" },
  { id: "gd-shirt-on", slug: "shirt-on", title: "Put shirt on" },
  { id: "gd-vest-on", slug: "vest-on", title: "Put vest on" },
  { id: "gd-trousers-on", slug: "trousers-on", title: "Put trousers on" },
  { id: "gd-shoes-on", slug: "shoes-on", title: "Put shoes on" },
  { id: "gd-trainers", slug: "trainers", title: "Put trainers on" },
  { id: "gd-hat", slug: "hat", title: "Hat" },
  { id: "gd-hat-off", slug: "22_hatoff", title: "Take hat off" },
  { id: "gd-shoes-off", slug: "shoes-off", title: "Take shoes off" },
  { id: "gd-vest-off", slug: "vest-off", title: "Take vest off" },
  { id: "gd-shirt-off", slug: "14_shirtoff", title: "Take shirt off" },
  { id: "gd-tshirt-off", slug: "tshirt-off", title: "Take t-shirt off" },
  { id: "gd-trousers-off", slug: "trousers-off", title: "Take trousers off" },
  { id: "gd-pants-off", slug: "pants-off", title: "Take pants off" },
] as const;
