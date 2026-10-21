"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearchInAddress } from "@/lib/hooks/useSearchInAddress";
import type { DailyCategory } from "@/service/reference";
import {
	ALL,
	DAILY_CATEGORIES,
	DAILY_LABELS,
	DAILY_TASKS_PER_DAY,
	dailyCategoryCount,
	filterDaily,
	largestDailyCategory,
	tabCounts,
} from "@/service/reference";
import { MasonryTile } from "@/comps/page/Masonry";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { Input } from "@/comps/ui/Input";
import { StatRow } from "./parts";

type Selected = DailyCategory | typeof ALL;

export function DailyPanel() {
	const t = useTranslations("reference");
	const searchParams = useSearchParams();
	const [category, setCategory] = useState<Selected>(ALL);
	const [query, setQuery] = useState(searchParams.get("q") ?? "");
	useSearchInAddress(query);

	const groups = filterDaily(category, query);
	const shown = groups.reduce((sum, group) => sum + group.items.length, 0);
	const total = tabCounts.daily;
	const filtering = category !== ALL || query !== "";
	const clear = () => {
		setCategory(ALL);
		setQuery("");
	};

	const chip = (id: Selected, label: string, count: number) => (
		<button
			key={id}
			type="button"
			aria-pressed={category === id}
			onClick={() => setCategory(id)}
			className={`flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-3 lg:min-h-9 ${
				category === id
					? "border-primary bg-primary text-on-primary font-semibold"
					: "border-line bg-surface"
			}`}
		>
			{label}
			<span className={`font-mono text-xs ${category === id ? "" : "text-muted"}`}>
				{count}
			</span>
		</button>
	);

	return (
		<>
			<StatRow
				commerce={false}
				stats={[
					{
						label: t("stats.tasks"),
						value: total,
						total,
						caption: t("stats.inCategories", { count: DAILY_CATEGORIES.length }),
					},
					{ label: t("stats.perDay"), value: DAILY_TASKS_PER_DAY, total },
					{
						label: t("stats.largest"),
						value: dailyCategoryCount(largestDailyCategory),
						total,
						caption: DAILY_LABELS[largestDailyCategory],
					},
				]}
			/>
			<p className="text-muted">{t("daily.intro")}</p>
			<Card className="flex flex-col gap-3 p-4">
				<span className="font-medium">{t("daily.categoryLabel")}</span>
				<div
					role="group"
					aria-label={t("daily.categoryLabel")}
					className="flex flex-wrap gap-2"
				>
					{chip(ALL, t("daily.allCategories"), total)}
					{DAILY_CATEGORIES.map((key) =>
						chip(key, DAILY_LABELS[key], dailyCategoryCount(key))
					)}
				</div>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
					<div className="min-w-0 flex-1 lg:min-w-60">
						<Input
							type="search"
							value={query}
							aria-label={t("filters.searchTasks")}
							placeholder={t("filters.searchTasks")}
							leadingIcon={<LuSearch size={16} />}
							onChange={(event) => setQuery(event.target.value)}
						/>
					</div>
					<span className="text-muted">
						{t("filters.showing", {
							shown: formatNumber(shown),
							total: formatNumber(total),
							things: t("things.daily"),
						})}
					</span>
					{filtering && (
						<Button variant="link" onClick={clear} className="px-1!">
							{t("filters.clear")}
						</Button>
					)}
				</div>
			</Card>
			{groups.length === 0 ? (
				<EmptyState
					title={t("empty.title", { things: t("things.daily") })}
					description={t("empty.description")}
					actions={<Button onClick={clear}>{t("empty.clear")}</Button>}
				/>
			) : (
				<div className="columns-[24rem] gap-3">
					{groups.map((group) => (
						<MasonryTile key={group.category}>
							<Card className="p-0">
								<section aria-label={group.label}>
									<header className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
										<h2 className="text-lg font-semibold">{group.label}</h2>
										<span className="border-line text-muted rounded-full border-[1.5px] px-2 font-mono text-xs">
											{group.items.length}
										</span>
									</header>
									<ul className="px-4 pb-2">
										{group.items.map((task) => (
											<li
												key={task.id}
												className="border-line flex items-center justify-between gap-3 border-t py-2.5"
											>
												<span>{task.name}</span>
												<span className="font-mono">
													{t("daily.points", {
														count: task.permitPoints,
													})}
												</span>
											</li>
										))}
									</ul>
								</section>
							</Card>
						</MasonryTile>
					))}
				</div>
			)}
		</>
	);
}
