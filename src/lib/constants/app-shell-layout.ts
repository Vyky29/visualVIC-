/**
 * App shell + schedule card layout — phone vs iPad / tablet touch.
 *
 * iPad Mini portrait is 744 CSS px (below Tailwind `md` 768), so we use a
 * custom `tablet` breakpoint at 740px.
 */

/** Match iPad Mini and similar touch tablets — not desktop mouse UI. */
export const TABLET_TOUCH_MEDIA =
  "(min-width: 740px) and (pointer: coarse)" as const;

/**
 * First & Then focus — horizontal two-card layout.
 * Tablet: landscape only. Phone: landscape with short viewport height.
 */
export const FIRST_THEN_FOCUS_LANDSCAPE_MEDIA =
  "(min-width: 740px) and (orientation: landscape), (max-width: 739px) and (orientation: landscape) and (max-height: 500px)" as const;

/** Phone-width content column inside wider tablet shell. */
export const TABLET_CONTENT_COLUMN_CLASS = "mx-auto w-full max-w-[min(100%,24rem)]";

/** Shared shell width — phone column → near-full tablet width. */
export const APP_SHELL_WIDTH_CLASS = "max-w-lg tablet:max-w-3xl";

/** Schedule Player card column max width — same proportions as phone on all touch devices. */
export const SCHEDULE_COLUMN_CLASS =
  "max-w-[min(100%,21rem)] mx-auto";

/** Phone caps — see generated-pixto-card-sizes.ts */
export {
  GENERATED_PIXTO_SCHEDULE_NOW_W,
  GENERATED_PIXTO_SCHEDULE_NEXT_W,
} from "@/lib/constants/generated-pixto-card-sizes";

/** Larger schedule cards on tablet touch (same aspect as phone caps). */
export const GENERATED_PIXTO_SCHEDULE_NOW_TABLET_W = 400 as const;
export const GENERATED_PIXTO_SCHEDULE_NEXT_TABLET_W = 304 as const;

/** Focus stage caps (px) — inner card area, not full viewport. */
export const GENERATED_PIXTO_FOCUS_STAGE_TABLET_MAX_W_PX = 680 as const;
export const GENERATED_PIXTO_FOCUS_STAGE_TABLET_EXPANDED_MAX_W_PX = 720 as const;

export const FOCUS_CARD_STAGE_CLASS = {
  default:
    "max-w-[min(100%,28rem)] tablet:max-w-[min(100%,42rem)]",
  expanded:
    "max-w-[min(94vw,540px)] tablet:max-w-[min(94vw,720px)]",
} as const;
