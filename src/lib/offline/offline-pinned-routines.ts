export const OFFLINE_PINNED_ROUTINES_STORAGE_KEY =
  "pixtolearn.offlinePinnedRoutineIds.v1";

export const OFFLINE_PINNED_ROUTINES_CHANGE_EVENT =
  "pixtolearn-offline-pinned-change";

export function readOfflinePinnedRoutineIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(OFFLINE_PINNED_ROUTINES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string => typeof id === "string" && id.trim().length > 0,
    );
  } catch {
    return [];
  }
}

export function isRoutinePinnedOffline(routineId: string): boolean {
  return readOfflinePinnedRoutineIds().includes(routineId);
}

function writeOfflinePinnedRoutineIds(ids: readonly string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      OFFLINE_PINNED_ROUTINES_STORAGE_KEY,
      JSON.stringify([...ids]),
    );
  } catch {
    /* quota */
  }
  window.dispatchEvent(new CustomEvent(OFFLINE_PINNED_ROUTINES_CHANGE_EVENT));
}

export function pinRoutineOffline(routineId: string) {
  if (!routineId.trim()) return;
  const ids = readOfflinePinnedRoutineIds();
  if (ids.includes(routineId)) return;
  writeOfflinePinnedRoutineIds([routineId, ...ids]);
}

export function unpinRoutineOffline(routineId: string) {
  const ids = readOfflinePinnedRoutineIds().filter((id) => id !== routineId);
  writeOfflinePinnedRoutineIds(ids);
}

export function listOfflinePinnedRoutineIds(): string[] {
  return readOfflinePinnedRoutineIds();
}
