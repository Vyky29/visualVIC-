import type {
  GeneratedPixtoRoutineStepData,
  RoutineStep,
  VisualAsset,
} from "@/lib/types/routine";
import { tailoredItems3dImageUrlForStep } from "@/lib/cards/tailored-items-3d-shared";
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
import {
  DAY_CENTRE_GENERAL_CARD_FILES,
  DAY_CENTRE_GENERAL_SEQUENCE,
  dayCentreGeneralImageUrlForStep,
} from "@/lib/cards/day-centre-general-cards";
import { dayCentreLibraryGroupForSlug } from "@/lib/cards/day-centre-library-groups";
import {
  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE,
  dayCentreIkramImageUrlForStep,
} from "@/lib/cards/day-centre-ikram-cards";
import {
  DAY_CENTRE_SERINE_LIBRARY_SEQUENCE,
  dayCentreSerineImageUrlForStep,
} from "@/lib/cards/day-centre-serine-cards";
import {
  DAY_CENTRE_AYAAN_LIBRARY_SEQUENCE,
  dayCentreAyaanImageUrlForStep,
} from "@/lib/cards/day-centre-ayaan-cards";
import {
  DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE,
  dayCentreCyrusImageUrlForStep,
} from "@/lib/cards/day-centre-cyrus-cards";
import {
  DAY_CENTRE_FADI_LIBRARY_SEQUENCE,
  DAY_CENTRE_FADI_ITEMS_LIBRARY_SEQUENCE,
  dayCentreFadiImageUrlForStep,
} from "@/lib/cards/day-centre-fadi-cards";
import {
  DAY_CENTRE_TIMI_LIBRARY_SEQUENCE,
  dayCentreTimiImageUrlForStep,
} from "@/lib/cards/day-centre-timi-cards";
import {
  DAY_CENTRE_EMMANUEL_ICON_SEQUENCE,
  DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE,
  dayCentreEmmanuelIconImageUrlForStep,
  dayCentreEmmanuelImageUrlForStep,
} from "@/lib/cards/day-centre-emmanuel-cards";
import {
  MINI_GYM_2D_LIBRARY_SEQUENCE,
  MINI_GYM_3D_LIBRARY_SEQUENCE,
  MINI_GYM_LIBRARY_SLUGS,
  miniGymLibraryCategoryLabel,
} from "@/lib/cards/mini-gym-library-groups";
import {
  DAY_CENTRE_CATEGORY_COLOUR,
  dayCentreGeneralImageUrl,
  dayCentrePackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import { GETTING_DRESS_REGISTRY } from "@/lib/cards/getting-dress-undress-registry";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import {
  DAY_CENTRE_PREMIUM_PICKS,
  type DayCentrePremiumSourcePack,
} from "@/lib/cards/day-centre-premium-cards";
import {
  PHYSICAL_2D_LIBRARY_SEQUENCE,
  PHYSICAL_3D_GYM_CARD_FILES,
  PHYSICAL_3D_GYM_SEQUENCE,
  PHYSICAL_3D_LIBRARY_SEQUENCE,
  physical3dGymImageUrl,
  physical3dGymImageUrlForStep,
  physical3dImageUrlForStep,
  physicalImageUrlForStep,
} from "@/lib/cards/physical-cards";
import {
  AIRPORT_GENERATED_CARD_PROPS,
  DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS,
  DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS,
  DAY_CENTRE_SERINE_GENERATED_CARD_PROPS,
  DAY_CENTRE_AYAAN_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_ICON_GENERATED_CARD_PROPS,
  DAY_CENTRE_CYRUS_GENERATED_CARD_PROPS,
  DAY_CENTRE_FADI_GENERATED_CARD_PROPS,
  DAY_CENTRE_FADI_ITEMS_LIBRARY_GENERATED_CARD_PROPS,
  DAY_CENTRE_TIMI_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
  PHYSICAL_2D_LIBRARY_GENERATED_CARD_PROPS,
  PHYSICAL_3D_GENERATED_CARD_PROPS,
  PHYSICAL_3D_GYM_GENERATED_CARD_PROPS,
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
  | "hotel"
  | "daycentre"
  | "dcikram"
  | "dcserine"
  | "dcayaan"
  | "dcemmanuel"
  | "dcemmanuel2d"
  | "dcemmanuel-icons"
  | "dccyrus"
  | "dcfadi"
  | "dctimi"
  | "dcpremium"
  | "mg2d"
  | "mg3d"
  | "phy2d"
  | "phy3d"
  | "phy3g";

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
    ns === "hotel" ||
    ns === "daycentre" ||
    ns === "dcikram" ||
    ns === "dcserine" ||
    ns === "dcayaan" ||
    ns === "dcemmanuel" ||
    ns === "dcemmanuel2d" ||
    ns === "dcemmanuel-icons" ||
    ns === "dccyrus" ||
    ns === "dcfadi" ||
    ns === "dctimi" ||
    ns === "dcpremium" ||
    ns === "mg2d" ||
    ns === "mg3d" ||
    ns === "phy2d" ||
    ns === "phy3d" ||
    ns === "phy3g"
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

function miniGymLibraryGeneratedPixto(
  title: string,
  illustrationUrl: string,
): GeneratedPixtoRoutineStepData {
  return {
    illustrationUrl,
    title,
    category: miniGymLibraryCategoryLabel("3d"),
    categoryColour: DAY_CENTRE_CATEGORY_COLOUR,
    iconUrl: dayCentrePackMarkUrl(),
  };
}

function generalGeneratedPixtoBySlug(
  slug: string,
): GeneratedPixtoRoutineStepData | undefined {
  const index = DAY_CENTRE_GENERAL_SEQUENCE.findIndex((s) => s.slug === slug);
  if (index < 0) return undefined;
  const gp = DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS[index];
  if (!gp) return undefined;
  return {
    illustrationUrl: gp.illustrationUrl,
    title: gp.title,
    category: gp.category,
    categoryColour: gp.categoryColour,
    iconUrl: gp.iconUrl,
    cardType: gp.cardType,
  };
}

function premiumPickImageUrl(
  sourcePack: DayCentrePremiumSourcePack,
  slug: string,
): string {
  if (sourcePack === "dress") return gettingDressUndressImageUrl(slug);
  if (sourcePack === "shower") return showerImageUrl(slug);
  return swimmingImageUrl(slug);
}

/** All Pixto cards users can add to a custom routine (V1 — local registries). */
export function buildPickableLibraryCards(): PickableLibraryCard[] {
  const out: PickableLibraryCard[] = [];
  const brushingTitleMap = titleMapFromSequence(BRUSHING_TEETH_SEQUENCE);
  const coreTitleMap = titleMapFromSequence(CORE_SEQUENCE);
  const showerTitleMap = titleMapFromSequence(SHOWER_SEQUENCE);
  const physical3dTitleMap = titleMapFromSequence([
    ...PHYSICAL_3D_LIBRARY_SEQUENCE,
    ...PHYSICAL_3D_GYM_SEQUENCE,
  ]);
  const climbTitleMap = titleMapFromSequence(CLIMBING_SEQUENCE);
  const swimTitleMap = titleMapFromSequence(SWIMMING_SEQUENCE);
  const airportTitleMap = titleMapFromSequence(AT_THE_AIRPORT_SEQUENCE);
  const hotelTitleMap = titleMapFromSequence(AT_THE_HOTEL_SEQUENCE);
  const dayCentreGeneralTitleMap = titleMapFromSequence(DAY_CENTRE_GENERAL_SEQUENCE);
  const dayCentreIkramTitleMap = titleMapFromSequence(DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE);

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
    const pickKey = s.id.startsWith("shower-") ? s.id.slice("shower-".length) : s.id;
    out.push({
      pickId: pid("shower", pickKey),
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

  DAY_CENTRE_GENERAL_SEQUENCE.forEach((s, i) => {
    if (MINI_GYM_LIBRARY_SLUGS.has(s.slug)) return;
    if (dayCentreLibraryGroupForSlug(s.slug) === "fitness-held") return;
    const gp = DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("daycentre", s.slug),
      label: s.title,
      imageUrl: dayCentreGeneralImageUrlForStep(s),
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
    ns: "daycentre",
    files: DAY_CENTRE_GENERAL_CARD_FILES.filter(
      (file) => dayCentreLibraryGroupForSlug(file.replace(/\.png$/, "")) !== "fitness-held",
    ),
    category: "home",
    imageUrlForSlug: (slug) =>
      dayCentreGeneralImageUrlForStep({ id: slug, slug, title: slug }),
    titleMap: dayCentreGeneralTitleMap,
  });

  MINI_GYM_2D_LIBRARY_SEQUENCE.forEach((s) => {
    const illustrationUrl = physicalImageUrlForStep(s);
    out.push({
      pickId: pid("mg2d", s.slug),
      label: s.title,
      imageUrl: illustrationUrl,
      category: "home",
      generatedPixto: miniGymLibraryGeneratedPixto(s.title, illustrationUrl),
    });
  });

  MINI_GYM_3D_LIBRARY_SEQUENCE.forEach((s) => {
    const illustrationUrl = physical3dImageUrlForStep(s);
    out.push({
      pickId: pid("mg3d", s.slug),
      label: s.title,
      imageUrl: illustrationUrl,
      category: "home",
      generatedPixto: miniGymLibraryGeneratedPixto(s.title, illustrationUrl),
    });
  });

  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcikram", s.slug),
      label: s.title,
      imageUrl: dayCentreIkramImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_SERINE_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_SERINE_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcserine", s.slug),
      label: s.title,
      imageUrl: dayCentreSerineImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_AYAAN_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_AYAAN_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcayaan", s.slug),
      label: s.title,
      imageUrl: dayCentreAyaanImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_EMMANUEL_ICON_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_EMMANUEL_ICON_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcemmanuel-icons", s.slug),
      label: s.title,
      imageUrl: dayCentreEmmanuelIconImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_EMMANUEL_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcemmanuel", s.slug),
      label: s.title,
      imageUrl: dayCentreEmmanuelImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_CYRUS_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dccyrus", s.slug),
      label: s.title,
      imageUrl: dayCentreCyrusImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_FADI_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_FADI_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcfadi", s.slug),
      label: s.title,
      imageUrl: dayCentreFadiImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_FADI_ITEMS_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_FADI_ITEMS_LIBRARY_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dcfadi", `items-${s.slug}`),
      label: s.title,
      imageUrl: tailoredItems3dImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  DAY_CENTRE_TIMI_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = DAY_CENTRE_TIMI_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("dctimi", s.slug),
      label: s.title,
      imageUrl: dayCentreTimiImageUrlForStep(s),
      category: "home",
      generatedPixto: gp
        ? {
            illustrationUrl: gp.illustrationUrl,
            title: gp.title,
            category: gp.category,
            categoryColour: gp.categoryColour,
            iconUrl: gp.iconUrl,
            cardType: gp.cardType,
            focusIllustrationUrl: gp.focusIllustrationUrl,
          }
        : undefined,
    });
  });

  PHYSICAL_2D_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = PHYSICAL_2D_LIBRARY_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("phy2d", s.slug),
      label: s.title,
      imageUrl: physicalImageUrlForStep(s),
      category: "activity",
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

  PHYSICAL_3D_LIBRARY_SEQUENCE.forEach((s, i) => {
    const gp = PHYSICAL_3D_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("phy3d", s.slug),
      label: s.title,
      imageUrl: physical3dImageUrlForStep(s),
      category: "activity",
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

  PHYSICAL_3D_GYM_SEQUENCE.forEach((s, i) => {
    const gp = PHYSICAL_3D_GYM_GENERATED_CARD_PROPS[i];
    out.push({
      pickId: pid("phy3d", s.slug),
      label: s.title,
      imageUrl: physical3dGymImageUrlForStep(s),
      category: "activity",
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
    ns: "phy3d",
    files: PHYSICAL_3D_GYM_CARD_FILES,
    category: "activity",
    imageUrlForSlug: (slug) => physical3dGymImageUrl(slug),
    titleMap: physical3dTitleMap,
  });

  for (const card of GETTING_DRESS_REGISTRY) {
    out.push({
      pickId: pid("dress", card.slug),
      label: card.title,
      imageUrl: card.imageUrl,
      category: "self-care",
    });
  }

  for (const pick of DAY_CENTRE_PREMIUM_PICKS) {
    out.push({
      pickId: pid("dcpremium", pick.slug),
      label: pick.title,
      imageUrl: premiumPickImageUrl(pick.sourcePack, pick.slug),
      category: "home",
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
