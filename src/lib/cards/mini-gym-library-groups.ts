/**
 * Library sub-sections inside Day centre → Mini gym (3D equipment).
 * Synced to `public/images/library-3d/` — empty until new exports land.
 */

export type MiniGymLibraryDimension = "3d";

export const MINI_GYM_LIBRARY_DIMENSION_ORDER: readonly MiniGymLibraryDimension[] =
  ["3d"] as const;

export const MINI_GYM_3D_CATEGORY_LABEL = "Mini Gym (3D)" as const;

/** @deprecated Flat 2D mini gym removed. */
export const MINI_GYM_2D_CATEGORY_LABEL = "Mini Gym (2D)" as const;

export type MiniGymLibraryStep = {
  id: string;
  slug: string;
  title: string;
};

const MINI_GYM_LIBRARY_CATALOG: readonly Omit<MiniGymLibraryStep, "id">[] =
  [] as const;

function miniGymLibrarySteps(
  idPrefix: "mg2" | "mg3",
): readonly MiniGymLibraryStep[] {
  return MINI_GYM_LIBRARY_CATALOG.map((item) => ({
    id: `${idPrefix}-${item.slug}`,
    slug: item.slug,
    title: item.title,
  }));
}

/** @deprecated Empty — flat fitness PNGs removed from `public/images/library/`. */
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
  if (ns === "mg3d") return "3d";
  return null;
}

export function miniGymLibraryCategoryLabel(
  dimension: MiniGymLibraryDimension,
): string {
  return MINI_GYM_3D_CATEGORY_LABEL;
}
