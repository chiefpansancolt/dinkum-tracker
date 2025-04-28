"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { craftingRecipes } from "@/data/dinkum";
import { Playthrough } from "@/types";
import { updatePlaythroughData, getPlaythroughById } from "@/lib/localStorage";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import CraftingRecipeCard from "./CraftingRecipeCard";

export default function CraftingRecipesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [craftingRecipesCollection, setCraftingRecipesCollection] = useState<
		Record<string, boolean>
	>({});
	const [isDirty, setIsDirty] = useState(false);

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
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setCraftingRecipesCollection(data.craftingRecipes || {});
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
		setCraftingRecipesCollection((prev) => {
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
			craftingRecipes: craftingRecipesCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

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
		return Object.keys(craftingRecipesCollection).filter(
			(key) => craftingRecipesCollection[key]
		).length;
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
					searchPlaceholder="Search by name..."
				/>

				<FilterDetails
					title="recipes"
					filteredCount={filteredData.length}
					totalCount={craftingRecipes.length}
					collectedLabel="Unlocked"
					collectedCount={getUnlockedCount()}
				/>

				{filteredData.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{filteredData.map((recipe) => (
							<CraftingRecipeCard
								key={recipe.id}
								record={recipe}
								isCollected={craftingRecipesCollection[recipe.id] || false}
								onToggleCollected={handleToggleUnlocked}
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
