"use client";

import { formatDateTime } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSync } from "@/lib/contexts/SyncContext";
import { playthroughProgress } from "@/service/completion";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";

type PlaythroughStatus = "synced" | "changedHere" | "conflict" | "newHere";

const tones = {
	synced: "success",
	changedHere: "info",
	conflict: "warn",
	newHere: "info",
} as const;

const statusOf = (
	playthrough: Playthrough,
	cloud: Playthrough | undefined,
	hasConflict: boolean
): PlaythroughStatus => {
	if (hasConflict) return "conflict";
	if (!cloud) return "newHere";
	return JSON.stringify(playthrough) === JSON.stringify(cloud) ? "synced" : "changedHere";
};

function Describe({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("sync.playthroughs");

	return (
		<>
			<span>
				{t("describe", {
					day: playthrough.calendar.currentDay,
					season: playthrough.calendar.currentSeason,
					percent: playthroughProgress(playthrough).overallPercent,
				})}
			</span>
			<span className="text-muted font-mono text-xs">
				{formatDateTime(playthrough.lastUpdated)}
			</span>
		</>
	);
}

interface PlaythroughsListProps {
	onReview: () => void;
}

export function PlaythroughsList({ onReview }: PlaythroughsListProps) {
	const t = useTranslations("sync.playthroughs");
	const { playthroughs } = usePlaythrough();
	const { cloudCopy, conflicts } = useSync();

	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-base font-semibold">{t("title")}</h3>
			<ul className="flex flex-col gap-3">
				{playthroughs.map((playthrough) => {
					const cloud = cloudCopy?.playthroughs.find(
						(other) => other.id === playthrough.id
					);
					const hasConflict = conflicts.some(
						(conflict) =>
							conflict.path[0] === "playthroughs" &&
							conflict.path[1] === playthrough.id
					);
					const current = statusOf(playthrough, cloud, hasConflict);
					return (
						<li
							key={playthrough.id}
							className="border-line bg-surface flex flex-col gap-2 rounded-md border-[1.5px] p-3"
						>
							<div className="flex items-start justify-between gap-3">
								<span className="font-semibold">{playthrough.name}</span>
								<Badge tone={tones[current]}>{t(`status.${current}`)}</Badge>
							</div>
							<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
								<dt className="text-muted">{t("thisDevice")}</dt>
								<dd className="flex flex-col items-end text-end">
									<Describe playthrough={playthrough} />
								</dd>
								<dt className="text-muted">{t("cloud")}</dt>
								<dd className="flex flex-col items-end text-end">
									{cloud ? (
										<Describe playthrough={cloud} />
									) : (
										<span className="text-muted">{t("notInCloud")}</span>
									)}
								</dd>
							</dl>
							{current === "conflict" && (
								<div>
									<Button variant="link" onClick={onReview}>
										{t("review")}
									</Button>
								</div>
							)}
						</li>
					);
				})}
			</ul>
			<p className="text-muted">{t("note")}</p>
		</div>
	);
}
