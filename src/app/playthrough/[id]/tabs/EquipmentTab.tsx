/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Checkbox, Label, Badge, TextInput, Select, Button } from "flowbite-react";
import { equipment } from "@/data/dinkum";
import { TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";

const EquipmentTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [localEquipmentState, setLocalEquipmentState] =
		useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		equipment.forEach((item) => {
			if (item.source && item.source.length > 0) {
				item.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	const uniqueRequirementTypes = useMemo(() => {
		const types = new Set<string>();
		equipment.forEach((item) => {
			if (item.requirementType) {
				types.add(item.requirementType);
			}
		});
		return ["All", ...Array.from(types).sort()];
	}, []);

	useEffect(() => {
		setLocalEquipmentState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalEquipmentState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			equipment: localEquipmentState,
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

	const filteredEquipment = useMemo(() => {
		return equipment.filter((item) => {
			if (sourceFilter !== "All" && !item.source.includes(sourceFilter)) {
				return false;
			}

			if (requirementFilter !== "All" && item.requirementType !== requirementFilter) {
				return false;
			}

			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, requirementFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localEquipmentState).filter((key) => localEquipmentState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Equipment ({getCollectedCount()} / {equipment.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getCollectedCount() / equipment.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your equipment collection has not been saved yet." />
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

				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="search-equipment">Search</Label>
					</div>
					<TextInput
						id="search-equipment"
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
					Showing {filteredEquipment.length} of {equipment.length} equipment items •
					Collected: {getCollectedCount()}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredEquipment.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No equipment items match your filter criteria. Try adjusting your
							filters.
						</p>
					</Card>
				) : (
					filteredEquipment.map((item) => {
						const isCollected = localEquipmentState[item.id] === true;
						const isCraftable = item.source.includes("Crafting Table");

						return (
							<Card
								key={item.id}
								className={`${isCollected ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">{item.name}</h3>
										{isCraftable && (
											<Button
												as={Link}
												href={`#craftingRecipes?searchKey=${item.name}`}
												color="secondary"
												size="xs"
											>
												Crafting Recipe
											</Button>
										)}
									</div>

									<div className="flex items-center justify-center py-4">
										{item.img && (
											<div className="relative h-24 w-24">
												<img
													src={item.img}
													alt={item.name}
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
										{item.description && (
											<p className="text-gray-600 dark:text-gray-400">
												{item.description}
											</p>
										)}

										{item.requirementType && item.requirementLevel !== null && (
											<div className="flex">
												<p className="w-32 font-medium">
													{item.requirementType} Level:
												</p>
												<Badge color="purple">
													{item.requirementLevel}
												</Badge>
											</div>
										)}

										{item.source && item.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{item.source.map((src, index) => (
														<Badge
															key={`${item.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										{(item.windmillCompatable || item.solarPanelCompatable) && (
											<div className="flex">
												<p className="w-32 font-medium">Compatible with:</p>
												<div className="flex flex-wrap gap-1">
													{item.windmillCompatable && (
														<Badge color="success">Windmill</Badge>
													)}
													{item.solarPanelCompatable && (
														<Badge color="warning">Solar Panel</Badge>
													)}
												</div>
											</div>
										)}

										{(item.shinyDiscCount || item.berkoniumOreCount) && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Unlocks After:
												</p>
												<div className="ml-2 space-y-1">
													{item.shinyDiscCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png"
																alt="Shiny Disc"
																className="h-5 w-5"
															/>
															<span>
																{item.shinyDiscCount}x Shiny Disc
															</span>
														</div>
													)}
													{item.berkoniumOreCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Berkonium_Ore.png"
																alt="Berkonium Ore"
																className="h-5 w-5"
															/>
															<span>
																{item.berkoniumOreCount}x Berkonium
																Ore
															</span>
														</div>
													)}
												</div>
											</div>
										)}

										{item.inputs && item.inputs.length > 0 && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Ingredients:
												</p>
												<div className="ml-2 space-y-1">
													{item.inputs.map((input, idx) => (
														<div
															key={`${item.id}-input-${idx}`}
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

										{item.buyPrice !== undefined && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Buy Price:</p>
												<div className="flex items-center">
													{item.buyUnits === "Permit Points" ? (
														<>
															<span className="mr-1">
																{item.buyPrice.toLocaleString()}
															</span>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
																alt="Permit Points"
																className="w-4"
															/>
														</>
													) : (
														<>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="mr-1 h-4 w-4"
															/>
															<span>
																{item.buyPrice.toLocaleString()}
															</span>
														</>
													)}
												</div>
											</div>
										)}

										{item.baseSellPrice !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Sell Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{item.baseSellPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`collected-${item.id}`}
												checked={isCollected}
												onChange={(e) =>
													handleToggleCollected(item.id, e.target.checked)
												}
												className="mr-2"
											/>
											<Label
												htmlFor={`collected-${item.id}`}
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

EquipmentTab.displayName = "EquipmentTab";

export default EquipmentTab;
