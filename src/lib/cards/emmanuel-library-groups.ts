/**
 * Library sub-sections for Tailored schedules · Emmanuel.
 * Items = object icons · Avatar = personalised 3D scenes.
 */

export type EmmanuelLibraryDimension = "items" | "avatar";

export const EMMANUEL_LIBRARY_DIMENSION_ORDER: readonly EmmanuelLibraryDimension[] =
  ["items", "avatar"] as const;

export function emmanuelLibraryDimensionFromPickNamespace(
  ns: string,
): EmmanuelLibraryDimension | null {
  if (ns === "dcemmanuel-icons") return "items";
  if (ns === "dcemmanuel") return "avatar";
  return null;
}

export function emmanuelLibraryGroupLabel(
  dimension: EmmanuelLibraryDimension,
  lang: "en" | "es",
): string {
  if (dimension === "items") {
    return lang === "es" ? "Objetos" : "Items";
  }
  return "Avatar";
}
