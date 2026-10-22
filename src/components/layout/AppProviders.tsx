import { I18nProvider } from "@/i18n/I18nProvider";
import type { ReactNode } from "react";
import { PlaythroughProvider } from "@/lib/contexts/PlaythroughContext";
import { SyncProvider } from "@/lib/contexts/SyncContext";
import { UIProvider } from "@/lib/contexts/UIContext";
import { ToastProvider } from "@/comps/ui/Toast";
import { AppShell } from "./AppShell";

/** Everything a page of the app needs around it: language, drawer, toasts, saved data and the shell. */
export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<I18nProvider>
			<UIProvider>
				<ToastProvider>
					<PlaythroughProvider>
						<SyncProvider>
							<AppShell>{children}</AppShell>
						</SyncProvider>
					</PlaythroughProvider>
				</ToastProvider>
			</UIProvider>
		</I18nProvider>
	);
}
