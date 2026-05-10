"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/Button";
import {
  GENPACK_AT_AIRPORT_PICK_ID,
  GENPACK_AT_HOTEL_PICK_ID,
  PICKABLE_LIBRARY_CARDS,
  pickablePackFromPickId,
  type PickablePackId,
} from "@/lib/library/pickable-library-cards";
import {
  clearLibrarySelectionDraft,
  writeLibrarySelectionDraft,
} from "@/lib/library/library-selection-draft";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnBundledCardUrl,
  pixtoBundledCardObjectPositionTopClass,
} from "@/lib/utils/visual-card-url";

const groups = ["self-care", "home", "activity"] as const;

/** Soft ribete tint per Pixto pack (from `pickId` namespace, not browse section). */
const libraryPackRibbonClass: Record<PickablePackId, string> = {
  bt: "border-t border-sage/22 bg-sage-mist text-ink",
  shower: "border-t border-[#143d66]/28 bg-[#e4edf5] text-ink",
  dress: "border-t border-[#6B4E9E]/28 bg-[#ede9f4] text-ink",
  core: "border-t border-accent/30 bg-accent-soft/40 text-ink",
  climb: "border-t border-[#d4a53a]/35 bg-[#faf6ea] text-ink",
  swim: "border-t border-[#4a8fa8]/30 bg-[#e8f3f6] text-ink",
};

function libraryRibbonClassForPickId(pickId: string): string {
  if (pickId === GENPACK_AT_AIRPORT_PICK_ID) {
    return "border-t border-[#e0b030]/40 bg-[#F9DD9E]/95 text-ink";
  }
  if (pickId === GENPACK_AT_HOTEL_PICK_ID) {
    return "border-t border-[#8C1E2E]/45 bg-[#fdecee] text-ink";
  }
  const pack = pickablePackFromPickId(pickId);
  if (pack) return libraryPackRibbonClass[pack];
  return "border-t border-ink/10 bg-canvas-muted text-ink";
}

function cardImageUnoptimized(src: string): boolean {
  return src.startsWith("/cards/") || src.includes("/cards/");
}

export function LibraryPageClient() {
  const router = useRouter();
  /** Distinct pick ids, order = tap order */
  const [orderedPickIds, setOrderedPickIds] = useState<string[]>([]);

  const byCategory = useMemo(() => {
    const m = new Map<(typeof groups)[number], typeof PICKABLE_LIBRARY_CARDS>();
    for (const g of groups) m.set(g, []);
    for (const c of PICKABLE_LIBRARY_CARDS) {
      const list = m.get(c.category as (typeof groups)[number]);
      if (list) list.push(c);
    }
    return m;
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
      <Header
        title="Library"
        rightSlot={
          <Button
            type="button"
            variant="secondary"
            className="!min-h-10 shrink-0 !px-3 !py-2 text-[13px]"
            onClick={() => router.push("/library/routine-new")}
          >
            New routine
          </Button>
        }
      />
      <div className="space-y-8 px-4 pb-10 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-ink-subtle">
          Tap cards to select them in order (like photos). Use{" "}
          <span className="font-semibold text-ink">New routine</span> (top right)
          to name and save without picking here first.
        </p>

        {groups.map((cat) => {
          const items = byCategory.get(cat) ?? [];
          if (items.length === 0) return null;
          return (
            <section key={cat} className="space-y-3">
              <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {cat.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {items.map((v) => {
                  const selected = selectedSet.has(v.pickId);
                  const unopt = cardImageUnoptimized(v.imageUrl);
                  const pixto = isPixtoLearnBundledCardUrl(v.imageUrl);
                  return (
                    <button
                      key={v.pickId}
                      type="button"
                      onClick={() => togglePick(v.pickId)}
                      className={cn(
                        "flex w-full flex-col overflow-hidden rounded-xl border border-ink/5 bg-cream p-0 text-left shadow-card transition active:scale-[0.99] sm:rounded-2xl",
                        selected
                          ? "ring-2 ring-sage/50"
                          : "hover:shadow-soft",
                      )}
                    >
                      {/*
                        Slightly taller than square: more illustration above the ribete,
                        less “chopped” art. Height still derives from column width.
                      */}
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
                                  /* Slightly less zoom than Home — more drawing, title strip still mostly out of frame */
                                  "!h-[120%] !max-h-none w-full",
                                )
                              : "object-center",
                          )}
                          style={pixto ? { top: 0, bottom: "auto" } : undefined}
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
                          "isolate flex w-full shrink-0 flex-col justify-center rounded-b-xl px-1.5 pb-2 pt-1.5 sm:rounded-b-2xl sm:px-2 sm:pb-2.5 sm:pt-2",
                          /* Fixed band so every tile in the row lines up; room for 2 lines without clipping */
                          "min-h-[3.35rem] sm:min-h-[3.5rem]",
                          libraryRibbonClassForPickId(v.pickId),
                        )}
                      >
                        <p className="line-clamp-2 text-balance text-center text-[10px] font-semibold leading-snug sm:text-[11px]">
                          {v.label}
                        </p>
                      </div>
                    </button>
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
