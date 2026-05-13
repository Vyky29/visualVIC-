"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PixtoLearnIconMark } from "@/components/brand/PixtoLearnIconMark";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  backHref?: string;
  /** Screen reader label for the back control (default "Back"). */
  backAriaLabel?: string;
  rightSlot?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function Header({
  title,
  backHref,
  backAriaLabel = "Back",
  rightSlot,
  className,
  compact = false,
}: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex items-center gap-3 overflow-hidden border-b border-ink/5 bg-canvas/90 px-4 backdrop-blur-md",
        compact
          ? "min-h-[44px] pb-2 pt-[max(0.45rem,env(safe-area-inset-top))]"
          : "min-h-[52px] pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]",
        className,
      )}
    >
      {backHref ? (
        <Link
          href={backHref}
          className="flex min-h-touch min-w-touch touch-manipulation items-center justify-center rounded-2xl text-ink active:bg-ink/10 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/5"
          aria-label={backAriaLabel}
        >
          ←
        </Link>
      ) : (
        <span className="min-w-touch" />
      )}
      <div className="flex min-w-0 flex-1 justify-center px-1">
        <div className={cn(
          "flex min-w-0 max-w-[min(100%,calc(100vw-6.25rem))] items-center justify-center",
          compact ? "gap-2" : "gap-3",
        )}>
          <PixtoLearnIconMark
            className={cn(
              compact ? "h-8 w-8 p-1.5 sm:h-9 sm:w-9 sm:p-1.5" : "h-10 w-10 p-1.5 sm:h-11 sm:w-11 sm:p-2",
            )}
          />
          <h1 className={cn(
            "min-w-0 truncate text-center font-semibold tracking-tight text-ink",
            compact ? "text-[17px] sm:text-[18px]" : "text-[19px] sm:text-[20px]",
          )}>
            {title}
          </h1>
        </div>
      </div>
      <div className="flex min-w-touch shrink-0 justify-end">{rightSlot}</div>
    </header>
  );
}
