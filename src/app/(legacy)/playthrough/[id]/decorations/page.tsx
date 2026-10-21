"use client";

import { DECORATION_CATEGORIES, type DecorationCategory, decorations } from "dinkum-data";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FilterArray, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter } from "@/data/constants";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import DecorationCard from "./DecorationCard";

const allDecorations = decorations().get();

const uniqueDecorationCategories: FilterArray = ["All", ...DECORATION_CATEGORIES];

const uniqueDecorationSources: FilterArray = (() => {
	const sources = new Set<string>();
	allDecorations.forEach((item) => item.source?.forEach((s) => sources.add(s)));
	return ["All", ...Array.from(sources).sort()];
})();

export default function DecorationsPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(() => getQueryParams().q || "");
	const [categoryFilter, setCategoryFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		category: {
			value: categoryFilter,
			options: uniqueDecorationCategories,
			label: "Category",
		},
		source: {
			value: sourceFilter,
			options: uniqueDecorationSources,
			label: "Source",
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
					setLocalState(data.decorations || {});
				}

				setIsLoading(false);
			});
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
			decorations: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "category") {
			setCategoryFilter(value);
		} else if (name === "source") {
			setSourceFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let query = decorations(allDecorations);

		if (categoryFilter !== "All") {
			query = query.byCategory(categoryFilter as DecorationCategory);
		}

		if (sourceFilter !== "All") {
			query = query.bySource(sourceFilter);
		}

		let filtered = query.get();

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = decorations(filtered).search(searchQuery);
		}

		return filtered;
	}, [categoryFilter, sourceFilter, collectionFilter, localState, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading decorations..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Decorations" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Decorations"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={allDecorations.length}
					dirtyMessage="Your decorations collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search decorations by name..."
				/>

				<FilterDetails
					title="decorations"
					filteredCount={filteredData.length}
					totalCount={allDecorations.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<DecorationCard
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
