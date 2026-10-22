"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { isCollected } from "@/service/collect";
import { meter } from "@/service/overview";
import { commercePrice } from "@/service/pedia";
import type { Clothing, Decoration, Furniture, WardrobeTab } from "@/service/wardrobe";
import {
	ALL,
	categoryProgress,
	clothingSetOptions,
	decorationCategories,
	decorationSourceOptions,
	filterClothing,
	filterDecorations,
	filterFurniture,
	furnitureSetOptions,
	furnitureSourceOptions,
	setProgress,
	slotList,
	slotProgress,
	typesForSlot,
	WARDROBE_TABS,
	wardrobeItems,
} from "@/service/wardrobe";
import type { Toggle } from "@/comps/collect/CollectionPanel";
import { CollectionPanel } from "@/comps/collect/CollectionPanel";
import { ToggleButton } from "@/comps/collect/ToggleButton";
import type { FilterSpec } from "@/comps/collect/useCollection";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { TileTabs } from "@/comps/ui/TileTabs";
import { ProgressTiles } from "./ProgressTiles";
import { WardrobeTable } from "./WardrobeTable";

const DASH = "–";

const money = (price: number | null | undefined) =>
	price === null || price === undefined ? DASH : formatNumber(price);

const options = (all: string, labels: readonly string[]) => [
	{ id: ALL, label: all },
	...labels.map((label) => ({ id: label, label })),
];

const present = (value: string | undefined) => (value ? value : DASH);

function CollectButton({ item, toggle }: { item: { name: string }; toggle: Toggle }) {
	const t = useTranslations("collect.card");

	return (
		<ToggleButton
			checked={toggle.checked}
			onLabel={t("collected")}
			offLabel={t("markCollected")}
			itemName={item.name}
			onChange={toggle.onChange}
		/>
	);
}

