import { TailoredParticipantSchedulesClient } from "./TailoredParticipantSchedulesClient";

type Props = { params: Promise<{ participant: string }> };

export default function TailoredParticipantSchedulesPage({ params }: Props) {
  return <TailoredParticipantSchedulesClient params={params} />;
}

export function generateStaticParams() {
  return [
    { participant: "ikram" },
    { participant: "serine" },
    { participant: "ayaan" },
    { participant: "emmanuel" },
    { participant: "cyrus" },
    { participant: "timi" },
  ];
}
