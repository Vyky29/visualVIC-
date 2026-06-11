/**
 * Pixto card sizes — single geometry (Focus 3-zone 384×560).
 *
 * Liked product references (do not change without review):
 * - Schedule NOW (288×420)
 * - Schedule NEXT (268×392)
 * - Focus Mode (384×560, stage-capped)
 * - First & Then demo — pink footer, landscape full + portrait mini (= NEXT)
 */

/** Focus 3-zone card (design px) — illustration-first. */
export const GENERATED_PIXTO_FOCUS_DESIGN_W = 384 as const;
export const GENERATED_PIXTO_FOCUS_DESIGN_H = 560 as const;

/** Focus stage max width on phone (28rem). */
export const GENERATED_PIXTO_FOCUS_STAGE_MAX_W_PX = 448 as const;

/** Optional expanded Focus stage cap. */
export const GENERATED_PIXTO_FOCUS_STAGE_EXPANDED_MAX_W_PX = 540 as const;

/** Day centre / First & Then pink ribbon (liked). */
export const PIXTO_CARD_CATEGORY_PINK = "#EC1D7A" as const;

function focusScaledSlot(scale: number) {
  return {
    w: Math.round(GENERATED_PIXTO_FOCUS_DESIGN_W * scale),
    h: Math.round(
      (GENERATED_PIXTO_FOCUS_DESIGN_W * scale * GENERATED_PIXTO_FOCUS_DESIGN_H) /
        GENERATED_PIXTO_FOCUS_DESIGN_W,
    ),
    scale,
  } as const;
}

/**
 * Named display slots — all derived from Focus 384×560 unless noted.
 * Thumbnails use crop aspects (10/13 or square), not the full card frame.
 */
export const PIXTO_CARD_SLOTS = {
  /** Focus Mode — largest; width capped by stage (448 / 540 px). */
  focus: {
    w: GENERATED_PIXTO_FOCUS_DESIGN_W,
    h: GENERATED_PIXTO_FOCUS_DESIGN_H,
    scale: 1,
  },
  /** Schedule · AHORA */
  now: focusScaledSlot(0.75),
  /** Schedule · SIGUIENTE, First & Then portrait stack */
  next: focusScaledSlot(268 / GENERATED_PIXTO_FOCUS_DESIGN_W),
  /** First & Then demo · Focus landscape (pink, full card) */
  firstThenLandscape: {
    w: GENERATED_PIXTO_FOCUS_DESIGN_W,
    h: GENERATED_PIXTO_FOCUS_DESIGN_H,
    scale: 1,
  },
  /** First & Then demo · portrait intro (= NEXT, pink 3-zone) */
  firstThenPortrait: focusScaledSlot(268 / GENERATED_PIXTO_FOCUS_DESIGN_W),
  /** Home continue / extras thumb (4.25rem, aspect 10/13) */
  thumbMd: { w: 68, h: 88 },
  /** Schedule done chip (3.25rem, aspect 10/13) */
  thumbSm: { w: 52, h: 68 },
  /** Player index square thumb */
  thumbNav: { w: 72, h: 72 },
  /** Library gallery tile reference (5/6 @ ~4-col phone) */
  thumbGallery: { w: 84, h: 100 },
} as const;

export type PixtoCardSlotId = keyof typeof PIXTO_CARD_SLOTS;

/** @deprecated Prefer `PIXTO_CARD_SLOTS.now.w` */
export const GENERATED_PIXTO_SCHEDULE_NOW_W = PIXTO_CARD_SLOTS.now.w;

/** @deprecated Prefer `PIXTO_CARD_SLOTS.next.w` */
export const GENERATED_PIXTO_SCHEDULE_NEXT_W = PIXTO_CARD_SLOTS.next.w;

/** @deprecated Prefer `PIXTO_CARD_SLOTS.now.h` */
export const GENERATED_PIXTO_SCHEDULE_NOW_H = PIXTO_CARD_SLOTS.now.h;

/** @deprecated Prefer `PIXTO_CARD_SLOTS.next.h` */
export const GENERATED_PIXTO_SCHEDULE_NEXT_H = PIXTO_CARD_SLOTS.next.h;

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
