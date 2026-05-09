"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Routine, RoutineStep } from "@/lib/types/routine";

export type PlaybackStatus = "idle" | "now" | "next" | "finished";

type PlaybackSnapshot = {
  completed: string[];
  skipped: string[];
};

function parseStored(raw: string | null): PlaybackSnapshot {
  if (!raw) return { completed: [], skipped: [] };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return { completed: parsed as string[], skipped: [] };
    }
    if (
      parsed &&
      typeof parsed === "object" &&
      "completed" in parsed &&
      Array.isArray((parsed as PlaybackSnapshot).completed)
    ) {
      const p = parsed as PlaybackSnapshot;
      return {
        completed: p.completed,
        skipped: Array.isArray(p.skipped) ? p.skipped : [],
      };
    }
  } catch {
    /* ignore */
  }
  return { completed: [], skipped: [] };
}

function loadSnapshot(key: string): PlaybackSnapshot {
  if (typeof window === "undefined") return { completed: [], skipped: [] };
  return parseStored(sessionStorage.getItem(key));
}

function saveSnapshot(key: string, snapshot: PlaybackSnapshot) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(snapshot));
}

export function useRoutinePlayback(
  routine: Routine,
  options?: { syncSession?: boolean },
) {
  const storageKey = options?.syncSession
    ? `pixtolearn.playback.${routine.id}`
    : null;

  const steps = routine.steps;
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(!storageKey);

  useEffect(() => {
    if (!storageKey) return;
    const snap = loadSnapshot(storageKey);
    setCompletedIds(new Set(snap.completed));
    setSkippedIds(new Set(snap.skipped));
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || !hydrated) return;
    saveSnapshot(storageKey, {
      completed: [...completedIds],
      skipped: [...skippedIds],
    });
  }, [storageKey, completedIds, skippedIds, hydrated]);

  const nowIndex = useMemo(() => {
    return steps.findIndex(
      (s) => !completedIds.has(s.id) && !skippedIds.has(s.id),
    );
  }, [steps, completedIds, skippedIds]);

  const nowStep: RoutineStep | null =
    nowIndex >= 0 ? steps[nowIndex] : null;

  const nextStep: RoutineStep | null = useMemo(() => {
    if (nowIndex < 0) return null;
    for (let i = nowIndex + 1; i < steps.length; i++) {
      const s = steps[i];
      if (!completedIds.has(s.id) && !skippedIds.has(s.id)) return s;
    }
    return null;
  }, [steps, nowIndex, completedIds, skippedIds]);

  const isComplete = useMemo(() => {
    if (steps.length === 0) return true;
    return steps.every((s) => completedIds.has(s.id));
  }, [steps, completedIds]);

  const finishedSteps = useMemo(
    () => steps.filter((s) => completedIds.has(s.id)),
    [steps, completedIds],
  );

  const upcomingSteps = useMemo(() => {
    if (nowIndex < 0 || !nowStep) return [];
    const out: RoutineStep[] = [];
    for (let i = nowIndex + 1; i < steps.length; i++) {
      const s = steps[i];
      if (!completedIds.has(s.id) && !skippedIds.has(s.id)) out.push(s);
    }
    return out;
  }, [steps, nowIndex, nowStep, completedIds, skippedIds]);

  const completedCount = finishedSteps.length;
  const totalSteps = steps.length;

  const completeCurrent = useCallback(() => {
    if (!nowStep) return;
    setCompletedIds((prev) => new Set(prev).add(nowStep.id));
    setSkippedIds((prev) => {
      if (!prev.has(nowStep.id)) return prev;
      const next = new Set(prev);
      next.delete(nowStep.id);
      return next;
    });
  }, [nowStep]);

  /** Advance without marking the current step as finished. */
  const skipCurrent = useCallback(() => {
    if (!nowStep) return;
    setSkippedIds((prev) => new Set(prev).add(nowStep.id));
  }, [nowStep]);

  const goPrevious = useCallback(() => {
    if (nowIndex <= 0) return;
    const prevStep = steps[nowIndex - 1];
    setCompletedIds((prev) => {
      if (!prev.has(prevStep.id)) return prev;
      const next = new Set(prev);
      next.delete(prevStep.id);
      return next;
    });
    setSkippedIds((prev) => {
      if (!prev.has(prevStep.id)) return prev;
      const next = new Set(prev);
      next.delete(prevStep.id);
      return next;
    });
  }, [nowIndex, steps]);

  const reset = useCallback(() => {
    setCompletedIds(new Set());
    setSkippedIds(new Set());
    if (storageKey) sessionStorage.removeItem(storageKey);
  }, [storageKey]);

  const stepStatus = useCallback(
    (step: RoutineStep): PlaybackStatus => {
      if (completedIds.has(step.id)) return "finished";
      if (nowStep?.id === step.id) return "now";
      if (nextStep?.id === step.id) return "next";
      return "idle";
    },
    [completedIds, nowStep, nextStep],
  );

  return {
    steps,
    nowStep,
    nextStep,
    finishedSteps,
    upcomingSteps,
    completedIds,
    skippedIds,
    completedCount,
    totalSteps,
    nowIndex,
    isComplete,
    completeCurrent,
    skipCurrent,
    goPrevious,
    reset,
    stepStatus,
  };
}
