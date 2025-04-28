"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { buildings, getCollectableBuildingsCount } from "@/data/dinkum";
import { updatePlaythroughData, getPlaythroughById } from "@/lib/localStorage";
import TabHeader from "@/playthrough/ui/TabHeader";
import BuildingCard from "./BuildingCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import { Playthrough } from "@/types";

export default function BuildingsPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [deedTypeFilter, setDeedTypeFilter] = useState<string>("All");
	const [npcFilter, setNpcFilter] = useState<string>("All");
	const [buildingCollection, setBuildingCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueNpcs = useMemo(() => {
		const npcs = new Set<string>();
		buildings.forEach((building) => {
			if (building.npc && building.npc.trim() !== "") {
				npcs.add(building.npc);
			}
		});
		return ["All", ...Array.from(npcs).sort()];
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setBuildingCollection(data.buildings || {});
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

	const handleToggleInstalled = (buildingId: string, isInstalled: boolean) => {
		setBuildingCollection((prev) => {
			if (prev[buildingId] !== isInstalled) {
				setIsDirty(true);
			}
			return {
				...prev,
				[buildingId]: isInstalled,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			buildings: buildingCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filters = {
		deedType: {
			value: deedTypeFilter,
			options: ["All", "Collectable", "Movable", "Reference"],
			label: "Deed Type",
		},
		npc: {
			value: npcFilter,
			options: uniqueNpcs,
			label: "NPC",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "deedType") {
			setDeedTypeFilter(value);
		} else if (name === "npc") {
			setNpcFilter(value);
		}
	};

	const filteredBuildings = useMemo(() => {
		return buildings.filter((building) => {
			if (deedTypeFilter !== "All" && building.deedType !== deedTypeFilter) {
				return false;
			}

			if (npcFilter !== "All" && building.npc !== npcFilter) {
				return false;
			}

			if (searchQuery && !building.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [deedTypeFilter, npcFilter, searchQuery]);

	const getInstalledCount = () => {
		return Object.keys(buildingCollection).filter((key) => buildingCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading buildings..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Buildings" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Buildings"
					collectionName="Installed"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getInstalledCount()}
					collectionTotal={getCollectableBuildingsCount()}
					dirtyMessage="Your buildings progress has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search buildings by name..."
				/>

				<FilterDetails
					title="buildings"
					filteredCount={filteredBuildings.length}
					totalCount={getCollectableBuildingsCount()}
					collectedLabel="Installed"
					collectedCount={getInstalledCount()}
				/>

				{filteredBuildings.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredBuildings.map((building) => (
							<BuildingCard
								key={building.id}
								record={building}
								isCollected={buildingCollection[building.id] || false}
								onToggleCollected={handleToggleInstalled}
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
