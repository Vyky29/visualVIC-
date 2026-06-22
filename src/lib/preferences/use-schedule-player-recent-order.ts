"use client";

import { useEffect, useMemo, useState } from "react";
import type { Routine } from "@/lib/types/routine";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";
import {
  listSchedulePlayerRecentRoutineIds,
  readSchedulePlayerRecentMap,
  SCHEDULE_PLAYER_RECENT_CHANGE_EVENT,
  sortRoutinesBySchedulePlayerRecent,
} from "@/lib/preferences/schedule-player-recent-preference";

function useSchedulePlayerRecentRevision(): number {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((n) => n + 1);
    window.addEventListener(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, bump);
    return () =>
      window.removeEventListener(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, bump);
  }, []);

  return revision;
}

/** Re-sorts when a routine is opened in Schedule Player (localStorage MRU). */
export function useSchedulePlayerRecentOrder<T extends { id: string }>(
  routines: readonly T[],
): T[] {
  const revision = useSchedulePlayerRecentRevision();

  return useMemo(() => {
    void revision;
    const recentMap = readSchedulePlayerRecentMap();
    return sortRoutinesBySchedulePlayerRecent(routines, recentMap);
  }, [routines, revision]);
}

/** Routines opened on this device (Schedule Player index). Most recent first. */
export function useSchedulePlayerUsedRoutines(
  customRoutines: readonly Routine[],
  mayOpenRoutine: (routine: Routine) => boolean,
): Routine[] {
  const revision = useSchedulePlayerRecentRevision();

  return useMemo(() => {
    void revision;
    const ids = listSchedulePlayerRecentRoutineIds();
    const out: Routine[] = [];
    for (const id of ids) {
      const routine = resolveAnyRoutine(id, customRoutines);
      if (!routine || !mayOpenRoutine(routine)) continue;
      out.push(routine);
    }
    return out;
  }, [customRoutines, mayOpenRoutine, revision]);
}
