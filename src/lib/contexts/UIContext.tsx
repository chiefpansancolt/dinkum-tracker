"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { UIContextType } from "@/types/app";
import { DESKTOP_QUERY } from "@/lib/hooks/useMediaQuery";

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		const desktop = window.matchMedia(DESKTOP_QUERY);
		const closeOnDesktop = (event: MediaQueryListEvent) => {
			if (event.matches) setDrawerOpen(false);
		};
		desktop.addEventListener("change", closeOnDesktop);
		return () => desktop.removeEventListener("change", closeOnDesktop);
	}, []);

	return (
		<UIContext.Provider
			value={{
				drawerOpen,
				openDrawer: () => setDrawerOpen(true),
				closeDrawer: () => setDrawerOpen(false),
			}}
		>
			{children}
		</UIContext.Provider>
	);
}

export function useUI() {
	const context = useContext(UIContext);
	if (context === undefined) {
		throw new Error("useUI must be used within a UIProvider"); // i18n-ignore
	}
	return context;
}
