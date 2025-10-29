"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
	Biome,
	FilterArray,
	FilterKey,
	FilterObject,
	Playthrough,
	Season,
	TimePeriod,
} from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter, donatedFilter } from "@/data/constants";
import {
	bugs,
	getBugsByBiome,
	getBugsByRarity,
	getBugsBySearchValue,
	getBugsBySeason,
	getBugsByTime,
	getUniqueBugBiomes,
	getUniqueBugRarities,
	getUniqueBugSeasons,
	getUniqueBugTimePeriods,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import BugCard from "./BugCard";

export default function BugsPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [collectedState, setCollectedState] = useState<string[]>([]);
	const [donatedState, setDonatedState] = useState<string[]>([]);
	const [isDirty, setIsDirty] = useState(false);

	const [filters, setFilters] = useState<{
		biome: { value: string; options: FilterArray; label: string };
		rarity: { value: string; options: FilterArray; label: string };
		season: { value: string; options: FilterArray; label: string };
		time: { value: string; options: FilterArray; label: string };
		collection: { value: string; options: FilterObject[]; label: string };
		donation: { value: string; options: FilterObject[]; label: string };
	}>({
		biome: {
			value: "All",
			options: getUniqueBugBiomes(),
			label: "Biome",
		},
		rarity: {
			value: "All",
			options: getUniqueBugRarities(),
			label: "Rarity",
		},
		season: {
			value: "All",
			options: getUniqueBugSeasons(),
			label: "Season",
		},
		time: {
			value: "All",
			options: getUniqueBugTimePeriods(),
			label: "Time",
		},
		collection: {
			value: "All",
			options: collectedFilter,
			label: "Collected",
		},
		donation: {
			value: "All",
			options: donatedFilter,
			label: "Donated",
		},
	});

	useEffect(() => {
		if (playthroughId) {
			getPlaythroughById(playthroughId).then((data) => {
				setPlaythrough(data);

				if (data) {
					setCollectedState(data.collections.bugs || []);
					setDonatedState(data.donations.bugs || []);
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

	const handleFilterChange = (name: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[name as FilterKey]: {
				...prev[name as FilterKey],
				value,
			},
		}));
	};

	const filteredItems = useMemo(() => {
		let filtered = [...bugs];

		if (filters.biome.value !== "All") {
			filtered = getBugsByBiome(filtered, filters.biome.value as Biome);
		}

		if (filters.rarity.value !== "All") {
			filtered = getBugsByRarity(filtered, filters.rarity.value);
		}

		if (filters.season.value !== "All") {
			filtered = getBugsBySeason(filtered, filters.season.value as Season);
		}

		if (filters.time.value !== "All") {
			filtered = getBugsByTime(filtered, filters.time.value as TimePeriod);
		}

		if (filters.collection.value !== "All") {
			if (filters.collection.value === "collected") {
				filtered = filtered.filter((item) => collectedState.includes(item.id));
			} else if (filters.collection.value === "not_collected") {
				filtered = filtered.filter((item) => !collectedState.includes(item.id));
			}
		}

		if (filters.donation.value !== "All") {
			if (filters.donation.value === "donated") {
				filtered = filtered.filter((item) => donatedState.includes(item.id));
			} else if (filters.donation.value === "not_donated") {
				filtered = filtered.filter((item) => !donatedState.includes(item.id));
			}
		}

		if (searchQuery) {
			filtered = getBugsBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [filters, collectedState, donatedState, searchQuery]);

	const handleCollectedChange = (id: string, isCollected: boolean) => {
		setCollectedState((prev) => {
			if (isCollected) {
				if (!prev.includes(id)) {
					setIsDirty(true);
					return [...prev, id];
				}
			} else {
				if (prev.includes(id)) {
					setIsDirty(true);
					return prev.filter((itemId) => itemId !== id);
				}
			}
			return prev;
		});
	};

	const handleDonatedChange = (id: string, isDonated: boolean) => {
		if (isDonated && !collectedState.includes(id)) {
			setCollectedState((prev) => {
				setIsDirty(true);
				return [...prev, id];
			});
		}

		setDonatedState((prev) => {
			if (isDonated) {
				if (!prev.includes(id)) {
					setIsDirty(true);
					return [...prev, id];
				}
			} else {
				if (prev.includes(id)) {
					setIsDirty(true);
					return prev.filter((itemId) => itemId !== id);
				}
			}
			return prev;
		});
	};

	const handleSave = async () => {
		if (!isDirty) return false;

		const success = await updatePlaythroughData(playthroughId, {
			collections: {
				bugs: collectedState,
			},
			donations: {
				bugs: donatedState,
			},
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading bugs collection..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Bugs" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Bugs"
					collectionName="Captured"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={collectedState.length}
					collectionTotal={bugs.length}
					dirtyMessage="Your bugs collection progress has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search bugs by name..."
				/>

				<FilterDetails
					title="bugs"
					filteredCount={filteredItems.length}
					totalCount={bugs.length}
					collectedLabel="Captured"
					collectedCount={collectedState.length}
					donatedLabel="Donated"
					donatedCount={donatedState.length}
				/>

				{filteredItems.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredItems.map((item) => (
							<BugCard
								key={item.id}
								record={item}
								isCollected={collectedState.includes(item.id)}
								isDonated={donatedState.includes(item.id)}
								onToggleCollected={handleCollectedChange}
								onToggleDonated={handleDonatedChange}
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
