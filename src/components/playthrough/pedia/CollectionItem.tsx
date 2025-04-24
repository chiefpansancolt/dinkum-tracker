import React from "react";
import { Badge } from "flowbite-react";
import { CollectionItemProps } from "@/types";
import { getRarityColor } from "@/lib/services/rarityColor";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";

const CollectionItem: React.FC<CollectionItemProps> = ({
	item,
	isCollected,
	isDonated,
	onCollectedChange,
	onDonatedChange,
}) => {
	const isFish = "cookedPrice" in item;
	const isComplete = isCollected && isDonated;

	const handleDonatedChange = (id: string, checked: boolean) => {
		const isDonated = checked;

		if (isDonated && !isCollected) {
			onCollectedChange(id, true);
		}

		onDonatedChange(id, isDonated);
	};

	return (
		<ItemCard
			key={item.id}
			renderHeader={() => (
				<ItemHeader
					title={item.name}
					renderRightComp={() => (
						<Badge color={getRarityColor(item.rarity)}>{item.rarity}</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={item.img} name={item.name} isCollected={isComplete} />
			)}
			renderDetails={() => (
				<>
					<ItemDetail label="Biome(s)" details={item.biome.join(", ")} />
					<ItemDetail label="Seasons(s)" details={item.seasons.join(", ")} />
					<ItemDetail label="Time(s)" details={item.timeFound.join(", ")} />
					<DinkValue
						price={item.baseSellPrice}
						label="Base Sell Price"
						showCommerceLicenses
					/>
					{isFish && (
						<>
							<DinkValue
								price={item.cookedPrice}
								label="Cooked Sell Price"
								showCommerceLicenses
							/>
							<ItemDetail label="Cooked Piece(s)" details={item.cookedPieces.toString()} />
						</>
					)}
				</>
			)}
			renderFooter={() => (
				<ItemFooter
					id={item.id}
					showRightCheckbox
					leftLabel="Collected"
					isLeftChecked={isCollected}
					rightLabel="Donated to Museum"
					isRightChecked={isDonated}
					handleLeftToggle={(id, checked) => onCollectedChange(id, checked)}
					handleRightToggle={(id, checked) => handleDonatedChange(id, checked)}
				/>
			)}
		/>
	);
};

export default CollectionItem;
