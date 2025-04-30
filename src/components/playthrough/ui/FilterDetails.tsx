import { Badge } from "flowbite-react";
import { FilterDetailsProps } from "@/types";

const FilterDetails: React.FC<FilterDetailsProps> = ({
	title,
	filteredCount,
	totalCount,
	collectedLabel,
	collectedCount,
	donatedLabel,
	donatedCount,
	showRightBadge = false,
	renderBadgeDetails,
}: FilterDetailsProps) => {
	return (
		<div className="mb-4 flex justify-between">
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
			{showRightBadge && (
				<Badge color="indigo" size="lg">
					{renderBadgeDetails && renderBadgeDetails()}
				</Badge>
			)}
		</div>
	);
};

export default FilterDetails;
