import type { Metadata } from "next";
import { AppProviders } from "@/comps/layout/AppProviders";
import { NotFoundView } from "@/comps/layout/NotFoundView";

export const metadata: Metadata = { title: "Page not found" }; // i18n-ignore

export default function NotFound() {
	return (
		<AppProviders>
			<NotFoundView />
		</AppProviders>
	);
}
