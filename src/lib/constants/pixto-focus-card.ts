/** Typical packed PNG (consistent ratio across Pixto cards). */
const PIXTO_FOCUS_CARD_PNG_W = 739;
const PIXTO_FOCUS_CARD_PNG_H = 1022;

/**
 * Pixto Focus design box (width × height before `scale`), design px.
 * Width is fixed; height = native PNG proportion + **extra height only** (no widening).
 */
export const PIXTO_FOCUS_CARD_REF_WIDTH_PX = 390;

const PIXTO_FOCUS_CARD_NATIVE_HEIGHT_PX =
  (PIXTO_FOCUS_CARD_REF_WIDTH_PX * PIXTO_FOCUS_CARD_PNG_H) /
  PIXTO_FOCUS_CARD_PNG_W;

/**
 * Extra pixels on height only (width unchanged); a bit more height = less top/bottom banding when scaled.
 */
export const PIXTO_FOCUS_CARD_EXTRA_HEIGHT_PX = 90;

export const PIXTO_FOCUS_CARD_REF_HEIGHT_PX =
  PIXTO_FOCUS_CARD_NATIVE_HEIGHT_PX + PIXTO_FOCUS_CARD_EXTRA_HEIGHT_PX;

/**
 * In Focus, stretch the bitmap downward only (top + sides anchored) to cover the strip under the PNG.
 * `scaleY(1 + this / REF_HEIGHT)`; does not change the asset or the logical width of the green box.
 */
export const FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX = 25;

/**
 * Optional scale cap (avoids huge sizing on desktop). Use a high number for “screen only” behavior.
 */
export const PIXTO_FOCUS_CARD_MAX_SCALE = 100;
