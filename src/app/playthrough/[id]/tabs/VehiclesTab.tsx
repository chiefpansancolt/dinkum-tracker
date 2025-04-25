"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { vehicles } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, CollectTabProps } from "@/types";
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
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemFranklyn from "@/playthrough/ui/itemcard/ItemFranklyn";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";

const VehiclesTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		vehicles.forEach((vehicle) => {
			if (vehicle.source && vehicle.source.length > 0) {
				vehicle.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	const uniqueRequirementTypes = useMemo(() => {
		const types = new Set<string>();
		vehicles.forEach((vehicle) => {
			if (vehicle.requirementType) {
				types.add(vehicle.requirementType);
			}
		});
		return ["All", ...Array.from(types).sort()];
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
				vehicles: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const filteredVehicles = useMemo(() => {
		return vehicles.filter((vehicle) => {
			if (sourceFilter !== "All" && !vehicle.source.includes(sourceFilter)) {
				return false;
			}

			if (requirementFilter !== "All" && vehicle.requirementType !== requirementFilter) {
				return false;
			}

			if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, requirementFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const filters = {
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		requirement: {
			value: requirementFilter,
			options: uniqueRequirementTypes,
			label: "Requirement Type",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "requirement") {
			setRequirementFilter(value);
		}
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Vehicles"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCollectedCount()}
				collectionTotal={vehicles.length}
				dirtyMessage="Your vehicles collection has not been saved yet."
			/>

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search by name..."
			/>

			<FilterDetails
				title="vehicles"
				filteredCount={filteredVehicles.length}
				totalCount={vehicles.length}
				collectedLabel="Collected"
				collectedCount={getCollectedCount()}
			/>

			{filteredVehicles.length > 0 && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredVehicles.map((vehicle) => {
						const isCollected = localState[vehicle.id] === true;
						const isCraftable = vehicle.source.includes("Crafting Table");

						return (
							<ItemCard
								key={vehicle.id}
								renderHeader={() => (
									<ItemHeader
										title={vehicle.name}
										renderRightComp={() =>
											isCraftable && (
												<Button
													as={Link}
													href={`#craftingRecipes?q=${vehicle.name}`}
													color="secondary"
													size="xs"
												>
													Crafting Recipe
												</Button>
											)
										}
									/>
								)}
								renderImage={() => (
									<ItemImage
										src={vehicle.img}
										name={vehicle.name}
										isCollected={isCollected}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										{vehicle.requirementType &&
											vehicle.requirementLevel !== null && (
												<ItemDetail
													label={`${vehicle.requirementType} Level`}
													details={vehicle.requirementLevel.toString()}
												/>
											)}

										{vehicle.source && vehicle.source.length > 0 && (
											<ItemDetail
												label="Source"
												details={vehicle.source.join(", ")}
											/>
										)}

										{(vehicle.windmillCompatable ||
											vehicle.solarPanelCompatable) && (
											<ItemDetail
												label="Compatible with"
												details={[
													vehicle.windmillCompatable ? "Windmill" : "",
													vehicle.solarPanelCompatable
														? "Solar Panel"
														: "",
												]
													.filter(Boolean)
													.join(", ")}
											/>
										)}

										{(vehicle.shinyDiscCount || vehicle.berkoniumOreCount) && (
											<ItemFranklyn
												shinyDiscCount={vehicle.shinyDiscCount}
												berkoniumOreCount={vehicle.berkoniumOreCount}
											/>
										)}

										{vehicle.inputs && vehicle.inputs.length > 0 && (
											<ItemResources
												id={vehicle.id}
												label="Ingredients"
												items={vehicle.inputs}
											/>
										)}

										{vehicle.buyPrice && (
											<DinkValue label="Buy Price" price={vehicle.buyPrice} />
										)}

										<DinkValue
											label="Sell Price"
											price={vehicle.baseSellPrice}
											showCommerceLicenses
										/>
									</div>
								)}
								renderFooter={() => (
									<ItemFooter
										id={vehicle.id}
										leftLabel="Collected"
										isLeftChecked={isCollected}
										handleLeftToggle={handleToggleCollected}
									/>
								)}
							/>
						);
					})}
				</div>
			)}

			{filteredVehicles.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

VehiclesTab.displayName = "VehiclesTab";

export default VehiclesTab;
