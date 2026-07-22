"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { useStaffAccess } from "@/contexts/StaffAccessContext";
import { mockRoutines } from "@/lib/mock/routines";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import {
  dashboardStepsWord,
  playerKindFirstThen,
  playerKindRoutine,
  shellBackAria,
  tailoredAddScheduleButton,
  tailoredEditScheduleButton,
  tailoredParticipantSchedulesIntro,
} from "@/lib/i18n/app-shell-locale";
import {
  canEditTailoredParticipantSchedule,
  tailoredParticipantEditScheduleHref,
  tailoredParticipantLibraryHref,
} from "@/lib/routines/tailored-routine-meta";
import {
  IKRAM_FIRST_THEN_PACKS,
  ikramFirstThenPackDisplayTitle,
  ikramFirstThenPackHref,
  ikramFirstThenPackPreviewUrl,
} from "@/lib/routines/ikram-first-then-packs";
import {
  EMMANUEL_FIRST_THEN_PACKS,
  emmanuelFirstThenPackDisplayTitle,
  emmanuelFirstThenPackHref,
  emmanuelFirstThenPackPreviewUrl,
} from "@/lib/routines/emmanuel-first-then-packs";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS } from "@/lib/constants/generated-pixto-card-sizes";
import { cn } from "@/lib/utils/cn";
import { APP_SHELL_TABLET_INSET_CLASS } from "@/lib/constants/app-shell-layout";
import { resolveSchedulePlayerIndexPreviewUrl } from "@/lib/routines/resolve-routine-home-preview";
import {
  isTailoredParticipantId,
  resolveTailoredParticipantSchedules,
  tailoredParticipantDisplayName,
} from "@/lib/routines/tailored-participants";
import {
  routineSchedulePlayerIndexCardClass,
  routineVisualTone,
  type RoutineVisualTone,
} from "@/lib/utils/routine-accent";
import {
  isPixtoLearnBundledCardUrl,
  isPixtoLearnFullBleedCardUrl,
  isPixtoLearnIllustrationOnlyUrl,
  pixtoBundledCardObjectPositionTopClass,
} from "@/lib/utils/visual-card-url";

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
  ayaan: "border-[#1E4A73]/24 bg-[#e8eef5]/95 text-[#1E4A73]",
  physical: "border-[#43A047]/24 bg-[#e8f5e9]/95 text-[#2E7D32]",
  finish: "border-[#9aa3a8]/24 bg-[#eef1f2]/95 text-[#7c858b]",
  custom: "border-ink/12 bg-canvas-muted text-ink-subtle",
  default: "border-sage/18 bg-sage-mist/70 text-sage",
};

type Props = { params: Promise<{ participant: string }> };

