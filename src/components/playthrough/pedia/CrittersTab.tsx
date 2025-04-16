"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Select, Card, Label } from "flowbite-react";
import CollectionItem from "@/playthrough/pedia/CollectionItem";
import { critters } from "@/data/dinkum/pedia/critters";

const TIME_PERIODS = ["Morning", "Day", "Evening", "Night", "All"];
const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "All"];

export interface CrittersTabHandle {
	saveCollectionState: () => { collected: string[]; donated: string[] };
}

interface CrittersTabProps {
	collected: string[];
	donated: string[];
	onCollectedChange: (id: string, collected: boolean) => void;
	onDonatedChange: (id: string, donated: boolean) => void;
}

const CrittersTab = forwardRef<CrittersTabHandle, CrittersTabProps>(
	({ collected, donated, onCollectedChange, onDonatedChange }, ref) => {
		const [biomeFilter, setBiomeFilter] = useState<string>("All");
		const [rarityFilter, setRarityFilter] = useState<string>("All");
		const [seasonFilter, setSeasonFilter] = useState<string>("All");
		const [timeFilter, setTimeFilter] = useState<string>("All");

		const [collectedState, setCollectedState] = useState<string[]>(collected);
		const [donatedState, setDonatedState] = useState<string[]>(donated);

		useEffect(() => {
			setCollectedState(collected);
			setDonatedState(donated);
		}, [collected, donated]);

		const uniqueBiomes = React.useMemo(() => {
			const biomes = new Set<string>();
			critters.forEach((item) => {
				item.biome.forEach((b) => biomes.add(b));
			});
			return ["All", ...Array.from(biomes)].sort();
		}, []);

		const uniqueRarities = React.useMemo(() => {
			const rarities = new Set<string>();
			critters.forEach((item) => rarities.add(item.rarity));
			return ["All", ...Array.from(rarities)].sort();
		}, []);

		const filteredItems = React.useMemo(() => {
			return critters.filter((item) => {
				if (biomeFilter !== "All" && !item.biome.includes(biomeFilter)) {
					return false;
				}

				if (rarityFilter !== "All" && item.rarity !== rarityFilter) {
					return false;
				}

				if (
					seasonFilter !== "All" &&
					!item.seasons.includes(seasonFilter) &&
					!item.seasons.includes("All")
				) {
					return false;
				}

				if (
					timeFilter !== "All" &&
					!item.timeFound.includes(timeFilter) &&
					!item.timeFound.includes("All")
				) {
					return false;
				}

				return true;
			});
		}, [biomeFilter, rarityFilter, seasonFilter, timeFilter]);

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
			saveCollectionState: () => ({
				collected: collectedState,
				donated: donatedState,
			}),
		}));

		return (
			<div className="space-y-6">
				<Card>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="biome-filter">Biome</Label>
							</div>
							<Select
								id="biome-filter"
								value={biomeFilter}
								onChange={(e) => setBiomeFilter(e.target.value)}
							>
								{uniqueBiomes.map((biome) => (
									<option key={biome} value={biome}>
										{biome}
									</option>
								))}
							</Select>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="rarity-filter">Rarity</Label>
							</div>
							<Select
								id="rarity-filter"
								value={rarityFilter}
								onChange={(e) => setRarityFilter(e.target.value)}
							>
								<option value="All">All</option>
								{uniqueRarities.map((rarity) => (
									<option key={rarity} value={rarity}>
										{rarity}
									</option>
								))}
							</Select>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="season-filter">Season</Label>
							</div>
							<Select
								id="season-filter"
								value={seasonFilter}
								onChange={(e) => setSeasonFilter(e.target.value)}
							>
								{Object.values(SEASONS).map((season) => (
									<option key={season} value={season}>
										{season}
									</option>
								))}
							</Select>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="time-filter">Time</Label>
							</div>
							<Select
								id="time-filter"
								value={timeFilter}
								onChange={(e) => setTimeFilter(e.target.value)}
							>
								{Object.values(TIME_PERIODS).map((time) => (
									<option key={time} value={time}>
										{time}
									</option>
								))}
							</Select>
						</div>
					</div>
				</Card>

				<div className="mb-4">
					<p className="text-primary font-medium">
						Showing {filteredItems.length} of {critters.length} critters • Collected:{" "}
						{collectedState.length} • Donated: {donatedState.length}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

				{filteredItems.length === 0 && (
					<Card className="py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No items match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				)}
			</div>
		);
	}
);

CrittersTab.displayName = "CrittersTab";

export default CrittersTab;
