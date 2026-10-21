import { Suspense } from "react";
import { ReferenceView } from "@/comps/reference/ReferenceView";

export default function ReferencePage() {
	return (
		<Suspense fallback={null}>
			<ReferenceView />
		</Suspense>
	);
}
