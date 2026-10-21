import { I18nProvider } from "@/i18n/I18nProvider";
import { PlaythroughProvider } from "@/lib/contexts/PlaythroughContext";
import { UIProvider } from "@/lib/contexts/UIContext";
import { AppShell } from "@/comps/layout/AppShell";
import { ToastProvider } from "@/comps/ui/Toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<I18nProvider>
			<UIProvider>
				<ToastProvider>
					<PlaythroughProvider>
						<AppShell>{children}</AppShell>
					</PlaythroughProvider>
				</ToastProvider>
			</UIProvider>
		</I18nProvider>
	);
}
