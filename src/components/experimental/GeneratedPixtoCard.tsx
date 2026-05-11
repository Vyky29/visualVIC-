"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Experimental HTML/CSS card shell for AI illustration-only assets.
 * Does not replace designer full-bleed PNG cards used elsewhere.
 */

/** Digital card frame (design px) — PixtoLearn spec. */
export const GENERATED_PIXTO_CARD_SIZE = { w: 744, h: 1054 } as const;

/** Illustration canvas (“yellow block”), px — centred horizontally. */
export const GENERATED_PIXTO_ILLUSTRATION_FRAME = { w: 531, h: 648 } as const;

/** White title band height (design px). */
export const GENERATED_PIXTO_TITLE_ZONE_H = 166 as const;

/** Bottom category strip height (design px). */
export const GENERATED_PIXTO_CATEGORY_BAND_H = 94 as const;

/** Top layout block (illustration shell): 1054 − 166 − 94. */
export const GENERATED_PIXTO_TOP_LAYOUT_H =
  GENERATED_PIXTO_CARD_SIZE.h -
  GENERATED_PIXTO_TITLE_ZONE_H -
  GENERATED_PIXTO_CATEGORY_BAND_H; // 794

/** Vertical space above yellow inside the top block: 794 − 648. */
export const GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION =
  GENERATED_PIXTO_TOP_LAYOUT_H - GENERATED_PIXTO_ILLUSTRATION_FRAME.h; // 146

/** Company mark — design px (corner glyph, scales with card width). */
export const GENERATED_PIXTO_COMPANY_MARK = { w: 88, h: 88 } as const;

/** If `iconUrl` (e.g. pack `pixtolearn-mark.png`) 404s, show full-colour brand mark. */
const PACK_MARK_FALLBACK_SRC = "/brand/pixtolearn-logo.png";
const SHOW_GENERATED_PIXTO_DEBUG_GUIDES = true;

function parseHexRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const rs = lin(r);
  const gs = lin(g);
  const bs = lin(b);
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Light ribbon fills need dark ink; dark fills need light type (WCAG-ish luminance split). */
function categoryBandPrefersDarkInk(categoryColour: string): boolean {
  const rgb = parseHexRgb(categoryColour);
  if (!rgb) return false;
  return relativeLuminance(rgb.r, rgb.g, rgb.b) > 0.55;
}

const ILLUSTRATION_FRAME_ASPECT =
  `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}` as const;

const ILLUSTRATION_WIDTH_FRAC =
  GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w;

const ROW_FR_TOP = GENERATED_PIXTO_TOP_LAYOUT_H;
const ROW_FR_TITLE = GENERATED_PIXTO_TITLE_ZONE_H;
const ROW_FR_CATEGORY = GENERATED_PIXTO_CATEGORY_BAND_H;

const FR_TOP_SPACER = GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION;
const FR_ILLUSTRATION = GENERATED_PIXTO_ILLUSTRATION_FRAME.h;

export type GeneratedPixtoCardProps = {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  /** Company / brand mark — top-right of yellow block (wireframe brown square). */
  iconUrl?: string;
  cardType?: string;
  /** e.g. Focus preview: `h-full w-full max-w-none` on design 744×1054 slot */
  className?: string;
  /** Larger title / ribbon type when the shell is scaled down (Focus mode). */
  focusPresentation?: boolean;
  /** Hide neutral ink ring — parent supplies category ring (Schedule Player). */
  suppressNeutralRing?: boolean;
};

const CARD_ASPECT = `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}` as const;

const SCHEDULE_TITLE_MAX_WORDS_PER_LINE = 3;
const SCHEDULE_TITLE_MAX_LINES = 3;
const SCHEDULE_TITLE_TARGET_VISUAL_WIDTH = 15.2;

function estimateScheduleWordVisualWidth(word: string): number {
  let width = 0;
  for (const ch of word.toLowerCase()) {
    if ("iltjfr".includes(ch)) {
      width += 0.55;
    } else if ("mw".includes(ch)) {
      width += 1.35;
    } else if (" .,:'".includes(ch)) {
      width += 0.28;
    } else {
      width += 1;
    }
  }
  return width;
}

function estimateScheduleLineVisualWidth(words: string[]): number {
  if (words.length === 0) return 0;
  return words.reduce((sum, word) => sum + estimateScheduleWordVisualWidth(word), 0) +
    Math.max(0, words.length - 1) * 0.42;
}

