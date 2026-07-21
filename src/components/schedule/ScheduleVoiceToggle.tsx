"use client";

import { cn } from "@/lib/utils/cn";

function SpeakerOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 9.75v4.5h3.2L12 18.5V5.5L7.7 9.75H4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 9.2a3.2 3.2 0 0 1 0 5.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M17.4 7a5.6 5.6 0 0 1 0 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 9.75v4.5h3.2L12 18.5V5.5L7.7 9.75H4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.5 20 14.5M20 9.5 16 14.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScheduleVoiceToggle({
  enabled,
  onToggle,
  ariaLabel,
  className,
  size = "default",
  label,
  stacked,
}: {
  enabled: boolean;
  onToggle: () => void;
  ariaLabel: string;
  className?: string;
  size?: "default" | "compact";
  /** Visible label under/beside the icon (toolbar). */
  label?: string;
  /** Phone: icon above label. Tablet+: row. */
  stacked?: boolean;
}) {
  const compact = size === "compact";
  const iconClass = stacked
    ? "h-5 w-5 tablet:h-[18px] tablet:w-[18px]"
    : compact
      ? "h-4 w-4"
      : "h-[18px] w-[18px]";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={enabled}
      title={ariaLabel}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl border transition active:scale-[0.97]",
        enabled
          ? "border-sage/40 bg-sage/15 text-sage"
          : "border-ink/10 bg-canvas-muted text-ink-subtle hover:bg-canvas",
        stacked
          ? "min-h-[3.25rem] min-w-0 flex-1 flex-col gap-0.5 px-1 py-1.5 tablet:min-h-touch tablet:flex-row tablet:gap-2 tablet:px-3 tablet:py-2"
          : compact
            ? "h-9 w-9"
            : "h-11 w-11 min-h-touch",
        className,
      )}
    >
      {enabled ? (
        <SpeakerOnIcon className={iconClass} />
      ) : (
        <SpeakerOffIcon className={iconClass} />
      )}
      {label ? (
        <span
          className={cn(
            stacked
              ? "max-w-full truncate text-center text-[9px] font-semibold leading-tight tracking-tight tablet:text-[13px] tablet:font-medium"
              : "sr-only",
          )}
        >
          {label}
        </span>
      ) : null}
    </button>
  );
}
