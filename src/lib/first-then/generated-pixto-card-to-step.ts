import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import type { RoutineStep } from "@/lib/types/routine";

/** Map a First & Then digital card to a playback step for `SwipeableStepCard`. */
export function generatedPixtoCardToRoutineStep(
  card: GeneratedPixtoCardProps,
  stepId: string,
): RoutineStep {
  return {
    id: stepId,
    title: card.title,
    imageUrl: card.illustrationUrl,
    generatedPixto: {
      illustrationUrl: card.illustrationUrl,
      title: card.title,
      category: card.category,
      categoryColour: card.categoryColour,
      iconUrl: card.iconUrl,
      cardType: card.cardType,
      focusIllustrationScale: card.focusIllustrationScale,
      focusIllustrationUrl: card.focusIllustrationUrl,
    },
  };
}
