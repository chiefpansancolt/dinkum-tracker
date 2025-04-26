"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { craftingRecipes } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, UnlockTabProps } from "@/types";
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

const CraftingRecipesTab = forwardRef<TabHandle, UnlockTabProps>(({ unlocked }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [localState, setLocalState] = useState<Record<string, boolean>>(unlocked);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		craftingRecipes.forEach((recipe) => {
			if (recipe.source && recipe.source.length > 0) {
				recipe.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return [
			{ id: "All", value: "All Sources" },
			...Array.from(sources)
				.sort()
				.map((source) => ({
					id: source,
					value: source,
				})),
		];
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
				craftingRecipes: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const filters = {
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Sources",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		return craftingRecipes.filter((recipe) => {
			if (sourceFilter !== "All" && !recipe.source?.includes(sourceFilter)) {
				return false;
			}

			if (searchQuery) {
				return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
			}

			return true;
		});
	}, [sourceFilter, searchQuery]);

	const getUnlockedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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
				collectionTotal={craftingRecipes.length}
				dirtyMessage="Your crafting recipes collection has not been saved yet."
			/>

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search by name..."
			/>
			<FilterDetails
				title="recipes"
				filteredCount={filteredData.length}
				totalCount={craftingRecipes.length}
				collectedLabel="Unlocked"
				collectedCount={getUnlockedCount()}
			/>

			{filteredData.length > 0 && (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
										{recipe.source && recipe.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{recipe.source.map((src, index) => (
														<Badge
															key={`${recipe.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										<DinkValue
											label="Sell Price"
											price={recipe.baseSellPrice}
											showCommerceLicenses={true}
										/>

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

CraftingRecipesTab.displayName = "CraftingRecipesTab";

export default CraftingRecipesTab;
