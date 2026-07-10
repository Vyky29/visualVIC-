"use client";

import { useCallback } from "react";
import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { useAutoAdvanceOnTimerFinish } from "@/lib/hooks/useAutoAdvanceOnTimerFinish";
import {
  firstThenSlotPlaybackStatus,
  type FirstThenPhase,
  type FirstThenSlot,
} from "@/lib/hooks/useFirstThenPlayback";
import { useStepCountdown } from "@/hooks/useStepCountdown";

export function useFirstThenStepTimer({
  firstCard,
  secondCard,
  phase,
  isComplete,
  activeCardKey,
  onAdvance,
}: {
  firstCard: GeneratedPixtoCardProps | null;
  secondCard: GeneratedPixtoCardProps | null;
  phase: FirstThenPhase;
  isComplete: boolean;
  /** Stable key for the current FIRST card (changes when the queue shifts). */
  activeCardKey: string;
  onAdvance: () => void;
}) {
  void secondCard;
  const activeTimerSec =
    !isComplete && phase === "first" ? firstCard?.timerSec : undefined;
  const active = Boolean(!isComplete && phase === "first" && firstCard);

  const {
    remaining,
    totalSeconds,
    hasTimer,
    finished,
  } = useStepCountdown(activeTimerSec, activeCardKey, active);

  useAutoAdvanceOnTimerFinish({
    active,
    stepKey: activeCardKey,
    hasTimer,
    finished,
    onAdvance,
  });

  const scheduleTimerForSlot = useCallback(
    (slot: FirstThenSlot) => {
      if (firstThenSlotPlaybackStatus(slot, phase) !== "now" || !hasTimer) {
        return undefined;
      }
      return {
        remainingSec: remaining,
        totalSec: totalSeconds,
        finished,
      };
    },
    [finished, hasTimer, phase, remaining, totalSeconds],
  );

  return { scheduleTimerForSlot };
}
