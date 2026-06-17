import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StaffAccessProvider } from "@/contexts/StaffAccessContext";

export default function AppGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StaffAccessProvider>
      <AppShell showNav>{children}</AppShell>
    </StaffAccessProvider>
  );
}
