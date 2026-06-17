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

export function dayCentreBoulderingImageUrlForStep(
  step: DayCentreBoulderingStep,
): string {
  return climbingImageUrl(step.slug);
}
