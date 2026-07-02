"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { parseTailoredParticipantTag } from "@/lib/routines/tailored-routine-meta";
import { isValidRoutine } from "@/lib/routines/validate-routine";
import {
  deleteParticipantSharedRoutine,
  fetchParticipantSharedRoutines,
  migrateLocalParticipantRoutinesToShared,
  participantIdFromRoutine,
  upsertParticipantSharedRoutine,
} from "@/lib/staff/participant-shared-routines";
import { fetchStaffPlannerAccess } from "@/lib/staff/fetch-staff-planner-access";
import { loadOfflineRoutinesSnapshot } from "@/lib/offline/offline-routines-db";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Routine } from "@/lib/types/routine";

const STORAGE_KEY = "pixtolearn.customRoutines.v1";

function loadFromStorage(): Routine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidRoutine);
  } catch {
    return [];
  }
}

function partitionLocalRoutines(all: readonly Routine[]): {
  deviceOnly: Routine[];
  participantLocal: Routine[];
} {
  if (!isSupabaseConfigured()) {
    return { deviceOnly: [...all], participantLocal: [] };
  }

  const deviceOnly: Routine[] = [];
  const participantLocal: Routine[] = [];
  for (const routine of all) {
    if (parseTailoredParticipantTag(routine.tags)) {
      participantLocal.push(routine);
    } else {
      deviceOnly.push(routine);
    }
  }
  return { deviceOnly, participantLocal };
}

function mergeRoutineLists(
  deviceOnly: readonly Routine[],
  shared: readonly Routine[],
): Routine[] {
  const byId = new Map<string, Routine>();
  for (const routine of deviceOnly) byId.set(routine.id, routine);
  for (const routine of shared) byId.set(routine.id, routine);
  return [...byId.values()];
}

type CustomRoutinesCtx = {
  routines: Routine[];
  hydrated: boolean;
  addRoutine: (routine: Routine) => void;
  removeRoutine: (id: string) => void;
  replaceRoutine: (routine: Routine) => void;
};

const CustomRoutinesContext = createContext<CustomRoutinesCtx | null>(null);

