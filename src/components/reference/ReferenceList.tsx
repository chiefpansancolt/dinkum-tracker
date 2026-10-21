"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import type { SortChoice, SortId } from "@/service/reference";
import { sorted } from "@/service/reference";
import type { FilterSpec } from "@/comps/collect/useCollection";
import { useCollection } from "@/comps/collect/useCollection";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { MasonryGrid, MasonryTile } from "@/comps/page/Masonry";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";

interface ReferenceListProps<Item extends { id: string; name: string }> {
	/** The plural noun, such as animals. */
	things: string;
	items: Item[];
	filters: FilterSpec<Item>[];
	sorts: SortChoice<Item>[];
	/** Puts Sort By before the other filters, as the Resources tab does. */
	sortFirst?: boolean;
	search: (items: Item[], query: string) => Item[];
	searchLabel: string;
	/** A strip above the filters, such as stat tiles. */
	tiles?: ReactNode;
	extraFilter?: (items: Item[]) => Item[];
	extraFiltering?: boolean;
	onClear?: () => void;
	searchAction?: ReactNode;
	/** Content between the filter block and the list. */
	belowFilters?: ReactNode;
	renderCard: (item: Item) => ReactNode;
}

/** One list of the Reference page: filters, a sort, a name search, a count and masonry cards. */
export function ReferenceList<Item extends { id: string; name: string }>({
	things,
	items,
	filters,
	sorts,
	sortFirst = false,
	search,
	searchLabel,
	tiles,
	extraFilter,
	extraFiltering,
	onClear,
	searchAction,
	belowFilters,
	renderCard,
}: ReferenceListProps<Item>) {
	const t = useTranslations("reference");
	const searchParams = useSearchParams();
	const [sortBy, setSortBy] = useState<SortId>(sorts[0].id);

	const collection = useCollection({
		items,
		buildSpecs: () => filters,
		search,
		initialQuery: searchParams.get("q") ?? "",
		extraFilter,
	});
	useSearchInAddress(collection.query);

	const sortField: FilterFieldConfig = {
		id: "sort",
		label: t("filters.sortBy"),
		options: sorts.map((choice) => ({ id: choice.id, label: t(`sort.${choice.id}`) })),
	};
	const fields = sortFirst
		? [sortField, ...collection.fields]
		: [...collection.fields, sortField];
	const shown = sorted(collection.shown, sorts, sortBy);

	const clear = () => {
		collection.clear();
		setSortBy(sorts[0].id);
		onClear?.();
	};

	return (
		<>
			{tiles}
			<Card className="p-4">
				<FilterBlock
					fields={fields}
					values={{ ...collection.values, sort: sortBy }}
					onChange={(id, value) =>
						id === "sort" ? setSortBy(value as SortId) : collection.setValue(id, value)
					}
					onClear={clear}
					search={{
						label: searchLabel,
						value: collection.query,
						onChange: collection.setQuery,
					}}
					searchAction={searchAction}
					extraFiltering={extraFiltering}
					summary={t("filters.showing", {
						shown: formatNumber(shown.length),
						total: formatNumber(items.length),
						things,
					})}
					sheetTitle={t("filters.sheetTitle", { things })}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: formatNumber(collection.countFor(draft)),
							things,
						})
					}
				/>
			</Card>
			{belowFilters}
			{shown.length === 0 ? (
				<EmptyState
					title={t("empty.title", { things })}
					description={t("empty.description")}
					actions={<Button onClick={clear}>{t("empty.clear")}</Button>}
				/>
			) : (
				<MasonryGrid>
					{shown.map((item) => (
						<MasonryTile key={item.id}>{renderCard(item)}</MasonryTile>
					))}
				</MasonryGrid>
			)}
		</>
	);
}
