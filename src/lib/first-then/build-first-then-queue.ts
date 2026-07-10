import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { routineStepToGeneratedPixtoCard } from "@/lib/experimental/routine-step-to-pixto-card";
import type { RoutineStep } from "@/lib/types/routine";

function isFinishLikeStep(step: RoutineStep): boolean {
  const id = step.id.trim().toLowerCase();
  const title = step.title.trim().toLowerCase();
  const imageUrl = (step.imageUrl ?? "").toLowerCase();
  return (
    id === "__playback-finish__" ||
    id === "core-finish" ||
    title === "finish" ||
    imageUrl.endsWith("/cards/core/finish3D.png") ||
    imageUrl.endsWith("/cards/core/finish.png")
  );
}

/**
 * Remaining First & Then cards from the current routine step onward.
 * Skips finish cards so the queue stays on real activities.
 */
export function buildFirstThenQueueFromRoutineSteps(
  steps: RoutineStep[],
  fromIndex: number,
  options?: { firstTimerSec?: number },
): GeneratedPixtoCardProps[] {
  if (fromIndex < 0 || fromIndex >= steps.length) return [];

  const queue = steps
    .slice(fromIndex)
    .filter((step) => !isFinishLikeStep(step))
    .map((step) => routineStepToGeneratedPixtoCard(step));

  if (
    queue.length > 0 &&
    typeof options?.firstTimerSec === "number" &&
    options.firstTimerSec > 0
  ) {
    queue[0] = { ...queue[0], timerSec: options.firstTimerSec };
  }

  return queue;
}
