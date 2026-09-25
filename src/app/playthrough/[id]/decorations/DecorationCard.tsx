import type { Decoration } from "dinkum-data";
import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const DecorationCard = ({
	record,
	isCollected = false,
	onToggleCollected,
}: CollectionCardProps) => {
	const decoration = record as Decoration;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={decoration.name}
					renderRightComp={() => <Badge color="gray">{decoration.category}</Badge>}
				/>
			)}
			renderImage={() => (
				<ItemImage src={decoration.img} name={decoration.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{decoration.source && decoration.source.length > 0 && (
						<ItemDetail label="Source" details={decoration.source.join(", ")} />
					)}

					{decoration.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={decoration.buyPrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={decoration.baseSellPrice}
						showCommerceLicenses
					/>
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={decoration.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default DecorationCard;
