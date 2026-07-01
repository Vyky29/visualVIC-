import {
  dayCentreLibraryGroupFromSectionId,
  dayCentreLibrarySectionIdForSlug,
  type DayCentreLibrarySectionId,
} from "@/lib/cards/day-centre-library-sections";
import { isDayCentreBoulderingClimbSlug } from "@/lib/cards/day-centre-folder-groups";
import {
  emmanuelLibraryDimensionFromPickNamespace,
  emmanuelLibraryGroupLabel,
} from "@/lib/cards/emmanuel-library-groups";
import {
  ikramLibraryGroupForPickId,
  type IkramLibraryGroup,
} from "@/lib/cards/ikram-library-groups";
import {
  miniGymLibraryDimensionFromPickNamespace,
} from "@/lib/cards/mini-gym-library-groups";
import {
  physicalLibraryGroupFromPickNamespace,
} from "@/lib/cards/physical-library-groups";
import { getDressRegistryCardBySlug } from "@/lib/cards/getting-dress-undress-registry";
import {
  dashboardPackCategoryTitle,
  dayCentreLibraryGroupLabel,
  ikramLibraryGroupLabel,
  libraryPackSectionTitle,
  miniGymLibraryGroupLabel,
  physicalLibraryGroupLabel,
  type DashboardPackCategory,
} from "@/lib/i18n/app-shell-locale";
import {
  buildPickableLibraryCards,
  pickablePackFromPickId,
  type PickableLibraryCard,
  type PickablePackId,
} from "@/lib/library/pickable-library-cards";

const NOW_W = 531;
const NOW_H = 648;

/** Post-process bundled cards: strip ribete + logo, crop to illustration, enlarge. */
export type CardReviewStatus =
  | ""
  | "keep"
  | "redo"
  | "digitalizar"
  | "papelera";

export type CardReviewCatalogEntry = {
  pickId: string;
  slug: string;
  label: string;
  imageUrl: string;
  imagePath: string;
  category: DashboardPackCategory;
  categoryLabel: string;
  sectionId: string;
  sectionLabel: string;
  subgroupLabel: string | null;
  packId: PickablePackId | null;
  status: CardReviewStatus;
  notes: string;
};

export type CardReviewCatalog = {
  version: 1;
  generatedAt: string;
  cardSize: { width: number; height: number };
  cards: CardReviewCatalogEntry[];
};

type LibrarySectionId =
  | Exclude<
      PickablePackId,
      | "dress"
      | "phy2d"
      | "phy3d"
      | "phy3g"
      | "daycentre"
      | "mg2d"
      | "mg3d"
      | "dcemmanuel2d"
      | "dcemmanuel-icons"
    >
  | "dress-on"
  | "dress-off"
  | "physical"
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | DayCentreLibrarySectionId;

const SECTION_ORDER_BY_CATEGORY: Record<
  DashboardPackCategory,
  readonly LibrarySectionId[]
> = {
  "self-care": ["bt", "shower", "dress-on", "dress-off"],
  home: [
    "core",
    "airport",
    "hotel",
    "dcfolderminigym",
    "dcfolderbouldering",
    "dcg-mini-gym",
    "dcg-materials-kitchen",
    "dcg-materials-art",
    "dcg-technology",
    "dcg-activities-cognitive",
    "dcg-activities-cooking",
    "dcg-personal-care",
    "dcg-community",
    "dcg-activities-leisure",
    "dcg-shopping",
    "dcg-food-drink",
    "dcg-places-extras",
    "dcikram",
    "dcserine",
    "dcayaan",
    "dcemmanuel",
    "dccyrus",
    "dcfadi",
    "dctimi",
  ],
  activity: ["climb", "swim", "physical"],
};

