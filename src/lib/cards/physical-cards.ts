/**
 * Physical activity pack — PixtoLearn library illustrations (531×648).
 *
 * Assets live in flat folders (no subfolders):
 *   `public/images/library-3d/{slug}.png`
 *   `public/images/library-3d-gym/{slug}.png`
 *
 * The app serves only those root PNGs. Which slugs are active is defined by
 * {@link PHYSICAL_3D_LIBRARY_CATALOG} and {@link PHYSICAL_3D_GYM_CATALOG} below.
 *
 * Import designer PNGs (~531×648) with:
 *   node scripts/import-physical-3d-asset.mjs library-3d <slug> /path/to.png
 */

/** Soft 3D fitness illustrations — separate from flat 2D library. */
export const PHYSICAL_3D_LIBRARY_DIR = "/images/library-3d" as const;

/** Extended gym equipment — machines, benches, accessories. */
export const PHYSICAL_3D_GYM_LIBRARY_DIR = "/images/library-3d-gym" as const;

/** @deprecated Flat 2D fitness library removed — use 3D paths only. */
export const PHYSICAL_LIBRARY_DIR = "/images/library" as const;

export const PHYSICAL_2D_CATEGORY_LABEL = "Physical Activity (2D)" as const;

export const PHYSICAL_3D_CATEGORY_LABEL = "Physical Activity (3D)" as const;

/** @deprecated Use {@link PHYSICAL_3D_CATEGORY_LABEL}. */
export const PHYSICAL_CATEGORY_LABEL = PHYSICAL_3D_CATEGORY_LABEL;

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

export type PhysicalIllustrationLibrary = "3d" | "3d-gym";

export type PhysicalScheduleStep = PhysicalStep & {
  library: PhysicalIllustrationLibrary;
};

export function physicalImageUrlForScheduleStep(
  step: PhysicalScheduleStep,
): string {
  switch (step.library) {
    case "3d":
      return physical3dImageUrl(step.slug);
    case "3d-gym":
      return physical3dGymImageUrl(step.slug);
  }
}

export function physicalImageUrl(slug: string): string {
  return `${PHYSICAL_LIBRARY_DIR}/${slug}.png`;
}

export function physical3dImageUrl(slug: string): string {
  return `${PHYSICAL_3D_LIBRARY_DIR}/${slug}.png`;
}

export function physical3dGymImageUrl(slug: string): string {
  return `${PHYSICAL_3D_GYM_LIBRARY_DIR}/${slug}.png`;
}

/** Mini gym — balls, mats, agility, sports (`library-3d/`). */
export const MINI_GYM_3D_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "therapy-ball", title: "Therapy ball" },
  { slug: "trampoline", title: "Trampoline" },
  { slug: "plyo-box", title: "Plyo box" },
  { slug: "cones", title: "Cones" },
  { slug: "resistance-bands", title: "Resistance bands" },
  { slug: "bosu", title: "BOSU" },
  { slug: "balance-board", title: "Balance board" },
  { slug: "foam-roller", title: "Foam roller" },
  { slug: "exercise-mat", title: "Exercise mat" },
  { slug: "weights", title: "Dumbbells" },
  { slug: "football", title: "Football" },
  { slug: "badminton", title: "Badminton" },
  { slug: "basketball", title: "Basketball" },
  { slug: "tennis", title: "Tennis" },
  { slug: "ladder", title: "Ladder" },
  { slug: "hurdles", title: "Hurdles" },
  { slug: "parachute", title: "Parachute" },
  { slug: "colour-balls", title: "Colour balls" },
  { slug: "jump-rope", title: "Jump rope" },
  { slug: "stilts", title: "Bucket stilts" },
] as const;

/** Physical Activity — steps, kettlebell, weight ball + cardio machines in `library-3d/`. */
export const PHYSICAL_ACTIVITY_3D_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "step-platform", title: "Steps" },
  { slug: "kettlebell", title: "Kettlebell" },
  { slug: "medicine-ball", title: "Weight ball" },
  { slug: "treadmill", title: "Treadmill" },
  { slug: "exercise-bike", title: "Exercise bike" },
  { slug: "row-machine", title: "Row machine" },
] as const;

/** All slugs under `public/images/library-3d/` (mini gym + physical activity). */
export const PHYSICAL_3D_LIBRARY_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  ...PHYSICAL_ACTIVITY_3D_CATALOG,
  ...MINI_GYM_3D_CATALOG,
] as const;

