"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  focusGestureGuideCenter,
  focusGestureGuideOptions,
  focusGestureGuidePrevious,
  focusGestureGuideSkip,
  focusGestureGuideSupport,
  focusModeAriaSpeakTitle,
  focusModeOptBackSchedule,
  focusModeOptExitFocus,
  focusModeOptExpandedCards,
  focusModeOptFirstThen,
  focusModeOptMarkFinished,
  focusModeOptRestartRoutine,
  menuLinkLabel,
  routineTimerStepLabel,
  schedulePlayerFocusModeCta,
  schedulePlayerNextLabel,
  schedulePlayerNowLabel,
  schedulePlayerVoiceToggleAria,
  screensGuideFolderCore,
  screensGuideFolderClimb,
  screensGuidePreviewFirst,
  screensGuidePreviewThen,
  screensGuideSavedStarHint,
  type ScreensGuideKey,
} from "@/lib/i18n/app-shell-locale";
import { cn } from "@/lib/utils/cn";

const DEMO_CARD_A = "/cards/core/drink.png";
const DEMO_CARD_B = "/cards/core/eat.png";
const DEMO_CARD_C = "/cards/core/walk.png";

export function PhoneFrame({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[220px] overflow-hidden rounded-[1.65rem] border-[3px] border-ink/90 shadow-soft",
        dark ? "bg-black" : "bg-cream",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1.5 z-20 h-1 w-14 -translate-x-1/2 rounded-full bg-ink/25" />
      <div className="aspect-[9/16] overflow-hidden">{children}</div>
    </div>
  );
}

function MiniCard({
  src,
  title,
  compact,
}: {
  src: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-ink/10",
        compact ? "rounded-lg" : "rounded-xl",
      )}
    >
      <div className={cn("relative w-full bg-canvas-muted", compact ? "aspect-square" : "aspect-[4/3]")}>
        <Image src={src} alt="" fill className="object-contain p-1" unoptimized sizes="120px" />
      </div>
      <p
        className={cn(
          "truncate px-1.5 text-center font-semibold text-ink",
          compact ? "py-1 text-[8px]" : "py-1.5 text-[10px]",
        )}
      >
        {title}
      </p>
    </div>
  );
}

function ZoneChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "absolute z-10 max-w-[42%] rounded-md bg-black/55 px-1.5 py-1 text-center text-[8px] font-semibold leading-tight text-cream backdrop-blur-[1px] ring-1 ring-white/25",
        className,
      )}
    >
      {label}
    </span>
  );
}

function FocusPhonePreview({ lang }: { lang: CardLanguageCode }) {
  return (
    <PhoneFrame dark>
      <div className="relative flex h-full flex-col bg-black px-2 pb-2 pt-5">
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold tabular-nums text-ink">
          2 / 5
        </div>
        <ZoneChip
          label={focusGestureGuidePrevious(lang)}
          className="left-1.5 top-5"
        />
        <ZoneChip
          label={focusModeAriaSpeakTitle(lang)}
          className="left-1/2 top-5 max-w-[36%] -translate-x-1/2"
        />
        <ZoneChip
          label={focusGestureGuideSkip(lang)}
          className="right-1.5 top-5"
        />
        <div className="relative mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-cream ring-1 ring-white/20">
          <div className="relative min-h-0 flex-1">
            <Image
              src={DEMO_CARD_A}
              alt=""
              fill
              className="object-contain p-2"
              unoptimized
              sizes="200px"
            />
          </div>
          <p className="shrink-0 border-t border-ink/5 px-2 py-1.5 text-center text-[11px] font-semibold text-ink">
            Drink
          </p>
          <div className="pointer-events-none absolute inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-lg border border-dashed border-sage/70 bg-sage/25 px-1.5 py-2 text-center text-[8px] font-semibold leading-snug text-ink">
            {focusGestureGuideCenter(lang)}
          </div>
        </div>
        <ZoneChip
          label={focusGestureGuideSupport(lang)}
          className="bottom-3 left-1.5"
        />
        <ZoneChip
          label={focusGestureGuideOptions(lang)}
          className="bottom-3 right-1.5"
        />
      </div>
    </PhoneFrame>
  );
}

function HomePhonePreview({ lang }: { lang: CardLanguageCode }) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-2 bg-white px-2.5 pb-2.5 pt-5">
        <p className="text-[10px] font-semibold text-ink">Home</p>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-xl bg-sage-mist/80 p-2 ring-1 ring-sage/25">
            <p className="text-[9px] font-semibold text-ink">
              {screensGuideFolderCore(lang)}
            </p>
            <p className="mt-1 text-[8px] text-ink-subtle">12</p>
          </div>
          <div className="rounded-xl bg-[#E8F0F4] p-2 ring-1 ring-[#6b8f9e]/30">
            <p className="text-[9px] font-semibold text-ink">
              {screensGuideFolderClimb(lang)}
            </p>
            <p className="mt-1 text-[8px] text-ink-subtle">8</p>
          </div>
        </div>
        <MiniCard src={DEMO_CARD_C} title="Walk" compact />
      </div>
    </PhoneFrame>
  );
}

