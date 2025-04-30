import { Cassette, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import PermitValue from "@/playthrough/ui/itemcard/PermitValue";

const CassetteCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const cassette = record as Cassette;

	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={cassette.name} />}
			renderImage={() => (
				<ItemImage src={cassette.img} name={cassette.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{cassette.source && cassette.source.length > 0 && (
						<ItemDetail label="Source" details={cassette.source.join(", ")} />
					)}

					{cassette.buyPrice > 0 && (
						<PermitValue label="Buy Price" price={cassette.buyPrice} />
					)}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={cassette.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default CassetteCard;
