"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import type { NpcFilters } from "@/service/npcs";
import {
	allNpcs,
	emptyNpcFilters,
	filterNpcs,
	formatHearts,
	fullHeartCount,
	heartsOf,
	MAX_TOTAL_HEARTS,
	metCount,
	totalHearts,
} from "@/service/npcs";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { StatTile } from "@/comps/ui/StatTile";
import { useToast } from "@/comps/ui/Toast";
import { NpcCard } from "./NpcCard";

function withHearts(playthrough: Playthrough, id: string, hearts: number): Playthrough {
	return { ...playthrough, relationships: { ...playthrough.relationships, [id]: hearts } };
}

function NpcsContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("people.npcs");
	const undo = useTranslations("common");
	const searchParams = useSearchParams();
	const { update } = usePlaythrough();
	const showToast = useToast();
	const [filters, setFilters] = useState<NpcFilters>({
		...emptyNpcFilters,
		query: searchParams.get("q") ?? "",
	});
	useSearchInAddress(filters.query);

	const relationships = playthrough.relationships;
	const total = totalHearts(relationships);
	const full = fullHeartCount(relationships);
	const met = metCount(relationships);
	const shown = filterNpcs(relationships, filters);

	const fields: FilterFieldConfig[] = [
		{
			id: "relationship",
			label: t("filters.relationship"),
			options: [
				{ id: "all", label: t("filters.all") },
				{ id: "none", label: t("filters.none") },
				{ id: "progress", label: t("filters.progress") },
				{ id: "full", label: t("filters.full") },
			],
		},
		{
			id: "residence",
			label: t("filters.residence"),
			options: [
				{ id: "all", label: t("filters.all") },
				{ id: "can_move_in", label: t("filters.canMoveIn") },
				{ id: "visitors", label: t("filters.visitors") },
			],
		},
	];

	const setHearts = (npc: { id: string; name: string }, hearts: number) => {
		const previous = heartsOf(relationships, npc.id);
		if (previous === hearts) return;

		const saved = update((current) => withHearts(current, npc.id, hearts));
		if (!saved) return;

		showToast({
			key: "npc-hearts",
			variant: "success",
			title: t("toast.set", { name: npc.name, hearts: formatHearts(hearts) }),
			action: {
				label: undo("undo"),
				onAction: () => update((current) => withHearts(current, npc.id, previous)),
			},
		});
	};

	const clearFilters = () => setFilters(emptyNpcFilters);

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					hearts: formatHearts(total),
					total: MAX_TOTAL_HEARTS,
					count: allNpcs.length,
					name: playthrough.name,
				})}
			/>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
				<div className="col-span-2 lg:col-span-1">
					<StatTile
						label={t("tiles.total")}
						value={formatHearts(total)}
						caption={t("tiles.of", { total: MAX_TOTAL_HEARTS })}
						progress={total / MAX_TOTAL_HEARTS}
					/>
				</div>
				<StatTile
					label={t("tiles.full")}
					value={formatNumber(full)}
					caption={t("tiles.ofNpcs", { total: allNpcs.length })}
					progress={full / allNpcs.length}
				/>
				<StatTile
					label={t("tiles.met")}
					value={formatNumber(met)}
					caption={t("tiles.ofNpcs", { total: allNpcs.length })}
					progress={met / allNpcs.length}
				/>
			</div>
			<Card className="p-4">
				<FilterBlock
					fields={fields}
					values={{ relationship: filters.relationship, residence: filters.residence }}
					onChange={(id, value) => setFilters((current) => ({ ...current, [id]: value }))}
					onClear={clearFilters}
					search={{
						label: t("filters.search"),
						value: filters.query,
						onChange: (query) => setFilters((current) => ({ ...current, query })),
					}}
					summary={t("filters.showing", {
						shown: shown.length,
						total: allNpcs.length,
						full,
						met,
					})}
					sheetTitle={t("filters.sheetTitle")}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: filterNpcs(relationships, { ...filters, ...draft } as NpcFilters)
								.length,
						})
					}
				/>
			</Card>
			<p className="text-muted">{t("hint")}</p>
			{shown.length === 0 ? (
				<EmptyState
					title={t("empty.title")}
					description={t("empty.description")}
					actions={<Button onClick={clearFilters}>{t("empty.clear")}</Button>}
				/>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(min(18rem,100%),1fr))] gap-3">
					{shown.map((npc) => (
						<NpcCard
							key={npc.id}
							npc={npc}
							hearts={heartsOf(relationships, npc.id)}
							onChange={(hearts) => setHearts(npc, hearts)}
						/>
					))}
				</div>
			)}
		</>
	);
}

export function NpcsView() {
	const t = useTranslations("people.npcs");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <NpcsContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
