import { redirect } from "next/navigation";

/** First paint — welcome + language before the main shell. */
export default function Page() {
  redirect("/welcome");
}
