/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge } from "flowbite-react";
import { buildings } from "@/data/dinkum";
import { TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiInformationCircle, HiCheck, HiClock } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import SaveAlert from "@/comps/SaveAlert";

const BuildingsTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localBuildingsState, setLocalBuildingsState] = useState(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalBuildingsState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleBuildingInstalled = (buildingId: string, isInstalled: boolean) => {
		setLocalBuildingsState((prev) => ({
			...prev,
			[buildingId]: isInstalled,
		}));

		isDirty.current = true;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			buildings: localBuildingsState,
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

	const getBadgeColor = (deedType: string) => {
		switch (deedType) {
			case "Collectable":
				return "success";
			case "Movable":
				return "purple";
			case "Reference":
			default:
				return "gray";
		}
	};

	const getInstalledCount = () => {
		return Object.keys(localBuildingsState).filter((key) => localBuildingsState[key]).length;
	};

	const getCollectableBuildingsCount = () => {
		return buildings.filter((building) => building.deedType === "Collectable").length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Buildings & Deeds ({getInstalledCount()} / {getCollectableBuildingsCount()})
					</h1>
					<Badge color="blue" size="lg">
						{getInstalledCount()} buildings installed
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your buildings progress has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{buildings.map((building) => {
					const isInstalled = localBuildingsState[building.id] === true;
					const isCollectable = building.deedType === "Collectable";
					const hasOperatingHours =
						building.operatingHours && building.operatingHours.length > 0;

					return (
						<Card
							key={building.id}
							className={`h-full ${isInstalled && isCollectable ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
						>
							<div className="flex h-full flex-col gap-4 md:flex-row">
								<div className="flex w-full items-center justify-center md:w-1/4">
									<div className="relative">
										{building.img ? (
											<img
												src={building.img}
												alt={building.buildingName}
												className="h-24 w-24 object-contain"
											/>
										) : (
											<div className="flex h-24 w-24 items-center justify-center bg-gray-100 dark:bg-gray-700">
												<HiInformationCircle className="h-10 w-10 text-gray-400" />
											</div>
										)}
										{isInstalled && isCollectable && (
											<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
												<HiCheck className="h-4 w-4" />
											</div>
										)}
									</div>
								</div>
								<div className="flex w-full flex-col md:w-3/4">
									<div className="mb-1 flex items-start justify-between">
										<div>
											<h3 className="text-primary text-lg font-bold">
												{building.buildingName}
											</h3>
											{building.deedName && (
												<p className="text-sm text-gray-600 dark:text-gray-400">
													<span className="font-medium">Deed:</span>{" "}
													{building.deedName}
												</p>
											)}
										</div>

										<div className="flex items-center gap-2">
											{isCollectable ? (
												<>
													<Checkbox
														id={`building-${building.id}`}
														checked={isInstalled}
														onChange={(e) =>
															handleToggleBuildingInstalled(
																building.id,
																e.target.checked
															)
														}
														className="mr-2"
													/>
													<Label
														htmlFor={`building-${building.id}`}
														className="cursor-pointer"
													>
														Installed
													</Label>
												</>
											) : (
												<Badge color={getBadgeColor(building.deedType)}>
													{building.deedType}
												</Badge>
											)}
										</div>
									</div>

									{building.npc && (
										<div className="mb-2 flex items-center">
											{building.npcImg && (
												<img
													src={building.npcImg}
													alt={building.npc}
													className="mr-2 h-8 w-8 object-contain"
												/>
											)}
											<p className="text-sm text-gray-600 dark:text-gray-400">
												<span className="font-medium">NPC:</span>{" "}
												{building.npc}
											</p>
										</div>
									)}

									<div className="mb-3 grid grid-cols-2 gap-2">
										{building.size && (
											<p className="text-sm text-gray-600 dark:text-gray-400">
												<span className="font-medium">Size:</span>{" "}
												{building.size}
											</p>
										)}

										{building.buildTime && (
											<p className="text-sm text-gray-600 dark:text-gray-400">
												<span className="font-medium">Build Time:</span>{" "}
												{building.buildTime}
											</p>
										)}

										{building.deedPrice > 0 && (
											<p className="flex text-sm text-gray-600 dark:text-gray-400">
												<span className="font-medium">Deed Price:</span>
												<span className="ml-2 flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													{building.deedPrice.toLocaleString()}
												</span>
											</p>
										)}

										{hasOperatingHours && (
											<p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
												<HiClock className="mr-1 h-4 w-4" />
												<span className="font-medium">Hours:</span>{" "}
												<span className="ml-1">
													{building.operatingHours.join(", ")}
												</span>
											</p>
										)}

										{building.daysClosed && (
											<p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
												<HiCalendarDays className="mr-1 h-4 w-4" />
												<span className="font-medium">Closed:</span>{" "}
												<span className="ml-1">{building.daysClosed}</span>
											</p>
										)}
									</div>

									<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
										{building.description}
									</p>

									{building.inputs && building.inputs.length > 0 && (
										<div className="mt-auto">
											<h4 className="mb-2 text-sm font-medium">
												Required inputs:
											</h4>
											<div className="grid grid-cols-2 gap-2">
												{building.inputs.map((input, idx) => (
													<div
														key={idx}
														className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
													>
														{input.img && (
															<img
																src={input.img}
																alt={input.name}
																className="h-6 w-6 object-contain"
															/>
														)}
														<span className="text-sm">
															{input.count}x {input.name}
														</span>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
});

BuildingsTab.displayName = "BuildingsTab";

export default BuildingsTab;
