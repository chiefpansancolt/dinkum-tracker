"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { BuildingStats, LevelledStats, PediaStats } from "@/service/overview";
import { SectionLabel } from "@/comps/ui/SectionLabel";
import { ListRow, MeterRow, OverviewCard, PermitPointsRow, StatBox } from "./OverviewParts";

interface CardProps {
	className?: string;
}

const fraction = (meter: { count: number; total: number }) => ({
	count: formatNumber(meter.count),
	total: formatNumber(meter.total),
});

export function LicensesCard({ stats, className }: CardProps & { stats: LevelledStats }) {
	const t = useTranslations("overview.licenses");

	return (
		<OverviewCard title={t("title")} href="/licenses" className={className}>
			<MeterRow
				label={t("obtained")}
				value={t("complete", fraction(stats.overall))}
				progress={stats.overall.percent / 100}
				mono
			/>
			<MeterRow
				sub
				tone="info"
				label={t("levels")}
				value={t("levelsValue", {
					...fraction(stats.levels),
					percent: stats.levels.percent,
				})}
				progress={stats.levels.percent / 100}
				mono
			/>
			<PermitPointsRow
				label={t("permit")}
				amount={stats.permitPoints.amount}
				total={stats.permitPoints.total}
				percent={stats.permitPoints.percent}
				suffix={t("spent", { percent: stats.permitPoints.percent })}
			/>
		</OverviewCard>
	);
}

export function MilestonesCard({ stats, className }: CardProps & { stats: LevelledStats }) {
	const t = useTranslations("overview.milestones");

	return (
		<OverviewCard title={t("title")} href="/milestones" className={className}>
			<MeterRow
				label={t("overall")}
				value={t("complete", fraction(stats.overall))}
				progress={stats.overall.percent / 100}
				mono
			/>
			<MeterRow
				sub
				tone="info"
				label={t("levels")}
				value={t("levelsValue", {
					...fraction(stats.levels),
					percent: stats.levels.percent,
				})}
				progress={stats.levels.percent / 100}
				mono
			/>
			<PermitPointsRow
				label={t("permit")}
				amount={stats.permitPoints.amount}
				total={stats.permitPoints.total}
				percent={stats.permitPoints.percent}
				suffix={t("earned", { percent: stats.permitPoints.percent })}
			/>
		</OverviewCard>
	);
}

export function PediaCard({ stats, className }: CardProps & { stats: PediaStats }) {
	const t = useTranslations("overview.pedia");
	const groups = [
		{ key: "fish", group: stats.fish },
		{ key: "bugs", group: stats.bugs },
		{ key: "critters", group: stats.critters },
	] as const;

	return (
		<OverviewCard title={t("title")} href="/pedia" className={className}>
			<div className="flex flex-col gap-3">
				<MeterRow
					label={t("overall", fraction(stats.overall))}
					value={`${stats.overall.percent}%`}
					progress={stats.overall.percent / 100}
				/>
				<MeterRow
					sub
					tone="info"
					label={t("donations", fraction(stats.donations))}
					value={`${stats.donations.percent}%`}
					progress={stats.donations.percent / 100}
				/>
			</div>
			{groups.map(({ key, group }) => (
				<div key={key} className="flex flex-col gap-3">
					<MeterRow
						label={t(key, fraction(group.collected))}
						value={`${group.collected.percent}%`}
						progress={group.collected.percent / 100}
					/>
					<MeterRow
						sub
						tone="info"
						label={t("donated", fraction(group.donated))}
						value={`${group.donated.percent}%`}
						progress={group.donated.percent / 100}
					/>
				</div>
			))}
			<PermitPointsRow
				label={t("permit")}
				amount={stats.permitPoints.amount}
				total={stats.permitPoints.total}
				percent={stats.permitPoints.percent}
				suffix={t("earned", { percent: stats.permitPoints.percent })}
			/>
		</OverviewCard>
	);
}

export function BuildingsCard({ stats, className }: CardProps & { stats: BuildingStats }) {
	const t = useTranslations("overview.buildings");

	return (
		<OverviewCard title={t("title")} href="/buildings" className={className}>
			<MeterRow
				label={t("overall")}
				value={t("complete", fraction(stats.overall))}
				progress={stats.overall.percent / 100}
				mono
			/>
			<div className="grid grid-cols-2 gap-3">
				<StatBox label={t("houseUpgrades")} value={formatNumber(stats.houseUpgrades)} />
				<StatBox label={t("shops")} value={formatNumber(stats.shops)} />
				<StatBox label={t("town")} value={formatNumber(stats.townBuildings)} />
				<StatBox label={t("utility")} value={formatNumber(stats.utilityBuildings)} />
			</div>
			<div className="flex flex-col gap-2">
				<SectionLabel className="text-muted">{t("mostExpensive")}</SectionLabel>
				<ul className="flex flex-col gap-2">
					{stats.mostExpensive.map((building) => (
						<ListRow
							key={building.id}
							img={building.img}
							name={building.name}
							value={t("price", { amount: formatNumber(building.deedPrice) })}
						/>
					))}
				</ul>
			</div>
		</OverviewCard>
	);
}
