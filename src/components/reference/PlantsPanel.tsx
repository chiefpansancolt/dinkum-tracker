"use client";

import type { Crop, Flower, Seed, Tree } from "dinkum-data";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { useArrowTabs } from "@/lib/hooks/useArrowTabs";
import {
	ALL,
	allCrops,
	allFlowers,
	allSeeds,
	allTrees,
	cropSearch,
	filterCrops,
	filterFlowers,
	filterSeeds,
	filterTrees,
	flowerLocationOptions,
	flowerSearch,
	inputsLabel,
	PLANT_TABS,
	plantCounts,
	type PlantTab,
	seedCategoryOptions,
	seedSearch,
	seedSorts,
	sellSorts,
	treeLocationOptions,
	treeSearch,
	treeSorts,
} from "@/service/reference";
import type { FilterSpec } from "@/comps/collect/useCollection";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { ItemIcon } from "@/comps/ui/ItemIcon";
import { BuffChips, Chips, SEASON_TONE, StatRow, useDinks } from "./parts";
import { ReferenceList } from "./ReferenceList";

const SUB_PARAM = "sub";

function SeasonChips({ seasons }: { seasons: readonly string[] }) {
	return (
		<span className="flex flex-wrap justify-end gap-1">
			{seasons.map((season) => (
				<Badge key={season} tone={SEASON_TONE[season] ?? "common"}>
					{season}
				</Badge>
			))}
		</span>
	);
}

function SeedName({ seed }: { seed: { name: string; img?: string } }) {
	return (
		<span className="flex items-center justify-end gap-1.5">
			{seed.img && <ItemIcon src={seed.img} size={20} />}
			{seed.name}
		</span>
	);
}

const range = (min?: number, max?: number) =>
	min === max || max === undefined ? String(min ?? "") : `${min}-${max}`;

function useOptions() {
	const t = useTranslations("reference.filters");
	const all = { id: ALL, label: t("all") };
	return {
		t,
		withAll: (labels: readonly string[]) => [all, ...labels.map((id) => ({ id, label: id }))],
	};
}

function SeedsList() {
	const t = useTranslations("reference");
	const card = useTranslations("reference.card");
	const { t: f, withAll } = useOptions();
	const { dinks, sellDinks } = useDinks();
	const seasons = ["Spring", "Summer", "Autumn", "Winter"];
	const count = (category: string) =>
		allSeeds.filter((seed) => seed.category === category).length;

	const filters: FilterSpec<Seed>[] = [
		{
			id: "season",
			label: f("season"),
			options: withAll(seasons),
			apply: (rest, value) => filterSeeds(rest, value, ALL),
		},
		{
			id: "category",
			label: f("category"),
			options: withAll(seedCategoryOptions),
			apply: (rest, value) => filterSeeds(rest, ALL, value),
		},
	];

	return (
		<ReferenceList
			things={t("things.seeds")}
			items={allSeeds}
			filters={filters}
			sorts={seedSorts}
			search={seedSearch}
			searchLabel={f("searchSeeds")}
			tiles={
				<StatRow
					stats={[
						{
							label: t("stats.cropSeeds"),
							value: count("Crop Seed"),
							total: allSeeds.length,
						},
						{
							label: t("stats.treeSeeds"),
							value: count("Tree Seed"),
							total: allSeeds.length,
						},
						{
							label: t("stats.bushSeeds"),
							value: count("Bush Seed"),
							total: allSeeds.length,
						},
					]}
				/>
			}
			renderCard={(seed) => {
				const fields: ItemCardField[] = [
					...(seed.season?.length
						? [{ label: card("seasons"), value: <SeasonChips seasons={seed.season} /> }]
						: []),
					...(seed.growthPeriod
						? [
								{
									label: card("growthPeriod"),
									value: card("days", { count: seed.growthPeriod }),
								},
							]
						: []),
					...(seed.regrowth
						? [
								{
									label: card("regrowth"),
									value: card("days", { count: seed.regrowth }),
								},
							]
						: []),
					...(seed.outputCountMin || seed.outputCountMax
						? [
								{
									label: card("outputCount"),
									value: range(seed.outputCountMin, seed.outputCountMax),
									mono: true,
								},
							]
						: []),
					...(seed.buyPrice !== undefined
						? [{ label: card("buyPrice"), value: dinks(seed.buyPrice), mono: true }]
						: []),
					{ label: card("sellPrice"), value: sellDinks(seed.baseSellPrice), mono: true },
					...(seed.source?.length
						? [{ label: card("source"), value: seed.source.join(", ") }]
						: []),
				];
				return (
					<ItemCard
						img={seed.img}
						name={seed.name}
						badge={
							seed.category ? <Badge tone="info">{seed.category}</Badge> : undefined
						}
						fields={fields}
					/>
				);
			}}
		/>
	);
}

