/**
 * Library sub-sections for Tailored schedules · Emmanuel (2D / 3D scenes).
 */

export type EmmanuelLibraryDimension = "2d" | "3d";

export const EMMANUEL_LIBRARY_DIMENSION_ORDER: readonly EmmanuelLibraryDimension[] =
  ["2d", "3d"] as const;

export function emmanuelLibraryDimensionFromPickNamespace(
  ns: string,
): EmmanuelLibraryDimension | null {
  if (ns === "dcemmanuel2d") return "2d";
  if (ns === "dcemmanuel") return "3d";
  return null;
}

export function emmanuelLibraryGroupLabel(
  dimension: EmmanuelLibraryDimension,
  lang: "en" | "es",
): string {
  if (dimension === "2d") {
    return lang === "es" ? "Emmanuel (2D)" : "Emmanuel (2D)";
  }
  return lang === "es" ? "Emmanuel (3D)" : "Emmanuel (3D)";
}
