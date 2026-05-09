/**
 * PixtoLearn climbing visual cards — `public/cards/climbing/`
 * Same URL pattern as other `/cards/...` Pixto assets (Schedule / Focus bleed & scale).
 */

export const CLIMBING_PUBLIC_DIR = "/cards/climbing";

/** Back-of-card for swipe flip in this category (not a routine step). */
export const CLIMBING_BACK_CARD_FILE = "backcard5.png" as const;

/** Every PNG under public/cards/climbing/ except the back card (sorted A–Z). */
export const CLIMBING_CARD_FILES = [
  "boulder-wall.png",
  "carabiner.png",
  "climb-down.png",
  "climb-up.png",
  "climbing-shoes.png",
  "climbing-wall.png",
  "close-carabiner.png",
  "grab-hold.png",
  "grigri.png",
  "harness.png",
  "helmet.png",
  "hold-rope.png",
  "holds.png",
  "magnesium-bag.png",
  "make-an-eight-knot.png",
  "open-carabiner.png",
  "put-climbing-shoes-on.png",
  "put-harness-on.png",
  "put-helmet-on.png",
  "rope.png",
  "rub-your-palms.png",
  "step-on-hold.png",
] as const;

export type ClimbingCardFile = (typeof CLIMBING_CARD_FILES)[number];

export function climbingImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${CLIMBING_PUBLIC_DIR}/${base}.png`;
}

export function climbingBackCardUrl(): string {
  return `${CLIMBING_PUBLIC_DIR}/${CLIMBING_BACK_CARD_FILE}`;
}

/**
 * Routine order — basename without .png must exist in the folder above.
 * `backcard5` is only for flip feedback, not listed here.
 */
export const CLIMBING_SEQUENCE = [
  { id: "climbing-wall", slug: "climbing-wall", title: "Climbing wall" },
  { id: "climbing-rub-palms", slug: "rub-your-palms", title: "Rub your palms" },
  { id: "climbing-magnesium", slug: "magnesium-bag", title: "Magnesium bag" },
  { id: "climbing-put-helmet", slug: "put-helmet-on", title: "Put helmet on" },
  { id: "climbing-helmet", slug: "helmet", title: "Helmet" },
  { id: "climbing-put-harness", slug: "put-harness-on", title: "Put harness on" },
  { id: "climbing-harness", slug: "harness", title: "Harness" },
  { id: "climbing-put-shoes", slug: "put-climbing-shoes-on", title: "Put climbing shoes on" },
  { id: "climbing-shoes", slug: "climbing-shoes", title: "Climbing shoes" },
  { id: "climbing-rope", slug: "rope", title: "Rope" },
  { id: "climbing-eight-knot", slug: "make-an-eight-knot", title: "Make an eight knot" },
  { id: "climbing-carabiner", slug: "carabiner", title: "Carabiner" },
  { id: "climbing-open-carabiner", slug: "open-carabiner", title: "Open carabiner" },
  { id: "climbing-close-carabiner", slug: "close-carabiner", title: "Close carabiner" },
  { id: "climbing-grigri", slug: "grigri", title: "Grigri" },
  { id: "climbing-hold-rope", slug: "hold-rope", title: "Hold rope" },
  { id: "climbing-holds", slug: "holds", title: "Holds" },
  { id: "climbing-grab-hold", slug: "grab-hold", title: "Grab hold" },
  { id: "climbing-step-hold", slug: "step-on-hold", title: "Step on hold" },
  { id: "climbing-up", slug: "climb-up", title: "Climb up" },
  { id: "climbing-down", slug: "climb-down", title: "Climb down" },
  { id: "climbing-boulder", slug: "boulder-wall", title: "Boulder wall" },
] as const;
