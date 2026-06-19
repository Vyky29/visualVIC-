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
