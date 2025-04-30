"use client";

import { Badge } from "flowbite-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Milestone, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter, MILESTONE_CATEGORIES } from "@/data/constants";
import {
	getMilestoneByCategory,
	getMilestoneBySearchValue,
	getMilestoneTotalLevels,
	getMilestoneTotalPermitPoints,
	milestones,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import MilestoneCard from "./MilestoneCard";

export default function MilestonesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [collectionFilter, setCollectionFilter] = useState("All");
	const [viewMode, setViewMode] = useState<"all" | "grouped">("grouped");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		category: {
			value: categoryFilter,
			options: MILESTONE_CATEGORIES,
			label: "Category",
		},
		view: {
			value: viewMode,
			options: [
				{ id: "grouped", value: "Grouped by Letter" },
				{ id: "all", value: "All Milestones" },
			],
			label: "View Mode",
		},
		collection: {
			value: collectionFilter,
			options: collectedFilter,
			label: "Collected",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLocalState(data.milestones || {});
			}

			setIsLoading(false);

			const params = getQueryParams();
			if (params.q) {
				setSearchQuery(params.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setQueryParam("q", searchQuery);
		} else {
			setQueryParam("q", "");
		}
	}, [searchQuery]);

	const isPreviousLevelObtained = (milestoneId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousMilestoneKey = `${milestoneId}_level_${previousLevel}`;

		return localState[previousMilestoneKey] === true;
	};

	const handleToggleMilestoneLevel = (milestoneId: string, level: number) => {
		const milestoneKey = `${milestoneId}_level_${level}`;
		const currentValue = localState[milestoneKey] || false;

		setLocalState((prev) => {
			if (!currentValue && level > 1 && !isPreviousLevelObtained(milestoneId, level)) {
				return prev;
			}

			const updates: Record<string, boolean> = {
				[milestoneKey]: !currentValue,
			};

			if (currentValue) {
				const milestone = milestones.find((m) => m.id === milestoneId);
				if (milestone) {
					milestone.levels.forEach((l) => {
						if (l.level > level) {
							const higherLevelKey = `${milestoneId}_level_${l.level}`;
							updates[higherLevelKey] = false;
						}
					});
				}
			}

			const newState = { ...prev, ...updates };

			if (JSON.stringify(prev) !== JSON.stringify(newState)) {
				setIsDirty(true);
			}

			return newState;
		});
	};

	const toggleAllLevelsForMilestone = (milestone: Milestone, setToValue: boolean) => {
		setLocalState((prev) => {
			const updates: Record<string, boolean> = {};

			milestone.levels.forEach((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				updates[milestoneKey] = setToValue;
			});

			const newState = { ...prev, ...updates };

			if (JSON.stringify(prev) !== JSON.stringify(newState)) {
				setIsDirty(true);
			}

			return newState;
		});
	};

	const areAllLevelsComplete = (milestone: Milestone) => {
		return milestone.levels.every((level) => {
			const milestoneKey = `${milestone.id}_level_${level.level}`;
			return localState[milestoneKey] === true;
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			milestones: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		} else if (name === "view") {
			setViewMode(value as "all" | "grouped");
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...milestones];

		if (categoryFilter !== "all") {
			filtered = getMilestoneByCategory(filtered, categoryFilter);
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((milestone) => {
					return milestone.levels.some((level) => {
						const milestoneKey = `${milestone.id}_level_${level.level}`;
						return localState[milestoneKey] === true;
					});
				});
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((milestone) => {
					return milestone.levels.every((level) => {
						const milestoneKey = `${milestone.id}_level_${level.level}`;
						return !localState[milestoneKey];
					});
				});
			}
		}

		if (searchQuery) {
			filtered = getMilestoneBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [categoryFilter, collectionFilter, localState, searchQuery]);

	const groupedMilestones = useMemo(() => {
		return filteredData.reduce<Record<string, Milestone[]>>((groups, milestone) => {
			const firstLetter = milestone.name.charAt(0).toUpperCase();
			if (!groups[firstLetter]) {
				groups[firstLetter] = [];
			}
			groups[firstLetter].push(milestone);
			return groups;
		}, {});
	}, [filteredData]);

	const sortedLetters = useMemo(() => {
		return Object.keys(groupedMilestones).sort();
	}, [groupedMilestones]);

	const getCompletedLevels = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const getEarnedPermitPoints = () => {
		let earned = 0;
		milestones.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				if (localState[milestoneKey]) {
					earned += level.permitPoints;
				}
			});
		});
		return earned;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading milestones..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Milestones" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Milestones"
					collectionName="levels completed"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCompletedLevels()}
					collectionTotal={getMilestoneTotalLevels()}
					dirtyMessage="Your milestones progress has not been saved yet."
				/>

				<div className="mb-4">
					<div className="bg-secondary flex items-center justify-between rounded-lg p-4">
						<div>
							<h3 className="font-medium">Permit Points Earned</h3>
							<p className="text-sm">
								You&apos;ve earned {getEarnedPermitPoints().toLocaleString()} of{" "}
								{getMilestoneTotalPermitPoints().toLocaleString()} available permit
								points.
							</p>
						</div>
						<Badge color="indigo" size="xl">
							<span className="flex items-center">
								{getEarnedPermitPoints().toLocaleString()} /{" "}
								{getMilestoneTotalPermitPoints().toLocaleString()}
								<img
									src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
									alt="Permit Points"
									className="ml-2 w-7"
								/>
							</span>
						</Badge>
					</div>
				</div>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search milestones by name or description..."
				/>

				<FilterDetails
					title="milestones"
					filteredCount={filteredData.length}
					totalCount={milestones.length}
					collectedLabel="Completed Levels"
					collectedCount={getCompletedLevels()}
				/>

				{filteredData.length > 0 ? (
					viewMode === "grouped" ? (
						<div className="space-y-8">
							{sortedLetters.map((letter) => (
								<div key={letter} className="space-y-4">
									<div className="my-4 flex items-center">
										<div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
										<h2 className="mx-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
											{letter}
										</h2>
										<div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
									</div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
										{groupedMilestones[letter].map((item) => (
											<MilestoneCard
												key={item.id}
												milestone={item}
												milestoneCollection={localState}
												isPreviousLevelObtained={isPreviousLevelObtained}
												onToggleMilestoneLevel={handleToggleMilestoneLevel}
												onToggleAllLevels={toggleAllLevelsForMilestone}
												areAllLevelsComplete={areAllLevelsComplete}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{filteredData.map((item) => (
								<MilestoneCard
									key={item.id}
									milestone={item}
									milestoneCollection={localState}
									isPreviousLevelObtained={isPreviousLevelObtained}
									onToggleMilestoneLevel={handleToggleMilestoneLevel}
									onToggleAllLevels={toggleAllLevelsForMilestone}
									areAllLevelsComplete={areAllLevelsComplete}
								/>
							))}
						</div>
					)
				) : (
					<EmptyFilterCard />
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
