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
}: {
  enabled: boolean;
  onToggle: () => void;
  ariaLabel: string;
  className?: string;
  size?: "default" | "compact";
}) {
  const compact = size === "compact";
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
        compact ? "h-9 w-9" : "h-11 w-11 min-h-touch",
        className,
      )}
    >
      {enabled ? (
        <SpeakerOnIcon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      ) : (
        <SpeakerOffIcon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      )}
    </button>
  );
}
