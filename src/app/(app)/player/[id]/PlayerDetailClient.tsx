"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { use } from "react";
import { Header } from "@/components/navigation/Header";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import {
  playerBackToSchedule,
  playerLoadingSchedule,
  playerNotFound,
  shellBackAria,
} from "@/lib/i18n/app-shell-locale";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";

function SchedulePlayerLoadingLine() {
  const lang = useCardUiLanguage();
  return (
    <div className="px-5 py-14 text-center text-[14px] text-ink-subtle">
      {playerLoadingSchedule(lang)}
    </div>
  );
}

const SchedulePlayerWithProfileRoutine = dynamic(
  () =>
    import("@/components/schedule/SchedulePlayerWithProfileRoutine").then(
      (m) => ({
        default: m.SchedulePlayerWithProfileRoutine,
      }),
    ),
  {
    loading: () => <SchedulePlayerLoadingLine />,
  },
);

export function PlayerDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { routines: custom } = useCustomRoutines();
  const cardUiLang = useCardUiLanguage();
  const routine = resolveAnyRoutine(id, custom);

  if (!routine) {
    return (
      <div className="pb-6">
        <TranslatedHeader titleKey="routine" backHref="/player" />
        <div className="px-5 py-16 text-center">
          <p className="text-[15px] text-ink-subtle">
            {playerNotFound(cardUiLang)}
          </p>
          <Link
            href="/player"
            className="mt-5 inline-block text-[14px] font-medium text-sage underline-offset-4 hover:underline"
          >
            {playerBackToSchedule(cardUiLang)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <Header
        title={stockRoutineDisplayName(routine.id, routine.name, cardUiLang)}
        backHref="/player"
        backAriaLabel={shellBackAria(cardUiLang)}
      />
      <SchedulePlayerWithProfileRoutine routine={routine} backHref="/player" />
    </div>
  );
}
