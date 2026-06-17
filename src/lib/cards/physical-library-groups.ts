/**
 * Library sub-sections inside Physical Activity (2D / 3D / 3D gym).
 */

export type PhysicalLibraryGroup = "2d" | "3d" | "3d-gym";

export const PHYSICAL_LIBRARY_GROUP_ORDER: readonly PhysicalLibraryGroup[] = [
  "2d",
  "3d",
  "3d-gym",
] as const;

export function physicalLibraryGroupFromPickNamespace(
  ns: string,
): PhysicalLibraryGroup | null {
  if (ns === "phy2d") return "2d";
  if (ns === "phy3d") return "3d";
  if (ns === "phy3g") return "3d-gym";
  return null;
}
