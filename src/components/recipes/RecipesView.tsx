"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { isCollected } from "@/service/collect";
import { meter } from "@/service/overview";
import type { CookingRecipe, RecipeTab } from "@/service/recipes";
import {
	ALL,
	cookingLocations,
	filterByBuffs,
	hasBuffs,
	isSoldByVendor,
	matchesLocation,
	matchesRecipeSource,
	RECIPE_TABS,
	recipeItems,
	sourceOptionsFor,
} from "@/service/recipes";
import { CollectionPanel } from "@/comps/collect/CollectionPanel";
import type { FilterSpec } from "@/comps/collect/useCollection";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import { Card } from "@/comps/ui/Card";
import { StatTile } from "@/comps/ui/StatTile";
import { TileTabs } from "@/comps/ui/TileTabs";
import { BuffsFilter } from "./BuffsFilter";
import type { RecipeCardItem } from "./RecipeCard";
import { RecipeCard } from "./RecipeCard";

type Flags = Record<string, boolean> | undefined;

const SECTION_OF = {
	cooking: "cookingRecipes",
	crafting: "craftingRecipes",
	signWriting: "signWritingRecipes",
} as const;

const flagsOf = (playthrough: Playthrough, tab: RecipeTab): Flags => playthrough[SECTION_OF[tab]];

const countIn = (items: { id: string }[], flags: Flags) =>
	items.filter((item) => isCollected(flags, item.id)).length;

function CookingPanel({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.recipes");
	const { prefs } = usePlaythrough();
	const [buffs, setBuffs] = useState<string[]>([]);
	const [matchAll, setMatchAll] = useState(false);

	const locationSpec: FilterSpec<CookingRecipe> = {
		id: "location",
		label: t("filters.location"),
		options: [
			{ id: ALL, label: t("filters.allLocations") },
			...cookingLocations.map((place) => ({ id: place, label: place })),
		],
		apply: (rest, value) => rest.filter((recipe) => matchesLocation(recipe, value)),
	};

	return (
		<CollectionPanel
			section="cookingRecipes"
			mode="unlocked"
			things={t("things.cooking")}
			items={recipeItems.cooking}
			flags={playthrough.cookingRecipes}
			buildSpecs={() => [locationSpec]}
			extraFilter={(items) => filterByBuffs(items, buffs, matchAll)}
			extraFiltering={buffs.length > 0}
			onClear={() => setBuffs([])}
			searchAction={
				<BuffsFilter
					chosen={buffs}
					matchAll={matchAll}
					onChosenChange={setBuffs}
					onMatchAllChange={setMatchAll}
				/>
			}
			renderCard={(recipe, toggle) => (
				<RecipeCard
					recipe={recipe as RecipeCardItem}
					toggle={toggle}
					commerceLevel={prefs.commerceLevel}
				/>
			)}
		/>
	);
}

function SourcePanel({
	tab,
	playthrough,
}: {
	tab: "crafting" | "signWriting";
	playthrough: Playthrough;
}) {
	const t = useTranslations("collect.recipes");
	const { prefs } = usePlaythrough();
	const items = recipeItems[tab];

	const sourceSpec: FilterSpec<(typeof items)[number]> = {
		id: "source",
		label: t("filters.sources"),
		options: [
			{ id: ALL, label: t("filters.allSources") },
			...sourceOptionsFor(items).map((source) => ({ id: source, label: source })),
		],
		apply: (rest, value) => rest.filter((recipe) => matchesRecipeSource(recipe, value)),
	};

	return (
		<CollectionPanel
			section={SECTION_OF[tab]}
			mode="unlocked"
			things={t(`things.${tab}`)}
			items={items}
			flags={flagsOf(playthrough, tab)}
			buildSpecs={() => [sourceSpec]}
			renderCard={(recipe, toggle) => (
				<RecipeCard
					recipe={recipe as RecipeCardItem}
					toggle={toggle}
					commerceLevel={prefs.commerceLevel}
				/>
			)}
		/>
	);
}

function SummaryTiles({ tab, playthrough }: { tab: RecipeTab; playthrough: Playthrough }) {
	const t = useTranslations("collect.recipes.tiles");
	const flags = flagsOf(playthrough, tab);
	const items = recipeItems[tab];
	const all = meter(countIn(items, flags), items.length);

	const groups =
		tab === "cooking"
			? [
					{
						id: "withBuffs",
						label: t("withBuffs"),
						group: recipeItems.cooking.filter(hasBuffs),
					},
					{
						id: "vendors",
						label: t("vendors"),
						group: recipeItems.cooking.filter(isSoldByVendor),
					},
				]
			: [];

	return (
		<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
			<StatTile
				label={t("unlocked")}
				value={formatNumber(all.count)}
				caption={t("of", { total: formatNumber(all.total) })}
				progress={all.percent / 100}
			/>
			{groups.map(({ id, label, group }) => {
				const done = countIn(group, flags);
				return (
					<StatTile
						key={id}
						label={label}
						value={formatNumber(done)}
						caption={t("of", { total: formatNumber(group.length) })}
						progress={done / group.length}
					/>
				);
			})}
			<Card className="col-span-2 p-3 lg:col-span-1 lg:col-start-4">
				<CommerceLevelControl />
			</Card>
		</div>
	);
}

function RecipesContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.recipes");
	const router = useRouter();
	const pathname = usePathname();
	const [tab] = useUrlTab(RECIPE_TABS, "cooking");

	const totals = RECIPE_TABS.map((id) => ({
		id,
		count: countIn(recipeItems[id], flagsOf(playthrough, id)),
		total: recipeItems[id].length,
	}));
	const overall = meter(
		totals.reduce((sum, entry) => sum + entry.count, 0),
		totals.reduce((sum, entry) => sum + entry.total, 0)
	);

	// A search belongs to one tab, so a new tab starts with a clean address.
	const changeTab = (next: RecipeTab) =>
		router.replace(`${pathname}?tab=${next}`, { scroll: false });

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					count: formatNumber(overall.count),
					total: formatNumber(overall.total),
					percent: overall.percent,
					name: playthrough.name,
				})}
			/>
			<TileTabs
				label={t("tabsLabel")}
				tabs={totals.map(({ id, count, total }) => ({
					id,
					label: t(`tabs.${id}`),
					count,
					total,
				}))}
				activeId={tab}
				onChange={changeTab}
			>
				<SummaryTiles tab={tab} playthrough={playthrough} />
				{tab === "cooking" ? (
					<CookingPanel key={tab} playthrough={playthrough} />
				) : (
					<SourcePanel key={tab} tab={tab} playthrough={playthrough} />
				)}
			</TileTabs>
		</>
	);
}

export function RecipesView() {
	const t = useTranslations("collect.recipes");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <RecipesContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
