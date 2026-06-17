"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { use } from "react";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";

const FocusModeWithProfileRoutine = dynamic(
  () =>
    import("@/components/schedule/FocusModeWithProfileRoutine").then((m) => ({
      default: m.FocusModeWithProfileRoutine,
    })),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[14px] text-cream/70">
        Loading…
      </div>
    ),
  },
);

export function FocusDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { routines: custom } = useCustomRoutines();
  const routine = resolveAnyRoutine(id, custom);

  if (!routine) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-center">
        <p className="text-[15px] text-cream/70">Routine not found.</p>
        <Link
          href="/player"
          className="mt-5 text-[14px] font-medium text-sage underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <FocusModeWithProfileRoutine
      routine={routine}
      exitHref={`/player/${id}`}
    />
  );
}
