"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * Experimental HTML/CSS card shell for AI illustration-only assets.
 * Does not replace designer full-bleed PNG cards used elsewhere.
 */

/** Digital card frame (design px). */
export const GENERATED_PIXTO_CARD_SIZE = { w: 744, h: 1054 } as const;

/**
 * Illustration canvas (wireframe “yellow block”) — image is clipped to this
 * frame only; it does not run edge-to-edge to the top of the card.
 */
export const GENERATED_PIXTO_ILLUSTRATION_FRAME = { w: 531, h: 648 } as const;

const ILLUSTRATION_FRAME_ASPECT =
  `${GENERATED_PIXTO_ILLUSTRATION_FRAME.w} / ${GENERATED_PIXTO_ILLUSTRATION_FRAME.h}` as const;

/** Share of card width used by the illustration frame (531 / 744). */
const ILLUSTRATION_WIDTH_FRAC =
  GENERATED_PIXTO_ILLUSTRATION_FRAME.w / GENERATED_PIXTO_CARD_SIZE.w;

export type GeneratedPixtoCardProps = {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  /** Company / brand mark — top-right of the illustration shell (wireframe brown square). */
  iconUrl?: string;
  cardType?: string;
};

const CARD_ASPECT = `${GENERATED_PIXTO_CARD_SIZE.w} / ${GENERATED_PIXTO_CARD_SIZE.h}` as const;

export function GeneratedPixtoCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  cardType,
}: GeneratedPixtoCardProps) {
  const isDense = cardType === "dense";

  const illustrationWidthPct = `${(ILLUSTRATION_WIDTH_FRAC * 100).toFixed(3)}%`;

  return (
    <article
      data-generated-pixto-card
      data-card-type={cardType ?? "default"}
      className={cn(
        "grid w-full max-w-[min(100%,17.75rem)] grid-rows-[minmax(0,1fr)_auto_auto] overflow-hidden rounded-[1.35rem]",
        "bg-white shadow-card ring-1 ring-ink/[0.08]",
        "touch-manipulation",
      )}
      style={{ aspectRatio: CARD_ASPECT }}
    >
      {/* Illustration shell — top margin so art does not touch the card top; company mark top-right */}
      <div className="relative min-h-0 bg-gradient-to-b from-canvas-muted/80 to-canvas-muted">
        {iconUrl ? (
          <div
            className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-ink/10 sm:right-2.5 sm:top-2.5 sm:h-10 sm:w-10"
            aria-hidden
          >
            <Image
              src={iconUrl}
              alt=""
              width={40}
              height={40}
              className="object-contain p-1"
              unoptimized={
                iconUrl.startsWith("/") || iconUrl.includes("/cards/")
              }
            />
          </div>
        ) : null}

        <div className="flex h-full min-h-0 flex-col items-center pt-3 sm:pt-4">
          <div
            className="relative shrink-0"
            style={{
              width: `min(${illustrationWidthPct}, 100%)`,
              aspectRatio: ILLUSTRATION_FRAME_ASPECT,
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
          <div className="min-h-0 w-full flex-1" aria-hidden />
        </div>
      </div>

      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center border-t border-ink/[0.06] bg-white px-4",
          isDense ? "py-2.5" : "py-3.5 sm:py-4",
        )}
      >
        <h2
          className={cn(
            "text-balance text-center font-semibold leading-snug tracking-tight text-ink",
            isDense ? "text-[15px]" : "text-[16px] sm:text-[17px]",
          )}
        >
          {title}
        </h2>
      </div>

      <div
        className="flex shrink-0 items-center justify-center px-4 py-2.5 sm:py-3"
        style={{
          backgroundColor: categoryColour,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span
          className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          {category}
        </span>
      </div>
    </article>
  );
}
