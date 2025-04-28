import { Badge } from "flowbite-react";
import { CookingRecipe, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemBuffs from "@/playthrough/ui/itemcard/ItemBuffs";

const CookingRecipeCard = ({
	record,
	isCollected = false,
	onToggleCollected,
}: CollectionCardProps) => {
	const recipe = record as CookingRecipe;
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
				<ItemImage src={recipe.img} name={recipe.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<div className="grid grid-cols-12">
						<div className="col-span-4">Cooking Location:</div>
						<div className="col-span-8">
							<div className="flex flex-wrap gap-1">
								{recipe.cookingLocation.map((location, index) => (
									<Badge
										key={`${recipe.id}-loc-${index}`}
										color="info"
										className="mr-1"
									>
										{location}
									</Badge>
								))}
							</div>
						</div>
					</div>

					{recipe.buffs && Object.keys(recipe.buffs).length > 1 && (
						<ItemBuffs id={recipe.id} buffs={recipe.buffs} />
					)}

					<DinkValue
						label="Sell Price"
						price={recipe.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{recipe.sheilasSellPrice && (
						<DinkValue label="Sheila's" price={recipe.sheilasSellPrice} />
					)}

					{recipe.tedsSellPrice && (
						<DinkValue label="Ted's" price={recipe.tedsSellPrice} />
					)}

					{recipe.jimmysSellPrice && (
						<DinkValue label="Jimmy's" price={recipe.jimmysSellPrice} />
					)}

					<ItemResources id={recipe.id} label="Resources" variants={recipe.variants} />
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={recipe.id}
					leftLabel="Unlocked"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default CookingRecipeCard;
