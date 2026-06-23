/**
 * Library sub-sections for Tailored schedules · Emmanuel.
 * Icons = schedule cards · 2D / 3D = personalised avatar scenes.
 */

export type EmmanuelLibraryDimension = "icons" | "2d" | "3d";

export const EMMANUEL_LIBRARY_DIMENSION_ORDER: readonly EmmanuelLibraryDimension[] =
  ["icons", "2d", "3d"] as const;

export function emmanuelLibraryDimensionFromPickNamespace(
  ns: string,
): EmmanuelLibraryDimension | null {
  if (ns === "dcemmanuel-icons") return "icons";
  if (ns === "dcemmanuel2d") return "2d";
  if (ns === "dcemmanuel") return "3d";
  return null;
}

export function emmanuelLibraryGroupLabel(
  dimension: EmmanuelLibraryDimension,
  lang: "en" | "es",
): string {
  if (dimension === "icons") {
    return lang === "es" ? "Emmanuel (iconos)" : "Emmanuel (icons)";
  }
  if (dimension === "2d") {
    return lang === "es" ? "Emmanuel (avatar 2D)" : "Emmanuel (avatar 2D)";
  }
  return lang === "es" ? "Emmanuel (avatar 3D)" : "Emmanuel (avatar 3D)";
}
