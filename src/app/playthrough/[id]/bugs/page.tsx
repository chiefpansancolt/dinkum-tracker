"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { bugs } from "@/data/dinkum/pedia/bugs";
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
		bugs.forEach((item) => {
			item.biome.forEach((b) => biomes.add(b));
		});
		const biomeOptions = ["All", ...Array.from(biomes)].sort();

		const rarities = new Set<string>();
		bugs.forEach((item) => rarities.add(item.rarity));
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
				setCollectedState(data.collections.bugs || []);
				setDonatedState(data.donations.bugs || []);
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
		return bugs.filter((item) => {
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
								bug={item}
								isCollected={collectedState.includes(item.id)}
								isDonated={donatedState.includes(item.id)}
								onCollectedChange={handleCollectedChange}
								onDonatedChange={handleDonatedChange}
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
