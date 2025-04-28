import { Badge } from "flowbite-react";
import { ResourceItem, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemBuffs from "@/playthrough/ui/itemcard/ItemBuffs";

const ResourceCard = ({ record, isCollected = false, getTypeColor }: CollectionCardProps) => {
	const resource = record as ResourceItem;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={resource.name}
					renderRightComp={() => (
						<Badge color={getTypeColor?.(resource.resourceType)}>
							{resource.resourceType}
						</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={resource.img} name={resource.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{resource.source && resource.source.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4">Source:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{resource.source.map((src, index) => (
										<Badge
											key={`${resource.id}-src-${index}`}
											color="info"
											className="mr-1"
										>
											{src}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}

					{resource.locations && resource.locations.length > 0 && (
						<ItemDetail label="Locations" details={resource.locations.join(", ")} />
					)}

					{resource.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={resource.buyPrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={resource.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{resource.buffs && Object.keys(resource.buffs).length > 0 && (
						<ItemBuffs id={resource.id} buffs={resource.buffs} />
					)}

					{resource.variants && resource.variants.length > 0 && (
						<ItemResources
							id={resource.id}
							label="Resources"
							variants={resource.variants}
						/>
					)}
				</div>
			)}
		/>
	);
};

export default ResourceCard;
