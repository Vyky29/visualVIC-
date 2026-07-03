"use client";

import { useMemo } from "react";
import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { SwipeableStepCard } from "@/components/schedule/SwipeableStepCard";
import { resolveCategoryBackCardUrl } from "@/lib/cards/resolve-category-back-card";
import { generatedPixtoCardToRoutineStep } from "@/lib/first-then/generated-pixto-card-to-step";
import {
  firstThenSlotPlaybackStatus,
  type FirstThenPhase,
  type FirstThenSlot,
} from "@/lib/hooks/useFirstThenPlayback";
import type { TimelineVariant } from "@/components/schedule/SwipeableStepCard";

type Props = {
  slot: FirstThenSlot;
  card: GeneratedPixtoCardProps;
  phase: FirstThenPhase;
  onAdvance: () => void;
  presentation?: TimelineVariant;
  stepId?: string;
  scheduleTimer?: {
    remainingSec: number;
    totalSec: number;
    finished?: boolean;
  };
};

export function FirstThenSwipeableSlot({
  slot,
  card,
  phase,
  onAdvance,
  presentation = "hero",
  stepId,
  scheduleTimer,
}: Props) {
  const step = useMemo(
    () => generatedPixtoCardToRoutineStep(card, stepId ?? slot),
    [card, slot, stepId],
  );
  const status = firstThenSlotPlaybackStatus(slot, phase);
  const variant: TimelineVariant =
    status === "next" ? "next" : status === "finished" ? presentation : presentation;

  return (
    <SwipeableStepCard
      step={step}
      status={status}
      variant={variant}
      onSwipeComplete={() => {
        if (status === "now") onAdvance();
      }}
      doubleTapCompletes={status === "now"}
      completionBackImageUrl={resolveCategoryBackCardUrl(card.illustrationUrl)}
      scheduleTimer={status === "now" ? scheduleTimer : undefined}
      useDesignWidth
    />
  );
}
