/**
 * Portal Vic origin + helpers to return from Planner / Plan handoff.
 */

export const STAFF_PORTAL_ORIGIN =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_STAFF_PORTAL_URL?.replace(/\/$/, "")
    : undefined) ?? "https://portalvic.vercel.app";

/** Default landing when opener tab is not available. */
export function staffPortalHomeUrl(): string {
  return `${STAFF_PORTAL_ORIGIN}/staff_dashboard.html`;
}

/**
 * Prefer focusing the Portal window that opened Plan; otherwise navigate home.
 * `window.close()` only works for script-opened windows (Portal uses window.open).
 */
export function returnToStaffPortal(): void {
  if (typeof window === "undefined") return;
  try {
    const opener = window.opener;
    if (opener && !opener.closed) {
      try {
        opener.focus();
      } catch {
        /* cross-origin focus may throw; still try close */
      }
      try {
        window.close();
        return;
      } catch {
        /* fall through to navigate */
      }
    }
  } catch {
    /* ignore */
  }
  window.location.assign(staffPortalHomeUrl());
}
