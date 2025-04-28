"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fish } from "@/data/dinkum/pedia/fish";
import { TIME_PERIODS, SEASONS } from "@/data/constants";
import { Biome, Season, TimePeriod, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
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
		biome: { value: string; options: string[]; label: string };
		rarity: { value: string; options: string[]; label: string };
		season: { value: string; options: string[]; label: string };
		time: { value: string; options: string[]; label: string };
	}>({
		biome: {
			value: "All",
			options: [],
			label: "Biome",
		},
		rarity: {
			value: "All",
			options: [],
			label: "Rarity",
		},
		season: {
			value: "All",
			options: Object.values(SEASONS),
			label: "Season",
		},
		time: {
			value: "All",
			options: Object.values(TIME_PERIODS),
			label: "Time",
		},
	});

	useEffect(() => {
		const biomes = new Set<string>();
		fish.forEach((item) => {
			item.biome.forEach((b) => biomes.add(b));
		});
		const biomeOptions = ["All", ...Array.from(biomes)].sort();

		const rarities = new Set<string>();
		fish.forEach((item) => rarities.add(item.rarity));
		const rarityOptions = ["All", ...Array.from(rarities)].sort();

		setFilters((prev) => ({
			...prev,
			biome: {
				...prev.biome,
				options: biomeOptions,
			},
			rarity: {
				...prev.rarity,
				options: rarityOptions,
			},
		}));
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setCollectedState(data.collections.fish || []);
				setDonatedState(data.donations.fish || []);
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

	const handleFilterChange = (name: string, value: string) => {
		setFilters((prev) => ({
			...prev,
			[name]: {
				...prev[name],
				value,
			},
		}));
	};

	const filteredItems = useMemo(() => {
		return fish.filter((item) => {
			if (
				filters.biome.value !== "All" &&
				!item.biome.includes(filters.biome.value as Biome)
			) {
				return false;
			}

			if (filters.rarity.value !== "All" && item.rarity !== filters.rarity.value) {
				return false;
			}

			if (
				filters.season.value !== "All" &&
				!item.seasons.includes(filters.season.value as Season) &&
				!item.seasons.includes("All" as Season)
			) {
				return false;
			}

			if (
				filters.time.value !== "All" &&
				!item.timeFound.includes(filters.time.value as TimePeriod) &&
				!item.timeFound.includes("All")
			) {
				return false;
			}

			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [filters, searchQuery]);

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
					filteredCount={filteredItems.length}
					totalCount={fish.length}
					collectedLabel="Captured"
					collectedCount={collectedState.length}
					donatedLabel="Donated"
					donatedCount={donatedState.length}
				/>

				{filteredItems.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredItems.map((item) => (
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
				) : (
					<EmptyFilterCard />
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
