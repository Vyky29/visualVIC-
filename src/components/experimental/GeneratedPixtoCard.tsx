"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { resolveDigitalPixtoStrings } from "@/lib/i18n/pixto-digital-locale";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";
import {
  GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
  GENERATED_PIXTO_CARD_CORNER_RADIUS_PX,
  GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
  generatedPixtoCategoryOutlineStyle,
  generatedPixtoCornerRadiusPx,
  GENERATED_PIXTO_FOCUS_DESIGN_H,
  GENERATED_PIXTO_FOCUS_DESIGN_W,
  GENERATED_PIXTO_FOCUS_FIXED_ZONE,
  GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H,
  GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET,
} from "@/lib/constants/generated-pixto-card-sizes";

export {
  GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
  GENERATED_PIXTO_CARD_CORNER_RADIUS_PX,
  GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
  generatedPixtoCategoryOutlineStyle,
  generatedPixtoCornerRadiusPx,
  GENERATED_PIXTO_FOCUS_DESIGN_H,
  GENERATED_PIXTO_FOCUS_DESIGN_W,
  GENERATED_PIXTO_FOCUS_FIXED_ZONE,
};

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

/** Locked Digital WOW white area used in the agreed Now / Next references. */
export const GENERATED_PIXTO_WOW_TITLE_ZONE_H = 177 as const;

/** Bottom category strip height (design px). */
export const GENERATED_PIXTO_CATEGORY_BAND_H = 94 as const;

/**
 * Focus-only geometry rebalance:
 * - ribete reduced to half of the previous 350px focus footer
 * - half of the freed space goes to the white area
 * - the other half goes to the illustration block above it
 */
export const GENERATED_PIXTO_FOCUS_TITLE_ZONE_H = 318 as const;

/** Focus-only category band reduced to half height. */
export const GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H = 175 as const;

/** Top layout block (illustration shell): 1054 − 166 − 94. */
export const GENERATED_PIXTO_TOP_LAYOUT_H =
  GENERATED_PIXTO_CARD_SIZE.h -
  GENERATED_PIXTO_TITLE_ZONE_H -
  GENERATED_PIXTO_CATEGORY_BAND_H; // 794

/** Locked Digital WOW top block after fixing the 177px white area. */
export const GENERATED_PIXTO_WOW_TOP_LAYOUT_H =
  GENERATED_PIXTO_CARD_SIZE.h -
  GENERATED_PIXTO_WOW_TITLE_ZONE_H -
  GENERATED_PIXTO_CATEGORY_BAND_H; // 783

/** Focus-only top block after redistributing half of the old ribete space upward. */
export const GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H = 881 as const;

/** Focus presentation gets a small extra horizontal stretch without changing height. */
export const GENERATED_PIXTO_FOCUS_EXTRA_WIDTH_PX = 10 as const;

/** Focus-only illustration frame: same width, 15px taller upward within the top block. */
export const GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME = {
  w: GENERATED_PIXTO_ILLUSTRATION_FRAME.w,
  h: GENERATED_PIXTO_ILLUSTRATION_FRAME.h + 15,
} as const;

/** Focus card design frame used by GeneratedPixtoFocusSlotScale. */
export const GENERATED_PIXTO_FOCUS_CARD_SIZE = {
  w: GENERATED_PIXTO_FOCUS_FIXED_ZONE.w,
  h: GENERATED_PIXTO_FOCUS_FIXED_ZONE.h,
} as const;

/** Vertical space above yellow inside the top block: 794 − 648. */
export const GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION =
  GENERATED_PIXTO_TOP_LAYOUT_H - GENERATED_PIXTO_ILLUSTRATION_FRAME.h; // 146

/** Vertical space above yellow in the locked Digital WOW layout: 783 − 648. */
export const GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION =
  GENERATED_PIXTO_WOW_TOP_LAYOUT_H - GENERATED_PIXTO_ILLUSTRATION_FRAME.h; // 135

/** Company mark — design px (corner glyph, scales with card width). */
export const GENERATED_PIXTO_COMPANY_MARK = { w: 88, h: 88 } as const;

/** Locked Digital WOW schedule logo size used in the agreed Now / Next references. */
export const GENERATED_PIXTO_WOW_COMPANY_MARK = { w: 85, h: 85 } as const;

/** Focus-only logo size — slightly larger while keeping the same anchor. */
export const GENERATED_PIXTO_FOCUS_COMPANY_MARK = { w: 91, h: 91 } as const;

/** If `iconUrl` (e.g. pack `pixtolearn-mark.png`) 404s, show full-colour brand mark. */
const PACK_MARK_FALLBACK_SRC = "/brand/pixtolearn-logo.png";
const SHOW_GENERATED_PIXTO_DEBUG_GUIDES = false;

/** Full green slot box — off (visible during NOW card flip). */
export const SHOW_ILLUSTRATION_SLOT_DIAGNOSTIC_BORDER = false;

