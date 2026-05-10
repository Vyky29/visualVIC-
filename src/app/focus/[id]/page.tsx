import { FocusDetailClient } from "./FocusDetailClient";

type Props = { params: Promise<{ id: string }> };

export default function FocusPage({ params }: Props) {
  return <FocusDetailClient params={params} />;
}
