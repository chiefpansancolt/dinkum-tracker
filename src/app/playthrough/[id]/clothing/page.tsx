"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ClothingSlot, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/storage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { ClothingSlots, collectedFilter } from "@/data/constants";
import {
	clothing,
	getClothingBySearchValue,
	getClothingBySet,
	getClothingBySlot,
	getClothingByType,
	getUniqueClothingSets,
	getUniqueClothingSlots,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
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
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [availableTypes, setAvailableTypes] = useState<string[]>([]);
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		slot: {
			value: slotFilter,
			options: getUniqueClothingSlots(),
			label: "Slot",
		},
		type: {
			value: typeFilter,
			options: availableTypes,
			label: "Type",
		},
		set: {
			value: setFilter,
			options: getUniqueClothingSets(),
			label: "Set",
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
					setLocalState(data.clothing || {});
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
			clothing: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "slot") {
			setSlotFilter(value);
		} else if (name === "type") {
			setTypeFilter(value);
		} else if (name === "set") {
			setSetFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...clothing];

		if (slotFilter !== "All") {
			filtered = getClothingBySlot(filtered, slotFilter as ClothingSlot);
		}

		if (typeFilter !== "All") {
			filtered = getClothingByType(filtered, typeFilter);
		}

		if (setFilter !== "All") {
			filtered = getClothingBySet(filtered, setFilter);
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getClothingBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [slotFilter, typeFilter, setFilter, collectionFilter, localState, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredData.map((item) => (
							<ClothingCard
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
