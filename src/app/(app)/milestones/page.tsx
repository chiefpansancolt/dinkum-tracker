import { Suspense } from "react";
import { MilestonesView } from "@/comps/progress/MilestonesView";

export default function MilestonesPage() {
	return (
		<Suspense fallback={null}>
			<MilestonesView />
		</Suspense>
	);
}
