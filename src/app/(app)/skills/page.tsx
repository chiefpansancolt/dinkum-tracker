import { Suspense } from "react";
import { SkillsView } from "@/comps/progress/SkillsView";

export default function SkillsPage() {
	return (
		<Suspense fallback={null}>
			<SkillsView />
		</Suspense>
	);
}
