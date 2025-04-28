"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { equipment } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import EquipmentCard from "./EquipmentCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";

export default function EquipmentPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [equipmentCollection, setEquipmentCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		equipment.forEach((item) => {
			if (item.source && item.source.length > 0) {
				item.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	const uniqueRequirementTypes = useMemo(() => {
		const types = new Set<string>();
		equipment.forEach((item) => {
			if (item.requirementType) {
				types.add(item.requirementType);
			}
		});
		return ["All", ...Array.from(types).sort()];
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setEquipmentCollection(data.equipment || {});
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
		setEquipmentCollection((prev) => {
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
			equipment: equipmentCollection,
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

	const filteredEquipment = useMemo(() => {
		return equipment.filter((item) => {
			if (sourceFilter !== "All" && !item.source.includes(sourceFilter)) {
				return false;
			}

			if (requirementFilter !== "All" && item.requirementType !== requirementFilter) {
				return false;
			}

			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, requirementFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(equipmentCollection).filter((key) => equipmentCollection[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading equipment..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Equipment" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Equipment"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={equipment.length}
					dirtyMessage="Your equipment collection has not been saved yet."
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
					title="equipment items"
					filteredCount={filteredEquipment.length}
					totalCount={equipment.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredEquipment.length === 0 ? (
						<EmptyFilterCard />
					) : (
						filteredEquipment.map((item) => (
							<EquipmentCard
								key={item.id}
								record={item}
								isCollected={equipmentCollection[item.id] || false}
								onToggleCollected={handleToggleCollected}
							/>
						))
					)}
				</div>

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