/** Library → machines — curated gym picks (531×648 each). */
export const PHYSICAL_3D_GYM_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "aerobic-step", title: "Aerobic step" },
  { slug: "sandbag-stack", title: "Sandbags" },
  { slug: "leg-press", title: "Leg press" },
  { slug: "chest-press", title: "Chest press" },
  { slug: "pec-deck", title: "Pec deck" },
  { slug: "lat-pulldown", title: "Lat pulldown" },
  { slug: "cable-crossover", title: "Cable crossover" },
  { slug: "smith-machine", title: "Smith machine" },
  { slug: "bench-press", title: "Bench press" },
  { slug: "incline-bench", title: "Incline bench" },
  { slug: "squat-rack", title: "Squat rack" },
  { slug: "power-cage", title: "Power cage" },
  { slug: "seated-row", title: "Seated row" },
  { slug: "elliptical", title: "Elliptical" },
  { slug: "stair-climber", title: "Stair climber" },
  { slug: "skierg", title: "SkiErg" },
  { slug: "air-bike", title: "Air bike" },
] as const;

/** Filenames under `public/images/library-3d-gym/` — synced to {@link PHYSICAL_3D_GYM_CATALOG}. */
export const PHYSICAL_3D_GYM_CARD_FILES = PHYSICAL_3D_GYM_CATALOG.map(
  (item) => `${item.slug}.png` as const,
);

/** Home / Sports — full 3D library on disk (`library-3d/` + `library-3d-gym/`). */
export const PHYSICAL_SCHEDULE_SEQUENCE: readonly PhysicalScheduleStep[] = [
  ...PHYSICAL_3D_LIBRARY_CATALOG.map((item) => ({
    id: `phs3-${item.slug}`,
    slug: item.slug,
    title: item.title,
    library: "3d" as const,
  })),
  ...PHYSICAL_3D_GYM_CATALOG.map((item) => ({
    id: `phsg-${item.slug}`,
    slug: item.slug,
    title: item.title,
    library: "3d-gym" as const,
  })),
] as const;

function physical3dLibrarySteps(): readonly PhysicalStep[] {
  return PHYSICAL_ACTIVITY_3D_CATALOG.map((item) => ({
    id: `phy3-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

function physical3dGymLibrarySteps(): readonly PhysicalStep[] {
  return PHYSICAL_3D_GYM_CATALOG.map((item) => ({
    id: `phy3g-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

/** @deprecated Flat 2D fitness PNGs removed. */
const PHYSICAL_LIBRARY_CATALOG: readonly Omit<PhysicalStep, "id">[] = [] as const;

function physicalLibrarySteps(
  idPrefix: "phy2" | "phy3",
): readonly PhysicalStep[] {
  return PHYSICAL_LIBRARY_CATALOG.map((item) => ({
    id: `${idPrefix}-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

/** Library → Physical Activity (2D) — empty (flat fitness PNGs removed). */
export const PHYSICAL_2D_LIBRARY_SEQUENCE: readonly PhysicalStep[] =
  physicalLibrarySteps("phy2");

/** Library → Physical Activity (3D) — synced to `library-3d/` on disk. */
export const PHYSICAL_3D_LIBRARY_SEQUENCE: readonly PhysicalStep[] =
  physical3dLibrarySteps();

/** @deprecated Use {@link PHYSICAL_3D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE;

/** @deprecated Use {@link PHYSICAL_3D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_3D_EXTRA_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE;

/** @deprecated Use {@link PHYSICAL_3D_LIBRARY_SEQUENCE}. */
export const PHYSICAL_3D_SEQUENCE: readonly PhysicalStep[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE;

/** Library → Physical Activity · 3D gym — machines & accessories (`library-3d-gym/`). */
export const PHYSICAL_3D_GYM_SEQUENCE: readonly PhysicalStep[] =
  physical3dGymLibrarySteps();

/** Library + Home — all 3D fitness objects (`library-3d/` + `library-3d-gym/`). */
export const PHYSICAL_ALL_3D_LIBRARY_SEQUENCE: readonly PhysicalStep[] = [
  ...PHYSICAL_3D_LIBRARY_SEQUENCE,
  ...PHYSICAL_3D_GYM_SEQUENCE,
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
