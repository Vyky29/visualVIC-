import { PlayerDetailClient } from "./PlayerDetailClient";

type Props = { params: Promise<{ id: string }> };

export default function PlayerDetailPage({ params }: Props) {
  return <PlayerDetailClient params={params} />;
}
