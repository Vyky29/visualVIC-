"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { mockRoutines } from "@/lib/mock/routines";
import { mockTemplates } from "@/lib/mock/templates";

export default function PlayerIndexPage() {
  const { routines: customRoutines, hydrated: customHydrated } =
    useCustomRoutines();
  const combined = useMemo(
    () => [
      ...(customHydrated
        ? customRoutines.map((r) => ({ ...r, kind: "Routine" as const }))
        : []),
      ...mockRoutines.map((r) => ({ ...r, kind: "Routine" as const })),
      ...mockTemplates.map((r) => ({ ...r, kind: "Template" as const })),
    ],
    [customHydrated, customRoutines],
  );

  return (
    <div>
      <Header title="Schedule Player" backHref="/dashboard" />
      <div className="space-y-4 px-4 pb-8 pt-2">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Choose a mock routine. Each opens the vertical player with Now / Next /
          Finished and swipe to complete.
        </p>
        <ul className="flex flex-col gap-3">
          {combined.map((r) => {
            const previewUrl = r.homePreviewImageUrl ?? r.steps[0]?.imageUrl;
            return (
              <li key={r.id}>
                <Card className="overflow-hidden p-0">
                  <Link
                    href={`/player/${r.id}`}
                    className="flex gap-4 p-4 transition hover:bg-white/60"
                  >
                    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-canvas-muted">
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
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        {r.kind}
                      </p>
                      <p className="truncate text-[17px] font-semibold text-ink">
                        {r.name}
                      </p>
                      <p className="text-[13px] text-ink-subtle">
                        {r.steps.length} steps
                      </p>
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
