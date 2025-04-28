import { Badge } from "flowbite-react";
import { Clothing, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";

const ClothingCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const clothing = record as Clothing;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={clothing.name}
					renderRightComp={() => <Badge color="purple">{clothing.type}</Badge>}
				/>
			)}
			renderImage={() => (
				<ItemImage src={clothing.img} name={clothing.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<ItemDetail label="Slot" details={clothing.slot.join(", ")} />

					{clothing.set && <ItemDetail label="Set" details={clothing.set} />}

					{clothing.displayPrice !== null && (
						<DinkValue label="Price" price={clothing.displayPrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={clothing.baseSellPrice}
						showCommerceLicenses
					/>

					{clothing.cloversCatalogue && (
						<ItemDetail label="Available at" details="Clover's Shop" />
					)}

					{clothing.cataloguePrice !== null && (
						<DinkValue label="Catalogue Price" price={clothing.cataloguePrice} />
					)}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={clothing.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default ClothingCard;
