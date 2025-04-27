/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Button, ToggleSwitch } from "flowbite-react";
import { cookingRecipes } from "@/data/dinkum";
import { Playthrough } from "@/types";
import { updatePlaythroughData, getPlaythroughById } from "@/lib/localStorage";
import { HiX } from "react-icons/hi";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import { getBuffIcon } from "@/lib/services/buffIconService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import CookingRecipeCard from "./CookingRecipeCard";

export default function CookingRecipesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [locationFilter, setLocationFilter] = useState<string>("All");
	const [selectedBuffs, setSelectedBuffs] = useState<string[]>([]);
	const [matchAllBuffs, setMatchAllBuffs] = useState<boolean>(false);
	const [showBuffFilter, setShowBuffFilter] = useState<boolean>(false);
	const [cookingRecipesCollection, setCookingRecipesCollection] = useState<
		Record<string, boolean>
	>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueLocations = useMemo(() => {
		const locations = new Set<string>();
		cookingRecipes.forEach((recipe) => {
			if (recipe.cookingLocation && recipe.cookingLocation.length > 0) {
				recipe.cookingLocation.forEach((loc) => locations.add(loc));
			}
		});
		return [
			{ id: "All", value: "All Locations" },
			...Array.from(locations)
				.sort()
				.map((location) => ({
					id: location,
					value: location,
				})),
		];
	}, []);

	const uniqueBuffs = useMemo(() => {
		const buffs = new Set<string>();
		cookingRecipes.forEach((recipe) => {
			if (recipe.buffs) {
				Object.keys(recipe.buffs).forEach((buff) => {
					if (buff !== "length") {
						buffs.add(buff);
					}
				});
			}
		});
		return Array.from(buffs).sort();
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setCookingRecipesCollection(data.cookingRecipes || {});
			}

			setIsLoading(false);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleUnlocked = (id: string, isUnlocked: boolean) => {
		setCookingRecipesCollection((prev) => {
			if (prev[id] !== isUnlocked) {
				setIsDirty(true);
			}
			return {
				...prev,
				[id]: isUnlocked,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			cookingRecipes: cookingRecipesCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const toggleBuffFilter = (buffName: string) => {
		setSelectedBuffs((prev) => {
			if (prev.includes(buffName)) {
				return prev.filter((b) => b !== buffName);
			} else {
				return [...prev, buffName];
			}
		});
	};

	const clearAllBuffFilters = () => {
		setSelectedBuffs([]);
	};

	const filters = {
		location: {
			value: locationFilter,
			options: uniqueLocations,
			label: "Cooking Locations",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "location") {
			setLocationFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		return cookingRecipes.filter((recipe) => {
			if (locationFilter !== "All" && !recipe.cookingLocation.includes(locationFilter)) {
				return false;
			}

			if (selectedBuffs.length > 0) {
				if (!recipe.buffs || Object.keys(recipe.buffs).length <= 1) {
					return false;
				}

				if (matchAllBuffs) {
					const hasAllBuffs = selectedBuffs.every(
						(buff) => recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
					);
					if (!hasAllBuffs) return false;
				} else {
					const hasAnyBuff = selectedBuffs.some(
						(buff) => recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
					);
					if (!hasAnyBuff) return false;
				}
			}

			if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [locationFilter, selectedBuffs, matchAllBuffs, searchQuery]);

	const getUnlockedCount = () => {
		return Object.keys(cookingRecipesCollection).filter((key) => cookingRecipesCollection[key])
			.length;
	};

	const toggleFilter = () => {
		setShowBuffFilter(!showBuffFilter);
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading cooking recipes..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp
				id={playthroughId}
				name={playthrough.name}
				routeName="Cooking Recipes"
			/>
			<div className="space-y-6 p-6">
				<TabHeader
					title="Cooking Recipes"
					collectionName="Unlocked"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getUnlockedCount()}
					collectionTotal={cookingRecipes.length}
					dirtyMessage="Your cooking recipes collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search by name..."
					showActionButton={true}
					actionButtonLabel="Buffs"
					filterActive={showBuffFilter}
					onActionButtonClick={toggleFilter}
					selectedCount={selectedBuffs.length}
				/>

				{showBuffFilter && (
					<Card>
						<div className="mb-2 flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
								Filter by Buffs
							</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-900 dark:text-gray-50">
										Match mode:
									</span>
									<ToggleSwitch
										checked={matchAllBuffs}
										onChange={setMatchAllBuffs}
										label=""
									/>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-50">
										{matchAllBuffs ? "ALL" : "ANY"}
									</span>
								</div>
								<Button
									size="xs"
									color="secondary"
									onClick={clearAllBuffFilters}
									disabled={selectedBuffs.length === 0}
								>
									<HiX className="mr-1 h-4 w-4" />
									Clear Selections
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{uniqueBuffs.map((buff) => {
								const isSelected = selectedBuffs.includes(buff);
								const { icon } = getBuffIcon(buff, 1);

								return (
									<div
										key={buff}
										className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-gray-900 dark:text-gray-50 ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
												: "border-gray-200 dark:border-gray-700"
										}`}
										onClick={() => toggleBuffFilter(buff)}
									>
										{icon && (
											<img
												src={icon}
												alt={buff}
												className="h-5 w-5 object-contain"
											/>
										)}
										<span className="text-sm">
											{buff
												.replace(/([A-Z])/g, " $1")
												.replace(/^./, (str) => str.toUpperCase())
												.replace(" Level", "")}
										</span>
										<Checkbox
											className="ml-auto"
											checked={isSelected}
											onChange={() => toggleBuffFilter(buff)}
										/>
									</div>
								);
							})}
						</div>
					</Card>
				)}

				<FilterDetails
					title="recipes"
					filteredCount={filteredData.length}
					totalCount={cookingRecipes.length}
					collectedLabel="Unlocked"
					collectedCount={getUnlockedCount()}
				/>

				{filteredData.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((recipe) => (
							<CookingRecipeCard
								key={recipe.id}
								recipe={recipe}
								isUnlocked={cookingRecipesCollection[recipe.id] || false}
								onToggleUnlocked={handleToggleUnlocked}
							/>
						))}
					</div>
				) : (
					<EmptyFilterCard />
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
