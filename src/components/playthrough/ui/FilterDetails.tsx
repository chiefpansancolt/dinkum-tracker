import { FilterDetailsProps } from "@/types";

const FilterDetails = ({
	title,
	filteredCount,
	totalCount,
	collectedLabel,
	collectedCount,
	donatedLabel,
	donatedCount,
}: FilterDetailsProps) => {
	return (
		<div className="mb-4">
			<p className="text-primary font-medium">
				Showing {filteredCount} of {totalCount} {title}
				{collectedLabel && (
					<span className="ml-1">
						• {collectedLabel}: {collectedCount}
					</span>
				)}
				{donatedLabel && (
					<span className="ml-1">
						• {donatedLabel}: {donatedCount}
					</span>
				)}
			</p>
		</div>
	);
};

export default FilterDetails;
