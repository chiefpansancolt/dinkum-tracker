"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Biome, Playthrough } from "@/types";
import { getPlaythroughById } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { sortByGrowth } from "@/data/constants";
import {
	getTreesByLocation,
	getTreesBySearchValue,
	getUniqueTreeLocations,
	trees,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import TreeCard from "./TreeCard";

export default function TreesPage() {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [locationFilter, setLocationFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

	const filters = {
		location: {
			value: locationFilter,
			options: getUniqueTreeLocations(),
			label: "Location",
		},
		sort: {
			value: sortBy,
			options: sortByGrowth,
			label: "Sort By",
		},
	};

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);
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

	const handleFilterChange = (name: string, value: string) => {
		if (name === "location") {
			setLocationFilter(value);
		} else if (name === "sort") {
			setSortBy(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...trees];

		if (locationFilter !== "All") {
			filtered = getTreesByLocation(filtered, locationFilter as Biome);
		}

		if (searchQuery) {
			filtered = getTreesBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [locationFilter, searchQuery]);

	const sortedData = useMemo(() => {
		return [...filteredData].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "growthPeriodAsc") {
				const aGrowth = a.growthPeriod || 0;
				const bGrowth = b.growthPeriod || 0;
				return aGrowth - bGrowth;
			} else if (sortBy === "growthPeriodDesc") {
				const aGrowth = a.growthPeriod || 0;
				const bGrowth = b.growthPeriod || 0;
				return bGrowth - aGrowth;
			}
			return 0;
		});
	}, [filteredData, sortBy]);

	if (isLoading) {
		return <LoadingPlaythrough message="Loading trees information..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Trees" />
			<div className="space-y-6 p-6">
				<TabHeader title="Trees" enableCollectionCount={false} enableSaveAlert={false} />

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search trees by name..."
				/>

				<FilterDetails
					title="trees"
					filteredCount={sortedData.length}
					totalCount={trees.length}
				/>

				{sortedData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{sortedData.map((item) => (
							<TreeCard key={item.id} record={item} />
						))}
					</div>
				)}
			</div>
		</>
	);
}
