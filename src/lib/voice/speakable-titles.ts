import type { RoutineStep } from "@/lib/types/routine";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import type { GeneratedPixtoRoutineStepData } from "@/lib/types/routine";

/**
 * Same string as the white title ribbon on Schedule / Focus cards.
 */
export function speakableRoutineStepTitle(
  step: RoutineStep | null | undefined,
  lang: CardLanguageCode,
): string {
  if (!step) return "";
  const gp = step.generatedPixto;
  if (gp?.illustrationUrl) {
    const resolved = resolveDigitalPixtoStrings(
      gp.illustrationUrl,
      gp.title || step.title || "",
      gp.category || "",
      lang,
    ).title;
    const t = resolved.trim() || gp.title?.trim() || step.title?.trim() || "";
    return t;
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
  const resolved = resolveDigitalPixtoStrings(
    card.illustrationUrl,
    card.title,
    card.category,
    lang,
  ).title;
  return resolved.trim() || card.title?.trim() || "";
}
