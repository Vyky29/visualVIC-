"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { welcomeHomeCta, welcomeSignInCta } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

export function WelcomeFooter() {
  const lang = useCardUiLanguage();

  return (
    <footer className="shrink-0 pt-0">
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        <Link href="/dashboard" className="min-w-0">
          <Button className="min-h-0 h-8 w-full min-w-0 rounded-xl px-2 py-0.5 text-[11px] font-medium leading-tight sm:h-8 sm:text-[12px]">
            {welcomeHomeCta(lang)}
          </Button>
        </Link>
        <Link href="/auth" className="min-w-0">
          <Button
            variant="secondary"
            className="min-h-0 h-8 w-full min-w-0 rounded-xl px-2 py-0.5 text-[11px] font-medium leading-tight sm:h-8 sm:text-[12px]"
          >
            {welcomeSignInCta(lang)}
          </Button>
        </Link>
      </div>
    </footer>
  );
}
