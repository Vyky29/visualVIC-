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
  onAdvance,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  phase: FirstThenPhase;
  isComplete: boolean;
  onAdvance: () => void;
}) {
  const activeTimerSec =
    phase === "first"
      ? firstCard.timerSec
      : phase === "then"
        ? secondCard.timerSec
        : undefined;
  const stepKey = phase;
  const active = !isComplete && (phase === "first" || phase === "then");

  const {
    remaining,
    totalSeconds,
    hasTimer,
    finished,
  } = useStepCountdown(activeTimerSec, stepKey, active);

  useAutoAdvanceOnTimerFinish({
    active,
    stepKey,
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
