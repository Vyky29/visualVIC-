"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Phone: icon above label. Tablet+: icon + label in one row. */
export function ScheduleToolbarAction({
  icon,
  label,
  onClick,
  className,
  ariaLabel,
  pressed,
  danger,
  emphasize,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  pressed?: boolean;
  danger?: boolean;
  emphasize?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      aria-pressed={pressed}
      title={label}
      className={cn(
        "flex min-h-[3.25rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-ink transition active:scale-[0.97]",
        "tablet:min-h-touch tablet:flex-row tablet:gap-2 tablet:px-3 tablet:py-2",
        emphasize
          ? "bg-sage-mist/90 ring-1 ring-sage/30"
          : "bg-cream ring-1 ring-ink/10",
        danger && "text-[#C84C57]",
        pressed && "ring-sage/40 bg-sage/15",
        className,
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center [&_svg]:h-5 [&_svg]:w-5 tablet:h-[18px] tablet:w-[18px] tablet:[&_svg]:h-[18px] tablet:[&_svg]:w-[18px]">
        {icon}
      </span>
      <span className="max-w-full truncate text-center text-[9px] font-semibold leading-tight tracking-tight tablet:text-[13px] tablet:font-medium">
        {label}
      </span>
    </button>
  );
}
