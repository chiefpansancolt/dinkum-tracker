import type { Metadata } from "next";
import { NewPlaythroughPage } from "@/comps/playthroughs/NewPlaythroughPage";

export const metadata: Metadata = { title: "New playthrough" }; // i18n-ignore

export default function NewPlaythroughRoute() {
	return <NewPlaythroughPage />;
}
