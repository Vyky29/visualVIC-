"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PixtoLearnIconMark } from "@/components/brand/PixtoLearnIconMark";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  backHref?: string;
  rightSlot?: ReactNode;
  className?: string;
};

export function Header({
  title,
  backHref,
  rightSlot,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex min-h-[52px] items-center gap-3 overflow-hidden border-b border-ink/5 bg-canvas/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md",
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
      <div className="flex min-w-0 flex-1 justify-center px-1">
        <div className="flex min-w-0 max-w-[min(100%,calc(100vw-6.25rem))] items-center justify-center gap-3">
          <PixtoLearnIconMark className="h-10 w-10 p-1.5 sm:h-11 sm:w-11 sm:p-2" />
          <h1 className="min-w-0 truncate text-center text-[19px] font-semibold tracking-tight text-ink sm:text-[20px]">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex min-w-touch shrink-0 justify-end">{rightSlot}</div>
    </header>
  );
}
