"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { fish } from "@/data/dinkum/pedia/fish";
import { TIME_PERIODS, SEASONS } from "@/data/constants";
import { Biome, Season, TimePeriod, PediaTabHandle, PediaTabProps } from "@/types";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import CollectionItem from "@/playthrough/pedia/CollectionItem";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";

const FishTab = forwardRef<PediaTabHandle, PediaTabProps>(
	({ collected, donated, onCollectedChange, onDonatedChange }, ref) => {
		const [collectedState, setCollectedState] = useState<string[]>(collected);
		const [donatedState, setDonatedState] = useState<string[]>(donated);
		const [searchQuery, setSearchQuery] = useState("");

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
			setCollectedState(collected);
			setDonatedState(donated);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}, [collected, donated]);

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
						return [...prev, id];
					}
				} else {
					return prev.filter((itemId) => itemId !== id);
				}
				return prev;
			});

			if (isCollected !== collectedState.includes(id)) {
				onCollectedChange(id, isCollected);
			}
		};

		const handleDonatedChange = (id: string, isDonated: boolean) => {
			if (isDonated && !collectedState.includes(id)) {
				setCollectedState((prev) => [...prev, id]);
				onCollectedChange(id, true);
			}

			setDonatedState((prev) => {
				if (isDonated) {
					if (!prev.includes(id)) {
						return [...prev, id];
					}
				} else {
					return prev.filter((itemId) => itemId !== id);
				}
				return prev;
			});

			onDonatedChange(id, isDonated);
		};

		useImperativeHandle(ref, () => ({
			save: () => ({
				collected: collectedState,
				donated: donatedState,
			}),
		}));

		return (
			<div className="space-y-6">
				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={setSearchQuery}
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

				{filteredItems.length > 0 && (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredItems.map((item) => (
							<CollectionItem
								key={item.id}
								item={item}
								isCollected={collectedState.includes(item.id)}
								isDonated={donatedState.includes(item.id)}
								onCollectedChange={handleCollectedChange}
								onDonatedChange={handleDonatedChange}
							/>
						))}
					</div>
				)}

				{filteredItems.length === 0 && <EmptyFilterCard />}
			</div>
		);
	}
);

FishTab.displayName = "FishTab";

export default FishTab;
