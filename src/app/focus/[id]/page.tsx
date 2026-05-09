import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { resolveRoutineById } from "@/lib/mock/routines";

const FocusMode = dynamic(
  () =>
    import("@/components/schedule/FocusMode").then((m) => ({
      default: m.FocusMode,
    })),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060807] text-[14px] text-cream/55">
        Loading…
      </div>
    ),
  },
);

type Props = { params: Promise<{ id: string }> };

export default async function FocusPage({ params }: Props) {
  const { id } = await params;
  const routine = resolveRoutineById(id);
  if (!routine) notFound();

  return <FocusMode routine={routine} exitHref={`/player/${id}`} />;
}
