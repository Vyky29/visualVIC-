"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { mockRoutines, resolveRoutineById } from "@/lib/mock/routines";
import { useSavedRoutines } from "@/contexts/SavedRoutines";

export function SavedListClient() {
  const router = useRouter();
  const { ids, toggle } = useSavedRoutines();

  const saved = ids
    .map((id) => resolveRoutineById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  if (saved.length === 0) {
    return (
      <Card className="text-center">
        <p className="text-[15px] font-medium text-ink">Nothing saved yet</p>
        <p className="mt-2 text-[14px] text-ink-subtle">
          Save a routine from the dashboard cards or templates to pin it here.
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
    <ul className="flex flex-col gap-3">
      {saved.map((r) => (
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
                Remove
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
