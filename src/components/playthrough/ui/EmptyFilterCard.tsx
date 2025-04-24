import { Card } from "flowbite-react";

const EmptyFilterCard = () => {
	return (
		<Card className="py-8 text-center">
			<p className="text-gray-500 dark:text-gray-400">
				No items match your filter criteria. Try adjusting your filters.
			</p>
		</Card>
	);
};

export default EmptyFilterCard;
