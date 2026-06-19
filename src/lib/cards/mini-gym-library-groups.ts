/**
 * Library sub-sections inside Day centre → Mini gym (2D / 3D equipment).
 */

export type MiniGymLibraryDimension = "2d" | "3d";

export const MINI_GYM_LIBRARY_DIMENSION_ORDER: readonly MiniGymLibraryDimension[] =
  ["2d", "3d"] as const;

export const MINI_GYM_2D_CATEGORY_LABEL = "Mini Gym (2D)" as const;

export const MINI_GYM_3D_CATEGORY_LABEL = "Mini Gym (3D)" as const;

export type MiniGymLibraryStep = {
  id: string;
  slug: string;
  title: string;
};

/** Shared mini gym catalogue — same slugs in 2D and 3D (blank tile if PNG missing). */
const MINI_GYM_LIBRARY_CATALOG: readonly Omit<MiniGymLibraryStep, "id">[] = [
  { slug: "step-platform", title: "Steps" },
  { slug: "trampoline", title: "Trampoline" },
  { slug: "weights", title: "Weights" },
  { slug: "resistance-bands", title: "Elastic bands" },
  { slug: "treadmill", title: "Treadmill" },
  { slug: "exercise-bike", title: "Static bike" },
  { slug: "therapy-ball", title: "Therapy ball" },
  { slug: "spinner", title: "Spinner" },
  { slug: "hurdles", title: "Hurdles" },
  { slug: "agility-ladder", title: "Ladder" },
  { slug: "cones", title: "Cones" },
  { slug: "bosu", title: "BOSU" },
  { slug: "balance-board", title: "Balance board" },
] as const;

function miniGymLibrarySteps(
  idPrefix: "mg2" | "mg3",
): readonly MiniGymLibraryStep[] {
  return MINI_GYM_LIBRARY_CATALOG.map((item) => ({
    id: `${idPrefix}-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

/** 2D — flat library illustrations (`public/images/library/{slug}.png`). */
export const MINI_GYM_2D_LIBRARY_SEQUENCE: readonly MiniGymLibraryStep[] =
  miniGymLibrarySteps("mg2");

/** 3D — `public/images/library-3d/{slug}.png`. */
export const MINI_GYM_3D_LIBRARY_SEQUENCE: readonly MiniGymLibraryStep[] =
  miniGymLibrarySteps("mg3");

export const MINI_GYM_LIBRARY_SLUGS = new Set(
  MINI_GYM_LIBRARY_CATALOG.map((s) => s.slug),
);

export function miniGymLibraryDimensionFromPickNamespace(
  ns: string,
): MiniGymLibraryDimension | null {
  if (ns === "mg2d") return "2d";
  if (ns === "mg3d") return "3d";
  return null;
}

export function miniGymLibraryCategoryLabel(
  dimension: MiniGymLibraryDimension,
): string {
  return dimension === "2d"
    ? MINI_GYM_2D_CATEGORY_LABEL
    : MINI_GYM_3D_CATEGORY_LABEL;
}