function buildScheduleLineLayouts(
  words: string[],
  index = 0,
  current: string[][] = [],
): string[][][] {
  if (index >= words.length) {
    return current.length > 0 ? [current.map((line) => [...line])] : [];
  }
  if (current.length >= SCHEDULE_TITLE_MAX_LINES) {
    return [];
  }

  const layouts: string[][][] = [];
  const maxTake = Math.min(SCHEDULE_TITLE_MAX_WORDS_PER_LINE, words.length - index);
  for (let take = 1; take <= maxTake; take += 1) {
    current.push(words.slice(index, index + take));
    layouts.push(...buildScheduleLineLayouts(words, index + take, current));
    current.pop();
  }
  return layouts;
}

/**
 * Schedule title lines at the large type size: at most three words per line;
 * prefer the tightest readable 1/2/3-line layout based on visual width.
 */
function splitTitleScheduleLines(raw: string): string[] {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return raw.trim() ? [raw.trim()] : [];

  const candidateLayouts = buildScheduleLineLayouts(words);
  if (candidateLayouts.length === 0) {
    return [words.join(" ")];
  }

  let bestLayout = candidateLayouts[0];
  let bestScore = Number.POSITIVE_INFINITY;

  for (const layout of candidateLayouts) {
    const widths = layout.map((line) => estimateScheduleLineVisualWidth(line));
    const maxWidth = Math.max(...widths);
    const minWidth = Math.min(...widths);
    const overflowPenalty = widths.reduce(
      (sum, width) =>
        sum + Math.max(0, width - SCHEDULE_TITLE_TARGET_VISUAL_WIDTH),
      0,
    );
    const singleWordPenalty = layout.reduce(
      (sum, line) => sum + (layout.length > 1 && line.length === 1 ? 1 : 0),
      0,
    );
    const balancePenalty = maxWidth - minWidth;
    const lineCountPenalty = (layout.length - 1) * 0.18;
    const score =
      overflowPenalty * 100 +
      singleWordPenalty * 8 +
      balancePenalty +
      lineCountPenalty;

    if (score < bestScore) {
      bestScore = score;
      bestLayout = layout;
    }
  }

  return bestLayout.map((line) => line.join(" "));
}

const titleTypographyBase =
  "w-full text-center font-semibold lowercase tracking-tight text-ink hyphens-none break-words";

const titleTypography = (
  isDense: boolean,
  focusPresentation: boolean,
  scheduleLargeType: boolean,
) =>
  cn(
    titleTypographyBase,
    isDense
      ? "text-[19px] sm:text-[21px] leading-snug"
      : focusPresentation
        ? "text-[36px] sm:text-[42px] leading-snug"
        : scheduleLargeType
          ? "text-[72px] sm:text-[84px] leading-[1.05]"
          : "text-[36px] sm:text-[42px] leading-snug",
  );

/**
 * NOW/NEXT title band — same point size for 1, 2 or 3 logical lines (schedule large).
 * Leading ≥ ~1.12 keeps ascenders/descenders from touching when lines sit in adjacent grid rows.
 */
const scheduleTitleBandTypography = cn(
  titleTypographyBase,
  "text-[72px] sm:text-[84px] leading-[1.14]",
);

const focusTitleBandTypography = cn(
  titleTypographyBase,
  "text-[40px] sm:text-[46px] leading-[1.08]",
);

function GeneratedPixtoDebugGuides({
  gridTemplateRows,
  illustrationWidthPct,
}: {
  gridTemplateRows: string;
  illustrationWidthPct: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-[1.35rem]">
      <div className="absolute inset-0 rounded-[1.35rem] border border-[rgba(255,0,0,0.55)]" />

      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateRows }}
      >
        <div className="relative border-b border-[rgba(0,140,255,0.55)] bg-[rgba(0,140,255,0.05)]">
          <div className="absolute inset-x-0 top-0 h-[18.388%] border-b border-dashed border-[rgba(0,140,255,0.42)]" />
          <div
            className="absolute left-1/2 top-[18.388%] -translate-x-1/2 border border-[rgba(0,180,120,0.72)] bg-[rgba(0,180,120,0.06)]"
            style={{
              width: `min(${illustrationWidthPct}, 100%)`,
              aspectRatio: ILLUSTRATION_FRAME_ASPECT,
            }}
          />
          <span className="absolute left-2 top-1 rounded bg-[rgba(0,140,255,0.75)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
            top + illustration
          </span>
          <span className="absolute left-2 top-[20%] rounded bg-[rgba(0,180,120,0.82)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
            illustration block
          </span>
        </div>

        <div className="relative border-b border-[rgba(255,140,0,0.55)] bg-[rgba(255,140,0,0.06)]">
          <span className="absolute left-2 top-1 rounded bg-[rgba(255,140,0,0.85)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
            white area
          </span>
        </div>

        <div className="relative bg-[rgba(160,0,255,0.08)]">
          <span className="absolute left-2 top-1 rounded bg-[rgba(160,0,255,0.82)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
            ribete
          </span>
        </div>
      </div>
    </div>
  );
}

