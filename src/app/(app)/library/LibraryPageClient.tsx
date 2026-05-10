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
import { BRAND_LOGO_SRC } from "@/lib/constants/brand";
import { cn } from "@/lib/utils/cn";

const groups = ["self-care", "home", "activity"] as const;

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
        title="Visual library"
        logoSrc={BRAND_LOGO_SRC}
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
              <div className="grid grid-cols-2 gap-3">
                {items.map((v) => {
                  const selected = selectedSet.has(v.pickId);
                  const unopt = cardImageUnoptimized(v.imageUrl);
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
                      <div className="relative aspect-square bg-canvas-muted">
                        <Image
                          src={v.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 512px) 50vw, 256px"
                          unoptimized={unopt}
                        />
                        {selected ? (
                          <div
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-sage text-[15px] font-bold text-cream shadow-card ring-2 ring-white/90"
                            aria-hidden
                          >
                            ✓
                          </div>
                        ) : null}
                        {selected ? (
                          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-2 ring-inset ring-sage/70" />
                        ) : null}
                      </div>
                      <div className="px-3 py-3">
                        <p className="text-[15px] font-semibold leading-snug text-ink">
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