function ClothingPanel({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.wardrobe");
	const shop = t("shop");
	const { prefs } = usePlaythrough();
	const flags = playthrough.clothing;
	const sell = (item: Clothing) => money(commercePrice(item.baseSellPrice, prefs.commerceLevel));

	const setsHint = (count: number) => t("hints.sets", { count, amount: formatNumber(count) });
	const typeHint = (slot: string) => {
		if (slot === ALL) return t("hints.typeNeedsSlot");
		const count = typesForSlot(slot).length;
		return t("hints.typesForSlot", { count, amount: formatNumber(count), slot });
	};

	const buildSpecs = (values: Record<string, string>): FilterSpec<Clothing>[] => [
		{
			id: "slot",
			label: t("filters.slot"),
			options: options(t("filters.all"), slotList),
			hint: t("hints.slots", {
				count: slotList.length,
				amount: formatNumber(slotList.length),
			}),
			apply: (rest, value) => filterClothing(rest, { slot: value, type: ALL, set: ALL }),
		},
		{
			id: "type",
			label: t("filters.type"),
			options: options(t("filters.all"), typesForSlot(values.slot ?? ALL)),
			hint: typeHint(values.slot ?? ALL),
			apply: (rest, value) => filterClothing(rest, { slot: ALL, type: value, set: ALL }),
		},
		{
			id: "set",
			label: t("filters.set"),
			options: options(t("filters.allSets"), clothingSetOptions),
			hint: setsHint(clothingSetOptions.length),
			apply: (rest, value) => filterClothing(rest, { slot: ALL, type: ALL, set: value }),
		},
	];

	return (
		<CollectionPanel
			section="clothing"
			mode="collected"
			things={t("things.clothing")}
			items={wardrobeItems.clothing}
			flags={flags}
			buildSpecs={buildSpecs}
			afterChange={(id, values) => (id === "slot" ? { ...values, type: ALL } : values)}
			tiles={({ values, setValue }) => (
				<ProgressTiles
					heading={t("progress.clothing")}
					progress={slotProgress(flags)}
					selected={values.slot === ALL ? null : values.slot}
					onSelect={(slot) => setValue("slot", slot === values.slot ? ALL : slot)}
					showPercent
					columns={5}
				/>
			)}
			renderList={(shown, toggleOf, total) => (
				<WardrobeTable
					items={shown}
					total={total}
					toggleOf={toggleOf}
					columns={[
						{
							id: "type",
							label: t("list.type"),
							render: (item) => <Badge tone="rare">{item.type}</Badge>,
						},
						{
							id: "slot",
							label: t("list.slot"),
							render: (item) => item.slot.join(", "),
						},
						{ id: "set", label: t("list.set"), render: (item) => present(item.set) },
						{
							id: "price",
							label: t("list.price"),
							align: "end",
							render: (item) => money(item.displayPrice),
						},
						{ id: "sell", label: t("list.sell"), align: "end", render: sell },
						{
							id: "at",
							label: t("list.availableAt"),
							render: (item) => (item.cloversCatalogue ? shop : DASH),
						},
						{
							id: "catalogue",
							label: t("list.catalogue"),
							align: "end",
							render: (item) => money(item.cataloguePrice),
						},
					]}
					mobileDetail={(item) => <Badge tone="rare">{item.type}</Badge>}
					mobileValue={sell}
				/>
			)}
			renderCard={(item, toggle) => {
				const fields: ItemCardField[] = [
					{ label: t("card.slot"), value: item.slot.join(", ") },
					{ label: t("card.set"), value: present(item.set) },
					{ label: t("card.price"), value: money(item.displayPrice), mono: true },
					{ label: t("card.sellPrice"), value: sell(item), mono: true },
					{ label: t("card.availableAt"), value: item.cloversCatalogue ? shop : DASH },
					{
						label: t("card.cataloguePrice"),
						value: money(item.cataloguePrice),
						mono: true,
					},
				];
				return (
					<ItemCard
						img={item.img}
						name={item.name}
						badge={<Badge tone="rare">{item.type}</Badge>}
						checked={toggle.checked}
						highlighted={toggle.checked}
						fields={fields}
						footer={<CollectButton item={item} toggle={toggle} />}
					/>
				);
			}}
			cardMinWidth="14rem"
		/>
	);
}

function FurniturePanel({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.wardrobe");
	const { prefs } = usePlaythrough();
	const flags = playthrough.furniture;
	const sell = (item: Furniture) => money(commercePrice(item.baseSellPrice, prefs.commerceLevel));
	const sourceOf = (item: Furniture) => (item.source?.length ? item.source.join(", ") : DASH);

	const buildSpecs = (): FilterSpec<Furniture>[] => [
		{
			id: "set",
			label: t("filters.set"),
			options: options(t("filters.allSets"), furnitureSetOptions),
			hint: t("hints.sets", {
				count: furnitureSetOptions.length,
				amount: formatNumber(furnitureSetOptions.length),
			}),
			apply: (rest, value) =>
				filterFurniture(rest, { set: value, source: ALL, catalogue: "all" }),
		},
		{
			id: "source",
			label: t("filters.source"),
			options: options(t("filters.allSources"), furnitureSourceOptions),
			hint: t("hints.sources"),
			apply: (rest, value) =>
				filterFurniture(rest, { set: ALL, source: value, catalogue: "all" }),
		},
		{
			id: "catalogue",
			label: t("filters.catalogue"),
			options: [
				{ id: "all", label: t("filters.all") },
				{ id: "melvins", label: t("filters.melvins") },
				{ id: "not_melvins", label: t("filters.notMelvins") },
			],
			apply: (rest, value) =>
				filterFurniture(rest, {
					set: ALL,
					source: ALL,
					catalogue: value as "melvins" | "not_melvins",
				}),
		},
	];

	return (
		<CollectionPanel
			section="furniture"
			mode="collected"
			things={t("things.furniture")}
			items={wardrobeItems.furniture}
			flags={flags}
			buildSpecs={buildSpecs}
			tiles={({ values, setValue }) => (
				<ProgressTiles
					heading={t("progress.furniture")}
					progress={setProgress(flags)}
					selected={values.set === ALL ? null : values.set}
					onSelect={(set) => setValue("set", set === values.set ? ALL : set)}
					columns={6}
				/>
			)}
			renderList={(shown, toggleOf, total) => (
				<WardrobeTable
					items={shown}
					total={total}
					toggleOf={toggleOf}
					columns={[
						{
							id: "set",
							label: t("list.set"),
							render: (item) => present(item.furnitureSet),
						},
						{ id: "source", label: t("list.source"), render: sourceOf },
						{
							id: "price",
							label: t("list.price"),
							align: "end",
							render: (item) => money(item.displayPrice),
						},
						{
							id: "catalogue",
							label: t("list.catalogue"),
							align: "end",
							render: (item) => money(item.cataloguePrice),
						},
						{ id: "sell", label: t("list.sell"), align: "end", render: sell },
					]}
					mobileDetail={(item) =>
						item.furnitureSet ? (
							<span className="text-muted">{item.furnitureSet}</span>
						) : null
					}
					mobileValue={sell}
				/>
			)}
			renderCard={(item, toggle) => {
				const fields: ItemCardField[] = [
					{ label: t("card.set"), value: present(item.furnitureSet) },
					{ label: t("card.source"), value: sourceOf(item), stacked: true },
					{ label: t("card.price"), value: money(item.displayPrice), mono: true },
					{
						label: t("card.cataloguePrice"),
						value: money(item.cataloguePrice),
						mono: true,
					},
					{ label: t("card.sellPrice"), value: sell(item), mono: true },
				];
				return (
					<ItemCard
						img={item.img}
						name={item.name}
						checked={toggle.checked}
						highlighted={toggle.checked}
						fields={fields}
						footer={<CollectButton item={item} toggle={toggle} />}
					/>
				);
			}}
			cardMinWidth="14rem"
		/>
	);
}

function DecorationsPanel({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.wardrobe");
	const { prefs } = usePlaythrough();
	const flags = playthrough.decorations;
	const sell = (item: Decoration) =>
		money(commercePrice(item.baseSellPrice, prefs.commerceLevel));
	const sourceOf = (item: Decoration) => (item.source?.length ? item.source.join(", ") : DASH);

	const buildSpecs = (): FilterSpec<Decoration>[] => [
		{
			id: "category",
			label: t("filters.category"),
			options: options(t("filters.allCategories"), decorationCategories),
			hint: t("hints.categories", {
				count: decorationCategories.length,
				amount: formatNumber(decorationCategories.length),
			}),
			apply: (rest, value) => filterDecorations(rest, { category: value, source: ALL }),
		},
		{
			id: "source",
			label: t("filters.source"),
			options: options(t("filters.allSources"), decorationSourceOptions),
			hint: t("hints.sources"),
			apply: (rest, value) => filterDecorations(rest, { category: ALL, source: value }),
		},
	];

	return (
		<CollectionPanel
			section="decorations"
			mode="collected"
			things={t("things.decorations")}
			items={wardrobeItems.decorations}
			flags={flags}
			buildSpecs={buildSpecs}
			tiles={({ values, setValue }) => (
				<ProgressTiles
					heading={t("progress.decorations")}
					progress={categoryProgress(flags)}
					selected={values.category === ALL ? null : values.category}
					onSelect={(category) =>
						setValue("category", category === values.category ? ALL : category)
					}
					columns={8}
				/>
			)}
			renderList={(shown, toggleOf, total) => (
				<WardrobeTable
					items={shown}
					total={total}
					toggleOf={toggleOf}
					columns={[
						{
							id: "category",
							label: t("list.category"),
							render: (item) => <Badge tone="common">{item.category}</Badge>,
						},
						{ id: "source", label: t("list.source"), render: sourceOf },
						{
							id: "buy",
							label: t("list.buy"),
							align: "end",
							render: (item) => money(item.buyPrice),
						},
						{ id: "sell", label: t("list.sell"), align: "end", render: sell },
					]}
					mobileDetail={(item) => <Badge tone="common">{item.category}</Badge>}
					mobileValue={sell}
				/>
			)}
			renderCard={(item, toggle) => {
				const fields: ItemCardField[] = [
					{ label: t("card.source"), value: sourceOf(item), stacked: true },
					{ label: t("card.buyPrice"), value: money(item.buyPrice), mono: true },
					{ label: t("card.sellPrice"), value: sell(item), mono: true },
				];
				return (
					<ItemCard
						img={item.img}
						name={item.name}
						badge={<Badge tone="common">{item.category}</Badge>}
						checked={toggle.checked}
						highlighted={toggle.checked}
						fields={fields}
						footer={<CollectButton item={item} toggle={toggle} />}
					/>
				);
			}}
			cardMinWidth="14rem"
		/>
	);
}

const countIn = (items: { id: string }[], flags: Record<string, boolean> | undefined) =>
	items.filter((item) => isCollected(flags, item.id)).length;

function WardrobeContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.wardrobe");
	const router = useRouter();
	const pathname = usePathname();
	const [tab] = useUrlTab(WARDROBE_TABS, "clothing");

	const totals = WARDROBE_TABS.map((id) => ({
		id,
		count: countIn(wardrobeItems[id], playthrough[id]),
		total: wardrobeItems[id].length,
	}));
	const overall = meter(
		totals.reduce((sum, entry) => sum + entry.count, 0),
		totals.reduce((sum, entry) => sum + entry.total, 0)
	);

	// A search belongs to one tab, so a new tab starts with a clean address.
	const changeTab = (next: WardrobeTab) =>
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
				{tab === "clothing" && <ClothingPanel key={tab} playthrough={playthrough} />}
				{tab === "furniture" && <FurniturePanel key={tab} playthrough={playthrough} />}
				{tab === "decorations" && <DecorationsPanel key={tab} playthrough={playthrough} />}
			</TileTabs>
		</>
	);
}

export function WardrobeView() {
	const t = useTranslations("collect.wardrobe");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <WardrobeContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
