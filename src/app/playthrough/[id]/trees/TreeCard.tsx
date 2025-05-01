import { Badge } from "flowbite-react";
import { Seed, Tree } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

interface TreeCardProps {
	tree: Tree;
}

const TreeCard = ({ tree }: TreeCardProps) => {
	const seedType = tree.seed && "growthPeriod" in tree.seed ? (tree.seed as Seed) : null;

	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={tree.name} />}
			renderImage={() => <ItemImage src={tree.img} name={tree.name} isCollected={false} />}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{tree.seed && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seed:</div>
							<div className="col-span-8">
								<div className="flex items-center">
									{tree.seed.img && (
										<img
											src={tree.seed.img}
											alt={tree.seed.name}
											className="mr-1 h-5 w-5 object-contain"
										/>
									)}
									<span>{tree.seed.name}</span>
								</div>
							</div>
						</div>
					)}

					{tree.locations && tree.locations.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Locations:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{tree.locations.map((location, index) => (
										<Badge
											key={`${tree.id}-location-${index}`}
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

					{tree.growthPeriod && (
						<ItemDetail label="Growth Period" details={`${tree.growthPeriod} days`} />
					)}

					{tree.regrowth && (
						<ItemDetail label="Regrowth" details={`${tree.regrowth} days`} />
					)}

					{seedType && seedType.growthPeriod && (
						<ItemDetail
							label="Growth Period"
							details={`${seedType.growthPeriod} days`}
						/>
					)}

					{tree.itemsDropped && tree.itemsDropped.length > 0 && (
						<ItemResources id={tree.id} label="Drops" items={tree.itemsDropped} />
					)}
				</div>
			)}
		/>
	);
};

export default TreeCard;
