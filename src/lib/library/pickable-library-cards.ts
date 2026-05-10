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
import { GETTING_DRESS_REGISTRY } from "@/lib/cards/getting-dress-undress-registry";

const SEP = "::";

/** Namespace prefix in `pickId` (before `::`). */
export type PickablePackId = "bt" | "shower" | "core" | "climb" | "swim" | "dress";

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

/** All Pixto cards users can add to a custom routine (V1 — local PNG registries only). */
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

/** Build a routine step for storage / playback (stable id from pick + index). */
export function routineStepFromPickId(
  pickId: string,
  index: number,
): RoutineStep | null {
  const card = getPickableLibraryCard(pickId);
  if (!card) return null;
  const safe = pickId.replace(/[^a-zA-Z0-9]+/g, "-");
  return {
    id: `lib-step-${index}-${safe}`,
    title: card.label,
    imageUrl: card.imageUrl,
  };
}
