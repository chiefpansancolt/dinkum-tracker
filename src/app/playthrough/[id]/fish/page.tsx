"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Biome, FilterArray, FilterObject, Playthrough, Season, TimePeriod } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter, donatedFilter } from "@/data/constants";
import {
	fish,
	getFishByBiome,
	getFishByRarity,
	getFishBySearchValue,
	getFishBySeason,
	getFishByTime,
	getUniqueFishBiomes,
	getUniqueFishRarities,
	getUniqueFishSeasons,
	getUniqueFishTimePeriods,
} from "@/data/dinkum/pedia/fish";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import FishCard from "./FishCard";

export default function FishPage() {
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
			options: getUniqueFishBiomes(),
			label: "Biome",
		},
		rarity: {
			value: "All",
			options: getUniqueFishRarities(),
			label: "Rarity",
		},
		season: {
			value: "All",
			options: getUniqueFishSeasons(),
			label: "Season",
		},
		time: {
			value: "All",
			options: getUniqueFishTimePeriods(),
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
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setCollectedState(data.collections.fish || []);
				setDonatedState(data.donations.fish || []);
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

	const handleFilterChange = (name: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[name]: {
				...prev[name],
				value,
			},
		}));
	};

	const filteredData = useMemo(() => {
		let filtered = [...fish];

		if (filters.biome.value !== "All") {
			filtered = getFishByBiome(filtered, filters.biome.value as Biome);
		}

		if (filters.rarity.value !== "All") {
			filtered = getFishByRarity(filtered, filters.rarity.value);
		}

		if (filters.season.value !== "All") {
			filtered = getFishBySeason(filtered, filters.season.value as Season);
		}

		if (filters.time.value !== "All") {
			filtered = getFishByTime(filtered, filters.time.value as TimePeriod);
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
			filtered = getFishBySearchValue(filtered, searchQuery);
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

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			collections: {
				fish: collectedState,
			},
			donations: {
				fish: donatedState,
			},
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading fish collection..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Fish" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Fish"
					collectionName="Captured"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={collectedState.length}
					collectionTotal={fish.length}
					dirtyMessage="Your fish collection progress has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search fish by name..."
				/>

				<FilterDetails
					title="fish"
					filteredCount={filteredData.length}
					totalCount={fish.length}
					collectedLabel="Captured"
					collectedCount={collectedState.length}
					donatedLabel="Donated"
					donatedCount={donatedState.length}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<FishCard
								key={item.id}
								record={item}
								isCollected={collectedState.includes(item.id)}
								isDonated={donatedState.includes(item.id)}
								onToggleCollected={handleCollectedChange}
								onToggleDonated={handleDonatedChange}
							/>
						))}
					</div>
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
