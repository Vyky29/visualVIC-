"use client";

/**
 * Library UX is designed for phone + iPad (touch). Hover “peek” on accordion
 * rows only applies when the device reports fine pointer + hover (e.g. desktop).
 */

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Button } from "@/components/ui/Button";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";
import { climbingImageUrl } from "@/lib/cards/climbing-cards";
import { coreImageUrl } from "@/lib/cards/core-cards";
import {
  GETTING_DRESS_REGISTRY,
  getDressRegistryCardBySlug,
} from "@/lib/cards/getting-dress-undress-registry";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { swimmingImageUrl } from "@/lib/cards/swimming-cards";
import {
  IKRAM_LIBRARY_GROUP_ORDER,
  ikramLibraryGroupForSlug,
} from "@/lib/cards/ikram-library-groups";
import {
  EMMANUEL_LIBRARY_DIMENSION_ORDER,
  emmanuelLibraryDimensionFromPickNamespace,
  emmanuelLibraryGroupLabel,
} from "@/lib/cards/emmanuel-library-groups";
import {
  MINI_GYM_LIBRARY_DIMENSION_ORDER,
  miniGymLibraryDimensionFromPickNamespace,
} from "@/lib/cards/mini-gym-library-groups";
import {
  PHYSICAL_LIBRARY_GROUP_ORDER,
  physicalLibraryGroupFromPickNamespace,
} from "@/lib/cards/physical-library-groups";
import {
  dayCentreAyaanLibraryPackIconUrl,
  dayCentreEmmanuelLibraryPackIconUrl,
  dayCentreIkramLibraryPackIconUrl,
  dayCentreSerineLibraryPackIconUrl,
  isDayCentreTailoredPackIconUrl,
  isDayCentreTailoredParticipantLibraryIconUrl,
} from "@/lib/cards/day-centre-shared";
import {
  dayCentreFolderForSlug,
  isDayCentreBoulderingClimbSlug,
} from "@/lib/cards/day-centre-folder-groups";
import {
  dayCentreFolderIconUrl,
  dayCentreFolderLibrarySectionId,
} from "@/lib/routines/day-centre-folders";
import { physicalPackMarkUrl } from "@/lib/cards/physical-cards";
import {
  AIRPORT_GENERATED_CARD_PROPS,
  DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS,
  DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
} from "@/lib/experimental/generated-pixto-demo-routine";
import {
  clearLibrarySelectionDraft,
  writeLibrarySelectionDraft,
} from "@/lib/library/library-selection-draft";
import {
  accordionOpenCloseAria,
  dashboardPackCategoryTitle,
  libraryClearSelection,
  libraryCreateRoutine,
  libraryIntroBlurb,
  libraryNewRoutineButton,
  libraryObjectCountBadge,
  libraryPackSectionTitle,
  librarySelectionSummary,
  libraryStepCountBadge,
  ikramLibraryGroupLabel,
  physicalLibraryGroupLabel,
  miniGymLibraryGroupLabel,
  libraryPickRibbonCategory,
  librarySubheadingObjects,
  librarySubheadingSteps,
  type DashboardPackCategory,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  PICKABLE_LIBRARY_CARDS,
  pickablePackFromPickId,
  type PickableLibraryCard,
  type PickablePackId,
} from "@/lib/library/pickable-library-cards";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";
import {
  GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
  generatedPixtoCategoryOutlineStyle,
} from "@/lib/constants/generated-pixto-card-sizes";
import { APP_SHELL_TABLET_INSET_CLASS, shellClassForPathname } from "@/lib/constants/app-shell-layout";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  isPixtoLearnFullBleedCardUrl,
  isPixtoLearnIllustrationOnlyUrl,
  pixtoBundledCardThumbnailClipPath,
} from "@/lib/utils/visual-card-url";

const groups = ["self-care", "home", "activity"] as const;

export type LibrarySectionId =
  | Exclude<
      PickablePackId,
      | "dress"
      | "phy2d"
      | "phy3d"
      | "phy3g"
      | "daycentre"
      | "dcpremium"
      | "mg2d"
      | "mg3d"
      | "dcemmanuel2d"
    >
  | "dress-on"
  | "dress-off"
  | "physical"
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | "dcfoldercooking"
  | "dcfoldercommunity"
  | "dcfoldermixed"
  | "dcfolderpremium";

