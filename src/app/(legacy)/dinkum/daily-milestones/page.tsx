"use client";

import { dailyMilestones, type DailyMilestones } from "dinkum-data";
import { Badge, Card } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import PermitValue from "@/playthrough/ui/itemcard/PermitValue";
import TabHeader from "@/playthrough/ui/TabHeader";

const allDailyMilestones = dailyMilestones();

const categoryLabels: Record<keyof DailyMilestones, string> = {
	dayOneMilestones: "Day One",
	travelMilestones: "Travel",
	npcMilestones: "NPCs",
	fishingMilestones: "Fishing",
	farmingMilestones: "Farming",
	foragingMilestones: "Foraging",
	loggingMilestones: "Logging",
	miningMilestones: "Mining",
	excavationMilestones: "Excavation",
	bugCatchingMilestones: "Bug Catching",
	craftingMilestones: "Crafting",
	huntingMilestones: "Hunting",
	trappingMilestones: "Trapping",
	dinksMilestones: "Dinks",
};

const categoryKeys = Object.keys(categoryLabels) as (keyof DailyMilestones)[];

const categoryOptions = [
	{ id: "All", value: "All Categories" },
	...categoryKeys.map((key) => ({ id: key, value: categoryLabels[key] })),
];

const totalMilestones = categoryKeys.reduce(
	(total, key) => total + allDailyMilestones[key].length,
	0
);

export default function DailyMilestonesPage() {
	const [searchQuery, setSearchQuery] = useState<string>(() => getQueryParams().q || "");
	const [categoryFilter, setCategoryFilter] = useState<string>("All");

	useEffect(() => {
		if (searchQuery) {
			setQueryParam("q", searchQuery);
		} else {
			setQueryParam("q", "");
		}
	}, [searchQuery]);

	const filters = {
		category: {
			value: categoryFilter,
			options: categoryOptions,
			label: "Category",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		}
	};

	const groupedData = useMemo(() => {
		const keys =
			categoryFilter === "All"
				? categoryKeys
				: categoryKeys.filter((key) => key === categoryFilter);

		return keys
			.map((key) => ({
				key,
				label: categoryLabels[key],
				items: allDailyMilestones[key].filter((milestone) =>
					searchQuery
						? milestone.name.toLowerCase().includes(searchQuery.toLowerCase())
						: true
				),
			}))
			.filter((group) => group.items.length > 0);
	}, [categoryFilter, searchQuery]);

	const filteredCount = groupedData.reduce((total, group) => total + group.items.length, 0);

	return (
		<div className="space-y-6 p-6">
			<TabHeader
				title="Daily Milestones"
				enableCollectionCount={false}
				enableSaveAlert={false}
			/>

			<p className="text-gray-600 dark:text-gray-300">
				Three of these tasks are randomly generated for the player on each new game day.
				Permit points are credited as soon as the requirements are met.
			</p>

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search by task name..."
			/>

			<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
				<span>
					Showing {filteredCount} of {totalMilestones} tasks
				</span>
			</div>

			{groupedData.length === 0 ? (
				<EmptyFilterCard />
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{groupedData.map((group) => (
						<Card key={group.key}>
							<div className="mb-2 flex items-center justify-between">
								<h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
									{group.label}
								</h2>
								<Badge color="gray">{group.items.length}</Badge>
							</div>

							<div className="space-y-2">
								{group.items.map((milestone) => (
									<div
										key={milestone.id}
										className="flex items-center justify-between gap-4 border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 dark:border-gray-700"
									>
										<span className="text-gray-900 dark:text-gray-50">
											{milestone.name}
										</span>
										<div className="text-gray-900 dark:text-gray-50">
											<PermitValue price={milestone.permitPoints} />
										</div>
									</div>
								))}
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
