"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * Experimental HTML/CSS card shell for AI illustration-only assets.
 * Does not replace designer full-bleed PNG cards used elsewhere.
 */
export type GeneratedPixtoCardProps = {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  iconUrl?: string;
  cardType?: string;
};

/** Design ratio: digital PixtoLearn portrait card (width × height). */
const CARD_ASPECT = "744 / 1054" as const;

export function GeneratedPixtoCard({
  illustrationUrl,
  title,
  category,
  categoryColour,
  iconUrl,
  cardType,
}: GeneratedPixtoCardProps) {
  const isDense = cardType === "dense";

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
      {/* Illustration zone — image clipped to this region only */}
      <div className="relative min-h-0 bg-gradient-to-b from-canvas-muted/80 to-canvas-muted">
        <div className="absolute inset-2 sm:inset-3">
          <Image
            src={illustrationUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, 280px"
            className="object-contain object-center select-none"
            unoptimized={
              illustrationUrl.startsWith("/") ||
              illustrationUrl.includes("/cards/")
            }
            draggable={false}
          />
        </div>
      </div>

      {/* Title zone — real text, not baked into bitmap */}
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

      {/* Category band — colour from prop; strip is layout, not from PNG */}
      <div
        className="flex shrink-0 items-center justify-center gap-2 px-4 py-2.5 sm:py-3"
        style={{
          backgroundColor: categoryColour,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {iconUrl ? (
          <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-md bg-white/15 ring-1 ring-white/25">
            <Image
              src={iconUrl}
              alt=""
              fill
              className="object-contain p-0.5"
              sizes="20px"
              unoptimized={
                iconUrl.startsWith("/") || iconUrl.includes("/cards/")
              }
            />
          </span>
        ) : null}
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
