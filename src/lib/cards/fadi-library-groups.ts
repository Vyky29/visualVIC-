/**
 * Library sub-sections for Tailored schedules · Fadi.
 */

import type { TailoredLibraryDimension } from "@/lib/cards/tailored-library-dimensions";
import { tailoredLibraryDimensionFromPickSlug } from "@/lib/cards/tailored-library-dimensions";

export type FadiLibraryGroup = TailoredLibraryDimension;

export const FADI_LIBRARY_GROUP_ORDER: readonly FadiLibraryGroup[] = [
  "avatar",
  "items",
  "emotions",
] as const;

export function fadiLibraryGroupForPickId(pickId: string): FadiLibraryGroup {
  const slug = pickId.split("::")[1] ?? "";
  return tailoredLibraryDimensionFromPickSlug(slug);
}
