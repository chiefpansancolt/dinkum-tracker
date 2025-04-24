import React from "react";
import { Card } from "flowbite-react";
import { ItemCardProps } from "@/types";

const ItemCard = ({ renderHeader, renderImage, renderDetails, renderFooter }: ItemCardProps) => {
	return (
		<Card className="h-full text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				{renderHeader && renderHeader()}
				{renderImage && renderImage()}

				<div className="mt-2 flex-grow space-y-2 text-sm">
					{renderDetails && renderDetails()}
				</div>

				{renderFooter && renderFooter()}
			</div>
		</Card>
	);
};

export default ItemCard;
