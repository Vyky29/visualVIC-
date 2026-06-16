/**
 * Physical activity pack — PixtoLearn library illustrations (531×648).
 * Assets: `public/images/library/{slug}.png`
 */

export const PHYSICAL_LIBRARY_DIR = "/images/library" as const;

export const PHYSICAL_CATEGORY_LABEL = "Physical" as const;

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

/** Equipment then stretching — matches library PNG slugs. */
export const PHYSICAL_SEQUENCE: readonly PhysicalStep[] = [
  { id: "phy-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "phy-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "phy-step-platform", slug: "step-platform", title: "Steps" },
  { id: "phy-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "phy-exercise-machine", slug: "exercise-machine", title: "Exercise machine" },
  { id: "phy-skis", slug: "skis", title: "Skis" },
  { id: "phy-exercise-bike", slug: "exercise-bike", title: "Exercise bike" },
  { id: "phy-exercise-mat", slug: "exercise-mat", title: "Exercise mat" },
  { id: "phy-resistance-bands", slug: "resistance-bands", title: "Resistance bands" },
  { id: "phy-foam-roller", slug: "foam-roller", title: "Foam roller" },
  { id: "phy-stretching", slug: "stretching", title: "Stretching" },
] as const;

export function physicalImageUrlForStep(step: PhysicalStep): string {
  return physicalImageUrl(step.slug);
}
