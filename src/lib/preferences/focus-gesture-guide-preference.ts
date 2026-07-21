export const FOCUS_GESTURE_GUIDE_STORAGE_KEY =
  "pixtolearn-focus-gesture-guide-seen";

export const FOCUS_GESTURE_GUIDE_CHANGE_EVENT =
  "pixtolearn-focus-gesture-guide-seen-change";

export function readStoredFocusGestureGuideSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(FOCUS_GESTURE_GUIDE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeStoredFocusGestureGuideSeen(seen: boolean) {
  try {
    window.localStorage.setItem(
      FOCUS_GESTURE_GUIDE_STORAGE_KEY,
      seen ? "1" : "0",
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent<boolean>(FOCUS_GESTURE_GUIDE_CHANGE_EVENT, {
      detail: seen,
    }),
  );
}
