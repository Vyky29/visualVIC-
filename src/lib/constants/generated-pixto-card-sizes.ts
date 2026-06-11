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

/**
 * Schedule visible caps = fraction of Focus design width (uniform scale of 744×1054).
 * NOW ≈ 75%, NEXT ≈ 70%.
 */
export const GENERATED_PIXTO_SCHEDULE_NOW_W = Math.round(
  GENERATED_PIXTO_FOCUS_DESIGN_W * 0.75,
) as 288;

export const GENERATED_PIXTO_SCHEDULE_NEXT_W = Math.round(
  GENERATED_PIXTO_FOCUS_DESIGN_W * 0.698,
) as 268;

/** Focus fixed zones — compact text/footer so illustration dominates (~69% of card height). */
export const GENERATED_PIXTO_FOCUS_FIXED_ZONE = {
  w: GENERATED_PIXTO_FOCUS_DESIGN_W,
  h: GENERATED_PIXTO_FOCUS_DESIGN_H,
  illustPadTop: 32,
  illustPadX: 20,
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
