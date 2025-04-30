import { Badge } from "flowbite-react";
import { CollectionCardProps, PediaItem } from "@/types";
import { getRarityColor } from "@/lib/services/rarityColor";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const BugCard = ({
	record,
	isCollected = false,
	isDonated = false,
	onToggleCollected,
	onToggleDonated,
}: CollectionCardProps) => {
	const bug = record as PediaItem;
	const isComplete = isCollected && isDonated;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={bug.name}
					renderRightComp={() => (
						<Badge color={getRarityColor(bug.rarity)}>{bug.rarity}</Badge>
					)}
				/>
			)}
			renderImage={() => <ItemImage src={bug.img} name={bug.name} isCollected={isComplete} />}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<ItemDetail label="Biome(s)" details={bug.biome.join(", ")} />
					<ItemDetail label="Seasons(s)" details={bug.seasons.join(", ")} />
					<ItemDetail label="Time(s)" details={bug.timeFound.join(", ")} />
					<DinkValue
						price={bug.baseSellPrice}
						label="Base Sell Price"
						showCommerceLicenses
					/>
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={bug.id}
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

export default BugCard;
