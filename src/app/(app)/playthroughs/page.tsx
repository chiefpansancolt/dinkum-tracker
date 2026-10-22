import { Suspense } from "react";
import { PlaythroughsView } from "@/comps/playthroughs/PlaythroughsView";

export default function PlaythroughsPage() {
	return (
		<Suspense fallback={null}>
			<PlaythroughsView />
		</Suspense>
	);
}
