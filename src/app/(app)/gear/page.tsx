import { Suspense } from "react";
import { GearView } from "@/comps/gear/GearView";

export default function GearPage() {
	return (
		<Suspense fallback={null}>
			<GearView />
		</Suspense>
	);
}
