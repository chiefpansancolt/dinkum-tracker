"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { clothing, getClothingBySlot, getClothingByType, getClothingBySet } from "@/data/dinkum";
import { ClothingSlots } from "@/data/constants";
import { ClothingSlot, TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";

const ClothingTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [slotFilter, setSlotFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [setFilter, setSetFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>(collected);
	const [availableTypes, setAvailableTypes] = useState<string[]>([]);
	const [availableSets, setAvailableSets] = useState<string[]>([]);

	const isDirty = useRef(false);

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
		setLocalState(collected);
		isDirty.current = false;

		const hashParams = getHashQueryParams();
		if (hashParams.q) {
			setSearchQuery(hashParams.q);
		}
	}, [collected]);

	useEffect(() => {
		setAvailableSets(uniqueSets);
	}, [uniqueSets]);

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
		setLocalState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				clothing: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

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
		return Object.keys(localState).filter((key) => localState[key]).length;
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
			options: availableSets,
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

	return (
		<div className="space-y-6">
			<TabHeader
				title="Clothing"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
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

			{filteredData.length > 0 && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredData.map((item) => {
							const isCollected = localState[item.id] === true;

							return (
								<ItemCard
									key={item.id}
									renderHeader={() => (
										<ItemHeader
											title={item.name}
											renderRightComp={() => (
												<Badge color="purple">{item.type}</Badge>
											)}
										/>
									)}
									renderImage={() => (
										<ItemImage
											src={item.img}
											name={item.name}
											isCollected={isCollected}
										/>
									)}
									renderDetails={() => (
										<>
											<ItemDetail label="Slot" details={item.slot.join(", ")} />

											{item.set && <ItemDetail label="Set" details={item.set} />}

											{item.displayPrice !== null && (
												<DinkValue label="Price" price={item.displayPrice} />
											)}

											<DinkValue
												label="Sell Price"
												price={item.baseSellPrice}
												showCommerceLicenses
											/>

											{item.cloversCatalogue && (
												<ItemDetail
													label="Available at"
													details="Clover's Shop"
												/>
											)}
										</>
									)}
									renderFooter={() => (
										<ItemFooter
											id={item.id}
											leftLabel="Collected"
											isLeftChecked={isCollected}
											handleLeftToggle={handleToggleCollected}
										/>
									)}
								/>
							);
						})
					}
				</div>
			)}

			{filteredData.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

ClothingTab.displayName = "ClothingTab";

export default ClothingTab;
