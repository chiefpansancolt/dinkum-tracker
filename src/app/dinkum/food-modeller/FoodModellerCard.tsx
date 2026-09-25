import type { Recipe } from "dinkum-data";
import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

const FoodModellerCard = ({ record }: CollectionCardProps) => {
	const recipe = record as Recipe;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={recipe.name}
					renderRightComp={() => (
						<>
							{typeof recipe.outputCount === "number" && recipe.outputCount > 1 && (
								<Badge color="gray">x{recipe.outputCount}</Badge>
							)}
							{recipe.outputCount === "Varies" && <Badge color="gray">Varies</Badge>}
						</>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={recipe.img} name={recipe.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{recipe.source && recipe.source.length > 0 && (
						<div className="flex">
							<p className="w-32 font-medium">Source:</p>
							<div className="flex flex-wrap gap-1">
								{recipe.source.map((src, index) => (
									<Badge
										key={`${recipe.id}-src-${index}`}
										color="info"
										className="mr-1"
									>
										{src}
									</Badge>
								))}
							</div>
						</div>
					)}

					<DinkValue
						label="Sell Price"
						price={recipe.baseSellPrice}
						showCommerceLicenses={true}
					/>

					<ItemResources id={recipe.id} label="Conversion" variants={recipe.variants} />
				</div>
			)}
		/>
	);
};

export default FoodModellerCard;
