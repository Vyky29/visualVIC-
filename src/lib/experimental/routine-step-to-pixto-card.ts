import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { resolveStepTimerSec } from "@/lib/routines/resolve-step-timer";
import type { RoutineStep } from "@/lib/types/routine";
import { stepCategoryOutlineColour } from "@/lib/utils/routine-accent";

function lc(s: string): string {
  return s.toLowerCase();
}

/**
 * Map a playback step to the digital WOW / Focus First & Then card shell.
 * Each card keeps its own optional timer when set on that step only.
 */
export function routineStepToGeneratedPixtoCard(
  step: RoutineStep,
): GeneratedPixtoCardProps {
  const timerSec = resolveStepTimerSec(step);
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
