/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge, TextInput, Button, Select, Tooltip } from "flowbite-react";
import { licenses } from "@/data/dinkum";
import { License, TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import SaveAlert from "@/comps/SaveAlert";
import { HiSearch, HiLockClosed, HiCheck } from "react-icons/hi";

const LicensesTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [localLicensesState, setLocalLicensesState] = useState(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalLicensesState(collected);
	}, [collected]);

	const isPreviousLevelObtained = (licenseId: string, level: number) => {
		if (level === 1) return true;

		const previousLevel = level - 1;
		const previousLicenseKey = `${licenseId}_level_${previousLevel}`;

		return localLicensesState[previousLicenseKey] === true;
	};

	const handleToggleLicenseLevel = (licenseId: string, level: number) => {
		const licenseKey = `${licenseId}_level_${level}`;
		const currentValue = localLicensesState[licenseKey] || false;

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

			setLocalLicensesState((prev) => ({
				...prev,
				...updates,
			}));
		} else {
			setLocalLicensesState((prev) => ({
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

		setLocalLicensesState((prev) => ({
			...prev,
			...updates,
		}));

		isDirty.current = true;
	};

	const areAllLevelsComplete = (license: License) => {
		return license.levels.every((level) => {
			const licenseKey = `${license.id}_level_${level.level}`;
			return localLicensesState[licenseKey] === true;
		});
	};

	const getCompletedLevelsForLicense = (license: License) => {
		return license.levels.filter((level) => {
			const licenseKey = `${license.id}_level_${level.level}`;
			return localLicensesState[licenseKey] === true;
		}).length;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			licenses: localLicensesState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		save,
	}));

	const licenseCategories = [
		{ id: "all", name: "All Licenses" },
		{ id: "mining", name: "Mining" },
		{ id: "fishing", name: "Fishing" },
		{ id: "farming", name: "Farming" },
		{ id: "logging", name: "Logging" },
		{ id: "hunting", name: "Hunting" },
		{ id: "building", name: "Building" },
		{ id: "vehicle", name: "Vehicle" },
		{ id: "commerce", name: "Commerce" },
	];

	const filteredLicenses = licenses.filter((license) => {
		if (categoryFilter !== "all") {
			if (!license.id.includes(categoryFilter)) {
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

	const getTotalLevels = () => {
		return licenses.reduce((total, license) => total + license.levels.length, 0);
	};

	const getCompletedLevels = () => {
		return Object.keys(localLicensesState).filter((key) => localLicensesState[key]).length;
	};

	const getCompletedLicenses = () => {
		return licenses.filter((license) => areAllLevelsComplete(license)).length;
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
				if (localLicensesState[licenseKey]) {
					spent += level.permitPointCost;
				}
			});
		});
		return spent;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Licenses ({getCompletedLicenses()} / {licenses.length})
					</h1>
					<Badge color="blue" size="lg">
						{getCompletedLevels()} / {getTotalLevels()} levels obtained
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your license progress has not been saved yet." />
				)}
			</div>

			<div className="flex flex-col gap-4 md:flex-row">
				<div className="w-full md:w-1/4">
					<Select
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
					>
						{licenseCategories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</div>
				<div className="w-full md:w-3/4">
					<TextInput
						id="search-licenses"
						type="text"
						icon={HiSearch}
						placeholder="Search for licenses..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="mb-4"
					/>
				</div>
			</div>

			<div className="mb-4">
				<div className="flex justify-between">
					<div>
						<Badge color="indigo" size="lg">
							<span className="flex items-center">
								Permit Points: {getSpentPermitPoints().toLocaleString()} /{" "}
								{getTotalPermitPoints().toLocaleString()}{" "}
								<img
									src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
									alt="Permit Points"
									className="ml-2 w-7"
								/>
							</span>
						</Badge>
					</div>
					<div>
						<Badge color="success" size="lg">
							<span className="flex items-center">
								{Math.round(
									(getSpentPermitPoints() / getTotalPermitPoints()) * 100
								)}
								% obtained
							</span>
						</Badge>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{filteredLicenses.length === 0 ? (
					<Card className="py-8 text-center">
						<p>No licenses match your search criteria. Try adjusting your filters.</p>
					</Card>
				) : (
					filteredLicenses.map((license) => {
						const allComplete = areAllLevelsComplete(license);
						const completedCount = getCompletedLevelsForLicense(license);

						return (
							<Card
								key={license.id}
								className={`h-full ${allComplete ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col gap-4 md:flex-row">
									<div className="flex w-full items-center justify-center md:w-1/4">
										<div className="relative">
											<img
												src={license.img}
												alt={license.name}
												className="h-24 w-24 object-contain"
											/>
											{allComplete && (
												<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
													<HiCheck className="h-4 w-4" />
												</div>
											)}
										</div>
									</div>
									<div className="flex w-full flex-col md:w-3/4">
										<div className="mb-1 flex items-start justify-between">
											<h3 className="text-primary text-lg font-bold">
												{license.name}
											</h3>
											<div className="flex items-center gap-2">
												<Badge color={allComplete ? "success" : "gray"}>
													{completedCount}/{license.levels.length}
												</Badge>
												<Button
													size="xs"
													color={allComplete ? "accent" : "secondary"}
													onClick={() =>
														toggleAllLevelsForLicense(
															license,
															!allComplete
														)
													}
												>
													{allComplete ? "Clear All" : "Complete All"}
												</Button>
											</div>
										</div>
										{license.requirements && (
											<p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
												<span className="font-medium">Requirements:</span>{" "}
												{license.requirements}
											</p>
										)}

										<div className="space-y-3">
											{license.levels.map((level) => {
												const licenseKey = `${license.id}_level_${level.level}`;
												const isObtained =
													localLicensesState[licenseKey] === true;
												const canObtain = isPreviousLevelObtained(
													license.id,
													level.level
												);

												return (
													<div
														key={licenseKey}
														className={`rounded-lg p-2 ${
															isObtained
																? "bg-green-50 dark:bg-green-900/20"
																: "bg-gray-50 dark:bg-gray-800/50"
														}`}
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
																	{level.permitPointCost.toLocaleString()}{" "}
																	<img
																		src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
																		alt="Permit Points"
																		className="ml-1 inline w-4"
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
									</div>
								</div>
							</Card>
						);
					})
				)}
			</div>
		</div>
	);
});

LicensesTab.displayName = "LicensesTab";

export default LicensesTab;
