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
  type ReactNode,
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
  GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
  GENERATED_PIXTO_FOCUS_FIXED_ZONE,
  FocusRoutineIllustrationImage,
  GeneratedPixtoPackMark,
  type GeneratedPixtoCardProps,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
  GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX,
  GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H,
  generatedPixtoCategoryOutlineStyle,
} from "@/lib/constants/generated-pixto-card-sizes";
import {
  parseFirstThenDemoLayout,
  parseFirstThenDemoOnlyFirstThen,
  parseFirstThenDemoPackId,
  resolveFirstThenDemoPack,
  resolveFirstThenDemoRoutineHref,
  type FirstThenDemoLayoutId,
} from "@/lib/experimental/first-then-demo-packs";
import { setFirstThenDemoFocusActive } from "@/lib/experimental/first-then-demo-focus-nav";
import { readFirstThenSession } from "@/lib/experimental/first-then-session";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import {
  bottomNavLabel,
  firstThenDemoFocusModeCta,
  firstThenDemoIntroMoreToggleHide,
  firstThenDemoIntroMoreToggleShow,
  firstThenDemoNavAria,
  firstThenDemoPageTitle,
  firstThenDemoRotateForFocusBody,
  firstThenDemoRotateForFocusTitle,
  firstThenSlotLabel,
  playerKindRoutine,
  shellBackAria,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { useFirstThenLandscapeFocus } from "@/lib/hooks/useFirstThenLandscapeFocus";
import { TABLET_CONTENT_COLUMN_CLASS, TABLET_TOUCH_MEDIA } from "@/lib/constants/app-shell-layout";
import {
  lockScreenLandscape,
  lockScreenPortrait,
  unlockScreenOrientation,
} from "@/lib/utils/orientation-lock";
import { shouldApplyOrientationLock, shouldLockPortraitInAppShell } from "@/lib/utils/device-input";
import { cn } from "@/lib/utils/cn";

const WOW_TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
/** Digital WOW schedule type at 744×1054 — CSS scale on the card keeps text in sync with size. */
const DIGITAL_WOW_TITLE_FONT_PX = 60;
const DIGITAL_WOW_RIBBON_FONT_PX = 50;

/** Focus landscape — wireframe: 384×560 cards + sidebar (category accent from pack). */
const FOCUS_LANDSCAPE = {
  cardW: GENERATED_PIXTO_FOCUS_FIXED_ZONE.w,
  cardH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.h,
  cardGap: 40,
  /** Pink “First” / “Then” row above illustration (wireframe). */
  slotLabelH: 36,
  slotLabelFontPx: 26,
  illustPadTop: 8,
  illustPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadX,
  illustPadBottom: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustPadBottom,
  actionH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionH,
  actionPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionPadX,
  actionMaxLines: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionMaxLines,
  actionTitleFontPx: GENERATED_PIXTO_FOCUS_FIXED_ZONE.actionTitleFontPx,
  footerH: GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerH,
  footerPadX: GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerPadX,
  footerTitleMaxFontPx: GENERATED_PIXTO_FOCUS_FIXED_ZONE.footerTitleMaxFontPx,
  illustBorder: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustBorder,
  illustBorderColor: GENERATED_PIXTO_FOCUS_FIXED_ZONE.illustBorderColor,
  packMarkSize: GENERATED_PIXTO_FOCUS_FIXED_ZONE.packMarkSize,
  packMarkTop: 14,
  packMarkRight: GENERATED_PIXTO_FOCUS_FIXED_ZONE.packMarkRight,
  cardsToSidebarGap: 64,
  sidebarW: 64,
  sidebarEdge: 24,
  sidebarBtnGap: 12,
  focusBtnH: 88,
  menuBtnH: 56,
  menuBtnRadius: 12,
} as const;

const FOCUS_LANDSCAPE_CARDS_SCENE_W =
  FOCUS_LANDSCAPE.cardW * 2 + FOCUS_LANDSCAPE.cardGap;
const FOCUS_LANDSCAPE_SCENE_W =
  FOCUS_LANDSCAPE_CARDS_SCENE_W +
  FOCUS_LANDSCAPE.cardsToSidebarGap +
  FOCUS_LANDSCAPE.sidebarW;
const FOCUS_LANDSCAPE_SCENE_H = FOCUS_LANDSCAPE.cardH;
/** Screen px between landscape cards — fixed so card scale stays unchanged. */
const FOCUS_LANDSCAPE_CARD_GAP_SCREEN_PX = 40;

function IconFirst({
  categoryColour,
  className,
}: {
  categoryColour: string;
  className?: string;
}) {
  return (
    <svg
      className={cn("shrink-0", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" fill={categoryColour} stroke="rgba(28,36,32,0.12)" strokeWidth="1" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        1
      </text>
    </svg>
  );
}

function IconThen({
  categoryColour,
  className,
}: {
  categoryColour: string;
  className?: string;
}) {
  return (
    <svg
      className={cn("shrink-0", className)}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" fill={categoryColour} stroke="rgba(28,36,32,0.12)" strokeWidth="1" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontSize="13"
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
      <rect x="4.5" y="4.5" width="6" height="6" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
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

function MiniDigitalWowCard({
  card,
  slotHeaderLabel,
  readableTitle = false,
}: {
  card: GeneratedPixtoCardProps;
  /** Prueba 3 — FIRST / THEN centered in card header (text only). */
  slotHeaderLabel?: string;
  /** Portrait demo — larger title/category for legibility after scale. */
  readableTitle?: boolean;
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
  const titleLines = splitWowTitle(displayTitle);
  const digitalTitleStyle = {
    fontSize: `${DIGITAL_WOW_TITLE_FONT_PX}px`,
    lineHeight: 0.92,
    letterSpacing: "-0.022em",
  } as const;
  const titleStyle = readableTitle
    ? digitalTitleStyle
    : titleLines.length === 1
      ? { fontSize: "19px", lineHeight: 0.92, letterSpacing: "-0.018em" }
      : { fontSize: "14px", lineHeight: 0.96, letterSpacing: "-0.016em" };
  const categoryFontPx = readableTitle ? `${DIGITAL_WOW_RIBBON_FONT_PX}px` : "11px";

  return (
    <article
      className={cn(
        "relative grid h-full w-full overflow-hidden bg-white",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
      )}
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${GENERATED_PIXTO_WOW_TOP_LAYOUT_H}fr ${GENERATED_PIXTO_WOW_TITLE_ZONE_H}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
        ...generatedPixtoCategoryOutlineStyle(card.categoryColour, {
          cardShadow: false,
        }),
      }}
    >
      <div className="relative flex min-h-0 flex-col bg-white">
        {slotHeaderLabel ? (
          <div className="relative z-10 flex shrink-0 items-center justify-center py-2">
            <span
              className="font-extrabold lowercase"
              style={{
                color: card.categoryColour,
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              {slotHeaderLabel}
            </span>
          </div>
        ) : null}

        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-x-0 mx-auto overflow-hidden"
            style={{
              top: slotHeaderLabel
                ? "2%"
                : `${(GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION / GENERATED_PIXTO_WOW_TOP_LAYOUT_H) * 100}%`,
              width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
              aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}`,
              maxHeight: "72%",
            }}
          >
            <Image
              src={card.illustrationUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="320px"
              unoptimized
            />
          </div>

          {card.iconUrl ? (
            <div
              className="absolute rounded-[0.9rem] bg-white"
              style={{
                right: "5.4%",
                top: slotHeaderLabel ? "14%" : "3.8%",
                width: `${(GENERATED_PIXTO_WOW_COMPANY_MARK.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
                aspectRatio: "1 / 1",
              }}
            >
              <div className="relative h-full w-full">
                <GeneratedPixtoPackMark
                  src={card.iconUrl}
                  categoryColour={card.categoryColour}
                  sizes={`${GENERATED_PIXTO_WOW_COMPANY_MARK.w}px`}
                  onError={() => {}}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative flex min-h-0 shrink-0 flex-col overflow-hidden bg-white",
          readableTitle ? "border-t border-ink/[0.06] px-3 py-0.5" : "px-3 py-1",
        )}
      >
        {readableTitle ? (
          <div className="relative z-10 grid h-full min-h-0 w-full grid-rows-3">
            {titleLines.length === 1 ? (
              <>
                <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
                <div
                  className="col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-end gap-0 overflow-hidden px-0.5 text-center font-semibold lowercase text-ink"
                  style={digitalTitleStyle}
                >
                  <span className="block w-full max-w-full whitespace-nowrap leading-[0.92]">
                    {titleLines[0]}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
                <div
                  className="col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-center gap-0 overflow-hidden px-0.5 text-center font-semibold lowercase text-ink"
                  style={digitalTitleStyle}
                >
                  {titleLines.map((line, index) => (
                    <span
                      key={`${line}-${index}`}
                      className="block w-full max-w-full whitespace-nowrap leading-[0.92]"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
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
        )}
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: card.categoryColour }}
      >
        <span
          className="block w-full overflow-hidden whitespace-nowrap text-center font-semibold lowercase text-white"
          style={{
            fontSize: categoryFontPx,
            lineHeight: 1.1,
            letterSpacing: "-0.012em",
          }}
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
      className="relative shrink-0 overflow-hidden bg-white shadow-card"
      style={{
        width: FOCUS_LANDSCAPE.cardW,
        height: FOCUS_LANDSCAPE.cardH,
        ...GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
        ...generatedPixtoCategoryOutlineStyle(card.categoryColour, {
          cardShadow: false,
        }),
      }}
      aria-label={`${slotLabel} — ${displayTitle}`}
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
          <GeneratedPixtoPackMark
            src={card.iconUrl}
            categoryColour={card.categoryColour}
            sizes={`${FOCUS_LANDSCAPE.packMarkSize}px`}
            onError={() => {}}
          />
        </div>
      ) : null}

      <div className="flex h-full min-h-0 flex-col">
        <div
          className="flex shrink-0 items-center justify-center"
          style={{ height: FOCUS_LANDSCAPE.slotLabelH }}
        >
          <span
            className="font-extrabold lowercase"
            style={{
              color: card.categoryColour,
              fontSize: FOCUS_LANDSCAPE.slotLabelFontPx,
              lineHeight: 1,
            }}
          >
            {slotLabel}
          </span>
        </div>

        <div
          className="relative flex min-h-0 flex-1 items-end justify-center"
          style={{
            paddingTop: FOCUS_LANDSCAPE.illustPadTop,
            paddingRight: FOCUS_LANDSCAPE.illustPadX,
            paddingBottom: FOCUS_LANDSCAPE.illustPadBottom,
            paddingLeft: FOCUS_LANDSCAPE.illustPadX,
          }}
        >
          <div
            className="relative mx-auto flex h-full w-full min-h-[120px] max-h-full min-w-0 items-end justify-center overflow-hidden"
            style={{
              border: `${FOCUS_LANDSCAPE.illustBorder}px solid ${FOCUS_LANDSCAPE.illustBorderColor}`,
              borderRadius: 6,
              maxHeight: `${GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H}px`,
            }}
          >
            <FocusRoutineIllustrationImage
              src={card.illustrationUrl}
              sizes={`${FOCUS_LANDSCAPE.cardW}px`}
              objectClass="!h-full !w-full object-contain object-bottom"
            />
          </div>
        </div>

        <div
          className="flex shrink-0 items-center justify-center bg-white"
          style={{
            height: FOCUS_LANDSCAPE.actionH,
            paddingLeft: FOCUS_LANDSCAPE.actionPadX,
            paddingRight: FOCUS_LANDSCAPE.actionPadX,
          }}
        >
          <p
            className={cn(
              "max-w-full text-center font-extrabold lowercase text-black [overflow-wrap:break-word]",
              FOCUS_LANDSCAPE.actionMaxLines === 3 ? "line-clamp-3" : "line-clamp-2",
            )}
            style={{
              fontSize: FOCUS_LANDSCAPE.actionTitleFontPx,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            {displayTitle}
          </p>
        </div>

        <footer
          className="flex shrink-0 items-center justify-center"
          style={{
            height: FOCUS_LANDSCAPE.footerH,
            backgroundColor: card.categoryColour,
            paddingLeft: FOCUS_LANDSCAPE.footerPadX,
            paddingRight: FOCUS_LANDSCAPE.footerPadX,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="line-clamp-2 max-w-full text-center font-semibold lowercase text-white/95 [overflow-wrap:break-word]"
            style={{
              fontSize: FOCUS_LANDSCAPE.footerTitleMaxFontPx,
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
  categoryAccent,
  routineHref,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  categoryAccent: string;
  routineHref: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const menuBtnClass =
    "flex w-full flex-col items-center justify-center gap-1 text-white transition active:opacity-80";

  const categoryBtnStyle = {
    borderRadius: FOCUS_LANDSCAPE.menuBtnRadius,
    backgroundColor: categoryAccent,
    fontSize: "clamp(11px, 2vw, 14px)",
    fontWeight: 700 as const,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
  };

  return (
    <aside
      className="flex flex-col-reverse items-stretch"
      style={{
        width: FOCUS_LANDSCAPE.sidebarW,
        gap: FOCUS_LANDSCAPE.sidebarBtnGap,
      }}
      role="navigation"
      aria-label={firstThenDemoNavAria(lang)}
    >
      {expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className={menuBtnClass}
          style={{
            ...categoryBtnStyle,
            height: FOCUS_LANDSCAPE.menuBtnH,
          }}
          aria-expanded
          aria-label={firstThenDemoIntroMoreToggleHide(lang)}
        >
          <FocusFabPlusIcon open className="h-7 w-7 text-white" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={menuBtnClass}
          style={{
            ...categoryBtnStyle,
            height: FOCUS_LANDSCAPE.menuBtnH,
          }}
          aria-expanded={false}
          aria-label={firstThenDemoIntroMoreToggleShow(lang)}
        >
          <FocusFabPlusIcon open={false} className="h-7 w-7 text-white" />
        </button>
      )}

      {expanded ? (
        <>
          <Link
            href="/dashboard"
            className={menuBtnClass}
            style={{
              ...categoryBtnStyle,
              height: FOCUS_LANDSCAPE.menuBtnH,
            }}
            onClick={() => setExpanded(false)}
          >
            <HomeSectionIcon className="h-6 w-6 text-white" />
            <span className="text-center leading-tight text-white">
              {bottomNavLabel("home", lang)}
            </span>
          </Link>

          <Link
            href={routineHref}
            className={menuBtnClass}
            style={{
              ...categoryBtnStyle,
              height: FOCUS_LANDSCAPE.menuBtnH,
            }}
            onClick={() => setExpanded(false)}
          >
            <RoutinesHomeIcon className="h-6 w-6 text-white" />
            <span className="text-center leading-tight text-white">
              {playerKindRoutine(lang)}
            </span>
          </Link>
        </>
      ) : null}
    </aside>
  );
}

function FirstThenFocusLandscapeLayout({
  firstCard,
  secondCard,
  lang,
  routineHref,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  routineHref: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const padL = 24;
      const padR = 24;
      const padT = 8;
      const padB = 8;
      const W = outer.clientWidth - padL - padR;
      const H = outer.clientHeight - padT - padB;
      if (W <= 0 || H <= 0) return;

      const centerHubPx =
        FOCUS_LANDSCAPE.sidebarW + FOCUS_LANDSCAPE_CARD_GAP_SCREEN_PX * 2;
      const sx = (W - centerHubPx) / (FOCUS_LANDSCAPE.cardW * 2);
      const sy = H / FOCUS_LANDSCAPE.cardH;
      const next = Math.min(
        sx,
        sy,
        window.matchMedia(TABLET_TOUCH_MEDIA).matches ? 1.2 : 1,
      );
      setScale(Number.isFinite(next) && next > 0 ? next : 0.5);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  const slotW = FOCUS_LANDSCAPE.cardW * scale;
  const slotH = FOCUS_LANDSCAPE.cardH * scale;
  const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX;

  const renderFocusCard = (slot: "first" | "then", card: GeneratedPixtoCardProps) => (
    <div
      key={slot}
      className="relative shrink-0"
      style={{ width: slotW + bleed * 2, height: slotH + bleed * 2, padding: bleed }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: FOCUS_LANDSCAPE.cardW,
          height: FOCUS_LANDSCAPE.cardH,
          transform: `scale(${scale})`,
        }}
      >
        <FirstThenFocusSpecCard slot={slot} card={card} lang={lang} />
      </div>
    </div>
  );

  return (
    <div
      ref={outerRef}
      className="relative flex h-full min-h-0 w-full items-center justify-center"
      style={{
        paddingLeft: "max(24px, env(safe-area-inset-left))",
        paddingRight: "max(24px, env(safe-area-inset-right))",
        paddingTop: "max(8px, env(safe-area-inset-top))",
        paddingBottom: "max(8px, env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="flex shrink-0 items-center"
        style={{ gap: FOCUS_LANDSCAPE_CARD_GAP_SCREEN_PX }}
      >
        {renderFocusCard("first", firstCard)}
        <FirstThenFocusSidebar
          lang={lang}
          categoryAccent={firstCard.categoryColour}
          routineHref={routineHref}
        />
        {renderFocusCard("then", secondCard)}
      </div>
    </div>
  );
}

function SubtleArrowToCard() {
  return (
    <svg
      className="-mx-0.5 h-3 w-3 shrink-0 text-ink/35"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12h11.5M14.5 8.5 18 12l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SLOT_LABEL_COLUMN_W_PX = 52;
const SLOT_LABEL_TO_CARD_GAP_PX = 16;

/** Prueba 1 — numbered slot label in the middle column (not on the card). */
function SlotLabelRow({
  slot,
  label,
  categoryColour,
}: {
  slot: "first" | "then";
  label: string;
  categoryColour: string;
}) {
  const Icon = slot === "first" ? IconFirst : IconThen;
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center gap-1.5 text-center"
      style={{ width: SLOT_LABEL_COLUMN_W_PX }}
    >
      <Icon categoryColour={categoryColour} className="h-9 w-9" />
      <span
        className="text-[0.78rem] font-semibold uppercase leading-tight tracking-[0.08em]"
        style={{ color: categoryColour }}
      >
        {label}
      </span>
    </div>
  );
}

function splitFocusModeCtaLines(cta: string): [string, string] {
  const words = cta.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [cta, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function FirstThenFocusEntryButton({
  lang,
  onFocusMode,
  className,
  variant = "inline",
  size = "default",
  categoryColour,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  onFocusMode: () => void;
  className?: string;
  variant?: "inline" | "stacked";
  size?: "default" | "compact";
  categoryColour?: string;
}) {
  const cta = firstThenDemoFocusModeCta(lang);
  const [line1, line2] = splitFocusModeCtaLines(cta);
  const accentStyle = categoryColour
    ? { backgroundColor: categoryColour, borderColor: categoryColour }
    : undefined;

  if (variant === "stacked") {
    const compact = size === "compact";
    return (
      <button
        type="button"
        onClick={onFocusMode}
        style={accentStyle}
        className={cn(
          "flex w-full flex-col items-center font-semibold uppercase shadow-soft transition active:scale-[0.99]",
          categoryColour
            ? "border text-white"
            : "border border-ink/10 bg-white text-ink",
          compact
            ? "gap-0.5 rounded-[0.7rem] px-1 py-1.5 text-[7px] tracking-[0.05em]"
            : "gap-1 rounded-[0.9rem] px-1.5 py-2 text-[9px] tracking-[0.06em]",
          className,
        )}
      >
        <FocusModeIntroIcon className={cn("shrink-0", compact ? "h-3 w-3" : "h-4 w-4")} />
        <span
          className={cn(
            "flex flex-col items-center text-center",
            compact ? "leading-[1.1]" : "leading-[1.15]",
          )}
        >
          <span>{line1}</span>
          {line2 ? <span>{line2}</span> : null}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onFocusMode}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink shadow-soft transition active:scale-[0.99]",
        className,
      )}
    >
      <FocusModeIntroIcon />
      {cta}
    </button>
  );
}

function FirstThenPortraitCardScaled({
  card,
  scale,
  slotHeaderLabel,
  readableTitle = false,
  sizeTrimPx = 0,
  enterAnimation = false,
  enterDelayMs = 0,
}: {
  card: GeneratedPixtoCardProps;
  scale: number;
  slotHeaderLabel?: string;
  readableTitle?: boolean;
  /** Uniform shrink on rendered card box (e.g. 1px). */
  sizeTrimPx?: number;
  /** Grow from slightly smaller on mount (Prueba 1). */
  enterAnimation?: boolean;
  enterDelayMs?: number;
}) {
  const rawW = GENERATED_PIXTO_CARD_SIZE.w * scale;
  const rawH = GENERATED_PIXTO_CARD_SIZE.h * scale;
  const trimFactor =
    sizeTrimPx > 0 && rawW > 0 && rawH > 0
      ? Math.min((rawW - sizeTrimPx) / rawW, (rawH - sizeTrimPx) / rawH)
      : 1;
  const renderScale = scale * trimFactor;
  const slotW = GENERATED_PIXTO_CARD_SIZE.w * renderScale;
  const slotH = GENERATED_PIXTO_CARD_SIZE.h * renderScale;
  const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX;

  return (
    <div
      className={cn(
        "relative shrink-0",
        enterAnimation && "first-then-portrait-card-enter",
      )}
      style={{
        width: slotW + bleed * 2,
        height: slotH + bleed * 2,
        padding: bleed,
        animationDelay: enterAnimation && enterDelayMs > 0 ? `${enterDelayMs}ms` : undefined,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: GENERATED_PIXTO_CARD_SIZE.w,
          height: GENERATED_PIXTO_CARD_SIZE.h,
          transform: `scale(${renderScale})`,
        }}
      >
        <MiniDigitalWowCard
          card={card}
          slotHeaderLabel={slotHeaderLabel}
          readableTitle={readableTitle}
        />
      </div>
    </div>
  );
}

const FIRST_THEN_FOCUS_ACTION_RESERVE_PX = 52;
/** Prueba 1 — resting card scale (matches initial “photo 1” size, no post-mount growth). */
const PORTRAIT_PRUEBA1_CARD_SCALE_FACTOR = 0.93;

/** Prueba 1 — slot label + card + optional focus, centered as one group. */
function FirstThenPortraitLabeledRow({
  slot,
  label,
  card,
  categoryColour,
  scaleMultiplier = 1,
  readableTitle = false,
  actionReservePx = 0,
  focusBottomAction,
}: {
  slot: "first" | "then";
  label: string;
  card: GeneratedPixtoCardProps;
  categoryColour: string;
  scaleMultiplier?: number;
  readableTitle?: boolean;
  /** Width reserved for focus slot so FIRST/THEN cards match. */
  actionReservePx?: number;
  /** Bottom of the group (THEN row only). */
  focusBottomAction?: ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const stableScaleRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const update = () => {
      const H = row.clientHeight;
      const W = row.clientWidth;
      if (W <= 0 || H <= 0) return;

      const labelReservePx = SLOT_LABEL_COLUMN_W_PX + SLOT_LABEL_TO_CARD_GAP_PX;
      const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX * 2;
      const sx =
        (W - labelReservePx - actionReservePx - bleed) /
        GENERATED_PIXTO_CARD_SIZE.w;
      const sy = (H - bleed) / GENERATED_PIXTO_CARD_SIZE.h;
      const next = Math.min(sx, sy) * scaleMultiplier;
      if (!Number.isFinite(next) || next <= 0) return;

      const prev = stableScaleRef.current;
      if (prev === null) {
        stableScaleRef.current = next;
        setScale(next);
        return;
      }
      // Keep first measured size; only shrink if the viewport gets narrower/shorter.
      if (next < prev) {
        stableScaleRef.current = next;
        setScale(next);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(row);
    return () => ro.disconnect();
  }, [actionReservePx, scaleMultiplier]);

  return (
    <div
      ref={rowRef}
      className="flex min-h-0 flex-1 w-full min-w-0 items-center justify-center"
    >
      <div
        className={cn(
          "flex shrink-0 items-center",
          scale === null && "invisible",
        )}
        style={{ gap: SLOT_LABEL_TO_CARD_GAP_PX }}
      >
        <SlotLabelRow slot={slot} label={label} categoryColour={categoryColour} />
        {scale !== null ? (
          <FirstThenPortraitCardScaled
            card={card}
            scale={scale}
            readableTitle={readableTitle}
          />
        ) : null}
        {actionReservePx > 0 ? (
          <div className="flex w-[2.75rem] shrink-0 flex-col justify-end self-stretch pb-1">
            {focusBottomAction}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FirstThenPortraitCardCell({
  card,
  scaleMultiplier = 1,
  slotHeaderLabel,
  readableTitle = false,
  align = "center",
}: {
  card: GeneratedPixtoCardProps;
  scaleMultiplier?: number;
  slotHeaderLabel?: string;
  readableTitle?: boolean;
  align?: "center" | "end";
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const bleed = GENERATED_PIXTO_CATEGORY_OUTLINE_BLEED_PX;

  useLayoutEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const W = outer.clientWidth;
      const H = outer.clientHeight;
      if (W <= 0 || H <= 0) return;

      const bleedTotal = bleed * 2;
      const sx = (W - bleedTotal) / GENERATED_PIXTO_CARD_SIZE.w;
      const sy = (H - bleedTotal) / GENERATED_PIXTO_CARD_SIZE.h;
      const next = Math.min(sx, sy) * scaleMultiplier;
      setScale(Number.isFinite(next) && next > 0 ? next : 0.28 * scaleMultiplier);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, [bleed, scaleMultiplier]);

  const slotW = GENERATED_PIXTO_CARD_SIZE.w * scale + bleed * 2;
  const slotH = GENERATED_PIXTO_CARD_SIZE.h * scale + bleed * 2;

  return (
    <div
      ref={outerRef}
      className={cn(
        "flex h-full min-h-0 w-full items-center",
        align === "end" ? "justify-end" : "justify-center",
      )}
    >
      <div
        className="relative shrink-0"
        style={{ width: slotW, height: slotH, padding: bleed }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: GENERATED_PIXTO_CARD_SIZE.w,
            height: GENERATED_PIXTO_CARD_SIZE.h,
            transform: `scale(${scale})`,
          }}
        >
          <MiniDigitalWowCard
            card={card}
            slotHeaderLabel={slotHeaderLabel}
            readableTitle={readableTitle}
          />
        </div>
      </div>
    </div>
  );
}

const PORTRAIT_MAIN_MIN_H =
  "min-h-[calc(100dvh-(3.5rem+env(safe-area-inset-bottom)))]" as const;

function FirstThenIntroPortraitShell({
  lang,
  children,
  backHref,
  flushRight = false,
}: {
  lang: ReturnType<typeof useCardUiLanguage>;
  children: ReactNode;
  backHref?: string;
  flushRight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden overscroll-none bg-canvas pt-[max(0.35rem,env(safe-area-inset-top))]",
        "pl-[max(0.5rem,env(safe-area-inset-left))]",
        flushRight ? "pr-0" : "pr-[max(0.5rem,env(safe-area-inset-right))]",
        PORTRAIT_MAIN_MIN_H,
      )}
    >
      <header className="relative flex shrink-0 flex-col items-center gap-1.5 pb-2 pt-0.5 text-center">
        {backHref ? (
          <Link
            href={backHref}
            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl text-[22px] text-ink-subtle transition hover:bg-ink/5 active:bg-ink/10"
            aria-label={shellBackAria(lang)}
          >
            ←
          </Link>
        ) : null}
        <PixtoLearnIconMark className="h-10 w-10 rounded-[0.95rem]" />
        <h1 className="text-[1.12rem] font-semibold tracking-tight text-ink">
          {firstThenDemoPageTitle(lang)}
        </h1>
      </header>
      <main className="relative flex min-h-0 flex-1 flex-col items-stretch justify-center pb-1">
        {children}
      </main>
    </div>
  );
}

/** Prueba 1 — middle slot label + card per row; Focus entry bottom-right. */
function FirstThenIntroLayout1({
  firstCard,
  secondCard,
  lang,
  onFocusMode,
  backHref,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  onFocusMode: () => void;
  backHref?: string;
}) {
  const firstLabel = firstThenSlotLabel("first", lang);
  const thenLabel = firstThenSlotLabel("then", lang);

  return (
    <FirstThenIntroPortraitShell lang={lang} backHref={backHref}>
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-1 px-1 tablet:max-w-none">
        <FirstThenPortraitLabeledRow
          slot="first"
          label={firstLabel}
          card={firstCard}
          categoryColour={firstCard.categoryColour}
          scaleMultiplier={PORTRAIT_PRUEBA1_CARD_SCALE_FACTOR}
          readableTitle
          actionReservePx={FIRST_THEN_FOCUS_ACTION_RESERVE_PX}
        />
        <FirstThenPortraitLabeledRow
          slot="then"
          label={thenLabel}
          card={secondCard}
          categoryColour={secondCard.categoryColour}
          scaleMultiplier={PORTRAIT_PRUEBA1_CARD_SCALE_FACTOR}
          readableTitle
          actionReservePx={FIRST_THEN_FOCUS_ACTION_RESERVE_PX}
          focusBottomAction={
            <FirstThenFocusEntryButton
              lang={lang}
              onFocusMode={onFocusMode}
              variant="stacked"
              size="compact"
              categoryColour={firstCard.categoryColour}
            />
          }
        />
      </div>
    </FirstThenIntroPortraitShell>
  );
}

/** Prueba 2 — two cards stacked vertically, no side labels. */
function FirstThenIntroLayout2({
  firstCard,
  secondCard,
  lang,
  onFocusMode,
  backHref,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  onFocusMode: () => void;
  backHref?: string;
}) {
  return (
    <FirstThenIntroPortraitShell lang={lang} backHref={backHref}>
      <div className={cn("relative w-full px-1", TABLET_CONTENT_COLUMN_CLASS)}>
        <FirstThenFocusEntryButton
          lang={lang}
          onFocusMode={onFocusMode}
          className="absolute right-0 top-0 z-10"
        />
        <div className="flex flex-col items-center gap-4 pt-10">
          <div className="h-[min(34dvh,260px)] w-full min-h-0">
            <FirstThenPortraitCardCell card={firstCard} scaleMultiplier={0.92} />
          </div>
          <div className="h-[min(34dvh,260px)] w-full min-h-0">
            <FirstThenPortraitCardCell card={secondCard} scaleMultiplier={0.92} />
          </div>
        </div>
      </div>
    </FirstThenIntroPortraitShell>
  );
}

/** Prueba 3 — stacked cards; FIRST/THEN text inside each card header. */
function FirstThenIntroLayout3({
  firstCard,
  secondCard,
  lang,
  onFocusMode,
  backHref,
}: {
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  onFocusMode: () => void;
  backHref?: string;
}) {
  const firstLabel = firstThenSlotLabel("first", lang);
  const thenLabel = firstThenSlotLabel("then", lang);

  return (
    <FirstThenIntroPortraitShell lang={lang} backHref={backHref}>
      <div className={cn("relative flex w-full flex-1 flex-col items-center justify-center px-1 pb-12", TABLET_CONTENT_COLUMN_CLASS)}>
        <div className="flex w-full flex-col items-center gap-3">
          <div className="h-[min(32dvh,272px)] w-full min-h-0">
            <FirstThenPortraitCardCell
              card={firstCard}
              scaleMultiplier={0.98}
              slotHeaderLabel={firstLabel}
            />
          </div>
          <div className="h-[min(32dvh,272px)] w-full min-h-0">
            <FirstThenPortraitCardCell
              card={secondCard}
              scaleMultiplier={0.98}
              slotHeaderLabel={thenLabel}
            />
          </div>
        </div>
        <FirstThenFocusEntryButton
          lang={lang}
          onFocusMode={onFocusMode}
          className="absolute bottom-0 right-0 z-10"
        />
      </div>
    </FirstThenIntroPortraitShell>
  );
}

function FirstThenIntroPortraitScreen({
  layout,
  firstCard,
  secondCard,
  lang,
  onFocusMode,
  backHref,
}: {
  layout: FirstThenDemoLayoutId;
  firstCard: GeneratedPixtoCardProps;
  secondCard: GeneratedPixtoCardProps;
  lang: ReturnType<typeof useCardUiLanguage>;
  onFocusMode: () => void;
  backHref?: string;
}) {
  const props = { firstCard, secondCard, lang, onFocusMode, backHref };
  if (layout === "2") return <FirstThenIntroLayout2 {...props} />;
  if (layout === "3") return <FirstThenIntroLayout3 {...props} />;
  return <FirstThenIntroLayout1 {...props} />;
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

export function FirstThenExperience() {
  return (
    <Suspense fallback={null}>
      <FirstThenExperienceClient />
    </Suspense>
  );
}

function FirstThenExperienceClient() {
  const lang = useCardUiLanguage();
  const searchParams = useSearchParams();
  const sessionPayload = useMemo(() => readFirstThenSession(), []);
  const packId = parseFirstThenDemoPackId(
    searchParams.get("pack") ?? (sessionPayload ? null : "ikram-home"),
  );
  const layout = parseFirstThenDemoLayout(searchParams.get("layout"));
  const fromRoutine = searchParams.get("from");
  const onlyFirstThen = parseFirstThenDemoOnlyFirstThen(searchParams.get("onlyFirstThen"));
  const routineHref = useMemo(() => {
    if (sessionPayload) return sessionPayload.routineHref;
    return resolveFirstThenDemoRoutineHref(packId, {
      from: fromRoutine,
      onlyFirstThen,
    });
  }, [sessionPayload, packId, fromRoutine, onlyFirstThen]);
  const { first, second } = useMemo(() => {
    if (sessionPayload) {
      return { first: sessionPayload.first, second: sessionPayload.second };
    }
    return resolveFirstThenDemoPack(packId, lang);
  }, [sessionPayload, packId, lang]);
  const showLandscapeFocus = useFirstThenLandscapeFocus();
  const [showFocusMode, setShowFocusMode] = useState(false);

  const backHref = fromRoutine?.trim() || routineHref;

  useEffect(() => {
    setShowFocusMode(false);
  }, [packId, layout]);

  useEffect(() => {
    setFirstThenDemoFocusActive(showFocusMode);
    return () => setFirstThenDemoFocusActive(false);
  }, [showFocusMode]);

  useEffect(() => {
    if (!shouldApplyOrientationLock()) return;
    if (showFocusMode) {
      void lockScreenLandscape();
      return () => {
        unlockScreenOrientation();
      };
    }
    if (shouldLockPortraitInAppShell()) {
      void lockScreenPortrait();
    }
    return () => {
      unlockScreenOrientation();
    };
  }, [showFocusMode]);

  if (!showFocusMode) {
    return (
      <FirstThenIntroPortraitScreen
        layout={layout}
        firstCard={first}
        secondCard={second}
        lang={lang}
        backHref={backHref}
        onFocusMode={() => setShowFocusMode(true)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden overscroll-none bg-black touch-manipulation text-cream">
      {showLandscapeFocus ? (
        <FirstThenFocusLandscapeLayout
          firstCard={first}
          secondCard={second}
          lang={lang}
          routineHref={routineHref}
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
