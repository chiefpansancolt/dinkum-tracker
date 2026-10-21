import { Suspense } from "react";
import { BuildingsView } from "@/comps/progress/BuildingsView";

export default function BuildingsPage() {
	return (
		<Suspense fallback={null}>
			<BuildingsView />
		</Suspense>
	);
}
