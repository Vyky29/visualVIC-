/**
 * PixtoLearn brushing-teeth visual cards — public/cards/brushing-teeth/
 * `BRUSHING_TEETH_CARD_FILES` mirrors the PNGs in that folder (source of truth).
 */

export const BRUSHING_TEETH_PUBLIC_DIR = "/cards/brushing-teeth";

/** Every PNG currently shipped under public/cards/brushing-teeth/ */
export const BRUSHING_TEETH_CARD_FILES = [
  "backcard3.png",
  "bottom-teeth.png",
  "brush-bottom-teeth.png",
  "brush-tongue.png",
  "brush-top-teeth.png",
  "check-teeths.png",
  "cup.png",
  "fill-cup-up.png",
  "get-toothbrush.png",
  "mouth.png",
  "put-toothbrush-away.png",
  "put-toothpaste.png",
  "rinse-mouth-with-water.png",
  "rinse-toothbrush.png",
  "spit-out-water.png",
  "spitout-toothpaste.png",
  "tap.png",
  "tongue.png",
  "toothbrush.png",
  "toothholder.png",
  "toothpaste.png",
  "top-teeth.png",
  "towel.png",
  "wipe-mouth.png",
] as const;

export type BrushingTeethCardFile = (typeof BRUSHING_TEETH_CARD_FILES)[number];

export function brushingTeethImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${BRUSHING_TEETH_PUBLIC_DIR}/${base}.png`;
}

/** Live routine order — basename without .png must exist in the folder above */
export const BRUSHING_TEETH_SEQUENCE = [
  { id: "bt-get-toothbrush", slug: "get-toothbrush", title: "Get toothbrush" },
  { id: "bt-toothpaste", slug: "toothpaste", title: "Toothpaste" },
  {
    id: "bt-put-toothpaste",
    slug: "put-toothpaste",
    title: "Put toothpaste on brush",
  },
  { id: "bt-fill-cup", slug: "fill-cup-up", title: "Fill cup up" },
  {
    id: "bt-brush-top",
    slug: "brush-top-teeth",
    title: "Brush top teeth",
  },
  {
    id: "bt-brush-bottom",
    slug: "brush-bottom-teeth",
    title: "Brush bottom teeth",
  },
  { id: "bt-brush-tongue", slug: "brush-tongue", title: "Brush tongue" },
  {
    id: "bt-rinse",
    slug: "rinse-mouth-with-water",
    title: "Rinse mouth with water",
  },
  {
    id: "bt-spit",
    slug: "spit-out-water",
    title: "Spit out water",
  },
  { id: "bt-wipe", slug: "wipe-mouth", title: "Wipe mouth" },
  {
    id: "bt-put-away",
    slug: "put-toothbrush-away",
    title: "Put toothbrush away",
  },
] as const;
