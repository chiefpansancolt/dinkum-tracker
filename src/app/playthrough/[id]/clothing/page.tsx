"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { clothing, getClothingBySlot, getClothingByType, getClothingBySet } from "@/data/dinkum";
import { ClothingSlots } from "@/data/constants";
import { ClothingSlot, Playthrough } from "@/types";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import ClothingCard from "./ClothingCard";

export default function ClothingPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [slotFilter, setSlotFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [setFilter, setSetFilter] = useState<string>("All");
	const [clothingCollection, setClothingCollection] = useState<Record<string, boolean>>({});
	const [availableTypes, setAvailableTypes] = useState<string[]>([]);
	const [isDirty, setIsDirty] = useState(false);

	const uniqueSets = useMemo(() => {
		const sets = new Set<string>();
		clothing.forEach((item) => {
			if (item.set) {
				sets.add(item.set);
			}
		});
		return ["All", ...Array.from(sets).sort()];
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setClothingCollection(data.clothing || {});
			}

			setIsLoading(false);

			const hashParams = getHashQueryParams();
			if (hashParams.q) {
				setSearchQuery(hashParams.q);
			}
		}
	}, [playthroughId]);

	useEffect(() => {
		if (slotFilter === "All") {
			setAvailableTypes(["All"]);
			setTypeFilter("All");
		} else {
			const types = ClothingSlots[slotFilter as ClothingSlot] || [];
			setAvailableTypes(["All", ...types]);
			setTypeFilter("All");
		}
	}, [slotFilter]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setClothingCollection((prev) => {
			if (prev[id] !== isCollected) {
				setIsDirty(true);
			}
			return {
				...prev,
				[id]: isCollected,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			clothing: clothingCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filters = {
		slot: {
			value: slotFilter,
			options: ["All", ...Object.keys(ClothingSlots)],
			label: "Slot",
		},
		type: {
			value: typeFilter,
			options: availableTypes,
			label: "Type",
		},
		set: {
			value: setFilter,
			options: uniqueSets,
			label: "Set",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "slot") {
			setSlotFilter(value);
		} else if (name === "type") {
			setTypeFilter(value);
		} else if (name === "set") {
			setSetFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...clothing];

		if (slotFilter !== "All") {
			filtered = getClothingBySlot(slotFilter as ClothingSlot);
		}

		if (typeFilter !== "All") {
			filtered = getClothingByType(typeFilter);
		}

		if (setFilter !== "All") {
			filtered = getClothingBySet(setFilter);
		}

		if (searchQuery) {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		return filtered;
	}, [slotFilter, typeFilter, setFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(clothingCollection).filter((key) => clothingCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading clothing..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Clothing" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Clothing"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={clothing.length}
					dirtyMessage="Your clothing collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search clothing by name..."
				/>

				<FilterDetails
					title="clothing items"
					filteredCount={filteredData.length}
					totalCount={clothing.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredData.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredData.map((item) => (
							<ClothingCard
								key={item.id}
								record={item}
								isCollected={clothingCollection[item.id] || false}
								onToggleCollected={handleToggleCollected}
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
