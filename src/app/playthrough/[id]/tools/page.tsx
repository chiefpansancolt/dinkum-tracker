"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { collectedFilter } from "@/data/constants";
import {
	getToolByLicense,
	getToolBySearchValue,
	getToolBySource,
	getUniqueToolsLicenses,
	getUniqueToolsSources,
	tools,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import ToolCard from "./ToolCard";

export default function ToolsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [licenseFilter, setLicenseFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [buyUnitFilter, setBuyUnitFilter] = useState<string>("All");
	const [collectionFilter, setCollectionFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const filters = {
		license: {
			value: licenseFilter,
			options: getUniqueToolsLicenses(),
			label: "License",
		},
		source: {
			value: sourceFilter,
			options: getUniqueToolsSources(),
			label: "Source",
		},
		buyUnit: {
			value: buyUnitFilter,
			options: ["All", "Purchasable", "Dinks", "Permit Points"],
			label: "Purchase Type",
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
				setLocalState(data.tools || {});
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
			tools: localState,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "license") {
			setLicenseFilter(value);
		} else if (name === "source") {
			setSourceFilter(value);
		} else if (name === "buyUnit") {
			setBuyUnitFilter(value);
		} else if (name === "collection") {
			setCollectionFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...tools];

		if (sourceFilter !== "All") {
			filtered = getToolBySource(filtered, sourceFilter);
		}

		if (licenseFilter !== "All") {
			filtered = getToolByLicense(filtered, licenseFilter);
		}

		if (buyUnitFilter !== "All") {
			filtered = filtered.filter((tool) => {
				if (buyUnitFilter === "Dinks" && tool.buyUnits !== "Dinks") {
					return false;
				}
				if (buyUnitFilter === "Permit Points" && tool.buyUnits !== "Permit Points") {
					return false;
				}
				if (buyUnitFilter === "Purchasable" && tool.buyPrice === undefined) {
					return false;
				}
				return true;
			});
		}

		if (collectionFilter !== "All") {
			if (collectionFilter === "collected") {
				filtered = filtered.filter((item) => localState[item.id] === true);
			} else if (collectionFilter === "not_collected") {
				filtered = filtered.filter((item) => !localState[item.id]);
			}
		}

		if (searchQuery) {
			filtered = getToolBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [licenseFilter, sourceFilter, buyUnitFilter, collectionFilter, localState, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading tools..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Tools" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Tools"
					collectionName="Collected"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getCollectedCount()}
					collectionTotal={tools.length}
					dirtyMessage="Your tools collection has not been saved yet."
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search tool by name..."
				/>

				<FilterDetails
					title="tools"
					filteredCount={filteredData.length}
					totalCount={tools.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredData.map((item) => (
							<ToolCard
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
