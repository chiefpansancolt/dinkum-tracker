import { Badge } from "flowbite-react";
import { Animal } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

interface AnimalCardProps {
	animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
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
					title={animal.name}
					renderRightComp={() => (
						<div className="flex flex-col gap-1">
							<Badge color={getTemperamentColor(animal.temperament)}>
								{animal.temperament}
							</Badge>
							<Badge color={getTypeColor(animal.type)}>{animal.type}</Badge>
						</div>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={animal.img} name={animal.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{animal.health && (
						<ItemDetail label="Health" details={animal.health.toString()} />
					)}

					{animal.habitat && animal.habitat.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Habitat:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{animal.habitat.map((habitat, index) => (
										<Badge
											key={`${animal.id}-habitat-${index}`}
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

					{animal.source && <ItemDetail label="Source" details={animal.source} />}

					{animal.buyPrice && <DinkValue label="Buy Price" price={animal.buyPrice} />}

					{animal.baseSellPrice && (
						<DinkValue
							label="Sell Price"
							price={animal.baseSellPrice}
							showCommerceLicenses
						/>
					)}

					{animal.maxSellPrice && animal.maxSellPrice !== animal.baseSellPrice && (
						<ItemDetail
							label="Max Sell Price"
							details={`${animal.maxSellPrice.toLocaleString()} Dinks`}
						/>
					)}

					{animal.researchReward && (
						<ItemDetail
							label="Research Reward"
							details={`${animal.researchReward.toLocaleString()} Dinks`}
						/>
					)}

					{animal.drops && animal.drops.length > 0 && (
						<ItemResources id={animal.id} label="Drops" items={animal.drops} />
					)}

					{animal.produces && animal.produces.length > 0 && (
						<ItemResources
							id={`${animal.id}-prod`}
							label="Produces"
							items={animal.produces}
						/>
					)}
				</div>
			)}
		/>
	);
};

export default AnimalCard;
