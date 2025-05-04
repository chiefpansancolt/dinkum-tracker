import { Badge } from "flowbite-react";
import { CollectionCardProps, Furniture } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const FurnitureCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const furniture = record as Furniture;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={furniture.name}
					renderRightComp={() => (
						<Badge color={furniture.melvinsCatalogue ? "blue" : "gray"}>
							{furniture.melvinsCatalogue ? "Catalogue" : "Not in Catalogue"}
						</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={furniture.img} name={furniture.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{furniture.furnitureSet && (
						<ItemDetail label="Set" details={furniture.furnitureSet} />
					)}

					{furniture.source && furniture.source.length > 0 && (
						<ItemDetail label="Source" details={furniture.source.join(", ")} />
					)}

					{furniture.displayPrice !== undefined && (
						<DinkValue label="Display Price" price={furniture.displayPrice} />
					)}

					{furniture.cataloguePrice !== undefined && (
						<DinkValue label="Catalogue Price" price={furniture.cataloguePrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={furniture.baseSellPrice}
						showCommerceLicenses
					/>
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={furniture.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default FurnitureCard;