export function IllustrationSlotDiagnosticBorder() {
  if (!SHOW_ILLUSTRATION_SLOT_DIAGNOSTIC_BORDER) return null;
  const { illustBorder, illustBorderColor } = GENERATED_PIXTO_FOCUS_FIXED_ZONE;
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 box-border"
      style={{
        border: `${illustBorder}px solid ${illustBorderColor}`,
      }}
      aria-hidden
      data-illustration-slot-diagnostic
    />
  );
}

/**
 * Diagnostic only: pink top edge of the proposed taller illustration slot
 * (Focus + Schedule) — the band between this line and the green box is extra
 * illustration height we could reclaim from the white margin above.
 */
export const SHOW_ILLUSTRATION_EXPANDED_TOP_DIAGNOSTIC = false;

export function IllustrationExpandedTopDiagnosticLine({
  illustrationWidthPct,
}: {
  illustrationWidthPct: string;
}) {
  if (!SHOW_ILLUSTRATION_EXPANDED_TOP_DIAGNOSTIC) return null;
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 border-t-2 border-[#E05C9A]"
      style={{ width: illustrationWidthPct }}
      aria-hidden
      data-illustration-expanded-top-diagnostic
    />
  );
}

/** Focus routine — locked illustration render box (`GENERATED_PIXTO_FOCUS_*`). */
export function FocusRoutineIllustrationImage({
  src,
  sizes,
  objectClass,
  scale = 1,
}: {
  src: string;
  sizes: string;
  objectClass: string;
  scale?: number;
}) {
  const { topPx, leftPx, rightPx, bottomPx } =
    GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_INSET;
  const widthTrim = leftPx + rightPx;
  const unoptimized =
    src.startsWith("/") || src.includes("/cards/") || /\.png$/i.test(src);
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="relative mx-auto shrink-0"
        style={{
          width: `max(0px, calc(100% - ${widthTrim}px))`,
          height: `${GENERATED_PIXTO_FOCUS_ILLUSTRATION_RENDER_BOX_H}px`,
          ...(scale !== 1
            ? {
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }
            : {}),
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={cn(objectClass, "select-none")}
          unoptimized={unoptimized}
          draggable={false}
        />
      </div>
    </div>
  );
}

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
const FOCUS_ILLUSTRATION_FRAME_ASPECT =
  `${GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h}` as const;

const ILLUSTRATION_WIDTH_FRAC =
  GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w;

const ROW_FR_TOP = GENERATED_PIXTO_TOP_LAYOUT_H;
const ROW_FR_TITLE = GENERATED_PIXTO_TITLE_ZONE_H;
const ROW_FR_CATEGORY = GENERATED_PIXTO_CATEGORY_BAND_H;
const WOW_ROW_FR_TOP = GENERATED_PIXTO_WOW_TOP_LAYOUT_H;
const WOW_ROW_FR_TITLE = GENERATED_PIXTO_WOW_TITLE_ZONE_H;
const WOW_ROW_FR_CATEGORY = GENERATED_PIXTO_CATEGORY_BAND_H;

const FR_TOP_SPACER = GENERATED_PIXTO_TOP_MARGIN_ABOVE_ILLUSTRATION;
const FR_ILLUSTRATION = GENERATED_PIXTO_ILLUSTRATION_FRAME.h;
const WOW_FR_TOP_SPACER = GENERATED_PIXTO_WOW_TOP_MARGIN_ABOVE_ILLUSTRATION;
const WOW_FR_ILLUSTRATION = GENERATED_PIXTO_ILLUSTRATION_FRAME.h;
const FOCUS_ROW_FR_TOP = GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H;
const FOCUS_FR_TOP_SPACER =
  GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H - GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h;
const FOCUS_FR_ILLUSTRATION = GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME.h;

export type GeneratedPixtoCardProps = {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  /** Company / brand mark — top-right of yellow block (wireframe brown square). */
  iconUrl?: string;
  cardType?: string;
  /** Optional Focus-only illustration zoom for one-off visual tests. */
  focusIllustrationScale?: number;
  /** Optional Focus-only asset (531×663); uses `illustrationUrl` when omitted. */
  focusIllustrationUrl?: string;
  /** e.g. Focus preview: `h-full w-full max-w-none` on design 744×1054 slot */
  className?: string;
  /** Larger title / ribbon type when the shell is scaled down (Focus mode). */
  focusPresentation?: boolean;
  /** Locked Digital WOW schedule geometry used for the agreed Now / Next cards. */
  schedulePresentation?: boolean;
  /** Hide neutral ink ring — parent supplies category ring (Schedule Player). */
  suppressNeutralRing?: boolean;
  /** Draw the illustration slot (531×648 / 531×663) so layout can be checked. */
  showIllustrationFrameGuide?: boolean;
};

const CARD_ASPECT = `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}` as const;
const FOCUS_CARD_ASPECT =
  `${GENERATED_PIXTO_FOCUS_CARD_SIZE.w} / ${GENERATED_PIXTO_FOCUS_CARD_SIZE.h}` as const;

const SCHEDULE_TITLE_MAX_WORDS_PER_LINE = 3;
const SCHEDULE_TITLE_MAX_LINES = 3;
const SCHEDULE_TITLE_TARGET_VISUAL_WIDTH = 15.2;
const SCHEDULE_RIBBON_TARGET_VISUAL_WIDTH = 12.2;
const SCHEDULE_LOCKED_TITLE_TARGET_VISUAL_WIDTH = 15.2;
const SCHEDULE_LOCKED_TITLE_BASE_FONT_PX = 60;
/** Focus title/ribbon use the same locked schedule scale (60px base) — larger white band, not larger type. */
const FOCUS_RIBBON_TARGET_VISUAL_WIDTH = SCHEDULE_RIBBON_TARGET_VISUAL_WIDTH;
const FOCUS_TITLE_TARGET_VISUAL_WIDTH = SCHEDULE_LOCKED_TITLE_TARGET_VISUAL_WIDTH;
const FOCUS_TITLE_BASE_FONT_PX = SCHEDULE_LOCKED_TITLE_BASE_FONT_PX;

const SCHEDULE_LOCKED_TITLE_SIZE_CANDIDATES = [
  {
    fontPx: 60,
    className: "text-[60px] leading-[0.92] tracking-[-0.022em]",
  },
  {
    fontPx: 58,
    className: "text-[58px] leading-[0.92] tracking-[-0.022em]",
  },
  {
    fontPx: 56,
    className: "text-[56px] leading-[0.92] tracking-[-0.02em]",
  },
  {
    fontPx: 54,
    className: "text-[54px] leading-[0.92] tracking-[-0.02em]",
  },
  {
    fontPx: 52,
    className: "text-[52px] leading-[0.94] tracking-[-0.018em]",
  },
] as const;

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

function scheduleTitleBandTypography(lineCount: 1 | 2 | 3): string {
  return cn(
    titleTypographyBase,
    lineCount === 1
      ? "text-[72px] sm:text-[84px] leading-[1.14]"
      : lineCount === 2
        ? "text-[48px] sm:text-[56px] leading-[1.1]"
        : "text-[40px] sm:text-[46px] leading-[1.08]",
  );
}

function buildFlexibleLineLayouts(
  words: string[],
  maxLines: number,
  index = 0,
  current: string[][] = [],
): string[][][] {
  if (index >= words.length) {
    return current.length > 0 ? [current.map((line) => [...line])] : [];
  }
  if (current.length >= maxLines) {
    return [];
  }

  const layouts: string[][][] = [];
  const maxTake = words.length - index;
  for (let take = 1; take <= maxTake; take += 1) {
    current.push(words.slice(index, index + take));
    layouts.push(...buildFlexibleLineLayouts(words, maxLines, index + take, current));
    current.pop();
  }
  return layouts;
}

function scoreLockedLayout(layout: string[][], allowedWidth: number): number {
  const widths = layout.map((line) => estimateScheduleLineVisualWidth(line));
  const maxWidth = Math.max(...widths);
  const minWidth = Math.min(...widths);
  const overflowPenalty = widths.reduce(
    (sum, width) => sum + Math.max(0, width - allowedWidth),
    0,
  );
  const singleWordPenalty = layout.reduce(
    (sum, line) => sum + (layout.length > 1 && line.length === 1 ? 1 : 0),
    0,
  );
  const balancePenalty = maxWidth - minWidth;
  const lineCountPenalty = (layout.length - 1) * 0.32;
  return overflowPenalty * 100 + singleWordPenalty * 4 + balancePenalty + lineCountPenalty;
}

type LockedTitleCandidate = {
  fontPx: number;
  className?: string;
  lineHeight?: number;
  letterSpacing?: string;
};

type LockedTitleLayout = {
  lines: string[];
  className: string;
  fontPx: number;
  style?: CSSProperties;
};

function lockedTitlePresentation(candidate: LockedTitleCandidate): Pick<
  LockedTitleLayout,
  "className" | "style"
> {
  if (candidate.className) {
    return { className: cn(titleTypographyBase, candidate.className) };
  }
  return {
    className: titleTypographyBase,
    style: {
      fontSize: `${candidate.fontPx}px`,
      lineHeight: candidate.lineHeight ?? 1.04,
      letterSpacing: candidate.letterSpacing ?? "-0.02em",
    },
  };
}

function resolveLockedTitleLayout(
  raw: string,
  targetWidth: number,
  baseFontPx: number,
  candidates: readonly LockedTitleCandidate[],
  maxLines: number,
): LockedTitleLayout {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    const first = candidates[0];
    return {
      lines: raw.trim() ? [raw.trim()] : [""],
      fontPx: first.fontPx,
      ...lockedTitlePresentation(first),
    };
  }

  const layouts = buildFlexibleLineLayouts(words, maxLines);

  for (const candidate of candidates) {
    const allowedWidth = targetWidth * (baseFontPx / candidate.fontPx);
    let bestFit: string[][] | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const layout of layouts) {
      const widths = layout.map((line) => estimateScheduleLineVisualWidth(line));
      if (Math.max(...widths) > allowedWidth) continue;
      const score = scoreLockedLayout(layout, allowedWidth);
      if (score < bestScore) {
        bestScore = score;
        bestFit = layout;
      }
    }

    if (bestFit) {
      return {
        lines: bestFit.map((line) => line.join(" ")),
        fontPx: candidate.fontPx,
        ...lockedTitlePresentation(candidate),
      };
    }
  }

  const fallback = candidates[candidates.length - 1];
  const fallbackAllowedWidth = targetWidth * (baseFontPx / fallback.fontPx);
  const bestFallback = layouts.reduce((best, layout) =>
    scoreLockedLayout(layout, fallbackAllowedWidth) <
    scoreLockedLayout(best, fallbackAllowedWidth)
      ? layout
      : best,
  );

  return {
    lines: bestFallback.map((line) => line.join(" ")),
    fontPx: fallback.fontPx,
    ...lockedTitlePresentation(fallback),
  };
}

