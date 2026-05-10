"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockRoutines } from "@/lib/mock/routines";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { useSavedRoutines } from "@/contexts/SavedRoutines";
import type { Routine } from "@/lib/types/routine";

export function SavedListClient() {
  const router = useRouter();
  const { ids, toggle } = useSavedRoutines();
  const { routines: customRoutines, removeRoutine, hydrated } =
    useCustomRoutines();

  const pinnedRoutines = useMemo((): Routine[] => {
    const customIds = new Set(customRoutines.map((c) => c.id));
    return ids
      .filter((id) => !customIds.has(id))
      .map((id) => resolveAnyRoutine(id, customRoutines))
      .filter((r): r is Routine => Boolean(r));
  }, [ids, customRoutines]);

  const showCreated = hydrated && customRoutines.length > 0;
  const showPinned = pinnedRoutines.length > 0;
  const totallyEmpty = !showCreated && !showPinned;

  if (totallyEmpty) {
    return (
      <Card className="text-center">
        <p className="text-[15px] font-medium text-ink">Nothing saved yet</p>
        <p className="mt-2 text-[14px] text-ink-subtle">
          Pin routines from Home, or create one from the{" "}
          <span className="font-medium text-ink">Library</span> (Select → Create
          routine).
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {mockRoutines.slice(0, 2).map((r) => (
            <Button
              key={r.id}
              type="button"
              variant="secondary"
              onClick={() => toggle(r.id)}
            >
              Save “{r.name}”
            </Button>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {showCreated ? (
        <section className="space-y-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Your routines
          </h2>
          <ul className="flex flex-col gap-3">
            {customRoutines.map((r) => (
              <li key={r.id}>
                <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[17px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[13px] text-ink-subtle">
                      {r.steps.length} steps · from Library
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => router.push(`/player/${r.id}`)}
                    >
                      Play
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        if (ids.includes(r.id)) toggle(r.id);
                        removeRoutine(r.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showPinned ? (
        <section className="space-y-3">
          <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Pinned
          </h2>
          <ul className="flex flex-col gap-3">
            {pinnedRoutines.map((r) => (
              <li key={r.id}>
                <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[17px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[13px] text-ink-subtle">
                      {r.steps.length} steps
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => router.push(`/player/${r.id}`)}
                    >
                      Play
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => toggle(r.id)}
                    >
                      Unpin
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
