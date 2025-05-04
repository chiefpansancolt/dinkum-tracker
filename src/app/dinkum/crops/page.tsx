"use client";

import { useEffect, useMemo, useState } from "react";
import { Season } from "@/types";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { SEASONS, sellBySort } from "@/data/constants";
import { crops, getCropsBySearchValue, getCropsBySeason } from "@/data/dinkum";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import CropCard from "./CropCard";

export default function CropsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [seasonFilter, setSeasonFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

	const filters = {
		season: {
			value: seasonFilter,
			options: Object.values(SEASONS),
			label: "Season",
		},
		sort: {
			value: sortBy,
			options: sellBySort,
			label: "Sort By",
		},
	};

	useEffect(() => {
		setIsLoading(false);

		const params = getQueryParams();
		if (params.q) {
			setSearchQuery(params.q);
		}
	}, []);

	useEffect(() => {
		if (searchQuery) {
			setQueryParam("q", searchQuery);
		} else {
			setQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleFilterChange = (name: string, value: string) => {
		if (name === "season") {
			setSeasonFilter(value);
		} else if (name === "sort") {
			setSortBy(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...crops];

		if (seasonFilter !== "All") {
			filtered = getCropsBySeason(filtered, seasonFilter as Season);
		}

		if (searchQuery) {
			filtered = getCropsBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [seasonFilter, searchQuery]);

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
		return <LoadingPlaythrough message="Loading crops information..." />;
	}

	return (
		<div className="space-y-6 p-6">
			<TabHeader title="Crops" enableCollectionCount={false} enableSaveAlert={false} />

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search crops by name..."
			/>

			<FilterDetails
				title="crops"
				filteredCount={sortedData.length}
				totalCount={crops.length}
			/>

			{sortedData.length === 0 ? (
				<EmptyFilterCard />
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{sortedData.map((item) => (
						<CropCard key={item.id} record={item} />
					))}
				</div>
			)}
		</div>
	);
}
