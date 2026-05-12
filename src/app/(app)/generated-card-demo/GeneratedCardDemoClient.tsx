"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Header } from "@/components/navigation/Header";
import { SchedulePlayer } from "@/components/schedule/SchedulePlayer";
import {
  GeneratedPixtoCard,
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_COMPANY_MARK,
  GENERATED_PIXTO_FOCUS_CARD_SIZE,
  GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H,
  GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_FOCUS_TITLE_ZONE_H,
  GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_TITLE_ZONE_H,
  GENERATED_PIXTO_TOP_LAYOUT_H,
  GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  GENERATED_PIXTO_DEMO_ROUTINE_NAME,
  HOTEL_GENERATED_CARD_PROPS,
  GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import {
  atTheHotelBackCardUrl,
  atTheHotelPackMarkUrl,
} from "@/lib/cards/at-the-hotel-cards";
import type { Routine } from "@/lib/types/routine";
import { cn } from "@/lib/utils/cn";

const HOTEL_RIBBON_TEXT = "at the hotel";
const HOTEL_LIGHT_BLOCK_COLOUR = "#E8C9CE";
const HOTEL_LOGO_URL = atTheHotelPackMarkUrl();
const HOTEL_BACKCARD_URL = atTheHotelBackCardUrl();
const TITLE_TEXT_SIZE_CLASS = "text-[23px]";
const TITLE_LINE_HEIGHT_CLASS = "leading-[0.88]";
const TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const ORIGINAL_CARD_PREVIEW_W = 284 as const;
const NOW_CARD_PREVIEW_W = 296 as const;
const NEXT_CARD_PREVIEW_W = 276 as const;
const FOCUS_DEMO_VISIBLE_W = 357.5 as const;
const FOCUS_DEMO_VISIBLE_H = 619.4 as const;
const FOCUS_CARD_PREVIEW_W = FOCUS_DEMO_VISIBLE_W;
const FOCUS_GEOMETRY_PREVIEW_W = FOCUS_DEMO_VISIBLE_W;

type PreviewTextStyle = {
  textSizeClassName: string;
  lineHeightClassName: string;
  trackingClassName: string;
  lineGapClassName: string;
  wordSpacing: string;
};

type CardGeometry = {
  titleH: number;
  illustrationH: number;
  topLayoutH: number;
  topGapH: number;
};

const ORIGINAL_GEOMETRY: CardGeometry = {
  titleH: GENERATED_PIXTO_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_TOP_LAYOUT_H,
  topGapH: GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
};

const EXPANDED_GEOMETRY: CardGeometry = {
  titleH: 177,
  illustrationH: GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_CARD_SIZE.h - 177 - GENERATED_PIXTO_CATEGORY_BAND_H,
  topGapH:
    GENERATED_PIXTO_CARD_SIZE.h -
    177 -
    GENERATED_PIXTO_CATEGORY_BAND_H -
    GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
};

const FOCUS_GEOMETRY: CardGeometry = {
  titleH: GENERATED_PIXTO_FOCUS_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H,
  topGapH:
    GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H - GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h,
};

const FOCUS_MODE_SAMPLE_CARD =
  HOTEL_GENERATED_CARD_PROPS[3] ?? HOTEL_GENERATED_CARD_PROPS[0];
const DEMO_SCHEDULE_FLOW_CARDS = HOTEL_GENERATED_CARD_PROPS.slice(0, 4);

const LOCKED_PREVIEW_TEXT_STYLE: PreviewTextStyle = {
  textSizeClassName: TITLE_TEXT_SIZE_CLASS,
  lineHeightClassName: "leading-[0.94]",
  trackingClassName: "tracking-[-0.02em]",
  lineGapClassName: "gap-[0.18em]",
  wordSpacing: "0",
};

const BEST_UI_TEXT_STYLE_A: PreviewTextStyle = {
  textSizeClassName: "text-[24px]",
  lineHeightClassName: "leading-[0.95]",
  trackingClassName: "tracking-[-0.025em]",
  lineGapClassName: "gap-[0.16em]",
  wordSpacing: "0.01em",
};

const BEST_UI_TEXT_STYLE_B: PreviewTextStyle = {
  textSizeClassName: "text-[22px]",
  lineHeightClassName: "leading-[0.98]",
  trackingClassName: "tracking-[-0.01em]",
  lineGapClassName: "gap-[0.2em]",
  wordSpacing: "0.015em",
};

function DiagnosticPanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[1.5rem] border border-ink/[0.08] bg-white p-4 shadow-soft">
      <div className="space-y-1">
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          {title}
        </h3>
        <p className="text-[12px] leading-relaxed text-ink-subtle">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function MeasurementPill({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-white/88 px-2 py-1 text-[10px] font-semibold tracking-tight text-ink shadow-[0_1px_4px_rgba(0,0,0,0.08)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SampleLogo({
  size,
  tintColour,
}: {
  size: number;
  tintColour?: string;
}) {
  return (
    <div
      className="absolute right-[5.4%] top-[3.8%] rounded-[0.9rem] bg-white"
      style={{
        width: `${(size / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
        aspectRatio: "1 / 1",
      }}
    >
      <div className="relative h-full w-full">
        {tintColour ? (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative h-[68%] w-[68%] rounded-[0.75rem]"
              style={{ border: `2px solid ${tintColour}` }}
            >
              <div
                className="absolute left-[18%] top-[18%] h-[22%] w-[22%] rounded-full"
                style={{ backgroundColor: tintColour }}
              />
              <div
                className="absolute right-[18%] top-[18%] h-[22%] w-[22%] rounded-full"
                style={{ backgroundColor: tintColour }}
              />
              <div
                className="absolute bottom-[18%] left-1/2 h-[22%] w-[22%] -translate-x-1/2 rounded-full"
                style={{ backgroundColor: tintColour }}
              />
            </div>
          </div>
        ) : (
          <Image
            src={HOTEL_LOGO_URL}
            alt=""
            fill
            className="object-contain"
            sizes={`${size}px`}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}

function PreviewTitleBand({
  lines,
  titleH,
  textStyle = LOCKED_PREVIEW_TEXT_STYLE,
}: {
  lines: [string] | [string, string];
  titleH: number;
  textStyle?: PreviewTextStyle;
}) {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center">
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center text-center font-semibold lowercase text-ink",
          lines.length > 1 ? textStyle.lineGapClassName : "gap-0",
          textStyle.textSizeClassName,
          textStyle.lineHeightClassName,
          textStyle.trackingClassName,
        )}
        style={{
          width: `min(100%, ${TEXT_BOX_SIZE.w}px)`,
          height: `min(100%, ${TEXT_BOX_SIZE.h}px)`,
          wordSpacing: textStyle.wordSpacing,
        }}
      >
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block w-full whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function OriginalCardMeasurements({
  geometry,
  cardHeight = GENERATED_PIXTO_CARD_SIZE.h,
  ribbonH = GENERATED_PIXTO_CATEGORY_BAND_H,
}: {
  geometry: CardGeometry;
  cardHeight?: number;
  ribbonH?: number;
}) {
  return (
    <article
      className="relative mx-auto grid w-full max-w-[min(100%,17.75rem)] overflow-hidden rounded-[1.35rem] ring-2 ring-ink/[0.1]"
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${cardHeight}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${ribbonH}fr`,
      }}
    >
      <div className="relative bg-[#d9eefc]">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[1rem] border border-dashed border-ink/15 bg-[#f9e39c]"
          style={{
            top: `${(geometry.topGapH / geometry.topLayoutH) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${geometry.illustrationH}`,
          }}
        />
        <div
          className="absolute right-[6%] top-[4%] rounded-[0.8rem] border border-dashed border-ink/15 bg-[#ffb0c1]"
          style={{
            width: `${(GENERATED_PIXTO_COMPANY_MARK.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: "1 / 1",
          }}
        />
        <MeasurementPill className="absolute left-3 top-3">
          card {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_CARD_SIZE.h}
        </MeasurementPill>
        <MeasurementPill className="absolute left-3 top-12">
          top block {GENERATED_PIXTO_CARD_SIZE.w} x {geometry.topLayoutH}
        </MeasurementPill>
        <MeasurementPill className="absolute left-3 top-[23%]">
          top gap {geometry.topGapH} h
        </MeasurementPill>
        <MeasurementPill className="absolute left-1/2 top-[42%] -translate-x-1/2">
          illustration {GENERATED_PIXTO_ILLUSTRATION_FRAME.w} x {geometry.illustrationH}
        </MeasurementPill>
        <MeasurementPill className="absolute right-3 top-3">
          logo {GENERATED_PIXTO_COMPANY_MARK.w} x {GENERATED_PIXTO_COMPANY_MARK.h}
        </MeasurementPill>
      </div>
      <div className="relative flex items-center justify-center border-y border-ink/[0.06] bg-[#fff5c7]">
        <MeasurementPill>
          white area {GENERATED_PIXTO_CARD_SIZE.w} x {geometry.titleH}
        </MeasurementPill>
      </div>
      <div className="relative flex items-center justify-center bg-[#d9c7ff]">
        <MeasurementPill>
          ribbon {GENERATED_PIXTO_CARD_SIZE.w} x {ribbonH}
        </MeasurementPill>
      </div>
    </article>
  );
}

function PreviewCard({
  lines,
  logoSize,
  geometry,
  widthPx = ORIGINAL_CARD_PREVIEW_W,
  ribbonColour = GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
  ribbonText = HOTEL_RIBBON_TEXT,
  lightBlockColour = HOTEL_LIGHT_BLOCK_COLOUR,
  logoTintColour,
  textStyle = LOCKED_PREVIEW_TEXT_STYLE,
}: {
  lines: [string] | [string, string];
  logoSize: number;
  geometry: CardGeometry;
  widthPx?: number;
  ribbonColour?: string;
  ribbonText?: string;
  lightBlockColour?: string;
  logoTintColour?: string;
  textStyle?: PreviewTextStyle;
}) {
  return (
    <article
      className="relative mx-auto grid overflow-hidden rounded-[1.35rem] bg-white"
      style={{
        width: `min(100%, ${widthPx}px)`,
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
        border: `3px solid ${ribbonColour}`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.45)`,
      }}
    >
      <div className="relative bg-white">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[1rem]"
          style={{
            top: `${(geometry.topGapH / geometry.topLayoutH) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${geometry.illustrationH}`,
            backgroundColor: lightBlockColour,
          }}
        />
        <SampleLogo size={logoSize} tintColour={logoTintColour} />
      </div>

      <div className="border-y border-white bg-white px-4 py-1">
        <PreviewTitleBand lines={lines} titleH={geometry.titleH} textStyle={textStyle} />
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: ribbonColour }}
      >
        <span
          className={cn(
            "text-center font-semibold lowercase tracking-tight text-white/95",
            TITLE_TEXT_SIZE_CLASS,
            TITLE_LINE_HEIGHT_CLASS,
          )}
        >
          {ribbonText}
        </span>
      </div>
    </article>
  );
}

function PreviewCardBack({
  geometry,
  widthPx,
  cardHeight = GENERATED_PIXTO_CARD_SIZE.h,
  ribbonColour = GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
  ribbonH = GENERATED_PIXTO_CATEGORY_BAND_H,
}: {
  geometry: CardGeometry;
  widthPx: number;
  cardHeight?: number;
  ribbonColour?: string;
  ribbonH?: number;
}) {
  return (
    <article
      className="relative mx-auto grid overflow-hidden rounded-[1.35rem] bg-white"
      style={{
        width: `min(100%, ${widthPx}px)`,
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${cardHeight}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${ribbonH}fr`,
        border: `3px solid ${ribbonColour}`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.45)`,
      }}
    >
      <div className="relative bg-white">
        <Image
          src={HOTEL_BACKCARD_URL}
          alt=""
          fill
          className="object-cover"
          sizes={`${widthPx}px`}
          unoptimized
        />
      </div>
      <div className="border-y border-white bg-white px-4 py-1" />
      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: ribbonColour }}
      >
        <span className="text-center text-[23px] font-semibold lowercase tracking-tight text-white/95">
          {HOTEL_RIBBON_TEXT}
        </span>
      </div>
    </article>
  );
}

function FocusModeRealCard({
  widthPx,
  heightPx = FOCUS_DEMO_VISIBLE_H,
}: {
  widthPx: number;
  heightPx?: number;
}) {
  const scaleX = widthPx / GENERATED_PIXTO_FOCUS_CARD_SIZE.w;
  const scaleY = heightPx / GENERATED_PIXTO_FOCUS_CARD_SIZE.h;

  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{
        width: `min(100%, ${widthPx}px)`,
        height: `${heightPx}px`,
      }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
      >
        <div
          className="origin-top-center"
          style={{
            width: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.w}px`,
            height: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.h}px`,
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top center",
          }}
        >
          <GeneratedPixtoCard
            illustrationUrl={FOCUS_MODE_SAMPLE_CARD.illustrationUrl}
            title={FOCUS_MODE_SAMPLE_CARD.title}
            category={FOCUS_MODE_SAMPLE_CARD.category}
            categoryColour={FOCUS_MODE_SAMPLE_CARD.categoryColour}
            iconUrl={FOCUS_MODE_SAMPLE_CARD.iconUrl}
            cardType={FOCUS_MODE_SAMPLE_CARD.cardType}
            focusIllustrationScale={FOCUS_MODE_SAMPLE_CARD.focusIllustrationScale}
            focusPresentation
            className="h-full w-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function FocusModeRealCardBack({
  widthPx,
  heightPx = FOCUS_DEMO_VISIBLE_H,
}: {
  widthPx: number;
  heightPx?: number;
}) {
  const scaleX = widthPx / GENERATED_PIXTO_FOCUS_CARD_SIZE.w;
  const scaleY = heightPx / GENERATED_PIXTO_FOCUS_CARD_SIZE.h;

  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{
        width: `min(100%, ${widthPx}px)`,
        height: `${heightPx}px`,
      }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
      >
        <div
          className="origin-top-center"
          style={{
            width: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.w}px`,
            height: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.h}px`,
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top center",
          }}
        >
          <PreviewCardBack
            geometry={FOCUS_GEOMETRY}
            widthPx={GENERATED_PIXTO_CARD_SIZE.w}
            cardHeight={GENERATED_PIXTO_FOCUS_CARD_SIZE.h}
            ribbonH={GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H}
          />
        </div>
      </div>
    </div>
  );
}

