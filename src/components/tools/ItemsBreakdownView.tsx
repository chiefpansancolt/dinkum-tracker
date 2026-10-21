"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuListFilter, LuSearch } from "react-icons/lu";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import type { BreakdownFilters, SortBy } from "@/service/breakdown";
import {
	emptyBreakdownFilters,
	filterResources,
	isCommon,
	mostUsed,
	resourceIndex,
} from "@/service/breakdown";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { Checkbox } from "@/comps/ui/Checkbox";
import { Dialog } from "@/comps/ui/Dialog";
import { EmptyState } from "@/comps/ui/EmptyState";
import { Field } from "@/comps/ui/Field";
import { Input } from "@/comps/ui/Input";
import { Select } from "@/comps/ui/Select";
import { StatTile } from "@/comps/ui/StatTile";
import { BreakdownFilterPanel, filterCount } from "./BreakdownFilterPanel";
import { ResourceCard } from "./ResourceCard";

const commonCount = resourceIndex.filter(isCommon).length;
const topResource = mostUsed(resourceIndex);

export function ItemsBreakdownView() {
	const t = useTranslations("tools.breakdown");
	const searchParams = useSearchParams();
	const [filters, setFilters] = useState<BreakdownFilters>({
		...emptyBreakdownFilters,
		query: searchParams.get("q") ?? "",
	});
	const [panelOpen, setPanelOpen] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	useSearchInAddress(filters.query);

	const change = (changes: Partial<BreakdownFilters>) =>
		setFilters((current) => ({ ...current, ...changes }));
	const shown = filterResources(resourceIndex, filters);
	const selected = filterCount(filters);
	const clearSelections = () => change({ categories: [], types: [] });

	const panel = (
		<BreakdownFilterPanel
			categories={filters.categories}
			types={filters.types}
			onCategoriesChange={(categories) => change({ categories })}
			onTypesChange={(types) => change({ types })}
		/>
	);

	return (
		<>
			<PageHeader
				showSaved={false}
				title={t("title")}
				subline={t("subline", { count: resourceIndex.length })}
			/>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<StatTile
					label={t("tiles.resources")}
					value={formatNumber(resourceIndex.length)}
					caption={t("tiles.resourcesCaption")}
					progress={1}
				/>
				<StatTile
					label={t("tiles.common")}
					value={formatNumber(commonCount)}
					caption={t("tiles.of", { total: formatNumber(resourceIndex.length) })}
					progress={commonCount / resourceIndex.length}
				/>
				<StatTile
					label={t("tiles.mostUsed")}
					value={topResource.name}
					caption={t("tiles.items", { count: topResource.usedIn.length })}
					progress={1}
				/>
			</div>
			<Card className="bg-bg flex flex-col gap-3 p-4 lg:sticky lg:top-0 lg:z-10">
				<div className="flex flex-wrap items-end gap-3">
					<div className="min-w-0 flex-1 lg:min-w-60">
						<Field label={t("search")}>
							<Input
								type="search"
								value={filters.query}
								placeholder={t("searchPlaceholder")}
								leadingIcon={<LuSearch size={16} />}
								onChange={(event) => change({ query: event.target.value })}
							/>
						</Field>
					</div>
					<div className="w-44 max-sm:flex-1">
						<Field label={t("sortBy")}>
							<Select
								value={filters.sortBy}
								onChange={(event) =>
									change({ sortBy: event.target.value as SortBy })
								}
							>
								<option value="name">{t("sortName")}</option>
								<option value="usageCount">{t("sortUsage")}</option>
							</Select>
						</Field>
					</div>
					<Button
						aria-expanded={panelOpen}
						className="max-lg:hidden"
						onClick={() => setPanelOpen(!panelOpen)}
					>
						<LuListFilter size={16} aria-hidden="true" />
						{selected > 0 ? t("filterWithCount", { count: selected }) : t("filter")}
					</Button>
					<Button
						aria-haspopup="dialog"
						className="lg:hidden"
						onClick={() => setSheetOpen(true)}
					>
						<LuListFilter size={16} aria-hidden="true" />
						{selected > 0 ? t("filterWithCount", { count: selected }) : t("filter")}
					</Button>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
					<Checkbox
						label={t("commonOnly")}
						checked={filters.commonOnly}
						onChange={(commonOnly) => change({ commonOnly })}
					/>
					<p className="text-primary font-medium">
						{t("showing", { shown: shown.length, total: resourceIndex.length })}
						{filters.categories.length > 0 &&
							t("notes.categories", { count: filters.categories.length })}
						{filters.types.length > 0 &&
							t("notes.types", { count: filters.types.length })}
						{filters.commonOnly && t("notes.common")}
					</p>
				</div>
			</Card>
			{panelOpen && <Card className="p-4 max-lg:hidden">{panel}</Card>}
			<Dialog
				open={sheetOpen}
				onClose={() => setSheetOpen(false)}
				title={t("panel.title")}
				footer={
					<Button
						variant="primary"
						className="w-full"
						onClick={() => setSheetOpen(false)}
					>
						{t("panel.done", { count: shown.length })}
					</Button>
				}
			>
				{panel}
			</Dialog>
			{shown.length === 0 ? (
				<EmptyState
					title={t("empty.title")}
					description={t("empty.description")}
					actions={<Button onClick={clearSelections}>{t("empty.clear")}</Button>}
				/>
			) : (
				<div className="columns-[19rem] gap-3">
					{shown.map((resource) => (
						<div key={resource.name} className="mb-3 break-inside-avoid">
							<ResourceCard resource={resource} />
						</div>
					))}
				</div>
			)}
		</>
	);
}
