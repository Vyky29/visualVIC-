"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlaybackStatus } from "@/hooks/useRoutinePlayback";

export type FirstThenPhase = "first" | "then" | "done";

export type FirstThenSlot = "first" | "then";

export function firstThenSlotPlaybackStatus(
  slot: FirstThenSlot,
  phase: FirstThenPhase,
): PlaybackStatus {
  if (slot === "first") {
    if (phase === "first") return "now";
    return "finished";
  }
  if (phase === "first") return "next";
  if (phase === "then") return "now";
  return "finished";
}

export function useFirstThenPlayback(resetKey: string) {
  const [phase, setPhase] = useState<FirstThenPhase>("first");

  useEffect(() => {
    setPhase("first");
  }, [resetKey]);

  const completeCurrent = useCallback(() => {
    setPhase((current) => {
      if (current === "first") return "then";
      if (current === "then") return "done";
      return "done";
    });
  }, []);

  const reset = useCallback(() => {
    setPhase("first");
  }, []);

  return {
    phase,
    completeCurrent,
    reset,
    isComplete: phase === "done",
  };
}
