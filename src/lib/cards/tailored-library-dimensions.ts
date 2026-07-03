/**
 * Tailored participant library — Avatar · Items · Emotions (no mixing).
 */

export type TailoredLibraryDimension = "avatar" | "items" | "emotions";

export const TAILORED_LIBRARY_DIMENSION_ORDER: readonly TailoredLibraryDimension[] =
  ["avatar", "items", "emotions"] as const;

export function tailoredLibraryCategoryRibbon(
  participantLabel: string,
  dimension: TailoredLibraryDimension,
): string {
  const base = `${participantLabel} ·`;
  switch (dimension) {
    case "avatar":
      return `${base} Avatar`;
    case "items":
      return `${base} Items`;
    case "emotions":
      return `${base} Emotions`;
  }
}

export function tailoredLibraryDimensionLabel(
  dimension: TailoredLibraryDimension,
  lang: "en" | "es",
): string {
  if (dimension === "avatar") return lang === "es" ? "Avatar" : "Avatar";
  if (dimension === "items") return lang === "es" ? "Objetos" : "Items";
  return lang === "es" ? "Emociones" : "Emotions";
}

export function tailoredLibraryDimensionFromPickSlug(
  slug: string,
): TailoredLibraryDimension {
  if (slug.startsWith("emotion-")) return "emotions";
  if (slug.startsWith("items-")) return "items";
  return "avatar";
}
