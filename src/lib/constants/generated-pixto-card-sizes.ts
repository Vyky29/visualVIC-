/**
 * Visible widths and Focus design frame — single source for size hierarchy.
 *
 * Focus on mobile = largest. Schedule NOW/NEXT and First & Then mini scale down
 * from the same locked 744×1054 digital geometry using the width caps below.
 */

/** Focus 3-zone card (design px) — illustration-first; used in player Focus. */
export const GENERATED_PIXTO_FOCUS_DESIGN_W = 384 as const;
export const GENERATED_PIXTO_FOCUS_DESIGN_H = 560 as const;

/** Focus stage max width on phone (28rem). */
export const GENERATED_PIXTO_FOCUS_STAGE_MAX_W_PX = 448 as const;

/** Optional expanded Focus stage cap. */
export const GENERATED_PIXTO_FOCUS_STAGE_EXPANDED_MAX_W_PX = 540 as const;

/** Schedule NOW — agreed cap (744×1054 uniform scale). */
export const GENERATED_PIXTO_SCHEDULE_NOW_W = 288 as const;

/** Schedule NEXT — agreed cap (744×1054 uniform scale). */
export const GENERATED_PIXTO_SCHEDULE_NEXT_W = 218 as const;

/**
 * Illustration slot trim — 3px narrower, 3px down from top; bottom stays on title/action band.
 */
export const GENERATED_PIXTO_ILLUSTRATION_SLOT_TRIM = {
  topPx: 3,
  widthPx: 3,
} as const;

const ILLUST_TRIM = GENERATED_PIXTO_ILLUSTRATION_SLOT_TRIM;

/** Focus fixed zones — compact text/footer so illustration dominates (~69% of card height). */
export const GENERATED_PIXTO_FOCUS_FIXED_ZONE = {
  w: GENERATED_PIXTO_FOCUS_DESIGN_W,
  h: GENERATED_PIXTO_FOCUS_DESIGN_H,
  illustPadTop: 32 + ILLUST_TRIM.topPx,
  illustPadX: 20 + ILLUST_TRIM.widthPx / 2,
  illustPadBottom: 12,
  actionH: 72,
  actionPadX: 16,
  actionTitleFontPx: 28,
  footerH: 56,
  footerPadX: 16,
  footerTitleMaxFontPx: 22,
  illustBorder: 2,
  illustBorderColor: "#2cc55e",
  packMarkSize: 24,
  packMarkTop: 12,
  packMarkRight: 20,
} as const;

/** @deprecated Legacy documented shell — pre 3-zone Focus. */
export const GENERATED_PIXTO_FOCUS_LEGACY_VISIBLE_W = 357.5 as const;
export const GENERATED_PIXTO_FOCUS_LEGACY_VISIBLE_H = 619.4 as const;
