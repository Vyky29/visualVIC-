"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LibraryPageWithStaffGate } from "./LibraryPageWithStaffGate";
import type { LibrarySectionId } from "./LibraryPageClient";
import {
  isTailoredParticipantId,
  tailoredParticipantDisplayName,
  type TailoredParticipantId,
} from "@/lib/routines/tailored-participants";
import {
  participantLibrarySectionId,
  tailoredParticipantNewScheduleHref,
} from "@/lib/routines/tailored-routine-meta";

function LibraryPageWithQueryInner() {
  const searchParams = useSearchParams();
  const participantParam = searchParams.get("participant");
  const returnTo = searchParams.get("returnTo") ?? undefined;
  const participantId = isTailoredParticipantId(participantParam ?? "")
    ? (participantParam as TailoredParticipantId)
    : undefined;

  const focusSection: LibrarySectionId | undefined = participantId
    ? participantLibrarySectionId(participantId)
    : undefined;

  const routineNewHref = participantId
    ? tailoredParticipantNewScheduleHref(participantId)
    : "/library/routine-new";

  return (
    <LibraryPageWithStaffGate
      focusSection={focusSection}
      routineNewHref={routineNewHref}
      returnTo={returnTo}
      participantName={
        participantId ? tailoredParticipantDisplayName(participantId) : undefined
      }
    />
  );
}

export function LibraryPageWithQuery() {
  return (
    <Suspense fallback={null}>
      <LibraryPageWithQueryInner />
    </Suspense>
  );
}
