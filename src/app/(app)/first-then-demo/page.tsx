"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
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
import { GENERATED_PIXTO_SCHEDULE_NEXT_W } from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";

const WOW_TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const LANDSCAPE_PAIR_GAP_PX = 12;
const MOBILE_LANDSCAPE_MQ = "(orientation: landscape) and (max-height: 500px)";

function useMobileLandscape() {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_LANDSCAPE_MQ);
    const update = () => setIsMobileLandscape(mq.matches);
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isMobileLandscape;
}

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

function FirstThenLandscapeColumn({ card }: { card: GeneratedPixtoCardProps }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const W = outer.clientWidth;
      const H = outer.clientHeight;
      if (W <= 0 || H <= 0) return;

      const sx = W / GENERATED_PIXTO_CARD_SIZE.w;
      const sy = H / GENERATED_PIXTO_CARD_SIZE.h;
      const next = Math.min(sx, sy);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.28);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const slotW = GENERATED_PIXTO_CARD_SIZE.w * scale;
  const slotH = GENERATED_PIXTO_CARD_SIZE.h * scale;

  return (
    <div
      ref={outerRef}
      className="flex min-h-0 w-full min-w-0 flex-1 items-center justify-center"
    >
      <div className="relative shrink-0" style={{ width: slotW, height: slotH }}>
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: GENERATED_PIXTO_CARD_SIZE.w,
            height: GENERATED_PIXTO_CARD_SIZE.h,
            transform: `scale(${scale})`,
          }}
        >
          <MiniDigitalWowCard card={card} />
        </div>
      </div>
    </div>
  );
}

