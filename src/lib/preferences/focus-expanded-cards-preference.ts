export const FOCUS_EXPANDED_CARDS_STORAGE_KEY = "pixtolearn-focus-expanded-cards";

export const FOCUS_EXPANDED_CARDS_CHANGE_EVENT =
  "pixtolearn-focus-expanded-cards-change";

export function readStoredFocusExpandedCards(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(FOCUS_EXPANDED_CARDS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeStoredFocusExpandedCards(enabled: boolean) {
  try {
    window.localStorage.setItem(
      FOCUS_EXPANDED_CARDS_STORAGE_KEY,
      enabled ? "1" : "0",
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent<boolean>(FOCUS_EXPANDED_CARDS_CHANGE_EVENT, {
      detail: enabled,
    }),
  );
}
