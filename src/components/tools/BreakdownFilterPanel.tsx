"use client";

import { useTranslations } from "next-intl";
import type { BreakdownFilters } from "@/service/breakdown";
import { CATEGORIES, resourceIndex, toggled, typeCounts } from "@/service/breakdown";
import type { ResourceType } from "@/data/constants/components";
import { Button } from "@/comps/ui/Button";
import { Checkbox } from "@/comps/ui/Checkbox";

interface BreakdownFilterPanelProps {
	categories: string[];
	types: ResourceType[];
	onCategoriesChange: (categories: string[]) => void;
	onTypesChange: (types: ResourceType[]) => void;
}

const counts = typeCounts(resourceIndex);

/** The nine category checkboxes and the fourteen type checkboxes, with Clear Selections. */
export function BreakdownFilterPanel({
	categories,
	types,
	onCategoriesChange,
	onTypesChange,
}: BreakdownFilterPanelProps) {
	const t = useTranslations("tools.breakdown.panel");
	const nothingSelected = categories.length === 0 && types.length === 0;

	const cell = (selected: boolean) =>
		`rounded-md border-[1.5px] px-3 ${selected ? "border-primary bg-tint" : "border-line bg-surface"}`;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-3">
				<h2 className="text-lg font-semibold">{t("byCategory")}</h2>
				<Button
					disabled={nothingSelected}
					onClick={() => {
						onCategoriesChange([]);
						onTypesChange([]);
					}}
				>
					{t("clear")}
				</Button>
			</div>
			<ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5">
				{CATEGORIES.map((category) => (
					<li key={category} className={cell(categories.includes(category))}>
						<Checkbox
							label={category}
							checked={categories.includes(category)}
							onChange={() => onCategoriesChange(toggled(categories, category))}
						/>
					</li>
				))}
			</ul>
			<h2 className="text-lg font-semibold">{t("byType")}</h2>
			<ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
				{counts.map(({ type, count }) => (
					<li key={type} className={cell(types.includes(type))}>
						<Checkbox
							label={`${type}, ${t("itemCount", { count })}`}
							checked={types.includes(type)}
							onChange={() => onTypesChange(toggled(types, type))}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export const filterCount = (filters: BreakdownFilters) =>
	filters.categories.length + filters.types.length;
