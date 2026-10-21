import { Suspense } from "react";
import { RecipesView } from "@/comps/recipes/RecipesView";

export default function RecipesPage() {
	return (
		<Suspense fallback={null}>
			<RecipesView />
		</Suspense>
	);
}
