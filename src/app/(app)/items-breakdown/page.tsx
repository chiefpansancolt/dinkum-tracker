import { Suspense } from "react";
import { ItemsBreakdownView } from "@/comps/tools/ItemsBreakdownView";

export default function ItemsBreakdownPage() {
	return (
		<Suspense fallback={null}>
			<ItemsBreakdownView />
		</Suspense>
	);
}
