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
 * 40px at the master 744×1054 design frame — scales with rendered width/height.
 */
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_PX = 40 as const;

/** 2.5px category-colour stroke on the card shell (all surfaces). */
export const GENERATED_PIXTO_CATEGORY_OUTLINE_WIDTH_PX = 2.5 as const;

/** Padding around scaled shells so borders are not clipped by overflow/transform. */
export const GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX = 2 as const;

/** @see {@link generatedPixtoCategoryOutlineStyle} */
export function generatedPixtoCategoryOutlineStyle(
  categoryColour: string,
  options?: { cardShadow?: boolean },
): { border: string; boxShadow: string } {
  const border = `${GENERATED_PIXTO_CATEGORY_OUTLINE_WIDTH_PX}px solid ${categoryColour}`;
  if (options?.cardShadow === false) {
    return { border, boxShadow: "none" };
  }
  return {
    border,
    boxShadow: `0 4px 14px -4px rgba(28, 36, 32, 0.12)`,
  };
}

/** Master generated-card design frame (px). */
export const GENERATED_PIXTO_CARD_DESIGN_W = 744 as const;
export const GENERATED_PIXTO_CARD_DESIGN_H = 1054 as const;

/**
 * Proportional shell radius — `calc` resolves against the element box so NOW/NEXT/Focus
 * thumbnails and scaled shells keep the same curvature ratio as 24px @ 744×1054.
 */
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_CALC =
  `calc(100% * ${GENERATED_PIXTO_CARD_CORNER_RADIUS_PX} / ${GENERATED_PIXTO_CARD_DESIGN_W}) / calc(100% * ${GENERATED_PIXTO_CARD_CORNER_RADIUS_PX} / ${GENERATED_PIXTO_CARD_DESIGN_H})` as const;

/** Inline style for shells that cannot use the Tailwind utility class. */
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE = {
  borderRadius: GENERATED_PIXTO_CARD_CORNER_RADIUS_CALC,
} as const;

/** @see {@link GENERATED_PIXTO_CARD_CORNER_RADIUS_CALC} in `globals.css` */
export const GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS =
  "pixto-card-shell-radius" as const;

/** Pixel radius for a known render width (uniform scale from master width). */
export function generatedPixtoCornerRadiusPx(renderWidthPx: number): number {
  return (
    (GENERATED_PIXTO_CARD_CORNER_RADIUS_PX * renderWidthPx) /
    GENERATED_PIXTO_CARD_DESIGN_W
  );
}

/**
 * Focus only — symmetric inset; pack mark sits in the parent slot margin.
 * Clears a sliver under the top-right glyph without shifting the PNG off-centre.
 */
export const GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET = {
  topPx: 12,
  leftPx: 0,
  rightPx: 0,
  bottomPx: 0,
} as const;

/**
 * Schedule / Focus — subtle contain zoom for 531×648 illustration slots.
 * Box size unchanged; PNG scales up inside `overflow-hidden` without cropping.
 */
export const GENERATED_PIXTO_DIGITAL_ILLUSTRATION_CONTAIN_ZOOM = 1.07 as const;

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
