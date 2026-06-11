"use client";

import Image from "next/image";
import { useMemo } from "react";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
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
  GENERATED_PIXTO_WOW_COMPANY_MARK,
  GENERATED_PIXTO_WOW_TITLE_ZONE_H,
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H,
  GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import { GeneratedPixtoFocusSlotScale } from "@/components/experimental/GeneratedPixtoFocusSlotScale";
import {
  DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS,
  GENERATED_PIXTO_DEMO_ROUTINE_NAME,
  GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { atTheHotelPackMarkUrl } from "@/lib/cards/at-the-hotel-cards";
import { digitalCategoryStripLabel } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import {
  GENERATED_PIXTO_SCHEDULE_NEXT_W,
  GENERATED_PIXTO_SCHEDULE_NOW_W,
} from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";

const HOTEL_LOGO_URL = atTheHotelPackMarkUrl();
const TITLE_TEXT_SIZE_CLASS = "text-[23px]";
const TITLE_LINE_HEIGHT_CLASS = "leading-[0.88]";
const TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;
const FOCUS_TEXT_BOX_SIZE = { w: 340, h: 96 } as const;
const ORIGINAL_CARD_PREVIEW_W = 284 as const;
const NOW_CARD_PREVIEW_W = GENERATED_PIXTO_SCHEDULE_NOW_W;
const NEXT_CARD_PREVIEW_W = GENERATED_PIXTO_SCHEDULE_NEXT_W;
const FOCUS_DEMO_PREVIEW_MAX_W = 390 as const;

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

const DOCUMENTED_TEXT_STYLE: PreviewTextStyle = {
  textSizeClassName: TITLE_TEXT_SIZE_CLASS,
  lineHeightClassName: "leading-[0.94]",
  trackingClassName: "tracking-[-0.02em]",
  lineGapClassName: "gap-[0.18em]",
  wordSpacing: "0",
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
  textBoxSize = TEXT_BOX_SIZE,
}: {
  lines: [string] | [string, string];
  textStyle?: PreviewTextStyle;
  textBoxSize?: { w: number; h: number };
}) {
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center px-1">
      <div
        className={cn(
          "flex min-h-0 max-w-full flex-col items-center justify-center text-center font-semibold lowercase text-ink",
          lines.length > 1 ? textStyle.lineGapClassName : "gap-0",
          textStyle.textSizeClassName,
          textStyle.lineHeightClassName,
          textStyle.trackingClassName,
        )}
        style={{
          width: `min(100%, ${textBoxSize.w}px)`,
          maxHeight: `min(100%, ${textBoxSize.h}px)`,
          wordSpacing: textStyle.wordSpacing,
          ...textStyle.style,
        }}
      >
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block w-full text-center">
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
      className="relative mx-auto grid w-full overflow-hidden rounded-[1.5rem] bg-white"
      style={{
        width: `min(100%, ${widthPx}px)`,
        height: heightPx ? `${heightPx}px` : undefined,
        aspectRatio: heightPx ? undefined : `${GENERATED_PIXTO_CARD_SIZE.w} / ${cardHeight}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${ribbonH}fr`,
        border: `3px solid ${GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR}`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
      }}
    >
      <div className="relative min-h-0 bg-white">
        <div className="flex h-full min-h-0 w-full flex-col">
          <div
            className="min-h-0 shrink-0"
            style={{ flex: `${geometry.topGapH} 1 0` }}
            aria-hidden
          />
          <div
            className="relative flex min-h-0 shrink-0 items-start justify-center"
            style={{ flex: `${geometry.illustrationH} 1 0` }}
          >
            <div
              className="relative h-full min-h-0 w-auto max-w-full rounded-[1rem] bg-black"
              style={{
                aspectRatio: `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${geometry.illustrationH}`,
                maxWidth: `${(GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                illustration
              </div>
            </div>
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

      <div className="relative border-y border-white bg-white px-3 py-1">
        <PreviewTitleBand
          lines={titleLines}
          textStyle={titleTextStyle}
          textBoxSize={
            cardHeight === GENERATED_PIXTO_FOCUS_CARD_SIZE.h
              ? FOCUS_TEXT_BOX_SIZE
              : TEXT_BOX_SIZE
          }
        />
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

function LiveFocusCardPreview() {
  const card =
    DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS.find((c) =>
      c.illustrationUrl.includes("/socks-on"),
    ) ??
    DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS.find((c) =>
      c.illustrationUrl.includes("/walking"),
    ) ??
    DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS[0];
  if (!card) return null;

  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-[1.5rem] border border-ink/[0.08] bg-[#060807]"
      style={{
        width: `min(100%, ${FOCUS_DEMO_PREVIEW_MAX_W}px)`,
        aspectRatio: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.w} / ${GENERATED_PIXTO_FOCUS_CARD_SIZE.h}`,
        maxHeight: "min(85dvh, 720px)",
      }}
    >
      <GeneratedPixtoFocusSlotScale>
        <GeneratedPixtoCard
          illustrationUrl={card.illustrationUrl}
          title={card.title}
          category={card.category}
          categoryColour={card.categoryColour}
          iconUrl={card.iconUrl}
          focusPresentation
          suppressNeutralRing
          showIllustrationFrameGuide
          className="h-full w-full max-w-none"
        />
      </GeneratedPixtoFocusSlotScale>
    </div>
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
      <TranslatedHeader titleKey="generatedCardDemo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink">{GENERATED_PIXTO_DEMO_ROUTINE_NAME}</span>{" "}
          — locked hotel reference cards, documented with the agreed sizes only.
        </p>
      </div>

      <section className="mx-auto mt-8 max-w-6xl space-y-4 px-4">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Card sizes by context
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <DocumentedCardPanel
            title="Reference · physical card (wow)"
            hint="Original Figma shell — source geometry for all proportional downscales."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_GEOMETRY}
            widthPx={ORIGINAL_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_COMPANY_MARK.w}
            titleMetrics="23px reference / one locked line"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Reference · digital card (wow)"
            hint="Expanded white area — locked base for Schedule Now / Next and First & Then."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={ORIGINAL_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / locked text box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Schedule · Now"
            hint="Hero NOW slot (e.g. put toothpaste on toothbrush). Whole card scales down together — illustration uses contain, never cropped."
            titleLines={["breakfast time"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={NOW_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / locked text box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="Schedule · Next"
            hint="NEXT slot (e.g. bus). Slightly smaller than Now; same 744×1054 geometry, uniform scale."
            titleLines={["receive your", "room key"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={NEXT_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / 2 lines in the same box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DocumentedCardPanel
            title="First & Then · vertical"
            hint="Portrait FIRST / THEN stack uses the same width as Schedule · Next (268px cap)."
            titleLines={["receive your", "room key"]}
            geometry={ORIGINAL_2_GEOMETRY}
            widthPx={NEXT_CARD_PREVIEW_W}
            logoSize={GENERATED_PIXTO_WOW_COMPANY_MARK.w}
            titleMetrics="23px reference / 2 lines in the same box"
            ribbonMetrics="23px reference"
            ribbonLabel={hotelRibbonText}
          />

          <DiagnosticPanel
            title="Focus mode"
            hint="Ikram · put socks on — green ring = illustration slot (531×663). Socks and shoes stay visible in Ikram PECS art."
          >
            <LiveFocusCardPreview />
            <MetricList
              metrics={[
                {
                  label: "Design card",
                  value: `${GENERATED_PIXTO_FOCUS_CARD_SIZE.w} x ${GENERATED_PIXTO_FOCUS_CARD_SIZE.h}`,
                },
                {
                  label: "Top block",
                  value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H}`,
                },
                {
                  label: "Illustration area",
                  value: `${GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.w} x ${GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h}`,
                },
                {
                  label: "White area",
                  value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${GENERATED_PIXTO_FOCUS_TITLE_ZONE_H}`,
                },
                {
                  label: "Ribbon",
                  value: `${GENERATED_PIXTO_CARD_SIZE.w} x ${GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H}`,
                },
                {
                  label: "Runtime scale",
                  value: "min(viewport width, viewport height) — entire card visible",
                },
                {
                  label: "Title / ribbon scale",
                  value: "Same locked 60px base as Schedule · Next (white band taller, type unchanged)",
                },
                {
                  label: "White area layout",
                  value: "1 line → row 2; 2 lines → centred block; 3 lines → one row each",
                },
              ]}
            />
          </DiagnosticPanel>
        </div>
      </section>
    </div>
  );
}
