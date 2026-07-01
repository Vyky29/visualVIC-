import type { Routine, RoutineStep } from "@/lib/types/routine";
import {
  dayCentreHubRoomImageUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { dayCentreFolderForSlug } from "@/lib/cards/day-centre-folder-groups";
import { isDayCentreMixedStaffRoutine } from "@/lib/routines/day-centre-mixed-routines";

export const DAY_CENTRE_FOLDER_IDS = [
  "mini-gym",
  "bouldering",
  "cooking",
  "community",
  "mixed",
] as const;

export type DayCentreFolderId = (typeof DAY_CENTRE_FOLDER_IDS)[number];

export const DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS: Record<
  DayCentreFolderId,
  readonly string[]
> = {
  "mini-gym": [
    "dc-mini-gym",
    "dc-mini-gym-3d",
    "dc-mini-gym-warmup",
    "dc-mini-gym-cardio",
    "dc-mini-gym-strength",
    "dc-mini-gym-3d-warmup",
    "dc-mini-gym-3d-cardio",
    "dc-mini-gym-3d-strength",
  ],
  bouldering: [
    "dc-bouldering",
    "dc-bouldering-prep",
    "dc-bouldering-wall",
  ],
  cooking: [
    "dc-cooking",
    "dc-cooking-prep",
    "dc-cooking-bake",
  ],
  community: [
    "dc-community",
    "dc-community-market",
    "dc-community-park",
  ],
  /** Staff-built schedules only — see `day-centre-mixed-routines`. */
  mixed: [],
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
  }
}

export type DayCentreFolderLibrarySectionId =
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | "dcfoldercooking"
  | "dcfoldercommunity"
  | "dcfoldermixed";

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
  }
}

export function resolveDayCentreFolderSchedules(
  folderId: DayCentreFolderId,
  routines: readonly Routine[],
): Routine[] {
  if (folderId === "mixed") {
    return routines
      .filter(isDayCentreMixedStaffRoutine)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const stockIds = new Set<string>(
    DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS[folderId],
  );
  const stockOrder = DAY_CENTRE_FOLDER_STOCK_ROUTINE_IDS[folderId];
  const byId = new Map<string, Routine>();

  for (const routine of routines) {
    if (isDayCentreMixedStaffRoutine(routine)) continue;
    if (stockIds.has(routine.id)) {
      byId.set(routine.id, routine);
      continue;
    }
    // Mini gym — stock object routines only (no participant auto-match).
    if (folderId === "mini-gym") continue;
    if (detectDayCentreFolderFromRoutine(routine) === folderId) {
      byId.set(routine.id, routine);
    }
  }

  const orderedStock = stockOrder
    .map((id) => byId.get(id))
    .filter((r): r is Routine => Boolean(r));

  const extras = [...byId.values()]
    .filter((r) => !stockIds.has(r.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...orderedStock, ...extras];
}
