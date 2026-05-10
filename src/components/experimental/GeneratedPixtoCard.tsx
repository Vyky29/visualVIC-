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

/** Company mark (“brown square”) — design px. */
export const GENERATED_PIXTO_COMPANY_MARK = { w: 82, h: 82 } as const;

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
  /** Slightly smaller than design 82px so the mark reads as a corner glyph, not a control. */
  const markSize = `calc(100% * 64 / ${GENERATED_PIXTO_CARD_SIZE.w})`;

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
          className="pointer-events-none absolute right-1 top-1 z-30 flex items-center justify-center overflow-hidden bg-white sm:right-1.5 sm:top-1.5"
          style={{
            width: markSize,
            height: markSize,
            borderRadius: "0.35rem",
          }}
          aria-hidden
        >
          <Image
            src={iconUrl}
            alt=""
            fill
            className="object-contain p-1"
            sizes="64px"
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
            "line-clamp-3 w-full text-balance text-center font-semibold leading-tight tracking-tight text-ink",
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
          className="line-clamp-2 text-center text-[14px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] sm:text-[16px]"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          {category}
        </span>
      </div>
    </article>
  );
}
