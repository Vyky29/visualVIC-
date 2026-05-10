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

function isValidRoutine(x: unknown): x is Routine {
  if (!x || typeof x !== "object") return false;
  const r = x as Routine;
  return (
    typeof r.id === "string" &&
    typeof r.name === "string" &&
    Array.isArray(r.steps) &&
    r.steps.length > 0 &&
    r.steps.every(
      (s) =>
        s &&
        typeof (s as { id?: string }).id === "string" &&
        typeof (s as { title?: string }).title === "string",
    )
  );
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
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRoutines(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
    } catch {
      /* quota / private mode */
    }
    window.dispatchEvent(new Event("pixtolearn-custom-routines-changed"));
  }, [routines, hydrated]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setRoutines(loadFromStorage());
    };
    const onCustom = () => setRoutines(loadFromStorage());
    window.addEventListener("storage", onStorage);
    window.addEventListener("pixtolearn-custom-routines-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pixtolearn-custom-routines-changed", onCustom);
    };
  }, []);

  const addRoutine = useCallback((routine: Routine) => {
    setRoutines((prev) => {
      const i = prev.findIndex((r) => r.id === routine.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = routine;
        return next;
      }
      return [routine, ...prev];
    });
  }, []);

  const removeRoutine = useCallback((id: string) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const replaceRoutine = useCallback((routine: Routine) => {
    setRoutines((prev) => {
      const i = prev.findIndex((r) => r.id === routine.id);
      if (i < 0) return [routine, ...prev];
      const next = [...prev];
      next[i] = routine;
      return next;
    });
  }, []);

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
