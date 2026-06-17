"use client";

import { LibraryPageClient } from "./LibraryPageClient";
import { useStaffAccess } from "@/contexts/StaffAccessContext";
import type { LibrarySectionId } from "./LibraryPageClient";
import type { PlannerLibrarySectionId } from "@/lib/staff/planner-access";

export function LibraryPageWithStaffGate() {
  const { allowedLibrarySections } = useStaffAccess();
  return (
    <LibraryPageClient
      allowedSections={
        allowedLibrarySections as ReadonlySet<LibrarySectionId> | undefined
      }
    />
  );
}
