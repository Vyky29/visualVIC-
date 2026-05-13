"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Header } from "@/components/navigation/Header";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_COMPANY_MARK,
  GENERATED_PIXTO_FOCUS_CARD_SIZE,
  GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H,
  GENERATED_PIXTO_FOCUS_COMPANY_MARK,
  GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_FOCUS_TITLE_ZONE_H,
  GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_TITLE_ZONE_H,
  GENERATED_PIXTO_TOP_LAYOUT_H,
  GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  GENERATED_PIXTO_DEMO_ROUTINE_NAME,
  GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { atTheHotelPackMarkUrl } from "@/lib/cards/at-the-hotel-cards";
import { digitalCategoryStripLabel } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

const HOTEL_LOGO_URL = atTheHotelPackMarkUrl();
const TITLE_TEXT_SIZE_CLASS = "text-[23px]";
const TITLE_LINE_HEIGHT_CLASS = "leading-[0.88]";
const TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const ORIGINAL_CARD_PREVIEW_W = 284 as const;
const NOW_CARD_PREVIEW_W = 288 as const;
const NEXT_CARD_PREVIEW_W = 268 as const;
const FOCUS_DEMO_VISIBLE_W = 357.5 as const;
const FOCUS_DEMO_VISIBLE_H = 619.4 as const;

type PreviewTextStyle = {
  textSizeClassName: string;
  lineHeightClassName: string;
  trackingClassName: string;
  lineGapClassName: string;
  wordSpacing: string;
  style?: React.CSSProperties;
};

type CardGeometry = {
  titleH: number;
  illustrationH: number;
  topLayoutH: number;
  topGapH: number;
};

type Metric = {
  label: string;
  value: string;
};

type DocumentedCardProps = {
  titleLines: [string] | [string, string];
  geometry: CardGeometry;
  widthPx: number;
  logoSize: number;
  cardHeight?: number;
  heightPx?: number;
  ribbonH?: number;
  titleTextStyle?: PreviewTextStyle;
  ribbonTextStyle?: React.CSSProperties;
  /** Localised category strip (hotel pack). */
  ribbonLabel?: string;
};

const ORIGINAL_GEOMETRY: CardGeometry = {
  titleH: GENERATED_PIXTO_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_TOP_LAYOUT_H,
  topGapH: GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
};

const ORIGINAL_2_GEOMETRY: CardGeometry = {
  titleH: GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  topGapH: GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
};

const FOCUS_GEOMETRY: CardGeometry = {
  titleH: GENERATED_PIXTO_FOCUS_TITLE_ZONE_H,
  illustrationH: GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h,
  topLayoutH: GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H,
  topGapH:
    GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H - GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h,
};

const DOCUMENTED_TEXT_STYLE: PreviewTextStyle = {
  textSizeClassName: TITLE_TEXT_SIZE_CLASS,
  lineHeightClassName: "leading-[0.94]",
  trackingClassName: "tracking-[-0.02em]",
  lineGapClassName: "gap-[0.18em]",
  wordSpacing: "0",
};

const FOCUS_DOCUMENTED_TEXT_STYLE: PreviewTextStyle = {
  textSizeClassName: "text-[42px]",
  lineHeightClassName: "leading-[1.04]",
  trackingClassName: "tracking-[-0.028em]",
  lineGapClassName: "gap-0",
  wordSpacing: "0",
  style: {
    fontSize: "42px",
    lineHeight: 1.04,
    letterSpacing: "-0.028em",
  },
};

const FOCUS_DOCUMENTED_RIBBON_STYLE: React.CSSProperties = {
  fontSize: "32px",
  lineHeight: 1,
  letterSpacing: "-0.014em",
};

function DiagnosticPanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
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
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold tracking-tight text-ink shadow-[0_1px_4px_rgba(0,0,0,0.12)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SampleLogo({ size }: { size: number }) {
  return (
    <div
      className="absolute right-[5.4%] top-[3.8%] rounded-[0.9rem] bg-white"
      style={{
        width: `${(size / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
        aspectRatio: "1 / 1",
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={HOTEL_LOGO_URL}
          alt=""
          fill
          className="object-contain"
          sizes={`${size}px`}
          unoptimized
        />
      </div>
    </div>
  );
}

function PreviewTitleBand({
  lines,
  textStyle = DOCUMENTED_TEXT_STYLE,
}: {
  lines: [string] | [string, string];
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
          ...textStyle.style,
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

function formatVisibleShell(widthPx: number, cardHeight: number, heightPx?: number): string {
  const visibleH =
    heightPx ?? Number(((widthPx * cardHeight) / GENERATED_PIXTO_CARD_SIZE.w).toFixed(1));
  return `${widthPx} x ${visibleH}px`;
}

function MetricList({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="rounded-[1.25rem] border border-ink/[0.08] bg-canvas p-4 text-[12px] leading-relaxed text-ink-subtle">
      {metrics.map((metric) => (
        <p key={metric.label}>
          {metric.label} <span className="font-semibold text-ink">{metric.value}</span>
        </p>
      ))}
    </div>
  );
}

function DocumentedCard({
  titleLines,
  geometry,
  widthPx,
  logoSize,
  cardHeight = GENERATED_PIXTO_CARD_SIZE.h,
  heightPx,
  ribbonH = GENERATED_PIXTO_CATEGORY_BAND_H,
  titleTextStyle = DOCUMENTED_TEXT_STYLE,
  ribbonTextStyle,
  ribbonLabel = "at the hotel",
}: DocumentedCardProps) {
  return (
    <article
      className="relative mx-auto grid w-full overflow-hidden rounded-[1.35rem] bg-white"
      style={{
        width: `min(100%, ${widthPx}px)`,
        height: heightPx ? `${heightPx}px` : undefined,
        aspectRatio: heightPx ? undefined : `${GENERATED_PIXTO_CARD_SIZE.w} / ${cardHeight}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${ribbonH}fr`,
        border: `3px solid ${GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR}`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
      }}
    >
      <div className="relative bg-white">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[1rem] bg-black"
          style={{
            top: `${(geometry.topGapH / geometry.topLayoutH) * 100}%`,
            width: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
            aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${geometry.illustrationH}`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
            illustration
          </div>
        </div>
        <SampleLogo size={logoSize} />
        <MeasurementPill className="absolute left-3 top-3">
          shell {formatVisibleShell(widthPx, cardHeight, heightPx)}
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
          logo {logoSize} x {logoSize}
        </MeasurementPill>
      </div>

      <div className="relative border-y border-white bg-white px-4 py-1">
        <PreviewTitleBand lines={titleLines} textStyle={titleTextStyle} />
      </div>

      <div
        className="flex items-center justify-center px-3"
        style={{ backgroundColor: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR }}
      >
        <span
          className={cn(
            "text-center font-semibold lowercase tracking-tight text-white/95",
            TITLE_TEXT_SIZE_CLASS,
            TITLE_LINE_HEIGHT_CLASS,
          )}
          style={ribbonTextStyle}
        >
          {ribbonLabel}
        </span>
      </div>
    </article>
  );
}

function DocumentedCardPanel({
  title,
  hint,
  titleLines,
  geometry,
  widthPx,
  logoSize,
  titleMetrics,
  ribbonMetrics,
  cardHeight,
  heightPx,
  ribbonH,
  extraMetrics = [],
  titleTextStyle,
  ribbonTextStyle,
  ribbonLabel,
}: {
  title: string;
  hint: string;
  titleLines: [string] | [string, string];
  geometry: CardGeometry;
  widthPx: number;
  logoSize: number;
  titleMetrics: string;
  ribbonMetrics: string;
  cardHeight?: number;
  heightPx?: number;
  ribbonH?: number;
  extraMetrics?: Metric[];
  titleTextStyle?: PreviewTextStyle;
  ribbonTextStyle?: React.CSSProperties;
  ribbonLabel?: string;
}) {
  const resolvedCardHeight = cardHeight ?? GENERATED_PIXTO_CARD_SIZE.h;
  const resolvedRibbonH = ribbonH ?? GENERATED_PIXTO_CATEGORY_BAND_H;
  const metrics: Metric[] = [
    { label: "Visible shell", value: formatVisibleShell(widthPx, resolvedCardHeight, heightPx) },
    { label: "Design card", value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${resolvedCardHeight}` },
    { label: "Top block", value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${geometry.topLayoutH}` },
    { label: "Top gap", value: `${geometry.topGapH}h` },
    {
      label: "Illustration area",
      value: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} x ${geometry.illustrationH}`,
    },
    { label: "White area", value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${geometry.titleH}` },
    { label: "Ribbon", value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${resolvedRibbonH}` },
    { label: "Text box", value: `${TEXT_BOX_SIZE.w} x ${TEXT_BOX_SIZE.h}` },
    { label: "Title text", value: titleMetrics },
    { label: "Ribbon text", value: ribbonMetrics },
    { label: "Logo", value: `${logoSize} x ${logoSize}` },
    ...extraMetrics,
  ];

  return (
    <DiagnosticPanel title={title} hint={hint}>
      <DocumentedCard
        titleLines={titleLines}
        geometry={geometry}
        widthPx={widthPx}
        logoSize={logoSize}
        cardHeight={resolvedCardHeight}
        heightPx={heightPx}
        ribbonH={resolvedRibbonH}
        titleTextStyle={titleTextStyle}
        ribbonTextStyle={ribbonTextStyle}
        ribbonLabel={ribbonLabel}
      />
      <MetricList metrics={metrics} />
    </DiagnosticPanel>
  );
}

export function GeneratedCardDemoClient() {
  const cardUiLang = useCardUiLanguage();
  const hotelRibbonText = useMemo(
    () => digitalCategoryStripLabel("hotel", cardUiLang),
    [cardUiLang],
  );

  return (
    <div className="pb-10">
      <Header title="Generated card demo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink">{GENERATED_PIXTO_DEMO_ROUTINE_NAME}</span>{" "}
          — locked hotel reference cards, documented with the agreed sizes only.
        </p>
      </div>

      <section className="mx-auto mt-8 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Locked card documentation
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <DocumentedCardPanel
            title="fisical card (wow)"
            hint="Original Figma card shell kept here as the first reference."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_GEOMETRY}
            widthPx={ORIGINAL_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_COMPANY_MARK.w}
            titleMetrics="23px reference / one locked line"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="digital card (wow)"
            hint="Expanded white area reference that became the locked base for Now and Next."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={ORIGINAL_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / locked text box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Now"
            hint="Current agreed Now size, reduced proportionally without changing the internal geometry."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={NOW_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / locked text box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Next"
            hint="Current agreed Next size, scaled down like a photo while keeping the same proportions."
            titleLines={["receive your", "room key"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={NEXT_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / 2 lines in the same box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Focus mode"
            hint="Final focus shell documented with the visible screen size and the current text logic."
            titleLines={["arrive at the hotel"]}
            geometry={FOCUS_GEOMETRY}
            widthPx={FOCUS_DEMO_VISIBLE_W}
            heightPx={FOCUS_DEMO_VISIBLE_H}
            cardHeight={GENERATED_PIXTO_FOCUS_CARD_SIZE.h}
            logoSize={GENERATED_PIXTO_FOCUS_COMPANY_MARK.w}
            ribbonH={GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H}
            titleMetrics="42px actual here / auto-fit down only if a longer title needs it"
            ribbonMetrics="32px actual here / always 10px below the white area title"
            titleTextStyle={FOCUS_DOCUMENTED_TEXT_STYLE}
            ribbonTextStyle={FOCUS_DOCUMENTED_RIBBON_STYLE}
            extraMetrics={[
              { label: "Focus text rule", value: "1 line first, then 2, then reduce only if needed" },
            ]}
            ribbonLabel={hotelRibbonText}
          />
        </div>
      </section>
    </div>
  );
}
