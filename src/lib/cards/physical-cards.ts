/**
 * Physical activity pack — PixtoLearn library illustrations (531×648).
 * Assets: `public/images/library/{slug}.png`
 */

export const PHYSICAL_LIBRARY_DIR = "/images/library" as const;

/** Soft 3D fitness illustrations — separate from flat 2D library. */
export const PHYSICAL_3D_LIBRARY_DIR = "/images/library-3d" as const;

/** Extended gym equipment — 5×5 designer sheet (machines, benches, accessories). */
export const PHYSICAL_3D_GYM_LIBRARY_DIR = "/images/library-3d-gym" as const;

export const PHYSICAL_2D_CATEGORY_LABEL = "Physical Activity (2D)" as const;

export const PHYSICAL_3D_CATEGORY_LABEL = "Physical Activity (3D)" as const;

/** @deprecated Use {@link PHYSICAL_2D_CATEGORY_LABEL}. */
export const PHYSICAL_CATEGORY_LABEL = PHYSICAL_2D_CATEGORY_LABEL;

export const PHYSICAL_3D_GYM_CATEGORY_LABEL = "Physical Activity · 3D gym" as const;

/** Green ribbon — physical / fitness activity (distinct from day centre pink). */
export const PHYSICAL_CATEGORY_COLOUR = "#43A047" as const;

export const PHYSICAL_PUBLIC_DIR = "/cards/physical" as const;

export function physicalPackMarkUrl(): string {
  return `${PHYSICAL_PUBLIC_DIR}/logo-physical.png`;
}

export function physicalBackCardUrl(): string {
  return `${PHYSICAL_PUBLIC_DIR}/backcard-physical.png`;
}

export type PhysicalStep = {
  id: string;
  slug: string;
  title: string;
};

export type PhysicalIllustrationLibrary = "2d" | "3d" | "3d-gym";

export type PhysicalScheduleStep = PhysicalStep & {
  library: PhysicalIllustrationLibrary;
};

export function physicalImageUrlForScheduleStep(
  step: PhysicalScheduleStep,
): string {
  switch (step.library) {
    case "2d":
      return physicalImageUrl(step.slug);
    case "3d":
      return physical3dImageUrl(step.slug);
    case "3d-gym":
      return physical3dGymImageUrl(step.slug);
  }
}

/**
 * Mixed 2D + 3D + gym sample for Schedule Player (curation TBD).
 * Mirrors Day centre — one routine, varied card sources.
 */
export const PHYSICAL_SCHEDULE_SEQUENCE: readonly PhysicalScheduleStep[] = [
  { id: "phs-therapy-ball", slug: "therapy-ball", title: "Therapy ball", library: "2d" },
  { id: "phs-trampoline", slug: "trampoline", title: "Trampoline", library: "2d" },
  { id: "phs-bosu", slug: "bosu", title: "BOSU", library: "3d" },
  { id: "phs-treadmill", slug: "treadmill", title: "Treadmill", library: "3d" },
  { id: "phs-kettlebell", slug: "kettlebell", title: "Kettlebell", library: "3d" },
  { id: "phs-weights", slug: "weights", title: "Weights", library: "2d" },
  { id: "phs-leg-press", slug: "leg-press", title: "Leg press", library: "3d-gym" },
  { id: "phs-aerobic-step", slug: "aerobic-step", title: "Aerobic step", library: "3d-gym" },
  { id: "phs-exercise-mat", slug: "exercise-mat", title: "Exercise mat", library: "2d" },
  { id: "phs-resistance-bands", slug: "resistance-bands", title: "Resistance bands", library: "2d" },
  { id: "phs-jump-rope", slug: "jump-rope", title: "Jump rope", library: "3d" },
  { id: "phs-stretching", slug: "stretching", title: "Stretching", library: "2d" },
] as const;

export function physicalImageUrl(slug: string): string {
  return `${PHYSICAL_LIBRARY_DIR}/${slug}.png`;
}

