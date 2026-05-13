import { redirect } from "next/navigation";

/** Visiting `/` opens the marketing welcome flow; in-app Home uses `/dashboard`. */
export default function Page() {
  redirect("/welcome");
}
