/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Checkbox, Label, Badge, Button, Tooltip } from "flowbite-react";
import { licenses } from "@/data/dinkum";
import { License, TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiLockClosed } from "react-icons/hi";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import PermiteValue from "@/playthrough/ui/itemcard/PermiteValue";

const LicensesTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All Licenses");
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

	const isPreviousLevelObtained = (licenseId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousLicenseKey = `${licenseId}_level_${previousLevel}`;

		return localState[previousLicenseKey] === true;
	};

	const handleToggleLicenseLevel = (licenseId: string, level: number) => {
		const licenseKey = `${licenseId}_level_${level}`;
		const currentValue = localState[licenseKey] || false;

		if (!currentValue && !isPreviousLevelObtained(licenseId, level)) {
			return;
		}

		if (currentValue) {
			const updates: Record<string, boolean> = {
				[licenseKey]: false,
			};

			const license = licenses.find((l) => l.id === licenseId);
			if (license) {
				license.levels.forEach((l) => {
					if (l.level > level) {
						const higherLevelKey = `${licenseId}_level_${l.level}`;
						updates[higherLevelKey] = false;
					}
				});
			}

			setLocalState((prev) => ({
				...prev,
				...updates,
			}));
		} else {
			setLocalState((prev) => ({
				...prev,
				[licenseKey]: true,
			}));
		}

		isDirty.current = true;
	};

	const toggleAllLevelsForLicense = (license: License, setToValue: boolean) => {
		const updates: Record<string, boolean> = {};

		if (setToValue) {
			license.levels.forEach((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				updates[licenseKey] = true;
			});
		} else {
			license.levels.forEach((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				updates[licenseKey] = false;
			});
		}

		setLocalState((prev) => ({
			...prev,
			...updates,
		}));

		isDirty.current = true;
	};

	const areAllLevelsComplete = (license: License) => {
		return license.levels.every((level) => {
			const licenseKey = `${license.id}_level_${level.level}`;
			return localState[licenseKey] === true;
		});
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				licenses: localState,
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
			value: categoryFilter,
			options: [
				"All Licenses",
				"Mining",
				"Fishing",
				"Farming",
				"Logging",
				"Hunting",
				"Building",
				"Vehicle",
				"Commerce",
			],
			label: "Category",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		return licenses.filter((license) => {
			if (categoryFilter !== "All Licenses") {
				if (!license.id.includes(categoryFilter.toLowerCase())) {
					return false;
				}
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				return (
					license.name.toLowerCase().includes(query) ||
					license.requirements.toLowerCase().includes(query)
				);
			}

			return true;
		});
	}, [categoryFilter, searchQuery]);

	const getTotalLevels = () => {
		return licenses.reduce((total, license) => total + license.levels.length, 0);
	};

	const getCompletedLevels = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const getTotalPermitPoints = () => {
		let total = 0;
		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				total += level.permitPointCost;
			});
		});
		return total;
	};

	const getSpentPermitPoints = () => {
		let spent = 0;
		licenses.forEach((license) => {
			license.levels.forEach((level) => {
				const licenseKey = `${license.id}_level_${level.level}`;
				if (localState[licenseKey]) {
					spent += level.permitPointCost;
				}
			});
		});
		return spent;
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Licenses"
				collectionName="levels obtained"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCompletedLevels()}
				collectionTotal={getTotalLevels()}
				dirtyMessage="Your license progress has not been saved yet."
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
				title="licenses"
				filteredCount={filteredData.length}
				totalCount={filteredData.length}
				collectedLabel="Unlocked Levels"
				collectedCount={getCompletedLevels()}
				showRightBadge={true}
				renderBadgeDetails={() => (
					<span className="flex items-center">
						Permit Points Spent: {getSpentPermitPoints().toLocaleString()} /{" "}
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
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredData.map((license) => {
						const allComplete = areAllLevelsComplete(license);

						return (
							<ItemCard
								key={license.id}
								renderHeader={() => (
									<ItemHeader
										title={license.name}
										renderRightComp={() => (
											<Button
												size="xs"
												color={allComplete ? "accent" : "secondary"}
												onClick={() =>
													toggleAllLevelsForLicense(license, !allComplete)
												}
											>
												{allComplete ? "Clear All" : "Complete All"}
											</Button>
										)}
									/>
								)}
								renderImage={() => (
									<ItemImage
										src={license.img}
										name={license.name}
										isCollected={allComplete}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										{license.requirements && (
											<ItemDetail
												label="Requirement"
												details={license.requirements}
											/>
										)}
										{license.levels.map((level) => {
											const licenseKey = `${license.id}_level_${level.level}`;
											const isObtained = localState[licenseKey] === true;
											const canObtain = isPreviousLevelObtained(
												license.id,
												level.level
											);

											return (
												<div
													key={licenseKey}
													className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900"
												>
													<div className="flex flex-col gap-2">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																{!canObtain ? (
																	<Tooltip content="Complete previous level(s) first">
																		<span className="inline-flex">
																			<HiLockClosed className="text-gray-400" />
																		</span>
																	</Tooltip>
																) : (
																	<Checkbox
																		id={`license-${license.id}-level-${level.level}`}
																		checked={isObtained}
																		onChange={() =>
																			handleToggleLicenseLevel(
																				license.id,
																				level.level
																			)
																		}
																		disabled={!canObtain}
																		className="mr-2"
																	/>
																)}
																<Label
																	htmlFor={`license-${license.id}-level-${level.level}`}
																	className={`${canObtain ? "cursor-pointer" : "cursor-not-allowed text-gray-500"} font-medium`}
																>
																	Level {level.level}
																</Label>
															</div>
															<Badge color="indigo">
																<PermiteValue
																	price={level.permitPointCost}
																/>
															</Badge>
														</div>
														{level.skillLevel > 0 && (
															<div className="ml-7 text-sm text-gray-600 dark:text-gray-400">
																<span className="font-medium">
																	Required Skill Level:{" "}
																</span>
																{level.skillLevel}
															</div>
														)}
														<div className="ml-7 text-sm text-gray-600 dark:text-gray-400">
															{level.description}
														</div>
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
			)}

			{filteredData.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

LicensesTab.displayName = "LicensesTab";

export default LicensesTab;
