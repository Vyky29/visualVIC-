"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import type { PlaybackStatus } from "@/hooks/useRoutinePlayback";

export type FirstThenPhase = "first" | "then" | "done";

export type FirstThenSlot = "first" | "then";

/**
 * With the routine queue model, FIRST is always the active card and THEN is
 * always the upcoming card. Completing FIRST shifts the queue (THEN → FIRST,
 * next routine step → THEN).
 */
export function firstThenSlotPlaybackStatus(
  slot: FirstThenSlot,
  phase: FirstThenPhase,
): PlaybackStatus {
  if (phase === "done") return "finished";
  if (slot === "first") return "now";
  return "next";
}

export function useFirstThenPlayback(
  initialQueue: GeneratedPixtoCardProps[],
  resetKey: string,
) {
  const [queue, setQueue] = useState<GeneratedPixtoCardProps[]>(initialQueue);

  useEffect(() => {
    setQueue(initialQueue);
  }, [resetKey, initialQueue]);

  const firstCard = queue[0] ?? null;
  const secondCard = queue[1] ?? null;
  const isComplete = queue.length === 0;
  const phase: FirstThenPhase = isComplete ? "done" : "first";

  const completeCurrent = useCallback(() => {
    setQueue((current) => (current.length === 0 ? current : current.slice(1)));
  }, []);

  const reset = useCallback(() => {
    setQueue(initialQueue);
  }, [initialQueue]);

  const playbackResetKey = useMemo(
    () =>
      `${resetKey}:${queue[0]?.illustrationUrl ?? "empty"}:${queue.length}`,
    [resetKey, queue],
  );

  return {
    queue,
    firstCard,
    secondCard,
    phase,
    completeCurrent,
    reset,
    isComplete,
    /** Changes when the active FIRST card changes — use for timer step keys. */
    activeCardKey: playbackResetKey,
  };
}
