"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Card } from "@/components/ui/Card";
import { SavedListClient } from "@/components/saved/SavedListClient";
import { useStaffAccess } from "@/contexts/StaffAccessContext";
import {
  savedFooterLead,
  savedFooterMid,
  savedIntroBlurb,
  shellHeaderTitle,
  templatesPageLinkWord,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { APP_SHELL_TABLET_INSET_CLASS } from "@/lib/constants/app-shell-layout";
import { cn } from "@/lib/utils/cn";

export function SavedPageClient() {
  const lang = useCardUiLanguage();
  const router = useRouter();
  const { isRestricted, status } = useStaffAccess();

  useEffect(() => {
    if (status === "loading") return;
    if (isRestricted) router.replace("/dashboard");
  }, [isRestricted, router, status]);

  if (status === "loading" || isRestricted) {
    return (
      <div className="flex min-h-[40dvh] items-center justify-center px-6 text-[14px] text-ink-subtle">
        …
      </div>
    );
  }

  return (
    <div>
      <TranslatedHeader titleKey="savedLibrary" />
      <div className={cn("space-y-4 px-4 pb-8 pt-2", APP_SHELL_TABLET_INSET_CLASS)}>
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {savedIntroBlurb(lang)}
        </p>
        <SavedListClient />
        <Card className="bg-sage-mist/50">
          <p className="break-words text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
            {savedFooterLead(lang)}{" "}
            <Link
              href="/templates"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              {templatesPageLinkWord(lang)}
            </Link>{" "}
            {savedFooterMid(lang)}{" "}
            <Link
              href="/builder"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              {shellHeaderTitle("routineBuilder", lang)}
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
