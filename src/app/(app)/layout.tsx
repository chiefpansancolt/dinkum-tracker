import { AppProviders } from "@/comps/layout/AppProviders";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return <AppProviders>{children}</AppProviders>;
}
