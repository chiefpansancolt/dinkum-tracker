"use client";

import { type Biome, flowers } from "dinkum-data";
import { useEffect, useMemo, useState } from "react";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { sellBySort } from "@/data/constants";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import FlowerCard from "./FlowerCard";

const allFlowers = flowers().get();

export default function FlowersPage() {
	const [searchQuery, setSearchQuery] = useState<string>(() => getQueryParams().q || "");
	const [locationFilter, setLocationFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

	const uniqueLocations = useMemo(() => {
		const locations = new Set<string>();
		allFlowers.forEach((flower) => flower.locations.forEach((l) => locations.add(l)));
		return ["All", ...Array.from(locations).sort()];
	}, []);

	const filters = {
		location: {
			value: locationFilter,
			options: uniqueLocations,
			label: "Location",
		},
		sort: {
			value: sortBy,
			options: sellBySort,
			label: "Sort By",
		},
	};

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
		let query = flowers(allFlowers);

		if (locationFilter !== "All") {
			query = query.byLocation(locationFilter as Biome);
		}

		let filtered = query.get();

		if (searchQuery) {
			filtered = flowers(filtered).search(searchQuery);
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

	return (
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
				totalCount={allFlowers.length}
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
	);
}
