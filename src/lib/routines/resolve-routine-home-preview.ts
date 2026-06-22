import {
  dayCentreAyaanSceneUrl,
  dayCentreAyaanTailoredHomeAvatarUrl,
  dayCentreEmmanuelSceneUrl,
  dayCentreEmmanuelTailoredHomeAvatarUrl,
  dayCentreHubRoomImageUrl,
  dayCentreIkramSceneUrl,
  dayCentreIkramTailoredHomeAvatarUrl,
  dayCentreSerineSceneUrl,
  dayCentreSerineTailoredHomeAvatarUrl,
} from "@/lib/cards/day-centre-shared";
import type { Routine, RoutineStep } from "@/lib/types/routine";
import {
  isPixtoLearnFullBleedCardUrl,
  isPixtoLearnIllustrationOnlyUrl,
} from "@/lib/utils/visual-card-url";

/** Tailored stock routine ids on Home. */
export const TAILORED_STOCK_ROUTINE_IDS = [
  "ikram-day-centre",
  "ikram-day-centre-items",
  "serine-day-centre",
  "serine-gym-equipment-3d",
  "ayaan-day-centre",
  "ayaan-gym-equipment-3d",
  "emmanuel-day-centre",
  "emmanuel-gym-equipment-3d",
] as const;

export type TailoredStockRoutineId = (typeof TAILORED_STOCK_ROUTINE_IDS)[number];

/** Home · Tailored schedules accordion — 3D close-up portrait (Ikram reference). */
export function tailoredScheduleCloseUpPreviewUrl(
  routineId: string,
): string | undefined {
  switch (routineId as TailoredStockRoutineId) {
    case "ikram-day-centre":
      return dayCentreIkramTailoredHomeAvatarUrl();
    case "ikram-day-centre-items":
      return undefined;
    case "serine-day-centre":
      return dayCentreSerineTailoredHomeAvatarUrl();
    case "serine-gym-equipment-3d":
      return undefined;
    case "ayaan-day-centre":
      return dayCentreAyaanTailoredHomeAvatarUrl();
    case "ayaan-gym-equipment-3d":
      return undefined;
    case "emmanuel-day-centre":
      return dayCentreEmmanuelTailoredHomeAvatarUrl();
    case "emmanuel-gym-equipment-3d":
      return undefined;
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
    case "ikram-day-centre-items":
      return undefined;
    case "serine-day-centre":
      return dayCentreSerineSceneUrl("row-machine");
    case "serine-gym-equipment-3d":
      return undefined;
    case "ayaan-day-centre":
      return dayCentreAyaanSceneUrl("therapy-ball");
    case "ayaan-gym-equipment-3d":
      return undefined;
    case "emmanuel-day-centre":
      return dayCentreEmmanuelSceneUrl("cross-trainer");
    case "emmanuel-gym-equipment-3d":
      return undefined;
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

/**
 * Schedule Player index — square icon fills like airport / hotel (cover crop).
 * Uses action scenes for tailored packs, not avatar close-ups.
 */
export function resolveSchedulePlayerIndexPreviewUrl(
  routine: Routine,
): string | undefined {
  const tailoredAction = tailoredScheduleActionPreviewUrl(routine.id);
  if (tailoredAction) return tailoredAction;

  if (routine.id === "at-the-day-centre") {
    return dayCentreHubRoomImageUrl();
  }

  for (const step of routine.steps) {
    const url = stepPreviewUrl(step);
    if (!url || url.startsWith("/avatars/")) continue;
    if (
      isPixtoLearnIllustrationOnlyUrl(url) ||
      isPixtoLearnFullBleedCardUrl(url)
    ) {
      return url;
    }
  }

  const fallback =
    routine.homePreviewImageUrl ??
    stepPreviewUrl(routine.steps[0] ?? ({} as RoutineStep));

  if (fallback?.startsWith("/avatars/")) {
    return stepPreviewUrl(routine.steps[0] ?? ({} as RoutineStep)) ?? fallback;
  }

  return fallback;
}
