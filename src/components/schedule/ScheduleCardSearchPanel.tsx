"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { PickableLibraryCard } from "@/lib/library/pickable-library-cards";
import { searchPickableLibraryCards } from "@/lib/library/search-pickable-library-cards";
import {
  scheduleCardSearchClose,
  scheduleCardSearchEmpty,
  scheduleCardSearchHint,
  scheduleCardSearchPlaceholder,
  scheduleCardSearchTitle,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";
import {
  isPixtoLearnFullBleedCardUrl,
  isPixtoLearnIllustrationOnlyUrl,
  pixtoBundledCardObjectPositionClass,
} from "@/lib/utils/visual-card-url";

type Props = {
  open: boolean;
  onClose: () => void;
  onPick: (card: PickableLibraryCard) => void;
};

function CardResultThumb({ card }: { card: PickableLibraryCard }) {
  const illustrationOnly = isPixtoLearnIllustrationOnlyUrl(card.imageUrl);
  const fullBleed = isPixtoLearnFullBleedCardUrl(card.imageUrl);

  return (
    <div className="relative aspect-[10/13] w-full overflow-hidden rounded-xl bg-white ring-1 ring-ink/8">
      <Image
        src={card.imageUrl}
        alt=""
        fill
        className={cn(
          illustrationOnly
            ? "object-contain object-center p-1"
            : fullBleed
              ? cn("object-cover", pixtoBundledCardObjectPositionClass)
              : "object-contain object-center",
        )}
        sizes="96px"
        unoptimized={card.imageUrl.startsWith("/")}
      />
    </div>
  );
}

export function ScheduleCardSearchPanel({ open, onClose, onPick }: Props) {
  const lang = useCardUiLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(
    () => searchPickableLibraryCards(query, 48),
    [query],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal
      aria-labelledby="schedule-card-search-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[min(88dvh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl ring-1 ring-ink/10 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-ink/8 px-4 pb-3 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="schedule-card-search-title"
                className="text-[17px] font-semibold text-ink"
              >
                {scheduleCardSearchTitle(lang)}
              </h2>
              <p className="mt-1 text-[13px] leading-snug text-ink-subtle">
                {scheduleCardSearchHint(lang)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[20px] leading-none text-ink-subtle ring-1 ring-ink/10 transition hover:text-ink"
              aria-label={scheduleCardSearchClose(lang)}
            >
              ×
            </button>
          </div>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={scheduleCardSearchPlaceholder(lang)}
            className="mt-3 w-full rounded-2xl border border-transparent bg-white px-4 py-3 text-[16px] text-ink outline-none ring-1 ring-ink/10 transition focus:ring-sage"
            autoComplete="off"
            enterKeyHint="search"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {query.trim().length === 0 ? (
            <p className="px-1 py-8 text-center text-[14px] text-ink-faint">
              {scheduleCardSearchHint(lang)}
            </p>
          ) : results.length === 0 ? (
            <p className="px-1 py-8 text-center text-[14px] text-ink-subtle">
              {scheduleCardSearchEmpty(lang, query)}
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {results.map((card) => (
                <li key={card.pickId}>
                  <button
                    type="button"
                    onClick={() => {
                      onPick(card);
                      onClose();
                    }}
                    className="group flex w-full flex-col gap-1.5 rounded-2xl p-1.5 text-left transition active:bg-white/80 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white"
                  >
                    <CardResultThumb card={card} />
                    <span className="line-clamp-2 px-0.5 text-[11px] font-medium leading-tight text-ink group-active:text-ink">
                      {card.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
