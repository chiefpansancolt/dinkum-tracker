"use client";

import { formatDecimal, formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { CommerceLevel } from "@/types/app";
import { useTerms } from "@/lib/hooks/useTerms";
import { commercePrice } from "@/service/pedia";
import { buffDuration, buffEntries, buffUnit } from "@/service/recipes";
import type { CookingRecipe } from "@/service/recipes";
import type { Toggle } from "@/comps/collect/CollectionPanel";
import { ToggleRow } from "@/comps/collect/ToggleRow";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { BuffIcon } from "./BuffIcon";

interface RecipeInput {
	count: number;
	name: string;
}

interface RecipeVariant {
	id: string;
	inputs: RecipeInput[];
}

export interface RecipeCardItem {
	id: string;
	name: string;
	img: string;
	outputCount: number | "Varies";
	variants: RecipeVariant[];
	baseSellPrice?: number;
	source?: string[];
	cookingLocation?: string[];
	sheilasSellPrice?: number;
	tedsSellPrice?: number;
	jimmysSellPrice?: number;
	buffs?: CookingRecipe["buffs"];
}

interface RecipeCardProps {
	recipe: RecipeCardItem;
	toggle: Toggle;
	commerceLevel: CommerceLevel;
}

function Buffs({ recipe }: { recipe: CookingRecipe }) {
	const terms = useTerms();
	const t = useTranslations("collect.recipes.card");
	const minutes = buffDuration(recipe);

	return (
		<span className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
			{minutes ? (
				<span
					className="flex items-center gap-1"
					title={t("duration", { minutes, amount: formatDecimal(minutes, 1) })}
				>
					<BuffIcon buff="length" size={24} />
					<span className="font-mono text-xs">
						{t("duration", { minutes, amount: formatDecimal(minutes, 1) })}
					</span>
				</span>
			) : null}
			{buffEntries(recipe).map(([key, value]) => (
				<span key={key} className="flex items-center gap-1" title={terms.buff(key)}>
					<BuffIcon buff={key} value={value} />
					{typeof value === "number" && !key.endsWith("Level") && (
						<span className="font-mono text-xs">
							{value}
							{buffUnit(key)}
						</span>
					)}
				</span>
			))}
		</span>
	);
}

export function RecipeCard({ recipe, toggle, commerceLevel }: RecipeCardProps) {
	const t = useTranslations("collect.recipes.card");
	const card = useTranslations("collect.card");
	const sells = (price: number) => formatNumber(commercePrice(price, commerceLevel));
	const ingredientsOf = (variant: RecipeVariant) =>
		variant.inputs
			.map((input) => t("ingredient", { count: input.count, name: input.name }))
			.join(", ");
	const severalVariants = recipe.variants.length > 1;

	const fields: ItemCardField[] = [
		...(recipe.cookingLocation
			? [
					{
						label: t("cookingLocation"),
						stacked: true,
						value: (
							<span className="flex flex-wrap gap-1">
								{recipe.cookingLocation.map((place) => (
									<Badge key={place} tone="info">
										{place}
									</Badge>
								))}
							</span>
						),
					},
				]
			: []),
		...(recipe.source && recipe.source.length > 0
			? [
					{
						label: t("source"),
						stacked: true,
						value: (
							<span className="flex flex-wrap gap-1">
								{recipe.source.map((source) => (
									<Badge key={source} tone="info">
										{source}
									</Badge>
								))}
							</span>
						),
					},
				]
			: []),
		...(recipe.buffs && buffEntries(recipe as CookingRecipe).length > 0
			? [
					{
						label: t("buffs"),
						stacked: true,
						value: <Buffs recipe={recipe as CookingRecipe} />,
					},
				]
			: []),
		...(recipe.baseSellPrice !== undefined
			? [{ label: t("sellPrice"), mono: true, value: sells(recipe.baseSellPrice) }]
			: []),
		...(recipe.sheilasSellPrice
			? [{ label: t("sheilas"), mono: true, value: formatNumber(recipe.sheilasSellPrice) }]
			: []),
		...(recipe.tedsSellPrice
			? [{ label: t("teds"), mono: true, value: formatNumber(recipe.tedsSellPrice) }]
			: []),
		...(recipe.jimmysSellPrice
			? [{ label: t("jimmys"), mono: true, value: formatNumber(recipe.jimmysSellPrice) }]
			: []),
		...(!severalVariants && recipe.variants[0]
			? [{ label: t("resources"), stacked: true, value: ingredientsOf(recipe.variants[0]) }]
			: []),
	];

	return (
		<ItemCard
			img={recipe.img}
			name={recipe.name}
			badge={
				recipe.outputCount === "Varies" ? (
					<Badge tone="common">{t("varies")}</Badge>
				) : recipe.outputCount > 1 ? (
					<Badge tone="common">{t("output", { count: recipe.outputCount })}</Badge>
				) : undefined
			}
			checked={toggle.checked}
			highlighted={toggle.checked}
			fields={fields}
			footer={
				<ToggleRow
					label={card("unlocked")}
					itemName={recipe.name}
					checked={toggle.checked}
					onChange={toggle.onChange}
				/>
			}
		>
			{severalVariants && (
				<div className="flex flex-col gap-2">
					{recipe.variants.map((variant, index) => (
						<div
							key={variant.id}
							className="border-line bg-tint/50 flex flex-col gap-1 rounded-md border-[1.5px] p-2.5"
						>
							<span className="text-muted">{t("option", { n: index + 1 })}</span>
							<span>{ingredientsOf(variant)}</span>
						</div>
					))}
				</div>
			)}
		</ItemCard>
	);
}