function TitleBand({
  title,
  isDense,
  focusPresentation,
  scheduleLargeType,
}: {
  title: string;
  isDense: boolean;
  focusPresentation: boolean;
  scheduleLargeType: boolean;
}) {
  const typo = titleTypography(
    isDense,
    focusPresentation,
    scheduleLargeType,
  );

  const scheduleLines = useMemo(
    () => splitTitleScheduleLines(title),
    [title],
  );

  if (isDense || (!focusPresentation && !scheduleLargeType)) {
    return (
      <div
        className={cn(
          "relative flex min-h-0 shrink-0 flex-col items-center justify-center overflow-hidden border-t border-ink/[0.06] bg-white px-4",
          isDense ? "py-1" : "py-2",
        )}
      >
        <h2 lang="en" className={cn("relative z-10 line-clamp-5", typo)}>
          {title}
        </h2>
      </div>
    );
  }

  const safeLines =
    scheduleLines.length > 0 ? scheduleLines : title ? [title] : [""];
  const n = Math.max(1, Math.min(safeLines.length, 3)) as 1 | 2 | 3;
  const row0 = n >= 3 ? safeLines[0] : "";
  const row1Two = n === 2 ? safeLines[0] : n >= 3 ? safeLines[1] : "";
  const row2Two = n === 2 ? safeLines[1] : "";
  const row2Three =
    n >= 3 ? safeLines.slice(2).join(" ") : "";
  const bandTypo = focusPresentation
    ? focusTitleBandTypography
    : scheduleTitleBandTypography;
  const bandLineLeading = focusPresentation ? "leading-[1.08]" : "leading-[1.14]";

  return (
    <div className="relative flex min-h-0 h-full shrink-0 flex-col overflow-hidden border-t border-ink/[0.06] bg-white px-4 py-0.5">
      {/*
        3 equal grid rows (design thirds). Row 1 often empty for 1–2 logical lines.
        · 2 lines: ONE cell row-span-2 + flex-col justify-end — lines stay touching (no empty “middle third” between two grid rows).
        · 1 line: same row-span-2 + justify-end + padding-bottom: 1lh — sits where the first line of a pair would be (above a phantom second line).
        · 3 lines: one string per grid row 1 / 2 / 3.
      */}
      <div className="relative z-10 grid h-full min-h-0 w-full grid-rows-3">
        {n === 1 ? (
          <>
            <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
            <div
              className={cn(
                "col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-end gap-0 overflow-hidden px-0.5 text-center pb-[1lh]",
                bandTypo,
              )}
            >
              <span className={cn("block w-full max-w-full", bandLineLeading)}>
                {safeLines[0]}
              </span>
            </div>
          </>
        ) : n === 2 ? (
          <>
            <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
            <div
              className={cn(
                "col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-end gap-0 overflow-hidden px-0.5 pb-[0.14em] text-center",
                bandTypo,
              )}
            >
              <span className={cn("block w-full max-w-full", bandLineLeading)}>
                {row1Two}
              </span>
              <span className={cn("block w-full max-w-full", bandLineLeading)}>
                {row2Two}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 row-start-1 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-0.5 text-center">
              <span className={cn(bandTypo, bandLineLeading)}>{row0}</span>
            </div>
            <div className="col-start-1 row-start-2 flex min-h-0 items-center justify-center overflow-hidden px-0.5 text-center">
              <span className={cn(bandTypo, bandLineLeading)}>{row1Two}</span>
            </div>
            <div className="col-start-1 row-start-3 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-[0.14em] text-center">
              <span className={cn(bandTypo, bandLineLeading)}>{row2Three}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function GeneratedPixtoCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  cardType,
  className,
  focusPresentation = false,
  suppressNeutralRing = false,
}: GeneratedPixtoCardProps) {
  const isDense = cardType === "dense";

  const [markSrc, setMarkSrc] = useState(iconUrl ?? "");
  useEffect(() => {
    setMarkSrc(iconUrl ?? "");
  }, [iconUrl]);

  const onMarkError = useCallback(() => {
    setMarkSrc((prev) =>
      prev && prev !== PACK_MARK_FALLBACK_SRC ? PACK_MARK_FALLBACK_SRC : prev,
    );
  }, []);

  // Card geometry should come from the real design block sizes. Each screen
  // (Schedule / Focus / Home previews) should scale that geometry, not resize
  // the illustration block ad hoc per context.
  const illustrationWidthPct = `${(ILLUSTRATION_WIDTH_FRAC * 100).toFixed(3)}%`;
  const markSize = `calc(100% * ${GENERATED_PIXTO_COMPANY_MARK.w} / ${GENERATED_PIXTO_CARD_SIZE.w})`;
  const ribbonDarkText = categoryBandPrefersDarkInk(categoryColour);
  const illustrationObjectClass = focusPresentation
    ? "object-cover object-center"
    : "object-contain object-center";

  /** Schedule NOW/NEXT (not Focus, not dense tile) — larger type, but same base geometry. */
  const scheduleLargeType = !focusPresentation && !isDense;
  const gridTemplateRows = `${ROW_FR_TOP}fr ${ROW_FR_TITLE}fr ${ROW_FR_CATEGORY}fr`;

  return (
    <article
      data-generated-pixto-card
      data-card-type={cardType ?? "default"}
      className={cn(
        "relative grid w-full max-w-[min(100%,17.75rem)] min-h-0 overflow-hidden rounded-[1.35rem]",
        "bg-white touch-manipulation",
        suppressNeutralRing ? "shadow-none ring-0" : "shadow-card ring-1 ring-ink/[0.08]",
        className,
      )}
      style={{
        aspectRatio: CARD_ASPECT,
        gridTemplateRows,
      }}
    >
      {SHOW_GENERATED_PIXTO_DEBUG_GUIDES ? (
        <GeneratedPixtoDebugGuides
          gridTemplateRows={gridTemplateRows}
          illustrationWidthPct={illustrationWidthPct}
        />
      ) : null}

      {markSrc ? (
        <div
          className="pointer-events-none absolute right-0 top-0 z-30 flex items-center justify-center bg-transparent"
          style={{
            width: markSize,
            height: markSize,
            transform: "translate(-40px, 8px)",
          }}
          aria-hidden
        >
          <Image
            src={markSrc}
            alt=""
            fill
            className="object-contain p-0"
            sizes="88px"
            onError={onMarkError}
            unoptimized={
              markSrc.startsWith("/") ||
              markSrc.includes("/cards/") ||
              /\.jpe?g$/i.test(markSrc) ||
              /\.png$/i.test(markSrc)
            }
          />
        </div>
      ) : null}

      {/* Top block 794px @ design — white field + 531×648 illustration frame */}
      <div className="relative min-h-0 bg-white">
        <div className="flex h-full min-h-0 w-full flex-col">
          <div
            className="min-h-0 shrink-0"
            style={{ flex: `${FR_TOP_SPACER} 1 0` }}
            aria-hidden
          />
          <div
            className="relative flex w-full min-h-0 shrink-0 items-start justify-center"
            style={{ flex: `${FR_ILLUSTRATION} 1 0` }}
          >
            <div className="flex h-full w-full min-h-0 items-center justify-center">
              <div
                className="relative min-h-0"
                style={{
                  width: `min(${illustrationWidthPct}, 100%)`,
                  aspectRatio: ILLUSTRATION_FRAME_ASPECT,
                  maxHeight: "100%",
                }}
              >
                <Image
                  src={illustrationUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 72vw, 240px"
                  className={cn(illustrationObjectClass, "select-none")}
                  unoptimized={
                    illustrationUrl.startsWith("/") ||
                    illustrationUrl.includes("/cards/")
                  }
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TitleBand
        title={title}
        isDense={isDense}
        focusPresentation={focusPresentation}
        scheduleLargeType={scheduleLargeType}
      />

      <div
        className="flex min-h-0 shrink-0 items-center justify-center overflow-hidden px-3"
        style={{
          backgroundColor: categoryColour,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          className={cn(
            "line-clamp-2 text-center font-semibold lowercase leading-snug tracking-[0.08em]",
            focusPresentation
              ? "text-[32px] sm:text-[38px] tracking-[0.06em]"
              : isDense
                ? "text-[14px] sm:text-[16px]"
                : /* Schedule NOW/NEXT — coloured category ribete. */
                  "text-[60px] sm:text-[70px] tracking-[0.04em]",
            ribbonDarkText
              ? "text-ink/90 drop-shadow-none"
              : "text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
          )}
          style={
            ribbonDarkText
              ? undefined
              : { textShadow: "0 1px 2px rgba(0,0,0,0.2)" }
          }
        >
          {category}
        </span>
      </div>
    </article>
  );
}
