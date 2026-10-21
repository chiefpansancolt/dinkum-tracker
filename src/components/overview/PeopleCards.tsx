"use client";

import { formatDecimal, formatNumber, formatShortDate } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { GameInfo, NpcStats, SkillRow } from "@/service/overview";
import { seasonOf } from "@/service/playthrough";
import { ItemIcon } from "@/comps/ui/ItemIcon";
import { SectionLabel } from "@/comps/ui/SectionLabel";
import { ListRow, OverviewCard, StatBox } from "./OverviewParts";

interface CardProps {
	className?: string;
}

export function SkillsCard({ rows, className }: CardProps & { rows: SkillRow[] | null }) {
	const t = useTranslations("overview.skills");

	return (
		<OverviewCard title={t("title")} href="/skills" className={className}>
			{rows === null ? (
				<p className="text-muted italic">{t("empty")}</p>
			) : (
				<ul className="flex flex-col gap-3">
					{rows.map((skill) => (
						<li key={skill.id} className="flex items-center gap-3">
							<ItemIcon src={skill.img} size={28} />
							<span className="flex-1 font-semibold">{skill.name}</span>
							<span className="bg-tint text-success rounded-full px-3 py-0.5 font-mono text-xs">
								{t("level", { level: skill.level })}
							</span>
						</li>
					))}
				</ul>
			)}
		</OverviewCard>
	);
}

export function NpcCard({ stats, className }: CardProps & { stats: NpcStats }) {
	const t = useTranslations("overview.npcs");

	return (
		<OverviewCard title={t("title")} href="/npcs" className={className}>
			<div className="grid grid-cols-2 gap-3">
				<StatBox label={t("total")} value={formatNumber(stats.total)} />
				<StatBox label={t("friends")} value={formatNumber(stats.friends)} />
			</div>
			<div className="grid grid-cols-3 gap-3">
				<StatBox label={t("oneHeart")} value={formatNumber(stats.oneHeart)} />
				<StatBox label={t("maxHearts")} value={formatNumber(stats.maxHearts)} />
				<StatBox label={t("avgHearts")} value={formatDecimal(stats.averageHearts, 1)} />
			</div>
			<div className="flex flex-col gap-2">
				<SectionLabel className="text-muted">{t("top")}</SectionLabel>
				{stats.top.length === 0 ? (
					<p className="text-muted italic">{t("empty")}</p>
				) : (
					<ul className="flex flex-col gap-2">
						{stats.top.map((npc) => (
							<ListRow
								key={npc.id}
								img={npc.img}
								name={npc.name}
								value={t("hearts", { hearts: formatDecimal(npc.hearts, 2) })}
							/>
						))}
					</ul>
				)}
			</div>
		</OverviewCard>
	);
}

export function GameInfoCard({
	info,
	season,
	className,
}: CardProps & { info: GameInfo; season: string }) {
	const t = useTranslations("overview.game");

	return (
		<OverviewCard title={t("title")} href="/calendar" className={className}>
			<div className="flex flex-col gap-1">
				<SectionLabel className="text-muted">{t("calendar")}</SectionLabel>
				<span className="text-lg font-semibold">
					{t("date", { day: info.day, season })}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<SectionLabel className="text-muted">{t("tracking")}</SectionLabel>
				<span>{t("daysSince", { days: formatNumber(info.daysSinceCreation) })}</span>
				<span>
					{t("lastUpdated", {
						date: info.lastUpdated ? formatShortDate(info.lastUpdated) : "N/A",
					})}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<SectionLabel className="text-muted">{t("milestones")}</SectionLabel>
				<span>{t("completed", { count: formatNumber(info.milestonesCompleted) })}</span>
			</div>
		</OverviewCard>
	);
}
