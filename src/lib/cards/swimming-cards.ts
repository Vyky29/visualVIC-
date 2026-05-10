/**
 * PixtoLearn swimming visual cards — `public/cards/swimming/`
 * Same URL pattern as other `/cards/...` assets (Schedule / Focus).
 */

export const SWIMMING_PUBLIC_DIR = "/cards/swimming";

/** Every shipped swimming step PNG (no logos / draft filenames with spaces). */
export const SWIMMING_CARD_FILES = [
  "blow-bubbles.png",
  "changing-room.png",
  "flip-flops.png",
  "float-on-back.png",
  "float.png",
  "goggles-on.png",
  "googles.png",
  "jumping.png",
  "kick-legs.png",
  "pick-up-sinkers.png",
  "pool.png",
  "ready-for-swimming.png",
  "showers.png",
  "sinkers.png",
  "splash.png",
  "swim-cap-on.png",
  "swim-cap.png",
  "swimming-costume.png",
  "swimming-getting-dressed.png",
  "swimming-shower.png",
  "wearing-flip-flops.png",
] as const;

export type SwimmingCardFile = (typeof SWIMMING_CARD_FILES)[number];

export function swimmingImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${SWIMMING_PUBLIC_DIR}/${base}.png`;
}

/**
 * Pool visit flow — basename without .png must exist in the folder above.
 */
export const SWIMMING_SEQUENCE = [
  { id: "swim-changing-room", slug: "changing-room", title: "Changing room" },
  {
    id: "swim-costume",
    slug: "swimming-costume",
    title: "Swimming costume",
  },
  { id: "swim-cap-on", slug: "swim-cap-on", title: "Swim cap on" },
  { id: "swim-goggles", slug: "goggles-on", title: "Goggles on" },
  {
    id: "swim-flip-flops",
    slug: "wearing-flip-flops",
    title: "Wear flip-flops",
  },
  { id: "swim-showers", slug: "showers", title: "Shower before pool" },
  { id: "swim-pool", slug: "pool", title: "Pool" },
  {
    id: "swim-ready",
    slug: "ready-for-swimming",
    title: "Ready for swimming",
  },
  { id: "swim-bubbles", slug: "blow-bubbles", title: "Blow bubbles" },
  { id: "swim-kick", slug: "kick-legs", title: "Kick legs" },
  { id: "swim-float", slug: "float", title: "Float" },
  { id: "swim-splash", slug: "splash", title: "Splash" },
  { id: "swim-jump", slug: "jumping", title: "Jumping" },
  {
    id: "swim-float-back",
    slug: "float-on-back",
    title: "Float on back",
  },
  {
    id: "swim-pick-sinkers",
    slug: "pick-up-sinkers",
    title: "Pick up sinkers",
  },
  { id: "swim-sinkers", slug: "sinkers", title: "Sinkers" },
  { id: "swim-after-shower", slug: "swimming-shower", title: "Shower after swim" },
  {
    id: "swim-dressed-after",
    slug: "swimming-getting-dressed",
    title: "Get dressed after swimming",
  },
] as const;
