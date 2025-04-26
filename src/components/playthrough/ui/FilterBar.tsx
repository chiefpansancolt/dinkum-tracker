import { FilterBarProps, FilterArray, FilterObject } from "@/types";
import { Label, Select, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

const isFilterObjectArray = (options: FilterArray | FilterObject[]): options is FilterObject[] => {
	return options.length > 0 && typeof options[0] === "object" && "id" in options[0];
};

const FilterBar: React.FC<FilterBarProps> = ({
	showFilters = false,
	filters,
	onFilterChange,
	showSearch = true,
	searchValue = "",
	onSearchChange,
	searchPlaceholder = "Search by name...",
}) => {
	const totalFilters = showFilters && filters ? Object.keys(filters).length * 2 : 0;

	const getSearchColSpanClass = () => {
		switch (totalFilters) {
			case 0:
				return "md:col-span-12";
			case 2:
				return "md:col-span-10";
			case 4:
				return "md:col-span-8";
			case 6:
				return "md:col-span-6";
			case 8:
				return "md:col-span-4";
			case 10:
				return "md:col-span-2";
			default:
				return "md:col-span-12";
		}
	};

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
			{showFilters &&
				onFilterChange &&
				filters &&
				Object.entries(filters).map(([key, filter]) => (
					<div key={key} className="md:col-span-2">
						<div className="mb-2 block">
							<Label htmlFor={`filter-${key}`}>{filter.label}</Label>
						</div>
						<Select
							id={`filter-${key}`}
							value={filter.value}
							onChange={(e) => onFilterChange(key, e.target.value)}
						>
							{isFilterObjectArray(filter.options)
								? filter.options.map((option) => (
										<option key={option.id} value={option.id}>
											{option.value}
										</option>
									))
								: filter.options.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
						</Select>
					</div>
				))}

			{showSearch && onSearchChange && (
				<div className={getSearchColSpanClass()}>
					<div className="mb-2 block">
						<Label htmlFor="search-input">Search</Label>
					</div>
					<TextInput
						id="search-input"
						type="search"
						icon={HiSearch}
						placeholder={searchPlaceholder}
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</div>
			)}
		</div>
	);
};

export default FilterBar;
