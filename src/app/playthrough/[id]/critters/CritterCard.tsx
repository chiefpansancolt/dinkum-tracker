import { Badge } from "flowbite-react";
import { CollectionCardProps, PediaItem } from "@/types";
import { getRarityColor } from "@/lib/services/rarityColor";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";

const CritterCard = ({
	record,
	isCollected = false,
	isDonated = false,
	onToggleCollected,
	onToggleDonated,
}: CollectionCardProps) => {
	const critter = record as PediaItem;
	const isComplete = isCollected && isDonated;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={critter.name}
					renderRightComp={() => (
						<Badge color={getRarityColor(critter.rarity)}>{critter.rarity}</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={critter.img} name={critter.name} isCollected={isComplete} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<ItemDetail label="Biome(s)" details={critter.biome.join(", ")} />
					<ItemDetail label="Seasons(s)" details={critter.seasons.join(", ")} />
					<ItemDetail label="Time(s)" details={critter.timeFound.join(", ")} />
					<DinkValue
						price={critter.baseSellPrice}
						label="Base Sell Price"
						showCommerceLicenses
					/>
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={critter.id}
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

export default CritterCard;
