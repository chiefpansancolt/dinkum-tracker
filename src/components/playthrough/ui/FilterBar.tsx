import { FilterBarProps, FilterArray, FilterObject } from "@/types";
import { Label, Select, TextInput, Button } from "flowbite-react";
import { HiSearch, HiFilter } from "react-icons/hi";

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
	showActionButton = false,
	actionButtonLabel = "Filter",
	onActionButtonClick,
	filterActive,
	selectedCount,
}) => {
	const totalFilters = showFilters && filters ? Object.keys(filters).length * 2 : 0;

	const getSearchColSpanClass = () => {
		switch (totalFilters) {
			case 0:
				return showActionButton ? "md:col-span-11" : "md:col-span-12";
			case 2:
				return showActionButton ? "md:col-span-9" : "md:col-span-10";
			case 4:
				return showActionButton ? "md:col-span-7" : "md:col-span-8";
			case 6:
				return showActionButton ? "md:col-span-5" : "md:col-span-6";
			case 8:
				return showActionButton ? "md:col-span-3" : "md:col-span-4";
			case 10:
				return "md:col-span-1";
			default:
				return showActionButton ? "md:col-span-11" : "md:col-span-12";
		}
	};

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
			{showFilters &&
				onFilterChange &&
				filters &&
				Object.entries(filters).map(([key, filter]) => (
					<div key={key} className="col-span-1 md:col-span-2">
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

			{showActionButton && onActionButtonClick && (
				<div className="col-span-1 flex items-end justify-start">
					<Button
						color={
							filterActive || (selectedCount && selectedCount > 0)
								? "primary"
								: "light"
						}
						onClick={onActionButtonClick}
						className="w-full"
					>
						<HiFilter className="mr-2 h-5 w-5" />
						{actionButtonLabel}
						{selectedCount !== undefined && selectedCount > 0 && (
							<span className="ml-1">({selectedCount})</span>
						)}
					</Button>
				</div>
			)}
		</div>
	);
};

export default FilterBar;
