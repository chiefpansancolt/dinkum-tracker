import { Suspense } from "react";
import { WardrobeView } from "@/comps/wardrobe/WardrobeView";

export default function WardrobePage() {
	return (
		<Suspense fallback={null}>
			<WardrobeView />
		</Suspense>
	);
}
