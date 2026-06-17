/**
 * Day Centre · Premium — curated core / dress / shower / swim vocabulary for staff.
 */

export type DayCentrePremiumSourcePack = "dress" | "shower" | "swim";

export type DayCentrePremiumPickSpec = {
  slug: string;
  title: string;
  sourcePack: DayCentrePremiumSourcePack;
};

/** Premium folder library — changing, shower basics, swim essentials. */
export const DAY_CENTRE_PREMIUM_PICKS: readonly DayCentrePremiumPickSpec[] = [
  // Swim & changing — male
  { slug: "shoes-on", title: "Put shoes on", sourcePack: "dress" },
  { slug: "shoes-off", title: "Take shoes off", sourcePack: "dress" },
  { slug: "socks-on", title: "Put socks on", sourcePack: "dress" },
  { slug: "socks-off", title: "Take socks off", sourcePack: "dress" },
  { slug: "trunks-on", title: "Put trunks on", sourcePack: "dress" },
  { slug: "trunks-off", title: "Take trunks off", sourcePack: "dress" },
  { slug: "pants-on", title: "Put pants on", sourcePack: "dress" },
  { slug: "trousers-on", title: "Put trousers on", sourcePack: "dress" },
  { slug: "trousers-off", title: "Take trousers off", sourcePack: "dress" },
  { slug: "tshirt-on", title: "Put t-shirt on", sourcePack: "dress" },
  { slug: "tshirt-off", title: "Take t-shirt off", sourcePack: "dress" },
  { slug: "jumper-on", title: "Put jumper on", sourcePack: "dress" },
  { slug: "jumper-off", title: "Take jumper off", sourcePack: "dress" },
  // Swim & changing — female
  { slug: "swimsuit-on", title: "Put swimming costume on", sourcePack: "dress" },
  { slug: "swimsuit-off", title: "Take swimming costume off", sourcePack: "dress" },
  { slug: "knickers-on", title: "Put knickers on", sourcePack: "dress" },
  { slug: "knickers-off", title: "Take knickers off", sourcePack: "dress" },
  { slug: "bra-on", title: "Put bra on", sourcePack: "dress" },
  { slug: "bra-off", title: "Take bra off", sourcePack: "dress" },
  // Swim accessories
  { slug: "wearing-flip-flops", title: "Wear flip-flops", sourcePack: "swim" },
  { slug: "goggles-on", title: "Goggles on", sourcePack: "swim" },
  // Shower basics
  { slug: "squeeze-shampoo", title: "Shampoo in hair", sourcePack: "shower" },
  { slug: "sponge", title: "Rub with sponge", sourcePack: "shower" },
  { slug: "rinse-hair", title: "Rinse hair", sourcePack: "shower" },
  { slug: "dry-body", title: "Dry body", sourcePack: "shower" },
  { slug: "dry-hair", title: "Dry hair", sourcePack: "shower" },
] as const;

export const DAY_CENTRE_PREMIUM_SLUGS = new Set(
  DAY_CENTRE_PREMIUM_PICKS.map((p) => p.slug),
);
