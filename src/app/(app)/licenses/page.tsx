import { Suspense } from "react";
import { LicensesView } from "@/comps/progress/LicensesView";

export default function LicensesPage() {
	return (
		<Suspense fallback={null}>
			<LicensesView />
		</Suspense>
	);
}
