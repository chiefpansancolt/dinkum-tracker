"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { CategorySet, GearCategory, RecipeCategory } from "@/service/overview";
import { HighlightBox, MeterRow, OverviewCard } from "./OverviewParts";

interface CardProps {
	className?: string;
}

const fraction = (meter: { count: number; total: number }) => ({
	count: formatNumber(meter.count),
	total: formatNumber(meter.total),
});

const GEAR_CATEGORIES: GearCategory[] = [
	"books",
	"tools",
	"weapons",
	"equipment",
	"vehicles",
	"cassettes",
];

const RECIPE_CATEGORIES: RecipeCategory[] = ["cooking", "crafting", "signWriting"];

export function GearCard({ stats, className }: CardProps & { stats: CategorySet<GearCategory> }) {
	const t = useTranslations("overview.gear");

	return (
		<OverviewCard title={t("title")} href="/gear" className={className}>
			<MeterRow
				label={t("overall", fraction(stats.overall))}
				value={`${stats.overall.percent}%`}
				progress={stats.overall.percent / 100}
			/>
			{GEAR_CATEGORIES.map((category) => (
				<MeterRow
					key={category}
					label={t(category, fraction(stats.categories[category]))}
					value={`${stats.categories[category].percent}%`}
					progress={stats.categories[category].percent / 100}
				/>
			))}
			<div className="grid grid-cols-2 gap-3">
				<HighlightBox
					tone="most"
					label={t("mostComplete")}
					name={t(`names.${stats.mostComplete}`)}
					percent={stats.categories[stats.mostComplete].percent}
				/>
				<HighlightBox
					tone="least"
					label={t("leastComplete")}
					name={t(`names.${stats.leastComplete}`)}
					percent={stats.categories[stats.leastComplete].percent}
				/>
			</div>
		</OverviewCard>
	);
}

export function RecipesCard({
	stats,
	className,
}: CardProps & { stats: CategorySet<RecipeCategory> }) {
	const t = useTranslations("overview.recipes");

	return (
		<OverviewCard title={t("title")} href="/recipes" className={className}>
			<MeterRow
				label={t("overall", fraction(stats.overall))}
				value={`${stats.overall.percent}%`}
				progress={stats.overall.percent / 100}
			/>
			{RECIPE_CATEGORIES.map((category) => (
				<MeterRow
					key={category}
					label={t(category, fraction(stats.categories[category]))}
					value={`${stats.categories[category].percent}%`}
					progress={stats.categories[category].percent / 100}
				/>
			))}
			<div className="grid grid-cols-2 gap-3">
				<HighlightBox
					tone="most"
					label={t("mostComplete")}
					name={t(`names.${stats.mostComplete}`)}
					percent={stats.categories[stats.mostComplete].percent}
				/>
				<HighlightBox
					tone="least"
					label={t("leastComplete")}
					name={t(`names.${stats.leastComplete}`)}
					percent={stats.categories[stats.leastComplete].percent}
				/>
			</div>
		</OverviewCard>
	);
}
