/**
 * Library sub-sections inside Physical Activity.
 * All 3D objects and gym machines appear under a single "3D" group.
 */

export type PhysicalLibraryGroup = "3d";

export const PHYSICAL_LIBRARY_GROUP_ORDER: readonly PhysicalLibraryGroup[] = [
  "3d",
] as const;

export function physicalLibraryGroupFromPickNamespace(
  ns: string,
): PhysicalLibraryGroup | null {
  if (ns === "phy3d" || ns === "phy3g") return "3d";
  return null;
}
