"use client";

import { formatNumber, formatTime } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

const REFRESH_MS = 30_000;
const MINUTE_MS = 60_000;

type SavedTranslator = ReturnType<typeof useTranslations<"ui.savedChip">>;

const formatSaved = (t: SavedTranslator, savedAt: Date | null, now: number) => {
	if (!savedAt) return t("automatic");

	const elapsed = now - savedAt.getTime();
	if (elapsed < MINUTE_MS) return t("justNow");
	if (elapsed < 60 * MINUTE_MS) {
		return t("minutesAgo", { count: formatNumber(Math.floor(elapsed / MINUTE_MS)) });
	}
	return t("at", { time: formatTime(savedAt) });
};

export function useSavedLabel() {
	const t = useTranslations("ui.savedChip");
	const { lastSavedAt, saveFailed } = usePlaythrough();
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), REFRESH_MS);
		return () => clearInterval(timer);
	}, []);

	if (saveFailed) return t("failed");
	return formatSaved(t, lastSavedAt, Math.max(now, lastSavedAt?.getTime() ?? 0));
}

export function SavedChip() {
	const label = useSavedLabel();

	return (
		<span
			role="status"
			className="border-line bg-surface text-muted inline-flex h-8 items-center gap-2 rounded-full border-[1.5px] px-3 text-xs"
		>
			<span aria-hidden="true" className="bg-success size-1.5 rounded-full" />
			{label}
		</span>
	);
}
