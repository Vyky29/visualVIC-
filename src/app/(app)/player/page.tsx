"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Card } from "@/components/ui/Card";
import { mockRoutines } from "@/lib/mock/routines";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import {
  dashboardStepsWord,
  playerIndexIntro,
  playerKindRoutine,
} from "@/lib/i18n/app-shell-locale";
import { useSchedulePlayerRecentOrder } from "@/lib/preferences/use-schedule-player-recent-order";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS } from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";
import {
  isStockPackRoutine,
  routineSchedulePlayerIndexCardClass,
  routineVisualTone,
  type RoutineVisualTone,
} from "@/lib/utils/routine-accent";
import { isPixtoLearnBundledCardUrl } from "@/lib/utils/visual-card-url";

const STEP_CHIP_CLASS: Record<RoutineVisualTone, string> = {
  brushing: "border-[#91C24C]/30 bg-sage-mist/85 text-[#6a8f3a]",
  shower: "border-[#143d66]/20 bg-[#e8eef5]/95 text-[#143d66]",
  climbing: "border-[#E9AE2E]/28 bg-[#faf6ea]/95 text-[#9a7820]",
  dress: "border-[#6B4E9E]/24 bg-[#f0ebf7]/95 text-[#5c4488]",
  core: "border-[#6b8f9e]/24 bg-[#e9eef1]/95 text-[#4a6572]",
  swimming: "border-[#4a8fa8]/24 bg-[#e8f4f7]/95 text-[#3d7a8f]",
  airport: "border-[#d4a017]/26 bg-[#fff9ed]/95 text-[#9a7208]",
  hotel: "border-[#8C1E2E]/24 bg-[#fdeef0]/95 text-[#8C1E2E]",
  daycentre: "border-[#E53935]/24 bg-[#ffebee]/95 text-[#E53935]",
  tailored: "border-[#E05C9A]/24 bg-[#fde8f4]/95 text-[#E05C9A]",
  physical: "border-[#43A047]/24 bg-[#e8f5e9]/95 text-[#2E7D32]",
  finish: "border-[#9aa3a8]/24 bg-[#eef1f2]/95 text-[#7c858b]",
  custom: "border-ink/12 bg-canvas-muted text-ink-subtle",
  default: "border-sage/18 bg-sage-mist/70 text-sage",
};

export default function PlayerIndexPage() {
  const cardUiLang = useCardUiLanguage();
  /** Single-pack catalog routines only — hide modular demos until image API ships. */
  const stockRoutines = useMemo(
    () => mockRoutines.filter(isStockPackRoutine),
    [],
  );
  const sortedRoutines = useSchedulePlayerRecentOrder(stockRoutines);

  return (
    <div>
      <TranslatedHeader titleKey="schedulePlayer" backHref="/dashboard" />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {playerIndexIntro(cardUiLang)}
        </p>
        <ul className="flex flex-col gap-3">
          {sortedRoutines.map((r) => {
            const previewUrl = r.homePreviewImageUrl ?? r.steps[0]?.imageUrl;
            const previewPixto =
              Boolean(previewUrl) &&
              (isPixtoLearnBundledCardUrl(previewUrl) ||
                Boolean(r.steps[0]?.generatedPixto));
            const tone = routineVisualTone(r);
            return (
              <li key={r.id} className="group">
                <Card
                  omitInsetRing
                  className={cn(
                    "overflow-hidden p-0 shadow-card transition-shadow duration-200",
                    routineSchedulePlayerIndexCardClass(r),
                  )}
                >
                  <Link
                    href={`/player/${r.id}`}
                    className="flex gap-4 p-4 transition hover:bg-white/60"
                  >
                    <div
                      className={cn(
                        "relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-canvas-muted",
                        previewPixto && GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS,
                      )}
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <p className="line-clamp-2 min-w-0 break-words text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint [overflow-wrap:anywhere]">
                        {playerKindRoutine(cardUiLang)}
                      </p>
                      <p className="line-clamp-2 min-w-0 break-words text-[17px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                        {stockRoutineDisplayName(r.id, r.name, cardUiLang)}
                      </p>
                      <span
                        className={cn(
                          "inline-flex w-fit max-w-full min-w-0 items-center rounded-full border px-2.5 py-1 text-[12px] font-medium leading-snug [overflow-wrap:anywhere]",
                          STEP_CHIP_CLASS[tone],
                        )}
                      >
                        {r.steps.length} {dashboardStepsWord(cardUiLang)}
                      </span>
                    </div>
                    <span className="self-center text-ink-faint" aria-hidden>
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
