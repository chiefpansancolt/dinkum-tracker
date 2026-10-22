"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useId } from "react";
import type { Playthrough } from "@/types/app";
import type { PlaythroughProgress, ProgressRow } from "@/service/completion";
import { completionTone } from "@/service/completion";
import { seasonOf } from "@/service/playthrough";
import { Badge } from "@/comps/ui/Badge";
import { Button, ButtonLink } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { ProgressBar } from "@/comps/ui/ProgressBar";
import { CompletionBadge } from "./CompletionBadge";
import { useCreatedText, useGameDate, useSeasonName, useUpdatedText } from "./playthroughText";

const SEASON_TONE = {
	Spring: "success",
	Summer: "warn",
	Autumn: "danger",
	Winter: "info",
} as const;

interface PlaythroughCardProps {
	playthrough: Playthrough;
	progress: PlaythroughProgress;
	isActive: boolean;
	onSetActive: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

function ProgressLine({ label, row, detail }: { label: string; row: ProgressRow; detail: string }) {
	return (
		<div className="bg-bg flex flex-col gap-1.5 rounded-md px-3 py-2.5">
			<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
				<span className="flex items-center gap-2">
					<span className="font-semibold">{label}</span>
					<span className="border-line text-muted rounded-full border px-1.5 font-mono text-[11px]">
						{formatNumber(row.percent)}%
					</span>
				</span>
				<span className="text-muted font-mono text-xs">{detail}</span>
			</div>
			<ProgressBar value={row.percent / 100} label={label} />
		</div>
	);
}

export function PlaythroughCard({
	playthrough,
	progress,
	isActive,
	onSetActive,
	onEdit,
	onDelete,
}: PlaythroughCardProps) {
	const t = useTranslations("playthroughs.card");
	const titleId = useId();
	const createdText = useCreatedText();
	const updatedText = useUpdatedText();
	const gameDate = useGameDate();
	const seasonName = useSeasonName();
	const count = (row: { count: number; total: number }) =>
		t("count", { count: formatNumber(row.count), total: formatNumber(row.total) });

	return (
		<Card
			role="group"
			aria-labelledby={titleId}
			highlighted={isActive}
			className="flex flex-col gap-3 p-4"
		>
			<div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
				<h2 id={titleId} className="min-w-0 text-lg font-semibold break-words">
					{playthrough.name}
				</h2>
				<CompletionBadge percent={progress.overallPercent} />
			</div>
			<p className="text-muted flex flex-wrap gap-x-4">
				<span>{createdText(playthrough)}</span>
				<span>{updatedText(playthrough)}</span>
			</p>

			<div className="flex flex-col gap-1.5">
				<div className="flex justify-between gap-3">
					<span className="font-semibold">{t("overall")}</span>
					<span className="text-muted font-mono text-xs">{progress.overallPercent}%</span>
				</div>
				<ProgressBar
					thick
					value={progress.overallPercent / 100}
					label={t("overall")}
					tone={completionTone(progress.overallPercent)}
				/>
			</div>

			<ProgressLine
				label={t("pedia")}
				row={progress.pedia}
				detail={t("pediaDetail", {
					fish: count(progress.fish),
					bugs: count(progress.bugs),
					critters: count(progress.critters),
				})}
			/>
			<ProgressLine
				label={t("licenses")}
				row={progress.licenses}
				detail={count(progress.licenses)}
			/>
			<ProgressLine
				label={t("milestones")}
				row={progress.milestones}
				detail={count(progress.milestones)}
			/>
			<ProgressLine
				label={t("buildings")}
				row={progress.buildings}
				detail={count(progress.buildings)}
			/>

			<div className="bg-bg flex items-center justify-between gap-3 rounded-md px-3 py-2.5">
				<div className="flex flex-col">
					<span className="font-semibold">{gameDate(playthrough)}</span>
					<span className="text-muted text-xs">{t("currentGameDate")}</span>
				</div>
				<Badge tone={SEASON_TONE[seasonOf(playthrough)]}>
					{seasonName(seasonOf(playthrough))}
				</Badge>
			</div>

			<div className="flex flex-wrap gap-2">
				{isActive ? (
					<>
						<span className="bg-tint text-ink flex min-h-11 items-center justify-center gap-2 rounded-md font-semibold max-sm:basis-full sm:flex-1 lg:min-h-9">
							<span aria-hidden="true" className="bg-success size-2 rounded-full" />
							<span className="sm:hidden">{t("activePlaythrough")}</span>
							<span className="max-sm:hidden">{t("active")}</span>
						</span>
						<ButtonLink href="/overview" className="max-sm:flex-1">
							{t("openOverview")}
						</ButtonLink>
					</>
				) : (
					<Button
						variant="primary"
						className="max-sm:basis-full sm:flex-1"
						onClick={onSetActive}
					>
						{t("setActive")}
					</Button>
				)}
				<Button className="max-sm:flex-1" onClick={onEdit}>
					{t("edit")}
				</Button>
				<Button variant="danger" className="max-sm:flex-1" onClick={onDelete}>
					{t("delete")}
				</Button>
			</div>
		</Card>
	);
}
