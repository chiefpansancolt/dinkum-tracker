"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DeedType, Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter } from "@/data/constants";
import {
	buildings,
	getBuidlingsByDeedType,
	getBuidlingsByNPC,
	getBuildingsBySearchValue,
	getCollectableBuildingsCount,
	getUniqueDeedTypes,
	getUniqueNPCs,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import BuildingCard from "./BuildingCard";

export default function BuildingsPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [deedTypeFilter, setDeedTypeFilter] = useState<string>("All");
	const [npcFilter, setNpcFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		deedType: {
			value: deedTypeFilter,
			options: getUniqueDeedTypes(),
			label: "Deed Type",
		},
		npc: {
			value: npcFilter,
			options: getUniqueNPCs(),
			label: "NPC",
		},
		collection: {
			value: collectionFilter,
			options: collectedFilter,
			label: "Collected",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setLocalState(data.buildings || {});
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

	const handleToggleInstalled = (buildingId: string, isInstalled: boolean) => {
		setLocalState((prev) => {
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
			buildings: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "deedType") {
			setDeedTypeFilter(value);
		} else if (name === "npc") {
			setNpcFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...buildings];

		if (deedTypeFilter !== "All") {
			filtered = getBuidlingsByDeedType(filtered, deedTypeFilter as DeedType);
		}

		if (npcFilter !== "All") {
			filtered = getBuidlingsByNPC(filtered, npcFilter);
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getBuildingsBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [deedTypeFilter, npcFilter, collectionFilter, localState, searchQuery]);

	const getInstalledCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
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
					filteredCount={filteredData.length}
					totalCount={buildings.length}
					collectedLabel="Installed"
					collectedCount={getInstalledCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<BuildingCard
								key={item.id}
								record={item}
								isCollected={localState[item.id] || false}
								onToggleCollected={handleToggleInstalled}
							/>
						))}
					</div>
				)}

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
