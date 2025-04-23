/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { Card, TextInput, Select, Badge, Label, Checkbox, Button } from "flowbite-react";
import {
	animalProducts,
	forageables,
	minerals,
	relics,
	trophies,
	otherCraftables,
} from "@/data/dinkum";
import { HiSearch, HiX, HiFilter } from "react-icons/hi";
import { Buffs, ResourceVariant } from "@/types";
import { BuffIcons } from "@/data/constants";

enum ResourceType {
	ANIMAL_PRODUCT = "Animal Product",
	FORAGEABLE = "Forageable",
	MINERAL = "Mineral",
	RELIC = "Relic",
	TROPHY = "Trophy",
	CRAFTABLE = "Craftable",
}

interface ResourceItem {
	id: string;
	name: string;
	img: string;
	source?: string[];
	baseSellPrice: number;
	buffs?: Buffs;
	locations?: string[];
	resourceType: ResourceType;
	buyPrice?: number;
	description?: string;
	variants?: ResourceVariant[];
}

export default function ResourcesTab() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
	const [sortBy, setSortBy] = useState<string>("name");
	const [showFilter, setShowFilter] = useState<boolean>(false);
	const [priceRangeMin, setPriceRangeMin] = useState<string>("");
	const [priceRangeMax, setPriceRangeMax] = useState<string>("");

	const allResources = useMemo(() => {
		const resources: ResourceItem[] = [];

		animalProducts.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.ANIMAL_PRODUCT,
			});
		});

		forageables.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.FORAGEABLE,
			});
		});

		minerals.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.MINERAL,
			});
		});

		relics.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.RELIC,
			});
		});

		trophies.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.TROPHY,
			});
		});

		otherCraftables.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.CRAFTABLE,
			});
		});

		return resources;
	}, []);

	const resourceTypes = useMemo(() => {
		return Object.values(ResourceType);
	}, []);

	const filteredResources = useMemo(() => {
		return allResources.filter((resource) => {
			if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			if (selectedTypes.length > 0 && !selectedTypes.includes(resource.resourceType)) {
				return false;
			}

			const minPrice = priceRangeMin ? parseInt(priceRangeMin) : 0;
			const maxPrice = priceRangeMax ? parseInt(priceRangeMax) : Infinity;
			if (resource.baseSellPrice < minPrice || resource.baseSellPrice > maxPrice) {
				return false;
			}

			return true;
		});
	}, [allResources, searchQuery, selectedTypes, priceRangeMin, priceRangeMax]);

	const sortedResources = useMemo(() => {
		return [...filteredResources].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "priceAsc") {
				return a.baseSellPrice - b.baseSellPrice;
			} else if (sortBy === "priceDesc") {
				return b.baseSellPrice - a.baseSellPrice;
			}
			return 0;
		});
	}, [filteredResources, sortBy]);

	const toggleType = (type: ResourceType) => {
		setSelectedTypes((prev) => {
			if (prev.includes(type)) {
				return prev.filter((t) => t !== type);
			} else {
				return [...prev, type];
			}
		});
	};

	const clearAllTypes = () => {
		setSelectedTypes([]);
	};

	const typeCount = (type: ResourceType) => {
		return allResources.filter((r) => r.resourceType === type).length;
	};

	const getTypeColor = (type: ResourceType): string => {
		switch (type) {
			case ResourceType.ANIMAL_PRODUCT:
				return "success";
			case ResourceType.FORAGEABLE:
				return "green";
			case ResourceType.MINERAL:
				return "purple";
			case ResourceType.RELIC:
				return "indigo";
			case ResourceType.TROPHY:
				return "warning";
			case ResourceType.CRAFTABLE:
				return "info";
			default:
				return "gray";
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-primary mb-2 text-2xl font-bold">Resources</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Browse all resources available in Dinkum including animal products, forageables,
					minerals, relics, and trophies.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
				<div className="md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="sort-by">Sort By</Label>
					</div>
					<Select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="name">Name (A-Z)</option>
						<option value="priceDesc">Price (High to Low)</option>
						<option value="priceAsc">Price (Low to High)</option>
					</Select>
				</div>

				<div className="md:col-span-9">
					<div className="mb-2 block">
						<Label htmlFor="search-resources">Search</Label>
					</div>
					<TextInput
						id="search-resources"
						type="text"
						icon={HiSearch}
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="flex items-end justify-start md:col-span-1">
					<Button
						color={showFilter || selectedTypes.length > 0 ? "primary" : "light"}
						onClick={() => setShowFilter(!showFilter)}
					>
						<HiFilter className="mr-2 h-5 w-5" />
						<span>Filter</span>
						{selectedTypes.length > 0 && (
							<span className="ml-1">({selectedTypes.length})</span>
						)}
					</Button>
				</div>
			</div>

			{showFilter && (
				<Card className="p-4">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-medium">Filter by Resource Type</h3>
						<Button
							size="xs"
							color="secondary"
							onClick={clearAllTypes}
							disabled={selectedTypes.length === 0}
						>
							<HiX className="mr-1 h-4 w-4" />
							Clear Filters
						</Button>
					</div>

					<div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
						{resourceTypes.map((type) => {
							const isSelected = selectedTypes.includes(type);
							const count = typeCount(type);

							return (
								<div
									key={type}
									className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 ${
										isSelected
											? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
											: "border-gray-200 dark:border-gray-700"
									}`}
									onClick={() => toggleType(type)}
								>
									<div className="flex flex-col">
										<span className="text-sm font-medium">{type}</span>
										<span className="text-xs text-gray-500">{count} items</span>
									</div>
									<Checkbox
										className="ml-auto"
										checked={isSelected}
										onChange={() => toggleType(type)}
									/>
								</div>
							);
						})}
					</div>

					<div>
						<h3 className="mb-2 text-lg font-medium">Price Range</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="price-min">Min Price</Label>
								<TextInput
									id="price-min"
									type="number"
									placeholder="Min"
									value={priceRangeMin}
									onChange={(e) => setPriceRangeMin(e.target.value)}
								/>
							</div>
							<div>
								<Label htmlFor="price-max">Max Price</Label>
								<TextInput
									id="price-max"
									type="number"
									placeholder="Max"
									value={priceRangeMax}
									onChange={(e) => setPriceRangeMax(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</Card>
			)}

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {sortedResources.length} of {allResources.length} resources
					{selectedTypes.length > 0 && ` (filtered by ${selectedTypes.length} types)`}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{sortedResources.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No resources match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				) : (
					sortedResources.map((resource) => (
						<ResourceCard
							key={resource.id}
							resource={resource}
							getTypeColor={getTypeColor}
						/>
					))
				)}
			</div>
		</div>
	);
}

interface ResourceCardProps {
	resource: ResourceItem;
	getTypeColor: (type: ResourceType) => string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, getTypeColor }) => {
	const getBuffIcon = (buffName: string, value?: number): { icon: string; level?: number } => {
		if (value) {
			if (buffName === "attackLevel" && value <= 3) {
				return {
					icon: BuffIcons[`attackLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "defenseLevel" && value <= 3) {
				return {
					icon: BuffIcons[`defenseLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "experienceLevel" && value <= 3) {
				return {
					icon: BuffIcons[`experienceLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "fishLevel" && value <= 3) {
				return {
					icon: BuffIcons[`fishLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "foragingLevel" && value <= 3) {
				return {
					icon: BuffIcons[`foragingLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "miningLevel" && value <= 3) {
				return {
					icon: BuffIcons[`miningLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "speedLevel" && value <= 3) {
				return {
					icon: BuffIcons[`speedLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "swimmingLevel" && value <= 3) {
				return {
					icon: BuffIcons[`swimmingLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "fastHealthTickSpeedLevel" && value <= 2) {
				return {
					icon: BuffIcons[`fastHealthTickSpeedLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			} else if (buffName === "coolLevel" && value <= 2) {
				return {
					icon: BuffIcons[`coolLevel${value}` as keyof typeof BuffIcons],
					level: value,
				};
			}
		}

		return { icon: BuffIcons[buffName as keyof typeof BuffIcons] };
	};

	return (
		<Card className="h-full">
			<div className="flex h-full flex-col">
				<div className="mb-2 flex items-start justify-between">
					<h3 className="text-lg font-medium">{resource.name}</h3>
					<Badge color={getTypeColor(resource.resourceType)}>
						{resource.resourceType}
					</Badge>
				</div>

				<div className="flex items-center justify-center py-4">
					{resource.img && (
						<div className="h-20 w-20">
							<img
								src={resource.img}
								alt={resource.name}
								className="h-full w-full object-contain"
							/>
						</div>
					)}
				</div>

				<div className="mt-2 flex-grow space-y-2 text-sm">
					{resource.source && resource.source.length > 0 && (
						<div className="flex">
							<p className="w-24 font-medium">Source:</p>
							<div className="flex flex-wrap gap-1">
								{resource.source.map((src, index) => (
									<Badge
										key={`${resource.id}-src-${index}`}
										color="info"
										className="mr-1"
									>
										{src}
									</Badge>
								))}
							</div>
						</div>
					)}

					{resource.locations && resource.locations.length > 0 && (
						<div className="flex">
							<p className="w-24 font-medium">Locations:</p>
							<p>{resource.locations.join(", ")}</p>
						</div>
					)}

					{resource.buyPrice !== undefined && (
						<div className="flex items-center">
							<p className="w-24 font-medium">Buy Price:</p>
							<div className="flex items-center">
								<img
									src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
									alt="Dinks"
									className="mr-1 h-4 w-4"
								/>
								<span>{resource.buyPrice.toLocaleString()}</span>
							</div>
						</div>
					)}

					<div className="flex items-center">
						<p className="w-24 font-medium">Sell Price:</p>
						<div className="flex items-center">
							<img
								src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
								alt="Dinks"
								className="mr-1 h-4 w-4"
							/>
							<span>{resource.baseSellPrice.toLocaleString()}</span>
						</div>
					</div>

					{resource.variants && (
						<div className="flex flex-col">
							<p className="mb-1 font-medium">Resources:</p>
							{resource.variants.length > 1 ? (
								<div className="max-h-60 overflow-y-auto">
									{resource.variants.map((variant, variantIndex) => (
										<div
											key={`${resource.id}-variant-${variantIndex}`}
											className="mb-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
										>
											<p className="mb-1 text-sm font-medium">
												Option {variantIndex + 1}:
												{variant.outputCount && (
													<span className="ml-1 text-xs text-gray-500">
														(x
														{variant.outputCount})
													</span>
												)}
											</p>
											<div className="ml-2 space-y-1">
												{variant.inputs.map((input, idx) => (
													<div
														key={`${resource.id}-variant-${variantIndex}-input-${idx}`}
														className="flex items-center gap-1 rounded-md bg-white p-1 dark:bg-gray-700"
													>
														{input.img && (
															<img
																src={input.img}
																alt={input.name}
																className="h-4 w-4"
															/>
														)}
														<span>
															{input.count}x {input.name}
														</span>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="ml-2 space-y-1">
									{resource.variants?.[0].inputs.map((input, idx) => (
										<div
											key={`${resource.variants?.[0]?.id}-input-${idx}`}
											className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-700"
										>
											{input.img && (
												<img
													src={input.img}
													alt={input.name}
													className="h-5 w-5 object-contain"
												/>
											)}
											<span>
												{input.count}x {input.name}
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{resource.description && (
						<div className="mt-2">
							<p className="font-medium">Description:</p>
							<p className="text-gray-600 dark:text-gray-400">
								{resource.description}
							</p>
						</div>
					)}

					{resource.buffs && Object.keys(resource.buffs).length > 0 && (
						<div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700">
							{resource.buffs && Object.keys(resource.buffs).length > 1 && (
								<div className="flex">
									<p className="mr-4 font-medium">Buffs:</p>
									<div className="flex flex-wrap items-center gap-1">
										{resource.buffs.length && (
											<div
												key={`${resource.id}-buff-length`}
												className="flex items-center"
												title="Buff Duration"
											>
												<img
													src={BuffIcons.length}
													alt="Buff Duration"
													className="h-7 w-7 object-contain"
												/>
												<span className="ml-1 text-xs">
													{resource.buffs.length}
												</span>
											</div>
										)}

										{Object.entries(resource.buffs).map(([buffName, value]) => {
											if (buffName === "length") return null;

											const { icon, level } = getBuffIcon(
												buffName,
												value as number
											);

											return (
												<div
													key={`${resource.id}-buff-${buffName}`}
													className="flex items-center"
													title={buffName
														.replace(/([A-Z])/g, " $1")
														.replace(/^./, (str) => str.toUpperCase())}
												>
													{icon && (
														<img
															src={icon}
															alt={buffName}
															className="h-5 w-5 object-contain"
														/>
													)}
													{typeof value === "number" && !level && (
														<span className="ml-1 text-xs">
															{value}
															{buffName === "healthRegenRate" && "/t"}
															{buffName === "staminaRegenRate" &&
																"/s"}
														</span>
													)}
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
