"use client";

import { useEffect, useMemo, useState } from "react";
import { getQueryParams, setQueryParam } from "@/service/urlService";
import { ANIMAL_TYPES, sortBySellHealth, TEMPERAMENTS } from "@/data/constants";
import {
	animals,
	getAnimalByHabitat,
	getAnimalBySearchValue,
	getAnimalByTemperament,
	getAnimalByType,
	getUniqueAnimalHabitat,
} from "@/data/dinkum";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import TabHeader from "@/playthrough/ui/TabHeader";
import AnimalCard from "./AnimalCard";

export default function AnimalsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [temperamentFilter, setTemperamentFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [habitatFilter, setHabitatFilter] = useState<string>("All");
	const [sortBy, setSortBy] = useState<string>("name");

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
			options: getUniqueAnimalHabitat(),
			label: "Habitat",
		},
		sort: {
			value: sortBy,
			options: sortBySellHealth,
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
		let filtered = [...animals];

		if (temperamentFilter !== "All") {
			filtered = getAnimalByTemperament(filtered, temperamentFilter);
		}

		if (typeFilter !== "All") {
			filtered = getAnimalByType(filtered, typeFilter);
		}

		if (habitatFilter !== "All") {
			filtered = getAnimalByHabitat(filtered, habitatFilter);
		}

		if (searchQuery) {
			filtered = getAnimalBySearchValue(filtered, searchQuery);
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

	if (isLoading) {
		return <LoadingPlaythrough message="Loading animals information..." />;
	}

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
				totalCount={animals.length}
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
