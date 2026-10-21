"use client";

import type { Animal } from "dinkum-data";
import { useTranslations } from "next-intl";
import {
	ALL,
	allAnimals,
	animalSearch,
	animalSorts,
	animalTypeLabel,
	animalTypeOptions,
	filterAnimals,
	habitatOptions,
	temperamentOptions,
} from "@/service/reference";
import type { FilterSpec } from "@/comps/collect/useCollection";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import type { BadgeTone } from "@/comps/ui/Badge";
import { Badge } from "@/comps/ui/Badge";
import { Chips, StatRow, useDinks } from "./parts";
import { ReferenceList } from "./ReferenceList";

const TEMPERAMENT_TONE: Record<string, BadgeTone> = {
	Passive: "success",
	Neutral: "warn",
	Aggressive: "danger",
};
const TYPE_TONE: Record<string, BadgeTone> = {
	"Wild Animal": "veryRare",
	"Farm Animal": "success",
	"Tammed Animal": "info",
};

const countOfType = (type: string) => allAnimals.filter((animal) => animal.type === type).length;

function AnimalCard({ animal }: { animal: Animal }) {
	const t = useTranslations("reference.card");
	const { dinks, sellDinks } = useDinks();
	const items = (list: { count: number; name: string }[]) =>
		list.map((item) => t("item", { count: item.count, name: item.name }));

	const fields: ItemCardField[] = [
		...(animal.health != null
			? [{ label: t("health"), value: String(animal.health), mono: true }]
			: []),
		...(animal.domesticable ? [{ label: t("domesticable"), value: t("yes") }] : []),
		...(animal.habitat?.length
			? [{ label: t("habitat"), value: <Chips items={animal.habitat} tone="info" /> }]
			: []),
		...(animal.source ? [{ label: t("source"), value: animal.source }] : []),
		...(animal.buyPrice
			? [{ label: t("buyPrice"), value: dinks(animal.buyPrice), mono: true }]
			: []),
		...(animal.baseSellPrice
			? [{ label: t("sellPrice"), value: sellDinks(animal.baseSellPrice), mono: true }]
			: []),
		...(animal.maxSellPrice && animal.maxSellPrice !== animal.baseSellPrice
			? [{ label: t("maxSellPrice"), value: dinks(animal.maxSellPrice), mono: true }]
			: []),
		...(animal.researchReward
			? [{ label: t("researchReward"), value: dinks(animal.researchReward), mono: true }]
			: []),
		...(animal.drops?.length
			? [{ label: t("drops"), value: <Chips items={items(animal.drops)} /> }]
			: []),
		...(animal.produces?.length
			? [{ label: t("produces"), value: <Chips items={items(animal.produces)} /> }]
			: []),
	];

	return (
		<ItemCard
			img={animal.img}
			name={animal.name}
			badge={
				<span className="flex flex-wrap gap-1">
					<Badge tone={TEMPERAMENT_TONE[animal.temperament] ?? "common"}>
						{animal.temperament}
					</Badge>
					<Badge tone={TYPE_TONE[animal.type] ?? "common"}>
						{animalTypeLabel(animal.type)}
					</Badge>
				</span>
			}
			fields={fields}
		/>
	);
}

export function AnimalsPanel() {
	const t = useTranslations("reference");
	const all = { id: ALL, label: t("filters.all") };
	const named = (labels: readonly string[], label = (value: string) => value) =>
		labels.map((value) => ({ id: value, label: label(value) }));

	const filters: FilterSpec<Animal>[] = [
		{
			id: "temperament",
			label: t("filters.temperament"),
			options: [all, ...named(temperamentOptions)],
			apply: (rest, value) =>
				filterAnimals(rest, { temperament: value, type: ALL, habitat: ALL }),
		},
		{
			id: "type",
			label: t("filters.type"),
			options: [all, ...named(animalTypeOptions, animalTypeLabel)],
			apply: (rest, value) =>
				filterAnimals(rest, { temperament: ALL, type: value, habitat: ALL }),
		},
		{
			id: "habitat",
			label: t("filters.habitat"),
			options: [all, ...named(habitatOptions)],
			apply: (rest, value) =>
				filterAnimals(rest, { temperament: ALL, type: ALL, habitat: value }),
		},
	];

	return (
		<ReferenceList
			things={t("things.animals")}
			items={allAnimals}
			filters={filters}
			sorts={animalSorts}
			search={animalSearch}
			searchLabel={t("filters.searchAnimals")}
			tiles={
				<StatRow
					stats={[
						{
							label: t("stats.wild"),
							value: countOfType("Wild Animal"),
							total: allAnimals.length,
						},
						{
							label: t("stats.farm"),
							value: countOfType("Farm Animal"),
							total: allAnimals.length,
						},
						{
							label: t("stats.tamed"),
							value: countOfType("Tammed Animal"),
							total: allAnimals.length,
						},
					]}
				/>
			}
			renderCard={(animal) => <AnimalCard animal={animal} />}
		/>
	);
}
