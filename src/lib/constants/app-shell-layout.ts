/**
 * Layout tokens — phone vs iPad touch.
 *
 * Strategy:
 * - **Player / Focus / First & Then**: stock phone column (same UX as mobile), centered on iPad.
 * - **Library / Dashboard / Menu**: wider tablet chrome (2-col feel), not stretched single column.
 */

/** Match iPad Mini and similar touch tablets — not desktop mouse UI. */
export const TABLET_TOUCH_MEDIA =
  "(min-width: 740px) and (pointer: coarse)" as const;

/** First & Then focus — horizontal layout (landscape). */
export const FIRST_THEN_FOCUS_LANDSCAPE_MEDIA =
  "(min-width: 740px) and (orientation: landscape), (max-width: 739px) and (orientation: landscape) and (max-height: 500px)" as const;

/** Library, dashboard, menu, tailored lists — tablet chrome. */
export const APP_SHELL_CHROME_CLASS = "max-w-lg tablet:max-w-2xl";

/**
 * Schedule player, focus, first-then — never widen shell; cards scale inside only.
 * Matches original mobile layout on iPad (letterboxed sides).
 */
export const APP_SHELL_PLAYER_CLASS = "max-w-lg";

/** @deprecated Use APP_SHELL_CHROME_CLASS or APP_SHELL_PLAYER_CLASS per route. */
export const APP_SHELL_WIDTH_CLASS = APP_SHELL_CHROME_CLASS;

/** Schedule Player — stock phone column (unchanged on tablet). */
export const SCHEDULE_COLUMN_CLASS =
  "mx-auto w-full max-w-[min(100%,21rem)]";

/** First & Then intro — centered phone-width column inside tablet shell. */
export const TABLET_CONTENT_COLUMN_CLASS =
  "mx-auto w-full max-w-[min(100%,24rem)]";

/** Focus mode card stage — stock caps (do not widen on tablet). */
export const FOCUS_CARD_STAGE_CLASS = {
  default: "max-w-[min(100%,28rem)]",
  expanded: "max-w-[min(94vw,540px)]",
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

export function shellClassForPathname(pathname: string): string {
  return isPlayerShellRoute(pathname)
    ? APP_SHELL_PLAYER_CLASS
    : APP_SHELL_CHROME_CLASS;
}
