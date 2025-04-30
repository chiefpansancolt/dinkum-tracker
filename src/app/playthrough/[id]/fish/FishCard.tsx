import { Badge } from "flowbite-react";
import { CollectionCardProps, Fish } from "@/types";
import { getRarityColor } from "@/lib/services/rarityColor";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const FishCard = ({
	record,
	isCollected = false,
	isDonated = false,
	onToggleCollected,
	onToggleDonated,
}: CollectionCardProps) => {
	const fish = record as Fish;
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
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
					handleRightToggle={(id, checked) => onToggleDonated?.(id, checked)}
				/>
			)}
		/>
	);
};

export default FishCard;
