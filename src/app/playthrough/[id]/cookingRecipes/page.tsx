"use client";

import { Button, Card, Checkbox, ToggleSwitch } from "flowbite-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiX } from "react-icons/hi";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getBuffIcon } from "@/lib/services/buffIconService";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { unlockedFilter } from "@/data/constants";
import {
	cookingRecipes,
	getCookingRecipesByLocation,
	getCookingRecipesBySearchValue,
	getUniqueCookingBuffs,
	getUniqueCookingLocations,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import CookingRecipeCard from "./CookingRecipeCard";

export default function CookingRecipesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [locationFilter, setLocationFilter] = useState<string>("All");
	const [unlockFilter, setUnlockFilter] = useState<string>("All");
	const [selectedBuffs, setSelectedBuffs] = useState<string[]>([]);
	const [matchAllBuffs, setMatchAllBuffs] = useState<boolean>(false);
	const [showBuffFilter, setShowBuffFilter] = useState<boolean>(false);
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		location: {
			value: locationFilter,
			options: getUniqueCookingLocations(),
			label: "Cooking Locations",
		},
		unlocked: {
			value: unlockFilter,
			options: unlockedFilter,
			label: "Unlocked",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLocalState(data.cookingRecipes || {});
			}

			setIsLoading(false);

			const params = getQueryParams();
			if (params.q) {
				setSearchQuery(params.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (searchQuery) {
			setQueryParam("q", searchQuery);
		} else {
			setQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleUnlocked = (id: string, isUnlocked: boolean) => {
		setLocalState((prev) => {
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
			cookingRecipes: localState,
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

	const handleFilterChange = (name: string, value: string) => {
		if (name === "location") {
			setLocationFilter(value);
		} else if (name === "unlocked") {
			setUnlockFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...cookingRecipes];

		if (locationFilter !== "All") {
			filtered = getCookingRecipesByLocation(filtered, locationFilter);
		}

		if (selectedBuffs.length > 0) {
			filtered = filtered.filter((recipe) => {
				if (!recipe.buffs || Object.keys(recipe.buffs).length <= 1) {
					return false;
				}

				if (matchAllBuffs) {
					return selectedBuffs.every(
						(buff) => recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
					);
				} else {
					return selectedBuffs.some(
						(buff) => recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
					);
				}
			});
		}

		if (unlockFilter !== "All") {
			if (unlockFilter === "unlocked") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (unlockFilter === "not_unlocked") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getCookingRecipesBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [locationFilter, selectedBuffs, matchAllBuffs, unlockFilter, localState, searchQuery]);

	const getUnlockedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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
					searchPlaceholder="Search recipe by name..."
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
							{getUniqueCookingBuffs().map((buff) => {
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

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<CookingRecipeCard
								key={item.id}
								record={item}
								isCollected={localState[item.id] || false}
								onToggleCollected={handleToggleUnlocked}
							/>
						))}
					</div>
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
