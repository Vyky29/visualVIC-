"use client";

/**
 * Library UX is designed for phone + iPad (touch). Hover “peek” on accordion
 * rows only applies when the device reports fine pointer + hover (e.g. desktop).
 */

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/navigation/Header";
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
  AIRPORT_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
} from "@/lib/experimental/generated-pixto-demo-routine";
import {
  clearLibrarySelectionDraft,
  writeLibrarySelectionDraft,
} from "@/lib/library/library-selection-draft";
import {
  PICKABLE_LIBRARY_CARDS,
  pickablePackFromPickId,
  type PickableLibraryCard,
  type PickablePackId,
} from "@/lib/library/pickable-library-cards";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionTopClass,
} from "@/lib/utils/visual-card-url";

const groups = ["self-care", "home", "activity"] as const;

type LibrarySectionId =
  | Exclude<PickablePackId, "dress">
  | "dress-on"
  | "dress-off";

const SECTION_ORDER_BY_CATEGORY: Record<
  (typeof groups)[number],
  readonly LibrarySectionId[]
> = {
  "self-care": ["bt", "shower", "dress-on", "dress-off"],
  home: ["core", "airport", "hotel"],
  activity: ["climb", "swim"],
};

const SECTION_LABEL: Record<LibrarySectionId, string> = {
  bt: "Brushing teeth",
  shower: "Shower",
  "dress-on": "Dressing",
  "dress-off": "Undressing",
  core: "Core",
  airport: "At the airport",
  hotel: "At the hotel",
  climb: "Climbing",
  swim: "Swimming",
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
    "changing-room",
    "flip-flops",
    "googles",
    "pool",
    "sinkers",
    "swim-cap",
    "swimming-costume",
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

type LibraryPickTileProps = {
  v: PickableLibraryCard;
  selected: boolean;
  onToggle: (pickId: string) => void;
};

function LibraryPickTile({ v, selected, onToggle }: LibraryPickTileProps) {
  const unopt = cardImageUnoptimized(v.imageUrl);
  const pixto = isPixtoLearnBundledCardUrl(v.imageUrl);
  return (
    <button
      type="button"
      onClick={() => onToggle(v.pickId)}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-ink/5 bg-cream p-0 text-left shadow-card transition active:scale-[0.99] sm:rounded-2xl",
        selected ? "ring-2 ring-sage/50" : "hover:shadow-soft",
      )}
    >
      <div
        className={cn(
          "relative aspect-[5/6] w-full shrink-0 overflow-hidden rounded-t-xl bg-canvas-muted sm:rounded-t-2xl",
          pixto ? "bg-white" : "bg-canvas-muted",
        )}
      >
        <Image
          src={v.imageUrl}
          alt=""
          fill
          sizes="(max-width: 512px) 23vw, 120px"
          unoptimized={unopt}
          className={cn(
            "object-cover",
            pixto
              ? cn(
                  pixtoBundledCardObjectPositionTopClass,
                  "!h-[120%] !max-h-none w-full",
                )
              : "object-center",
          )}
          style={
            pixto
              ? {
                  top: "7%",
                  bottom: "auto",
                }
              : undefined
          }
        />
        {selected ? (
          <div
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sage text-[12px] font-bold text-cream shadow-card ring-1 ring-white/90 sm:right-1.5 sm:top-1.5 sm:h-7 sm:w-7 sm:text-[13px]"
            aria-hidden
          >
            ✓
          </div>
        ) : null}
        {selected ? (
          <div className="pointer-events-none absolute inset-0 rounded-t-xl ring-2 ring-inset ring-sage/70 sm:rounded-t-2xl" />
        ) : null}
      </div>
      <div
        className={cn(
          "isolate flex w-full shrink-0 flex-col justify-center rounded-b-xl px-1.5 pb-1.5 pt-1 sm:rounded-b-2xl sm:px-2 sm:pb-1.5 sm:pt-1",
          "min-h-[2.75rem] sm:min-h-[2.95rem]",
          libraryRibbonClassForPickId(v.pickId),
        )}
      >
        <p className="line-clamp-2 text-balance text-center text-[10px] font-semibold leading-[1.06] sm:text-[11px] sm:leading-[1.08]">
          {v.label}
        </p>
      </div>
    </button>
  );
}

