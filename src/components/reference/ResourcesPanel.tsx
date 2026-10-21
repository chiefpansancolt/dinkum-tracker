"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuListFilter } from "react-icons/lu";
import { toggled } from "@/service/breakdown";
import type { ReferenceResource } from "@/service/reference";
import {
	ALL,
	allResources,
	filterResources,
	inputsLabel,
	nameSearch,
	RESOURCE_KINDS,
	resourceKindCount,
	resourceSorts,
	resourceSourceOptions,
	usedInCount,
} from "@/service/reference";
import { ResourceType } from "@/data/constants/components";
import type { FilterSpec } from "@/comps/collect/useCollection";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import type { BadgeTone } from "@/comps/ui/Badge";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { Checkbox } from "@/comps/ui/Checkbox";
import { Dialog } from "@/comps/ui/Dialog";
import { BuffChips, Chips, StatRow, useDinks } from "./parts";
import { ReferenceList } from "./ReferenceList";

const KIND_TONE: Record<string, BadgeTone> = {
	"Animal Product": "success",
	Foragable: "success",
	Mineral: "veryRare",
	Relic: "info",
	Trophy: "warn",
	Craftable: "info",
};

function ResourceCard({
	resource,
	showUsedIn,
}: {
	resource: ReferenceResource;
	showUsedIn: boolean;
}) {
	const t = useTranslations("reference.card");
	const { dinks, sellDinks } = useDinks();

	const fields: ItemCardField[] = [
		...(resource.source?.length
			? [{ label: t("source"), value: <Chips items={resource.source} /> }]
			: []),
		...(resource.locations?.length
			? [{ label: t("locations"), value: resource.locations.join(", ") }]
			: []),
		...(resource.buyPrice !== undefined
			? [{ label: t("buyPrice"), value: dinks(resource.buyPrice), mono: true }]
			: []),
		{ label: t("sellPrice"), value: sellDinks(resource.baseSellPrice), mono: true },
		...(resource.buffs && Object.keys(resource.buffs).length > 0
			? [{ label: t("buffs"), value: <BuffChips buffs={resource.buffs} /> }]
			: []),
		...(resource.variants?.length
			? [
					{
						label: t("resources"),
						value: (
							<Chips
								items={resource.variants.map((variant) =>
									inputsLabel(variant.inputs)
								)}
							/>
						),
					},
				]
			: []),
		...(showUsedIn
			? [
					{
						label: t("usedIn"),
						value: t("usedInItems", { count: usedInCount(resource) }),
						mono: true,
					},
				]
			: []),
	];

	return (
		<ItemCard
			img={resource.img}
			name={resource.name}
			badge={
				<Badge tone={KIND_TONE[resource.resourceType] ?? "common"}>
					{resource.resourceType}
				</Badge>
			}
			fields={fields}
		/>
	);
}

function KindPanel({
	kinds,
	onChange,
}: {
	kinds: ResourceType[];
	onChange: (kinds: ResourceType[]) => void;
}) {
	const t = useTranslations("reference.resourcesPanel");

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-3">
				<h2 className="text-lg font-semibold">{t("panelTitle")}</h2>
				<Button disabled={kinds.length === 0} onClick={() => onChange([])}>
					{t("clear")}
				</Button>
			</div>
			<ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
				{RESOURCE_KINDS.map((kind) => (
					<li
						key={kind}
						className={`rounded-md border-[1.5px] px-3 ${
							kinds.includes(kind)
								? "border-primary bg-tint"
								: "border-line bg-surface"
						}`}
					>
						<Checkbox
							label={`${kind}, ${t("itemCount", { count: resourceKindCount(kind) })}`}
							checked={kinds.includes(kind)}
							onChange={() => onChange(toggled(kinds, kind))}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export function ResourcesPanel() {
	const t = useTranslations("reference");
	const panel = useTranslations("reference.resourcesPanel");
	const [kinds, setKinds] = useState<ResourceType[]>([]);
	const [commonOnly, setCommonOnly] = useState(false);
	const [panelOpen, setPanelOpen] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);

	const sourceSpec: FilterSpec<ReferenceResource> = {
		id: "source",
		label: t("filters.source"),
		options: [
			{ id: ALL, label: t("filters.all") },
			...resourceSourceOptions.map((source) => ({ id: source, label: source })),
		],
		apply: (rest, value) =>
			filterResources(rest, { kinds: [], source: value, commonOnly: false }),
	};

	const kindButton = (label: string, className: string, onClick: () => void) => (
		<Button className={className} aria-haspopup="dialog" onClick={onClick}>
			<LuListFilter size={16} aria-hidden="true" />
			{label}
		</Button>
	);
	const kindLabel =
		kinds.length > 0 ? panel("typesWithCount", { count: kinds.length }) : panel("types");

	return (
		<ReferenceList
			things={t("things.resources")}
			items={allResources.map((resource, index) => ({
				...resource,
				id: `${resource.id}-${index}`,
			}))}
			filters={[sourceSpec]}
			sorts={resourceSorts}
			sortFirst
			search={nameSearch}
			searchLabel={t("filters.searchName")}
			extraFilter={(items) => filterResources(items, { kinds, source: ALL, commonOnly })}
			extraFiltering={kinds.length > 0 || commonOnly}
			onClear={() => {
				setKinds([]);
				setCommonOnly(false);
			}}
			searchAction={
				<>
					{kindButton(kindLabel, "max-lg:hidden", () => setPanelOpen(!panelOpen))}
					{kindButton(kindLabel, "lg:hidden", () => setSheetOpen(true))}
				</>
			}
			tiles={
				<StatRow
					stats={[
						{
							label: t("stats.foragables"),
							value: resourceKindCount(ResourceType.FORAGABLE),
							total: allResources.length,
						},
						{
							label: t("stats.animalProducts"),
							value: resourceKindCount(ResourceType.ANIMALPRODUCT),
							total: allResources.length,
						},
						{
							label: t("stats.craftables"),
							value: resourceKindCount(ResourceType.CRAFTABLE),
							total: allResources.length,
						},
					]}
				/>
			}
			belowFilters={
				<>
					{panelOpen && (
						<Card className="p-4 max-lg:hidden">
							<KindPanel kinds={kinds} onChange={setKinds} />
						</Card>
					)}
					<Dialog
						open={sheetOpen}
						onClose={() => setSheetOpen(false)}
						title={panel("panelTitle")}
						footer={
							<Button
								variant="primary"
								className="w-full"
								onClick={() => setSheetOpen(false)}
							>
								{panel("done", {
									count: filterResources(allResources, {
										kinds,
										source: ALL,
										commonOnly,
									}).length,
								})}
							</Button>
						}
					>
						<KindPanel kinds={kinds} onChange={setKinds} />
					</Dialog>
					<Checkbox
						label={panel("commonOnly")}
						checked={commonOnly}
						onChange={setCommonOnly}
					/>
				</>
			}
			renderCard={(resource) => <ResourceCard resource={resource} showUsedIn={commonOnly} />}
		/>
	);
}
