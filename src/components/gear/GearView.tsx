"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import type { CommerceLevel, Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { isCollected } from "@/service/collect";
import type { Book, Cassette, GearCardItem, GearTab } from "@/service/gear";
import {
	ALL,
	damageBand,
	GEAR_TABS,
	gearItems,
	isCraftable,
	isPermitPointPrice,
	matchesPurchaseType,
	matchesRequirement,
	matchesSource,
	needsFranklyn,
	requirementOptions,
	sourceOptions,
	toolLicenseOptions,
} from "@/service/gear";
import { meter } from "@/service/overview";
import { commercePrice } from "@/service/pedia";
import { CollectionPanel } from "@/comps/collect/CollectionPanel";
import { ToggleRow } from "@/comps/collect/ToggleRow";
import type { FilterSpec } from "@/comps/collect/useCollection";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import { ItemCard } from "@/comps/page/ItemCard";
import { Card } from "@/comps/ui/Card";
import { StatTile } from "@/comps/ui/StatTile";
import { TileTabs } from "@/comps/ui/TileTabs";
import { GearCard } from "./GearCard";

type Flags = Record<string, boolean> | undefined;

const flagsOf = (playthrough: Playthrough, tab: GearTab): Flags => playthrough[tab];

const countIn = (items: { id: string }[], flags: Flags) =>
	items.filter((item) => isCollected(flags, item.id)).length;

function BookCard({
	book,
	checked,
	onChange,
	commerceLevel,
}: {
	book: Book;
	checked: boolean;
	onChange: (checked: boolean) => void;
	commerceLevel: CommerceLevel;
}) {
	const t = useTranslations("collect.gear.card");
	const card = useTranslations("collect.card");

	return (
		<ItemCard
			img={book.img}
			name={book.name}
			checked={checked}
			highlighted={checked}
			footer={
				<ToggleRow
					label={card("collected")}
					itemName={book.name}
					checked={checked}
					onChange={onChange}
				/>
			}
		>
			<div className="flex flex-col gap-2">
				{book.details.map((detail, index) => (
					<dl
						key={`${detail.aquiredFrom}-${index}`}
						className="border-line bg-tint/50 flex flex-col gap-1.5 rounded-md border-[1.5px] p-2.5"
					>
						<DetailRow label={t("acquiredFrom")} value={detail.aquiredFrom} />
						<DetailRow
							label={t("requirements")}
							value={detail.requirements || t("none")}
						/>
						{detail.buyingPrice !== 0 && (
							<DetailRow
								label={t("buyPrice")}
								mono
								value={
									typeof detail.buyingPrice === "number"
										? formatNumber(detail.buyingPrice)
										: detail.buyingPrice
								}
							/>
						)}
						<DetailRow
							label={t("sellPrice")}
							mono
							value={formatNumber(commercePrice(detail.sellingPrice, commerceLevel))}
						/>
					</dl>
				))}
			</div>
		</ItemCard>
	);
}

function DetailRow({
	label,
	value,
	mono = false,
}: {
	label: string;
	value: string;
	mono?: boolean;
}) {
	return (
		<div className="flex justify-between gap-3">
			<dt className="text-muted shrink-0">{label}</dt>
			<dd className={`text-end ${mono ? "font-mono" : ""}`}>{value}</dd>
		</div>
	);
}

