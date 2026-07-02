"use client";

import { useEffect, useMemo, useState } from "react";
import {
  OFFLINE_PINNED_ROUTINES_CHANGE_EVENT,
  readOfflinePinnedRoutineIds,
} from "@/lib/offline/offline-pinned-routines";

function useOfflinePinnedRevision(): number {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((n) => n + 1);
    window.addEventListener(OFFLINE_PINNED_ROUTINES_CHANGE_EVENT, bump);
    return () =>
      window.removeEventListener(OFFLINE_PINNED_ROUTINES_CHANGE_EVENT, bump);
  }, []);

  return revision;
}

export function useOfflinePinnedRoutineIds(): string[] {
  const revision = useOfflinePinnedRevision();
  return useMemo(() => {
    void revision;
    return readOfflinePinnedRoutineIds();
  }, [revision]);
}

export function useIsRoutinePinnedOffline(routineId: string): boolean {
  const pinned = useOfflinePinnedRoutineIds();
  return pinned.includes(routineId);
}
