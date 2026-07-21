import type { RoutineStep } from "@/lib/types/routine";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import type { GeneratedPixtoRoutineStepData } from "@/lib/types/routine";

export function speakableRoutineStepTitle(
  step: RoutineStep | null | undefined,
  lang: CardLanguageCode,
): string {
  if (!step) return "";
  const gp = step.generatedPixto;
  if (gp?.illustrationUrl) {
    return resolveDigitalPixtoStrings(
      gp.illustrationUrl,
      gp.title || step.title,
      gp.category || "",
      lang,
    ).title;
  }
  return step.title?.trim() || "";
}

export function speakableGeneratedCardTitle(
  card:
    | Pick<GeneratedPixtoRoutineStepData, "illustrationUrl" | "title" | "category">
    | null
    | undefined,
  lang: CardLanguageCode,
): string {
  if (!card) return "";
  return resolveDigitalPixtoStrings(
    card.illustrationUrl,
    card.title,
    card.category,
    lang,
  ).title;
}
