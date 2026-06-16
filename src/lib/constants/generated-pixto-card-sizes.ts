/**
 * Visible widths and Focus design frame — single source for size hierarchy.
 *
 * Focus on mobile = largest. Schedule NOW/NEXT scale down from Focus width caps.
 *
 * LOCKED — Focus routine card (`/focus/...`, FocusMode in player).
 * Agreed perfect digital geometry. Do not change without product review.
 * Every Focus surface must use only the exports in this section.
 */

/** Focus 3-zone card (design px) — routine Focus reference frame. */
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
 * Uniform outer corner radius for all Pixto card shells (NOW, NEXT, Focus, demos).
 * Matches Tailwind `rounded-3xl` (1.5rem).
 */
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_PX = 24 as const;
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS = "rounded-[1.5rem]" as const;

/**
 * Focus only — shrink the illustration render box inside its slot.
 * Clears the top-right pack mark; bottom stays on the title/action band.
 */
export const GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET = {
  topPx: 24,
  leftPx: 8,
  rightPx: 18,
  bottomPx: 0,
} as const;

/** Focus action band before 3-line expansion — locks illustration render height (px). */
export const GENERATED_PIXTO_FOCUS_ACTION_H_BASE = 72 as const;

/**
 * Focus routine card — 3-zone shell (illustration slot + white title + category ribbon).
 * @see GENERATED_PIXTO_FOCUS_ROUTINE_CARD_LOCKED
 */
export const GENERATED_PIXTO_FOCUS_FIXED_ZONE = {
  w: GENERATED_PIXTO_FOCUS_DESIGN_W,
  h: GENERATED_PIXTO_FOCUS_DESIGN_H,
  illustPadTop: 38,
  illustPadX: 40,
  illustPadBottom: 0,
  /** White title band — 3 lines at actionTitleFontPx; steals height from illust slot only. */
  actionH: 96,
  actionPadX: 16,
  actionTitleFontPx: 28,
  actionMaxLines: 3,
  footerH: 56,
  footerPadX: 16,
  footerTitleMaxFontPx: 22,
  illustBorder: 2,
  illustBorderColor: "#2cc55e",
  packMarkSize: 44,
  packMarkTop: 20,
  packMarkRight: 24,
} as const;

/**
 * Locked illustration render height (design px) — unchanged when actionH grows;
 * extra title lines push the illustration up inside the flex slot (overflow hidden top).
 */
export const GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H =
  (GENERATED_PIXTO_FOCUS_DESIGN_H -
    GENERATED_PIXTO_FOCUS_ACTION_H_BASE -
    GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerH -
    GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadTop -
    GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadBottom -
    GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET.topPx -
    GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET.bottomPx) as 370;

/** Single import for Focus routine geometry — player, demo, docs. */
export const GENERATED_PIXTO_FOCUS_ROUTINE_CARD_LOCKED = {
  designW: GENERATED_PIXTO_FOCUS_DESIGN_W,
  designH: GENERATED_PIXTO_FOCUS_DESIGN_H,
  zone: GENERATED_PIXTO_FOCUS_FIXED_ZONE,
  illustrationRenderInset: GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET,
  illustrationRenderBoxH: GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H,
  stageMaxW: GENERATED_PIXTO_FOCUS_STAGE_MAX_W_PX,
  stageExpandedMaxW: GENERATED_PIXTO_FOCUS_STAGE_EXPANDED_MAX_W_PX,
} as const;

/** @deprecated Legacy documented shell — pre 3-zone Focus. */
export const GENERATED_PIXTO_FOCUS_LEGACY_VISIBLE_W = 357.5 as const;
export const GENERATED_PIXTO_FOCUS_LEGACY_VISIBLE_H = 619.4 as const;