export function TailoredParticipantSchedulesClient({ params }: Props) {
  const { participant: participantParam } = use(params);
  const cardUiLang = useCardUiLanguage();
  const router = useRouter();
  const { canAccessTailoredParticipant, status: staffStatus } = useStaffAccess();
  const { routines: customRoutines, hydrated: customHydrated } =
    useCustomRoutines();

  const participantId = isTailoredParticipantId(participantParam)
    ? participantParam
    : null;

  const schedules = useMemo(() => {
    if (!participantId) return [];
    const catalog = customHydrated
      ? [...customRoutines, ...mockRoutines]
      : mockRoutines;
    return resolveTailoredParticipantSchedules(participantId, catalog);
  }, [customHydrated, customRoutines, participantId]);

  useEffect(() => {
    if (!participantId || staffStatus === "loading") return;
    if (!canAccessTailoredParticipant(participantId)) {
      router.replace("/dashboard");
    }
  }, [
    canAccessTailoredParticipant,
    participantId,
    router,
    staffStatus,
  ]);

  if (!participantId) {
    notFound();
  }

  if (
    staffStatus !== "loading" &&
    !canAccessTailoredParticipant(participantId)
  ) {
    return null;
  }

  const participantName = tailoredParticipantDisplayName(participantId);
  const firstThenPacks =
    participantId === "ikram"
      ? IKRAM_FIRST_THEN_PACKS.map((pack) => ({
          id: pack.id,
          href: ikramFirstThenPackHref(pack.id),
          previewUrl: ikramFirstThenPackPreviewUrl(pack.id),
          title: ikramFirstThenPackDisplayTitle(pack.id, cardUiLang),
        }))
      : participantId === "emmanuel"
        ? EMMANUEL_FIRST_THEN_PACKS.map((pack) => ({
            id: pack.id,
            href: emmanuelFirstThenPackHref(pack.id),
            previewUrl: emmanuelFirstThenPackPreviewUrl(pack.id),
            title: emmanuelFirstThenPackDisplayTitle(pack.id, cardUiLang),
          }))
        : [];

  return (
    <div>
      <Header
        title={participantName}
        backHref="/dashboard"
        backAriaLabel={shellBackAria(cardUiLang)}
      />
      <div className={cn("space-y-4 px-4 pb-8 pt-2", APP_SHELL_TABLET_INSET_CLASS)}>
        <p className="break-words px-1 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {tailoredParticipantSchedulesIntro(participantName, cardUiLang)}
        </p>
        <div className="px-1">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => router.push(tailoredParticipantLibraryHref(participantId))}
          >
            {tailoredAddScheduleButton(cardUiLang)}
          </Button>
        </div>
        <ul className="flex flex-col gap-3">
          {firstThenPacks.map((pack) => {
            const previewUrl = pack.previewUrl;
            const previewPixto =
              Boolean(previewUrl) &&
              (isPixtoLearnBundledCardUrl(previewUrl) ||
                isPixtoLearnIllustrationOnlyUrl(previewUrl));
            const fullBleedPixto = isPixtoLearnFullBleedCardUrl(previewUrl);
            const sceneIllustration = isPixtoLearnIllustrationOnlyUrl(previewUrl);
            const fillSquareIcon = fullBleedPixto || sceneIllustration;

            return (
              <li key={pack.id} className="group">
                <Card
                  omitInsetRing
                  className={cn(
                    "overflow-hidden p-0 shadow-card transition-shadow duration-200",
                    participantId === "emmanuel"
                      ? "border-[#1E4A73]/24 bg-[#e8eef5]/95 text-[#1E4A73]"
                      : "border-[#E05C9A]/24 bg-[#fde8f4]/95 text-[#E05C9A]",
                  )}
                >
                  <Link
                    href={pack.href}
                    className="flex gap-4 p-4 transition hover:bg-white/60"
                  >
                    <div
                      className={cn(
                        "relative h-[72px] w-[72px] shrink-0 overflow-hidden",
                        previewPixto
                          ? cn("bg-white", GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS)
                          : "bg-canvas-muted",
                      )}
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt=""
                          fill
                          unoptimized={isPixtoLearnBundledCardUrl(previewUrl)}
                          className={cn(
                            "object-cover object-center",
                            fillSquareIcon &&
                              cn(
                                pixtoBundledCardObjectPositionTopClass,
                                "!h-[132%] !max-h-none w-full",
                              ),
                          )}
                          style={
                            fillSquareIcon ? { top: 0, bottom: "auto" } : undefined
                          }
                          sizes="72px"
                        />
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <p className="line-clamp-2 min-w-0 break-words text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint [overflow-wrap:anywhere]">
                        {playerKindFirstThen(cardUiLang)}
                      </p>
                      <p className="line-clamp-2 min-w-0 break-words text-[17px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                        {pack.title}
                      </p>
                      <span
                        className={cn(
                          "inline-flex w-fit max-w-full min-w-0 items-center rounded-full border px-2.5 py-1 text-[12px] font-medium leading-snug [overflow-wrap:anywhere]",
                          participantId === "emmanuel"
                            ? STEP_CHIP_CLASS.ayaan
                            : STEP_CHIP_CLASS.tailored,
                        )}
                      >
                        2 {dashboardStepsWord(cardUiLang)}
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
          {schedules.map((routine) => {
            const previewUrl = resolveSchedulePlayerIndexPreviewUrl(routine);
            const previewPixto =
              Boolean(previewUrl) &&
              (isPixtoLearnBundledCardUrl(previewUrl) ||
                Boolean(routine.steps[0]?.generatedPixto));
            const fullBleedPixto = isPixtoLearnFullBleedCardUrl(previewUrl);
            const sceneIllustration = isPixtoLearnIllustrationOnlyUrl(previewUrl);
            const fillSquareIcon = fullBleedPixto || sceneIllustration;
            const tone = routineVisualTone(routine);
            const editable = canEditTailoredParticipantSchedule(
              routine,
              participantId,
            );

            return (
              <li key={routine.id} className="group">
                <Card
                  omitInsetRing
                  className={cn(
                    "overflow-hidden p-0 shadow-card transition-shadow duration-200",
                    routineSchedulePlayerIndexCardClass(routine),
                  )}
                >
                  <div className="flex items-stretch">
                  <Link
                    href={`/player/${routine.id}`}
                    className="flex min-w-0 flex-1 gap-4 p-4 transition hover:bg-white/60"
                  >
                    <div
                      className={cn(
                        "relative h-[72px] w-[72px] shrink-0 overflow-hidden",
                        previewPixto
                          ? cn("bg-white", GENERATED_PIXTO_CARD_CORNER_RADIUS_CLASS)
                          : "bg-canvas-muted",
                      )}
                    >
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt=""
                          fill
                          unoptimized={isPixtoLearnBundledCardUrl(previewUrl)}
                          className={cn(
                            "object-cover object-center",
                            fillSquareIcon &&
                              cn(
                                pixtoBundledCardObjectPositionTopClass,
                                "!h-[132%] !max-h-none w-full",
                              ),
                          )}
                          style={
                            fillSquareIcon ? { top: 0, bottom: "auto" } : undefined
                          }
                          sizes="72px"
                        />
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <p className="line-clamp-2 min-w-0 break-words text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint [overflow-wrap:anywhere]">
                        {playerKindRoutine(cardUiLang)}
                      </p>
                      <p className="line-clamp-2 min-w-0 break-words text-[17px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
                        {stockRoutineDisplayName(
                          routine.id,
                          routine.name,
                          cardUiLang,
                        )}
                      </p>
                      <span
                        className={cn(
                          "inline-flex w-fit max-w-full min-w-0 items-center rounded-full border px-2.5 py-1 text-[12px] font-medium leading-snug [overflow-wrap:anywhere]",
                          STEP_CHIP_CLASS[tone],
                        )}
                      >
                        {routine.steps.length} {dashboardStepsWord(cardUiLang)}
                      </span>
                    </div>
                    <span className="self-center pr-1 text-ink-faint" aria-hidden>
                      →
                    </span>
                  </Link>
                  {editable ? (
                    <Link
                      href={tailoredParticipantEditScheduleHref(
                        participantId,
                        routine.id,
                      )}
                      className="flex w-14 shrink-0 flex-col items-center justify-center border-l border-ink/8 text-[11px] font-semibold uppercase tracking-wide text-sage transition hover:bg-sage/5 active:bg-sage/10"
                    >
                      {tailoredEditScheduleButton(cardUiLang)}
                    </Link>
                  ) : null}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
