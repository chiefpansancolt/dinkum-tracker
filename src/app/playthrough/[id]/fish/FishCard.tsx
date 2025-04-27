import React from "react";
import { Badge } from "flowbite-react";
import { Fish } from "@/types/dinkum";
import { getRarityColor } from "@/lib/services/rarityColor";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";

interface FishCardProps {
	fish: Fish;
	isCollected: boolean;
	isDonated: boolean;
	onCollectedChange: (id: string, isCollected: boolean) => void;
	onDonatedChange: (id: string, isDonated: boolean) => void;
}

const FishCard: React.FC<FishCardProps> = ({
	fish,
	isCollected,
	isDonated,
	onCollectedChange,
	onDonatedChange,
}) => {
	const isComplete = isCollected && isDonated;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={fish.name}
					renderRightComp={() => (
						<Badge color={getRarityColor(fish.rarity)}>{fish.rarity}</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={fish.img} name={fish.name} isCollected={isComplete} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<ItemDetail label="Biome(s)" details={fish.biome.join(", ")} />
					<ItemDetail label="Seasons(s)" details={fish.seasons.join(", ")} />
					<ItemDetail label="Time(s)" details={fish.timeFound.join(", ")} />
					<DinkValue
						price={fish.baseSellPrice}
						label="Base Sell Price"
						showCommerceLicenses
					/>
					<DinkValue
						price={fish.cookedPrice}
						label="Cooked Sell Price"
						showCommerceLicenses
					/>
					<ItemDetail label="Cooked Piece(s)" details={fish.cookedPieces.toString()} />
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={fish.id}
					showRightCheckbox
					leftLabel="Collected"
					isLeftChecked={isCollected}
					rightLabel="Donated to Museum"
					isRightChecked={isDonated}
					handleLeftToggle={(id, checked) => onCollectedChange(id, checked)}
					handleRightToggle={(id, checked) => onDonatedChange(id, checked)}
				/>
			)}
		/>
	);
};

export default FishCard;
