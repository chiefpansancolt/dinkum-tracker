"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import type { CollectSection, Flags } from "@/service/collect";
import { isCollected, nameSearch } from "@/service/collect";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { ViewToggle } from "@/comps/page/ViewToggle";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { RowsOnScroll } from "./RowsOnScroll";
import { useCollectedToggle } from "./useCollectedToggle";
import type { FilterSpec } from "./useCollection";
import { collectedSpec, useCollection } from "./useCollection";

export interface Toggle {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

interface FilterControls {
	values: Record<string, string>;
	setValue: (id: string, value: string) => void;
}

interface CollectionPanelProps<Item extends { id: string; name: string }> {
	section: CollectSection;
	mode: "collected" | "unlocked";
	/** The plural noun, such as tools, for the search box and the results line. */
	things: string;
	items: Item[];
	flags: Flags | undefined;
	/** The filters before the Collected or Unlocked filter, which the panel adds last. */
	buildSpecs: (values: Record<string, string>) => FilterSpec<Item>[];
	afterChange?: (id: string, values: Record<string, string>) => Record<string, string>;
	extraFilter?: (items: Item[]) => Item[];
	searchAction?: ReactNode;
	/** True while the extra filter is narrowing the list. */
	extraFiltering?: boolean;
	/** A strip above the filters. Its tiles can set the filters. */
	tiles?: (controls: FilterControls) => ReactNode;
	/** Called with Clear filters, for a filter that has its own state, such as Buffs. */
	onClear?: () => void;
	renderCard: (item: Item, toggle: Toggle) => ReactNode;
	/** The dense view. Without it the list is always cards and there is no view toggle. */
	renderList?: (shown: Item[], toggleOf: (item: Item) => Toggle, total: number) => ReactNode;
	cardMinWidth?: string;
}

/**
 * One tab of a collect page: filters, a results line, and the items as cards or as a list. Every
 * change is saved at once and offers Undo.
 */
export function CollectionPanel<Item extends { id: string; name: string }>({
	section,
	mode,
	things,
	items,
	flags,
	buildSpecs,
	afterChange,
	extraFilter,
	searchAction,
	extraFiltering,
	tiles,
	onClear,
	renderCard,
	renderList,
	cardMinWidth = "19rem",
}: CollectionPanelProps<Item>) {
	const t = useTranslations("collect");
	const searchParams = useSearchParams();
	const { prefs } = usePlaythrough();
	const toggle = useCollectedToggle(section, mode);

	const collection = useCollection({
		items,
		buildSpecs: (values) => [
			...buildSpecs(values),
			collectedSpec<Item>(
				t(mode === "collected" ? "filters.collected" : "filters.unlocked"),
				{
					all: t("filters.all"),
					on: t(mode === "collected" ? "filters.collected" : "filters.unlocked"),
					off: t(mode === "collected" ? "filters.notCollected" : "filters.notUnlocked"),
				},
				flags
			),
		],
		search: nameSearch,
		initialQuery: searchParams.get("q") ?? "",
		extraFilter,
		afterChange,
	});
	useSearchInAddress(collection.query);

	const { shown } = collection;
	const shownDone = shown.filter((item) => isCollected(flags, item.id)).length;
	const toggleOf = (item: Item): Toggle => ({
		checked: isCollected(flags, item.id),
		onChange: (value) => toggle(flags, item, value),
	});
	const clear = () => {
		collection.clear();
		onClear?.();
	};
	const listMode = renderList !== undefined && prefs.viewMode === "list";

	return (
		<>
			{tiles?.({ values: collection.values, setValue: collection.setValue })}
			<Card className="p-4">
				<FilterBlock
					fields={collection.fields}
					values={collection.values}
					onChange={collection.setValue}
					onClear={clear}
					search={{
						label: t("filters.search", { things }),
						value: collection.query,
						onChange: collection.setQuery,
					}}
					searchAction={searchAction}
					extraFiltering={extraFiltering}
					summary={t(
						mode === "collected"
							? "filters.showingCollected"
							: "filters.showingUnlocked",
						{
							shown: formatNumber(shown.length),
							total: formatNumber(items.length),
							things,
							count: formatNumber(shownDone),
						}
					)}
					trailing={renderList ? <ViewToggle /> : undefined}
					sheetTitle={t("filters.sheetTitle", { things })}
					applyLabel={(draft) =>
						t("filters.apply", {
							count: formatNumber(collection.countFor(draft)),
							things,
						})
					}
				/>
			</Card>
			{shown.length === 0 ? (
				<EmptyState
					title={t("empty.title", { things })}
					description={t("empty.description")}
					actions={<Button onClick={clear}>{t("empty.clear")}</Button>}
				/>
			) : listMode ? (
				renderList(shown, toggleOf, items.length)
			) : (
				<RowsOnScroll items={shown}>
					{(visible) => (
						<div
							style={{
								gridTemplateColumns: `repeat(auto-fill, minmax(min(${cardMinWidth}, 100%), 1fr))`,
							}}
							className="grid gap-3"
						>
							{visible.map((item) => (
								<div key={item.id} className="contents">
									{renderCard(item, toggleOf(item))}
								</div>
							))}
						</div>
					)}
				</RowsOnScroll>
			)}
		</>
	);
}