const SECTION_ORDER_BY_CATEGORY: Record<
  (typeof groups)[number],
  readonly LibrarySectionId[]
> = {
  "self-care": ["bt", "shower", "dress-on", "dress-off"],
  home: [
    "core",
    "airport",
    "hotel",
    "dcfolderminigym",
    "dcfolderbouldering",
    "dcfoldercooking",
    "dcfoldercommunity",
    "dcfoldermixed",
    "dcfolderpremium",
    "dcikram",
    "dcserine",
    "dcayaan",
    "dcemmanuel",
  ],
  activity: ["climb", "swim", "physical"],
};

/** Thumbnail in each pack accordion header (same assets as the tiles). */
const SECTION_HEADER_ICON: Record<LibrarySectionId, string> = {
  bt: brushingTeethImageUrl("toothbrush"),
  shower: showerImageUrl("shower"),
  "dress-on": gettingDressUndressImageUrl("tshirt-on"),
  "dress-off": gettingDressUndressImageUrl("trousers-off"),
  core: coreImageUrl("wash-hands"),
  airport: AIRPORT_GENERATED_CARD_PROPS[0]?.illustrationUrl ?? "",
  hotel: HOTEL_GENERATED_CARD_PROPS[0]?.illustrationUrl ?? "",
  dcfolderminigym: dayCentreFolderIconUrl("mini-gym"),
  dcfolderbouldering: dayCentreFolderIconUrl("bouldering"),
  dcfoldercooking: dayCentreFolderIconUrl("cooking"),
  dcfoldercommunity: dayCentreFolderIconUrl("community"),
  dcfoldermixed: dayCentreFolderIconUrl("mixed"),
  dcfolderpremium: dayCentreFolderIconUrl("premium"),
  dcikram: dayCentreIkramLibraryPackIconUrl(),
  dcserine: dayCentreSerineLibraryPackIconUrl(),
  dcayaan: dayCentreAyaanLibraryPackIconUrl(),
  dcemmanuel: dayCentreEmmanuelLibraryPackIconUrl(),
  physical: physicalPackMarkUrl(),
  climb: climbingImageUrl("climbing-wall"),
  swim: swimmingImageUrl("goggles-on"),
};

/** Ring tint around the pack icon — sole colour cue per category. */
const libraryPackIconRingClass: Record<LibrarySectionId, string> = {
  bt: "ring-[#91C24C]/80",
  shower: "ring-[#143d66]/60",
  "dress-on": "ring-[#6B4E9E]/70",
  "dress-off": "ring-[#6B4E9E]/70",
  core: "ring-accent/70",
  airport: "ring-[#e0b030]/90",
  hotel: "ring-[#8C1E2E]/70",
  dcfolderminigym: "ring-[#E53935]/75",
  dcfolderbouldering: "ring-[#E53935]/75",
  dcfoldercooking: "ring-[#E53935]/75",
  dcfoldercommunity: "ring-[#E53935]/75",
  dcfoldermixed: "ring-[#E53935]/75",
  dcfolderpremium: "ring-[#E53935]/75",
  dcikram: "ring-[#E05C9A]/75",
  dcserine: "ring-[#E05C9A]/75",
  dcayaan: "ring-[#1E4A73]/75",
  dcemmanuel: "ring-[#1E4A73]/75",
  physical: "ring-[#43A047]/75",
  climb: "ring-[#d4a53a]/85",
  swim: "ring-[#4a8fa8]/75",
};