function CropsList() {
	const t = useTranslations("reference");
	const card = useTranslations("reference.card");
	const { t: f, withAll } = useOptions();
	const { sellDinks } = useDinks();

	const filters: FilterSpec<Crop>[] = [
		{
			id: "season",
			label: f("season"),
			options: withAll(["Spring", "Summer", "Autumn", "Winter"]),
			apply: (rest, value) => filterCrops(rest, value),
		},
	];

	return (
		<ReferenceList
			things={t("things.crops")}
			items={allCrops}
			filters={filters}
			sorts={sellSorts<Crop>()}
			search={cropSearch}
			searchLabel={f("searchCrops")}
			tiles={<StatRow stats={[]} />}
			renderCard={(crop) => {
				const seed = crop.seed;
				const fields: ItemCardField[] = [
					...(seed ? [{ label: card("seed"), value: <SeedName seed={seed} /> }] : []),
					...(seed?.season?.length
						? [{ label: card("seasons"), value: <SeasonChips seasons={seed.season} /> }]
						: []),
					...(seed?.growthPeriod
						? [
								{
									label: card("growthPeriod"),
									value: card("days", { count: seed.growthPeriod }),
								},
							]
						: []),
					...(seed?.regrowth
						? [
								{
									label: card("regrowth"),
									value: card("days", { count: seed.regrowth }),
								},
							]
						: []),
					...(seed && (seed.outputCountMin || seed.outputCountMax)
						? [
								{
									label: card("outputCount"),
									value: range(seed.outputCountMin, seed.outputCountMax),
									mono: true,
								},
							]
						: []),
					{ label: card("sellPrice"), value: sellDinks(crop.baseSellPrice), mono: true },
					...(crop.source?.length
						? [{ label: card("source"), value: crop.source.join(", ") }]
						: []),
					...(crop.buffs && Object.keys(crop.buffs).length > 0
						? [{ label: card("buffs"), value: <BuffChips buffs={crop.buffs} /> }]
						: []),
				];
				return <ItemCard img={crop.img} name={crop.name} fields={fields} />;
			}}
		/>
	);
}

function FlowersList() {
	const t = useTranslations("reference");
	const card = useTranslations("reference.card");
	const { t: f, withAll } = useOptions();
	const { sellDinks } = useDinks();

	const filters: FilterSpec<Flower>[] = [
		{
			id: "location",
			label: f("location"),
			options: withAll(flowerLocationOptions),
			apply: (rest, value) => filterFlowers(rest, value),
		},
	];

	return (
		<ReferenceList
			things={t("things.flowers")}
			items={allFlowers}
			filters={filters}
			sorts={sellSorts<Flower>()}
			search={flowerSearch}
			searchLabel={f("searchFlowers")}
			tiles={<StatRow stats={[]} />}
			renderCard={(flower) => {
				const fields: ItemCardField[] = [
					...(flower.locations?.length
						? [
								{
									label: card("locations"),
									value: <Chips items={flower.locations} tone="info" />,
								},
							]
						: []),
					...(flower.seed
						? [{ label: card("seed"), value: <SeedName seed={flower.seed} /> }]
						: []),
					...(flower.conditions
						? [{ label: card("conditions"), value: flower.conditions, stacked: true }]
						: []),
					...(flower.growthPeriod
						? [
								{
									label: card("growthPeriod"),
									value: card("days", { count: flower.growthPeriod }),
								},
							]
						: []),
					...(flower.regrowth
						? [
								{
									label: card("regrowth"),
									value: card("days", { count: flower.regrowth }),
								},
							]
						: []),
					{
						label: card("sellPrice"),
						value: sellDinks(flower.baseSellPrice),
						mono: true,
					},
					...(flower.itemsDropped?.length
						? [
								{
									label: card("drops"),
									value: (
										<Chips
											items={flower.itemsDropped.map((item) =>
												card("item", { count: item.count, name: item.name })
											)}
										/>
									),
								},
							]
						: []),
				];
				return <ItemCard img={flower.img} name={flower.name} fields={fields} />;
			}}
		/>
	);
}

