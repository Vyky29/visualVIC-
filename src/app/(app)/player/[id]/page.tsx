import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { mockRoutines, resolveRoutineById } from "@/lib/mock/routines";
import { mockTemplates } from "@/lib/mock/templates";

const SchedulePlayerWithProfileRoutine = dynamic(
  () =>
    import("@/components/schedule/SchedulePlayerWithProfileRoutine").then(
      (m) => ({
        default: m.SchedulePlayerWithProfileRoutine,
      }),
    ),
  {
    loading: () => (
      <div className="px-5 py-14 text-center text-[14px] text-ink-subtle">
        Loading schedule…
      </div>
    ),
  },
);

type Props = { params: Promise<{ id: string }> };

export default async function PlayerDetailPage({ params }: Props) {
  const { id } = await params;
  const routine = resolveRoutineById(id);
  if (!routine) notFound();

  return (
    <div className="pb-6">
      <Header title={routine.name} backHref="/player" />
      <SchedulePlayerWithProfileRoutine routine={routine} backHref="/player" />
    </div>
  );
}

export async function generateStaticParams() {
  const ids = [
    ...mockRoutines.map((r) => r.id),
    ...mockTemplates.map((t) => t.id),
  ];
  return ids.map((id) => ({ id }));
}
