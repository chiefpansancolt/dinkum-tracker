"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { signWritingRecipes } from "@/data/dinkum";
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
import SignWritingRecipeCard from "./SignWritingRecipeCard";

export default function SignWritingRecipesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [signWritingRecipesCollection, setSignWritingRecipesCollection] = useState<
		Record<string, boolean>
	>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		signWritingRecipes.forEach((recipe) => {
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
				setSignWritingRecipesCollection(data.signWritingRecipes || {});
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
		setSignWritingRecipesCollection((prev) => {
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
			signWritingRecipes: signWritingRecipesCollection,
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
		return signWritingRecipes.filter((recipe) => {
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
		return Object.keys(signWritingRecipesCollection).filter(
			(key) => signWritingRecipesCollection[key]
		).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading sign writing recipes..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp
				id={playthroughId}
				name={playthrough.name}
				routeName="Sign Writing Recipes"
			/>
			<div className="space-y-6 p-6">
				<TabHeader
					title="Sign Writing Recipes"
					collectionName="Unlocked"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getUnlockedCount()}
					collectionTotal={signWritingRecipes.length}
					dirtyMessage="Your sign writing recipes collection has not been saved yet."
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
					totalCount={signWritingRecipes.length}
					collectedLabel="Unlocked"
					collectedCount={getUnlockedCount()}
				/>

				{filteredData.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{filteredData.map((recipe) => (
							<SignWritingRecipeCard
								key={recipe.id}
								recipe={recipe}
								isUnlocked={signWritingRecipesCollection[recipe.id] || false}
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