function CassetteCard({
	cassette,
	checked,
	onChange,
}: {
	cassette: Cassette;
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {
	const t = useTranslations("collect.gear.card");
	const card = useTranslations("collect.card");

	return (
		<ItemCard
			img={cassette.img}
			name={cassette.name}
			checked={checked}
			highlighted={checked}
			fields={[
				{ label: t("source"), value: cassette.source.join(", "), stacked: true },
				...(cassette.buyPrice
					? [
							{
								label: t("buyPrice"),
								mono: true,
								value: isPermitPointPrice(cassette)
									? t("permitPoints", {
											count: cassette.buyPrice,
											amount: formatNumber(cassette.buyPrice),
										})
									: t("dinks", { amount: formatNumber(cassette.buyPrice) }),
							},
						]
					: []),
			]}
			footer={
				<ToggleRow
					label={card("collected")}
					itemName={cassette.name}
					checked={checked}
					onChange={onChange}
				/>
			}
		/>
	);
}

function useSourceSpec<Item extends { source: string[] }>(items: Item[]): FilterSpec<Item> {
	const t = useTranslations("collect.filters");

	return {
		id: "source",
		label: t("source"),
		options: [
			{ id: ALL, label: t("allSources") },
			...sourceOptions(items).map((source) => ({ id: source, label: source })),
		],
		apply: (rest, value) => rest.filter((item) => matchesSource(item, value)),
	};
}

function useRequirementSpec<Item extends { requirementType?: string }>(
	items: Item[]
): FilterSpec<Item> {
	const t = useTranslations("collect.gear.filters");

	return {
		id: "requirement",
		label: t("requirement"),
		options: [
			{ id: ALL, label: t("allRequirements") },
			...requirementOptions(items).map((type) => ({ id: type, label: type })),
		],
		apply: (rest, value) => rest.filter((item) => matchesRequirement(item, value)),
	};
}

function GearPanel({ tab, playthrough }: { tab: GearTab; playthrough: Playthrough }) {
	const t = useTranslations("collect.gear");
	const { prefs } = usePlaythrough();
	const flags = flagsOf(playthrough, tab);
	const things = t(`things.${tab}`);
	const commerceLevel = prefs.commerceLevel;

	const toolSource = useSourceSpec(gearItems.tools);
	const weaponSource = useSourceSpec(gearItems.weapons);
	const equipmentSource = useSourceSpec(gearItems.equipment);
	const vehicleSource = useSourceSpec(gearItems.vehicles);
	const cassetteSource = useSourceSpec(gearItems.cassettes);
	const equipmentRequirement = useRequirementSpec(gearItems.equipment);
	const vehicleRequirement = useRequirementSpec(gearItems.vehicles);

	const common = { section: tab, mode: "collected" as const, things, flags };

	if (tab === "books") {
		return (
			<CollectionPanel
				{...common}
				items={gearItems.books}
				buildSpecs={() => []}
				renderCard={(book, toggle) => (
					<BookCard
						book={book}
						checked={toggle.checked}
						onChange={toggle.onChange}
						commerceLevel={commerceLevel}
					/>
				)}
			/>
		);
	}

	if (tab === "cassettes") {
		return (
			<CollectionPanel
				{...common}
				items={gearItems.cassettes}
				buildSpecs={() => [cassetteSource]}
				renderCard={(cassette, toggle) => (
					<CassetteCard
						cassette={cassette}
						checked={toggle.checked}
						onChange={toggle.onChange}
					/>
				)}
			/>
		);
	}

	const gearCard = (inputsLabel: "ingredients" | "resources") =>
		function renderGear(
			item: GearCardItem,
			toggle: { checked: boolean; onChange: (v: boolean) => void }
		) {
			return (
				<GearCard
					item={item}
					toggle={toggle}
					commerceLevel={commerceLevel}
					inputsLabel={inputsLabel}
				/>
			);
		};

	if (tab === "tools") {
		return (
			<CollectionPanel
				{...common}
				items={gearItems.tools}
				buildSpecs={() => [
					{
						id: "license",
						label: t("filters.license"),
						options: [
							{ id: ALL, label: t("filters.allLicenses") },
							...toolLicenseOptions.map((licence) => ({
								id: licence,
								label: licence,
							})),
						],
						apply: (rest, value) => rest.filter((tool) => tool.licence === value),
					},
					toolSource,
					{
						id: "purchaseType",
						label: t("filters.purchaseType"),
						options: [
							{ id: ALL, label: t("filters.allPurchaseTypes") },
							{ id: "purchasable", label: t("filters.purchasable") },
							{ id: "dinks", label: t("filters.dinks") },
							{ id: "permit_points", label: t("filters.permitPoints") },
						],
						apply: (rest, value) =>
							rest.filter((tool) =>
								matchesPurchaseType(
									tool,
									value as "purchasable" | "dinks" | "permit_points"
								)
							),
					},
				]}
				renderCard={gearCard("ingredients")}
			/>
		);
	}

	if (tab === "weapons") {
		return (
			<CollectionPanel
				{...common}
				items={gearItems.weapons}
				buildSpecs={() => [
					weaponSource,
					{
						id: "damage",
						label: t("filters.damage"),
						options: [
							{ id: ALL, label: t("filters.allDamage") },
							{ id: "high", label: t("filters.high") },
							{ id: "medium", label: t("filters.medium") },
							{ id: "low", label: t("filters.low") },
						],
						apply: (rest, value) =>
							rest.filter((weapon) => damageBand(weapon.damage) === value),
					},
				]}
				renderCard={gearCard("resources")}
			/>
		);
	}

	if (tab === "equipment") {
		return (
			<CollectionPanel
				{...common}
				items={gearItems.equipment}
				buildSpecs={() => [equipmentSource, equipmentRequirement]}
				renderCard={gearCard("resources")}
			/>
		);
	}

	return (
		<CollectionPanel
			{...common}
			items={gearItems.vehicles}
			buildSpecs={() => [vehicleSource, vehicleRequirement]}
			renderCard={gearCard("ingredients")}
		/>
	);
}

function SummaryTiles({ tab, playthrough }: { tab: GearTab; playthrough: Playthrough }) {
	const t = useTranslations("collect.gear.tiles");
	const flags = flagsOf(playthrough, tab);
	const items = gearItems[tab] as GearCardItem[];
	const all = meter(countIn(items, flags), items.length);

	const franklyn =
		tab === "tools" || tab === "equipment" || tab === "vehicles"
			? items.filter(needsFranklyn)
			: [];
	const craftable = tab === "books" || tab === "cassettes" ? [] : items.filter(isCraftable);
	const highDamage =
		tab === "weapons" ? items.filter((item) => damageBand(item.damage) === "high") : [];

	const extra = [
		{ id: "franklyn", label: t("franklyn"), group: franklyn },
		{ id: "highDamage", label: t("highDamage"), group: highDamage },
		{ id: "craftable", label: t("craftable"), group: craftable },
	].filter((entry) => entry.group.length > 0);

	return (
		<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
			<StatTile
				label={t("collected")}
				value={formatNumber(all.count)}
				caption={t("of", { total: formatNumber(all.total) })}
				progress={all.percent / 100}
			/>
			{extra.map(({ id, label, group }) => {
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

function GearContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("collect.gear");
	const router = useRouter();
	const pathname = usePathname();
	const [tab] = useUrlTab(GEAR_TABS, "tools");

	const totals = GEAR_TABS.map((id) => ({
		id,
		count: countIn(gearItems[id], flagsOf(playthrough, id)),
		total: gearItems[id].length,
	}));
	const overall = meter(
		totals.reduce((sum, entry) => sum + entry.count, 0),
		totals.reduce((sum, entry) => sum + entry.total, 0)
	);

	// A search belongs to one tab, so a new tab starts with a clean address.
	const changeTab = (next: GearTab) =>
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
				tabs={GEAR_TABS.map((id) => {
					const entry = totals.find((item) => item.id === id)!;
					return { id, label: t(`tabs.${id}`), count: entry.count, total: entry.total };
				})}
				activeId={tab}
				onChange={changeTab}
			>
				<SummaryTiles tab={tab} playthrough={playthrough} />
				<GearPanel key={tab} tab={tab} playthrough={playthrough} />
			</TileTabs>
		</>
	);
}

export function GearView() {
	const t = useTranslations("collect.gear");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <GearContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
