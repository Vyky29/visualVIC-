"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { PixtoLearnIconMark } from "@/components/brand/PixtoLearnIconMark";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import { HOTEL_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import {
  bottomNavLabel,
  firstThenDemoFocusModeCta,
  firstThenDemoIntroMoreNavAria,
  firstThenDemoIntroMoreToggleHide,
  firstThenDemoIntroMoreToggleShow,
  firstThenDemoNavAria,
  firstThenDemoPageTitle,
  firstThenSlotLabel,
  focusQuickNavAriaLabel,
  focusQuickNavToggleHide,
  focusQuickNavToggleShow,
  playerKindRoutine,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

const cardShell =
  "relative overflow-hidden rounded-[1.45rem] bg-[#E2E7EB] shadow-[0_9px_30px_-14px_rgba(28,36,32,0.2)]";
const WOW_TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;

function IconFirst({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-sage", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-sage stroke-ink/15" strokeWidth="1" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

function IconThen({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-accent", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-accent stroke-ink/12" strokeWidth="1" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        2
      </text>
    </svg>
  );
}

function MenuDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      <circle cx="12" cy="5.5" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="18.5" r="1.7" fill="currentColor" />
    </svg>
  );
}

function RoutinesHomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden>
      <rect
        x="4.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="4.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.2 16.5h3.6M17 14.7v3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FocusFabPlusIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5 transition-transform duration-200 ease-out", open && "rotate-45", className)}
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HomeSectionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden>
      <path
        d="M5.25 10.4 12 5l6.75 5.4v7.1a1.5 1.5 0 0 1-1.5 1.5h-2.9v-4.65a1.2 1.2 0 0 0-1.2-1.2h-2.3a1.2 1.2 0 0 0-1.2 1.2V19H6.75a1.5 1.5 0 0 1-1.5-1.5v-7.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FocusModeIntroIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-3.5 w-3.5 shrink-0", className)} aria-hidden>
      <path
        d="M9 3.5H4.5V8M15 3.5H19.5V8M15 20.5h4.5v-4.5M9 20.5H4.5V16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const introFooterActionClass =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[0.9rem] border border-ink/10 bg-white px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink shadow-soft transition active:scale-[0.99] sm:px-3";

