"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter } from "@/data/constants";
import {
	furniture,
	getFurnitureBySearchValue,
	getFurnitureBySet,
	getFurnitureBySource,
	getUniqueFurnitureSets,
	getUniqueFurnitureSources,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import FurnitureCard from "./FurnitureCard";

export default function FurniturePage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [setFilter, setSetFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [melvinsCatalogueFilter, setMelvinsCatalogueFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		set: {
			value: setFilter,
			options: getUniqueFurnitureSets(),
			label: "Set",
		},
		source: {
			value: sourceFilter,
			options: getUniqueFurnitureSources(),
			label: "Source",
		},
		catalogue: {
			value: melvinsCatalogueFilter,
			options: ["All", "Melvin's Catalogue", "Not in Catalogue"],
			label: "Catalogue",
		},
		collection: {
			value: collectionFilter,
			options: collectedFilter,
			label: "Collected",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			getPlaythroughById(playthroughId).then((data) => {
				setPlaythrough(data);

				if (data) {
					setLocalState(data.furniture || {});
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

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalState((prev) => {
			if (prev[id] !== isCollected) {
				setIsDirty(true);
			}
			return {
				...prev,
				[id]: isCollected,
			};
		});
	};

	const handleSave = async () => {
		if (!isDirty) return false;

		const success = await updatePlaythroughData(playthroughId, {
			furniture: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "set") {
			setSetFilter(value);
		} else if (name === "source") {
			setSourceFilter(value);
		} else if (name === "catalogue") {
			setMelvinsCatalogueFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...furniture];

		if (setFilter !== "All") {
			filtered = getFurnitureBySet(filtered, setFilter);
		}

		if (sourceFilter !== "All") {
			filtered = getFurnitureBySource(filtered, sourceFilter);
		}

		if (melvinsCatalogueFilter !== "All") {
			filtered = filtered.filter((item) => {
				if (melvinsCatalogueFilter === "Melvin's Catalogue") {
					return item.melvinsCatalogue === true;
				} else {
					return item.melvinsCatalogue === false;
				}
			});
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getFurnitureBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [
		setFilter,
		sourceFilter,
		melvinsCatalogueFilter,
		collectionFilter,
		localState,
		searchQuery,
	]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading furniture..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Furniture" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Furniture"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={furniture.length}
					dirtyMessage="Your furniture collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search furniture by name..."
				/>

				<FilterDetails
					title="furniture items"
					filteredCount={filteredData.length}
					totalCount={furniture.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<FurnitureCard
								key={item.id}
								record={item}
								isCollected={localState[item.id] || false}
								onToggleCollected={handleToggleCollected}
							/>
						))}
					</div>
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
