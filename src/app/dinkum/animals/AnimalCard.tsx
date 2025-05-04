import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

const AnimalCard = ({ record }: CollectionCardProps) => {
	const getTemperamentColor = (temperament: string) => {
		switch (temperament) {
			case "Passive":
				return "success";
			case "Neutral":
				return "warning";
			case "Aggressive":
				return "red";
			default:
				return "gray";
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case "Wild Animal":
				return "purple";
			case "Farm Animal":
				return "green";
			case "Tammed Animal":
				return "blue";
			default:
				return "gray";
		}
	};

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={record.name}
					renderRightComp={() => (
						<div className="flex flex-col gap-1">
							<Badge color={getTemperamentColor(record.temperament)}>
								{record.temperament}
							</Badge>
							<Badge color={getTypeColor(record.type)}>{record.type}</Badge>
						</div>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={record.img} name={record.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{record.health && (
						<ItemDetail label="Health" details={record.health.toString()} />
					)}

					{record.habitat && record.habitat.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Habitat:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{record.habitat.map((habitat: string, index: number) => (
										<Badge
											key={`${record.id}-habitat-${index}`}
											color="blue"
											className="mr-1"
										>
											{habitat}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}

					{record.source && <ItemDetail label="Source" details={record.source} />}

					{record.buyPrice && <DinkValue label="Buy Price" price={record.buyPrice} />}

					{record.baseSellPrice && (
						<DinkValue
							label="Sell Price"
							price={record.baseSellPrice}
							showCommerceLicenses
						/>
					)}

					{record.maxSellPrice && record.maxSellPrice !== record.baseSellPrice && (
						<ItemDetail
							label="Max Sell Price"
							details={`${record.maxSellPrice.toLocaleString()} Dinks`}
						/>
					)}

					{record.researchReward && (
						<ItemDetail
							label="Research Reward"
							details={`${record.researchReward.toLocaleString()} Dinks`}
						/>
					)}

					{record.drops && record.drops.length > 0 && (
						<ItemResources id={record.id} label="Drops" items={record.drops} />
					)}

					{record.produces && record.produces.length > 0 && (
						<ItemResources
							id={`${record.id}-prod`}
							label="Produces"
							items={record.produces}
						/>
					)}
				</div>
			)}
		/>
	);
};

export default AnimalCard;