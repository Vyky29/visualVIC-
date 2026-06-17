"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import {
  dashboardExtrasSectionTitle,
  dayCentreFoldersIntro,
  shellBackAria,
} from "@/lib/i18n/app-shell-locale";
import { libraryDayCentreFolderLabel } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { cn } from "@/lib/utils/cn";
import {
  DAY_CENTRE_FOLDER_IDS,
  dayCentreFolderIconUrl,
  dayCentreFolderPickerHref,
  type DayCentreFolderId,
} from "@/lib/routines/day-centre-folders";

const FOLDER_RING_CLASS: Record<DayCentreFolderId, string> = {
  "mini-gym": "ring-[#E53935]/75",
  bouldering: "ring-[#E53935]/75",
  cooking: "ring-[#E53935]/75",
  community: "ring-[#E53935]/75",
  mixed: "ring-[#E53935]/75",
  premium: "ring-[#E53935]/75",
};

export function DayCentreFoldersClient() {
  const cardUiLang = useCardUiLanguage();

  return (
    <div>
      <Header
        title={dashboardExtrasSectionTitle(cardUiLang)}
        backHref="/dashboard"
        backAriaLabel={shellBackAria(cardUiLang)}
      />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {dayCentreFoldersIntro(cardUiLang)}
        </p>
        <ul className="flex flex-col gap-3">
          {DAY_CENTRE_FOLDER_IDS.map((folderId) => {
            const iconUrl = dayCentreFolderIconUrl(folderId);
            return (
              <li key={folderId}>
                <Card className="overflow-hidden border border-ink/5 p-0 shadow-card">
                  <Link
                    href={dayCentreFolderPickerHref(folderId)}
                    className="flex items-center gap-4 p-4 transition hover:bg-white/60"
                  >
                    <span
                      className={cn(
                        "relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-white/95 bg-white shadow-sm ring-[2.5px] ring-offset-[1.5px] ring-offset-canvas",
                        FOLDER_RING_CLASS[folderId],
                      )}
                    >
                      <Image
                        src={iconUrl}
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="72px"
                        unoptimized
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[17px] font-semibold leading-snug text-ink">
                        {libraryDayCentreFolderLabel(folderId, cardUiLang)}
                      </p>
                    </div>
                    <span className="text-ink-faint" aria-hidden>
                      →
                    </span>
                  </Link>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
