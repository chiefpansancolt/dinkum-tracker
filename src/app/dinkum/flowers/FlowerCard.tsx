import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

const FlowerCard = ({ record }: CollectionCardProps) => {
	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={record.name} />}
			renderImage={() => (
				<ItemImage src={record.img} name={record.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{record.locations && record.locations.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Locations:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{record.locations.map((location: string, index: number) => (
										<Badge
											key={`${record.id}-location-${index}`}
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

					{record.seed && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seed:</div>
							<div className="col-span-8">
								<div className="flex items-center">
									{record.seed.img && (
										<img
											src={record.seed.img}
											alt={record.seed.name}
											className="mr-1 h-5 w-5 object-contain"
										/>
									)}
									<span>{record.seed.name}</span>
								</div>
							</div>
						</div>
					)}

					{record.conditions && (
						<ItemDetail label="Conditions" details={record.conditions} />
					)}

					{record.growthPeriod && (
						<ItemDetail label="Growth Period" details={`${record.growthPeriod} days`} />
					)}

					{record.regrowth && (
						<ItemDetail label="Regrowth" details={`${record.regrowth} days`} />
					)}

					<DinkValue
						label="Sell Price"
						price={record.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{record.source && record.source.length > 0 && (
						<ItemDetail label="Source" details={record.source.join(", ")} />
					)}

					{record.itemsDropped && record.itemsDropped.length > 0 && (
						<ItemResources id={record.id} label="Drops" items={record.itemsDropped} />
					)}
				</div>
			)}
		/>
	);
};

export default FlowerCard;
