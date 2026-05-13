"use client";

import Link from "next/link";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Card } from "@/components/ui/Card";
import { SavedListClient } from "@/components/saved/SavedListClient";
import {
  savedFooterLead,
  savedFooterMid,
  savedIntroBlurb,
  shellHeaderTitle,
  templatesPageLinkWord,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

export function SavedPageClient() {
  const lang = useCardUiLanguage();

  return (
    <div>
      <TranslatedHeader titleKey="savedLibrary" />
      <div className="space-y-4 px-4 pb-8 pt-2">
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
