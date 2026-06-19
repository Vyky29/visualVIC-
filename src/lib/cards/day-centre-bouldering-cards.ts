import { climbingImageUrl, CLIMBING_SEQUENCE } from "@/lib/cards/climbing-cards";
import { DAY_CENTRE_BOULDERING_CLIMB_SLUGS } from "@/lib/cards/day-centre-folder-groups";

export type DayCentreBoulderingStep = {
  id: string;
  slug: string;
  title: string;
};

/** Bouldering — climbing cards used inside Day centre folder. */
export const DAY_CENTRE_BOULDERING_SCHEDULE_SEQUENCE: readonly DayCentreBoulderingStep[] =
  CLIMBING_SEQUENCE.filter((s) =>
    DAY_CENTRE_BOULDERING_CLIMB_SLUGS.has(s.slug),
  ).map((s) => ({
    id: `dcb-${s.slug}`,
    slug: s.slug,
    title: s.title,
  }));

const BOULDERING_PREP_SLUGS = [
  "put-climbing-shoes-on",
  "climbing-shoes",
  "magnesium-bag",
  "rub-your-palms",
] as const;

const BOULDERING_WALL_SLUGS = [
  "boulder-wall",
  "holds",
  "grab-hold",
  "step-on-hold",
] as const;

function boulderingStepsForSlugs(
  slugs: readonly string[],
): readonly DayCentreBoulderingStep[] {
  return slugs.map((slug) => {
    const step = CLIMBING_SEQUENCE.find((s) => s.slug === slug);
    return {
      id: `dcb-${slug}`,
      slug,
      title: step?.title ?? slug,
    };
  });
}

/** Bouldering · get ready (shoes & chalk). */
export const DAY_CENTRE_BOULDERING_PREP_SEQUENCE: readonly DayCentreBoulderingStep[] =
  boulderingStepsForSlugs(BOULDERING_PREP_SLUGS);

/** Bouldering · on the wall. */
export const DAY_CENTRE_BOULDERING_WALL_SEQUENCE: readonly DayCentreBoulderingStep[] =
  boulderingStepsForSlugs(BOULDERING_WALL_SLUGS);

export function dayCentreBoulderingImageUrlForStep(
  step: DayCentreBoulderingStep,
): string {
  return climbingImageUrl(step.slug);
}