function LibraryPhonePreview() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-1.5 bg-white px-2 pb-2 pt-5">
        <p className="text-[10px] font-semibold text-ink">Library</p>
        <div className="grid grid-cols-2 gap-1.5">
          <MiniCard src={DEMO_CARD_A} title="Drink" compact />
          <MiniCard src={DEMO_CARD_B} title="Eat" compact />
          <MiniCard src={DEMO_CARD_C} title="Walk" compact />
          <MiniCard src="/cards/core/help.png" title="Help" compact />
        </div>
      </div>
    </PhoneFrame>
  );
}

function SchedulePhonePreview({ lang }: { lang: CardLanguageCode }) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-1.5 bg-white px-2 pb-2 pt-5">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-sage">
          {schedulePlayerNowLabel(lang)}
        </p>
        <MiniCard src={DEMO_CARD_A} title="Drink" />
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-faint">
          {schedulePlayerNextLabel(lang)}
        </p>
        <div className="flex gap-1.5 opacity-80">
          <div className="w-1/2">
            <MiniCard src={DEMO_CARD_B} title="Eat" compact />
          </div>
          <div className="w-1/2">
            <MiniCard src={DEMO_CARD_C} title="Walk" compact />
          </div>
        </div>
        <div className="mt-auto rounded-lg bg-ink px-2 py-1.5 text-center text-[9px] font-semibold text-cream">
          {schedulePlayerFocusModeCta(lang)}
        </div>
      </div>
    </PhoneFrame>
  );
}

function FirstThenPhonePreview({ lang }: { lang: CardLanguageCode }) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col justify-center gap-2 bg-white px-2 pb-2 pt-5">
        <div>
          <p className="mb-1 text-center text-[8px] font-semibold uppercase tracking-wide text-ink-faint">
            {screensGuidePreviewFirst(lang)}
          </p>
          <MiniCard src={DEMO_CARD_A} title="Drink" />
        </div>
        <div>
          <p className="mb-1 text-center text-[8px] font-semibold uppercase tracking-wide text-ink-faint">
            {screensGuidePreviewThen(lang)}
          </p>
          <MiniCard src={DEMO_CARD_B} title="Eat" />
        </div>
      </div>
    </PhoneFrame>
  );
}

function SavedPhonePreview({ lang }: { lang: CardLanguageCode }) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-2 bg-white px-2.5 pb-2.5 pt-5">
        <p className="text-[10px] font-semibold text-ink">Saved</p>
        {["Morning", "Snack", "Walk"].map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-xl bg-canvas-muted/80 px-2 py-2 ring-1 ring-ink/[0.06]"
          >
            <span className="text-[11px] text-sage">✦</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-ink">{name}</p>
              <p className="truncate text-[8px] text-ink-subtle">
                {screensGuideSavedStarHint(lang)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function MenuPhonePreview({ lang }: { lang: CardLanguageCode }) {
  const rows = [
    menuLinkLabel("screensGuide", lang),
    menuLinkLabel("schedulePlayer", lang),
    menuLinkLabel("firstThen", lang),
  ];
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col gap-1.5 bg-white px-2.5 pb-2.5 pt-5">
        <p className="text-[10px] font-semibold text-ink">Menu</p>
        {rows.map((label) => (
          <div
            key={label}
            className="rounded-xl bg-canvas-muted/80 px-2.5 py-2.5 text-[10px] font-semibold text-ink ring-1 ring-ink/[0.06]"
          >
            {label}
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

export function ScreensGuidePhonePreview({
  screen,
  lang,
}: {
  screen: ScreensGuideKey;
  lang: CardLanguageCode;
}) {
  switch (screen) {
    case "home":
      return <HomePhonePreview lang={lang} />;
    case "library":
      return <LibraryPhonePreview />;
    case "schedule":
      return <SchedulePhonePreview lang={lang} />;
    case "focus":
      return <FocusPhonePreview lang={lang} />;
    case "firstThen":
      return <FirstThenPhonePreview lang={lang} />;
    case "saved":
      return <SavedPhonePreview lang={lang} />;
    case "menu":
      return <MenuPhonePreview lang={lang} />;
  }
}

export function FocusOptionsExplainList({ lang }: { lang: CardLanguageCode }) {
  const items = [
    schedulePlayerVoiceToggleAria(lang),
    routineTimerStepLabel(lang),
    focusModeOptExpandedCards(lang),
    focusModeOptBackSchedule(lang),
    focusModeOptFirstThen(lang),
    focusModeOptRestartRoutine(lang),
    focusModeOptMarkFinished(lang),
    focusModeOptExitFocus(lang),
  ];
  return (
    <ul className="space-y-1.5">
      {items.map((label) => (
        <li
          key={label}
          className="rounded-xl bg-canvas-muted/90 px-3 py-2.5 text-[13px] font-medium text-ink ring-1 ring-ink/[0.06]"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
