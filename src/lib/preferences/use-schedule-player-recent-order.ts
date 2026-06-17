"use client";

import { useEffect, useMemo, useState } from "react";
import {
  readSchedulePlayerRecentMap,
  SCHEDULE_PLAYER_RECENT_CHANGE_EVENT,
  sortRoutinesBySchedulePlayerRecent,
} from "@/lib/preferences/schedule-player-recent-preference";

/** Re-sorts when a routine is opened in Schedule Player (localStorage MRU). */
export function useSchedulePlayerRecentOrder<T extends { id: string }>(
  routines: readonly T[],
): T[] {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((n) => n + 1);
    window.addEventListener(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, bump);
    return () =>
      window.removeEventListener(SCHEDULE_PLAYER_RECENT_CHANGE_EVENT, bump);
  }, []);

  return useMemo(() => {
    void revision;
    const recentMap = readSchedulePlayerRecentMap();
    return sortRoutinesBySchedulePlayerRecent(routines, recentMap);
  }, [routines, revision]);
}
