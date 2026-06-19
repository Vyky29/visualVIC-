/**
 * Portal staff UI (restricted Home / Library) only applies when the user
 * explicitly entered from Portal Vic — not when browsing PixtoLearn standalone.
 *
 * Set via `markStaffPortalSession()` on auth handoff (wired later).
 */

const STAFF_PORTAL_SESSION_KEY = "pixto:staff-portal-session" as const;

export function isStaffPortalSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STAFF_PORTAL_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markStaffPortalSession(): void {
  try {
    sessionStorage.setItem(STAFF_PORTAL_SESSION_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearStaffPortalSession(): void {
  try {
    sessionStorage.removeItem(STAFF_PORTAL_SESSION_KEY);
  } catch {
    /* ignore */
  }
}
