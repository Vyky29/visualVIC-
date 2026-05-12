"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Header } from "@/components/navigation/Header";
import {
  GENERATED_PIXTO_CARD_SIZE,
  GENERATED_PIXTO_CATEGORY_BAND_H,
  GENERATED_PIXTO_COMPANY_MARK,
  GENERATED_PIXTO_ILLUSTRATION_FRAME,
  GENERATED_PIXTO_TITLE_ZONE_H,
  GENERATED_PIXTO_TOP_LAYOUT_H,
  GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION,
} from "@/components/experimental/GeneratedPixtoCard";
import {
  GENERATED_PIXTO_DEMO_ROUTINE_NAME,
  GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { atTheHotelPackMarkUrl } from "@/lib/cards/at-the-hotel-cards";
import { cn } from "@/lib/utils/cn";

const HOTEL_RIBBON_TEXT = "at the hotel";
const HOTEL_LIGHT_BLOCK_COLOUR = "#E8C9CE";
const HOTEL_LOGO_URL = atTheHotelPackMarkUrl();
const TITLE_TEXT_SIZE_CLASS = "text-[23px]";
const TITLE_LINE_HEIGHT_CLASS = "leading-[0.88]";
const TEXT_BOX_SIZE = { w: 252, h: 56.55 } as const;

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

const LOCKED_PREVIEW_TEXT_STYLE: PreviewTextStyle = {
  textSizeClassName: TITLE_TEXT_SIZE_CLASS,
  lineHeightClassName: TITLE_LINE_HEIGHT_CLASS,
  trackingClassName: "tracking-tight",
  lineGapClassName: "gap-[0.16em]",
  wordSpacing: "0",
};

const BEST_UI_TEXT_STYLE_A: PreviewTextStyle = {
  textSizeClassName: "text-[24px]",
  lineHeightClassName: "leading-[0.96]",
  trackingClassName: "tracking-[-0.03em]",
  lineGapClassName: "gap-[0.12em]",
  wordSpacing: "0.01em",
};

const BEST_UI_TEXT_STYLE_B: PreviewTextStyle = {
  textSizeClassName: "text-[22px]",
  lineHeightClassName: "leading-[0.98]",
  trackingClassName: "tracking-[-0.015em]",
  lineGapClassName: "gap-[0.18em]",
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
          width: `${(TEXT_BOX_SIZE.w / GENERATED_PIXTO_CARD_SIZE.w) * 100}%`,
          height: `${(TEXT_BOX_SIZE.h / titleH) * 100}%`,
          wordSpacing: textStyle.wordSpacing,
        }}
      >
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block w-full">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

function OriginalCardMeasurements({
  geometry,
}: {
  geometry: CardGeometry;
}) {
  return (
    <article
      className="relative mx-auto grid w-full max-w-[min(100%,17.75rem)] overflow-hidden rounded-[1.35rem] ring-2 ring-ink/[0.1]"
      style={{
        aspectRatio: `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}`,
        gridTemplateRows: `${geometry.topLayoutH}fr ${geometry.titleH}fr ${GENERATED_PIXTO_CATEGORY_BAND_H}fr`,
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
          ribbon {GENERATED_PIXTO_CARD_SIZE.w} x {GENERATED_PIXTO_CATEGORY_BAND_H}
        </MeasurementPill>
      </div>
    </article>
  );
}

function PreviewCard({
  lines,
  logoSize,
  geometry,
  ribbonColour = GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
  ribbonText = HOTEL_RIBBON_TEXT,
  lightBlockColour = HOTEL_LIGHT_BLOCK_COLOUR,
  logoTintColour,
  textStyle = LOCKED_PREVIEW_TEXT_STYLE,
}: {
  lines: [string] | [string, string];
  logoSize: number;
  geometry: CardGeometry;
  ribbonColour?: string;
  ribbonText?: string;
  lightBlockColour?: string;
  logoTintColour?: string;
  textStyle?: PreviewTextStyle;
}) {
  return (
    <article
      className="relative mx-auto grid w-full max-w-[min(100%,17.75rem)] overflow-hidden rounded-[1.35rem] bg-white"
      style={{
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

export function GeneratedCardDemoClient() {
  return (
    <div className="pb-10">
      <Header title="Generated card demo" backHref="/menu" />

      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink">{GENERATED_PIXTO_DEMO_ROUTINE_NAME}</span>{" "}
          — original card 1, original card 2, two locked text cards, and two UI
          proposal cards for comparison.
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
            />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="AI proposal · teal"
            hint="My preferred UI pass: slightly bigger type, softer tracking, and calmer line spacing."
          >
            <PreviewCard
              lines={["receive your", "room key"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              ribbonColour="#2E7A6B"
              lightBlockColour="#DDEEE8"
              logoTintColour="#2E7A6B"
              textStyle={BEST_UI_TEXT_STYLE_A}
            />
          </DiagnosticPanel>

          <DiagnosticPanel
            title="AI proposal · blue"
            hint="A more neutral accessibility-first option with relaxed spacing and slightly smaller type."
          >
            <PreviewCard
              lines={["receive your", "room key"]}
              logoSize={85}
              geometry={EXPANDED_GEOMETRY}
              ribbonColour="#2C4D8F"
              lightBlockColour="#DEE7F8"
              logoTintColour="#2C4D8F"
              textStyle={BEST_UI_TEXT_STYLE_B}
            />
          </DiagnosticPanel>
        </div>
      </section>
    </div>
  );
}
