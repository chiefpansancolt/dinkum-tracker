"use client";

import { translator } from "@/i18n/formatter";
import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import type { Playthrough, PlaythroughContextType } from "@/types/app";
import { useIsHydrated } from "@/lib/hooks/useIsHydrated";
import { downloadBackup } from "@/service/backup";
import {
	restorePlaythrough,
	updatePrefs as savePrefs,
	setActivePlaythroughId,
	storageService,
	updatePlaythrough,
} from "@/service/store";
import { useToast } from "@/comps/ui/Toast";

const PlaythroughContext = createContext<PlaythroughContextType | undefined>(undefined);

export function PlaythroughProvider({ children }: { children: React.ReactNode }) {
	const appData = useSyncExternalStore(
		storageService.subscribe,
		storageService.load,
		storageService.loadOnServer
	);
	const isLoaded = useIsHydrated();
	const showToast = useToast();
	const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
	const [saveFailed, setSaveFailed] = useState(false);

	const activePlaythrough =
		appData.playthroughs.find(
			(playthrough) => playthrough.id === appData.activePlaythroughId
		) ?? null;

	const reportSave = (saved: boolean) => {
		setSaveFailed(!saved);
		if (saved) {
			setLastSavedAt(new Date());
			return;
		}

		const t = translator("common");
		showToast({
			variant: "error",
			title: t("saveFailed.title"),
			message: t("saveFailed.message"),
			action: { label: t("saveFailed.exportBackup"), onAction: downloadBackup },
		});
	};

	const update: PlaythroughContextType["update"] = (recipe) => {
		if (!activePlaythrough) return null;

		const result = updatePlaythrough(activePlaythrough.id, recipe);
		if (result.status === "unchanged" || result.status === "missing") return null;

		reportSave(result.status === "saved");
		return result.status === "saved" ? result.previous : null;
	};

	const restore = (playthrough: Playthrough) => reportSave(restorePlaythrough(playthrough));

	return (
		<PlaythroughContext.Provider
			value={{
				appData,
				playthroughs: appData.playthroughs,
				activePlaythrough,
				prefs: appData.prefs,
				isLoaded,
				lastSavedAt,
				saveFailed,
				update,
				restore,
				setActivePlaythrough: setActivePlaythroughId,
				updatePrefs: (updates) => reportSave(savePrefs(updates)),
			}}
		>
			{children}
		</PlaythroughContext.Provider>
	);
}

export function usePlaythrough() {
	const context = useContext(PlaythroughContext);
	if (context === undefined) {
		throw new Error("usePlaythrough must be used within a PlaythroughProvider"); // i18n-ignore
	}
	return context;
}
