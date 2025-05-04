"use client";

import { useEffect, useMemo, useState } from "react";
import { Season } from "@/types";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { SEASONS } from "@/data/constants";
import {
	getSeedsByCategory,
	getSeedsBySearchValue,
	getSeedsBySeason,
	getUniqueSeedCategories,
	seeds,
} from "@/data/dinkum";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import SeedCard from "./SeedCard";

export default function SeedsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [seasonFilter, setSeasonFilter] = useState<string>("All");
	const [categoryFilter, setCategoryFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

	const filters = {
		season: {
			value: seasonFilter,
			options: Object.values(SEASONS),
			label: "Season",
		},
		category: {
			value: categoryFilter,
			options: getUniqueSeedCategories(),
			label: "Category",
		},
		sort: {
			value: sortBy,
			options: [
				{ id: "name", value: "Name (A-Z)" },
				{ id: "buyPriceDesc", value: "Buy Price (High to Low)" },
				{ id: "buyPriceAsc", value: "Buy Price (Low to High)" },
				{ id: "growthPeriodAsc", value: "Growth Period (Fastest)" },
				{ id: "growthPeriodDesc", value: "Growth Period (Longest)" },
			],
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
		} else if (name === "category") {
			setCategoryFilter(value);
		} else if (name === "sort") {
			setSortBy(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = [...seeds];

		if (seasonFilter !== "All") {
			filtered = getSeedsBySeason(filtered, seasonFilter as Season);
		}

		if (categoryFilter !== "All") {
			filtered = getSeedsByCategory(filtered, categoryFilter);
		}

		if (searchQuery) {
			filtered = getSeedsBySearchValue(filtered, searchQuery);
		}

		return filtered;
	}, [seasonFilter, categoryFilter, searchQuery]);

	const sortedData = useMemo(() => {
		return [...filteredData].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "buyPriceAsc") {
				const aPrice = a.buyPrice || 0;
				const bPrice = b.buyPrice || 0;
				return aPrice - bPrice;
			} else if (sortBy === "buyPriceDesc") {
				const aPrice = a.buyPrice || 0;
				const bPrice = b.buyPrice || 0;
				return bPrice - aPrice;
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
		return <LoadingPlaythrough message="Loading seeds information..." />;
	}

	return (
		<div className="space-y-6 p-6">
			<TabHeader title="Seeds" enableCollectionCount={false} enableSaveAlert={false} />

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search seeds by name..."
			/>

			<FilterDetails
				title="seeds"
				filteredCount={sortedData.length}
				totalCount={seeds.length}
			/>

			{sortedData.length === 0 ? (
				<EmptyFilterCard />
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{sortedData.map((item) => (
						<SeedCard key={item.id} record={item} />
					))}
				</div>
			)}
		</div>
	);
}
