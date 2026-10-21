import { Suspense } from "react";
import { SettingsView } from "@/comps/settings/SettingsView";

export default function SettingsPage() {
	return (
		<Suspense fallback={null}>
			<SettingsView />
		</Suspense>
	);
}
