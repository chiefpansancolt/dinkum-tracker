/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Tooltip, Checkbox, Label, Badge, Button } from "flowbite-react";
import { milestones } from "@/data/dinkum";
import { Milestone, TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { MILESTONE_CATEGORIES } from "@/data/constants";
import { HiLockClosed } from "react-icons/hi";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import PermiteValue from "@/playthrough/ui/itemcard/PermiteValue";

const MilestonesTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [localState, setLocalState] = useState(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalState(collected);
		isDirty.current = false;

		const hashParams = getHashQueryParams();
		if (hashParams.q) {
			setSearchQuery(hashParams.q);
		}
	}, [collected]);

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

		return localState[previousMilestoneKey] === true;
	};

	const handleToggleMilestoneLevel = (milestoneId: string, level: number) => {
		const milestoneKey = `${milestoneId}_level_${level}`;
		const currentValue = localState[milestoneKey] || false;

		setLocalState((prev) => ({
			...prev,
			[milestoneKey]: !currentValue,
		}));

		isDirty.current = true;
	};

	const toggleAllLevelsForMilestone = (milestone: Milestone, setToValue: boolean) => {
		const updates: Record<string, boolean> = {};

		milestone.levels.forEach((level) => {
			const milestoneKey = `${milestone.id}_level_${level.level}`;
			updates[milestoneKey] = setToValue;
		});

		setLocalState((prev) => ({
			...prev,
			...updates,
		}));

		isDirty.current = true;
	};

	const areAllLevelsComplete = (milestone: Milestone) => {
		return milestone.levels.every((level) => {
			const milestoneKey = `${milestone.id}_level_${level.level}`;
			return localState[milestoneKey] === true;
		});
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				milestones: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const filters = {
		category: {
			label: "Category",
			options: MILESTONE_CATEGORIES,
			value: categoryFilter,
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		}
	};

	const filteredData = useMemo(() => {
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

	const groupedMilestones = filteredData.reduce<Record<string, Milestone[]>>(
		(groups, milestone) => {
			const firstLetter = milestone.name.charAt(0).toUpperCase();
			if (!groups[firstLetter]) {
				groups[firstLetter] = [];
			}
			groups[firstLetter].push(milestone);
			return groups;
		},
		{}
	);

	const sortedLetters = Object.keys(groupedMilestones).sort();

	const getTotalLevels = () => {
		return milestones.reduce((total, milestone) => total + milestone.levels.length, 0);
	};

	const getCompletedLevels = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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
		let spent = 0;
		milestones.forEach((milestone) => {
			milestone.levels.forEach((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				if (localState[milestoneKey]) {
					spent += level.permitPoints;
				}
			});
		});
		return spent;
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Milestones"
				collectionName="levels completed"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCompletedLevels()}
				collectionTotal={getTotalLevels()}
				dirtyMessage="Your milestones progress has not been saved yet."
			/>

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search by name..."
			/>

			<FilterDetails
				title="milestones"
				filteredCount={filteredData.length}
				totalCount={filteredData.length}
				collectedLabel="Unlocked Levels"
				collectedCount={getCompletedLevels()}
				showRightBadge={true}
				renderBadgeDetails={() => (
					<span className="flex items-center">
						Permit Points Earned: {getEarnedPermitPoints().toLocaleString()} /{" "}
						{getTotalPermitPoints().toLocaleString()}{" "}
						<img
							src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
							alt="Permit Points"
							className="ml-2 w-7"
						/>
					</span>
				)}
			/>

			{filteredData.length > 0 && (
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
								{groupedMilestones[letter].map((milestone) => {
									const allComplete = areAllLevelsComplete(milestone);

									return (
										<ItemCard
											key={milestone.id}
											renderHeader={() => (
												<ItemHeader
													title={milestone.name}
													renderRightComp={() => (
														<Button
															size="xs"
															color={
																allComplete ? "accent" : "secondary"
															}
															onClick={() =>
																toggleAllLevelsForMilestone(
																	milestone,
																	!allComplete
																)
															}
														>
															{allComplete
																? "Clear All"
																: "Complete All"}
														</Button>
													)}
												/>
											)}
											renderImage={() => (
												<ItemImage
													src={milestone.img}
													name={milestone.name}
													isCollected={allComplete}
												/>
											)}
											renderDetails={() => (
												<div className="grid grid-cols-1 gap-2">
													<div className="text-gray-800 dark:text-gray-100">
														{milestone.description}
													</div>
													{milestone.levels.map((level) => {
														const milestoneKey = `${milestone.id}_level_${level.level}`;
														const isObtained =
															localState[milestoneKey] === true;
														const canObtain = isPreviousLevelObtained(
															milestone.id,
															level.level
														);

														return (
															<div
																key={milestoneKey}
																className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900"
															>
																<div className="flex items-center gap-2">
																	{!canObtain ? (
																		<Tooltip content="Complete previous level(s) first">
																			<span className="inline-flex">
																				<HiLockClosed className="text-gray-400" />
																			</span>
																		</Tooltip>
																	) : (
																		<Checkbox
																			id={`milestone-${milestone.id}-level-${level.level}`}
																			checked={isObtained}
																			onChange={() =>
																				handleToggleMilestoneLevel(
																					milestone.id,
																					level.level
																				)
																			}
																			disabled={!canObtain}
																			className="mr-2"
																		/>
																	)}
																	<Label
																		htmlFor={`milestone-${milestone.id}-level-${level.level}`}
																		className="flex-1 cursor-pointer"
																	>
																		<span className="font-medium">
																			Level {level.level}:
																		</span>
																		<span className="ml-1">
																			{level.count.toLocaleString()}
																		</span>
																		{level.unit && (
																			<span className="ml-1">
																				{level.unit}
																			</span>
																		)}
																	</Label>
																	<Badge color="indigo">
																		<PermiteValue
																			price={
																				level.permitPoints
																			}
																		/>
																	</Badge>
																</div>
															</div>
														);
													})}
												</div>
											)}
										/>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}

			{filteredData.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

MilestonesTab.displayName = "MilestonesTab";

export default MilestonesTab;
