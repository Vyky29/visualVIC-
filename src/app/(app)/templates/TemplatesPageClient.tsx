"use client";

import Link from "next/link";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Card } from "@/components/ui/Card";
import { mockTemplates } from "@/lib/mock/templates";
import {
  templatesCustomizeCta,
  templatesEyebrow,
  templatesIntroBlurb,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

export function TemplatesPageClient() {
  const lang = useCardUiLanguage();

  return (
    <div>
      <TranslatedHeader titleKey="routineTemplates" />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {templatesIntroBlurb(lang)}
        </p>
        <ul className="flex flex-col gap-3">
          {mockTemplates.map((t) => (
            <li key={t.id}>
              <Link href={`/builder?from=${encodeURIComponent(t.id)}`}>
                <Card className="transition hover:shadow-soft">
                  <p className="line-clamp-2 break-words text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint [overflow-wrap:anywhere]">
                    {templatesEyebrow(lang)}
                  </p>
                  <p className="mt-1 line-clamp-2 break-words text-[17px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                    {t.name}
                  </p>
                  {t.description ? (
                    <p className="mt-1 line-clamp-4 break-words text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
                      {t.description}
                    </p>
                  ) : null}
                  <p className="mt-3 line-clamp-2 break-words text-[13px] font-medium leading-snug text-sage [overflow-wrap:anywhere]">
                    {templatesCustomizeCta(lang)}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
