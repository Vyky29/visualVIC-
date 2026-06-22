/**
 * Physical activity pack — PixtoLearn library illustrations (531×648).
 *
 * Assets live in flat folders (no subfolders):
 *   `public/images/library-3d/{slug}.png`
 *   `public/images/library-3d-gym/{slug}.png`
 *
 * The app serves only those root PNGs. Which slugs are active is defined by
 * {@link PHYSICAL_3D_LIBRARY_CATALOG} and {@link PHYSICAL_3D_GYM_CATALOG} below.
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

/** Sample schedule — only assets present on disk (curated locally). */
export const PHYSICAL_SCHEDULE_SEQUENCE: readonly PhysicalScheduleStep[] = [
  { id: "phs-sandbag-blue", slug: "sandbag-blue", title: "Sandbag (blue)", library: "3d-gym" },
  { id: "phs-sandbag-stack", slug: "sandbag-stack", title: "Sandbag stack", library: "3d-gym" },
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

/** Library catalogue — synced to `public/images/library-3d/*.png`. */
export const PHYSICAL_3D_LIBRARY_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "therapy-ball", title: "Therapy ball" },
  { slug: "trampoline", title: "Trampoline" },
  { slug: "step-platform", title: "Steps" },
  { slug: "treadmill", title: "Treadmill" },
  { slug: "row-machine", title: "Row machine" },
  { slug: "exercise-bike", title: "Exercise bike" },
  { slug: "resistance-bands", title: "Resistance bands" },
  { slug: "bosu", title: "BOSU" },
  { slug: "kettlebell", title: "Kettlebell" },
] as const;

/** Library → machines — synced to `public/images/library-3d-gym/*.png`. */
export const PHYSICAL_3D_GYM_CATALOG: readonly Omit<PhysicalStep, "id">[] = [
  { slug: "sandbag-blue", title: "Sandbag (blue)" },
  { slug: "sandbag-stack", title: "Sandbag stack" },
  { slug: "arms-machine", title: "Arms machine" },
] as const;

function physical3dLibrarySteps(): readonly PhysicalStep[] {
  return PHYSICAL_3D_LIBRARY_CATALOG.map((item) => ({
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

/** Library → Physical Activity · 3D gym — sandbags only (curated on disk). */
export const PHYSICAL_3D_GYM_SEQUENCE: readonly PhysicalStep[] =
  physical3dGymLibrarySteps();

export function physicalImageUrlForStep(step: PhysicalStep): string {
  return physicalImageUrl(step.slug);
}

export function physical3dImageUrlForStep(step: PhysicalStep): string {
  return physical3dImageUrl(step.slug);
}

export function physical3dGymImageUrlForStep(step: PhysicalStep): string {
  return physical3dGymImageUrl(step.slug);
}
