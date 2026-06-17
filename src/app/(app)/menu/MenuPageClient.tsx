"use client";

import Link from "next/link";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Card } from "@/components/ui/Card";
import {
  bottomNavLabel,
  menuFocusModeAfterSavedLink,
  menuFocusModeBeforeSavedLink,
  menuFocusModeLabel,
  menuIntroBlurb,
  menuLinkHint,
  menuLinkLabel,
  menuSectionTitle,
  type MenuLinkKey,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

const ROUTINE_LINKS: { href: string; key: MenuLinkKey }[] = [
  { href: "/player", key: "schedulePlayer" },
  { href: "/builder", key: "routineBuilder" },
  { href: "/first-then?pack=ikram-home", key: "firstThen" },
  { href: "/generated-card-demo", key: "generatedCardDemo" },
];

const PROTOTYPE_LINKS: { href: string; key: MenuLinkKey }[] = [
  { href: "/welcome", key: "welcome" },
  { href: "/auth", key: "auth" },
  { href: "/onboarding/profile", key: "profile" },
];

export function MenuPageClient() {
  const lang = useCardUiLanguage();

  return (
    <div className="min-h-dvh bg-white">
      <TranslatedHeader titleKey="menu" />
      <div className="space-y-8 px-4 pb-8 pt-2">
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {menuIntroBlurb(lang)}
        </p>

        <section className="space-y-3">
          <h2 className="break-words px-1 text-[13px] font-semibold uppercase leading-snug tracking-[0.18em] text-ink-faint [overflow-wrap:anywhere] line-clamp-2">
            {menuSectionTitle("routines", lang)}
          </h2>
          <ul className="flex flex-col gap-2">
            {ROUTINE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <Card className="transition hover:shadow-soft">
                    <p className="line-clamp-2 break-words text-[16px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                      {menuLinkLabel(link.key, lang)}
                    </p>
                    <p className="mt-1 line-clamp-3 break-words text-[13px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
                      {menuLinkHint(link.key, lang)}
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="break-words px-1 text-[13px] font-semibold uppercase leading-snug tracking-[0.18em] text-ink-faint [overflow-wrap:anywhere] line-clamp-2">
            {menuSectionTitle("prototype", lang)}
          </h2>
          <ul className="flex flex-col gap-2">
            {PROTOTYPE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <Card className="transition hover:shadow-soft">
                    <p className="line-clamp-2 break-words text-[16px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                      {menuLinkLabel(link.key, lang)}
                    </p>
                    <p className="mt-1 line-clamp-3 break-words text-[13px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
                      {menuLinkHint(link.key, lang)}
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Card className="bg-sage-mist/50">
          <p className="break-words text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
            <strong className="font-semibold text-ink">
              {menuFocusModeLabel(lang)}
            </strong>{" "}
            {menuFocusModeBeforeSavedLink(lang)}
            <Link
              href="/saved"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              {bottomNavLabel("saved", lang)}
            </Link>
            {menuFocusModeAfterSavedLink(lang)}
          </p>
        </Card>
      </div>
    </div>
  );
}
