"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useSearchParams } from "next/navigation";
import { PixtoLearnIconMark } from "@/components/brand/PixtoLearnIconMark";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
  GENERATED_PIXTO_FOCUS_FIXED_ZONE,
  IllustrationSlotDiagnosticBorder,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  parseFirstThenDemoPackId,
  resolveFirstThenDemoPack,
} from "@/lib/experimental/first-then-demo-packs";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import {
  bottomNavLabel,
  firstThenDemoFocusModeCta,
  firstThenDemoIntroMoreNavAria,
  firstThenDemoIntroMoreToggleHide,
  firstThenDemoIntroMoreToggleShow,
  firstThenDemoNavAria,
  firstThenDemoPageTitle,
  firstThenDemoRotateForFocusBody,
  firstThenDemoRotateForFocusTitle,
  firstThenSlotLabel,
  playerKindRoutine,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

const WOW_TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const MOBILE_LANDSCAPE_MQ = "(orientation: landscape) and (max-height: 500px)";

/** Focus landscape — same 3-zone frame as schedule Focus (`GENERATED_PIXTO_FOCUS_FIXED_ZONE`). */
const FOCUS_LANDSCAPE = {
  cardW: GENERATED_PIXTO_FOCUS_FIXED_ZONE.w,
  cardH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.h,
  cardRadius: 16,
  cardGap: 24,
  illustPadTop: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadTop,
  illustPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadX,
  illustPadBottom: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadBottom,
  actionH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionH,
  actionPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionPadX,
  footerH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerH,
  footerPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerPadX,
  illustBorder: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustBorder,
  illustBorderColor: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustBorderColor,
  packMarkSize: GENERATED_PIXTO_FOCUS_FIXED_ZONE.packMarkSize,
  packMarkTop: GENERATED_PIXTO_FOCUS_FIXED_ZONE.packMarkTop,
  packMarkRight: GENERATED_PIXTO_FOCUS_FIXED_ZONE.packMarkRight,
  cardsToSidebarGap: 64,
  sidebarW: 64,
  sidebarEdge: 24,
  sidebarBtnGap: 12,
  focusBtnH: 88,
  menuBtnH: 56,
  menuBtnRadius: 12,
  pink: "#EC1D7A",
  menuBtnBg: "#2B2F33",
} as const;

const FOCUS_LANDSCAPE_SCENE_W =
  FOCUS_LANDSCAPE.cardW * 2 +
  FOCUS_LANDSCAPE.cardGap +
  FOCUS_LANDSCAPE.cardsToSidebarGap +
  FOCUS_LANDSCAPE.sidebarW;
const FOCUS_LANDSCAPE_SCENE_H = FOCUS_LANDSCAPE.cardH;

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
            className="object-cover object-center"
            sizes="220px"
            unoptimized
          />
          <IllustrationSlotDiagnosticBorder />
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

function FirstThenFocusSpecCard({
  slot,
  card,
  lang,
}: {
  slot: "first" | "then";
  card: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
}) {
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
  const slotLabel = firstThenSlotLabel(slot, lang);

  return (
    <article
      className="relative shrink-0 overflow-hidden bg-white"
      style={{
        width: FOCUS_LANDSCAPE.cardW,
        height: FOCUS_LANDSCAPE.cardH,
        borderRadius: FOCUS_LANDSCAPE.cardRadius,
      }}
      aria-label={`${slotLabel} — ${displayTitle}`}
    >
      <div className="flex h-full min-h-0 flex-col">
        {/* Section 1 — illustration area (all remaining space) */}
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center"
          style={{
            paddingTop: FOCUS_LANDSCAPE.illustPadTop,
            paddingRight: FOCUS_LANDSCAPE.illustPadX,
            paddingBottom: FOCUS_LANDSCAPE.illustPadBottom,
            paddingLeft: FOCUS_LANDSCAPE.illustPadX,
          }}
        >
          {card.iconUrl ? (
            <div
              className="absolute z-10"
              style={{
                top: FOCUS_LANDSCAPE.packMarkTop,
                right: FOCUS_LANDSCAPE.packMarkRight,
                width: FOCUS_LANDSCAPE.packMarkSize,
                height: FOCUS_LANDSCAPE.packMarkSize,
              }}
            >
              <Image
                src={card.iconUrl}
                alt=""
                fill
                className="object-contain"
                sizes={`${FOCUS_LANDSCAPE.packMarkSize}px`}
                unoptimized
              />
            </div>
          ) : null}

          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
            style={{
              border: `${FOCUS_LANDSCAPE.illustBorder}px solid ${FOCUS_LANDSCAPE.illustBorderColor}`,
            }}
          >
            <Image
              src={card.illustrationUrl}
              alt=""
              fill
              className="!h-full !w-full object-contain object-center"
              sizes={`${FOCUS_LANDSCAPE.cardW}px`}
              unoptimized
            />
            <IllustrationSlotDiagnosticBorder />
          </div>
        </div>

        {/* Section 2 — action text (fixed 110px) */}
        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            height: FOCUS_LANDSCAPE.actionH,
            paddingLeft: FOCUS_LANDSCAPE.actionPadX,
            paddingRight: FOCUS_LANDSCAPE.actionPadX,
          }}
        >
          <p
            className="line-clamp-2 max-w-full text-center font-extrabold lowercase text-black [overflow-wrap:break-word]"
            style={{
              fontSize: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionTitleFontPx,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            {displayTitle}
          </p>
        </div>

        {/* Section 3 — footer (fixed 84px) */}
        <footer
          className="flex shrink-0 items-center justify-center"
          style={{
            height: FOCUS_LANDSCAPE.footerH,
            backgroundColor: FOCUS_LANDSCAPE.pink,
            paddingLeft: FOCUS_LANDSCAPE.footerPadX,
            paddingRight: FOCUS_LANDSCAPE.footerPadX,
          }}
        >
          <span
            className="line-clamp-2 max-w-full text-center font-extrabold lowercase text-white [overflow-wrap:break-word]"
            style={{
              fontSize: "clamp(18px, 3.2vw, 26px)",
              lineHeight: 1.1,
            }}
          >
            {displayCategory}
          </span>
        </footer>
      </div>
    </article>
  );
}

function FirstThenFocusSidebar({
  lang,
  onExitFocus,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  onExitFocus: () => void;
}) {
  const menuBtnClass =
    "flex w-full flex-col items-center justify-center gap-1 text-white transition active:opacity-80";

  const menuBtnStyle = {
    height: FOCUS_LANDSCAPE.menuBtnH,
    borderRadius: FOCUS_LANDSCAPE.menuBtnRadius,
    backgroundColor: FOCUS_LANDSCAPE.menuBtnBg,
    fontSize: "clamp(12px, 2.2vw, 16px)",
    fontWeight: 700 as const,
  };

  return (
    <aside
      className="flex shrink-0 flex-col"
      style={{
        width: FOCUS_LANDSCAPE.sidebarW,
        gap: FOCUS_LANDSCAPE.sidebarBtnGap,
      }}
      role="navigation"
      aria-label={firstThenDemoNavAria(lang)}
    >
      <button
        type="button"
        onClick={onExitFocus}
        className={menuBtnClass}
        style={{
          height: FOCUS_LANDSCAPE.focusBtnH,
          borderRadius: FOCUS_LANDSCAPE.menuBtnRadius,
          backgroundColor: FOCUS_LANDSCAPE.pink,
          fontSize: "clamp(12px, 2.2vw, 16px)",
          fontWeight: 700,
        }}
      >
        <FocusModeIntroIcon className="h-6 w-6" />
        <span className="text-center leading-tight">{firstThenDemoFocusModeCta(lang)}</span>
      </button>

      <Link
        href="/menu"
        className={menuBtnClass}
        style={menuBtnStyle}
      >
        <FocusFabPlusIcon open={false} className="h-6 w-6" />
      </Link>

      <Link href="/player/brushing-teeth" className={menuBtnClass} style={menuBtnStyle}>
        <RoutinesHomeIcon className="h-6 w-6" />
        <span>{playerKindRoutine(lang)}</span>
      </Link>

      <Link href="/dashboard" className={menuBtnClass} style={menuBtnStyle}>
        <HomeSectionIcon className="h-6 w-6" />
        <span>{bottomNavLabel("home", lang)}</span>
      </Link>
    </aside>
  );
}

function FirstThenFocusLandscapeLayout({
  firstCard,
  secondCard,
  lang,
  onExitFocus,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  onExitFocus: () => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const padL = 24;
      const padR = FOCUS_LANDSCAPE.sidebarEdge;
      const padT = 8;
      const padB = 8;
      const W = outer.clientWidth - padL - padR;
      const H = outer.clientHeight - padT - padB;
      if (W <= 0 || H <= 0) return;

      const sx = W / FOCUS_LANDSCAPE_SCENE_W;
      const sy = H / FOCUS_LANDSCAPE_SCENE_H;
      const next = Math.min(sx, sy, 1);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.5);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const scaledW = FOCUS_LANDSCAPE_SCENE_W * scale;
  const scaledH = FOCUS_LANDSCAPE_SCENE_H * scale;

  return (
    <div
      ref={outerRef}
      className="flex h-full min-h-0 w-full items-center justify-center"
      style={{
        paddingLeft: "max(24px, env(safe-area-inset-left))",
        paddingRight: "max(24px, env(safe-area-inset-right))",
        paddingTop: "max(8px, env(safe-area-inset-top))",
        paddingBottom: "max(8px, env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="relative shrink-0"
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          className="absolute left-0 top-0 flex origin-top-left items-center"
          style={{
            width: FOCUS_LANDSCAPE_SCENE_W,
            height: FOCUS_LANDSCAPE_SCENE_H,
            gap: FOCUS_LANDSCAPE.cardsToSidebarGap,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="flex items-center"
            style={{ gap: FOCUS_LANDSCAPE.cardGap }}
          >
            <FirstThenFocusSpecCard slot="first" card={firstCard} lang={lang} />
            <FirstThenFocusSpecCard slot="then" card={secondCard} lang={lang} />
          </div>
          <FirstThenFocusSidebar lang={lang} onExitFocus={onExitFocus} />
        </div>
      </div>
    </div>
  );
}

/** Narrow column: icon stacked above slot label (FIRST / THEN). */
function SlotLabelColumn({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-0.5 text-center">
      <div className="grayscale">{icon}</div>
      <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.1em] text-ink">
        {label}
      </span>
    </div>
  );
}

function FirstThenPortraitCardCell({ card }: { card: GeneratedPixtoCardProps }) {
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
      className="flex h-full min-h-0 w-full items-center justify-center"
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

function IntroPortraitFooterBar({
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
      className="shrink-0 px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2"
      role="navigation"
      aria-label={firstThenDemoNavAria(lang)}
    >
      {introFooterMoreOpen ? (
        <nav
          id="intro-demo-more-nav"
          aria-label={firstThenDemoIntroMoreNavAria(lang)}
          className="mb-2 flex flex-wrap items-center justify-center gap-2"
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
      <div className="flex items-center justify-center gap-2">
        <Link href="/menu" className={introFooterActionClass}>
          {bottomNavLabel("menu", lang)}
        </Link>
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
    </div>
  );
}

function FirstThenIntroPortraitScreen({
  firstCard,
  secondCard,
  lang,
  introFooterMoreOpen,
  setIntroFooterMoreOpen,
  onFocusMode,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  introFooterMoreOpen: boolean;
  setIntroFooterMoreOpen: Dispatch<SetStateAction<boolean>>;
  onFocusMode: () => void;
}) {
  return (
    <div className="grid h-[100dvh] w-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden overscroll-none bg-canvas px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-[max(0.35rem,env(safe-area-inset-top))]">
      <header className="flex shrink-0 flex-col items-center gap-1.5 pb-2 pt-0.5 text-center">
        <PixtoLearnIconMark className="h-10 w-10 rounded-[0.95rem]" />
        <h1 className="text-[1.12rem] font-semibold tracking-tight text-ink">
          {firstThenDemoPageTitle(lang)}
        </h1>
      </header>

      <div className="grid min-h-0 grid-cols-[minmax(3.25rem,4.25rem)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-x-2 gap-y-2">
        <div className="flex min-h-0 items-center">
          <SlotLabelColumn
            label={firstThenSlotLabel("first", lang)}
            icon={<IconFirst className="h-7 w-7" />}
          />
        </div>
        <div className="min-h-0">
          <FirstThenPortraitCardCell card={firstCard} />
        </div>

        <div className="flex min-h-0 items-center">
          <SlotLabelColumn
            label={firstThenSlotLabel("then", lang)}
            icon={<IconThen className="h-7 w-7" />}
          />
        </div>
        <div className="min-h-0">
          <FirstThenPortraitCardCell card={secondCard} />
        </div>
      </div>

      <IntroPortraitFooterBar
        lang={lang}
        introFooterMoreOpen={introFooterMoreOpen}
        setIntroFooterMoreOpen={setIntroFooterMoreOpen}
        onFocusMode={onFocusMode}
      />
    </div>
  );
}

function FocusRotatePrompt({ lang }: { lang: ReturnType<typeof useCardUiLanguage> }) {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 px-8 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-14 w-14 text-sage"
        aria-hidden
      >
        <rect
          x="5"
          y="2"
          width="14"
          height="20"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M16 6h2.5a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5H16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 8v8M9 11l3-3 3 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="space-y-1">
        <p className="text-[1.05rem] font-semibold text-ink">
          {firstThenDemoRotateForFocusTitle(lang)}
        </p>
        <p className="text-[0.88rem] text-ink/70">{firstThenDemoRotateForFocusBody(lang)}</p>
      </div>
    </div>
  );
}

export default function FirstThenDemoPage() {
  return (
    <Suspense fallback={null}>
      <FirstThenDemoPageClient />
    </Suspense>
  );
}

function FirstThenDemoPageClient() {
  const lang = useCardUiLanguage();
  const searchParams = useSearchParams();
  const packId = parseFirstThenDemoPackId(searchParams.get("pack"));
  const { first, second } = useMemo(
    () => resolveFirstThenDemoPack(packId, lang),
    [packId, lang],
  );
  const isMobileLandscape = useMobileLandscape();
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [introFooterMoreOpen, setIntroFooterMoreOpen] = useState(false);

  useEffect(() => {
    if (showFocusMode) {
      setIntroFooterMoreOpen(false);
    }
  }, [showFocusMode]);

  useEffect(() => {
    setShowFocusMode(false);
    setIntroFooterMoreOpen(false);
  }, [packId]);

  useEffect(() => {
    if (!showFocusMode) return;

    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (orientation: string) => Promise<void>;
    };
    if (typeof orientation?.lock !== "function") return;

    void orientation.lock("landscape").catch(() => {
      /* iOS / some browsers block lock outside installed PWA */
    });

    return () => {
      orientation.unlock();
    };
  }, [showFocusMode]);

  if (!showFocusMode) {
    return (
      <FirstThenIntroPortraitScreen
        firstCard={first}
        secondCard={second}
        lang={lang}
        introFooterMoreOpen={introFooterMoreOpen}
        setIntroFooterMoreOpen={setIntroFooterMoreOpen}
        onFocusMode={() => {
          setIntroFooterMoreOpen(false);
          setShowFocusMode(true);
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden overscroll-none bg-canvas touch-manipulation text-ink">
      {isMobileLandscape ? (
        <FirstThenFocusLandscapeLayout
          firstCard={first}
          secondCard={second}
          lang={lang}
          onExitFocus={() => setShowFocusMode(false)}
        />
      ) : (
        <div className="flex h-full min-h-0 flex-col px-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
          <FocusRotatePrompt lang={lang} />
          <div className="shrink-0 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-4">
            <button
              type="button"
              onClick={() => setShowFocusMode(false)}
              className={cn(introFooterActionClass, "mx-auto")}
            >
              {firstThenDemoFocusModeCta(lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
