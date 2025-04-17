/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge, TextInput, Button, Select } from "flowbite-react";
import { milestones } from "@/data/dinkum/milestones";
import { Milestone, MilestonesTabHandle, MilestonesTabProps } from "@/types/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { MILESTONE_CATEGORIES } from "@/data/constants";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";

const MilestonesTab = forwardRef<MilestonesTabHandle, MilestonesTabProps>(
	({ milestones: milestonesState }, ref) => {
		const params = useParams();
		const playthroughId = typeof params.id === "string" ? params.id : "";
		const [searchQuery, setSearchQuery] = useState("");
		const [activeTab, setActiveTab] = useState("all");
		const [localMilestonesState, setLocalMilestonesState] = useState(milestonesState);

		const isDirty = useRef(false);

		useEffect(() => {
			setLocalMilestonesState(milestonesState);
		}, [milestonesState]);

		const handleToggleMilestoneLevel = (milestoneId: string, level: number) => {
			const milestoneKey = `${milestoneId}_level_${level}`;
			const currentValue = localMilestonesState[milestoneKey] || false;

			setLocalMilestonesState((prev) => ({
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

			setLocalMilestonesState((prev) => ({
				...prev,
				...updates,
			}));


			isDirty.current = true;
		};

		const areAllLevelsComplete = (milestone: Milestone) => {
			return milestone.levels.every((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				return localMilestonesState[milestoneKey] === true;
			});
		};

		const getCompletedLevelsForMilestone = (milestone: Milestone) => {
			return milestone.levels.filter((level) => {
				const milestoneKey = `${milestone.id}_level_${level.level}`;
				return localMilestonesState[milestoneKey] === true;
			}).length;
		};

		const saveMilestones = () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				milestones: localMilestonesState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		};

		useImperativeHandle(ref, () => ({
			saveMilestones
		}));

		const filteredMilestones = milestones.filter((milestone) => {
			if (activeTab !== "all" && !milestone.id.includes(activeTab)) {
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

		const groupedMilestones = filteredMilestones.reduce<Record<string, Milestone[]>>(
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
			return Object.keys(localMilestonesState).filter((key) => localMilestonesState[key])
				.length;
		};

		const getCompletedMilestones = () => {
			return milestones.filter((milestone) => areAllLevelsComplete(milestone)).length;
		};

		return (
			<div className="space-y-6">
				<div>
					<div className="mb-2 flex items-center justify-between">
						<h1 className="text-primary text-2xl font-bold">
							Milestones ({getCompletedMilestones()} / {milestones.length})
						</h1>
						<Badge color="blue" size="lg">
							{getCompletedLevels()} / {getTotalLevels()} levels completed
						</Badge>
					</div>

					{isDirty.current && (
						<SaveAlert message="Your milestone progress has not been saved yet." />
					)}
				</div>

				<div className="flex flex-col gap-4 md:flex-row">
					<div className="w-full md:w-1/4">
						<Select value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
							{MILESTONE_CATEGORIES.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Select>
					</div>
					<div className="w-full md:w-3/4">
						<TextInput
							id="search-milestones"
							type="text"
							icon={HiSearch}
							placeholder="Search for milestones..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="mb-4"
						/>
					</div>
				</div>

				<div className="space-y-8">
					{filteredMilestones.length === 0 ? (
						<Card className="py-8 text-center">
							<p>
								No milestones match your search criteria. Try adjusting your
								filters.
							</p>
						</Card>
					) : (
						sortedLetters.map((letter) => (
							<div key={letter} className="space-y-4">
								<div className="my-4 flex items-center">
									<div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
									<h2 className="mx-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
										{letter}
									</h2>
									<div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
								</div>
								<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
									{groupedMilestones[letter].map((milestone) => {
										const allComplete = areAllLevelsComplete(milestone);
										const completedCount =
											getCompletedLevelsForMilestone(milestone);

										return (
											<Card
												key={milestone.id}
												className={`h-full ${allComplete ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
											>
												<div className="flex flex-col gap-4 md:flex-row">
													<div className="flex w-full items-start justify-center md:w-1/4">
														<div className="relative">
															<img
																src={milestone.img}
																alt={milestone.name}
																className="h-24 w-24 object-contain"
															/>
															{allComplete && (
																<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
																	<HiCheck className="h-4 w-4" />
																</div>
															)}
														</div>
													</div>
													<div className="w-full md:w-3/4">
														<div className="mb-1 flex items-start justify-between">
															<h3 className="text-primary text-lg font-bold">
																{milestone.name}
															</h3>
															<div className="flex items-center gap-2">
																<Badge
																	color={
																		allComplete
																			? "success"
																			: "gray"
																	}
																>
																	{completedCount}/
																	{milestone.levels.length}
																</Badge>
																<Button
																	size="xs"
																	color={
																		allComplete
																			? "accent"
																			: "secondary"
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
															</div>
														</div>
														<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
															{milestone.description}
														</p>

														<div className="space-y-3">
															{milestone.levels.map((level) => {
																const milestoneKey = `${milestone.id}_level_${level.level}`;

																return (
																	<div
																		key={milestoneKey}
																		className={`rounded-lg p-2 ${
																			localMilestonesState[
																				milestoneKey
																			]
																				? "bg-green-50 dark:bg-green-900/20"
																				: "bg-gray-50 dark:bg-gray-800/50"
																		}`}
																	>
																		<div className="flex items-center gap-2">
																			<Checkbox
																				id={`milestone-${milestone.id}-level-${level.level}`}
																				checked={
																					localMilestonesState[
																						milestoneKey
																					] || false
																				}
																				onChange={() =>
																					handleToggleMilestoneLevel(
																						milestone.id,
																						level.level
																					)
																				}
																				className="mr-2"
																			/>
																			<Label
																				htmlFor={`milestone-${milestone.id}-level-${level.level}`}
																				className="flex-1 cursor-pointer"
																			>
																				<span className="font-medium">
																					Level{" "}
																					{level.level}:
																				</span>{" "}
																				{level.count.toLocaleString()}{" "}
																				{level.unit || ""}
																			</Label>
																			<Badge color="indigo">
																				{level.permitPoints}{" "}
																				<img
																					src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
																					alt="Permit Points"
																					className="inline w-5"
																				/>
																			</Badge>
																		</div>
																	</div>
																);
															})}
														</div>
													</div>
												</div>
											</Card>
										);
									})}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		);
	}
);

MilestonesTab.displayName = "MilestonesTab";

export default MilestonesTab;
