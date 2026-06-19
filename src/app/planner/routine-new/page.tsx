"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RoutineNewClient } from "@/app/(app)/library/routine-new/RoutineNewClient";

function PlannerRoutineNewInner() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit") ?? undefined;

  return (
    <RoutineNewClient
      backHref="/planner"
      returnTo="/day-centre/mixed"
      dayCentreMixedSchedule
      editRoutineId={editId}
    />
  );
}

export default function PlannerRoutineNewPage() {
  return (
    <Suspense fallback={null}>
      <PlannerRoutineNewInner />
    </Suspense>
  );
}