function splitWowTitle(raw: string): [string] | [string, string] {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [raw];

  let bestIndex = 1;
  let bestScore = Number.POSITIVE_INFINITY;
  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(" ");
    const right = words.slice(index).join(" ");
    const score =
      Math.abs(left.length - right.length) +
      (left.split(" ").length === 1 ? 2 : 0) +
      (right.split(" ").length === 1 ? 2 : 0);
    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

function MiniDigitalWowCard({ card }: { card: GeneratedPixtoCardProps }) {
  const cardUiLang = useCardUiLanguage();
  const { title: displayTitle, category: displayCategory } = useMemo(
    () =>
      resolveDigitalPixtoStrings(
        card.illustrationUrl,
        card.title,
        card.category,
        cardUiLang,
      ),
    [card.illustrationUrl, card.title, card.category, cardUiLang],
  );
  const titleLines = splitWowTitle(displayTitle);
  const titleStyle =
    titleLines.length === 1
      ? { fontSize: "19px", lineHeight: 0.92, letterSpacing: "-0.018em" }
      : { fontSize: "14px", lineHeight: 0.96, letterSpacing: "-0.016em" };

  return (
    <article
      className="relative grid h-full w-full overflow-hidden rounded-[1rem] bg-white ring-1 ring-inset ring-[rgba(20,28,24,0.32)]"
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${GENERATED_PIXTO_WOW_TOP_LAYOUT_H}fr ${GENERATED_PIXTO_WOW_TITLE_ZONE_H}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
      }}
    >
      <div className="relative bg-white">
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
          style={{
            top: `${(GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION / GENERATED_PIXTO_WOW_TOP_LAYOUT_H) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}`,
          }}
        >
          <Image
            src={card.illustrationUrl}
            alt=""
            fill
            className="object-contain object-center"
            sizes="220px"
            unoptimized
          />
        </div>

        {card.iconUrl ? (
          <div
            className="absolute rounded-[0.9rem] bg-white"
            style={{
              right: "5.4%",
              top: "3.8%",
              width: `${(GENERATED_PIXTO_WOW_COMPANY_MARK.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={card.iconUrl}
                alt=""
                fill
                className="object-contain"
                sizes={`${GENERATED_PIXTO_WOW_COMPANY_MARK.w}px`}
                unoptimized
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="bg-white px-3 py-1">
        <div className="flex h-full min-h-0 w-full items-center justify-center">
          <div
            className={cn(
              "flex shrink-0 flex-col items-center justify-center text-center font-semibold lowercase text-ink",
              titleLines.length > 1 ? "gap-[0.14em]" : "gap-0",
            )}
            style={{
              width: `min(100%, ${WOW_TEXT_BOX_SIZE.w}px)`,
              height: `min(100%, ${WOW_TEXT_BOX_SIZE.h}px)`,
              ...titleStyle,
            }}
          >
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block w-full whitespace-nowrap">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: card.categoryColour }}
      >
        <span
          className="block w-full overflow-hidden whitespace-nowrap text-center font-semibold lowercase text-white/95"
          style={{ fontSize: "11px", lineHeight: 1, letterSpacing: "-0.012em" }}
        >
          {displayCategory}
        </span>
      </div>
    </article>
  );
}

function StepVisualCard({
  generatedCard,
  label,
  icon,
  className,
}: {
  generatedCard: GeneratedPixtoCardProps;
  label: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        cardShell,
        "flex min-h-0 flex-col",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-center gap-2.5 border-b-2 border-[#BCC5CC] bg-[#E2E7EB] py-3">
        <div className="grayscale">{icon}</div>
        <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
      </div>
      <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-[#E2E7EB]">
        <div className="absolute inset-0 flex min-h-0 items-center justify-center p-3">
          <div
            className="relative h-full max-h-full w-auto min-w-0 max-w-[min(92%,100%)] shrink-0"
            style={{
              aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
            }}
          >
            <MiniDigitalWowCard card={generatedCard} />
          </div>
        </div>
      </div>
    </article>
  );
}

function IntroStepLabel({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <div className="grayscale">{icon}</div>
      <span className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink">
        {label}
      </span>
    </div>
  );
}

function IntroCueChip() {
  return (
    <div className="pointer-events-none absolute left-[6.025rem] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D7DDE2] bg-white px-2 py-1 shadow-soft">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden>
        <path
          d="M5 12h11M12 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function FirstThenDemoPage() {
  const lang = useCardUiLanguage();
  const [viewport, setViewport] = useState({ w: 402, h: 874 });
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [focusQuickMenuOpen, setFocusQuickMenuOpen] = useState(false);
  const [introFooterMoreOpen, setIntroFooterMoreOpen] = useState(false);

  useEffect(() => {
    if (!showFocusMode) setFocusQuickMenuOpen(false);
    else setIntroFooterMoreOpen(false);
  }, [showFocusMode]);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    const orientation = window.screen?.orientation as
      | (ScreenOrientation & {
          lock?: (orientation: "portrait") => Promise<void>;
          unlock?: () => void;
        })
      | undefined;
    if (orientation?.lock) {
      orientation.lock("portrait").catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", updateViewport);
      orientation?.unlock?.();
    };
  }, []);

  const first = HOTEL_GENERATED_CARD_PROPS[3];
  const second = HOTEL_GENERATED_CARD_PROPS[4];
  const shortSide = Math.min(viewport.w, viewport.h);
  const longSide = Math.max(viewport.w, viewport.h);
  const sceneScale = Math.min(viewport.w / shortSide, viewport.h / longSide);
  const sceneStyle: CSSProperties = {
    width: `${longSide}px`,
    height: `${shortSide}px`,
    transform: `translate(-50%, -50%) rotate(90deg) scale(${sceneScale})`,
    transformOrigin: "center center",
  };

  if (!showFocusMode) {
    return (
      <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas px-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-0 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-2.5">
          <div className="flex items-center justify-center gap-2 pt-0.5 text-center">
            <PixtoLearnIconMark className="h-9 w-9 rounded-[0.95rem]" />
            <h1 className="text-[1.16rem] font-semibold tracking-tight text-ink">
              {firstThenDemoPageTitle(lang)}
            </h1>
          </div>

          <div className="grid min-h-0 grid-rows-2 gap-1.5">
            <div className="relative grid min-h-0 grid-cols-[5.15rem_minmax(0,1fr)] items-center gap-2 rounded-[1.3rem] border border-[#C8D0D6] bg-[#E6EBEF] px-2.5 py-1.5">
              <div className="pointer-events-none absolute bottom-2 left-[6.025rem] top-2 w-px -translate-x-1/2 bg-[#BCC5CC]" />
              <IntroCueChip />
              <IntroStepLabel
                label={firstThenSlotLabel("first", lang)}
                icon={<IconFirst className="h-7 w-7" />}
              />
              <div className="flex min-h-0 h-full max-h-full overflow-hidden items-center justify-center">
                <div className="mx-auto w-[min(100%,calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-11.35rem)/3.2))] max-w-[12.75rem]">
                  <MiniDigitalWowCard card={first} />
                </div>
              </div>
            </div>

            <div className="relative grid min-h-0 grid-cols-[5.15rem_minmax(0,1fr)] items-center gap-2 rounded-[1.3rem] border border-[#C8D0D6] bg-[#E6EBEF] px-2.5 py-1.5">
              <div className="pointer-events-none absolute bottom-2 left-[6.025rem] top-2 w-px -translate-x-1/2 bg-[#BCC5CC]" />
              <IntroCueChip />
              <IntroStepLabel
                label={firstThenSlotLabel("then", lang)}
                icon={<IconThen className="h-7 w-7" />}
              />
              <div className="flex min-h-0 h-full max-h-full overflow-hidden items-center justify-center">
                <div className="mx-auto w-[min(100%,calc((100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-11.35rem)/3.2))] max-w-[12.75rem]">
                  <MiniDigitalWowCard card={second} />
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex min-h-[3.75rem] w-full min-w-0 flex-col items-center justify-end gap-2 px-1 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-1"
            role="navigation"
            aria-label={firstThenDemoNavAria(lang)}
          >
            {introFooterMoreOpen ? (
              <nav
                id="intro-demo-more-nav"
                aria-label={firstThenDemoIntroMoreNavAria(lang)}
                className="flex w-full min-w-0 flex-col items-center gap-2 pb-0.5"
              >
                <Link
                  href="/dashboard"
                  className={introFooterActionClass}
                  onClick={() => setIntroFooterMoreOpen(false)}
                >
                  <HomeSectionIcon className="h-3.5 w-3.5 shrink-0" />
                  {bottomNavLabel("home", lang)}
                </Link>
                <Link
                  href="/player/brushing-teeth"
                  className={introFooterActionClass}
                  onClick={() => setIntroFooterMoreOpen(false)}
                >
                  <RoutinesHomeIcon className="h-3.5 w-3.5 shrink-0" />
                  {playerKindRoutine(lang)}
                </Link>
              </nav>
            ) : null}
            <div className="flex w-full min-w-0 flex-wrap items-end justify-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIntroFooterMoreOpen(false);
                  setShowFocusMode(true);
                }}
                className={introFooterActionClass}
              >
                <FocusModeIntroIcon />
                {firstThenDemoFocusModeCta(lang)}
              </button>
              <button
                type="button"
                id="intro-demo-more-toggle"
                aria-expanded={introFooterMoreOpen}
                aria-controls={introFooterMoreOpen ? "intro-demo-more-nav" : undefined}
                aria-label={
                  introFooterMoreOpen
                    ? firstThenDemoIntroMoreToggleHide(lang)
                    : firstThenDemoIntroMoreToggleShow(lang)
                }
                onClick={() => setIntroFooterMoreOpen((open) => !open)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white text-ink shadow-soft transition active:scale-[0.98]"
              >
                <FocusFabPlusIcon open={introFooterMoreOpen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas touch-manipulation">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute left-1/2 top-1/2" style={sceneStyle}>
          <div className="relative h-full w-full bg-canvas pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[max(0.55rem,env(safe-area-inset-top))] pr-[max(4rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]">
            <div className="mx-auto grid h-full min-h-0 w-full min-w-0 grid-cols-2 items-stretch gap-x-[clamp(0.42rem,1.25vw,0.78rem)] px-0 pb-0">
              <div className="flex h-full min-h-0 w-full min-w-0 items-end justify-center pb-0">
                <div className="aspect-[10/13] h-full max-h-full w-[min(100%,98.5%)] max-w-full min-h-0 min-w-0">
                  <StepVisualCard
                    generatedCard={first}
                    label={firstThenSlotLabel("first", lang)}
                    icon={<IconFirst className="h-7 w-7" />}
                    className="h-full min-h-0"
                  />
                </div>
              </div>

              <div className="flex h-full min-h-0 w-full min-w-0 items-end justify-center pb-0">
                <div className="aspect-[10/13] h-full max-h-full w-[min(100%,98.5%)] max-w-full min-h-0 min-w-0">
                  <StepVisualCard
                    generatedCard={second}
                    label={firstThenSlotLabel("then", lang)}
                    icon={<IconThen className="h-7 w-7" />}
                    className="h-full min-h-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30" style={sceneStyle}>
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute bottom-[max(4.15rem,calc(2.35rem+env(safe-area-inset-bottom)))] right-0 top-[48%] flex w-full max-w-[min(100%,4.35rem)] flex-col items-center justify-end gap-2 px-1 pr-[max(0.35rem,env(safe-area-inset-bottom))]">
              {focusQuickMenuOpen ? (
                <nav
                  id="focus-quick-nav"
                  aria-label={focusQuickNavAriaLabel(lang)}
                  className="flex flex-col items-center gap-3 pb-1"
                >
                  <Link
                    href="/dashboard"
                    className="flex flex-col items-center gap-0.5 text-ink transition active:opacity-70"
                    onClick={() => setFocusQuickMenuOpen(false)}
                  >
                    <HomeSectionIcon className="shrink-0" />
                    <span className="text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/65">
                      {bottomNavLabel("home", lang)}
                    </span>
                  </Link>

                  <Link
                    href="/menu"
                    className="flex flex-col items-center gap-0.5 text-ink transition active:opacity-70"
                    onClick={() => setFocusQuickMenuOpen(false)}
                  >
                    <MenuDotsIcon className="shrink-0" />
                    <span className="text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/65">
                      {bottomNavLabel("menu", lang)}
                    </span>
                  </Link>

                  <Link
                    href="/player/brushing-teeth"
                    className="flex flex-col items-center gap-0.5 text-ink transition active:opacity-70"
                    onClick={() => setFocusQuickMenuOpen(false)}
                  >
                    <RoutinesHomeIcon className="shrink-0" />
                    <span className="text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/65">
                      {playerKindRoutine(lang)}
                    </span>
                  </Link>
                </nav>
              ) : null}

              <button
                type="button"
                id="focus-quick-nav-toggle"
                aria-expanded={focusQuickMenuOpen}
                aria-controls={focusQuickMenuOpen ? "focus-quick-nav" : undefined}
                aria-label={
                  focusQuickMenuOpen
                    ? focusQuickNavToggleHide(lang)
                    : focusQuickNavToggleShow(lang)
                }
                onClick={() => setFocusQuickMenuOpen((open) => !open)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white/92 text-ink shadow-soft backdrop-blur-sm transition active:scale-[0.98]"
              >
                <FocusFabPlusIcon open={focusQuickMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
