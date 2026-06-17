import { FirstThenExperience } from "@/components/first-then/FirstThenExperience";
import { StaffRestrictedRedirect } from "@/components/staff/StaffRestrictedRedirect";

export default function FirstThenPage() {
  return (
    <StaffRestrictedRedirect>
      <FirstThenExperience />
    </StaffRestrictedRedirect>
  );
}
