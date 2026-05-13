"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CARD_LANGUAGE_OPTIONS,
  optionForCode,
  type CardLanguageCode,
  writeStoredCardLanguage,
} from "@/lib/preferences/card-language-preference";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { welcomeLanguageButtonAria } from "@/lib/i18n/app-shell-locale";
import { cn } from "@/lib/utils/cn";

type AfterSelect = "stay" | "dashboard";

type Props = {
  /** After picking a language: stay on this page, or go to the app home. */
  afterSelect?: AfterSelect;
  className?: string;
};

export function CardLanguageMenuButton({
  afterSelect = "stay",
  className,
}: Props) {
  const router = useRouter();
  const lang = useCardUiLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) closeMenu();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const current = optionForCode(lang);

  const pick = (code: CardLanguageCode) => {
    writeStoredCardLanguage(code);
    closeMenu();
    if (afterSelect === "dashboard") {
      router.push("/dashboard");
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <Button
        type="button"
        variant="secondary"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        aria-label={`${welcomeLanguageButtonAria(lang)}: ${current.label}`}
        className="h-10 min-h-touch min-w-[3.25rem] px-3 font-semibold tracking-tight sm:h-11"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="text-[13px] sm:text-[14px]">{current.initials}</span>
      </Button>
      {menuOpen ? (
        <ul
          className="absolute right-0 top-[calc(100%+6px)] z-30 w-[min(100vw-2rem,14rem)] rounded-xl border border-ink/10 bg-white p-1 shadow-soft"
          role="listbox"
          aria-label={current.label}
        >
          {CARD_LANGUAGE_OPTIONS.map((opt) => (
            <li key={opt.code} role="none">
              <button
                type="button"
                role="option"
                aria-selected={opt.code === lang}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-ink transition-colors",
                  opt.code === lang
                    ? "bg-cream font-medium ring-1 ring-ink/10"
                    : "active:bg-ink/5 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.04]",
                )}
                onClick={() => pick(opt.code)}
              >
                <span>{opt.label}</span>
                <span className="text-[11px] font-semibold text-ink-subtle">
                  {opt.initials}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
