"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { pediaStats, PERMIT_POINTS_PER_DONATION } from "@/service/overview";
import type { PediaEntry, PediaFilters, PediaStatus, PediaTab } from "@/service/pedia";
import {
	ALL,
	biomeOptions,
	emptyFilters,
	filterEntries,
	PEDIA_TABS,
	pediaEntries,
	rarityOptions,
	seasonOptions,
	statusOf,
	timeOptions,
	withStatus,
} from "@/service/pedia";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { ViewToggle } from "@/comps/page/ViewToggle";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { StatTile } from "@/comps/ui/StatTile";
import { TileTabs } from "@/comps/ui/TileTabs";
import { useToast } from "@/comps/ui/Toast";
import { PediaCard } from "./PediaCard";
import { PediaList } from "./PediaList";

/** Keeps `?q=` in the address as the player types, so a link to a search can be shared. */
function useSearchInAddress(query: string) {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (query) params.set("q", query);
		else params.delete("q");

		const search = params.toString();
		window.history.replaceState(
			null,
			"",
			`${window.location.pathname}${search ? `?${search}` : ""}`
		);
	}, [query]);
}

function PediaTabPanel({ tab, playthrough }: { tab: PediaTab; playthrough: Playthrough }) {
	const t = useTranslations("pedia");
	const common = useTranslations("common");
	const searchParams = useSearchParams();
	const { prefs, update } = usePlaythrough();
	const showToast = useToast();
	const [filters, setFilters] = useState<PediaFilters>({
		...emptyFilters,
		query: searchParams.get("q") ?? "",
	});
	useSearchInAddress(filters.query);

	const noun = t(`nouns.${tab}`);
	const all = pediaEntries[tab];
	const shown = useMemo(
		() => filterEntries(tab, playthrough, filters),
		[tab, playthrough, filters]
	);
	const statusFor = (entry: PediaEntry) => statusOf(playthrough, tab, entry.id);
	const shownCaught = shown.filter((entry) => statusFor(entry) !== "missing").length;
	const shownDonated = shown.filter((entry) => statusFor(entry) === "donated").length;

	const fields: FilterFieldConfig[] = [
		{
			id: "biome",
			label: t("filters.biome"),
			options: [
				{ id: ALL, label: t("filters.allBiomes") },
				...biomeOptions(all).map((biome) => ({ id: biome, label: biome })),
			],
		},
		{
			id: "rarity",
			label: t("filters.rarity"),
			options: [
				{ id: ALL, label: t("filters.allRarities") },
				...rarityOptions(all).map((rarity) => ({ id: rarity, label: rarity })),
			],
		},
		{
			id: "season",
			label: t("filters.season"),
			options: [
				{ id: ALL, label: t("filters.allSeasons") },
				...seasonOptions().map((season) => ({ id: season, label: season })),
			],
		},
		{
			id: "time",
			label: t("filters.time"),
			options: [
				{ id: ALL, label: t("filters.anyTime") },
				...timeOptions().map((time) => ({ id: time, label: time })),
			],
		},
		{
			id: "collected",
			label: t("filters.collected"),
			options: [
				{ id: "all", label: t("filters.all") },
				{ id: "collected", label: t("filters.onlyCollected") },
				{ id: "not_collected", label: t("filters.notCollected") },
			],
		},
		{
			id: "donated",
			label: t("filters.donated"),
			options: [
				{ id: "all", label: t("filters.all") },
				{ id: "donated", label: t("filters.onlyDonated") },
				{ id: "not_donated", label: t("filters.notDonated") },
			],
		},
	];

	const setStatus = (entry: PediaEntry, status: PediaStatus) => {
		const previous = statusFor(entry);
		if (previous === status) return;

		const saved = update((current) => withStatus(current, tab, entry.id, status));
		if (!saved) return;

		showToast({
			key: "pedia-status",
			variant: "success",
			title: t("toast.marked", { name: entry.name, status: t(`toast.statuses.${status}`) }),
			action: {
				label: common("undo"),
				onAction: () => update((current) => withStatus(current, tab, entry.id, previous)),
			},
		});
	};

	const clearFilters = () => setFilters(emptyFilters);

	return (
		<>
			<Card className="p-4">
				<FilterBlock
					fields={fields}
					values={{ ...filters }}
					onChange={(fieldId, value) =>
						setFilters((current) => ({ ...current, [fieldId]: value }))
					}
					onClear={clearFilters}
					search={{
						label: t("filters.search", { tab: noun }),
						value: filters.query,
						onChange: (query) => setFilters((current) => ({ ...current, query })),
					}}
					summary={`${t("filters.showing", {
						shown: formatNumber(shown.length),
						total: formatNumber(all.length),
						tab: noun,
					})} · ${t("filters.capturedCount", { count: shownCaught })} · ${t(
						"filters.donatedCount",
						{
							count: shownDonated,
						}
					)}`}
					trailing={<ViewToggle />}
					sheetTitle={t("filters.sheetTitle", { tab: noun })}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: filterEntries(tab, playthrough, {
								...filters,
								...draft,
							} as PediaFilters).length,
							tab: noun,
						})
					}
				/>
			</Card>

			{shown.length === 0 ? (
				<EmptyState
					title={t("empty.title", { tab: noun })}
					description={t("empty.description")}
					actions={<Button onClick={clearFilters}>{t("empty.clear")}</Button>}
				/>
			) : prefs.viewMode === "grid" ? (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-3">
					{shown.map((entry) => (
						<PediaCard
							key={entry.id}
							entry={entry}
							status={statusFor(entry)}
							commerceLevel={prefs.commerceLevel}
							onStatusChange={(status) => setStatus(entry, status)}
						/>
					))}
				</div>
			) : (
				<PediaList
					entries={shown}
					statusOf={statusFor}
					commerceLevel={prefs.commerceLevel}
					onStatusChange={setStatus}
					showCooked={tab === "fish"}
					shown={shown.length}
					total={all.length}
				/>
			)}
		</>
	);
}

function PediaContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("pedia");
	const router = useRouter();
	const pathname = usePathname();
	const [tab] = useUrlTab(PEDIA_TABS, "fish");
	const stats = useMemo(() => pediaStats(playthrough), [playthrough]);
	const group = stats[tab];

	// A search belongs to one tab, so a new tab starts with a clean address.
	const changeTab = (next: PediaTab) =>
		router.replace(`${pathname}?tab=${next}`, { scroll: false });

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					done: formatNumber(stats.overall.count),
					total: formatNumber(stats.overall.total),
					percent: stats.overall.percent,
					name: playthrough.name,
				})}
			/>
			<TileTabs
				label={t("tabsLabel")}
				tabs={PEDIA_TABS.map((id) => ({
					id,
					label: t(`tabs.${id}`),
					count: stats[id].collected.count,
					total: stats[id].collected.total,
				}))}
				activeId={tab}
				onChange={changeTab}
			>
				<div className="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
					<StatTile
						label={t("summary.captured")}
						value={formatNumber(group.collected.count)}
						caption={t("summary.of", { total: formatNumber(group.collected.total) })}
						progress={group.collected.percent / 100}
					/>
					<StatTile
						label={t("summary.donated")}
						value={formatNumber(group.donated.count)}
						caption={t("summary.of", { total: formatNumber(group.donated.total) })}
						progress={group.donated.percent / 100}
					/>
					<div className="max-sm:hidden">
						<StatTile
							label={t("summary.permit")}
							value={formatNumber(group.donated.count * PERMIT_POINTS_PER_DONATION)}
							caption={t("summary.of", {
								total: formatNumber(
									group.donated.total * PERMIT_POINTS_PER_DONATION
								),
							})}
							progress={group.donated.percent / 100}
						/>
					</div>
					<Card className="col-span-2 p-3 lg:col-span-1">
						<CommerceLevelControl />
					</Card>
				</div>
				<PediaTabPanel key={tab} tab={tab} playthrough={playthrough} />
			</TileTabs>
		</>
	);
}

export function PediaView() {
	const t = useTranslations("pedia");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <PediaContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
