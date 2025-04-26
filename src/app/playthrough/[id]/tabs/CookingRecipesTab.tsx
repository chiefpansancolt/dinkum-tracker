/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Badge, Button, ToggleSwitch } from "flowbite-react";
import { cookingRecipes } from "@/data/dinkum";
import { BuffIcons } from "@/data/constants";
import { TabHandle, UnlockTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiX } from "react-icons/hi";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import ItemBuffs from "@/playthrough/ui/itemcard/ItemBuffs";

const CookingRecipesTab = forwardRef<TabHandle, UnlockTabProps>(({ unlocked }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [locationFilter, setLocationFilter] = useState<string>("All");
	const [selectedBuffs, setSelectedBuffs] = useState<string[]>([]);
	const [matchAllBuffs, setMatchAllBuffs] = useState<boolean>(false);
	const [showBuffFilter, setShowBuffFilter] = useState<boolean>(false);
	const [localState, setLocalState] = useState<Record<string, boolean>>(unlocked);

	const isDirty = useRef(false);

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
		setLocalState(unlocked);
		isDirty.current = false;

		const hashParams = getHashQueryParams();
		if (hashParams.q) {
			setSearchQuery(hashParams.q);
		}
	}, [unlocked]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleUnlocked = (id: string, isUnlocked: boolean) => {
		setLocalState((prev) => ({
			...prev,
			[id]: isUnlocked,
		}));

		isDirty.current = true;
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				cookingRecipes: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

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
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const toggleFilter = () => {
		setShowBuffFilter(!showBuffFilter);
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Cooking Recipes"
				collectionName="Unlocked"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getUnlockedCount()}
				collectionTotal={cookingRecipes.length}
				dirtyMessage="Your cooking Recipes collection has not been saved yet."
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

			{filteredData.length > 0 && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredData.map((recipe) => {
						const isUnlocked = localState[recipe.id] === true;

						return (
							<ItemCard
								key={recipe.id}
								renderHeader={() => (
									<ItemHeader
										title={recipe.name}
										renderRightComp={() => (
											<>
												{typeof recipe.outputCount === "number" &&
													recipe.outputCount > 1 && (
														<Badge color="gray">
															x{recipe.outputCount}
														</Badge>
													)}
												{recipe.outputCount === "Varies" && (
													<Badge color="gray">Varies</Badge>
												)}
											</>
										)}
									/>
								)}
								renderImage={() => (
									<ItemImage
										src={recipe.img}
										name={recipe.name}
										isCollected={isUnlocked}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										<div className="grid grid-cols-12">
											<div className="col-span-4">Cooking Location:</div>
											<div className="col-span-8">
												<div className="flex flex-wrap gap-1">
													{recipe.cookingLocation.map(
														(location, index) => (
															<Badge
																key={`${recipe.id}-loc-${index}`}
																color="info"
																className="mr-1"
															>
																{location}
															</Badge>
														)
													)}
												</div>
											</div>
										</div>

										{recipe.buffs && Object.keys(recipe.buffs).length > 1 && (
											<ItemBuffs id={recipe.id} buffs={recipe.buffs} />
										)}

										<DinkValue
											label="Sell Price"
											price={recipe.baseSellPrice}
											showCommerceLicenses={true}
										/>

										{recipe.sheilasSellPrice && (
											<DinkValue
												label="Sheila's"
												price={recipe.sheilasSellPrice}
											/>
										)}

										{recipe.tedsSellPrice && (
											<DinkValue label="Ted's" price={recipe.tedsSellPrice} />
										)}

										{recipe.jimmysSellPrice && (
											<DinkValue
												label="Jimmy's"
												price={recipe.jimmysSellPrice}
											/>
										)}

										<ItemResources
											id={recipe.id}
											label="Resources"
											variants={recipe.variants}
										/>
									</div>
								)}
								renderFooter={() => (
									<ItemFooter
										id={recipe.id}
										leftLabel="Unlocked"
										isLeftChecked={isUnlocked}
										handleLeftToggle={handleToggleUnlocked}
									/>
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

CookingRecipesTab.displayName = "CookingRecipesTab";

export default CookingRecipesTab;
