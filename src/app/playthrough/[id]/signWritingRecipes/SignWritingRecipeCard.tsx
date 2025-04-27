import React from "react";
import { Badge } from "flowbite-react";
import { Recipe } from "@/types/dinkum";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

interface SignWritingRecipeCardProps {
	recipe: Recipe;
	isUnlocked: boolean;
	onToggleUnlocked: (id: string, isUnlocked: boolean) => void;
}

const SignWritingRecipeCard: React.FC<SignWritingRecipeCardProps> = ({
	recipe,
	isUnlocked,
	onToggleUnlocked,
}) => {
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
				<ItemImage src={recipe.img} name={recipe.name} isCollected={isUnlocked} />
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

					<ItemResources id={recipe.id} label="Resources" variants={recipe.variants} />
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={recipe.id}
					leftLabel="Unlocked"
					isLeftChecked={isUnlocked}
					handleLeftToggle={onToggleUnlocked}
				/>
			)}
		/>
	);
};

export default SignWritingRecipeCard;
