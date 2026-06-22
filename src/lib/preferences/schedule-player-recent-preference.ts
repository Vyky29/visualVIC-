/** MRU timestamps for Schedule Player index — routine id → last opened ms. */
export const SCHEDULE_PLAYER_RECENT_STORAGE_KEY =
  "pixtolearn-schedule-player-recent";

export const SCHEDULE_PLAYER_RECENT_CHANGE_EVENT =
  "pixtolearn-schedule-player-recent-change";

export type SchedulePlayerRecentMap = Record<string, number>;

export function readSchedulePlayerRecentMap(): SchedulePlayerRecentMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SCHEDULE_PLAYER_RECENT_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: SchedulePlayerRecentMap = {};
    for (const [id, ts] of Object.entries(parsed)) {
      if (typeof ts === "number" && Number.isFinite(ts)) {
        out[id] = ts;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function touchSchedulePlayerRoutine(routineId: string) {
  if (typeof window === "undefined" || !routineId.trim()) return;
  const map = readSchedulePlayerRecentMap();
  map[routineId] = Date.now();
  try {
    window.localStorage.setItem(
      SCHEDULE_PLAYER_RECENT_STORAGE_KEY,
      JSON.stringify(map),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, { detail: routineId }),
  );
}

export function removeSchedulePlayerRoutine(routineId: string) {
  if (typeof window === "undefined" || !routineId.trim()) return;
  const map = readSchedulePlayerRecentMap();
  if (!(routineId in map)) return;
  delete map[routineId];
  try {
    window.localStorage.setItem(
      SCHEDULE_PLAYER_RECENT_STORAGE_KEY,
      JSON.stringify(map),
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, { detail: routineId }),
  );
}

/** Routine ids opened on this device, most recent first. */
export function listSchedulePlayerRecentRoutineIds(
  recentMap: SchedulePlayerRecentMap = readSchedulePlayerRecentMap(),
): string[] {
  return Object.entries(recentMap)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);
}

/** Most recently opened first; never-opened routines keep catalog order at the bottom. */
export function sortRoutinesBySchedulePlayerRecent<T extends { id: string }>(
  routines: readonly T[],
  recentMap: SchedulePlayerRecentMap,
): T[] {
  const index = new Map(routines.map((r, i) => [r.id, i]));
  return [...routines].sort((a, b) => {
    const ta = recentMap[a.id] ?? 0;
    const tb = recentMap[b.id] ?? 0;
    if (ta !== tb) return tb - ta;
    return (index.get(a.id) ?? 0) - (index.get(b.id) ?? 0);
  });
}
