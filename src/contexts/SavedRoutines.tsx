"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const KEY = "pixtolearn.savedRoutineIds.v1";

function loadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

type SavedCtx = {
  ids: string[];
  toggle: (routineId: string) => void;
  has: (routineId: string) => boolean;
};

const SavedRoutinesContext = createContext<SavedCtx | null>(null);

export function SavedRoutinesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(loadIds());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const toggle = useCallback((routineId: string) => {
    setIds((prev) =>
      prev.includes(routineId)
        ? prev.filter((id) => id !== routineId)
        : [...prev, routineId],
    );
  }, []);

  const has = useCallback(
    (routineId: string) => ids.includes(routineId),
    [ids],
  );

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has]);

  return (
    <SavedRoutinesContext.Provider value={value}>
      {children}
    </SavedRoutinesContext.Provider>
  );
}

export function useSavedRoutines() {
  const ctx = useContext(SavedRoutinesContext);
  if (!ctx)
    throw new Error("useSavedRoutines within SavedRoutinesProvider");
  return ctx;
}
