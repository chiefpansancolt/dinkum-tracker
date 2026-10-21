"use client";

import {
	type Biome,
	critters,
	type RarityLevel,
	type Season,
	SEASONS,
	TIME_PERIODS,
	type TimePeriod,
} from "dinkum-data";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FilterArray, FilterKey, FilterObject, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter, donatedFilter } from "@/data/constants";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import CritterCard from "./CritterCard";

const allCritters = critters().get();

const uniqueCritterBiomes: FilterArray = (() => {
	const biomes = new Set<string>();
	allCritters.forEach((item) => item.biome.forEach((b) => biomes.add(b)));
	return ["All", ...Array.from(biomes)].sort();
})();

const uniqueCritterRarities: FilterArray = (() => {
	const rarities = new Set<string>();
	allCritters.forEach((item) => rarities.add(item.rarity));
	return ["All", ...Array.from(rarities)].sort();
})();

export default function CrittersPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(() => getQueryParams().q || "");
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
			options: uniqueCritterBiomes,
			label: "Biome",
		},
		rarity: {
			value: "All",
			options: uniqueCritterRarities,
			label: "Rarity",
		},
		season: {
			value: "All",
			options: [...SEASONS],
			label: "Season",
		},
		time: {
			value: "All",
			options: [...TIME_PERIODS],
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
					setCollectedState(data.collections.critters || []);
					setDonatedState(data.donations.critters || []);
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
		let query = critters(allCritters);

		if (filters.biome.value !== "All") {
			query = query.byBiome(filters.biome.value as Biome);
		}

		if (filters.rarity.value !== "All") {
			query = query.byRarity(filters.rarity.value as RarityLevel);
		}

		if (filters.season.value !== "All") {
			query = query.bySeason(filters.season.value as Season);
		}

		if (filters.time.value !== "All") {
			query = query.byTime(filters.time.value as TimePeriod);
		}

		let filtered = query.get();

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
			filtered = critters(filtered).search(searchQuery);
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
				critters: collectedState,
			},
			donations: {
				critters: donatedState,
			},
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading critters collection..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Critters" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Critters"
					collectionName="Captured"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={collectedState.length}
					collectionTotal={allCritters.length}
					dirtyMessage="Your critters collection progress has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search critters by name..."
				/>

				<FilterDetails
					title="critters"
					filteredCount={filteredItems.length}
					totalCount={allCritters.length}
					collectedLabel="Captured"
					collectedCount={collectedState.length}
					donatedLabel="Donated"
					donatedCount={donatedState.length}
				/>

				{filteredItems.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredItems.map((item) => (
							<CritterCard
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