/** Soft ribete tint per Pixto pack (tile footer, from `pickId` namespace). */
const libraryPackRibbonClass: Record<PickablePackId, string> = {
  bt: "border-t border-sage/22 bg-sage-mist text-ink",
  shower: "border-t border-[#143d66]/28 bg-[#e4edf5] text-ink",
  dress: "border-t border-[#6B4E9E]/28 bg-[#ede9f4] text-ink",
  core: "border-t border-accent/30 bg-accent-soft/40 text-ink",
  climb: "border-t border-[#d4a53a]/35 bg-[#faf6ea] text-ink",
  swim: "border-t border-[#4a8fa8]/30 bg-[#e8f3f6] text-ink",
  airport: "border-t border-[#e0b030]/40 bg-[#F9DD9E]/95 text-ink",
  hotel: "border-t border-[#8C1E2E]/45 bg-[#fdecee] text-ink",
  daycentre: "border-t border-[#E53935]/45 bg-[#ffebee] text-ink",
  dcikram: "border-t border-[#E05C9A]/55 bg-[#fce0ef] text-ink",
  dcserine: "border-t border-[#E05C9A]/55 bg-[#fce0ef] text-ink",
  dcayaan: "border-t border-[#1E4A73]/55 bg-[#e4edf5] text-ink",
  dcemmanuel: "border-t border-[#1E4A73]/55 bg-[#e4edf5] text-ink",
  dcemmanuel2d: "border-t border-[#1E4A73]/55 bg-[#e4edf5] text-ink",
  dcpremium: "border-t border-[#E53935]/45 bg-[#ffebee] text-ink",
  mg2d: "border-t border-[#E53935]/45 bg-[#ffebee] text-ink",
  mg3d: "border-t border-[#E53935]/45 bg-[#ffebee] text-ink",
  phy2d: "border-t border-[#43A047]/40 bg-[#e8f5e9] text-ink",
  phy3d: "border-t border-[#43A047]/45 bg-[#e8f5e9] text-ink",
  phy3g: "border-t border-[#43A047]/50 bg-[#e8f5e9] text-ink",
};

function libraryRibbonClassForPickId(pickId: string): string {
  const pack = pickablePackFromPickId(pickId);
  if (pack) return libraryPackRibbonClass[pack];
  return "border-t border-ink/10 bg-canvas-muted text-ink";
}

function cardImageUnoptimized(src: string): boolean {
  return src.startsWith("/cards/") || src.includes("/cards/");
}

function librarySectionFromCard(
  c: PickableLibraryCard,
): LibrarySectionId | null {
  const pack = pickablePackFromPickId(c.pickId);
  if (!pack) return null;
  if (pack === "phy2d" || pack === "phy3d" || pack === "phy3g") return "physical";
  if (pack === "mg2d" || pack === "mg3d") return "dcfolderminigym";
  if (pack === "dcemmanuel2d") return "dcemmanuel";
  if (pack === "daycentre") {
    const slug = c.pickId.split("::")[1] ?? "";
    return dayCentreFolderLibrarySectionId(dayCentreFolderForSlug(slug));
  }
  if (pack === "dcpremium") return "dcfolderpremium";
  if (pack === "climb") {
    const slug = c.pickId.split("::")[1] ?? "";
    if (isDayCentreBoulderingClimbSlug(slug)) return "dcfolderbouldering";
    return "climb";
  }
  if (pack !== "dress") return pack;

  const slug = c.pickId.split("::")[1] ?? "";
  const dress = getDressRegistryCardBySlug(slug);
  return dress?.actionType === "off" ? "dress-off" : "dress-on";
}

const SECTION_OBJECT_SLUGS: Partial<Record<LibrarySectionId, readonly string[]>> = {
  bt: [
    "bottom-teeth",
    "check-teeths",
    "cup",
    "mouth",
    "tap",
    "tongue",
    "toothbrush",
    "toothholder",
    "toothpaste",
    "top-teeth",
    "towel",
  ],
  shower: [
    "shower",
    "sponge",
    "brush",
    "shampoo",
    "conditioner",
    "towel",
    "comb",
    "hair-dryer",
    "gel",
    "body-lotion",
  ],
  core: ["toilet"],
  climb: [
    "climbing-wall",
    "magnesium-bag",
    "helmet",
    "harness",
    "climbing-shoes",
    "rope",
    "carabiner",
    "grigri",
    "holds",
    "boulder-wall",
  ],
  swim: [
    "goggles-on",
    "swim-cap-on",
    "wearing-flip-flops",
  ],
};

function isObjectCardForSection(
  section: LibrarySectionId,
  card: PickableLibraryCard,
): boolean {
  const slug = card.pickId.split("::")[1] ?? "";

  if (section === "dress-on" || section === "dress-off") {
    return getDressRegistryCardBySlug(slug)?.itemType === "object";
  }

  const objectSlugs = new Set(SECTION_OBJECT_SLUGS[section] ?? []);
  return objectSlugs.has(slug);
}

function objectCountForSection(
  section: LibrarySectionId,
  cards: readonly PickableLibraryCard[],
): number {
  return cards.filter((c) => isObjectCardForSection(section, c)).length;
}

