import type { Metadata } from "next";
import { NewPlaythroughPage } from "@/comps/playthroughs/NewPlaythroughPage";

export const metadata: Metadata = { title: "New playthrough" };

export default function NewPlaythroughRoute() {
	return <NewPlaythroughPage />;
}
