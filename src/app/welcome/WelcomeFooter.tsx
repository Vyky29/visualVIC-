"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CARD_LANGUAGE_OPTIONS,
  optionForCode,
  readStoredCardLanguage,
  type CardLanguageCode,
  writeStoredCardLanguage,
} from "@/lib/preferences/card-language-preference";
import { cn } from "@/lib/utils/cn";

export function WelcomeFooter() {
  const router = useRouter();
  const [language, setLanguage] = useState<CardLanguageCode>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLanguage(readStoredCardLanguage());
  }, []);

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

  const current = optionForCode(language);

  const pick = (code: CardLanguageCode) => {
    setLanguage(code);
    writeStoredCardLanguage(code);
    closeMenu();
    router.push("/dashboard");
  };

  return (
    <footer className="shrink-0 space-y-1.5 pt-0.5">
      <div ref={wrapRef} className="relative">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <Link href="/dashboard" className="min-w-0">
            <Button className="h-[40px] w-full min-w-0 px-1.5 py-1.5 text-[11px] font-medium sm:h-[42px] sm:px-2 sm:text-[13px]">
              Home
            </Button>
          </Link>
          <Link href="/auth" className="min-w-0">
            <Button
              variant="secondary"
              className="h-[40px] w-full min-w-0 px-1.5 py-1.5 text-[11px] font-medium sm:h-[42px] sm:px-2 sm:text-[13px]"
            >
              Sign in
            </Button>
          </Link>
          <div className="relative min-w-0">
            <Button
              type="button"
              variant="secondary"
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              aria-label={`Card language: ${current.label}. Open language menu`}
              className="h-[40px] w-full min-w-0 px-1.5 py-1.5 font-semibold tracking-tight sm:h-[42px] sm:px-2"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="text-[12px] sm:text-[14px]">{current.initials}</span>
            </Button>
            {menuOpen ? (
              <ul
                className="absolute bottom-[calc(100%+6px)] left-1/2 z-20 w-[min(100vw-2rem,14rem)] -translate-x-1/2 rounded-xl border border-ink/10 bg-white p-1 shadow-soft"
                role="listbox"
                aria-label="Card language"
              >
                {CARD_LANGUAGE_OPTIONS.map((opt) => (
                  <li key={opt.code} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={opt.code === language}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-ink transition-colors",
                        opt.code === language
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
        </div>
      </div>
      <p className="text-center text-[10px] leading-snug text-ink-faint sm:text-[11px]">
        Choosing English or Español saves it on this device and opens Home — airport and
        hotel digital cards and matching labels follow that choice (local copy only).
      </p>
    </footer>
  );
}
