"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { unlockedFilter } from "@/data/constants";
import {
	craftingRecipes,
	getCraftingRecipesBySearchValue,
	getCraftingRecipesBySource,
	getUniqueCraftingRecipeSources,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import CraftingRecipeCard from "./CraftingRecipeCard";

export default function CraftingRecipesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [unlockFilter, setUnlockFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		source: {
			value: sourceFilter,
			options: getUniqueCraftingRecipeSources(),
			label: "Sources",
		},
		unlocked: {
			value: unlockFilter,
			options: unlockedFilter,
			label: "Unlocked",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			getPlaythroughById(playthroughId).then((data) => {
				setPlaythrough(data);

				if (data) {
					setLocalState(data.craftingRecipes || {});
				}

				setIsLoading(false);
			});

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

	const handleSave = async () => {
		if (!isDirty) return false;

		const success = await updatePlaythroughData(playthroughId, {
			craftingRecipes: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "unlocked") {
			setUnlockFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...craftingRecipes];

		if (sourceFilter !== "All") {
			filtered = getCraftingRecipesBySource(filtered, sourceFilter);
		}

		if (unlockFilter !== "All") {
			if (unlockFilter === "unlocked") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (unlockFilter === "not_unlocked") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getCraftingRecipesBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [sourceFilter, unlockFilter, localState, searchQuery]);

	const getUnlockedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading crafting recipes..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp
				id={playthroughId}
				name={playthrough.name}
				routeName="Crafting Recipes"
			/>
			<div className="space-y-6 p-6">
				<TabHeader
					title="Crafting Recipes"
					collectionName="Unlocked"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
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
					searchPlaceholder="Search recipe by name..."
				/>

				<FilterDetails
					title="recipes"
					filteredCount={filteredData.length}
					totalCount={craftingRecipes.length}
					collectedLabel="Unlocked"
					collectedCount={getUnlockedCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{filteredData.map((item) => (
							<CraftingRecipeCard
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