function FocusFlipPreview() {
  const [flipped, setFlipped] = useState(false);
  const widthPx = FOCUS_CARD_PREVIEW_W;
  const lastTapRef = useRef(0);

  const handleDoubleTapFlip = () => {
    const now = Date.now();
    if (now - lastTapRef.current <= 320) {
      setFlipped((prev) => !prev);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  };

  const flipCard = (
    <button
      type="button"
      onClick={handleDoubleTapFlip}
      className="w-full bg-transparent text-left"
      aria-label="Flip focus card preview"
    >
      <div
        className="mx-auto [perspective:1200px]"
        style={{ width: `min(100%, ${widthPx}px)` }}
      >
        <div
          className={cn(
            "relative transition-transform duration-500 [transform-style:preserve-3d]",
            flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
          )}
        >
          <div className="[backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            <FocusModeRealCard widthPx={widthPx} />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <FocusModeRealCardBack widthPx={widthPx} />
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-3">
      <div
        className="mx-auto flex w-full items-center justify-center rounded-[1.75rem] bg-[#060807] py-5"
        style={{ maxWidth: `${FOCUS_DEMO_VISIBLE_W}px` }}
      >
        {flipCard}
      </div>
      <p className="text-center text-[11px] text-ink-faint">Double tap the card to flip</p>
    </div>
  );
}

function NowFlipPreview() {
  const [flipped, setFlipped] = useState(false);
  const lastTapRef = useRef(0);

  const handleDoubleTapFlip = () => {
    const now = Date.now();
    if (now - lastTapRef.current <= 320) {
      setFlipped((prev) => !prev);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleDoubleTapFlip}
        className="mx-auto block w-full bg-transparent text-left"
        aria-label="Flip now card preview"
      >
        <div
          className="mx-auto [perspective:1200px]"
          style={{ width: `min(100%, ${NOW_CARD_PREVIEW_W}px)` }}
        >
          <div
            className={cn(
              "relative transition-transform duration-500 [transform-style:preserve-3d]",
              flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            <div className="[backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
              <PreviewCard
                lines={["breakfast time"]}
                logoSize={85}
                geometry={EXPANDED_GEOMETRY}
                widthPx={NOW_CARD_PREVIEW_W}
              />
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
              <PreviewCardBack
                geometry={EXPANDED_GEOMETRY}
                widthPx={NOW_CARD_PREVIEW_W}
              />
            </div>
          </div>
        </div>
      </button>
      <p className="text-center text-[11px] text-ink-faint">Double tap the card to flip</p>
    </div>
  );
}

function FocusModeGeometryPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-3">
        <FocusModeRealCard widthPx={FOCUS_GEOMETRY_PREVIEW_W} />
        <p className="text-center text-[11px] text-ink-faint">
          Real focus shell in the demo at 357.5 px wide, shortened a little and
          centred.
        </p>
      </div>

      <div className="space-y-3">
        <OriginalCardMeasurements
          geometry={FOCUS_GEOMETRY}
          cardHeight={GENERATED_PIXTO_FOCUS_CARD_SIZE.h}
          ribbonH={GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H}
        />
        <div className="rounded-[1.25rem] border border-ink/[0.08] bg-canvas p-4 text-[12px] leading-relaxed text-ink-subtle">
          <p>
            Demo visible width{" "}
            <span className="font-semibold text-ink">
              {FOCUS_DEMO_VISIBLE_W} px
            </span>
          </p>
          <p>
            Demo visible height{" "}
            <span className="font-semibold text-ink">
              {FOCUS_DEMO_VISIBLE_H} px
            </span>
          </p>
          <p>
            Card{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_FOCUS_CARD_SIZE.h}
            </span>
          </p>
          <p>
            Top block{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_CARD_SIZE.w} x {FOCUS_GEOMETRY.topLayoutH}
            </span>
          </p>
          <p>
            Top gap <span className="font-semibold text-ink">{FOCUS_GEOMETRY.topGapH} h</span>
          </p>
          <p>
            Illustration{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_ILLUSTRATION_FRAME.w} x {FOCUS_GEOMETRY.illustrationH}
            </span>
          </p>
          <p>
            White area{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_CARD_SIZE.w} x {FOCUS_GEOMETRY.titleH}
            </span>
          </p>
          <p>
            Ribbon{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H}
            </span>
          </p>
          <p>
            Logo{" "}
            <span className="font-semibold text-ink">
              {GENERATED_PIXTO_COMPANY_MARK.w} x {GENERATED_PIXTO_COMPANY_MARK.h}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function GeneratedCardDemoClient() {
  const scheduleFlowRoutine = useMemo<Routine>(() => {
    const suffix =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : String(Date.now());

    return {
      id: `generated-card-demo-schedule-${suffix}`,
      name: "Hotel generated cards",
      steps: routineStepsFromGeneratedCardProps(
        `generated-card-demo-schedule-${suffix}`,
        DEMO_SCHEDULE_FLOW_CARDS,
      ),
    };
  }, []);

  return (
    <div className="pb-10">
      <Header title="Generated card demo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink">{GENERATED_PIXTO_DEMO_ROUTINE_NAME}</span>{" "}
          — original card 1, original card 2, two locked text cards, and a flow
          preview for now, next, focus, plus a measured focus shell and exact
          schedule flow.
        </p>
      </div>

      <section className="mx-auto mt-8 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Card geometry study
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <DiagnosticPanel
            title="Original card 1"
            hint="Original Figma geometry with the block sizes marked."
          >
            <OriginalCardMeasurements geometry={ORIGINAL_GEOMETRY} />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Original card 2"
            hint="Expanded white area to 177 while keeping the illustration block at its original size."
          >
            <OriginalCardMeasurements geometry={EXPANDED_GEOMETRY} />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Hotel look · 1 line"
            hint="Locked to original card 2, with a fixed text box of 252 x 56.55."
          >
            <PreviewCard
              lines={["breakfast time"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              widthPx={ORIGINAL_CARD_PREVIEW_W}
            />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Hotel look · 2 lines"
            hint="Same locked geometry, same word spacing as the one-line card, and more air between lines."
          >
            <PreviewCard
              lines={["receive your", "room key"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              widthPx={ORIGINAL_CARD_PREVIEW_W}
            />
          </DiagnosticPanel>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Flow preview
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <DiagnosticPanel
            title="Original size"
            hint="Reference card at the digital wow base size."
          >
            <PreviewCard
              lines={["breakfast time"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              widthPx={ORIGINAL_CARD_PREVIEW_W}
            />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Now"
            hint="Slightly bigger than Next for the active step, with tap-to-flip kept on."
          >
            <NowFlipPreview />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Next"
            hint="A little smaller than Now while keeping the same locked geometry."
          >
            <PreviewCard
              lines={["receive your", "room key"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              widthPx={NEXT_CARD_PREVIEW_W}
            />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="Focus mode"
            hint="Expanded card preview with tap-to-flip behavior."
          >
            <FocusFlipPreview />
          </DiagnosticPanel>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Exact schedule flow
        </h2>
        <DiagnosticPanel
          title="Schedule player · now, next, focus"
          hint="Real schedule-player behavior inside the demo. Use Focus Mode on the current card, then swipe in focus to move to the next one."
        >
          <SchedulePlayer
            routine={scheduleFlowRoutine}
            backHref="/generated-card-demo"
            getFocusHref={({ nowIndex }) =>
              `/generated-card-demo/focus-flow?start=${nowIndex}`
            }
          />
        </DiagnosticPanel>
      </section>

      <section className="mx-auto mt-12 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Focus mode geometry
        </h2>
        <DiagnosticPanel
          title="Focus mode · measured card"
          hint="Real focus card on the left, updated focus measurements on the right."
        >
          <FocusModeGeometryPreview />
        </DiagnosticPanel>
      </section>
    </div>
  );
}
