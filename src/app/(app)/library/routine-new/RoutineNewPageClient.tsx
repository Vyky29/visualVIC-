"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RoutineNewClient } from "./RoutineNewClient";
import {
  isTailoredParticipantId,
  tailoredParticipantDisplayName,
  type TailoredParticipantId,
} from "@/lib/routines/tailored-participants";
import { tailoredParticipantLibraryHref } from "@/lib/routines/tailored-routine-meta";

function RoutineNewPageInner() {
  const searchParams = useSearchParams();
  const participantParam = searchParams.get("participant");
  const returnToParam = searchParams.get("returnTo");
  const editId = searchParams.get("edit") ?? undefined;

  const participantId = isTailoredParticipantId(participantParam ?? "")
    ? (participantParam as TailoredParticipantId)
    : undefined;

  const returnTo =
    returnToParam ??
    (participantId ? `/tailored/${participantId}` : undefined);

  const backHref = participantId
    ? tailoredParticipantLibraryHref(participantId)
    : "/library";

  return (
    <RoutineNewClient
      backHref={backHref}
      returnTo={returnTo}
      participantId={participantId}
      editRoutineId={editId}
      participantName={
        participantId ? tailoredParticipantDisplayName(participantId) : undefined
      }
    />
  );
}

export function RoutineNewPageClient() {
  return (
    <Suspense fallback={null}>
      <RoutineNewPageInner />
    </Suspense>
  );
}
