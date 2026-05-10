"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  /** Centered brand image instead of title (title kept for screen readers). */
  logoSrc?: string;
  backHref?: string;
  rightSlot?: ReactNode;
  className?: string;
};

export function Header({
  title,
  logoSrc,
  backHref,
  rightSlot,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex min-h-[52px] items-center gap-3 border-b border-ink/5 bg-canvas/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md",
        className,
      )}
    >
      {backHref ? (
        <Link
          href={backHref}
          className="flex min-h-touch min-w-touch touch-manipulation items-center justify-center rounded-2xl text-ink active:bg-ink/10 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/5"
          aria-label="Back"
        >
          ←
        </Link>
      ) : (
        <span className="min-w-touch" />
      )}
      <div className="flex min-w-0 flex-1 justify-center">
        {logoSrc ? (
          <>
            <h1 className="sr-only">{title}</h1>
            {/* Native img: avoids next/image optimizer edge cases on some hosts/CDNs */}
            <img
              src={logoSrc}
              alt=""
              width={176}
              height={36}
              className="h-9 w-auto max-w-[min(100%,11rem)] object-contain object-center"
              decoding="async"
              fetchPriority="high"
            />
          </>
        ) : (
          <h1 className="truncate text-center text-[17px] font-semibold tracking-tight text-ink">
            {title}
          </h1>
        )}
      </div>
      <div className="flex min-w-touch shrink-0 justify-end">{rightSlot}</div>
    </header>
  );
}
