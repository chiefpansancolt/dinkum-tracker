"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { tools } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import ToolCard from "./ToolCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";

export default function ToolsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [licenseFilter, setLicenseFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [buyUnitFilter, setBuyUnitFilter] = useState<string>("All");
	const [toolCollection, setToolCollection] = useState<Record<string, boolean>>({});
	const [isDirty, setIsDirty] = useState(false);

	const uniqueLicenses = useMemo(() => {
		const licenses = new Set<string>();
		tools.forEach((tool) => {
			if (tool.licence) {
				licenses.add(tool.licence);
			}
		});
		return ["All", ...Array.from(licenses).sort()];
	}, []);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		tools.forEach((tool) => {
			if (tool.source && tool.source.length > 0) {
				tool.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setToolCollection(data.tools || {});
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
		setToolCollection((prev) => {
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
			tools: toolCollection,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const filters = {
		license: {
			value: licenseFilter,
			options: uniqueLicenses,
			label: "License",
		},
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		buyUnit: {
			value: buyUnitFilter,
			options: ["All", "Purchasable", "Dinks", "Permit Points"],
			label: "Purchase Type",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "license") {
			setLicenseFilter(value);
		} else if (name === "source") {
			setSourceFilter(value);
		} else if (name === "buyUnit") {
			setBuyUnitFilter(value);
		}
	};

	const filteredTools = useMemo(() => {
		return tools.filter((tool) => {
			if (licenseFilter !== "All" && tool.licence !== licenseFilter) {
				return false;
			}

			if (sourceFilter !== "All" && !tool.source.includes(sourceFilter)) {
				return false;
			}

			if (buyUnitFilter !== "All") {
				if (buyUnitFilter === "Dinks" && tool.buyUnits !== "Dinks") {
					return false;
				}
				if (buyUnitFilter === "Permit Points" && tool.buyUnits !== "Permit Points") {
					return false;
				}
				if (buyUnitFilter === "Purchasable" && tool.buyPrice === undefined) {
					return false;
				}
			}

			if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [licenseFilter, sourceFilter, buyUnitFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(toolCollection).filter((key) => toolCollection[key]).length;
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
					searchPlaceholder="Search by name..."
				/>

				<FilterDetails
					title="tools"
					filteredCount={filteredTools.length}
					totalCount={tools.length}
					collectedLabel="Collected"
					collectedCount={getCollectedCount()}
				/>

				{filteredTools.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{filteredTools.map((tool) => (
							<ToolCard
								key={tool.id}
								record={tool}
								isCollected={toolCollection[tool.id] || false}
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