function librarySectionFromCard(
  card: PickableLibraryCard,
): LibrarySectionId | null {
  const pack = pickablePackFromPickId(card.pickId);
  if (!pack) return null;
  if (pack === "phy2d" || pack === "phy3d" || pack === "phy3g") return "physical";
  if (pack === "mg2d" || pack === "mg3d") return "dcfolderminigym";
  if (pack === "dcemmanuel2d" || pack === "dcemmanuel-icons") return "dcemmanuel";
  if (pack === "daycentre") {
    const slug = card.pickId.split("::")[1] ?? "";
    return dayCentreLibrarySectionIdForSlug(slug);
  }
  if (pack === "climb") {
    const slug = card.pickId.split("::")[1] ?? "";
    if (isDayCentreBoulderingClimbSlug(slug)) return "dcfolderbouldering";
    return "climb";
  }
  if (pack !== "dress") return pack;

  const slug = card.pickId.split("::")[1] ?? "";
  const dress = getDressRegistryCardBySlug(slug);
  return dress?.actionType === "off" ? "dress-off" : "dress-on";
}

function subgroupLabelForCard(
  card: PickableLibraryCard,
  pack: PickablePackId | null,
): string | null {
  if (!pack) return null;
  const slug = card.pickId.split("::")[1] ?? "";
  const ns = card.pickId.split("::")[0]?.toLowerCase() ?? "";

  if (pack === "dcikram") {
    const group: IkramLibraryGroup = ikramLibraryGroupForPickId(card.pickId);
    return ikramLibraryGroupLabel(group, "en");
  }
  if (pack === "dcemmanuel" || pack === "dcemmanuel-icons") {
    const dimension = emmanuelLibraryDimensionFromPickNamespace(ns);
    return dimension ? emmanuelLibraryGroupLabel(dimension, "en") : null;
  }
  if (pack === "phy2d" || pack === "phy3d" || pack === "phy3g") {
    const group = physicalLibraryGroupFromPickNamespace(ns);
    return group ? physicalLibraryGroupLabel(group, "en") : null;
  }
  if (pack === "mg2d" || pack === "mg3d") {
    const dimension = miniGymLibraryDimensionFromPickNamespace(ns);
    return dimension ? miniGymLibraryGroupLabel(dimension, "en") : null;
  }
  if (pack === "daycentre") {
    const group = dayCentreLibraryGroupFromSectionId(
      dayCentreLibrarySectionIdForSlug(slug) ?? "",
    );
    return group ? dayCentreLibraryGroupLabel(group, "en") : null;
  }
  return null;
}

function publicImagePath(imageUrl: string): string {
  if (!imageUrl.startsWith("/")) return imageUrl;
  return `../public${imageUrl}`;
}

function sectionSortIndex(
  category: DashboardPackCategory,
  sectionId: string,
): number {
  const order = SECTION_ORDER_BY_CATEGORY[category];
  const index = order.indexOf(sectionId as LibrarySectionId);
  return index >= 0 ? index : 999;
}

export function buildCardReviewCatalog(): CardReviewCatalog {
  const cards = buildPickableLibraryCards().map((card) => {
    const pack = pickablePackFromPickId(card.pickId);
    const sectionId = librarySectionFromCard(card) ?? "unknown";
    const category = card.category as DashboardPackCategory;
    const slug = card.pickId.split("::")[1] ?? "";
    return {
      pickId: card.pickId,
      slug,
      label: card.label,
      imageUrl: card.imageUrl,
      imagePath: publicImagePath(card.imageUrl),
      category,
      categoryLabel: dashboardPackCategoryTitle(category, "en"),
      sectionId,
      sectionLabel:
        sectionId === "unknown"
          ? "Other"
          : libraryPackSectionTitle(sectionId as never, "en"),
      subgroupLabel: subgroupLabelForCard(card, pack),
      packId: pack,
      status: "" as CardReviewStatus,
      notes: "",
    };
  });

  cards.sort((a, b) => {
    const catOrder = ["self-care", "home", "activity"];
    const catDiff =
      catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    const sectionDiff =
      sectionSortIndex(a.category, a.sectionId) -
      sectionSortIndex(b.category, b.sectionId);
    if (sectionDiff !== 0) return sectionDiff;
    const subgroupDiff = (a.subgroupLabel ?? "").localeCompare(
      b.subgroupLabel ?? "",
    );
    if (subgroupDiff !== 0) return subgroupDiff;
    return a.label.localeCompare(b.label);
  });

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    cardSize: { width: NOW_W, height: NOW_H },
    cards,
  };
}
