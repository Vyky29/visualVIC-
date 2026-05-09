"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  backHref?: string;
  rightSlot?: ReactNode;
  className?: string;
};

export function Header({ title, backHref, rightSlot, className }: Props) {
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
      <h1 className="flex-1 truncate text-center text-[17px] font-semibold tracking-tight text-ink">
        {title}
      </h1>
      <div className="flex min-w-touch justify-end">{rightSlot}</div>
    </header>
  );
}
