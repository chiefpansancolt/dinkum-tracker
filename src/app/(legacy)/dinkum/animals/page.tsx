"use client";

import { ANIMAL_TYPES, animals, TEMPERAMENTS } from "dinkum-data";
import { useEffect, useMemo, useState } from "react";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { sortBySellHealth } from "@/data/constants";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import AnimalCard from "./AnimalCard";

const allAnimals = animals().get();

export default function AnimalsPage() {
	const [searchQuery, setSearchQuery] = useState<string>(() => getQueryParams().q || "");
	const [temperamentFilter, setTemperamentFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [habitatFilter, setHabitatFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

	const uniqueHabitats = useMemo(() => {
		const habitats = new Set<string>();
		allAnimals.forEach((animal) => {
			animal.habitat?.forEach((habitat) => habitats.add(habitat));
		});
		return ["All", ...Array.from(habitats).sort()];
	}, []);

	const filters = {
		temperament: {
			value: temperamentFilter,
			options: ["All", ...TEMPERAMENTS],
			label: "Temperament",
		},
		type: {
			value: typeFilter,
			options: ["All", ...ANIMAL_TYPES],
			label: "Type",
		},
		habitat: {
			value: habitatFilter,
			options: uniqueHabitats,
			label: "Habitat",
		},
		sort: {
			value: sortBy,
			options: sortBySellHealth,
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
		if (name === "temperament") {
			setTemperamentFilter(value);
		} else if (name === "type") {
			setTypeFilter(value);
		} else if (name === "habitat") {
			setHabitatFilter(value);
		} else if (name === "sort") {
			setSortBy(value);
		}
	};

	const filteredData = useMemo(() => {
		let query = animals(allAnimals);

		if (temperamentFilter !== "All") {
			query = query.byTemperament(temperamentFilter as (typeof TEMPERAMENTS)[number]);
		}

		if (typeFilter !== "All") {
			query = query.byType(typeFilter as (typeof ANIMAL_TYPES)[number]);
		}

		let filtered = query.get();

		if (habitatFilter !== "All") {
			// Preserves the pre-migration habitat filter, which matched against
			// `source` rather than `habitat`.
			filtered = filtered.filter((item) => item.source?.includes(habitatFilter));
		}

		if (searchQuery) {
			filtered = animals(filtered).search(searchQuery);
		}

		return filtered;
	}, [temperamentFilter, typeFilter, habitatFilter, searchQuery]);

	const sortedData = useMemo(() => {
		return [...filteredData].sort((a, b) => {
			if (sortBy === "name") {
				return a.name.localeCompare(b.name);
			} else if (sortBy === "sellPriceAsc") {
				const aPrice = a.baseSellPrice || 0;
				const bPrice = b.baseSellPrice || 0;
				return aPrice - bPrice;
			} else if (sortBy === "sellPriceDesc") {
				const aPrice = a.baseSellPrice || 0;
				const bPrice = b.baseSellPrice || 0;
				return bPrice - aPrice;
			} else if (sortBy === "healthAsc") {
				const aHealth = a.health || 0;
				const bHealth = b.health || 0;
				return aHealth - bHealth;
			} else if (sortBy === "healthDesc") {
				const aHealth = a.health || 0;
				const bHealth = b.health || 0;
				return bHealth - aHealth;
			}
			return 0;
		});
	}, [filteredData, sortBy]);

	return (
		<div className="space-y-6 p-6">
			<TabHeader title="Animals" enableCollectionCount={false} enableSaveAlert={false} />

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search animals by name, type, or habitat..."
			/>

			<FilterDetails
				title="animals"
				filteredCount={sortedData.length}
				totalCount={allAnimals.length}
			/>

			{sortedData.length === 0 ? (
				<EmptyFilterCard />
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortedData.map((animal) => (
						<AnimalCard key={animal.id} record={animal} />
					))}
				</div>
			)}
		</div>
	);
}
