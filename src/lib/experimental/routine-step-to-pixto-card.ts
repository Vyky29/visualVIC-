import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { resolveStepTimerSec } from "@/lib/routines/resolve-step-timer";
import type { Routine, RoutineStep } from "@/lib/types/routine";
import { stepCategoryOutlineColour } from "@/lib/utils/routine-accent";

function lc(s: string): string {
  return s.toLowerCase();
}

/**
 * Map a playback step to the digital WOW / Focus First & Then card shell.
 * Each card gets its own resolved timer (or none) — steps can differ independently.
 */
export function routineStepToGeneratedPixtoCard(
  step: RoutineStep,
  routine?: Pick<Routine, "defaultTimerSec">,
): GeneratedPixtoCardProps {
  const timerSec = resolveStepTimerSec(step, routine);
  const timerFields =
    typeof timerSec === "number" && timerSec > 0 ? { timerSec } : {};
  const gp = step.generatedPixto;
  if (gp) {
    return {
      illustrationUrl: gp.illustrationUrl,
      title: lc(gp.title),
      category: gp.category,
      categoryColour: gp.categoryColour,
      iconUrl: gp.iconUrl,
      cardType: gp.cardType,
      focusIllustrationScale: gp.focusIllustrationScale,
      focusIllustrationUrl: gp.focusIllustrationUrl,
      ...timerFields,
    };
  }

  const categoryColour = stepCategoryOutlineColour(step);
  return {
    illustrationUrl: step.imageUrl ?? "",
    title: lc(step.title),
    category: "core",
    categoryColour,
    ...timerFields,
  };
}
