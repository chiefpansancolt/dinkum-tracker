"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Playthrough } from "@/types/app";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import { allObtained, isObtained, isUnlocked, obtainedCount } from "@/service/levels";
import { licenseStats } from "@/service/overview";
import type { LevelledFilters } from "@/service/progress";
import {
	ALL,
	allLicenses,
	emptyLevelledFilters,
	filterLicenses,
	licenseCategoryOptions,
} from "@/service/progress";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { StatTile } from "@/comps/ui/StatTile";
import { LevelCard } from "./LevelCard";
import { LevelRow } from "./LevelRow";
import { PermitBanner } from "./PermitBanner";
import { useLevelEditor } from "./useLevelEditor";

function LicensesContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("progress.licenses");
	const common = useTranslations("progress.common");
	const searchParams = useSearchParams();
	const { toggleLevel, toggleAll } = useLevelEditor("licenses");
	const [filters, setFilters] = useState<LevelledFilters>({
		...emptyLevelledFilters,
		query: searchParams.get("q") ?? "",
	});
	useSearchInAddress(filters.query);

	const flags = playthrough.licenses;
	const stats = useMemo(() => licenseStats(playthrough), [playthrough]);
	const shown = useMemo(() => filterLicenses(flags, filters), [flags, filters]);

	const fields: FilterFieldConfig[] = [
		{
			id: "category",
			label: t("filters.category"),
			options: [
				{ id: ALL, label: common("all") },
				...licenseCategoryOptions.map((category) => ({ id: category, label: category })),
			],
		},
		{
			id: "collected",
			label: t("filters.collected"),
			options: [
				{ id: "all", label: common("all") },
				{ id: "collected", label: common("collected") },
				{ id: "not_collected", label: common("notCollected") },
			],
		},
	];
	const clearFilters = () => setFilters(emptyLevelledFilters);

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					count: formatNumber(stats.levels.count),
					total: formatNumber(stats.levels.total),
					percent: stats.levels.percent,
					name: playthrough.name,
				})}
			/>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_1.8fr]">
				<StatTile
					label={t("tiles.levels")}
					value={formatNumber(stats.levels.count)}
					caption={t("tiles.of", { total: formatNumber(stats.levels.total) })}
					progress={stats.levels.percent / 100}
				/>
				<StatTile
					label={t("tiles.complete")}
					value={formatNumber(stats.overall.count)}
					caption={t("tiles.of", { total: formatNumber(stats.overall.total) })}
					progress={stats.overall.percent / 100}
				/>
				<div className="col-span-2 lg:col-span-1">
					<PermitBanner
						label={t("tiles.permit")}
						amount={formatNumber(stats.permitPoints.amount)}
						total={formatNumber(stats.permitPoints.total)}
						percent={stats.permitPoints.percent}
						sentence={t("tiles.sentence", {
							amount: formatNumber(stats.permitPoints.amount),
							total: formatNumber(stats.permitPoints.total),
						})}
					/>
				</div>
			</div>
			<Card className="p-4">
				<FilterBlock
					fields={fields}
					values={{ ...filters }}
					onChange={(fieldId, value) =>
						setFilters((current) => ({ ...current, [fieldId]: value }))
					}
					onClear={clearFilters}
					search={{
						label: t("filters.search"),
						value: filters.query,
						onChange: (query) => setFilters((current) => ({ ...current, query })),
					}}
					summary={t("filters.showing", {
						shown: formatNumber(shown.length),
						total: formatNumber(allLicenses.length),
						count: obtainedCount(flags),
					})}
					sheetTitle={t("filters.sheetTitle")}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: filterLicenses(flags, {
								...filters,
								...draft,
							} as LevelledFilters).length,
						})
					}
				/>
			</Card>

			{shown.length === 0 ? (
				<EmptyState
					title={common("empty.title", { things: t("things") })}
					description={common("empty.description")}
					actions={<Button onClick={clearFilters}>{common("clearFilters")}</Button>}
				/>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] items-start gap-3">
					{shown.map((license) => (
						<LevelCard
							key={license.id}
							name={license.name}
							img={license.img}
							complete={allObtained(flags, license)}
							onToggleAll={() => toggleAll(flags, license)}
							intro={
								license.requirements && (
									<div className="flex flex-col gap-0.5">
										<span className="text-muted">{common("requirement")}</span>
										<span>{license.requirements}</span>
									</div>
								)
							}
						>
							{license.levels.map((entry) => (
								<LevelRow
									key={entry.level}
									title={common("level", { level: entry.level })}
									points={formatNumber(entry.permitPointCost)}
									checked={isObtained(flags, license.id, entry.level)}
									locked={!isUnlocked(flags, license.id, entry.level)}
									onToggle={() => toggleLevel(flags, license, entry.level)}
								>
									{entry.skillLevel > 0 && (
										<span>
											{common("requiredSkill")}{" "}
											<span className="font-mono">{entry.skillLevel}</span>
										</span>
									)}
									<span>{entry.description}</span>
								</LevelRow>
							))}
						</LevelCard>
					))}
				</div>
			)}
		</>
	);
}

export function LicensesView() {
	const t = useTranslations("progress.licenses");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <LicensesContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
