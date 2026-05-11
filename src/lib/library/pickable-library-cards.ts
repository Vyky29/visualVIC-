import type {
  GeneratedPixtoRoutineStepData,
  RoutineStep,
  VisualAsset,
} from "@/lib/types/routine";
import {
  BRUSHING_TEETH_CARD_FILES,
  BRUSHING_TEETH_SEQUENCE,
  brushingTeethImageUrl,
} from "@/lib/cards/brushing-teeth-cards";
import { CORE_CARD_FILES, CORE_SEQUENCE, coreImageUrl } from "@/lib/cards/core-cards";
import { SHOWER_CARD_FILES, SHOWER_SEQUENCE, showerImageUrl } from "@/lib/cards/shower-cards";
import {
  CLIMBING_CARD_FILES,
  CLIMBING_SEQUENCE,
  climbingImageUrl,
} from "@/lib/cards/climbing-cards";
import {
  SWIMMING_CARD_FILES,
  SWIMMING_SEQUENCE,
  swimmingImageUrl,
} from "@/lib/cards/swimming-cards";
import {
  AT_THE_AIRPORT_CARD_FILES,
  AT_THE_AIRPORT_SEQUENCE,
  atTheAirportImageUrl,
} from "@/lib/cards/at-the-airport-cards";
import {
  AT_THE_HOTEL_CARD_FILES,
  AT_THE_HOTEL_SEQUENCE,
  atTheHotelImageUrl,
} from "@/lib/cards/at-the-hotel-cards";
import { GETTING_DRESS_REGISTRY } from "@/lib/cards/getting-dress-undress-registry";
import {
  AIRPORT_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
} from "@/lib/experimental/generated-pixto-demo-routine";

const SEP = "::";

/** Namespace prefix in `pickId` (before `::`). */
export type PickablePackId =
  | "bt"
  | "shower"
  | "core"
  | "climb"
  | "swim"
  | "dress"
  | "airport"
  | "hotel";