export function LibraryPageClient() {
  const router = useRouter();
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
    router.push("/library/routine-new");
  }, [orderedPickIds, router]);

  const selectedSet = useMemo(
    () => new Set(orderedPickIds),
    [orderedPickIds],
  );

  const bottomBar =
    orderedPickIds.length > 0 ? (
      <div
        className="fixed left-1/2 z-30 w-full max-w-lg -translate-x-1/2 border-t border-ink/10 bg-canvas/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(28,36,32,0.18)] backdrop-blur-md"
        style={{
          bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[14px] font-medium text-ink">
            {orderedPickIds.length} selected
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="ghost" onClick={clearSelection}>
              Clear
            </Button>
            <Button type="button" variant="primary" onClick={createRoutine}>
              Create routine
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div
      className={cn(
        orderedPickIds.length > 0 &&
          "pb-[calc(11rem+env(safe-area-inset-bottom))]",
      )}
    >
      <Header title="Library" />
      <div className="space-y-8 px-4 pb-10 pt-3">
        <div className="space-y-4">
          <p className="px-1 text-center text-[15px] leading-relaxed text-ink-subtle">
            Tap cards to select them in order (like photos). Tap a routine row to
            open it; it stays open until you tap the{" "}
            <span className="font-semibold text-ink">chevron on the right</span>.
            Use <span className="font-semibold text-ink">New routine</span> below
            to name and save without picking cards here first.
          </p>
          <div className="flex justify-center px-1">
            <Button
              type="button"
              variant="secondary"
              className="!min-h-11 w-full max-w-sm !px-4 !py-2.5 text-[14px] sm:text-[15px]"
              onClick={() => router.push("/library/routine-new")}
            >
              New routine
            </Button>
          </div>
        </div>

        {groups.map((cat) => {
          const inner = grouped.get(cat);
          if (!inner) return null;
          const hasAny = [...inner.values()].some((l) => l.length > 0);
          if (!hasAny) return null;

          return (
            <section key={cat} className="space-y-3">
              <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {cat.replace("-", " ")}
              </h2>
              <div className="space-y-2">
                {SECTION_ORDER_BY_CATEGORY[cat].map((section) => {
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
                  const cropHeaderIcon = true;

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
                      <div className="flex h-[58px] w-full min-w-0 items-stretch border-b border-ink/6 bg-canvas-muted sm:h-[60px]">
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
                                className={cn(
                                  cropHeaderIcon
                                    ? "object-cover object-top scale-[1.26]"
                                    : "object-contain p-1.5 sm:p-1.5",
                                )}
                                style={
                                  cropHeaderIcon
                                    ? {
                                        top: "-6%",
                                        bottom: "auto",
                                      }
                                    : undefined
                                }
                              />
                            ) : null}
                          </span>
                          <span className="flex min-w-0 flex-1 items-baseline gap-2">
                            <span className="min-w-0 text-[14px] font-semibold leading-tight text-ink sm:text-[15px]">
                              {SECTION_LABEL[section]}
                            </span>
                            <span
                              className="shrink-0 whitespace-nowrap text-[11px] font-extralight tabular-nums tracking-wide text-ink-faint sm:text-[12px]"
                              aria-label={`${stepCount} ${stepCount === 1 ? "step" : "steps"}`}
                            >
                              {stepCount}{" "}
                              {stepCount === 1 ? "step" : "steps"}
                            </span>
                            <span
                              className="shrink-0 whitespace-nowrap text-[11px] font-extralight tabular-nums tracking-wide text-ink-faint sm:text-[12px]"
                              aria-label={`${objectCount} ${objectCount === 1 ? "object" : "objects"}`}
                            >
                              · {objectCount}{" "}
                              {objectCount === 1 ? "object" : "objects"}
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordionCorner(accordionKey)}
                          className="flex w-12 shrink-0 items-center justify-center border-l border-ink/8 text-[14px] text-ink-subtle transition hover:bg-ink/[0.04] active:bg-ink/[0.06] sm:w-14 sm:text-[15px]"
                          aria-label={open ? "Close" : "Open"}
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
                            {objectCards.length > 0 ? (
                              <section className="space-y-1.5">
                                <p className="px-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                                  Objects
                                </p>
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
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
                                <p className="px-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                                  Steps
                                </p>
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
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
