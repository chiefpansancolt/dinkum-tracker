import { Badge } from "flowbite-react";
import { Flower } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

interface FlowerCardProps {
	flower: Flower;
}

const FlowerCard = ({ flower }: FlowerCardProps) => {
	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={flower.name} />}
			renderImage={() => (
				<ItemImage src={flower.img} name={flower.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{flower.locations && flower.locations.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Locations:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{flower.locations.map((location, index) => (
										<Badge
											key={`${flower.id}-location-${index}`}
											color="blue"
											className="mr-1"
										>
											{location}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}

					{flower.seed && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seed:</div>
							<div className="col-span-8">
								<div className="flex items-center">
									{flower.seed.img && (
										<img
											src={flower.seed.img}
											alt={flower.seed.name}
											className="mr-1 h-5 w-5 object-contain"
										/>
									)}
									<span>{flower.seed.name}</span>
								</div>
							</div>
						</div>
					)}

					{flower.conditions && (
						<ItemDetail label="Conditions" details={flower.conditions} />
					)}

					{flower.growthPeriod && (
						<ItemDetail label="Growth Period" details={`${flower.growthPeriod} days`} />
					)}

					{flower.regrowth && (
						<ItemDetail label="Regrowth" details={`${flower.regrowth} days`} />
					)}

					<DinkValue
						label="Sell Price"
						price={flower.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{flower.source && flower.source.length > 0 && (
						<ItemDetail label="Source" details={flower.source.join(", ")} />
					)}

					{flower.itemsDropped && flower.itemsDropped.length > 0 && (
						<ItemResources id={flower.id} label="Drops" items={flower.itemsDropped} />
					)}
				</div>
			)}
		/>
	);
};

export default FlowerCard;
