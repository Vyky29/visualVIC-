"use client";

import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  focusGestureGuideCenter,
  focusGestureGuideGotIt,
  focusGestureGuidePrevious,
  focusGestureGuideSkip,
  focusGestureGuideSupport,
  focusGestureGuideOptions,
  focusGestureGuideTitle,
} from "@/lib/i18n/app-shell-locale";
import { cn } from "@/lib/utils/cn";

function ZoneCell({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 items-center justify-center rounded-xl border border-white/35 bg-white/12 px-2 py-3 text-center text-[12px] font-semibold leading-snug text-cream sm:text-[13px]",
        className,
      )}
    >
      {label}
    </div>
  );
}

export function FocusGestureGuide({
  lang,
  onDismiss,
}: {
  lang: CardLanguageCode;
  onDismiss: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-black/80 px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-gesture-guide-title"
    >
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4">
        <h2
          id="focus-gesture-guide-title"
          className="text-center text-[18px] font-semibold tracking-tight text-cream"
        >
          {focusGestureGuideTitle(lang)}
        </h2>

        <div className="relative grid min-h-0 flex-1 grid-cols-2 grid-rows-[1fr_1.35fr_1fr] gap-2 rounded-[1.75rem] border border-white/25 bg-ink/40 p-2 shadow-soft ring-1 ring-white/10">
          <ZoneCell label={focusGestureGuidePrevious(lang)} />
          <ZoneCell label={focusGestureGuideSkip(lang)} />
          <div className="col-span-2 flex min-h-0 items-center justify-center rounded-xl border border-dashed border-sage/55 bg-sage/20 px-3 py-4 text-center text-[13px] font-semibold leading-snug text-cream sm:text-[14px]">
            {focusGestureGuideCenter(lang)}
          </div>
          <ZoneCell label={focusGestureGuideSupport(lang)} />
          <ZoneCell label={focusGestureGuideOptions(lang)} />
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="mx-auto w-full max-w-xs rounded-2xl bg-sage px-4 py-3.5 text-[15px] font-semibold text-cream shadow-soft transition hover:opacity-95 active:scale-[0.99]"
        >
          {focusGestureGuideGotIt(lang)}
        </button>
      </div>
    </div>
  );
}