function groupByCategoryAndSection(): Map<
  (typeof groups)[number],
  Map<LibrarySectionId, PickableLibraryCard[]>
> {
  const out = new Map<
    (typeof groups)[number],
    Map<LibrarySectionId, PickableLibraryCard[]>
  >();
  for (const g of groups) {
    const inner = new Map<LibrarySectionId, PickableLibraryCard[]>();
    for (const p of SECTION_ORDER_BY_CATEGORY[g]) inner.set(p, []);
    out.set(g, inner);
  }
  for (const c of PICKABLE_LIBRARY_CARDS) {
    const section = librarySectionFromCard(c);
    if (!section) continue;
    const cat = c.category as (typeof groups)[number];
    const inner = out.get(cat);
    if (!inner) continue;
    const list = inner.get(section);
    if (list) list.push(c);
  }
  return out;
}

function libraryPackHeaderImageClass(
  iconSrc: string,
  cropHeaderIcon: boolean,
): string {
  if (isDayCentreTailoredPackIconUrl(iconSrc)) {
    return "object-contain object-center p-0.5";
  }
  if (
    isDayCentreTailoredParticipantLibraryIconUrl(iconSrc) ||
    cropHeaderIcon
  ) {
    return "object-cover object-top scale-[1.26]";
  }
  return "object-contain p-1.5 sm:p-1.5";
}

function libraryPackUsesThematicSubgroups(section: LibrarySectionId): boolean {
  return (
    section === "physical" ||
    section === "dcikram" ||
    section === "dcfolderminigym" ||
    section === "dcemmanuel"
  );
}

function LibrarySubgroupHeader({
  label,
  iconUrl,
  ringClass,
}: {
  label: string;
  iconUrl?: string;
  ringClass: string;
}) {
  const unopt = iconUrl ? cardImageUnoptimized(iconUrl) : false;
  const cropIcon =
    iconUrl &&
    !iconUrl.includes("day%20centre") &&
    !iconUrl.includes("/physical/") &&
    !iconUrl.includes("tailored%20schedules") &&
    !iconUrl.includes("/images/library");

  return (
    <div className="flex min-w-0 items-center gap-2 px-0.5">
      {iconUrl ? (
        <span
          className={cn(
            "relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/95 bg-white shadow-sm ring-[2px] ring-offset-[1px] ring-offset-cream/40 sm:h-8 sm:w-8",
            ringClass,
          )}
        >
          <Image
            src={iconUrl}
            alt=""
            fill
            unoptimized={unopt}
            className={cn(
              cropIcon
                ? "object-cover object-top scale-[1.22]"
                : "object-contain p-0.5",
            )}
            sizes="32px"
          />
        </span>
      ) : null}
      <p className="min-w-0 flex-1 break-words text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint [overflow-wrap:anywhere]">
        {label}
      </p>
    </div>
  );
}