function TreesList() {
	const t = useTranslations("reference");
	const card = useTranslations("reference.card");
	const { t: f, withAll } = useOptions();

	const filters: FilterSpec<Tree>[] = [
		{
			id: "location",
			label: f("location"),
			options: withAll(treeLocationOptions),
			apply: (rest, value) => filterTrees(rest, value),
		},
	];

	return (
		<ReferenceList
			things={t("things.trees")}
			items={allTrees}
			filters={filters}
			sorts={treeSorts}
			search={treeSearch}
			searchLabel={f("searchTrees")}
			renderCard={(tree) => {
				const fields: ItemCardField[] = [
					...(tree.seed
						? [{ label: card("seed"), value: <SeedName seed={tree.seed} /> }]
						: []),
					...(tree.locations?.length
						? [
								{
									label: card("locations"),
									value: <Chips items={tree.locations} tone="info" />,
								},
							]
						: []),
					...(tree.growthPeriod
						? [
								{
									label: card("growthPeriod"),
									value: card("days", { count: tree.growthPeriod }),
								},
							]
						: []),
					...(tree.regrowth
						? [
								{
									label: card("regrowth"),
									value: card("days", { count: tree.regrowth }),
								},
							]
						: []),
					...(tree.itemsDropped?.length
						? [
								{
									label: card("drops"),
									value: (
										<Chips
											items={tree.itemsDropped.map((item) =>
												card("item", { count: item.count, name: item.name })
											)}
										/>
									),
								},
							]
						: []),
				];
				return <ItemCard img={tree.img} name={tree.name} fields={fields} />;
			}}
		/>
	);
}

/** The four plant lists as sub tabs. The sub tab lives in the address as `?sub=`. */
export function PlantsPanel() {
	const t = useTranslations("reference");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const requested = searchParams.get(SUB_PARAM);
	const sub: PlantTab = PLANT_TABS.find((id) => id === requested) ?? "seeds";

	const baseId = useId();
	// A search belongs to one list, so a new sub tab keeps only the tab in the address.
	const change = (next: PlantTab) =>
		router.replace(`${pathname}?tab=plants&${SUB_PARAM}=${next}`, { scroll: false });
	const onTabKeys = useArrowTabs(PLANT_TABS, sub, change);

	return (
		<div className="flex flex-col gap-4">
			<div
				role="tablist"
				aria-label={t("plantsLabel")}
				onKeyDown={onTabKeys}
				className="flex flex-wrap gap-2"
			>
				{PLANT_TABS.map((id) => (
					<button
						key={id}
						id={`${baseId}-tab-${id}`}
						type="button"
						role="tab"
						aria-selected={id === sub}
						aria-controls={`${baseId}-panel`}
						tabIndex={id === sub ? 0 : -1}
						onClick={() => change(id)}
						className={`flex min-h-11 items-center gap-2 rounded-md border-[1.5px] px-3 ${
							id === sub
								? "border-primary bg-tint font-semibold"
								: "border-line bg-surface hover:bg-tint/50"
						}`}
					>
						{t(`plantTabs.${id}`)}
						<span className="text-muted font-mono text-xs">{plantCounts[id]}</span>
					</button>
				))}
			</div>
			<div
				id={`${baseId}-panel`}
				role="tabpanel"
				aria-labelledby={`${baseId}-tab-${sub}`}
				className="flex flex-col gap-4"
			>
				{sub === "seeds" && <SeedsList key={sub} />}
				{sub === "crops" && <CropsList key={sub} />}
				{sub === "flowers" && <FlowersList key={sub} />}
				{sub === "trees" && <TreesList key={sub} />}
			</div>
		</div>
	);
}
