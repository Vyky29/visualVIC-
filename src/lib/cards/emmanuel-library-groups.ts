/**
 * Library sub-sections for Tailored schedules · Emmanuel.
 */

import type { TailoredLibraryDimension } from "@/lib/cards/tailored-library-dimensions";
import {
  tailoredLibraryDimensionFromPickSlug,
  tailoredLibraryDimensionLabel,
} from "@/lib/cards/tailored-library-dimensions";

export type EmmanuelLibraryDimension = TailoredLibraryDimension;

export const EMMANUEL_LIBRARY_DIMENSION_ORDER: readonly EmmanuelLibraryDimension[] =
  ["avatar", "items", "emotions"] as const;

export function emmanuelLibraryDimensionFromPickNamespace(
  ns: string,
): EmmanuelLibraryDimension | null {
  if (ns === "dcemmanuel-icons") return "items";
  if (ns === "dcemmanuel") return "avatar";
  return null;
}

export function emmanuelLibraryDimensionFromPickId(
  pickId: string,
): EmmanuelLibraryDimension {
  const ns = pickId.split("::")[0] ?? "";
  const fromNs = emmanuelLibraryDimensionFromPickNamespace(ns);
  if (fromNs) return fromNs;
  const slug = pickId.split("::")[1] ?? "";
  return tailoredLibraryDimensionFromPickSlug(slug);
}

export function emmanuelLibraryGroupLabel(
  dimension: EmmanuelLibraryDimension,
  lang: "en" | "es",
): string {
  return tailoredLibraryDimensionLabel(dimension, lang);
}
