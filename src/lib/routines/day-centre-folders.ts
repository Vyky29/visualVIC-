import type { Routine, RoutineStep } from "@/lib/types/routine";
import {
  dayCentreHubRoomImageUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { dayCentreFolderForSlug } from "@/lib/cards/day-centre-folder-groups";

export const DAY_CENTRE_FOLDER_IDS = [
  "mini-gym",
  "bouldering",
  "cooking",
  "community",
  "mixed",
  "premium",
] as const;

export type DayCentreFolderId = (typeof DAY_CENTRE_FOLDER_IDS)[number];

export const DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS: Record<
  DayCentreFolderId,
  readonly string[]
> = {
  "mini-gym": ["dc-mini-gym"],
  bouldering: ["dc-bouldering"],
  cooking: ["dc-cooking"],
  community: ["dc-community"],
  mixed: ["dc-mixed"],
  premium: [],
};

const STOCK_ROUTINE_TO_FOLDER = Object.fromEntries(
  Object.entries(DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS).flatMap(
    ([folder, routineIds]) =>
      routineIds.map((routineId) => [routineId, folder]),
  ),
) as Record<string, DayCentreFolderId>;

export function isDayCentreFolderId(value: string): value is DayCentreFolderId {
  return (DAY_CENTRE_FOLDER_IDS as readonly string[]).includes(value);
}

export function dayCentreFolderFromStockRoutineId(
  routineId: string,
): DayCentreFolderId | undefined {
  return STOCK_ROUTINE_TO_FOLDER[routineId];
}

function detectDayCentreFolderFromSteps(
  steps: readonly RoutineStep[],
): DayCentreFolderId | undefined {
  for (const step of steps) {
    const urls = [
      step.imageUrl,
      step.generatedPixto?.illustrationUrl,
    ].filter(Boolean) as string[];
    for (const url of urls) {
      if (!url.includes("/day%20centre/") && !url.includes("/day centre/")) {
        if (url.includes("/climbing/") && url.includes("boulder")) {
          return "bouldering";
        }
        continue;
      }
      const slugMatch = url.match(/\/([^/]+)\.png(?:\?|$)/i);
      const slug = slugMatch?.[1]?.replace(/-focus$/, "");
      if (slug) {
        return dayCentreFolderForSlug(slug);
      }
    }
  }
  return undefined;
}

export function detectDayCentreFolderFromRoutine(
  routine: Routine,
): DayCentreFolderId | undefined {
  const fromStock = dayCentreFolderFromStockRoutineId(routine.id);
  if (fromStock) return fromStock;
  return detectDayCentreFolderFromSteps(routine.steps);
}

export function dayCentreFolderPickerHref(
  folderOrStockRoutineId: string,
): string {
  if (isDayCentreFolderId(folderOrStockRoutineId)) {
    return `/day-centre/${folderOrStockRoutineId}`;
  }
  const folder = dayCentreFolderFromStockRoutineId(folderOrStockRoutineId);
  if (folder) return `/day-centre/${folder}`;
  return `/player/${folderOrStockRoutineId}`;
}

export function dayCentreFolderDisplayName(
  folderId: DayCentreFolderId,
): string {
  switch (folderId) {
    case "mini-gym":
      return "Mini Gym";
    case "bouldering":
      return "Bouldering";
    case "cooking":
      return "Cooking";
    case "community":
      return "Community";
    case "mixed":
      return "Mixed";
    case "premium":
      return "Premium";
  }
}

export type DayCentreFolderLibrarySectionId =
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | "dcfoldercooking"
  | "dcfoldercommunity"
  | "dcfoldermixed"
  | "dcfolderpremium";

export function dayCentreFolderLibrarySectionId(
  folderId: DayCentreFolderId,
): DayCentreFolderLibrarySectionId {
  switch (folderId) {
    case "mini-gym":
      return "dcfolderminigym";
    case "bouldering":
      return "dcfolderbouldering";
    case "cooking":
      return "dcfoldercooking";
    case "community":
      return "dcfoldercommunity";
    case "mixed":
      return "dcfoldermixed";
    case "premium":
      return "dcfolderpremium";
  }
}

export function dayCentreFolderFromLibrarySectionId(
  section: string,
): DayCentreFolderId | undefined {
  switch (section) {
    case "dcfolderminigym":
      return "mini-gym";
    case "dcfolderbouldering":
      return "bouldering";
    case "dcfoldercooking":
      return "cooking";
    case "dcfoldercommunity":
      return "community";
    case "dcfoldermixed":
      return "mixed";
    case "dcfolderpremium":
      return "premium";
    default:
      return undefined;
  }
}

/** Preview icon for Home / Library folder headers. */
export function dayCentreFolderIconUrl(folderId: DayCentreFolderId): string {
  switch (folderId) {
    case "mini-gym":
      return dayCentreGeneralImageUrl("therapy-ball");
    case "bouldering":
      return climbingImageUrl("boulder-wall");
    case "cooking":
      return dayCentreGeneralImageUrl("cooking");
    case "community":
      return dayCentreGeneralImageUrl("westfield");
    case "mixed":
      return dayCentreHubRoomImageUrl();
    case "premium":
      return showerImageUrl("shampoo");
  }
}

export function resolveDayCentreFolderSchedules(
  folderId: DayCentreFolderId,
  routines: readonly Routine[],
): Routine[] {
  const stockIds = new Set<string>(
    DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS[folderId],
  );
  const stockOrder = DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS[folderId];
  const byId = new Map<string, Routine>();

  for (const routine of routines) {
    const matchesFolder =
      stockIds.has(routine.id) ||
      detectDayCentreFolderFromRoutine(routine) === folderId;
    if (matchesFolder) byId.set(routine.id, routine);
  }

  const orderedStock = stockOrder
    .map((id) => byId.get(id))
    .filter((r): r is Routine => Boolean(r));

  const extras = [...byId.values()]
    .filter((r) => !stockIds.has(r.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...orderedStock, ...extras];
}
