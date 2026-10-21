"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { CommerceLevel } from "@/types/app";
import type { GearCardItem } from "@/service/gear";
import {
	craftingRecipeAddress,
	isCraftable,
	isPermitPointPrice,
	needsFranklyn,
} from "@/service/gear";
import { damageBand } from "@/service/gear";
import { commercePrice } from "@/service/pedia";
import type { Toggle } from "@/comps/collect/CollectionPanel";
import { ToggleRow } from "@/comps/collect/ToggleRow";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";

const DAMAGE_TONE = { high: "danger", medium: "warn", low: "info" } as const;

interface GearCardProps {
	item: GearCardItem;
	toggle: Toggle;
	commerceLevel: CommerceLevel;
	/** The label of the list of inputs: Ingredients or Resources. */
	inputsLabel: "ingredients" | "resources";
}

export function GearCard({ item, toggle, commerceLevel, inputsLabel }: GearCardProps) {
	const t = useTranslations("collect.gear.card");
	const card = useTranslations("collect.card");
	const craftable = isCraftable(item);

	const fields: ItemCardField[] = [
		...(item.licence ? [{ label: t("license"), value: item.licence }] : []),
		...(item.licenceLevel != null
			? [{ label: t("licenseLevel"), value: String(item.licenceLevel), mono: true }]
			: []),
		...(item.requirementType && item.requirementLevel != null
			? [
					{
						label: `${item.requirementType} Level`,
						value: String(item.requirementLevel),
						mono: true,
					},
				]
			: []),
		{ label: t("source"), value: item.source.join(", "), stacked: true },
		...(item.windmillCompatable || item.solarPanelCompatable
			? [
					{
						label: t("compatibleWith"),
						value: [
							item.windmillCompatable ? t("windmill") : "",
							item.solarPanelCompatable ? t("solarPanel") : "",
						]
							.filter(Boolean)
							.join(", "),
					},
				]
			: []),
		...(item.damage
			? [
					{
						label: t("damage"),
						value: <DamageChip damage={item.damage} />,
						desktopOnly: false,
					},
				]
			: []),
		...(needsFranklyn(item)
			? [
					{
						label: t("unlocksAfter"),
						stacked: true,
						value: [
							item.shinyDiscCount
								? t("shinyDiscs", { count: item.shinyDiscCount })
								: "",
							item.berkoniumOreCount
								? t("berkonium", { count: item.berkoniumOreCount })
								: "",
						]
							.filter(Boolean)
							.join(", "),
					},
				]
			: []),
		...(item.inputs && item.inputs.length > 0
			? [
					{
						label: t(inputsLabel),
						stacked: true,
						value: item.inputs
							.map((input) =>
								t("ingredient", { count: input.count, name: input.name })
							)
							.join(", "),
					},
				]
			: []),
		...(item.buyPrice
			? [
					{
						label: t("buyPrice"),
						mono: true,
						value: isPermitPointPrice(item)
							? t("permitPoints", { amount: formatNumber(item.buyPrice) })
							: t("dinks", { amount: formatNumber(item.buyPrice) }),
					},
				]
			: []),
		...(item.baseSellPrice !== undefined
			? [
					{
						label: t("sellPrice"),
						mono: true,
						value: t("dinks", {
							amount: formatNumber(commercePrice(item.baseSellPrice, commerceLevel)),
						}),
					},
				]
			: []),
	];

	return (
		<ItemCard
			img={item.img}
			name={item.name}
			checked={toggle.checked}
			highlighted={toggle.checked}
			headerAction={
				craftable ? (
					<Link
						href={craftingRecipeAddress(item.name)}
						className="border-line text-link hover:bg-tint inline-flex min-h-11 shrink-0 items-center rounded-md border-[1.5px] px-2.5 text-sm font-medium lg:min-h-9"
					>
						{t("craftingRecipe")}
					</Link>
				) : undefined
			}
			fields={fields}
			description={item.description}
			footer={
				<ToggleRow
					label={card("collected")}
					itemName={item.name}
					checked={toggle.checked}
					onChange={toggle.onChange}
				/>
			}
		/>
	);
}

function DamageChip({ damage }: { damage: number }) {
	const band = damageBand(damage);
	return band ? <Badge tone={DAMAGE_TONE[band]}>{damage}</Badge> : <>{damage}</>;
}
