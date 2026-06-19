/**
 * Library sub-sections inside Day centre → Mini gym (2D / 3D equipment).
 */

export type MiniGymLibraryDimension = "2d" | "3d";

export const MINI_GYM_LIBRARY_DIMENSION_ORDER: readonly MiniGymLibraryDimension[] =
  ["2d", "3d"] as const;

export type MiniGymLibraryStep = {
  id: string;
  slug: string;
  title: string;
};

/** Flat 2D illustrations — `public/cards/day centre/general/`. */
export const MINI_GYM_2D_LIBRARY_SEQUENCE: readonly MiniGymLibraryStep[] = [
  { id: "mg2-step-platform", slug: "step-platform", title: "Steps" },
  { id: "mg2-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "mg2-weights", slug: "weights", title: "Weights" },
  {
    id: "mg2-resistance-bands",
    slug: "resistance-bands",
    title: "Elastic bands",
  },
  { id: "mg2-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "mg2-exercise-bike", slug: "exercise-bike", title: "Static bike" },
  { id: "mg2-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "mg2-cones", slug: "cones", title: "Cones" },
] as const;

/** Soft 3D equipment — `public/images/library-3d/`. */
export const MINI_GYM_3D_LIBRARY_SEQUENCE: readonly MiniGymLibraryStep[] = [
  { id: "mg3-step-platform", slug: "step-platform", title: "Steps" },
  { id: "mg3-trampoline", slug: "trampoline", title: "Trampoline" },
  { id: "mg3-weights", slug: "weights", title: "Weights" },
  {
    id: "mg3-resistance-bands",
    slug: "resistance-bands",
    title: "Elastic bands",
  },
  { id: "mg3-treadmill", slug: "treadmill", title: "Treadmill" },
  { id: "mg3-exercise-bike", slug: "exercise-bike", title: "Static bike" },
  { id: "mg3-therapy-ball", slug: "therapy-ball", title: "Therapy ball" },
  { id: "mg3-agility-ladder", slug: "agility-ladder", title: "Ladder" },
  { id: "mg3-bosu", slug: "bosu", title: "BOSU" },
  { id: "mg3-balance-board", slug: "balance-board", title: "Balance board" },
] as const;

export const MINI_GYM_LIBRARY_SLUGS = new Set([
  ...MINI_GYM_2D_LIBRARY_SEQUENCE.map((s) => s.slug),
  ...MINI_GYM_3D_LIBRARY_SEQUENCE.map((s) => s.slug),
]);

export function miniGymLibraryDimensionFromPickNamespace(
  ns: string,
): MiniGymLibraryDimension | null {
  if (ns === "mg2d") return "2d";
  if (ns === "mg3d") return "3d";
  return null;
}
