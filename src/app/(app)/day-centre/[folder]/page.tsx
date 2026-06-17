import { DayCentreFolderSchedulesClient } from "./DayCentreFolderSchedulesClient";

type Props = { params: Promise<{ folder: string }> };

export default function DayCentreFolderSchedulesPage({ params }: Props) {
  return <DayCentreFolderSchedulesClient params={params} />;
}

export function generateStaticParams() {
  return [
    { folder: "mini-gym" },
    { folder: "bouldering" },
    { folder: "cooking" },
    { folder: "community" },
    { folder: "mixed" },
  ];
}