export function pickablePackFromPickId(pickId: string): PickablePackId | null {
  const ns = pickId.split(SEP)[0]?.toLowerCase() ?? "";
  if (
    ns === "bt" ||
    ns === "shower" ||
    ns === "core" ||
    ns === "climb" ||
    ns === "swim" ||
    ns === "dress" ||
    ns === "airport" ||
    ns === "hotel"
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
  /** When set, new routine saves HTML shell step (airport / hotel), not flat PNG only. */
  generatedPixto?: GeneratedPixtoRoutineStepData;
};

function pid(ns: string, slug: string): string {
  return `${ns}${SEP}${slug}`;
}

function stemOf(file: string): string {
  return file.replace(/\.(png|PNG)$/i, "");
}

function titleFromSlug(slug: string): string {
  const words = slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function titleMapFromSequence(
  items: readonly { slug: string; title: string }[],
): Map<string, string> {
  return new Map(items.map((item) => [item.slug, item.title] as const));
}

function appendExtraCardsFromFiles(params: {
  out: PickableLibraryCard[];
  ns: PickablePackId;
  files: readonly string[];
  category: VisualAsset["category"];
  imageUrlForSlug: (slug: string) => string;
  titleMap: ReadonlyMap<string, string>;
}): void {
  const { out, ns, files, category, imageUrlForSlug, titleMap } = params;
  for (const file of files) {
    const slug = stemOf(file);
    if (slug.startsWith("backcard") || slug.startsWith("logo-")) continue;
    if (titleMap.has(slug)) continue;
    out.push({
      pickId: pid(ns, slug),
      label: titleFromSlug(slug),
      imageUrl: imageUrlForSlug(slug),
      category,
    });
  }
}

/** All Pixto cards users can add to a custom routine (V1 — local registries). */
export function buildPickableLibraryCards(): PickableLibraryCard[] {
  const out: PickableLibraryCard[] = [];
  const brushingTitleMap = titleMapFromSequence(BRUSHING_TEETH_SEQUENCE);
  const coreTitleMap = titleMapFromSequence(CORE_SEQUENCE);
  const showerTitleMap = titleMapFromSequence(SHOWER_SEQUENCE);
  const climbTitleMap = titleMapFromSequence(CLIMBING_SEQUENCE);
  const swimTitleMap = titleMapFromSequence(SWIMMING_SEQUENCE);
  const airportTitleMap = titleMapFromSequence(AT_THE_AIRPORT_SEQUENCE);
  const hotelTitleMap = titleMapFromSequence(AT_THE_HOTEL_SEQUENCE);

  for (const s of BRUSHING_TEETH_SEQUENCE) {
    out.push({
      pickId: pid("bt", s.slug),
      label: s.title,
      imageUrl: brushingTeethImageUrl(s.slug),
      category: "self-care",
    });
  }
  appendExtraCardsFromFiles({
    out,
    ns: "bt",
    files: BRUSHING_TEETH_CARD_FILES,
    category: "self-care",
    imageUrlForSlug: brushingTeethImageUrl,
    titleMap: brushingTitleMap,
  });
  for (const s of CORE_SEQUENCE) {
    out.push({
      pickId: pid("core", s.slug),
      label: s.title,
      imageUrl: coreImageUrl(s.slug),
      category: "home",
    });
  }
  appendExtraCardsFromFiles({
    out,
    ns: "core",
    files: CORE_CARD_FILES,
    category: "home",
    imageUrlForSlug: coreImageUrl,
    titleMap: coreTitleMap,
  });
  for (const s of SHOWER_SEQUENCE) {
    out.push({
      pickId: pid("shower", s.slug),
      label: s.title,
      imageUrl: showerImageUrl(s.slug),
      category: "self-care",
    });
  }
  appendExtraCardsFromFiles({
    out,
    ns: "shower",
    files: SHOWER_CARD_FILES,
    category: "self-care",
    imageUrlForSlug: showerImageUrl,
    titleMap: showerTitleMap,
  });
  for (const s of CLIMBING_SEQUENCE) {
    out.push({
      pickId: pid("climb", s.slug),
      label: s.title,
      imageUrl: climbingImageUrl(s.slug),
      category: "activity",
    });
  }
  appendExtraCardsFromFiles({
    out,
    ns: "climb",
    files: CLIMBING_CARD_FILES,
    category: "activity",
    imageUrlForSlug: climbingImageUrl,
    titleMap: climbTitleMap,
  });
  for (const s of SWIMMING_SEQUENCE) {
    out.push({
      pickId: pid("swim", s.slug),
      label: s.title,
      imageUrl: swimmingImageUrl(s.slug),
      category: "activity",
    });
  }
  appendExtraCardsFromFiles({
    out,
    ns: "swim",
    files: SWIMMING_CARD_FILES,
    category: "activity",
    imageUrlForSlug: swimmingImageUrl,
    titleMap: swimTitleMap,
  });

  AT_THE_AIRPORT_SEQUENCE.forEach((s, i) => {
    const gp = AIRPORT_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("airport", s.slug),
      label: s.title,
      imageUrl: atTheAirportImageUrl(s.slug),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
          }
        : undefined,
    });
  });
  appendExtraCardsFromFiles({
    out,
    ns: "airport",
    files: AT_THE_AIRPORT_CARD_FILES,
    category: "home",
    imageUrlForSlug: atTheAirportImageUrl,
    titleMap: airportTitleMap,
  });

  AT_THE_HOTEL_SEQUENCE.forEach((s, i) => {
    const gp = HOTEL_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("hotel", s.slug),
      label: s.title,
      imageUrl: atTheHotelImageUrl(s.slug),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
          }
        : undefined,
    });
  });
  appendExtraCardsFromFiles({
    out,
    ns: "hotel",
    files: AT_THE_HOTEL_CARD_FILES,
    category: "home",
    imageUrlForSlug: atTheHotelImageUrl,
    titleMap: hotelTitleMap,
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

export function packNsFromPickId(pickId: string): string {
  return pickId.split(SEP)[0]?.toLowerCase() ?? "";
}

export function routineStepsFromLibraryPick(
  pickId: string,
  rowIndex: number,
): RoutineStep[] {
  const card = getPickableLibraryCard(pickId);
  if (!card) return [];
  const safe = pickId.replace(/[^a-zA-Z0-9]+/g, "-");
  const base: RoutineStep = {
    id: `lib-step-${rowIndex}-${safe}`,
    title: card.label,
    imageUrl: card.imageUrl,
  };
  if (card.generatedPixto) {
    base.generatedPixto = card.generatedPixto;
  }
  return [base];
}

/** @deprecated Use {@link routineStepsFromLibraryPick} */
export function routineStepFromPickId(
  pickId: string,
  index: number,
): RoutineStep | null {
  const steps = routineStepsFromLibraryPick(pickId, index);
  return steps[0] ?? null;
}
