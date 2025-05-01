"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Biome, Playthrough } from "@/types";
import { getPlaythroughById } from "@/lib/localStorage";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { sellBySort } from "@/data/constants";
import {
	flowers,
	getFlowersByLocation,
	getFlowersBySearchValue,
	getUniqueFlowerLocations,
} from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import FlowerCard from "./FlowerCard";

export default function FlowersPage() {
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
			options: getUniqueFlowerLocations(),
			label: "Location",
		},
		sort: {
			value: sortBy,
			options: sellBySort,
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
		let filtered = [...flowers];

		if (locationFilter !== "All") {
			filtered = getFlowersByLocation(filtered, locationFilter as Biome);
		}

		if (searchQuery) {
			filtered = getFlowersBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [locationFilter, searchQuery]);

	const sortedData = useMemo(() => {
		return [...filteredData].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "sellPriceAsc") {
				return a.baseSellPrice - b.baseSellPrice;
			} else if (sortBy === "sellPriceDesc") {
				return b.baseSellPrice - a.baseSellPrice;
			}
			return 0;
		});
	}, [filteredData, sortBy]);

	if (isLoading) {
		return <LoadingPlaythrough message="Loading flowers information..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Flowers" />
			<div className="space-y-6 p-6">
				<TabHeader title="Flowers" enableCollectionCount={false} enableSaveAlert={false} />

				<FilterBar
					showFilters={true}
					filters={filters}
					onFilterChange={handleFilterChange}
					showSearch={true}
					searchValue={searchQuery}
					onSearchChange={(value) => setSearchQuery(value)}
					searchPlaceholder="Search flowers by name..."
				/>

				<FilterDetails
					title="flowers"
					filteredCount={sortedData.length}
					totalCount={flowers.length}
				/>

				{sortedData.length === 0 ? (
					<EmptyFilterCard />
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{sortedData.map((item) => (
							<FlowerCard key={item.id} record={item} />
						))}
					</div>
				)}
			</div>
		</>
	);
}
