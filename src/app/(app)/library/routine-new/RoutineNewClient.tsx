"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/navigation/Header";
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
import type { Routine } from "@/lib/types/routine";

type DraftRow = { pickId: string; label: string; imageUrl: string };

export function RoutineNewClient() {
  const router = useRouter();
  const { addRoutine } = useCustomRoutines();
  const [rows, setRows] = useState<DraftRow[]>([]);
  const [name, setName] = useState("My routine");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const pickIds = readLibrarySelectionDraft();
    const built: DraftRow[] = [];
    for (const pickId of pickIds) {
      const card = getPickableLibraryCard(pickId);
      if (card)
        built.push({
          pickId,
          label: card.label,
          imageUrl: card.imageUrl,
        });
    }
    setRows(built);
    setHydrated(true);
  }, []);

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
    const steps = rows.flatMap((row, i) =>
      routineStepsFromLibraryPick(row.pickId, i),
    );
    const id = `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const routine: Routine = {
      id,
      name: name.trim(),
      description: "Created from Visual library",
      tags: ["custom", "library"],
      homePreviewImageUrl: steps[0]?.imageUrl,
      steps,
    };
    addRoutine(routine);
    clearLibrarySelectionDraft();
    router.push(`/player/${id}`);
  }, [addRoutine, canSave, name, rows, router]);

  const empty = hydrated && rows.length === 0;

  return (
    <div className="pb-28">
      <Header title="New routine" backHref="/library" />
      <div className="border-b border-ink/5 px-4 py-3">
        <p className="text-[18px] font-semibold leading-tight text-ink">
          New routine
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">
          Name the routine, reorder the steps, and save on this device. If you
          opened this without picking cards, go to Library, tap the cards you
          want, then tap Create routine in the header.
        </p>
      </div>
      <div className="space-y-5 px-4 pt-4">
        {empty ? (
          <Card className="border border-ink/5 p-4 text-[14px] text-ink-subtle">
            No cards selected. Go to{" "}
            <Link href="/library" className="font-medium text-sage underline-offset-4 hover:underline">
              Library
            </Link>
            , tap <span className="font-medium text-ink">Select</span>, choose
            cards, then <span className="font-medium text-ink">Create routine</span>.
          </Card>
        ) : null}

        <label className="block px-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Routine name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] text-ink outline-none ring-sage/30 focus:ring-2"
            placeholder="Name"
            maxLength={80}
          />
        </label>

        <section className="space-y-2">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Steps ({rows.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {rows.map((row, index) => (
              <li key={`${row.pickId}-${index}`}>
                <Card className="flex gap-3 border border-ink/5 p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas-muted">
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
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-ink">
                      {row.label}
                    </p>
                    <p className="text-[11px] text-ink-faint">
                      Step {index + 1}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1 self-center">
                    <button
                      type="button"
                      aria-label="Move up"
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      className="rounded-lg px-2 py-1 text-[13px] text-ink disabled:opacity-30 active:bg-ink/10"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={index === rows.length - 1}
                      onClick={() => moveDown(index)}
                      className="rounded-lg px-2 py-1 text-[13px] text-ink disabled:opacity-30 active:bg-ink/10"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label="Remove"
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
            Save routine locally
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/library")}
            className="w-full"
          >
            Back to library
          </Button>
        </div>
      </div>
    </div>
  );
}
