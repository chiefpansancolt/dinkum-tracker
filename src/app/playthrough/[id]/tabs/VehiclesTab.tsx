/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Checkbox, Label, Badge, TextInput, Select, Button } from "flowbite-react";
import { vehicles } from "@/data/dinkum/vehicles";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";
import { VehicleTabHandle, VehicleTabProps } from "@/types/dinkum";

const VehiclesTab = forwardRef<VehicleTabHandle, VehicleTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [localVehiclesState, setLocalVehiclesState] =
		useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		vehicles.forEach((vehicle) => {
			if (vehicle.source && vehicle.source.length > 0) {
				vehicle.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	const uniqueRequirementTypes = useMemo(() => {
		const types = new Set<string>();
		vehicles.forEach((vehicle) => {
			if (vehicle.requirementType) {
				types.add(vehicle.requirementType);
			}
		});
		return ["All", ...Array.from(types).sort()];
	}, []);

	useEffect(() => {
		setLocalVehiclesState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalVehiclesState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const saveVehicle = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			vehicles: localVehiclesState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		saveVehicle,
	}));

	const filteredVehicles = useMemo(() => {
		return vehicles.filter((vehicle) => {
			if (sourceFilter !== "All" && !vehicle.source.includes(sourceFilter)) {
				return false;
			}

			if (requirementFilter !== "All" && vehicle.requirementType !== requirementFilter) {
				return false;
			}

			if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, requirementFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localVehiclesState).filter((key) => localVehiclesState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Vehicles ({getCollectedCount()} / {vehicles.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getCollectedCount() / vehicles.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your vehicles collection has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="source-filter">Source</Label>
					</div>
					<Select
						id="source-filter"
						value={sourceFilter}
						onChange={(e) => setSourceFilter(e.target.value)}
					>
						{uniqueSources.map((source) => (
							<option key={source} value={source}>
								{source === "All" ? "All Sources" : source}
							</option>
						))}
					</Select>
				</div>

				{uniqueRequirementTypes.length > 1 && (
					<div>
						<div className="mb-2 block">
							<Label htmlFor="requirement-filter">Requirement Type</Label>
						</div>
						<Select
							id="requirement-filter"
							value={requirementFilter}
							onChange={(e) => setRequirementFilter(e.target.value)}
						>
							{uniqueRequirementTypes.map((type) => (
								<option key={type} value={type}>
									{type === "All" ? "All Requirements" : type}
								</option>
							))}
						</Select>
					</div>
				)}

				<div
					className={`col-span-1 ${uniqueRequirementTypes.length > 1 ? "md:col-span-2" : "md:col-span-3"}`}
				>
					<div className="mb-2 block">
						<Label htmlFor="search-vehicles">Search</Label>
					</div>
					<TextInput
						id="search-vehicles"
						type="text"
						icon={HiSearch}
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {filteredVehicles.length} of {vehicles.length} vehicles • Collected:{" "}
					{getCollectedCount()}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredVehicles.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No vehicles match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				) : (
					filteredVehicles.map((vehicle) => {
						const isCollected = localVehiclesState[vehicle.id] === true;
						const isCraftable = vehicle.source.includes("Crafting Table");

						return (
							<Card
								key={vehicle.id}
								className={`${isCollected ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">{vehicle.name}</h3>
										{isCraftable && (
											<Button
												as={Link}
												href={`#craftingRecipes?searchKey=${vehicle.name}`}
												color="secondary"
												size="xs"
											>
												Crafting Recipe
											</Button>
										)}
									</div>

									<div className="flex items-center justify-center py-4">
										{vehicle.img && (
											<div className="relative h-24 w-24">
												<img
													src={vehicle.img}
													alt={vehicle.name}
													className="h-full w-full object-contain"
												/>
												{isCollected && (
													<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
														<HiCheck className="h-4 w-4" />
													</div>
												)}
											</div>
										)}
									</div>

									<div className="mt-2 flex-grow space-y-2 text-sm">
										{vehicle.requirementType &&
											vehicle.requirementLevel !== null && (
												<div className="flex">
													<p className="w-32 font-medium">
														{vehicle.requirementType} Level:
													</p>
													<Badge color="purple">
														{vehicle.requirementLevel}
													</Badge>
												</div>
											)}

										{vehicle.source && vehicle.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{vehicle.source.map((src, index) => (
														<Badge
															key={`${vehicle.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										{(vehicle.shinyDiscCount || vehicle.berkoniumOreCount) && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Unlocks After:
												</p>
												<div className="ml-2 space-y-1">
													{vehicle.shinyDiscCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png"
																alt="Shiny Disc"
																className="h-5 w-5"
															/>
															<span>
																{vehicle.shinyDiscCount}x Shiny Disc
															</span>
														</div>
													)}
													{vehicle.berkoniumOreCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Berkonium_Ore.png"
																alt="Berkonium Ore"
																className="h-5 w-5"
															/>
															<span>
																{vehicle.berkoniumOreCount}x
																Berkonium Ore
															</span>
														</div>
													)}
												</div>
											</div>
										)}

										{vehicle.inputs && vehicle.inputs.length > 0 && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Ingredients:
												</p>
												<div className="ml-2 space-y-1">
													{vehicle.inputs.map((input, idx) => (
														<div
															key={`${vehicle.id}-input-${idx}`}
															className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800"
														>
															{input.img && (
																<img
																	src={input.img}
																	alt={input.name}
																	className="h-5 w-5"
																/>
															)}
															<span>
																{input.count}x {input.name}
															</span>
														</div>
													))}
												</div>
											</div>
										)}

										{vehicle.buyPrice !== undefined && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Buy Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>{vehicle.buyPrice.toLocaleString()}</span>
												</div>
											</div>
										)}

										{vehicle.baseSellPrice !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Sell Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{vehicle.baseSellPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`collected-${vehicle.id}`}
												checked={isCollected}
												onChange={(e) =>
													handleToggleCollected(
														vehicle.id,
														e.target.checked
													)
												}
												className="mr-2"
											/>
											<Label
												htmlFor={`collected-${vehicle.id}`}
												className="cursor-pointer"
											>
												Collected
											</Label>
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

VehiclesTab.displayName = "VehiclesTab";

export default VehiclesTab;
