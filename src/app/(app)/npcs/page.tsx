import { Suspense } from "react";
import { NpcsView } from "@/comps/npcs/NpcsView";

export default function NpcsPage() {
	return (
		<Suspense fallback={null}>
			<NpcsView />
		</Suspense>
	);
}
