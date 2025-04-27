import React from "react";
import { Badge } from "flowbite-react";
import { PediaItem } from "@/types/dinkum";
import { getRarityColor } from "@/lib/services/rarityColor";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";

interface BugCardProps {
	bug: PediaItem;
	isCollected: boolean;
	isDonated: boolean;
	onCollectedChange: (id: string, isCollected: boolean) => void;
	onDonatedChange: (id: string, isDonated: boolean) => void;
}

const BugCard: React.FC<BugCardProps> = ({
	bug,
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
					handleLeftToggle={(id, checked) => onCollectedChange(id, checked)}
					handleRightToggle={(id, checked) => onDonatedChange(id, checked)}
				/>
			)}
		/>
	);
};

export default BugCard;
