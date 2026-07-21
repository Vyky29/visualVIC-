"use client";

import { useMemo, useState } from "react";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { FocusGestureDiagram } from "@/components/schedule/FocusGestureDiagram";
import { Card } from "@/components/ui/Card";
import {
  screensGuideBlurb,
  screensGuideScreenBody,
  screensGuideScreenTitle,
  screensGuideSelectHint,
  type ScreensGuideKey,
} from "@/lib/i18n/app-shell-locale";
import { APP_SHELL_TABLET_INSET_CLASS } from "@/lib/constants/app-shell-layout";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

const SCREEN_KEYS: ScreensGuideKey[] = [
  "home",
  "library",
  "schedule",
  "focus",
  "firstThen",
  "saved",
  "menu",
];

export function ScreensGuideClient() {
  const lang = useCardUiLanguage();
  const [selected, setSelected] = useState<ScreensGuideKey>("focus");

  const body = useMemo(
    () => screensGuideScreenBody(selected, lang),
    [selected, lang],
  );

  return (
    <div className="min-h-dvh bg-white">
      <TranslatedHeader titleKey="screensGuide" backHref="/menu" />
      <div className={cn("space-y-6 px-4 pb-10 pt-2", APP_SHELL_TABLET_INSET_CLASS)}>
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {screensGuideBlurb(lang)}
        </p>

        <section className="space-y-2">
          <p className="px-1 text-[12px] font-medium text-ink-faint">
            {screensGuideSelectHint(lang)}
          </p>
          <ul className="flex flex-wrap gap-2">
            {SCREEN_KEYS.map((key) => {
              const active = key === selected;
              return (
                <li key={key}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(key)}
                    className={cn(
                      "rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors",
                      active
                        ? "bg-ink text-cream"
                        : "bg-canvas-muted text-ink ring-1 ring-ink/[0.07] active:bg-canvas",
                    )}
                  >
                    {screensGuideScreenTitle(key, lang)}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <Card className="space-y-4">
          <h2 className="text-[17px] font-semibold leading-snug text-ink">
            {screensGuideScreenTitle(selected, lang)}
          </h2>
          <p className="text-[14px] leading-relaxed text-ink-subtle whitespace-pre-line">
            {body}
          </p>
          {selected === "focus" ? <FocusGestureDiagram lang={lang} /> : null}
        </Card>
      </div>
    </div>
  );
}
