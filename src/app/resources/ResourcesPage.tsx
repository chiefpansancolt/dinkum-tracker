/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { Card, TextInput, Select, Badge, Label, Checkbox, Button } from "flowbite-react";
import {
	weapons,
	vehicles,
	tools,
	signWritingRecipes,
	equipment,
	craftingRecipes,
	cookingRecipes,
	buildings,
	fish,
	relics,
	crops,
	animalProducts,
	forageables,
	critters,
	bugs,
	paint,
	minerals,
	otherCraftables,
	trophies,
} from "@/data/dinkum";
import { HiSearch, HiX, HiFilter, HiTag } from "react-icons/hi";
import { Resource } from "@/types/dinkum";

enum ResourceType {
	FISH = "Fish",
	CRITTER = "Critter",
	BUG = "Bug",
	RELIC = "Relic",
	CROP = "Crop",
	FORAGABLE = "Foragable",
	ANIMALPRODUCT = "Animal Product",
	PAINT = "Paint",
	MINERAL = "Mineral",
	CRAFTABLE = "Craftable",
	TROPHY = "Trophy",
	RESOURCE = "Resource",
}

interface UniqueResource extends Resource {
	usedIn: string[];
	categories: string[];
	resourceType: ResourceType;
}

export default function ResourcesPage() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
	const [sortBy, setSortBy] = useState<string>("name");
	const [showCommonOnly, setShowCommonOnly] = useState<boolean>(false);
	const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);
	const [showTypeFilter, setShowTypeFilter] = useState<boolean>(false);

	const allUniqueResources = useMemo(() => {
		const resourceMap = new Map<string, UniqueResource>();

		const craftableItemNames = new Set<string>();
		const fishNames = new Set<string>();
		const bugNames = new Set<string>();
		const critterNames = new Set<string>();
		const relicNames = new Set<string>();
		const cropNames = new Set<string>();
		const animalProductNames = new Set<string>();
		const forageableNames = new Set<string>();
		const paintNames = new Set<string>();
		const mineralNames = new Set<string>();
		const trophyNames = new Set<string>();

		const collectItemNames = () => {
			weapons.forEach((item) => craftableItemNames.add(item.name));
			tools.forEach((item) => craftableItemNames.add(item.name));
			vehicles.forEach((item) => craftableItemNames.add(item.name));
			equipment.forEach((item) => craftableItemNames.add(item.name));
			craftingRecipes.forEach((item) => craftableItemNames.add(item.name));
			cookingRecipes.forEach((item) => craftableItemNames.add(item.name));
			signWritingRecipes.forEach((item) => craftableItemNames.add(item.name));
			otherCraftables.forEach((item) => craftableItemNames.add(item.name));

			fish.forEach((item) => fishNames.add(item.name));
			critters.forEach((item) => critterNames.add(item.name));
			bugs.forEach((item) => bugNames.add(item.name));
			relics.forEach((item) => relicNames.add(item.name));
			crops.forEach((item) => cropNames.add(item.name));
			animalProducts.forEach((item) => animalProductNames.add(item.name));
			forageables.forEach((item) => forageableNames.add(item.name));
			paint.forEach((item) => paintNames.add(item.name));
			minerals.forEach((item) => mineralNames.add(item.name));
			trophies.forEach((item) => trophyNames.add(item.name));
		};

		collectItemNames();

		const getResourceType = (resourceName: string): ResourceType => {
			if (fishNames.has(resourceName)) return ResourceType.FISH;
			if (bugNames.has(resourceName)) return ResourceType.BUG;
			if (critterNames.has(resourceName)) return ResourceType.CRITTER;
			if (relicNames.has(resourceName)) return ResourceType.RELIC;
			if (cropNames.has(resourceName)) return ResourceType.CROP;
			if (forageableNames.has(resourceName)) return ResourceType.FORAGABLE;
			if (animalProductNames.has(resourceName)) return ResourceType.ANIMALPRODUCT;
			if (paintNames.has(resourceName)) return ResourceType.PAINT;
			if (mineralNames.has(resourceName)) return ResourceType.MINERAL;
			if (trophyNames.has(resourceName)) return ResourceType.TROPHY;
			if (craftableItemNames.has(resourceName)) return ResourceType.CRAFTABLE;
			return ResourceType.RESOURCE;
		};

		const addResources = (resources: Resource[], itemName: string, category: string) => {
			resources.forEach((resource) => {
				if (!resourceMap.has(resource.name)) {
					resourceMap.set(resource.name, {
						name: resource.name,
						img: resource.img,
						count: resource.count,
						usedIn: [itemName],
						categories: [category],
						resourceType: getResourceType(resource.name),
					});
				} else {
					const existingResource = resourceMap.get(resource.name)!;
					if (!existingResource.usedIn.includes(itemName)) {
						existingResource.usedIn.push(itemName);
					}
					if (!existingResource.categories.includes(category)) {
						existingResource.categories.push(category);
					}
				}
			});
		};

		buildings.forEach((building) => {
			if (building.inputs && building.inputs.length > 0) {
				addResources(building.inputs, building.buildingName, "Buildings");
			}
		});

		tools.forEach((tool) => {
			if (tool.inputs && tool.inputs.length > 0) {
				addResources(tool.inputs, tool.name, "Tools");
			}
		});

		weapons.forEach((weapon) => {
			if (weapon.inputs && weapon.inputs.length > 0) {
				addResources(weapon.inputs, weapon.name, "Weapons");
			}
		});

		equipment.forEach((item) => {
			if (item.inputs && item.inputs.length > 0) {
				addResources(item.inputs, item.name, "Equipment");
			}
		});

		vehicles.forEach((vehicle) => {
			if (vehicle.inputs && vehicle.inputs.length > 0) {
				addResources(vehicle.inputs, vehicle.name, "Vehicles");
			}
		});

		craftingRecipes.forEach((recipe) => {
			recipe.variants.forEach((variant) => {
				addResources(variant.inputs, recipe.name, "Crafting Recipes");
			});
		});

		cookingRecipes.forEach((recipe) => {
			recipe.variants.forEach((variant) => {
				addResources(variant.inputs, recipe.name, "Cooking Recipes");
			});
		});

		signWritingRecipes.forEach((recipe) => {
			recipe.variants.forEach((variant) => {
				addResources(variant.inputs, recipe.name, "Sign Writing Recipes");
			});
		});

		otherCraftables.forEach((recipe) => {
			recipe.variants.forEach((variant) => {
				addResources(variant.inputs, recipe.name, "Other Craftables");
			});
		});

		return Array.from(resourceMap.values());
	}, []);

	const uniqueCategories = useMemo(() => {
		const categories = new Set<string>();

		allUniqueResources.forEach((resource) => {
			resource.categories.forEach((category) => {
				categories.add(category);
			});
		});

		return Array.from(categories).sort();
	}, [allUniqueResources]);

	const filteredResources = useMemo(() => {
		return allUniqueResources.filter((resource) => {
			if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			if (selectedCategories.length > 0) {
				if (
					!resource.categories.some((category) => selectedCategories.includes(category))
				) {
					return false;
				}
			}

			if (selectedTypes.length > 0) {
				if (!selectedTypes.includes(resource.resourceType)) {
					return false;
				}
			}

			if (showCommonOnly && resource.usedIn.length < 3) {
				return false;
			}

			return true;
		});
	}, [allUniqueResources, searchQuery, selectedCategories, selectedTypes, showCommonOnly]);

	const sortedResources = useMemo(() => {
		return [...filteredResources].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "usageCount") {
				return b.usedIn.length - a.usedIn.length;
			}
			return 0;
		});
	}, [filteredResources, sortBy]);

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) => {
			if (prev.includes(category)) {
				return prev.filter((c) => c !== category);
			} else {
				return [...prev, category];
			}
		});
	};

	const toggleType = (type: ResourceType) => {
		setSelectedTypes((prev) => {
			if (prev.includes(type)) {
				return prev.filter((t) => t !== type);
			} else {
				return [...prev, type];
			}
		});
	};

	const clearAllCategories = () => {
		setSelectedCategories([]);
	};

	const clearAllTypes = () => {
		setSelectedTypes([]);
	};

	const resourceTypeCounts = useMemo(() => {
		const counts = new Map<ResourceType, number>();

		Object.values(ResourceType).forEach((type) => {
			counts.set(type, 0);
		});

		allUniqueResources.forEach((resource) => {
			const currentCount = counts.get(resource.resourceType) || 0;
			counts.set(resource.resourceType, currentCount + 1);
		});

		return counts;
	}, [allUniqueResources]);

	const getTypeColor = (type: ResourceType): string => {
		switch (type) {
			case ResourceType.FISH:
				return "blue";
			case ResourceType.RELIC:
				return "purple";
			case ResourceType.CROP:
				return "green";
			case ResourceType.CRAFTABLE:
				return "yellow";
			case ResourceType.RESOURCE:
			default:
				return "green";
		}
	};

	return (
		<div className="px-4 py-8">
			<div className="mb-6">
				<h1 className="text-primary mb-2 text-3xl font-bold">Item Breakdown</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Track all resources used in recipes, buildings, tools, and more.
				</p>
			</div>

			<div className="mb-6">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					<div className="md:col-span-3">
						<div className="mb-2 block">
							<Label htmlFor="sort-by">Sort By</Label>
						</div>
						<Select
							id="sort-by"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<option value="name">Name (A-Z)</option>
							<option value="usageCount">Usage Count</option>
						</Select>
					</div>

					<div className="md:col-span-6">
						<div className="mb-2 block">
							<Label htmlFor="search-resources">Search</Label>
						</div>
						<TextInput
							id="search-resources"
							type="text"
							icon={HiSearch}
							placeholder="Search for resources by name..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="flex items-end gap-2 md:col-span-3">
						<Button
							color={
								showCategoryFilter || selectedCategories.length > 0
									? "primary"
									: "light"
							}
							onClick={() => setShowCategoryFilter(!showCategoryFilter)}
							className="flex flex-1 items-center"
						>
							<HiFilter className="mr-2 h-5 w-5" />
							<span>Categories</span>
							{selectedCategories.length > 0 && (
								<span className="ml-1">({selectedCategories.length})</span>
							)}
						</Button>

						<Button
							color={showTypeFilter || selectedTypes.length > 0 ? "primary" : "light"}
							onClick={() => setShowTypeFilter(!showTypeFilter)}
							className="flex flex-1 items-center"
						>
							<HiTag className="mr-2 h-5 w-5" />
							<span>Types</span>
							{selectedTypes.length > 0 && (
								<span className="ml-1">({selectedTypes.length})</span>
							)}
						</Button>
					</div>
				</div>

				{showCategoryFilter && (
					<Card className="mt-4 p-4">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-medium">Filter by Category</h3>
							<Button
								size="xs"
								color="secondary"
								onClick={clearAllCategories}
								disabled={selectedCategories.length === 0}
							>
								<HiX className="mr-1 h-4 w-4" />
								Clear Selections
							</Button>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{uniqueCategories.map((category) => {
								const isSelected = selectedCategories.includes(category);

								return (
									<div
										key={category}
										className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2 ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
												: "border-gray-200 dark:border-gray-700"
										}`}
										onClick={() => toggleCategory(category)}
									>
										<span className="text-sm">{category}</span>
										<Checkbox
											className="ml-auto"
											checked={isSelected}
											onChange={() => toggleCategory(category)}
										/>
									</div>
								);
							})}
						</div>
					</Card>
				)}

				{showTypeFilter && (
					<Card className="mt-4 p-4">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-medium">Filter by Resource Type</h3>
							<Button
								size="xs"
								color="secondary"
								onClick={clearAllTypes}
								disabled={selectedTypes.length === 0}
							>
								<HiX className="mr-1 h-4 w-4" />
								Clear Selections
							</Button>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
							{Object.values(ResourceType).map((type) => {
								const isSelected = selectedTypes.includes(type);
								const count = resourceTypeCounts.get(type) || 0;

								return (
									<div
										key={type}
										className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2 ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
												: "border-gray-200 dark:border-gray-700"
										}`}
										onClick={() => toggleType(type)}
									>
										<div className="flex flex-col">
											<span className="text-sm font-medium">{type}</span>
											<span className="text-xs text-gray-500">
												{count} items
											</span>
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
					</Card>
				)}

				<div className="mt-4 flex flex-wrap gap-4">
					<div className="flex items-center">
						<Checkbox
							id="common-only"
							checked={showCommonOnly}
							onChange={() => setShowCommonOnly(!showCommonOnly)}
							className="mr-2"
						/>
						<Label htmlFor="common-only" className="cursor-pointer">
							Common Resources Only (Used in 3+ Items)
						</Label>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {sortedResources.length} of {allUniqueResources.length} resources
					{selectedCategories.length > 0 &&
						` (filtered by ${selectedCategories.length} categories)`}
					{selectedTypes.length > 0 && ` (filtered by ${selectedTypes.length} types)`}
					{showCommonOnly && ` (common resources only)`}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{sortedResources.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No resources match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				) : (
					sortedResources.map((resource) => (
						<ResourceCard
							key={resource.name}
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
	resource: UniqueResource;
	getTypeColor: (type: ResourceType) => string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, getTypeColor }) => {
	const [showAllUsages, setShowAllUsages] = useState(false);

	const displayedUsages = showAllUsages ? resource.usedIn : resource.usedIn.slice(0, 5);

	const hasMoreUsages = resource.usedIn.length > 5;

	return (
		<Card className="h-full">
			<div className="flex h-full flex-col">
				<div className="mb-2 flex items-start justify-between">
					<h3 className="text-lg font-medium">{resource.name}</h3>
					<div className="flex flex-col gap-1">
						<Badge color="indigo">Used in {resource.usedIn.length} items</Badge>
						<Badge color={getTypeColor(resource.resourceType)}>
							{resource.resourceType}
						</Badge>
					</div>
				</div>

				<div className="flex items-center justify-center py-4">
					{resource.img && (
						<div className="relative h-20 w-20">
							<img
								src={resource.img}
								alt={resource.name}
								className="h-full w-full object-contain"
							/>
						</div>
					)}
				</div>

				<div className="mt-2 flex-grow">
					<div className="mb-2">
						<p className="font-medium">Categories:</p>
						<div className="mt-1 flex flex-wrap gap-1">
							{resource.categories.map((category) => (
								<Badge
									key={`${resource.name}-${category}`}
									color="blue"
									className="mr-1"
								>
									{category}
								</Badge>
							))}
						</div>
					</div>

					<div>
						<p className="font-medium">Used in:</p>
						<ul className="mt-1 space-y-1">
							{displayedUsages.map((item, index) => (
								<li key={`${resource.name}-usage-${index}`} className="text-sm">
									• {item}
								</li>
							))}
							{hasMoreUsages && !showAllUsages && (
								<li>
									<button
										className="text-primary hover:text-accent mt-1 text-sm"
										onClick={() => setShowAllUsages(true)}
									>
										Show {resource.usedIn.length - 5} more...
									</button>
								</li>
							)}
							{showAllUsages && hasMoreUsages && (
								<li>
									<button
										className="text-primary hover:text-accent mt-1 text-sm"
										onClick={() => setShowAllUsages(false)}
									>
										Show less
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</Card>
	);
};
