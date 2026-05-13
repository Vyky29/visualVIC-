"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  welcomeFooterHint,
  welcomeHomeCta,
  welcomeSignInCta,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

export function WelcomeFooter() {
  const lang = useCardUiLanguage();

  return (
    <footer className="shrink-0 space-y-1.5 pt-0.5">
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        <Link href="/dashboard" className="min-w-0">
          <Button className="h-[40px] w-full min-w-0 px-2 py-1.5 text-[12px] font-medium sm:h-[42px] sm:text-[14px]">
            {welcomeHomeCta(lang)}
          </Button>
        </Link>
        <Link href="/auth" className="min-w-0">
          <Button
            variant="secondary"
            className="h-[40px] w-full min-w-0 px-2 py-1.5 text-[12px] font-medium sm:h-[42px] sm:text-[14px]"
          >
            {welcomeSignInCta(lang)}
          </Button>
        </Link>
      </div>
      <p className="text-center text-[10px] leading-snug text-ink-faint sm:text-[11px]">
        {welcomeFooterHint(lang)}
      </p>
    </footer>
  );
}
