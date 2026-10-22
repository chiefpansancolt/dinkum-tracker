"use client";

import { useTranslations } from "next-intl";
import type { FoodRecipe } from "@/service/reference";
import { allFood, foodSearch, inputsLabel, sellSorts } from "@/service/reference";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { Chips, StatRow, useDinks } from "./parts";
import { ReferenceList } from "./ReferenceList";

function FoodCard({ recipe }: { recipe: FoodRecipe }) {
	const t = useTranslations("reference.card");
	const { sellDinks } = useDinks();

	const fields: ItemCardField[] = [
		...(recipe.source?.length
			? [{ label: t("source"), value: <Chips items={recipe.source} tone="info" /> }]
			: []),
		{ label: t("sellPrice"), value: sellDinks(recipe.baseSellPrice), mono: true },
		{
			label: t("conversion"),
			value: <Chips items={recipe.variants.map((variant) => inputsLabel(variant.inputs))} />,
		},
	];

	return (
		<ItemCard
			img={recipe.img}
			name={recipe.name}
			badge={
				recipe.outputCount === "Varies" ? (
					<Badge tone="common">{t("varies")}</Badge>
				) : typeof recipe.outputCount === "number" && recipe.outputCount > 1 ? (
					<Badge tone="common">{t("output", { count: recipe.outputCount })}</Badge>
				) : undefined
			}
			fields={fields}
		/>
	);
}

export function FoodPanel() {
	const t = useTranslations("reference");

	return (
		<ReferenceList
			things={t("things.food")}
			items={allFood}
			filters={[]}
			sorts={sellSorts<FoodRecipe>()}
			search={foodSearch}
			searchLabel={t("filters.searchFood")}
			tiles={<StatRow stats={[]} />}
			renderCard={(recipe) => <FoodCard recipe={recipe} />}
		/>
	);
}
