"use client";

import Image from "next/image";
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

/** Company mark — design px (corner glyph). */
export const GENERATED_PIXTO_COMPANY_MARK = { w: 88, h: 88 } as const;

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
};

const CARD_ASPECT = `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}` as const;

export function GeneratedPixtoCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  cardType,
  className,
}: GeneratedPixtoCardProps) {
  const isDense = cardType === "dense";

  const illustrationWidthPct = `${(ILLUSTRATION_WIDTH_FRAC * 100).toFixed(3)}%`;
  const markSize = `calc(100% * ${GENERATED_PIXTO_COMPANY_MARK.w} / ${GENERATED_PIXTO_CARD_SIZE.w})`;
  const ribbonDarkText = categoryBandPrefersDarkInk(categoryColour);

  return (
    <article
      data-generated-pixto-card
      data-card-type={cardType ?? "default"}
      className={cn(
        "relative grid w-full max-w-[min(100%,17.75rem)] min-h-0 overflow-hidden rounded-[1.35rem]",
        "bg-white shadow-card ring-1 ring-ink/[0.08]",
        "touch-manipulation",
        className,
      )}
      style={{
        aspectRatio: CARD_ASPECT,
        gridTemplateRows: `${ROW_FR_TOP}fr ${ROW_FR_TITLE}fr ${ROW_FR_CATEGORY}fr`,
      }}
    >
      {iconUrl ? (
        <div
          className="pointer-events-none absolute right-0 top-0 z-30 flex items-center justify-center overflow-hidden bg-white"
          style={{
            width: markSize,
            height: markSize,
            borderRadius: "0.35rem",
            transform: "translate(-5px, 5px)",
          }}
          aria-hidden
        >
          <Image
            src={iconUrl}
            alt=""
            fill
            className="object-contain p-1"
            sizes="88px"
            unoptimized={
              iconUrl.startsWith("/") ||
              iconUrl.includes("/cards/") ||
              /\.jpe?g$/i.test(iconUrl)
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
                  className="object-contain object-center select-none"
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

      <div
        className={cn(
          "flex min-h-0 shrink-0 flex-col items-center justify-center overflow-hidden border-t border-ink/[0.06] bg-white px-4",
          isDense ? "py-1" : "py-2",
        )}
      >
        <h2
          className={cn(
            "line-clamp-3 w-full text-balance text-center font-semibold lowercase leading-tight tracking-tight text-ink",
            isDense ? "text-[19px] sm:text-[21px]" : "text-[21px] sm:text-[24px]",
          )}
        >
          {title}
        </h2>
      </div>

      <div
        className="flex min-h-0 shrink-0 items-center justify-center overflow-hidden px-3"
        style={{
          backgroundColor: categoryColour,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          className={cn(
            "line-clamp-2 text-center text-[14px] font-semibold lowercase leading-snug tracking-[0.08em] sm:text-[16px]",
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
