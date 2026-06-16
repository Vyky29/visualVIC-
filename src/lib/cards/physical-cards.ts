/**
 * Physical activity pack — PixtoLearn library illustrations (531×648).
 * Assets: `public/images/library/{slug}.png`
 */

export const PHYSICAL_LIBRARY_DIR = "/images/library" as const;

/** Soft 3D fitness illustrations — separate from flat 2D library. */
export const PHYSICAL_3D_LIBRARY_DIR = "/images/library-3d" as const;

export const PHYSICAL_CATEGORY_LABEL = "Physical" as const;

export const PHYSICAL_3D_CATEGORY_LABEL = "Physical · 3D" as const;

/** Green ribbon — physical / fitness activity (distinct from day centre pink). */
export const PHYSICAL_CATEGORY_COLOUR = "#43A047" as const;

export type PhysicalStep = {
  id: string;
  slug: string;
  title: string;
};

export function physicalImageUrl(slug: string): string {
  return `${PHYSICAL_LIBRARY_DIR}/${slug}.png`;
}

export function physical3dImageUrl(slug: string): string {
  return `${PHYSICAL_3D_LIBRARY_DIR}/${slug}.png`;
}

/** Equipment then stretching — matches library PNG slugs. */
export const PHYSICAL_SEQUENCE: readonly PhysicalStep[] = [
  { id: "phy-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "phy-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "phy-step-platform", slug: "step-platform", title: "Steps" },
  { id: "phy-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "phy-exercise-machine", slug: "exercise-machine", title: "Exercise machine" },
  { id: "phy-weights", slug: "weights", title: "Weights" },
  { id: "phy-row-machine", slug: "row-machine", title: "Row machine" },
  { id: "phy-skis", slug: "skis", title: "Skis" },
  { id: "phy-exercise-bike", slug: "exercise-bike", title: "Exercise bike" },
  { id: "phy-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "phy-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "phy-foam-roller", slug: "foam-roller", title: "Foam roller" },
  { id: "phy-stretching", slug: "stretching", title: "Stretching" },
] as const;

/** Extra equipment — 3D library only (BOSU, kettlebell, etc.). */
export const PHYSICAL_3D_EXTRA_SEQUENCE: readonly PhysicalStep[] = [
  { id: "phy3-bosu", slug: "bosu", title: "BOSU" },
  { id: "phy3-kettlebell", slug: "kettlebell", title: "Kettlebell" },
  { id: "phy3-medicine-ball", slug: "medicine-ball", title: "Medicine ball" },
  { id: "phy3-jump-rope", slug: "jump-rope", title: "Jump rope" },
  { id: "phy3-punching-bag", slug: "punching-bag", title: "Punching bag" },
  { id: "phy3-agility-ladder", slug: "agility-ladder", title: "Agility ladder" },
  { id: "phy3-balance-board", slug: "balance-board", title: "Balance board" },
] as const;

/** Full 3D fitness catalogue — core Physical steps + extras. */
export const PHYSICAL_3D_SEQUENCE: readonly PhysicalStep[] = [
  ...PHYSICAL_SEQUENCE,
  ...PHYSICAL_3D_EXTRA_SEQUENCE,
] as const;

export function physicalImageUrlForStep(step: PhysicalStep): string {
  return physicalImageUrl(step.slug);
}

export function physical3dImageUrlForStep(step: PhysicalStep): string {
  return physical3dImageUrl(step.slug);
}
