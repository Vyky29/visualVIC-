"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStaffAccess } from "@/contexts/StaffAccessContext";

/** Legacy route — stock + saved routines live in Schedule Player. */
export function TemplatesPageClient() {
  const router = useRouter();
  const { isRestricted, status } = useStaffAccess();

  useEffect(() => {
    if (status === "loading") return;
    if (isRestricted) {
      router.replace("/dashboard");
      return;
    }
    router.replace("/player");
  }, [isRestricted, router, status]);

  return (
    <div className="flex min-h-[40dvh] items-center justify-center px-6 text-[14px] text-ink-subtle">
      …
    </div>
  );
}
