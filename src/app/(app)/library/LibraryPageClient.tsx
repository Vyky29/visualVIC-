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

const groups = ["self-care", "home", "activity"] as const;

export function LibraryPageClient() {
  const router = useRouter();
  const [selectMode, setSelectMode] = useState(false);
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

  const clearSelection = useCallback(() => setOrderedPickIds([]), []);

  const createRoutine = useCallback(() => {
    if (orderedPickIds.length === 0) return;
    writeLibrarySelectionDraft(orderedPickIds);
    setSelectMode(false);
    setOrderedPickIds([]);
    router.push("/library/routine-new");
  }, [orderedPickIds, router]);

  const selectedSet = useMemo(
    () => new Set(orderedPickIds),
    [orderedPickIds],
  );

  const bottomBar =
    selectMode && orderedPickIds.length > 0 ? (
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 border-t border-ink/10 bg-canvas/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(28,36,32,0.18)] backdrop-blur-md">
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
        selectMode && orderedPickIds.length > 0 && "pb-24",
      )}
    >
      <Header
        title="Visual library"
        rightSlot={
          <button
            type="button"
            onClick={() => {
              if (selectMode) {
                setSelectMode(false);
                setOrderedPickIds([]);
                clearLibrarySelectionDraft();
              } else {
                setSelectMode(true);
              }
            }}
            className="min-h-touch min-w-touch rounded-2xl px-2 text-[13px] font-medium text-sage active:bg-sage/10 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-sage/5"
          >
            {selectMode ? "Done" : "Select"}
          </button>
        }
      />
      <div className="space-y-8 px-4 pb-10 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-ink-subtle">
          Tap-ready imagery for routines — calm palette, large thumbnails,
          nothing noisy.
          {selectMode ? (
            <span className="mt-2 block text-[13px] text-sage">
              Select mode: tap cards in order, then Create routine.
            </span>
          ) : null}
        </p>

        {groups.map((cat) => {
          const items = byCategory.get(cat) ?? [];
          if (items.length === 0) return null;
          return (
            <section key={cat} className="space-y-3">
              <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {cat.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {items.map((v) => {
                  const selected = selectedSet.has(v.pickId);
                  const inner = (
                    <>
                      <div className="relative aspect-square bg-canvas-muted">
                        <Image
                          src={v.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 512px) 50vw, 256px"
                        />
                        {selectMode && selected ? (
                          <div
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-sage text-[15px] font-bold text-cream shadow-card ring-2 ring-white/90"
                            aria-hidden
                          >
                            ✓
                          </div>
                        ) : null}
                        {selectMode && selected ? (
                          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-2 ring-inset ring-sage/70" />
                        ) : null}
                      </div>
                      <div className="px-3 py-3">
                        <p className="text-[15px] font-semibold leading-snug text-ink">
                          {v.label}
                        </p>
                      </div>
                    </>
                  );

                  if (selectMode) {
                    return (
                      <button
                        key={v.pickId}
                        type="button"
                        onClick={() => togglePick(v.pickId)}
                        className={cn(
                          "overflow-hidden rounded-[1.35rem] border border-ink/5 bg-cream text-left shadow-card transition active:scale-[0.99]",
                          selected
                            ? "ring-2 ring-sage/50"
                            : "hover:shadow-soft",
                        )}
                      >
                        {inner}
                      </button>
                    );
                  }

                  return (
                    <article
                      key={v.pickId}
                      className="overflow-hidden rounded-[1.35rem] border border-ink/5 bg-cream shadow-card transition hover:shadow-soft"
                    >
                      {inner}
                    </article>
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
