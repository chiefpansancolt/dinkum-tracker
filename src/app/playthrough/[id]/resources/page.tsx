"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Button } from "flowbite-react";
import {
	animalProducts,
	foragables,
	minerals,
	relics,
	trophies,
	otherCraftables,
} from "@/data/dinkum";
import { ResourceType } from "@/data/constants";
import { getPlaythroughById } from "@/lib/localStorage";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import ResourceCard from "./ResourceCard";
import { HiX } from "react-icons/hi";
import { Playthrough, ResourceItem } from "@/types";

export default function ResourcesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");
	const [showCommonOnly, setShowCommonOnly] = useState<boolean>(false);
	const [showFilter, setShowFilter] = useState<boolean>(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);
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

	const allResources = useMemo(() => {
		const resources: ResourceItem[] = [];

		animalProducts.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.ANIMALPRODUCT,
			});
		});

		foragables.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.FORAGABLE,
			});
		});

		minerals.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.MINERAL,
			});
		});

		relics.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.RELIC,
			});
		});

		trophies.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.TROPHY,
			});
		});

		otherCraftables.forEach((item) => {
			resources.push({
				...item,
				resourceType: ResourceType.CRAFTABLE,
			});
		});

		return resources;
	}, []);

	const resourceTypes = useMemo(() => {
		return Object.values(ResourceType).filter(
			(type) =>
				type !== ResourceType.FISH &&
				type !== ResourceType.BUG &&
				type !== ResourceType.CRITTER &&
				type !== ResourceType.CROP &&
				type !== ResourceType.PAINT &&
				type !== ResourceType.RESOURCE
		);
	}, []);

	const allSources = useMemo(() => {
		const sources = new Set<string>();

		allResources.forEach((resource) => {
			if (resource.source && resource.source.length > 0) {
				resource.source.forEach((src) => {
					sources.add(src);
				});
			}
		});

		return Array.from(sources).sort();
	}, [allResources]);

	const filters = {
		sort: {
			value: sortBy,
			options: [
				{ id: "name", value: "Name (A-Z)" },
				{ id: "priceDesc", value: "Price (High to Low)" },
				{ id: "priceAsc", value: "Price (Low to High)" },
			],
			label: "Sort By",
		},
		source: {
			value: sourceFilter,
			options: ["All", ...allSources],
			label: "Source",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "sort") {
			setSortBy(value);
		} else if (name === "source") {
			setSourceFilter(value);
		}
	};

	const filteredData = useMemo(() => {
		return allResources.filter((resource) => {
			if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			if (selectedTypes.length > 0 && !selectedTypes.includes(resource.resourceType)) {
				return false;
			}

			if (sourceFilter !== "All") {
				if (!resource.source || !resource.source.includes(sourceFilter)) {
					return false;
				}
			}

			return true;
		});
	}, [allResources, searchQuery, selectedTypes, sourceFilter]);

	const sortedResources = useMemo(() => {
		return [...filteredData].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "priceAsc") {
				return a.baseSellPrice - b.baseSellPrice;
			} else if (sortBy === "priceDesc") {
				return b.baseSellPrice - a.baseSellPrice;
			}
			return 0;
		});
	}, [filteredData, sortBy]);

	const toggleType = (type: ResourceType) => {
		setSelectedTypes((prev) => {
			if (prev.includes(type)) {
				return prev.filter((t) => t !== type);
			} else {
				return [...prev, type];
			}
		});
	};

	const clearAllTypes = () => {
		setSelectedTypes([]);
	};

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};

	const typeCount = (type: ResourceType) => {
		return allResources.filter((r) => r.resourceType === type).length;
	};

	const getTypeColor = (type: ResourceType): string => {
		switch (type) {
			case ResourceType.ANIMALPRODUCT:
				return "success";
			case ResourceType.FORAGABLE:
				return "green";
			case ResourceType.MINERAL:
				return "purple";
			case ResourceType.RELIC:
				return "indigo";
			case ResourceType.TROPHY:
				return "warning";
			case ResourceType.CRAFTABLE:
				return "info";
			default:
				return "gray";
		}
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading resources..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Resources" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Resources"
					enableCollectionCount={false}
					enableSaveAlert={false}
				/>

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search by name..."
					showActionButton={true}
					onActionButtonClick={toggleFilter}
					filterActive={showFilter}
					selectedCount={selectedTypes.length}
				/>

				{showFilter && (
					<Card>
						<div className="mb-2 flex items-center justify-between">
							<h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
								Filter by Resource Type
							</h3>
							<Button
								size="xs"
								color="secondary"
								onClick={clearAllTypes}
								disabled={selectedTypes.length === 0}
							>
								<HiX className="mr-1 h-4 w-4" />
								Clear Filters
							</Button>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
							{resourceTypes.map((type) => {
								const isSelected = selectedTypes.includes(type);
								const count = typeCount(type);

								return (
									<div
										key={type}
										className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-gray-900 dark:text-gray-50 ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
												: "border-gray-700 dark:border-gray-500"
										}`}
										onClick={() => toggleType(type)}
									>
										<div className="flex flex-col">
											<span className="text-sm font-medium">{type}</span>
											<span className="text-xs text-gray-500 dark:text-gray-300">
												{count} items
											</span>
										</div>
										<Checkbox
											className="ml-auto"
											checked={isSelected}
											onChange={() => toggleType(type)}
										/>
									</div>
								);
							})}
						</div>
					</Card>
				)}

				<div className="mt-4 flex flex-wrap gap-4">
					<div className="flex items-center">
						<Checkbox
							id="common-only"
							checked={showCommonOnly}
							onChange={() => setShowCommonOnly(!showCommonOnly)}
							className="mr-2"
						/>
						<label
							htmlFor="common-only"
							className="cursor-pointer text-gray-900 dark:text-gray-50"
						>
							Common Resources Only (Used in 3+ Items)
						</label>
					</div>
				</div>

				<FilterDetails
					title="resources"
					filteredCount={sortedResources.length}
					totalCount={allResources.length}
				/>

				{sortedResources.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{sortedResources.map((resource) => (
							<ResourceCard
								key={resource.id}
								resource={resource}
								isCollected={false}
								getTypeColor={getTypeColor}
							/>
						))}
					</div>
				) : (
					<EmptyFilterCard />
				)}
			</div>
		</>
	);
}
