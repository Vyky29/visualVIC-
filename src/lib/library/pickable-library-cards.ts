import type { VisualAsset } from "@/lib/types/routine";
import type { RoutineStep } from "@/lib/types/routine";
import {
  BRUSHING_TEETH_SEQUENCE,
  brushingTeethImageUrl,
} from "@/lib/cards/brushing-teeth-cards";
import { CORE_SEQUENCE, coreImageUrl } from "@/lib/cards/core-cards";
import { SHOWER_SEQUENCE, showerImageUrl } from "@/lib/cards/shower-cards";
import { CLIMBING_SEQUENCE, climbingImageUrl } from "@/lib/cards/climbing-cards";
import { SWIMMING_SEQUENCE, swimmingImageUrl } from "@/lib/cards/swimming-cards";
import {
  AT_THE_AIRPORT_SEQUENCE,
  atTheAirportImageUrl,
} from "@/lib/cards/at-the-airport-cards";
import {
  AT_THE_HOTEL_SEQUENCE,
  atTheHotelImageUrl,
} from "@/lib/cards/at-the-hotel-cards";
import { GETTING_DRESS_REGISTRY } from "@/lib/cards/getting-dress-undress-registry";
import {
  AIRPORT_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";

const SEP = "::";

/** Library tile: full generated HTML card pack (not raw PNG steps). */
export const GENPACK_AT_AIRPORT_PICK_ID = "genpack::at-the-airport" as const;
export const GENPACK_AT_HOTEL_PICK_ID = "genpack::at-the-hotel" as const;

/** Namespace prefix in `pickId` (before `::`). */
export type PickablePackId =
  | "bt"
  | "shower"
  | "core"
  | "climb"
  | "swim"
  | "dress";

export function pickablePackFromPickId(pickId: string): PickablePackId | null {
  const ns = pickId.split(SEP)[0]?.toLowerCase() ?? "";
  if (
    ns === "bt" ||
    ns === "shower" ||
    ns === "core" ||
    ns === "climb" ||
    ns === "swim" ||
    ns === "dress"
  ) {
    return ns as PickablePackId;
  }
  return null;
}

export type PickableLibraryCard = {
  pickId: string;
  label: string;
  imageUrl: string;
  category: VisualAsset["category"];
};

function pid(ns: string, slug: string): string {
  return `${ns}${SEP}${slug}`;
}

/** All Pixto cards users can add to a custom routine (V1 — local registries). */
export function buildPickableLibraryCards(): PickableLibraryCard[] {
  const out: PickableLibraryCard[] = [];

  for (const s of BRUSHING_TEETH_SEQUENCE) {
    out.push({
      pickId: pid("bt", s.slug),
      label: s.title,
      imageUrl: brushingTeethImageUrl(s.slug),
      category: "self-care",
    });
  }
  for (const s of CORE_SEQUENCE) {
    out.push({
      pickId: pid("core", s.slug),
      label: s.title,
      imageUrl: coreImageUrl(s.slug),
      category: "home",
    });
  }
  for (const s of SHOWER_SEQUENCE) {
    out.push({
      pickId: pid("shower", s.slug),
      label: s.title,
      imageUrl: showerImageUrl(s.slug),
      category: "self-care",
    });
  }
  for (const s of CLIMBING_SEQUENCE) {
    out.push({
      pickId: pid("climb", s.slug),
      label: s.title,
      imageUrl: climbingImageUrl(s.slug),
      category: "activity",
    });
  }
  for (const s of SWIMMING_SEQUENCE) {
    out.push({
      pickId: pid("swim", s.slug),
      label: s.title,
      imageUrl: swimmingImageUrl(s.slug),
      category: "activity",
    });
  }

  /** HTML shell cards + titles/ribbons — one tap adds the full sequence. */
  out.push({
    pickId: GENPACK_AT_AIRPORT_PICK_ID,
    label: "At the airport (all steps)",
    imageUrl: atTheAirportImageUrl(AT_THE_AIRPORT_SEQUENCE[0].slug),
    category: "home",
  });
  out.push({
    pickId: GENPACK_AT_HOTEL_PICK_ID,
    label: "At the hotel (all steps)",
    imageUrl: atTheHotelImageUrl(AT_THE_HOTEL_SEQUENCE[0].slug),
    category: "home",
  });

  for (const card of GETTING_DRESS_REGISTRY) {
    out.push({
      pickId: pid("dress", card.slug),
      label: card.title,
      imageUrl: card.imageUrl,
      category: "self-care",
    });
  }

  return out;
}

export const PICKABLE_LIBRARY_CARDS: PickableLibraryCard[] =
  buildPickableLibraryCards();

const pickableById = new Map(
  PICKABLE_LIBRARY_CARDS.map((c) => [c.pickId, c] as const),
);

export function getPickableLibraryCard(
  pickId: string,
): PickableLibraryCard | undefined {
  return pickableById.get(pickId);
}

export function isGeneratedPackPickId(pickId: string): boolean {
  return (
    pickId === GENPACK_AT_AIRPORT_PICK_ID || pickId === GENPACK_AT_HOTEL_PICK_ID
  );
}

/**
 * Steps for Library → new routine (PNG picks = one step each;
 * genpack picks = full sequence with `generatedPixto`).
 */
export function routineStepsFromLibraryPick(
  pickId: string,
  rowIndex: number,
): RoutineStep[] {
  const prefix = `lib-${rowIndex}-${pickId.replace(/[^a-zA-Z0-9]+/g, "-")}`;
  if (pickId === GENPACK_AT_AIRPORT_PICK_ID) {
    return routineStepsFromGeneratedCardProps(
      prefix,
      AIRPORT_GENERATED_CARD_PROPS,
    );
  }
  if (pickId === GENPACK_AT_HOTEL_PICK_ID) {
    return routineStepsFromGeneratedCardProps(
      prefix,
      HOTEL_GENERATED_CARD_PROPS,
    );
  }

  const card = getPickableLibraryCard(pickId);
  if (!card) return [];
  const safe = pickId.replace(/[^a-zA-Z0-9]+/g, "-");
  return [
    {
      id: `lib-step-${rowIndex}-${safe}`,
      title: card.label,
      imageUrl: card.imageUrl,
    },
  ];
}

/** @deprecated Use {@link routineStepsFromLibraryPick} */
export function routineStepFromPickId(
  pickId: string,
  index: number,
): RoutineStep | null {
  const steps = routineStepsFromLibraryPick(pickId, index);
  return steps[0] ?? null;
}