export function CustomRoutinesProvider({ children }: { children: ReactNode }) {
  const [deviceOnlyRoutines, setDeviceOnlyRoutines] = useState<Routine[]>([]);
  const [sharedRoutines, setSharedRoutines] = useState<Routine[]>([]);
  const [localHydrated, setLocalHydrated] = useState(false);
  const [sharedHydrated, setSharedHydrated] = useState(!isSupabaseConfigured());
  const migrationDone = useRef(false);

  const routines = useMemo(
    () => mergeRoutineLists(deviceOnlyRoutines, sharedRoutines),
    [deviceOnlyRoutines, sharedRoutines],
  );

  const hydrated = localHydrated && sharedHydrated;

  const persistDeviceOnly = useCallback((next: Routine[]) => {
    setDeviceOnlyRoutines(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* quota / private mode */
    }
  }, []);

  const refreshSharedRoutines = useCallback(async () => {
    const applyOfflineSharedFallback = async () => {
      if (!navigator.onLine) {
        const offline = await loadOfflineRoutinesSnapshot();
        const sharedOnly = offline.filter((r) => participantIdFromRoutine(r));
        if (sharedOnly.length > 0) {
          setSharedRoutines(sharedOnly);
        }
      }
    };

    if (!isSupabaseConfigured()) {
      setSharedRoutines([]);
      setSharedHydrated(true);
      return;
    }

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setSharedRoutines([]);
      setSharedHydrated(true);
      return;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setSharedRoutines([]);
        setSharedHydrated(true);
        return;
      }

      const accessResult = await fetchStaffPlannerAccess(supabase, userId);
      if (!accessResult.ok) {
        await applyOfflineSharedFallback();
        setSharedHydrated(true);
        return;
      }

      if (!migrationDone.current) {
        const stored = loadFromStorage();
        const { participantLocal } = partitionLocalRoutines(stored);
        if (participantLocal.length > 0) {
          await migrateLocalParticipantRoutinesToShared(
            supabase,
            accessResult.access,
            participantLocal,
            userId,
          );
          const { deviceOnly } = partitionLocalRoutines(stored);
          persistDeviceOnly(deviceOnly);
        }
        migrationDone.current = true;
      }

      const fetched = await fetchParticipantSharedRoutines(
        supabase,
        accessResult.access,
      );
      setSharedRoutines(fetched);
      setSharedHydrated(true);
    } catch {
      await applyOfflineSharedFallback();
      setSharedHydrated(true);
    }
  }, [persistDeviceOnly]);

  useEffect(() => {
    const stored = loadFromStorage();
    if (!isSupabaseConfigured()) {
      setDeviceOnlyRoutines(stored);
    } else {
      const { deviceOnly, participantLocal } = partitionLocalRoutines(stored);
      setDeviceOnlyRoutines([...deviceOnly, ...participantLocal]);
    }
    setLocalHydrated(true);
  }, []);

  useEffect(() => {
    void refreshSharedRoutines();
  }, [refreshSharedRoutines]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createBrowserSupabase();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      migrationDone.current = false;
      setSharedHydrated(false);
      void refreshSharedRoutines();
    });

    return () => subscription.unsubscribe();
  }, [refreshSharedRoutines]);

  /** Other browser tabs only (`storage` does not fire in the tab that wrote). */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const stored = loadFromStorage();
      if (!isSupabaseConfigured()) {
        setDeviceOnlyRoutines(stored);
        return;
      }
      const { deviceOnly, participantLocal } = partitionLocalRoutines(stored);
      setDeviceOnlyRoutines([...deviceOnly, ...participantLocal]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const upsertDeviceOnlyRoutine = useCallback((routine: Routine) => {
    setDeviceOnlyRoutines((prev) => {
      const i = prev.findIndex((r) => r.id === routine.id);
      const next =
        i >= 0
          ? prev.map((r, idx) => (idx === i ? routine : r))
          : [routine, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* quota */
      }
      return next;
    });
  }, []);

  const upsertSharedRoutineLocal = useCallback((routine: Routine) => {
    setSharedRoutines((prev) => {
      const i = prev.findIndex((r) => r.id === routine.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = routine;
        return next;
      }
      return [routine, ...prev];
    });
  }, []);

  const persistParticipantRoutine = useCallback(
    async (routine: Routine) => {
      const participantId = participantIdFromRoutine(routine);
      if (!participantId) return;

      if (!isSupabaseConfigured()) {
        upsertDeviceOnlyRoutine(routine);
        return;
      }

      const supabase = createBrowserSupabase();
      if (!supabase) {
        upsertDeviceOnlyRoutine(routine);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        upsertDeviceOnlyRoutine(routine);
        return;
      }

      upsertSharedRoutineLocal(routine);
      await upsertParticipantSharedRoutine(
        supabase,
        routine,
        participantId,
        userId,
      );
    },
    [upsertDeviceOnlyRoutine, upsertSharedRoutineLocal],
  );

  const syncParticipantRoutine = useCallback(
    async (routine: Routine, mode: "upsert" | "delete") => {
      if (!isSupabaseConfigured()) return;
      const participantId = participantIdFromRoutine(routine);
      if (!participantId) return;

      const supabase = createBrowserSupabase();
      if (!supabase) return;

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) return;

      if (mode === "delete") {
        const ok = await deleteParticipantSharedRoutine(supabase, routine.id);
        if (ok) {
          setSharedRoutines((prev) => prev.filter((r) => r.id !== routine.id));
        }
        return;
      }

      const ok = await upsertParticipantSharedRoutine(
        supabase,
        routine,
        participantId,
        userId,
      );
      if (ok) {
        setSharedRoutines((prev) => {
          const i = prev.findIndex((r) => r.id === routine.id);
          if (i >= 0) {
            const next = [...prev];
            next[i] = routine;
            return next;
          }
          return [routine, ...prev];
        });
      }
    },
    [],
  );

  const addRoutine = useCallback(
    (routine: Routine) => {
      if (participantIdFromRoutine(routine)) {
        void persistParticipantRoutine(routine);
        return;
      }
      upsertDeviceOnlyRoutine(routine);
    },
    [persistParticipantRoutine, upsertDeviceOnlyRoutine],
  );

  const removeRoutine = useCallback(
    (id: string) => {
      const existing = routines.find((r) => r.id === id);
      if (existing && participantIdFromRoutine(existing)) {
        void syncParticipantRoutine(existing, "delete");
        return;
      }

      setDeviceOnlyRoutines((prev) => {
        const next = prev.filter((r) => r.id !== id);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* quota */
        }
        return next;
      });
    },
    [routines, syncParticipantRoutine],
  );

  const replaceRoutine = useCallback(
    (routine: Routine) => {
      if (participantIdFromRoutine(routine)) {
        void persistParticipantRoutine(routine);
        return;
      }
      upsertDeviceOnlyRoutine(routine);
    },
    [persistParticipantRoutine, upsertDeviceOnlyRoutine],
  );

  const value = useMemo(
    () => ({
      routines,
      hydrated,
      addRoutine,
      removeRoutine,
      replaceRoutine,
    }),
    [routines, hydrated, addRoutine, removeRoutine, replaceRoutine],
  );

  return (
    <CustomRoutinesContext.Provider value={value}>
      {children}
    </CustomRoutinesContext.Provider>
  );
}

export function useCustomRoutines() {
  const ctx = useContext(CustomRoutinesContext);
  if (!ctx)
    throw new Error("useCustomRoutines must be used within CustomRoutinesProvider");
  return ctx;
}
