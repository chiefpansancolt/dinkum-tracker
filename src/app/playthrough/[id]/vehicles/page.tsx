"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import {
	getUniqueVehicleReqType,
	getUniqueVehicleSources,
	getVehicleByRequirmentType,
	getVehicleBySearchValue,
	getVehicleBySource,
	vehicles,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import VehicleCard from "./VehicleCard";

export default function VehiclesPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		source: {
			value: sourceFilter,
			options: getUniqueVehicleSources(),
			label: "Source",
		},
		requirement: {
			value: requirementFilter,
			options: getUniqueVehicleReqType(),
			label: "Requirement Type",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLocalState(data.vehicles || {});
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

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			vehicles: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "requirement") {
			setRequirementFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...vehicles];

		if (sourceFilter !== "All") {
			filtered = getVehicleBySource(filtered, sourceFilter);
		}

		if (requirementFilter !== "All") {
			filtered = getVehicleByRequirmentType(filtered, requirementFilter);
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getVehicleBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [sourceFilter, requirementFilter, collectionFilter, localState, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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
					searchPlaceholder="Search vehicle by name..."
				/>

				<FilterDetails
					title="vehicles"
					filteredCount={filteredData.length}
					totalCount={vehicles.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<VehicleCard
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