function FirstThenLandscapePair({
  firstCard,
  secondCard,
  className,
  style,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  className?: string;
  style?: CSSProperties;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const W = outer.clientWidth;
      const H = outer.clientHeight;
      if (W <= 0 || H <= 0) return;

      const sx =
        (W - LANDSCAPE_PAIR_GAP_PX) / (GENERATED_PIXTO_CARD_SIZE.w * 2);
      const sy = H / GENERATED_PIXTO_CARD_SIZE.h;
      const next = Math.min(sx, sy);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.28);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const slotW = GENERATED_PIXTO_CARD_SIZE.w * scale;
  const slotH = GENERATED_PIXTO_CARD_SIZE.h * scale;
  const cards = [firstCard, secondCard] as const;

  return (
    <div
      ref={outerRef}
      className={cn(
        "flex min-h-0 w-full min-w-0 items-center justify-center",
        className ?? "absolute inset-0",
      )}
      style={{
        paddingLeft: "max(4px, env(safe-area-inset-left))",
        paddingRight: "max(4px, env(safe-area-inset-right))",
        paddingTop: "max(4px, env(safe-area-inset-top))",
        paddingBottom: "max(4px, env(safe-area-inset-bottom))",
        ...style,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ gap: LANDSCAPE_PAIR_GAP_PX }}
      >
        {cards.map((card) => (
          <div
            key={card.illustrationUrl}
            className="relative shrink-0"
            style={{ width: slotW, height: slotH }}
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: GENERATED_PIXTO_CARD_SIZE.w,
                height: GENERATED_PIXTO_CARD_SIZE.h,
                transform: `scale(${scale})`,
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  width: GENERATED_PIXTO_CARD_SIZE.w,
                  height: GENERATED_PIXTO_CARD_SIZE.h,
                }}
              >
                <MiniDigitalWowCard card={card} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntroFooterColumn({
  lang,
  introFooterMoreOpen,
  setIntroFooterMoreOpen,
  onFocusMode,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  introFooterMoreOpen: boolean;
  setIntroFooterMoreOpen: Dispatch<SetStateAction<boolean>>;
  onFocusMode: () => void;
}) {
  return (
    <div
      className="flex min-h-0 flex-col items-center justify-end gap-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] pr-[max(0.35rem,env(safe-area-inset-right))]"
      role="navigation"
      aria-label={firstThenDemoNavAria(lang)}
    >
      {introFooterMoreOpen ? (
        <nav
          id="intro-demo-more-nav"
          aria-label={firstThenDemoIntroMoreNavAria(lang)}
          className="flex flex-col items-center gap-2 pb-0.5"
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
      <button type="button" onClick={onFocusMode} className={introFooterActionClass}>
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
  );
}

function FirstThenPortraitStack({
  firstCard,
  secondCard,
  className,
  showStepLabels = false,
  lang,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  className?: string;
  showStepLabels?: boolean;
  lang?: ReturnType<typeof useCardUiLanguage>;
}) {
  const cardWidthClass = `mx-auto w-[min(100%,${GENERATED_PIXTO_SCHEDULE_NEXT_W}px)] min-w-0`;
  const slots = [
    { card: firstCard, slot: "first" as const, icon: <IconFirst className="h-6 w-6" /> },
    { card: secondCard, slot: "then" as const, icon: <IconThen className="h-6 w-6" /> },
  ];

  return (
    <div className={cn("grid min-h-0 grid-rows-2 gap-1.5", className)}>
      {slots.map(({ card, slot, icon }) => (
        <div key={slot} className="flex min-h-0 flex-col items-center justify-center gap-0.5">
          {showStepLabels && lang ? (
            <FocusStepLabel label={firstThenSlotLabel(slot, lang)} icon={icon} />
          ) : null}
          <div className={cn(cardWidthClass, "min-h-0 flex-1")}>
            <MiniDigitalWowCard card={card} />
          </div>
        </div>
      ))}
    </div>
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

/** Slim horizontal label — less height than IntroStepLabel so cards keep more space. */
function FocusStepLabel({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1.5 px-0.5 pt-0.5 text-center">
      <div className="grayscale">{icon}</div>
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink">
        {label}
      </span>
    </div>
  );
}

function FocusFooterColumn({
  lang,
  focusFooterMoreOpen,
  setFocusFooterMoreOpen,
  onExitFocus,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  focusFooterMoreOpen: boolean;
  setFocusFooterMoreOpen: Dispatch<SetStateAction<boolean>>;
  onExitFocus: () => void;
}) {
  return (
    <div
      className="flex min-h-0 flex-col items-center justify-end gap-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] pr-[max(0.35rem,env(safe-area-inset-right))]"
      role="navigation"
      aria-label={firstThenDemoNavAria(lang)}
    >
      {focusFooterMoreOpen ? (
        <nav
          id="focus-demo-more-nav"
          aria-label={firstThenDemoIntroMoreNavAria(lang)}
          className="flex flex-col items-center gap-2 pb-0.5"
        >
          <Link
            href="/dashboard"
            className={introFooterActionClass}
            onClick={() => setFocusFooterMoreOpen(false)}
          >
            <HomeSectionIcon className="h-3.5 w-3.5 shrink-0" />
            {bottomNavLabel("home", lang)}
          </Link>
          <Link
            href="/player/brushing-teeth"
            className={introFooterActionClass}
            onClick={() => setFocusFooterMoreOpen(false)}
          >
            <RoutinesHomeIcon className="h-3.5 w-3.5 shrink-0" />
            {playerKindRoutine(lang)}
          </Link>
        </nav>
      ) : null}
      <button type="button" onClick={onExitFocus} className={introFooterActionClass}>
        <FocusModeIntroIcon />
        {firstThenDemoFocusModeCta(lang)}
      </button>
      <button
        type="button"
        id="focus-demo-more-toggle"
        aria-expanded={focusFooterMoreOpen}
        aria-controls={focusFooterMoreOpen ? "focus-demo-more-nav" : undefined}
        aria-label={
          focusFooterMoreOpen
            ? firstThenDemoIntroMoreToggleHide(lang)
            : firstThenDemoIntroMoreToggleShow(lang)
        }
        onClick={() => setFocusFooterMoreOpen((open) => !open)}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white text-ink shadow-soft transition active:scale-[0.98]"
      >
        <FocusFabPlusIcon open={focusFooterMoreOpen} />
      </button>
    </div>
  );
}

export default function FirstThenDemoPage() {
  const lang = useCardUiLanguage();
  const isMobileLandscape = useMobileLandscape();
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [focusQuickMenuOpen, setFocusQuickMenuOpen] = useState(false);
  const [focusFooterMoreOpen, setFocusFooterMoreOpen] = useState(false);
  const [introFooterMoreOpen, setIntroFooterMoreOpen] = useState(false);

  useEffect(() => {
    if (!showFocusMode) {
      setFocusQuickMenuOpen(false);
      setFocusFooterMoreOpen(false);
    } else {
      setIntroFooterMoreOpen(false);
    }
  }, [showFocusMode]);

  const first = HOTEL_GENERATED_CARD_PROPS[3];
  const second = HOTEL_GENERATED_CARD_PROPS[4];

  if (!showFocusMode) {
    if (isMobileLandscape) {
      return (
        <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pb-0 pt-[max(0.35rem,env(safe-area-inset-top))]">
          <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min(4.35rem,max-content)] gap-x-2">
            <div className="flex min-h-0 flex-col gap-1">
              <div className="flex shrink-0 justify-center px-0.5 pt-0.5">
                <IntroStepLabel
                  label={firstThenSlotLabel("first", lang)}
                  icon={<IconFirst className="h-7 w-7" />}
                />
              </div>
              <FirstThenLandscapeColumn card={first} />
            </div>

            <div className="flex min-h-0 flex-col gap-1">
              <div className="flex shrink-0 justify-center px-0.5 pt-0.5">
                <IntroStepLabel
                  label={firstThenSlotLabel("then", lang)}
                  icon={<IconThen className="h-7 w-7" />}
                />
              </div>
              <FirstThenLandscapeColumn card={second} />
            </div>

            <IntroFooterColumn
              lang={lang}
              introFooterMoreOpen={introFooterMoreOpen}
              setIntroFooterMoreOpen={setIntroFooterMoreOpen}
              onFocusMode={() => {
                setIntroFooterMoreOpen(false);
                setShowFocusMode(true);
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="h-[100dvh] w-full overflow-hidden overscroll-none bg-canvas px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pb-0 pt-[max(0.35rem,env(safe-area-inset-top))]">
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-2">
          <div className="flex items-center justify-center gap-2 pt-0.5 text-center">
            <PixtoLearnIconMark className="h-9 w-9 rounded-[0.95rem]" />
            <h1 className="text-[1.16rem] font-semibold tracking-tight text-ink">
              {firstThenDemoPageTitle(lang)}
            </h1>
          </div>

          <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min(4.35rem,max-content)] grid-rows-[auto_minmax(0,1fr)] gap-x-2 gap-y-1">
            <div className="flex justify-center px-0.5 pt-0.5">
              <IntroStepLabel
                label={firstThenSlotLabel("first", lang)}
                icon={<IconFirst className="h-7 w-7" />}
              />
            </div>
            <div className="flex justify-center px-0.5 pt-0.5">
              <IntroStepLabel
                label={firstThenSlotLabel("then", lang)}
                icon={<IconThen className="h-7 w-7" />}
              />
            </div>

            <div className="row-span-2">
              <IntroFooterColumn
                lang={lang}
                introFooterMoreOpen={introFooterMoreOpen}
                setIntroFooterMoreOpen={setIntroFooterMoreOpen}
                onFocusMode={() => {
                  setIntroFooterMoreOpen(false);
                  setShowFocusMode(true);
                }}
              />
            </div>

            <div className="col-span-2 relative min-h-0">
              <FirstThenLandscapePair
                firstCard={first}
                secondCard={second}
                className="relative h-full min-h-0"
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden overscroll-none bg-canvas touch-manipulation">
      {isMobileLandscape ? (
        <div className="h-full w-full px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pb-0 pt-[max(0.35rem,env(safe-area-inset-top))]">
          <div className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min(4.35rem,max-content)] gap-x-2">
            <div className="flex min-h-0 flex-col gap-0.5">
              <FocusStepLabel
                label={firstThenSlotLabel("first", lang)}
                icon={<IconFirst className="h-6 w-6" />}
              />
              <FirstThenLandscapeColumn card={first} />
            </div>

            <div className="flex min-h-0 flex-col gap-0.5">
              <FocusStepLabel
                label={firstThenSlotLabel("then", lang)}
                icon={<IconThen className="h-6 w-6" />}
              />
              <FirstThenLandscapeColumn card={second} />
            </div>

            <FocusFooterColumn
              lang={lang}
              focusFooterMoreOpen={focusFooterMoreOpen}
              setFocusFooterMoreOpen={setFocusFooterMoreOpen}
              onExitFocus={() => {
                setFocusFooterMoreOpen(false);
                setShowFocusMode(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex min-h-0 flex-col px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <FirstThenPortraitStack
            firstCard={first}
            secondCard={second}
            className="min-h-0 flex-1"
            showStepLabels
            lang={lang}
          />
        </div>
      )}

      {!isMobileLandscape ? (
      <div className="pointer-events-none fixed inset-0 z-30">
        <div className="pointer-events-auto absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] flex flex-col items-center gap-2">
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
      ) : null}
    </div>
  );
}
