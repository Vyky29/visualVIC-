/**
 * PixtoLearn core visual cards — `public/cards/core/`
 * Same URL pattern as other `/cards/...` Pixto assets (Schedule / Focus bleed & scale).
 */

export const CORE_PUBLIC_DIR = "/cards/core";

/** Grey ribbon — core self-care cues (wash hands, toilet, etc.). */
export const CORE_CATEGORY_LABEL = "Core" as const;
export const CORE_CATEGORY_COLOUR = "#CBCBC9" as const;

/** Back-of-card for swipe flip in this category (not a routine step). */
export const CORE_BACK_CARD_FILE = "backcard1.png" as const;

/** Every PNG under public/cards/core/ (sorted A–Z). */
export const CORE_CARD_FILES = [
  "backcard1.png",
  "break.png",
  "choose.png",
  "drink.png",
  "eat.png",
  "finish.png",
  "finish3D.png",
  "get.png",
  "give.png",
  "help.png",
  "hold-hands.png",
  "listen.png",
  "look.png",
  "more.png",
  "no.png",
  "put.png",
  "quiet.png",
  "sit-down.png",
  "speak.png",
  "stand.png",
  "stop.png",
  "toilet.png",
  "wait.png",
  "walk.png",
  "wash-hands.png",
  "welldone.png",
  "yes.png",
] as const;

export type CoreCardFile = (typeof CORE_CARD_FILES)[number];

export function coreImageUrl(slug: string): string {
  const base = slug.replace(/\.png$/i, "");
  return `${CORE_PUBLIC_DIR}/${base}.png`;
}

/** Retouched 531×648 finish illustration — used by playback finish step. */
export function coreFinishIllustrationUrl(): string {
  return coreImageUrl("finish3D");
}

export function coreBackCardUrl(): string {
  return `${CORE_PUBLIC_DIR}/${CORE_BACK_CARD_FILE}`;
}

/**
 * Routine order — basename without .png must exist in the folder above.
 * `backcard1` is only for flip feedback, not listed here.
 */
export const CORE_SEQUENCE = [
  { id: "core-wash-hands", slug: "wash-hands", title: "Wash hands" },
  { id: "core-toilet", slug: "toilet", title: "Toilet" },
  { id: "core-eat", slug: "eat", title: "Eat" },
  { id: "core-drink", slug: "drink", title: "Drink" },
  { id: "core-listen", slug: "listen", title: "Listen" },
  { id: "core-look", slug: "look", title: "Look" },
  { id: "core-speak", slug: "speak", title: "Speak" },
  { id: "core-quiet", slug: "quiet", title: "Quiet" },
  { id: "core-wait", slug: "wait", title: "Wait" },
  { id: "core-stand", slug: "stand", title: "Stand" },
  { id: "core-sit-down", slug: "sit-down", title: "Sit down" },
  { id: "core-walk", slug: "walk", title: "Walk" },
  { id: "core-hold-hands", slug: "hold-hands", title: "Hold hands" },
  { id: "core-help", slug: "help", title: "Help" },
  { id: "core-get", slug: "get", title: "Get" },
  { id: "core-put", slug: "put", title: "Put" },
  { id: "core-give", slug: "give", title: "Give" },
  { id: "core-yes", slug: "yes", title: "Yes" },
  { id: "core-no", slug: "no", title: "No" },
  { id: "core-stop", slug: "stop", title: "Stop" },
  { id: "core-choose", slug: "choose", title: "Choose" },
  { id: "core-more", slug: "more", title: "More" },
  { id: "core-break", slug: "break", title: "Break" },
  { id: "core-finish", slug: "finish3D", title: "Finish" },
  { id: "core-welldone", slug: "welldone", title: "Well done" },
] as const;
