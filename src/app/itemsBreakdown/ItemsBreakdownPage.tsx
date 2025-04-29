"use client";

import { useState, useMemo } from "react";
import { Card, Badge, Label, Checkbox, Button } from "flowbite-react";
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
	foragables,
	critters,
	bugs,
	paint,
	minerals,
	otherCraftables,
	trophies,
} from "@/data/dinkum";
import { ResourceType } from "@/data/constants";
import { UniqueResource, Resource, ItemBreakdownResourceCardProps } from "@/types";
import { HiX } from "react-icons/hi";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import LoadingPlaythrough from "@/components/playthrough/LoadingPlaythrough";

export default function ItemsBreakdownPage() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
	const [sortBy, setSortBy] = useState<string>("name");
	const [showCommonOnly, setShowCommonOnly] = useState<boolean>(false);
	const [showFilter, setShowFilter] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);

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
			foragables.forEach((item) => forageableNames.add(item.name));
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
				addResources(building.inputs, building.name, "Buildings");
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

		setIsLoading(false);

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

	const filters = {
		sort: {
			value: sortBy,
			options: [
				{ id: "name", value: "Name (A-Z)" },
				{ id: "usageCount", value: "Usage Count" },
			],
			label: "Sort By",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "sort") {
			setSortBy(value);
		}
	};

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

	const clearAllFilters = () => {
		setSelectedCategories([]);
		setSelectedTypes([]);
	};

	const toggleFilter = () => {
		setShowFilter(!showFilter);
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

	if (isLoading) {
		return <LoadingPlaythrough message="Loading Resources..." />;
	}

	return (
		<div className="space-y-6">
			<TabHeader title="Buildings" enableCollectionCount={false} enableSaveAlert={false} />

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				showActionButton={true}
				onActionButtonClick={toggleFilter}
				filterActive={showFilter}
				selectedCount={selectedTypes.length + selectedCategories.length}
			/>

			{showFilter && (
				<Card>
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
							Filter by Category
						</h3>
						<Button
							size="xs"
							color="secondary"
							onClick={clearAllFilters}
							disabled={selectedCategories.length === 0 && selectedTypes.length === 0}
						>
							<HiX className="mr-1 h-4 w-4" />
							Clear Selections
						</Button>
					</div>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{uniqueCategories.map((category) => {
							const isSelected = selectedCategories.includes(category);

							return (
								<div
									key={category}
									className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2 text-gray-900 dark:text-gray-50 ${
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
					<div className="my-2">
						<h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
							Filter by Resource Type
						</h3>
					</div>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
						{Object.values(ResourceType).map((type) => {
							const isSelected = selectedTypes.includes(type);
							const count = resourceTypeCounts.get(type) || 0;

							return (
								<div
									key={type}
									className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-2 text-gray-900 dark:text-gray-50 ${
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

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {sortedResources.length} of {allUniqueResources.length} resources
					{selectedCategories.length > 0 &&
						` (filtered by ${selectedCategories.length} categories)`}
					{selectedTypes.length > 0 && ` (filtered by ${selectedTypes.length} types)`}
					{showCommonOnly && ` (common resources only)`}
				</p>
			</div>

			{sortedResources.length > 0 && (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{sortedResources.map((resource) => (
						<ResourceCard
							key={resource.name}
							resource={resource}
							getTypeColor={getTypeColor}
						/>
					))}
				</div>
			)}

			{sortedResources.length === 0 && <EmptyFilterCard />}
		</div>
	);
}

const ResourceCard: React.FC<ItemBreakdownResourceCardProps> = ({ resource, getTypeColor }) => {
	const [showAllUsages, setShowAllUsages] = useState(false);
	const displayedUsages = showAllUsages ? resource.usedIn : resource.usedIn.slice(0, 5);
	const hasMoreUsages = resource.usedIn.length > 5;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={resource.name}
					renderRightComp={() => (
						<div className="flex flex-col gap-1">
							<Badge color="indigo">Used in {resource.usedIn.length} items</Badge>
							<Badge color={getTypeColor(resource.resourceType)}>
								{resource.resourceType}
							</Badge>
						</div>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={resource.img} name={resource.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<div className="mt-auto">
						<div className="mb-2 font-medium">Categories:</div>
						<div className="flex flex-wrap gap-1">
							{resource.categories.map((category: string) => (
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
						<div className="mb-2 font-medium">Used In:</div>
						<div className="mb-2 grid grid-cols-2 gap-2">
							{displayedUsages.map((item: string, index: number) => (
								<div
									key={`${resource.name}-usage-${index}`}
									className="rounded-md bg-gray-100 p-2 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-50"
								>
									{item}
								</div>
							))}
						</div>
						{hasMoreUsages && !showAllUsages && (
							<Button
								color="primary"
								outline={true}
								size="xs"
								onClick={() => setShowAllUsages(true)}
							>
								Show {resource.usedIn.length - 5} more...
							</Button>
						)}
						{showAllUsages && hasMoreUsages && (
							<Button
								color="primary"
								outline={true}
								size="xs"
								onClick={() => setShowAllUsages(false)}
							>
								Show less
							</Button>
						)}
					</div>
				</div>
			)}
		/>
	);
};