function resolveSingleLineTypographyStyle(
  raw: string,
  targetWidth: number,
  baseFontPx: number,
  minFontPx: number,
): CSSProperties {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return {
      fontSize: `${baseFontPx}px`,
      lineHeight: 1,
      letterSpacing: "-0.01em",
    };
  }

  const fullWidth = estimateScheduleLineVisualWidth(words);
  let chosenFontPx = minFontPx;
  for (let fontPx = baseFontPx; fontPx >= minFontPx; fontPx -= 2) {
    const allowedWidth = targetWidth * (baseFontPx / fontPx);
    if (fullWidth <= allowedWidth) {
      chosenFontPx = fontPx;
      break;
    }
  }

  const letterSpacing =
    chosenFontPx >= 50 ? "-0.01em" : chosenFontPx >= 38 ? "-0.012em" : "-0.014em";

  return {
    fontSize: `${chosenFontPx}px`,
    lineHeight: 1,
    letterSpacing,
  };
}

function splitTitleFocusLines(words: string[], allowedWidth: number): string[] {
  if (words.length <= 1) {
    return [words.join(" ")];
  }

  let bestLines = [words.join(" ")];
  let bestScore = Number.POSITIVE_INFINITY;

  for (let index = 1; index < words.length; index += 1) {
    const lines = [words.slice(0, index), words.slice(index)];
    const widths = lines.map((line) => estimateScheduleLineVisualWidth(line));
    const maxWidth = Math.max(...widths);
    const minWidth = Math.min(...widths);
    const overflowPenalty = widths.reduce(
      (sum, width) => sum + Math.max(0, width - allowedWidth),
      0,
    );
    const singleWordPenalty = lines.reduce(
      (sum, line) => sum + (line.length === 1 ? 1 : 0),
      0,
    );
    const balancePenalty = maxWidth - minWidth;
    const score = overflowPenalty * 100 + singleWordPenalty * 4 + balancePenalty;

    if (score < bestScore) {
      bestScore = score;
      bestLines = lines.map((line) => line.join(" "));
    }
  }

  return bestLines;
}