function LibraryPackThematicSubgroups({
  section,
  cards,
  selectedSet,
  onToggle,
  cardUiLang,
  ringClass,
}: {
  section: LibrarySectionId;
  cards: readonly PickableLibraryCard[];
  selectedSet: ReadonlySet<string>;
  onToggle: (pickId: string) => void;
  cardUiLang: CardLanguageCode;
  ringClass: string;
}) {
  if (section === "physical") {
    return PHYSICAL_LIBRARY_GROUP_ORDER.map((groupId) => {
      const groupCards = cards.filter((v) => {
        const ns = v.pickId.split("::")[0] ?? "";
        return physicalLibraryGroupFromPickNamespace(ns) === groupId;
      });
      if (groupCards.length === 0) return null;
      return (
        <section key={groupId} className="space-y-1.5">
          <LibrarySubgroupHeader
            label={physicalLibraryGroupLabel(groupId, cardUiLang)}
            iconUrl={groupCards[0]?.imageUrl}
            ringClass={ringClass}
          />
          <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
            {groupCards.map((v) => (
              <LibraryPickTile
                key={v.pickId}
                v={v}
                selected={selectedSet.has(v.pickId)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </section>
      );
    });
  }

  if (section === "dcfolderminigym") {
    return MINI_GYM_LIBRARY_DIMENSION_ORDER.map((groupId) => {
      const groupCards = cards.filter((v) => {
        const ns = v.pickId.split("::")[0] ?? "";
        return miniGymLibraryDimensionFromPickNamespace(ns) === groupId;
      });
      if (groupCards.length === 0) return null;
      return (
        <section key={groupId} className="space-y-1.5">
          <LibrarySubgroupHeader
            label={miniGymLibraryGroupLabel(groupId, cardUiLang)}
            iconUrl={groupCards[0]?.imageUrl}
            ringClass={ringClass}
          />
          <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
            {groupCards.map((v) => (
              <LibraryPickTile
                key={v.pickId}
                v={v}
                selected={selectedSet.has(v.pickId)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </section>
      );
    });
  }

  if (section === "dcemmanuel") {
    return EMMANUEL_LIBRARY_DIMENSION_ORDER.map((groupId) => {
      const groupCards = cards.filter((v) => {
        const ns = v.pickId.split("::")[0] ?? "";
        return emmanuelLibraryDimensionFromPickNamespace(ns) === groupId;
      });
      if (groupCards.length === 0) return null;
      return (
        <section key={groupId} className="space-y-1.5">
          <LibrarySubgroupHeader
            label={emmanuelLibraryGroupLabel(groupId, cardUiLang)}
            iconUrl={groupCards[0]?.imageUrl}
            ringClass={ringClass}
          />
          <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
            {groupCards.map((v) => (
              <LibraryPickTile
                key={v.pickId}
                v={v}
                selected={selectedSet.has(v.pickId)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </section>
      );
    });
  }

  return IKRAM_LIBRARY_GROUP_ORDER.map((groupId) => {
    const groupCards = cards.filter((v) => {
      const slug = v.pickId.split("::")[1] ?? "";
      return ikramLibraryGroupForSlug(slug) === groupId;
    });
    if (groupCards.length === 0) return null;
    return (
      <section key={groupId} className="space-y-1.5">
        <LibrarySubgroupHeader
          label={ikramLibraryGroupLabel(groupId, cardUiLang)}
          iconUrl={groupCards[0]?.imageUrl}
          ringClass={ringClass}
        />
        <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
          {groupCards.map((v) => (
            <LibraryPickTile
              key={v.pickId}
              v={v}
              selected={selectedSet.has(v.pickId)}
              onToggle={onToggle}
            />
          ))}
        </div>
      </section>
    );
  });
}

type LibraryPickTileProps = {
  v: PickableLibraryCard;
  selected: boolean;
  onToggle: (pickId: string) => void;
};

function LibraryPickTile({ v, selected, onToggle }: LibraryPickTileProps) {
  const cardUiLang = useCardUiLanguage();
  const [imgFailed, setImgFailed] = useState(false);
  const unopt = cardImageUnoptimized(v.imageUrl);
  const pixto = isPixtoLearnBundledCardUrl(v.imageUrl);
  const illustrationOnly = isPixtoLearnIllustrationOnlyUrl(v.imageUrl);
  const fullBleedPixto = isPixtoLearnFullBleedCardUrl(v.imageUrl);
  const ribbonCategory = libraryPickRibbonCategory(v.pickId, cardUiLang);
  const showImage = Boolean(v.imageUrl) && !imgFailed;
  const categoryOutlineStyle = v.generatedPixto?.categoryColour
    ? generatedPixtoCategoryOutlineStyle(v.generatedPixto.categoryColour, {
        cardShadow: false,
      })
    : undefined;
  return (
    <button
      type="button"
      onClick={() => onToggle(v.pickId)}
      className={cn(
        "flex w-full flex-col overflow-hidden border border-ink/5 bg-cream p-0 text-left shadow-card transition active:scale-[0.99]",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
        selected ? "ring-2 ring-sage/50" : "hover:shadow-soft",
      )}
    >
      <div
        className={cn(
          "relative aspect-[5/6] w-full shrink-0 overflow-hidden",
          pixto || illustrationOnly
            ? cn("bg-white", GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS)
            : "bg-canvas-muted",
        )}
        style={{
          ...(pixto ? categoryOutlineStyle : undefined),
          ...(fullBleedPixto
            ? { clipPath: pixtoBundledCardThumbnailClipPath }
            : undefined),
        }}
      >
        {showImage ? (
          <Image
            src={v.imageUrl}
            alt=""
            fill
            sizes="(max-width: 739px) 23vw, 14vw"
            unoptimized={unopt}
            onError={() => setImgFailed(true)}
            className={cn(
              illustrationOnly
                ? "object-contain object-center"
                : "object-cover object-center",
            )}
          />
        ) : (
          <div className="h-full w-full bg-white" aria-hidden />
        )}
        {selected ? (
          <div
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sage text-[12px] font-bold text-cream shadow-card ring-1 ring-white/90 sm:right-1.5 sm:top-1.5 sm:h-7 sm:w-7 sm:text-[13px]"
            aria-hidden
          >
            ✓
          </div>
        ) : null}
        {selected ? (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-sage/70" />
        ) : null}
      </div>
      <div
        className={cn(
          "isolate flex w-full shrink-0 flex-col justify-center gap-0.5 px-1.5 pb-1.5 pt-1 sm:px-2 sm:pb-1.5 sm:pt-1",
          ribbonCategory ? "min-h-[3.1rem] sm:min-h-[3.25rem]" : "min-h-[2.75rem] sm:min-h-[2.95rem]",
          libraryRibbonClassForPickId(v.pickId),
        )}
      >
        {ribbonCategory ? (
          <p className="line-clamp-2 text-balance text-center text-[8px] font-semibold uppercase leading-[1.05] tracking-[0.06em] text-ink-subtle sm:text-[9px]">
            {ribbonCategory}
          </p>
        ) : null}
        <p className="line-clamp-2 text-balance text-center text-[10px] font-semibold leading-[1.06] sm:text-[11px] sm:leading-[1.08]">
          {v.label}
        </p>
      </div>
    </button>
  );
}

export function LibraryPageClient({
  allowedSections,
  headerTitleKey = "library",
  introBlurbText,
  routineNewHref = "/library/routine-new",
  bottomBarBottomClass = "calc(3.5rem + env(safe-area-inset-bottom, 0px))",
  focusSection,
  returnTo,
}: {
  /** When set, only these library accordion sections are shown (Planner). */
  allowedSections?: ReadonlySet<LibrarySectionId>;
  headerTitleKey?: "library" | "planner";
  introBlurbText?: string;
  routineNewHref?: string;
  bottomBarBottomClass?: string;
  /** Open this participant / folder section on first paint. */
  focusSection?: LibrarySectionId;
  returnTo?: string;
} = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const cardUiLang = useCardUiLanguage();
  const prefersFineHover = usePrefersFineHover();
  const [orderedPickIds, setOrderedPickIds] = useState<string[]>([]);
  /** Pinned open (touch + desktop) until corner closes. */
  const [openAccordionKeys, setOpenAccordionKeys] = useState<Set<string>>(
    () => new Set(),
  );
  /** Desktop / fine-pointer only: peek while pointer is over the row. */
  const [hoverPeekKey, setHoverPeekKey] = useState<string | null>(null);

  const grouped = useMemo(() => groupByCategoryAndSection(), []);

  const isAccordionOpen = useCallback(
    (key: string) =>
      openAccordionKeys.has(key) ||
      (prefersFineHover && hoverPeekKey === key),
    [openAccordionKeys, prefersFineHover, hoverPeekKey],
  );

  const openAccordion = useCallback((key: string) => {
    setOpenAccordionKeys((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const toggleAccordionCorner = useCallback((key: string) => {
    setHoverPeekKey(null);
    setOpenAccordionKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!focusSection) return;
    for (const cat of groups) {
      const inner = grouped.get(cat);
      if (!inner) continue;
      for (const section of SECTION_ORDER_BY_CATEGORY[cat]) {
        if (section !== focusSection) continue;
        if ((inner.get(section) ?? []).length === 0) continue;
        const accordionKey = `${cat}::${section}`;
        setOpenAccordionKeys((prev) => {
          if (prev.has(accordionKey)) return prev;
          const next = new Set(prev);
          next.add(accordionKey);
          return next;
        });
        return;
      }
    }
  }, [focusSection, grouped, groups]);

  const togglePick = useCallback((pickId: string) => {
    setOrderedPickIds((prev) => {
      if (prev.includes(pickId)) return prev.filter((id) => id !== pickId);
      return [...prev, pickId];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setOrderedPickIds([]);
    clearLibrarySelectionDraft();
  }, []);

  const createRoutine = useCallback(() => {
    if (orderedPickIds.length === 0) return;
    writeLibrarySelectionDraft(orderedPickIds);
    setOrderedPickIds([]);
    router.push(routineNewHref);
  }, [orderedPickIds, router, routineNewHref]);

  const selectedSet = useMemo(
    () => new Set(orderedPickIds),
    [orderedPickIds],
  );

  const bottomBar =
    orderedPickIds.length > 0 ? (
      <div
        className={cn(
          "fixed left-1/2 z-30 w-full -translate-x-1/2 border-t border-ink/10 bg-canvas/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(28,36,32,0.18)] backdrop-blur-md",
          shellClassForPathname(pathname),
        )}
        style={{
          bottom: bottomBarBottomClass,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[14px] font-medium text-ink">
            {librarySelectionSummary(orderedPickIds.length, cardUiLang)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="ghost" onClick={clearSelection}>
              {libraryClearSelection(cardUiLang)}
            </Button>
            <Button type="button" variant="primary" onClick={createRoutine}>
              {libraryCreateRoutine(cardUiLang)}
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div
      className={cn(
        orderedPickIds.length > 0 &&
          "pb-[calc(9rem+env(safe-area-inset-bottom))]",
      )}
    >
      <TranslatedHeader titleKey={headerTitleKey} />
      <div className={cn("space-y-8 px-4 pb-10 pt-3", APP_SHELL_TABLET_INSET_CLASS)}>
        <div className="space-y-4">
          <p className="break-words px-1 text-center text-[15px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
            {introBlurbText ?? libraryIntroBlurb(cardUiLang)}
          </p>
          <div className="flex justify-center px-1">
            <Button
              type="button"
              variant="secondary"
              className="!min-h-11 w-full max-w-sm !px-4 !py-2.5 text-[14px] sm:text-[15px]"
              onClick={() => router.push(routineNewHref)}
            >
              {libraryNewRoutineButton(cardUiLang)}
            </Button>
          </div>
        </div>

        {groups.map((cat) => {
          const inner = grouped.get(cat);
          if (!inner) return null;
          const sectionOrder = SECTION_ORDER_BY_CATEGORY[cat].filter(
            (section) => !allowedSections || allowedSections.has(section),
          );
          const hasAny = sectionOrder.some(
            (section) => (inner.get(section) ?? []).length > 0,
          );
          if (!hasAny) return null;

          return (
            <section key={cat} className="space-y-3">
              <h2 className="break-words px-1 text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-ink-faint [overflow-wrap:anywhere] line-clamp-2">
                {dashboardPackCategoryTitle(cat as DashboardPackCategory, cardUiLang)}
              </h2>
              <div className="space-y-2">
                {sectionOrder.map((section) => {
                  const cards = inner.get(section) ?? [];
                  if (cards.length === 0) return null;
                  const accordionKey = `${cat}::${section}`;
                  const open = isAccordionOpen(accordionKey);
                  const ringClass = libraryPackIconRingClass[section];
                  const objectCount = objectCountForSection(section, cards);
                  const stepCount = cards.length - objectCount;
                  const objectCards = cards.filter((c) =>
                    isObjectCardForSection(section, c),
                  );
                  const stepCards = cards.filter(
                    (c) => !isObjectCardForSection(section, c),
                  );
                  const iconSrc = SECTION_HEADER_ICON[section];
                  const iconUnopt = cardImageUnoptimized(iconSrc);
                  const cropHeaderIcon =
                    !isDayCentreTailoredPackIconUrl(iconSrc) &&
                    !isDayCentreTailoredParticipantLibraryIconUrl(iconSrc) &&
                    section !== "physical";

                  return (
                    <div
                      key={accordionKey}
                      className="overflow-hidden rounded-2xl border border-ink/8 bg-cream/40"
                      onMouseEnter={() => {
                        if (prefersFineHover) setHoverPeekKey(accordionKey);
                      }}
                      onMouseLeave={() => {
                        if (prefersFineHover) setHoverPeekKey(null);
                      }}
                    >
                      <div className="flex min-h-[58px] w-full min-w-0 items-stretch border-b border-ink/6 bg-canvas-muted sm:min-h-[60px]">
                        <button
                          type="button"
                          onClick={() => openAccordion(accordionKey)}
                          className="flex min-w-0 flex-1 items-center gap-3.5 px-3 py-2.5 text-left transition hover:bg-canvas-muted/90 sm:px-4"
                        >
                          <span
                            className={cn(
                              "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2.5px] ring-offset-[1.5px] ring-offset-canvas-muted sm:h-12 sm:w-12",
                              ringClass,
                            )}
                          >
                            {iconSrc ? (
                              <Image
                                src={iconSrc}
                                alt=""
                                fill
                                unoptimized={iconUnopt}
                                className={libraryPackHeaderImageClass(
                                  iconSrc,
                                  cropHeaderIcon,
                                )}
                                style={
                                  cropHeaderIcon ||
                                  isDayCentreTailoredParticipantLibraryIconUrl(
                                    iconSrc,
                                  )
                                    ? {
                                        top: "-6%",
                                        bottom: "auto",
                                      }
                                    : undefined
                                }
                              />
                            ) : null}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="min-w-0 max-w-full break-words text-[14px] font-semibold leading-snug text-ink [overflow-wrap:anywhere] line-clamp-2 sm:text-[15px]">
                              {libraryPackSectionTitle(section, cardUiLang)}
                            </span>
                            <span
                              className="inline-flex shrink-0 items-center rounded-full border border-ink/8 bg-white/82 px-2 py-0.5 text-[10px] font-medium tabular-nums tracking-tight text-ink-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:text-[11px]"
                              aria-label={libraryStepCountBadge(stepCount, cardUiLang)}
                            >
                              {libraryStepCountBadge(stepCount, cardUiLang)}
                            </span>
                            <span
                              className="inline-flex shrink-0 items-center rounded-full border border-ink/8 bg-white/82 px-2 py-0.5 text-[10px] font-medium tabular-nums tracking-tight text-ink-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:text-[11px]"
                              aria-label={libraryObjectCountBadge(
                                objectCount,
                                cardUiLang,
                              )}
                            >
                              {libraryObjectCountBadge(objectCount, cardUiLang)}
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordionCorner(accordionKey)}
                          className="flex w-12 shrink-0 items-center justify-center border-l border-ink/8 text-[14px] text-ink-subtle transition hover:bg-ink/[0.04] active:bg-ink/[0.06] sm:w-14 sm:text-[15px]"
                          aria-label={accordionOpenCloseAria(open, cardUiLang)}
                        >
                          <span aria-hidden>{open ? "▾" : "▸"}</span>
                        </button>
                      </div>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-out",
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="space-y-3 px-2 pb-3 pt-2 sm:px-3 sm:pb-4 sm:pt-3">
                            {libraryPackUsesThematicSubgroups(section) ? (
                              <LibraryPackThematicSubgroups
                                section={section}
                                cards={cards}
                                selectedSet={selectedSet}
                                onToggle={togglePick}
                                cardUiLang={cardUiLang}
                                ringClass={ringClass}
                              />
                            ) : (
                              <>
                                {objectCards.length > 0 ? (
                                  <section className="space-y-1.5">
                                    <LibrarySubgroupHeader
                                      label={librarySubheadingObjects(cardUiLang)}
                                      iconUrl={SECTION_HEADER_ICON[section]}
                                      ringClass={ringClass}
                                    />
                                    <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
                                      {objectCards.map((v) => (
                                        <LibraryPickTile
                                          key={v.pickId}
                                          v={v}
                                          selected={selectedSet.has(v.pickId)}
                                          onToggle={togglePick}
                                        />
                                      ))}
                                    </div>
                                  </section>
                                ) : null}
                                {stepCards.length > 0 ? (
                                  <section className="space-y-1.5">
                                    <LibrarySubgroupHeader
                                      label={librarySubheadingSteps(cardUiLang)}
                                      iconUrl={
                                        stepCards[0]?.imageUrl ??
                                        SECTION_HEADER_ICON[section]
                                      }
                                      ringClass={ringClass}
                                    />
                                    <div className="grid grid-cols-4 gap-1.5 tablet:grid-cols-6 tablet:gap-3">
                                      {stepCards.map((v) => (
                                        <LibraryPickTile
                                          key={v.pickId}
                                          v={v}
                                          selected={selectedSet.has(v.pickId)}
                                          onToggle={togglePick}
                                        />
                                      ))}
                                    </div>
                                  </section>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      {bottomBar}
    </div>
  );
}
