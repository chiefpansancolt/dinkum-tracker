"use client";

import { foodModellerRecipes } from "dinkum-data";
import { useEffect, useMemo, useState } from "react";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { sellBySort } from "@/data/constants";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import FoodModellerCard from "./FoodModellerCard";

const allFoodModellerRecipes = foodModellerRecipes().get();

export default function FoodModellerPage() {
	const [searchQuery, setSearchQuery] = useState<string>(() => getQueryParams().q || "");
	const [sortBy, setSortBy] = useState<string>("name");

	const filters = {
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
		if (name === "sort") {
			setSortBy(value);
		}
	};

	const filteredData = useMemo(() => {
		let filtered = allFoodModellerRecipes;

		if (searchQuery) {
			filtered = foodModellerRecipes(filtered).search(searchQuery);
		}

		return filtered;
	}, [searchQuery]);

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
			<TabHeader
				title="Food Modeller"
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
				searchPlaceholder="Search by display item name..."
			/>

			<FilterDetails
				title="conversions"
				filteredCount={sortedData.length}
				totalCount={allFoodModellerRecipes.length}
			/>

			{sortedData.length === 0 ? (
				<EmptyFilterCard />
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortedData.map((item) => (
						<FoodModellerCard key={item.id} record={item} />
					))}
				</div>
			)}
		</div>
	);
}
