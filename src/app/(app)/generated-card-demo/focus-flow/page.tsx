import { HOTEL_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";
import { GeneratedWowFocusFlowClient } from "./GeneratedWowFocusFlowClient";

type Props = {
  searchParams?: Promise<{ start?: string }>;
};

export default async function GeneratedWowFocusFlowPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const raw = Number.parseInt(resolvedSearchParams.start ?? "0", 10);
  const startIndex = Number.isFinite(raw)
    ? Math.max(0, Math.min(raw, HOTEL_GENERATED_CARD_PROPS.length - 1))
    : 0;

  return <GeneratedWowFocusFlowClient startIndex={startIndex} />;
}
