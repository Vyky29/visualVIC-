"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import {
  clearLibrarySelectionDraft,
  readLibrarySelectionDraft,
} from "@/lib/library/library-selection-draft";
import {
  getPickableLibraryCard,
  routineStepsFromLibraryPick,
} from "@/lib/library/pickable-library-cards";
import {
  bottomNavLabel,
  routineFromLibraryDescription,
  routineNewBackToLibrary,
  routineNewEmptyAfterLibrary,
  routineNewEmptyAfterSelect,
  routineNewEmptyCreateWord,
  routineNewEmptyLead,
  routineNewEmptySelectWord,
  routineNewIntro,
  routineNewMoveDownAria,
  routineNewMoveUpAria,
  routineNewNameFieldLabel,
  routineNewNamePlaceholder,
  routineNewRemoveAria,
  routineNewSaveButton,
  routineNewStepOrdinal,
  routineNewStepsHeading,
  shellHeaderTitle,
  tailoredAddCardsFromLibrary,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import type { GeneratedPixtoRoutineStepData } from "@/lib/types/routine";
import type { Routine } from "@/lib/types/routine";
import { resolveFeaturedRoutineHomePreviewUrl } from "@/lib/routines/resolve-routine-home-preview";
import {
  tailoredParticipantTag,
} from "@/lib/routines/tailored-routine-meta";
import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";

type DraftRow = {
  pickId: string;
  label: string;
  imageUrl: string;
  generatedPixto?: GeneratedPixtoRoutineStepData;
};

export function RoutineNewClient({
  backHref = "/library",
  returnTo,
  participantId,
  participantName,
  editRoutineId,
}: {
  backHref?: string;
  returnTo?: string;
  participantId?: TailoredParticipantId;
  participantName?: string;
  editRoutineId?: string;
} = {}) {
  const router = useRouter();
  const cardUiLang = useCardUiLanguage();
  const { addRoutine, replaceRoutine, routines, hydrated } = useCustomRoutines();
  const [rows, setRows] = useState<DraftRow[]>([]);
  const [name, setName] = useState("My routine");
  const [hydratedDraft, setHydratedDraft] = useState(false);
  const isEdit = Boolean(editRoutineId);

  useEffect(() => {
    if (!hydrated) return;

    if (editRoutineId) {
      const existing = routines.find((r) => r.id === editRoutineId);
      if (existing) {
        setName(existing.name);
        setRows(
          existing.steps.map((step) => ({
            pickId: step.id,
            label: step.title,
            imageUrl:
              step.imageUrl ??
              step.generatedPixto?.illustrationUrl ??
              "",
            generatedPixto: step.generatedPixto,
          })),
        );
        setHydratedDraft(true);
        return;
      }
    }

    const pickIds = readLibrarySelectionDraft();
    const built: DraftRow[] = [];
    for (const pickId of pickIds) {
      const card = getPickableLibraryCard(pickId);
      if (card)
        built.push({
          pickId,
          label: card.label,
          imageUrl: card.imageUrl,
          generatedPixto: card.generatedPixto,
        });
    }
    setRows(built);
    setHydratedDraft(true);
  }, [editRoutineId, hydrated, routines]);

  const moveUp = useCallback((index: number) => {
    if (index <= 0) return;
    setRows((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setRows((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const removeAt = useCallback((index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const canSave = rows.length > 0 && name.trim().length > 0;

  const save = useCallback(() => {
    if (!canSave) return;
    const steps = rows.flatMap((row, i) => {
      const fromPick = routineStepsFromLibraryPick(row.pickId, i);
      if (fromPick.length > 0) return fromPick;
      return [
        {
          id: row.pickId || `lib-step-${i}-saved`,
          title: row.label,
          imageUrl: row.imageUrl || undefined,
          ...(row.generatedPixto ? { generatedPixto: row.generatedPixto } : {}),
        },
      ];
    });

    const id =
      editRoutineId ??
      `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

    const tags = new Set<string>(["custom", "library"]);
    if (participantId) tags.add(tailoredParticipantTag(participantId));

    const routine: Routine = {
      id,
      name: name.trim(),
      description: routineFromLibraryDescription(cardUiLang),
      tags: [...tags],
      homePreviewImageUrl: resolveFeaturedRoutineHomePreviewUrl({
        id,
        name: name.trim(),
        steps,
      }),
      steps,
    };

    if (editRoutineId) replaceRoutine(routine);
    else addRoutine(routine);

    clearLibrarySelectionDraft();
    router.push(returnTo ?? `/player/${id}`);
  }, [
    addRoutine,
    canSave,
    cardUiLang,
    editRoutineId,
    name,
    participantId,
    replaceRoutine,
    returnTo,
    router,
    rows,
  ]);

  const empty = hydratedDraft && rows.length === 0;

  return (
    <div className="pb-28">
      <TranslatedHeader titleKey="newRoutine" backHref={backHref} />
      <div className="border-b border-ink/5 px-4 py-3">
        <p className="text-[18px] font-semibold leading-tight text-ink">
          {shellHeaderTitle("newRoutine", cardUiLang)}
        </p>
        <p className="mt-1 break-words text-[13px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
          {routineNewIntro(cardUiLang)}
        </p>
      </div>
      <div className="space-y-5 px-4 pt-4">
        {empty ? (
          <Card className="space-y-3 border border-ink/5 p-4 text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
            <p>
              {routineNewEmptyLead(cardUiLang)}{" "}
              <Link
                href={backHref}
                className="font-medium text-sage underline-offset-4 hover:underline"
              >
                {participantName ?? bottomNavLabel("library", cardUiLang)}
              </Link>
              {routineNewEmptyAfterLibrary(cardUiLang)}{" "}
              <span className="font-medium text-ink">
                {routineNewEmptySelectWord(cardUiLang)}
              </span>
              {routineNewEmptyAfterSelect(cardUiLang)}{" "}
              <span className="font-medium text-ink">
                {routineNewEmptyCreateWord(cardUiLang)}
              </span>
              .
            </p>
            {participantId ? (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => router.push(backHref)}
              >
                {tailoredAddCardsFromLibrary(cardUiLang)}
              </Button>
            ) : null}
          </Card>
        ) : null}

        {!empty && participantId && !isEdit ? (
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => router.push(backHref)}
          >
            {tailoredAddCardsFromLibrary(cardUiLang)}
          </Button>
        ) : null}

        <label className="block px-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {routineNewNameFieldLabel(cardUiLang)}
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] text-ink outline-none ring-sage/30 focus:ring-2"
            placeholder={routineNewNamePlaceholder(cardUiLang)}
            maxLength={80}
          />
        </label>

        <section className="space-y-2">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            {routineNewStepsHeading(rows.length, cardUiLang)}
          </h2>
          <ul className="flex flex-col gap-2">
            {rows.map((row, index) => (
              <li key={`${row.pickId}-${index}`}>
                <Card className="flex gap-3 border border-ink/5 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas-muted">
                    {row.imageUrl ? (
                      <Image
                        src={row.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={
                          row.imageUrl.startsWith("/cards/") ||
                          row.imageUrl.includes("/cards/")
                        }
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-ink">
                      {row.label}
                    </p>
                    <p className="text-[11px] text-ink-faint">
                      {routineNewStepOrdinal(index + 1, cardUiLang)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1 self-center">
                    <button
                      type="button"
                      aria-label={routineNewMoveUpAria(cardUiLang)}
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      className="rounded-lg px-2 py-1 text-[13px] text-ink disabled:opacity-30 active:bg-ink/10"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label={routineNewMoveDownAria(cardUiLang)}
                      disabled={index === rows.length - 1}
                      onClick={() => moveDown(index)}
                      className="rounded-lg px-2 py-1 text-[13px] text-ink disabled:opacity-30 active:bg-ink/10"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label={routineNewRemoveAria(cardUiLang)}
                      onClick={() => removeAt(index)}
                      className="rounded-lg px-2 py-1 text-[13px] text-ink-subtle active:bg-ink/10"
                    >
                      ✕
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            type="button"
            variant="primary"
            disabled={!canSave}
            onClick={save}
            className="w-full"
          >
            {routineNewSaveButton(cardUiLang)}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(returnTo ?? backHref)}
            className="w-full"
          >
            {routineNewBackToLibrary(cardUiLang)}
          </Button>
        </div>
      </div>
    </div>
  );
}
