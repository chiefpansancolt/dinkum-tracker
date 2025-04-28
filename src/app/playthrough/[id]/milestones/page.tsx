/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { milestones } from "@/data/dinkum";
import { Playthrough, Milestone } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import MilestoneCard from "./MilestoneCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import { Badge } from "flowbite-react";
import { MILESTONE_CATEGORIES } from "@/data/constants";

export default function MilestonesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [viewMode, setViewMode] = useState<"all" | "grouped">("grouped");
	const [milestoneCollection, setMilestoneCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setMilestoneCollection(data.milestones || {});
			}

			setIsLoading(false);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const isPreviousLevelObtained = (milestoneId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousMilestoneKey = `${milestoneId}_level_${previousLevel}`;

		return milestoneCollection[previousMilestoneKey] === true;
	};

	const handleToggleMilestoneLevel = (milestoneId: string, level: number) => {
		const milestoneKey = `${milestoneId}_level_${level}`;
		const currentValue = milestoneCollection[milestoneKey] || false;

		setMilestoneCollection((prev) => {
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
		setMilestoneCollection((prev) => {
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
			return milestoneCollection[milestoneKey] === true;
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			milestones: milestoneCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

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
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		} else if (name === "view") {
			setViewMode(value as "all" | "grouped");
		}
	};

	const filteredMilestones = useMemo(() => {
		return milestones.filter((milestone) => {
			if (categoryFilter !== "all" && !milestone.id.includes(categoryFilter)) {
				return false;
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				return (
					milestone.name.toLowerCase().includes(query) ||
					milestone.description.toLowerCase().includes(query)
				);
			}

			return true;
		});
	}, [categoryFilter, searchQuery]);

	const groupedMilestones = useMemo(() => {
		return filteredMilestones.reduce<Record<string, Milestone[]>>((groups, milestone) => {
			const firstLetter = milestone.name.charAt(0).toUpperCase();
			if (!groups[firstLetter]) {
				groups[firstLetter] = [];
			}
			groups[firstLetter].push(milestone);
			return groups;
		}, {});
	}, [filteredMilestones]);

	const sortedLetters = useMemo(() => {
		return Object.keys(groupedMilestones).sort();
	}, [groupedMilestones]);

	const getTotalLevels = () => {
		return milestones.reduce((total, milestone) => total + milestone.levels.length, 0);
	};

	const getCompletedLevels = () => {
		return Object.keys(milestoneCollection).filter((key) => milestoneCollection[key]).length;
	};

	const getTotalPermitPoints = () => {
		let total = 0;
		milestones.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				total += level.permitPoints;
			});
		});
		return total;
	};

	const getEarnedPermitPoints = () => {
		let earned = 0;
		milestones.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				if (milestoneCollection[milestoneKey]) {
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
					collectionTotal={getTotalLevels()}
					dirtyMessage="Your milestones progress has not been saved yet."
				/>

				<div className="mb-4">
					<div className="bg-secondary flex items-center justify-between rounded-lg p-4">
						<div>
							<h3 className="font-medium">Permit Points Earned</h3>
							<p className="text-sm">
								You&apos;ve earned {getEarnedPermitPoints().toLocaleString()} of{" "}
								{getTotalPermitPoints().toLocaleString()} available permit points.
							</p>
						</div>
						<Badge color="indigo" size="xl">
							<span className="flex items-center">
								{getEarnedPermitPoints().toLocaleString()} /{" "}
								{getTotalPermitPoints().toLocaleString()}
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
					filteredCount={filteredMilestones.length}
					totalCount={milestones.length}
					collectedLabel="Completed Levels"
					collectedCount={getCompletedLevels()}
				/>

				{filteredMilestones.length > 0 ? (
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
										{groupedMilestones[letter].map((milestone) => (
											<MilestoneCard
												key={milestone.id}
												milestone={milestone}
												milestoneCollection={milestoneCollection}
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
							{filteredMilestones.map((milestone) => (
								<MilestoneCard
									key={milestone.id}
									milestone={milestone}
									milestoneCollection={milestoneCollection}
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
