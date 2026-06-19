/**
 * Layout tokens — phone vs iPad touch.
 *
 * Strategy: phone column on small screens; **full tablet width** on every in-app surface.
 */

/** Layout width breakpoint — iPad Mini portrait; does not require coarse pointer. */
export const TABLET_LAYOUT_MEDIA = "(min-width: 740px)" as const;

/** Match iPad Mini and similar touch tablets — not desktop mouse UI. */
export const TABLET_TOUCH_MEDIA =
  "(min-width: 740px) and (pointer: coarse)" as const;

/** First & Then focus — horizontal layout (landscape). */
export const FIRST_THEN_FOCUS_LANDSCAPE_MEDIA =
  "(min-width: 740px) and (orientation: landscape), (max-width: 739px) and (orientation: landscape) and (max-height: 500px)" as const;

/** All tab-shell routes — phone column; full width on tablet. */
export const APP_SHELL_WIDTH_CLASS = "max-w-lg tablet:max-w-none";

/** @deprecated Alias for {@link APP_SHELL_WIDTH_CLASS}. */
export const APP_SHELL_CHROME_CLASS = APP_SHELL_WIDTH_CLASS;

/** @deprecated Alias for {@link APP_SHELL_WIDTH_CLASS}. */
export const APP_SHELL_PLAYER_CLASS = APP_SHELL_WIDTH_CLASS;

/** Horizontal inset for page content on tablet (pairs with full-width shell). */
export const APP_SHELL_TABLET_INSET_CLASS = "tablet:px-6";

/** Schedule NOW card max width on tablet (px) — scales up from phone caps. */
export const TABLET_SCHEDULE_NOW_CARD_MAX_W_PX = 500 as const;

/** Schedule NEXT card max width on tablet — same ratio as phone NOW/NEXT. */
export const TABLET_SCHEDULE_NEXT_CARD_MAX_W_PX = Math.round(
  (TABLET_SCHEDULE_NOW_CARD_MAX_W_PX * 218) / 288,
) as const;

/** Schedule Player column — full width on tablet; cards scale inside. */
export const SCHEDULE_COLUMN_CLASS =
  "mx-auto w-full max-w-[min(100%,21rem)] tablet:max-w-none";

/** First & Then intro — full width on tablet. */
export const TABLET_CONTENT_COLUMN_CLASS =
  "mx-auto w-full max-w-[min(100%,24rem)] tablet:max-w-none";

/** Focus mode card stage — near full width on tablet. */
export const FOCUS_CARD_STAGE_CLASS = {
  default:
    "w-full max-w-[min(100%,28rem)] tablet:max-w-[min(calc(100vw-3rem),42rem)]",
  expanded:
    "w-full max-w-[min(94vw,540px)] tablet:max-w-[min(calc(100vw-2.5rem),48rem)]",
} as const;

export function isPlayerShellRoute(pathname: string): boolean {
  if (pathname.startsWith("/player")) return true;
  if (pathname.startsWith("/focus")) return true;
  if (pathname === "/first-then" || pathname.startsWith("/first-then/")) {
    return true;
  }
  if (pathname === "/first-then-demo" || pathname.startsWith("/first-then-demo/")) {
    return true;
  }
  return false;
}

export function shellClassForPathname(_pathname: string): string {
  return APP_SHELL_WIDTH_CLASS;
}