export function physical3dImageUrl(slug: string): string {
  return `${PHYSICAL_3D_LIBRARY_DIR}/${slug}.png`;
}

export function physical3dGymImageUrl(slug: string): string {
  return `${PHYSICAL_3D_GYM_LIBRARY_DIR}/${slug}.png`;
}

/** Shared Library catalogue — same slugs in 2D and 3D (blank tile if PNG missing). */
const PHYSICAL_LIBRARY_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "therapy-ball", title: "Therapy ball" },
  { slug: "trampoline", title: "Trampoline" },
  { slug: "step-platform", title: "Steps" },
  { slug: "treadmill", title: "Treadmill" },
  { slug: "exercise-bike", title: "Exercise bike" },
  { slug: "weights", title: "Weights" },
  { slug: "resistance-bands", title: "Resistance bands" },
  { slug: "exercise-mat", title: "Exercise mat" },
  { slug: "foam-roller", title: "Foam roller" },
  { slug: "stretching", title: "Stretching" },
  { slug: "cones", title: "Cones" },
  { slug: "bosu", title: "BOSU" },
  { slug: "balance-board", title: "Balance board" },
  { slug: "agility-ladder", title: "Agility ladder" },
  { slug: "jump-rope", title: "Jump rope" },
  { slug: "kettlebell", title: "Kettlebell" },
  { slug: "medicine-ball", title: "Medicine ball" },
  { slug: "spinner", title: "Spinner" },
  { slug: "hurdles", title: "Hurdles" },
  { slug: "football", title: "Football" },
  { slug: "basketball", title: "Basketball" },
  { slug: "badminton", title: "Badminton" },
  { slug: "punching-bag", title: "Punching bag" },
  { slug: "exercise-machine", title: "Exercise machine" },
  { slug: "row-machine", title: "Row machine" },
  { slug: "skis", title: "Skis" },
] as const;

function physicalLibrarySteps(
  idPrefix: "phy2" | "phy3",
): readonly PhysicalStep[] {
  return PHYSICAL_LIBRARY_CATALOG.map((item) => ({
    id: `${idPrefix}-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

/** Library → Physical Activity (2D) — `public/images/library/{slug}.png`. */
export const PHYSICAL_2D_LIBRARY_SEQUENCE: readonly PhysicalStep[] =
  physicalLibrarySteps("phy2");

/** Library → Physical Activity (3D) — `public/images/library-3d/{slug}.png`. */
export const PHYSICAL_3D_LIBRARY_SEQUENCE: readonly PhysicalStep[] =
  physicalLibrarySteps("phy3");

/** @deprecated Use {@link PHYSICAL_2D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_2D_LIBRARY_SEQUENCE;

/** @deprecated Use {@link PHYSICAL_3D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_3D_EXTRA_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE.filter(
    (step) =>
      !PHYSICAL_2D_LIBRARY_SEQUENCE.some((twoD) => twoD.slug === step.slug),
  );

/** @deprecated Use {@link PHYSICAL_3D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_3D_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE;

/** 5×5 gym sheet — re-imported machines only until new assets are added. */
export const PHYSICAL_3D_GYM_SEQUENCE: readonly PhysicalStep[] = [
  { id: "phy3g-leg-press", slug: "leg-press", title: "Leg press" },
  { id: "phy3g-elliptical", slug: "elliptical", title: "Elliptical" },
  { id: "phy3g-stair-climber", slug: "stair-climber", title: "Stair climber" },
  { id: "phy3g-skierg", slug: "skierg", title: "SkiErg" },
  { id: "phy3g-air-bike", slug: "air-bike", title: "Air bike" },
] as const;

export function physicalImageUrlForStep(step: PhysicalStep): string {
  return physicalImageUrl(step.slug);
}

export function physical3dImageUrlForStep(step: PhysicalStep): string {
  return physical3dImageUrl(step.slug);
}

export function physical3dGymImageUrlForStep(step: PhysicalStep): string {
  return physical3dGymImageUrl(step.slug);
}
