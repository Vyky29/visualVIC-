"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { languageToggleButtonAria } from "@/lib/i18n/app-shell-locale";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { writeStoredCardLanguage } from "@/lib/preferences/card-language-preference";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";

type AfterSelect = "stay" | "dashboard";

type Props = {
  /** After switching language: stay on this page, or go to the app home. */
  afterSelect?: AfterSelect;
  className?: string;
};

/** Spain — red / gold / red (simplified civil flag proportions). */
function FlagSpain({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={cn("h-7 w-[2.625rem] shrink-0 overflow-hidden rounded-[3px]", className)}
      aria-hidden
    >
      <rect width="30" height="5" y="0" fill="#AA151B" />
      <rect width="30" height="10" y="5" fill="#F1BF00" />
      <rect width="30" height="5" y="15" fill="#AA151B" />
    </svg>
  );
}

/** United Kingdom — Union Jack (simplified). */
function FlagUk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={cn("h-7 w-[3.5rem] shrink-0 overflow-hidden rounded-[3px]", className)}
      aria-hidden
    >
      <rect width="60" height="30" fill="#012169" />
      <path
        d="M0 0 L60 30 M60 0 L0 30"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="square"
      />
      <path
        d="M0 0 L60 30 M60 0 L0 30"
        stroke="#C8102E"
        strokeWidth="5"
        strokeLinecap="square"
      />
      <path
        d="M30 0 v30 M0 15 h60"
        stroke="#fff"
        strokeWidth="12"
        strokeLinecap="square"
      />
      <path
        d="M30 0 v30 M0 15 h60"
        stroke="#C8102E"
        strokeWidth="7"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CardLanguageMenuButton({
  afterSelect = "stay",
  className,
}: Props) {
  const router = useRouter();
  const lang = useCardUiLanguage();

  const toggle = useCallback(() => {
    const next: CardLanguageCode = lang === "es" ? "en" : "es";
    writeStoredCardLanguage(next);
    if (afterSelect === "dashboard") {
      router.push("/dashboard");
    }
  }, [afterSelect, lang, router]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={languageToggleButtonAria(lang)}
      className={cn(
        "inline-flex min-h-touch min-w-touch items-center justify-center rounded-xl border border-ink/12 bg-white/95 px-2 py-1.5 shadow-soft ring-1 ring-black/[0.04] transition active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-canvas-muted/80",
        className,
      )}
    >
      {lang === "es" ? <FlagSpain /> : <FlagUk />}
    </button>
  );
}
