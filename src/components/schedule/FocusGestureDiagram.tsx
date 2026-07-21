"use client";

import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  focusGestureGuideCenter,
  focusGestureGuidePrevious,
  focusGestureGuideSkip,
  focusGestureGuideSupport,
  focusGestureGuideOptions,
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
        "flex min-h-[4.5rem] items-center justify-center rounded-xl border border-ink/10 bg-canvas-muted/80 px-2 py-3 text-center text-[12px] font-semibold leading-snug text-ink sm:min-h-[5rem] sm:text-[13px]",
        className,
      )}
    >
      {label}
    </div>
  );
}

/** Static 5-zone Focus diagram for the screens guide (not a modal). */
export function FocusGestureDiagram({ lang }: { lang: CardLanguageCode }) {
  return (
    <div
      className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-2 rounded-[1.25rem] border border-ink/10 bg-cream p-2 shadow-soft"
      aria-hidden="true"
    >
      <ZoneCell label={focusGestureGuidePrevious(lang)} />
      <ZoneCell label={focusGestureGuideSkip(lang)} />
      <div className="col-span-2 flex min-h-[5.5rem] items-center justify-center rounded-xl border border-dashed border-sage/50 bg-sage-mist/60 px-3 py-4 text-center text-[13px] font-semibold leading-snug text-ink sm:text-[14px]">
        {focusGestureGuideCenter(lang)}
      </div>
      <ZoneCell label={focusGestureGuideSupport(lang)} />
      <ZoneCell label={focusGestureGuideOptions(lang)} />
    </div>
  );
}
