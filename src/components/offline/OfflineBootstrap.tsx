"use client";

import { useEffect } from "react";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { prefetchRoutineAssets } from "@/lib/offline/prefetch-routine-assets";
import { saveOfflineRoutinesSnapshot } from "@/lib/offline/offline-routines-db";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";
import { listSchedulePlayerRecentRoutineIds } from "@/lib/preferences/schedule-player-recent-preference";

const RECENT_PREFETCH_LIMIT = 8;

/**
 * Keeps a local snapshot of routines and pre-caches card images for recently
 * opened schedules so Schedule Player works without network.
 */
export function OfflineBootstrap() {
  const { routines, hydrated } = useCustomRoutines();

  useEffect(() => {
    if (!hydrated || routines.length === 0) return;
    void saveOfflineRoutinesSnapshot(routines);
  }, [hydrated, routines]);

  useEffect(() => {
    if (!hydrated || !navigator.onLine) return;

    const recentIds = listSchedulePlayerRecentRoutineIds().slice(
      0,
      RECENT_PREFETCH_LIMIT,
    );
    if (recentIds.length === 0) return;

    let cancelled = false;

    void (async () => {
      for (const id of recentIds) {
        if (cancelled) return;
        const routine = resolveAnyRoutine(id, routines);
        if (routine) await prefetchRoutineAssets(routine);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hydrated, routines]);

  return null;
}
