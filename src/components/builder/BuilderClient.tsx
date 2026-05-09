"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { mockTemplates } from "@/lib/mock/templates";
import { mockRoutines } from "@/lib/mock/routines";
import type { Routine } from "@/lib/types/routine";

function cloneRoutine(r: Routine): Routine {
  return {
    ...r,
    id: `draft-${r.id}-${Date.now()}`,
    steps: r.steps.map((s, i) => ({
      ...s,
      id: `${s.id}-copy-${i}`,
    })),
  };
}

export function BuilderClient({ templateId }: { templateId?: string }) {
  const router = useRouter();

  const { draft: initial, previewRoutineId } = useMemo(() => {
    if (templateId) {
      const t =
        mockTemplates.find((x) => x.id === templateId) ?? mockTemplates[0];
      return {
        draft: cloneRoutine(t),
        previewRoutineId: t.id,
      };
    }
    const base = mockRoutines[0];
    return {
      draft: cloneRoutine(base),
      previewRoutineId: base.id,
    };
  }, [templateId]);

  const [draft, setDraft] = useState<Routine>(initial);

  const resetSource = useMemo(() => {
    if (templateId) {
      return (
        mockTemplates.find((x) => x.id === templateId) ?? mockTemplates[0]
      );
    }
    return mockRoutines[0];
  }, [templateId]);

  return (
    <div className="space-y-8 px-4 pb-12 pt-3">
      <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
        Rename steps for clarity — visuals stay on mock art until your library
        is connected.
      </p>

      <Card className="space-y-4 bg-white/95">
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-ink-subtle">
            Routine name
          </span>
          <input
            value={draft.name}
            onChange={(e) =>
              setDraft((d) => ({ ...d, name: e.target.value }))
            }
            className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] font-medium outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
          />
        </label>
      </Card>

      <section className="space-y-3">
        <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Steps
        </h2>
        <ol className="flex flex-col gap-3">
          {draft.steps.map((step, index) => (
            <li key={step.id}>
              <Card className="border border-ink/5 bg-cream/80 p-4 shadow-card">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Step {index + 1}
                </p>
                <input
                  value={step.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setDraft((d) => ({
                      ...d,
                      steps: d.steps.map((s) =>
                        s.id === step.id ? { ...s, title } : s,
                      ),
                    }));
                  }}
                  className="mt-2 w-full rounded-xl border border-transparent bg-white px-3 py-2.5 text-[16px] outline-none ring-1 ring-ink/8 transition focus:ring-sage"
                />
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="primary"
          className="min-h-touch w-full"
          onClick={() => router.push(`/player/${previewRoutineId}`)}
        >
          Preview in Schedule Player
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="min-h-touch w-full"
          onClick={() => setDraft(cloneRoutine(resetSource))}
        >
          Reset from defaults
        </Button>
      </div>
      <p className="text-center text-[12px] text-ink-faint">
        Draft stays on this device until sync ships.
      </p>
    </div>
  );
}
