"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Playthrough } from "@/types/app";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import { allObtained, isObtained, isUnlocked, obtainedCount } from "@/service/levels";
import { milestoneStats } from "@/service/overview";
import type { LevelledFilters } from "@/service/progress";
import {
	ALL,
	allMilestones,
	emptyLevelledFilters,
	filterMilestones,
	groupByLetter,
	milestoneCategoryList,
} from "@/service/progress";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { MasonryGrid, MasonryTile } from "@/comps/page/Masonry";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { StatTile } from "@/comps/ui/StatTile";
import { LevelCard } from "./LevelCard";
import { LevelRow } from "./LevelRow";
import { PermitBanner } from "./PermitBanner";
import { useLevelEditor } from "./useLevelEditor";

type ViewMode = "grouped" | "all";
type MilestoneFilters = LevelledFilters & { view: ViewMode };

const emptyFilters: MilestoneFilters = { ...emptyLevelledFilters, view: "grouped" };

function MilestonesContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("progress.milestones");
	const common = useTranslations("progress.common");
	const searchParams = useSearchParams();
	const { toggleLevel, toggleAll } = useLevelEditor("milestones");
	const [filters, setFilters] = useState<MilestoneFilters>({
		...emptyFilters,
		query: searchParams.get("q") ?? "",
	});
	useSearchInAddress(filters.query);

	const flags = playthrough.milestones;
	const stats = useMemo(() => milestoneStats(playthrough), [playthrough]);
	const shown = useMemo(() => filterMilestones(flags, filters), [flags, filters]);
	const groups = useMemo(() => groupByLetter(shown), [shown]);

	const fields: FilterFieldConfig[] = [
		{
			id: "category",
			label: t("filters.category"),
			options: [
				{ id: ALL, label: t("filters.allCategories") },
				...milestoneCategoryList.map((category) => ({
					id: category.id,
					label: category.name,
				})),
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
		{
			id: "view",
			kind: "segmented",
			label: t("filters.viewMode"),
			options: [
				{ id: "grouped", label: t("filters.grouped") },
				{ id: "all", label: t("filters.all") },
			],
		},
	];
	const clearFilters = () => setFilters(emptyFilters);

	const cards = (items: typeof shown) =>
		items.map((milestone) => (
			<MasonryTile key={milestone.id}>
				<LevelCard
					name={milestone.name}
					img={milestone.img}
					complete={allObtained(flags, milestone)}
					onToggleAll={() => toggleAll(flags, milestone)}
					intro={<p>{milestone.description}</p>}
				>
					{milestone.levels.map((entry) => (
						<LevelRow
							key={entry.level}
							title={
								<>
									{common("levelCount", { level: entry.level })}{" "}
									<span className="font-mono font-normal">
										{formatNumber(entry.count)}
										{entry.unit ? ` ${entry.unit}` : ""}
									</span>
								</>
							}
							points={formatNumber(entry.permitPoints)}
							checked={isObtained(flags, milestone.id, entry.level)}
							locked={!isUnlocked(flags, milestone.id, entry.level)}
							onToggle={() => toggleLevel(flags, milestone, entry.level)}
						/>
					))}
				</LevelCard>
			</MasonryTile>
		));

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
						total: formatNumber(allMilestones.length),
						count: obtainedCount(flags),
					})}
					sheetTitle={t("filters.sheetTitle")}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: filterMilestones(flags, {
								...filters,
								...draft,
							} as MilestoneFilters).length,
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
			) : filters.view === "grouped" ? (
				groups.map((group) => (
					<section key={group.letter} className="flex flex-col gap-3">
						<div className="flex items-center gap-4">
							<span aria-hidden="true" className="bg-line h-px flex-1" />
							<h2 className="text-xl font-bold">{group.letter}</h2>
							<span aria-hidden="true" className="bg-line h-px flex-1" />
						</div>
						<MasonryGrid>{cards(group.milestones)}</MasonryGrid>
					</section>
				))
			) : (
				<MasonryGrid>{cards(shown)}</MasonryGrid>
			)}
		</>
	);
}

export function MilestonesView() {
	const t = useTranslations("progress.milestones");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <MilestonesContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
