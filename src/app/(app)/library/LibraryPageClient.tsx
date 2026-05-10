"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/Button";
import { PICKABLE_LIBRARY_CARDS } from "@/lib/library/pickable-library-cards";
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

/** Soft footer tint per library section (matches pack hues loosely). */
const libraryCategoryRibbonClass: Record<(typeof groups)[number], string> = {
  "self-care": "border-t border-sage/20 bg-sage-mist/90 text-ink",
  home: "border-t border-accent/25 bg-accent-soft/30 text-ink",
  activity: "border-t border-[#c9a84a]/25 bg-[#faf6ea] text-ink",
};

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
                        "overflow-hidden rounded-xl border border-ink/5 bg-cream text-left shadow-card transition active:scale-[0.99] sm:rounded-2xl",
                        selected
                          ? "ring-2 ring-sage/50"
                          : "hover:shadow-soft",
                      )}
                    >
                      <div
                        className={cn(
                          "relative aspect-square overflow-hidden",
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
                                  "!h-[132%] !max-h-none w-full",
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
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset ring-sage/70 sm:rounded-2xl" />
                        ) : null}
                      </div>
                      <div
                        className={cn(
                          "px-1.5 py-1.5 sm:px-2 sm:py-2",
                          libraryCategoryRibbonClass[cat],
                        )}
                      >
                        <p className="line-clamp-2 text-left text-[10px] font-semibold leading-tight sm:text-[11px]">
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