function resolveFocusTitleLayout(raw: string): LockedTitleLayout {
  return resolveLockedTitleLayout(
    raw,
    FOCUS_TITLE_TARGET_VISUAL_WIDTH,
    FOCUS_TITLE_BASE_FONT_PX,
    SCHEDULE_LOCKED_TITLE_SIZE_CANDIDATES,
    3,
  );
}

function resolveScheduleLockedTitleLayout(raw: string): LockedTitleLayout {
  return resolveLockedTitleLayout(
    raw,
    SCHEDULE_LOCKED_TITLE_TARGET_VISUAL_WIDTH,
    SCHEDULE_LOCKED_TITLE_BASE_FONT_PX,
    SCHEDULE_LOCKED_TITLE_SIZE_CANDIDATES,
    3,
  );
}

function GeneratedPixtoDebugGuides({
  gridTemplateRows,
  illustrationWidthPct,
}: {
  gridTemplateRows: string;
  illustrationWidthPct: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-40 overflow-hidden",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 border border-[rgba(255,0,0,0.55)]",
          GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
        )}
      />

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

function LockedTitleBandGrid({
  lines,
  className,
  style,
  lineLeading = "leading-[0.92]",
}: {
  lines: string[];
  className: string;
  style?: CSSProperties;
  lineLeading?: string;
}) {
  const n = Math.max(1, Math.min(lines.length, 3)) as 1 | 2 | 3;
  const row1 = n === 2 ? lines[0] : n >= 3 ? lines[0] : "";
  const row2 = n === 2 ? lines[1] : n >= 3 ? lines[1] : "";
  const row3 = n >= 3 ? lines.slice(2).join(" ") : "";

  return (
    <div className="relative z-10 grid h-full min-h-0 w-full grid-rows-3">
      {n === 1 ? (
        <>
          <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
          <div
            className={cn(
              "col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-end gap-0 overflow-hidden px-0.5 text-center pb-[1lh]",
              className,
            )}
            style={style}
          >
            <span className={cn("block w-full max-w-full whitespace-nowrap", lineLeading)}>
              {lines[0]}
            </span>
          </div>
        </>
      ) : n === 2 ? (
        <>
          <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
          <div
            className={cn(
              "col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-center gap-0 overflow-hidden px-0.5 text-center",
              className,
            )}
            style={style}
          >
            <span className={cn("block w-full max-w-full whitespace-nowrap", lineLeading)}>
              {row1}
            </span>
            <span className={cn("block w-full max-w-full whitespace-nowrap", lineLeading)}>
              {row2}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="col-start-1 row-start-1 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-0.5 text-center">
            <span
              className={cn("block w-full max-w-full whitespace-nowrap", className, lineLeading)}
              style={style}
            >
              {row1}
            </span>
          </div>
          <div className="col-start-1 row-start-2 flex min-h-0 items-center justify-center overflow-hidden px-0.5 text-center">
            <span
              className={cn("block w-full max-w-full whitespace-nowrap", className, lineLeading)}
              style={style}
            >
              {row2}
            </span>
          </div>
          <div className="col-start-1 row-start-3 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-[0.14em] text-center">
            <span
              className={cn("block w-full max-w-full whitespace-nowrap", className, lineLeading)}
              style={style}
            >
              {row3}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function TitleBand({
  title,
  htmlLang,
  isDense,
  focusPresentation,
  schedulePresentation,
  scheduleLargeType,
}: {
  title: string;
  htmlLang: string;
  isDense: boolean;
  focusPresentation: boolean;
  schedulePresentation: boolean;
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
  const focusTitleLayout = useMemo(
    () => (focusPresentation ? resolveFocusTitleLayout(title) : null),
    [focusPresentation, title],
  );
  const scheduleLockedTitleLayout = useMemo(
    () => (schedulePresentation ? resolveScheduleLockedTitleLayout(title) : null),
    [schedulePresentation, title],
  );

  if (focusPresentation && focusTitleLayout) {
    return (
      <div className="relative flex min-h-0 h-full shrink-0 flex-col overflow-hidden bg-white px-3 py-0.5">
        <LockedTitleBandGrid
          lines={focusTitleLayout.lines}
          className={focusTitleLayout.className}
          style={focusTitleLayout.style}
        />
      </div>
    );
  }

  if (schedulePresentation && scheduleLockedTitleLayout) {
    return (
      <div className="relative flex min-h-0 h-full shrink-0 flex-col overflow-hidden border-t border-ink/[0.06] bg-white px-3 py-0.5">
        <LockedTitleBandGrid
          lines={scheduleLockedTitleLayout.lines}
          className={scheduleLockedTitleLayout.className}
        />
      </div>
    );
  }

  if (isDense || (!focusPresentation && !scheduleLargeType)) {
    return (
      <div
        className={cn(
          "relative flex min-h-0 shrink-0 flex-col items-center justify-center overflow-hidden border-t border-ink/[0.06] bg-white px-4",
          isDense ? "py-1" : "py-2",
        )}
      >
        <h2 lang={htmlLang} className={cn("relative z-10 line-clamp-5", typo)}>
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
  const bandTypo = scheduleTitleBandTypography(n);
  const bandLineLeading = n === 1
    ? "leading-[1.14]"
    : n === 2
      ? "leading-[1.1]"
      : "leading-[1.08]";
  const bandShellPx = "px-4";
  const bandInnerWidth = "max-w-full";

  return (
    <div className={cn(
      "relative flex min-h-0 h-full shrink-0 flex-col overflow-hidden bg-white py-0.5",
      !focusPresentation && "border-t border-ink/[0.06]",
      bandShellPx,
    )}>
      {/*
        3 equal grid rows (design thirds). Row 1 often empty for 1–2 logical lines.
        · 2 lines: ONE cell row-span-2 + flex-col justify-center — lines stay touching without the first line clipping off the top edge.
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
              <span className={cn("block w-full", bandInnerWidth, bandLineLeading)}>
                {safeLines[0]}
              </span>
            </div>
          </>
        ) : n === 2 ? (
          <>
            <div className="col-start-1 row-start-1 min-h-0" aria-hidden />
            <div
              className={cn(
                "col-start-1 row-start-2 row-span-2 flex min-h-0 flex-col items-center justify-center gap-0 overflow-hidden px-0.5 text-center",
                bandTypo,
              )}
            >
              <span className={cn("block w-full", bandInnerWidth, bandLineLeading)}>
                {row1Two}
              </span>
              <span className={cn("block w-full", bandInnerWidth, bandLineLeading)}>
                {row2Two}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 row-start-1 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-0.5 text-center">
              <span className={cn("block w-full", bandInnerWidth, bandTypo, bandLineLeading)}>{row0}</span>
            </div>
            <div className="col-start-1 row-start-2 flex min-h-0 items-center justify-center overflow-hidden px-0.5 text-center">
              <span className={cn("block w-full", bandInnerWidth, bandTypo, bandLineLeading)}>{row1Two}</span>
            </div>
            <div className="col-start-1 row-start-3 flex min-h-0 items-end justify-center overflow-hidden px-0.5 pb-[0.14em] text-center">
              <span className={cn("block w-full", bandInnerWidth, bandTypo, bandLineLeading)}>{row2Three}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GeneratedPixtoFocusFixedZoneCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  focusIllustrationScale,
  focusIllustrationUrl,
  className,
  suppressNeutralRing,
  markSrc,
  onMarkError,
  i18nTitle,
  i18nCategory,
  ribbonTypographyStyle,
  ribbonDarkText,
}: {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  iconUrl?: string;
  focusIllustrationScale?: number;
  focusIllustrationUrl?: string;
  className?: string;
  suppressNeutralRing?: boolean;
  markSrc: string;
  onMarkError: () => void;
  i18nTitle: string;
  i18nCategory: string;
  ribbonTypographyStyle: CSSProperties;
  ribbonDarkText: boolean;
}) {
  const z = GENERATED_PIXTO_FOCUS_FIXED_ZONE;
  const resolvedFocusIllustrationScale = focusIllustrationScale ?? 1;
  const resolvedIllustrationSrc =
    focusIllustrationUrl ?? illustrationUrl;

  return (
    <article
      data-generated-pixto-card
      data-card-type="focus-fixed-zone"
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden bg-white touch-manipulation",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
        suppressNeutralRing ? "shadow-none ring-0" : "shadow-none ring-0",
        className,
      )}
      style={{
        width: z.w,
        height: z.h,
        ...GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
        ...generatedPixtoCategoryOutlineStyle(categoryColour, {
          cardShadow: !suppressNeutralRing,
        }),
      }}
      aria-label={title}
    >
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center"
        style={{
          paddingTop: z.illustPadTop,
          paddingRight: z.illustPadX,
          paddingBottom: z.illustPadBottom,
          paddingLeft: z.illustPadX,
        }}
      >
        {markSrc ? (
          <div
            className="absolute z-10"
            style={{
              top: z.packMarkTop,
              right: z.packMarkRight,
              width: z.packMarkSize,
              height: z.packMarkSize,
            }}
          >
            <Image
              src={markSrc}
              alt=""
              fill
              className="object-contain"
              sizes={`${z.packMarkSize}px`}
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

        <FocusRoutineIllustrationImage
          src={resolvedIllustrationSrc}
          sizes={`${z.w}px`}
          objectClass="!h-full !w-full object-contain object-center"
          scale={resolvedFocusIllustrationScale}
        />
      </div>

      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          height: z.actionH,
          paddingLeft: z.actionPadX,
          paddingRight: z.actionPadX,
        }}
      >
        <p
          className={cn(
            "max-w-full text-center font-extrabold lowercase text-black [overflow-wrap:break-word]",
            z.actionMaxLines === 3 ? "line-clamp-3" : "line-clamp-2",
          )}
          style={{
            fontSize: z.actionTitleFontPx,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          {i18nTitle}
        </p>
      </div>

      <footer
        className="flex shrink-0 items-center justify-center overflow-hidden"
        style={{
          height: z.footerH,
          backgroundColor: categoryColour,
          paddingLeft: z.footerPadX,
          paddingRight: z.footerPadX,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          className={cn(
            "line-clamp-2 max-w-full text-center font-semibold lowercase [overflow-wrap:break-word]",
            ribbonDarkText
              ? "text-ink/90 drop-shadow-none"
              : "text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
          )}
          style={{
            ...(ribbonDarkText
              ? ribbonTypographyStyle
              : {
                  ...ribbonTypographyStyle,
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }),
            fontSize: z.footerTitleMaxFontPx,
            lineHeight: 1.1,
          }}
        >
          {i18nCategory}
        </span>
      </footer>
    </article>
  );
}

export function GeneratedPixtoCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  cardType,
  focusIllustrationScale,
  focusIllustrationUrl,
  className,
  focusPresentation = false,
  schedulePresentation = false,
  suppressNeutralRing = false,
  showIllustrationFrameGuide = false,
}: GeneratedPixtoCardProps) {
  const isDense = cardType === "dense";
  const cardUiLang = useCardUiLanguage();
  const htmlLang = effectiveDigitalUiLang(cardUiLang);
  const { title: i18nTitle, category: i18nCategory } = useMemo(
    () =>
      resolveDigitalPixtoStrings(
        illustrationUrl,
        title,
        category,
        cardUiLang,
      ),
    [illustrationUrl, title, category, cardUiLang],
  );

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
  const markRef = focusPresentation
    ? GENERATED_PIXTO_FOCUS_COMPANY_MARK
    : schedulePresentation
      ? GENERATED_PIXTO_WOW_COMPANY_MARK
      : GENERATED_PIXTO_COMPANY_MARK;
  const markSize = `calc(100% * ${markRef.w} / ${GENERATED_PIXTO_CARD_SIZE.w})`;
  const ribbonDarkText = categoryBandPrefersDarkInk(categoryColour);
  const resolvedFocusIllustrationScale = focusIllustrationScale ?? 1;
  const resolvedIllustrationSrc =
    focusPresentation && focusIllustrationUrl
      ? focusIllustrationUrl
      : illustrationUrl;
  const focusTitleLayout = useMemo(
    () => (focusPresentation ? resolveFocusTitleLayout(i18nTitle) : null),
    [focusPresentation, i18nTitle],
  );
  const scheduleLockedTitleLayout = useMemo(
    () =>
      schedulePresentation ? resolveScheduleLockedTitleLayout(i18nTitle) : null,
    [schedulePresentation, i18nTitle],
  );
  const scheduleLineCount = useMemo(() => {
    if (focusPresentation || schedulePresentation) return 1;
    const lines = splitTitleScheduleLines(i18nTitle);
    return Math.max(1, Math.min(lines.length > 0 ? lines.length : 1, 3)) as 1 | 2 | 3;
  }, [focusPresentation, schedulePresentation, i18nTitle]);
  const ribbonTypographyStyle = useMemo<CSSProperties>(() => {
    if (isDense) {
      return { fontSize: "14px", lineHeight: 1, letterSpacing: "0.02em" };
    }

    const baseTitleFontPx = focusPresentation
      ? (focusTitleLayout?.fontPx ?? FOCUS_TITLE_BASE_FONT_PX)
      : schedulePresentation
        ? (scheduleLockedTitleLayout?.fontPx ?? SCHEDULE_LOCKED_TITLE_BASE_FONT_PX)
        : scheduleLineCount === 1
          ? 72
          : scheduleLineCount === 2
            ? 48
            : 40;

    const baseRibbonFontPx = Math.max(baseTitleFontPx - 10, 24);

    return resolveSingleLineTypographyStyle(
      i18nCategory,
      focusPresentation ? FOCUS_RIBBON_TARGET_VISUAL_WIDTH : SCHEDULE_RIBBON_TARGET_VISUAL_WIDTH,
      baseRibbonFontPx,
      20,
    );
  }, [
    i18nCategory,
    focusPresentation,
    focusTitleLayout,
    isDense,
    scheduleLineCount,
    scheduleLockedTitleLayout,
    schedulePresentation,
  ]);
  const illustrationFrameRef = focusPresentation
    ? GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME
    : GENERATED_PIXTO_ILLUSTRATION_FRAME;
  const showFrameGuide =
    showIllustrationFrameGuide ||
    (SHOW_GENERATED_PIXTO_DEBUG_GUIDES && focusPresentation);
  /**
   * Illustration slot = 531×648 (schedule) or 531×663 (focus) aspect box.
   * Pre-framed 531×648 library assets — contain keeps the full illustration visible.
   */
  const illustrationObjectClass = "object-contain object-center";

  /** Schedule NOW/NEXT (not Focus, not dense tile) — larger type, but same base geometry. */
  const scheduleLargeType = !focusPresentation && !schedulePresentation && !isDense;
  const topRowFr = focusPresentation
    ? FOCUS_ROW_FR_TOP
    : schedulePresentation
      ? WOW_ROW_FR_TOP
      : ROW_FR_TOP;
  const titleRowFr = focusPresentation
    ? GENERATED_PIXTO_FOCUS_TITLE_ZONE_H
    : schedulePresentation
      ? WOW_ROW_FR_TITLE
      : ROW_FR_TITLE;
  const categoryRowFr = focusPresentation
    ? GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H
    : schedulePresentation
      ? WOW_ROW_FR_CATEGORY
      : ROW_FR_CATEGORY;
  const gridTemplateRows = `minmax(0, ${topRowFr}fr) minmax(0, ${titleRowFr}fr) minmax(0, ${categoryRowFr}fr)`;
  const cardAspect = focusPresentation ? FOCUS_CARD_ASPECT : CARD_ASPECT;
  const topSpacerFr = focusPresentation
    ? FOCUS_FR_TOP_SPACER
    : schedulePresentation
      ? WOW_FR_TOP_SPACER
      : FR_TOP_SPACER;
  const topIllustrationFr = focusPresentation
    ? FOCUS_FR_ILLUSTRATION
    : schedulePresentation
      ? WOW_FR_ILLUSTRATION
      : FR_ILLUSTRATION;
  const innerTopGridRows = `minmax(0, ${topSpacerFr}fr) minmax(0, ${topIllustrationFr}fr)`;

  if (focusPresentation) {
    return (
      <GeneratedPixtoFocusFixedZoneCard
        illustrationUrl={illustrationUrl}
        title={title}
        category={category}
        categoryColour={categoryColour}
        iconUrl={iconUrl}
        focusIllustrationScale={focusIllustrationScale}
        focusIllustrationUrl={focusIllustrationUrl}
        className={className}
        suppressNeutralRing={suppressNeutralRing}
        markSrc={markSrc}
        onMarkError={onMarkError}
        i18nTitle={i18nTitle}
        i18nCategory={i18nCategory}
        ribbonTypographyStyle={ribbonTypographyStyle}
        ribbonDarkText={ribbonDarkText}
      />
    );
  }

  return (
    <article
      data-generated-pixto-card
      data-card-type={cardType ?? "default"}
      className={cn(
        "relative grid w-full max-w-[min(100%,17.75rem)] min-h-0 overflow-hidden",
        GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
        "bg-white touch-manipulation shadow-none ring-0",
        className,
      )}
      style={{
        aspectRatio: cardAspect,
        gridTemplateRows,
        ...GENERATED_PIXTO_CARD_CORNER_RADIUS_STYLE,
        ...generatedPixtoCategoryOutlineStyle(categoryColour, {
          cardShadow: !suppressNeutralRing,
        }),
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
            transform: focusPresentation
              ? "translate(-26px, 0px)"
              : "translate(-40px, 8px)",
          }}
          aria-hidden
        >
          <Image
            src={markSrc}
            alt=""
            fill
            className="object-contain p-0"
            sizes={`${markRef.w}px`}
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

      {/* Top block — white field + illustration slot (531×648 / focus 531×663). */}
      <div className="relative h-full min-h-0 overflow-hidden bg-white">
        {(focusPresentation || schedulePresentation) ? (
          <IllustrationExpandedTopDiagnosticLine
            illustrationWidthPct={illustrationWidthPct}
          />
        ) : null}
        <div
          className="grid h-full min-h-0 w-full"
          style={{ gridTemplateRows: innerTopGridRows }}
        >
          <div aria-hidden />
          <div className="relative flex min-h-0 items-center justify-center">
            <div
              className={cn(
                "relative h-full min-h-0 w-full",
                showFrameGuide &&
                  "bg-[rgba(0,180,120,0.08)] ring-2 ring-inset ring-[rgba(0,180,120,0.9)]",
              )}
              style={{ maxWidth: illustrationWidthPct }}
            >
              {showFrameGuide ? (
                <span className="pointer-events-none absolute left-1 top-1 z-20 rounded bg-[rgba(0,180,120,0.92)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-white">
                  {illustrationFrameRef.w}×{illustrationFrameRef.h}
                </span>
              ) : null}
              <Image
                src={resolvedIllustrationSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 72vw, 240px"
                className={cn(illustrationObjectClass, "select-none")}
                style={
                  focusPresentation && resolvedFocusIllustrationScale !== 1
                    ? {
                        transform: `scale(${resolvedFocusIllustrationScale})`,
                        transformOrigin: "center center",
                      }
                    : undefined
                }
                unoptimized={
                  illustrationUrl.startsWith("/") ||
                  illustrationUrl.includes("/cards/")
                }
                draggable={false}
              />
              {!schedulePresentation ? <IllustrationSlotDiagnosticBorder /> : null}
            </div>
          </div>
        </div>
      </div>

      <TitleBand
        title={i18nTitle}
        htmlLang={htmlLang}
        isDense={isDense}
        focusPresentation={focusPresentation}
        schedulePresentation={schedulePresentation}
        scheduleLargeType={scheduleLargeType}
      />

      <div
        className={cn(
          "flex min-h-0 shrink-0 items-center justify-center overflow-hidden",
          focusPresentation ? "px-2" : schedulePresentation ? "px-3" : "px-3",
        )}
        style={{
          backgroundColor: categoryColour,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          className={cn(
            "block w-full overflow-hidden whitespace-nowrap text-center font-semibold lowercase",
            focusPresentation
              ? "max-w-[98%]"
              : schedulePresentation
                ? "max-w-full"
                : "max-w-full",
            ribbonDarkText
              ? "text-ink/90 drop-shadow-none"
              : "text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
          )}
          style={
            ribbonDarkText
              ? ribbonTypographyStyle
              : {
                  ...ribbonTypographyStyle,
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }
          }
        >
          {i18nCategory}
        </span>
      </div>
    </article>
  );
}
