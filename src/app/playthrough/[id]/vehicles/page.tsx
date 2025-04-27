"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { vehicles } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import VehicleCard from "./VehicleCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";

export default function VehiclesPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [vehicleCollection, setVehicleCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

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

	// Get unique requirement types for filter
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
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setVehicleCollection(data.vehicles || {});
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

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setVehicleCollection((prev) => {
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
			vehicles: vehicleCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
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
		return Object.keys(vehicleCollection).filter((key) => vehicleCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading vehicles..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Vehicles" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Vehicles"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
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

				{filteredVehicles.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredVehicles.map((vehicle) => (
							<VehicleCard
								key={vehicle.id}
								vehicle={vehicle}
								isCollected={vehicleCollection[vehicle.id] || false}
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
