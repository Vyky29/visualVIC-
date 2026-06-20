/**
 * PixtoLearn swimming visual cards — `public/cards/swimming/`
 * Same URL pattern as other `/cards/...` assets (Schedule / Focus).
 */

export const SWIMMING_PUBLIC_DIR = "/cards/swimming";

/** Shipped swimming step PNGs (synced to folder on disk). */
export const SWIMMING_CARD_FILES = [
  "blow-bubbles.png",
  "float-on-back.png",
  "goggles-on.png",
  "kick-legs.png",
  "splash.png",
  "swim-cap-on.png",
  "swimming-shower.png",
  "wearing-flip-flops.png",
] as const;

export type SwimmingCardFile = (typeof SWIMMING_CARD_FILES)[number];

export function swimmingImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${SWIMMING_PUBLIC_DIR}/${base}.png`;
}

/** Pool visit flow — basename without .png must exist in the folder above. */
export const SWIMMING_SEQUENCE = [
  { id: "swim-cap-on", slug: "swim-cap-on", title: "Swim cap on" },
  { id: "swim-goggles", slug: "goggles-on", title: "Goggles on" },
  {
    id: "swim-flip-flops",
    slug: "wearing-flip-flops",
    title: "Wear flip-flops",
  },
  { id: "swim-bubbles", slug: "blow-bubbles", title: "Blow bubbles" },
  { id: "swim-kick", slug: "kick-legs", title: "Kick legs" },
  {
    id: "swim-float-back",
    slug: "float-on-back",
    title: "Float on back",
  },
  { id: "swim-splash", slug: "splash", title: "Splash" },
  {
    id: "swim-after-shower",
    slug: "swimming-shower",
    title: "Shower after swim",
  },
] as const;
