/**
 * Library sub-sections for Tailored schedules · Ikram.
 * Avatar · Items · Emotions only — no mixing 2D/3D scenes with object photos.
 */

import type { TailoredLibraryDimension } from "@/lib/cards/tailored-library-dimensions";
import { tailoredLibraryDimensionFromPickSlug } from "@/lib/cards/tailored-library-dimensions";

export type IkramLibraryGroup = TailoredLibraryDimension;

export const IKRAM_LIBRARY_GROUP_ORDER: readonly IkramLibraryGroup[] = [
  "avatar",
  "items",
  "emotions",
] as const;

/** Library picker subgroup from full pick id (`dcikram::slug`). */
export function ikramLibraryGroupForPickId(pickId: string): IkramLibraryGroup {
  const slug = pickId.split("::")[1] ?? "";
  return tailoredLibraryDimensionFromPickSlug(slug);
}
