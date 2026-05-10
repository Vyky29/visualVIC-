/** Session draft: ordered pick ids from Library → routine builder. */
export const LIBRARY_SELECTION_DRAFT_KEY = "pixtolearn.libraryDraftPickIds.v1";

export function readLibrarySelectionDraft(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(LIBRARY_SELECTION_DRAFT_KEY);
    if (!raw) return [];
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) && v.every((x) => typeof x === "string") ? v : [];
  } catch {
    return [];
  }
}

export function writeLibrarySelectionDraft(pickIds: string[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      LIBRARY_SELECTION_DRAFT_KEY,
      JSON.stringify(pickIds),
    );
  } catch {
    /* */
  }
}

export function clearLibrarySelectionDraft(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(LIBRARY_SELECTION_DRAFT_KEY);
  } catch {
    /* */
  }
}
