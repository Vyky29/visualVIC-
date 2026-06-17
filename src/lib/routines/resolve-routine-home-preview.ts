import {
  dayCentreAyaanAvatarUrl,
  dayCentreAyaanSceneUrl,
  dayCentreEmmanuelAvatarUrl,
  dayCentreEmmanuelSceneUrl,
  dayCentreIkramAvatarUrl,
  dayCentreIkramSceneUrl,
  dayCentreSerineAvatarUrl,
  dayCentreSerineSceneUrl,
} from "@/lib/cards/day-centre-shared";
import type { Routine, RoutineStep } from "@/lib/types/routine";
import { isPixtoLearnIllustrationOnlyUrl } from "@/lib/utils/visual-card-url";

/** Tailored stock routine ids on Home. */
export const TAILORED_STOCK_ROUTINE_IDS = [
  "ikram-day-centre",
  "serine-day-centre",
  "ayaan-day-centre",
  "emmanuel-day-centre",
] as const;

export type TailoredStockRoutineId = (typeof TAILORED_STOCK_ROUTINE_IDS)[number];

/** Home · Tailored schedules accordion — 3D close-up portrait (Ikram reference). */
export function tailoredScheduleCloseUpPreviewUrl(
  routineId: string,
): string | undefined {
  switch (routineId as TailoredStockRoutineId) {
    case "ikram-day-centre":
      return dayCentreIkramAvatarUrl();
    case "serine-day-centre":
      return dayCentreSerineAvatarUrl();
    case "ayaan-day-centre":
      return dayCentreAyaanAvatarUrl();
    case "emmanuel-day-centre":
      return dayCentreEmmanuelAvatarUrl();
    default:
      return undefined;
  }
}

/** Home · Routines grid — 3D action scene (Ayaan therapy-ball reference). */
export function tailoredScheduleActionPreviewUrl(
  routineId: string,
): string | undefined {
  switch (routineId as TailoredStockRoutineId) {
    case "ikram-day-centre":
      return dayCentreIkramSceneUrl("music");
    case "serine-day-centre":
      return dayCentreSerineSceneUrl("row-machine");
    case "ayaan-day-centre":
      return dayCentreAyaanSceneUrl("therapy-ball");
    case "emmanuel-day-centre":
      return dayCentreEmmanuelSceneUrl("cross-trainer");
    default:
      return undefined;
  }
}

function stepPreviewUrl(step: RoutineStep): string | undefined {
  return step.generatedPixto?.illustrationUrl ?? step.imageUrl;
}

function detectTailoredStockIdFromSteps(
  steps: readonly RoutineStep[],
): TailoredStockRoutineId | undefined {
  const haystack = steps
    .map((s) => `${s.imageUrl ?? ""} ${s.generatedPixto?.illustrationUrl ?? ""}`)
    .join(" ")
    .toLowerCase();
  if (haystack.includes("/ikram")) return "ikram-day-centre";
  if (haystack.includes("/serine")) return "serine-day-centre";
  if (haystack.includes("/ayaan")) return "ayaan-day-centre";
  if (haystack.includes("/emmanuel")) return "emmanuel-day-centre";
  return undefined;
}

/** Custom / library routines — prefer a personalised 3D scene over step 0. */
export function resolveFeaturedRoutineHomePreviewUrl(
  routine: Routine,
): string | undefined {
  const tailoredId = detectTailoredStockIdFromSteps(routine.steps);
  if (tailoredId) {
    return tailoredScheduleActionPreviewUrl(tailoredId);
  }

  for (const step of routine.steps) {
    const url = stepPreviewUrl(step);
    if (url && isPixtoLearnIllustrationOnlyUrl(url)) return url;
  }

  return (
    routine.homePreviewImageUrl ??
    stepPreviewUrl(routine.steps[0] ?? ({} as RoutineStep))
  );
}

/** Stock tailored tile in the Tailored schedules accordion. */
export function resolveTailoredScheduleHomePreviewUrl(
  routine: Routine,
): string | undefined {
  return (
    tailoredScheduleCloseUpPreviewUrl(routine.id) ??
    routine.homePreviewImageUrl ??
    stepPreviewUrl(routine.steps[0] ?? ({} as RoutineStep))
  );
}
