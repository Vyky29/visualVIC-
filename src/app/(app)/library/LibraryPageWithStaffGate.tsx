"use client";

import { LibraryPageClient } from "./LibraryPageClient";
import { useStaffAccess } from "@/contexts/StaffAccessContext";
import type { LibrarySectionId } from "./LibraryPageClient";
import type { PlannerLibrarySectionId } from "@/lib/staff/planner-access";
import { tailoredPickCardsHint } from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

export function LibraryPageWithStaffGate({
  focusSection,
  routineNewHref,
  returnTo,
  participantName,
}: {
  focusSection?: LibrarySectionId;
  routineNewHref?: string;
  returnTo?: string;
  participantName?: string;
} = {}) {
  const { allowedLibrarySections } = useStaffAccess();
  const cardUiLang = useCardUiLanguage();
  const introBlurbText =
    participantName !== undefined
      ? tailoredPickCardsHint(participantName, cardUiLang)
      : undefined;

  return (
    <LibraryPageClient
      allowedSections={
        allowedLibrarySections as ReadonlySet<LibrarySectionId> | undefined
      }
      focusSection={focusSection}
      routineNewHref={routineNewHref}
      returnTo={returnTo}
      introBlurbText={introBlurbText}
    />
  );
}
