"use client";

import { formatNumber } from "@/i18n/formatter";
import type { Building } from "dinkum-data";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import { meter } from "@/service/overview";
import type { BuildingFilters } from "@/service/progress";
import {
	ALL,
	allBuildings,
	buildingNpcOptions,
	collectableBuildings,
	deedTypeOptions,
	emptyBuildingFilters,
	filterBuildings,
	installedCount,
} from "@/service/progress";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { StatTile } from "@/comps/ui/StatTile";
import { useToast } from "@/comps/ui/Toast";
import { InstalledToggle } from "./InstalledToggle";

const DEED_TONE = { Collectable: "success", Movable: "veryRare", Reference: "common" } as const;

function BuildingCard({
	building,
	installed,
	onChange,
}: {
	building: Building;
	installed: boolean;
	onChange: (installed: boolean) => void;
}) {
	const t = useTranslations("progress.buildings");
	const collectable = building.deedType === "Collectable";

	return (
		<ItemCard
			img={building.img}
			name={building.name}
			badge={<Badge tone={DEED_TONE[building.deedType]}>{building.deedType}</Badge>}
			checked={installed}
			highlighted={installed}
			fields={[
				...(building.deedName ? [{ label: t("card.deed"), value: building.deedName }] : []),
				...(building.npc
					? [{ label: t("card.npc"), value: building.npc, icon: building.npcImg }]
					: []),
				...(building.size ? [{ label: t("card.size"), value: building.size }] : []),
				...(building.buildTime
					? [{ label: t("card.buildTime"), value: building.buildTime }]
					: []),
				...(building.deedPrice > 0
					? [
							{
								label: t("card.deedPrice"),
								value: formatNumber(building.deedPrice),
								mono: true,
							},
						]
					: []),
				...(building.operatingHours.length > 0
					? [{ label: t("card.hours"), value: building.operatingHours.join(", ") }]
					: []),
				...(building.daysClosed
					? [{ label: t("card.closed"), value: building.daysClosed }]
					: []),
				{ label: t("card.description"), value: building.description, stacked: true },
				...(building.inputs.length > 0
					? [
							{
								label: t("card.resources"),
								stacked: true,
								value: building.inputs
									.map((input) =>
										t("card.resource", { count: input.count, name: input.name })
									)
									.join(", "),
							},
						]
					: []),
			]}
			footer={
				collectable ? (
					<InstalledToggle checked={installed} onChange={onChange} />
				) : (
					<p className="text-muted">{t("nothingToInstall")}</p>
				)
			}
		/>
	);
}

function BuildingsContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("progress.buildings");
	const common = useTranslations("progress.common");
	const undo = useTranslations("common");
	const searchParams = useSearchParams();
	const { update } = usePlaythrough();
	const showToast = useToast();
	const [filters, setFilters] = useState<BuildingFilters>({
		...emptyBuildingFilters,
		query: searchParams.get("q") ?? "",
	});
	useSearchInAddress(filters.query);

	const flags = playthrough.buildings;
	const installed = installedCount(flags);
	const total = collectableBuildings.length;
	const done = meter(installed, total);
	const shown = useMemo(() => filterBuildings(flags, filters), [flags, filters]);
	const movable = allBuildings.filter((building) => building.deedType === "Movable").length;
	const reference = allBuildings.filter((building) => building.deedType === "Reference").length;

	const fields: FilterFieldConfig[] = [
		{
			id: "deedType",
			label: t("filters.deedType"),
			options: [
				{ id: ALL, label: common("all") },
				...deedTypeOptions.map((type) => ({ id: type, label: type })),
			],
		},
		{
			id: "npc",
			label: t("filters.npc"),
			options: [
				{ id: ALL, label: common("all") },
				...buildingNpcOptions.map((npc) => ({ id: npc, label: npc })),
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

	const setInstalled = (building: Building, value: boolean) => {
		const previous = flags[building.id] === true;
		const saved = update((current) => ({
			...current,
			buildings: { ...current.buildings, [building.id]: value },
		}));
		if (!saved) return;

		showToast({
			key: "buildings",
			variant: "success",
			title: t(value ? "toast.installed" : "toast.notInstalled", { name: building.name }),
			action: {
				label: undo("undo"),
				onAction: () =>
					update((current) => ({
						...current,
						buildings: { ...current.buildings, [building.id]: previous },
					})),
			},
		});
	};
	const clearFilters = () => setFilters(emptyBuildingFilters);

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					count: formatNumber(installed),
					total: formatNumber(total),
					percent: done.percent,
					name: playthrough.name,
				})}
			/>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
				<StatTile
					label={t("tiles.installed")}
					value={formatNumber(installed)}
					caption={t("tiles.of", { total: formatNumber(total) })}
					progress={done.percent / 100}
				/>
				<StatTile
					label={t("tiles.stillToInstall")}
					value={formatNumber(total - installed)}
					caption={t("tiles.of", { total: formatNumber(total) })}
					progress={(total - installed) / total}
				/>
				<div className="col-span-2 lg:col-span-1">
					<StatTile
						label={t("tiles.listed")}
						value={formatNumber(allBuildings.length)}
						caption={t("tiles.breakdown", { collectable: total, movable, reference })}
						progress={1}
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
						total: formatNumber(allBuildings.length),
						count: installed,
					})}
					sheetTitle={t("filters.sheetTitle")}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: filterBuildings(flags, {
								...filters,
								...draft,
							} as BuildingFilters).length,
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
				<div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-3">
					{shown.map((building) => (
						<BuildingCard
							key={building.id}
							building={building}
							installed={flags[building.id] === true}
							onChange={(value) => setInstalled(building, value)}
						/>
					))}
				</div>
			)}
		</>
	);
}

export function BuildingsView() {
	const t = useTranslations("progress.buildings");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <BuildingsContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
