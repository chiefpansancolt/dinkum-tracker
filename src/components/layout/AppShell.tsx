"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useUI } from "@/lib/contexts/UIContext";
import { Drawer } from "@/comps/ui/Drawer";
import { AppBar } from "./AppBar";
import { DomainNotice } from "./DomainNotice";
import { Footer } from "./Footer";
import { SidebarContent } from "./SidebarContent";
import { ThemeSync } from "./ThemeSync";

export function AppShell({ children }: { children: ReactNode }) {
	const t = useTranslations("shell.appShell");
	const { drawerOpen, closeDrawer } = useUI();
	const isLanding = usePathname() === "/";

	const skipLink = (
		<a
			href="#main"
			className="focus:bg-surface sr-only focus:not-sr-only focus:fixed focus:inset-s-2 focus:top-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
		>
			{t("skipToContent")}
		</a>
	);

	if (isLanding) {
		return (
			<>
				{skipLink}
				<ThemeSync />
				{children}
			</>
		);
	}

	return (
		<div className="flex min-h-dvh">
			{skipLink}
			<ThemeSync />
			<aside className="bg-sb-bg text-sb-text sticky top-0 hidden h-dvh w-62 shrink-0 flex-col px-4 pt-5 pb-4 lg:flex">
				<SidebarContent />
			</aside>
			<div className="flex min-w-0 flex-1 flex-col">
				<AppBar />
				<DomainNotice />
				<main
					id="main"
					tabIndex={-1}
					className="flex flex-1 flex-col gap-4 px-4 py-4 outline-none lg:px-8 lg:py-6"
				>
					{children}
				</main>
				<Footer />
			</div>
			<Drawer open={drawerOpen} onClose={closeDrawer} closeLabel={t("closeMenu")}>
				<SidebarContent onNavigate={closeDrawer} showThemeSwitch />
			</Drawer>
		</div>
	);
}
