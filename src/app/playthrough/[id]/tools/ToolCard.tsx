import { Button } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CollectionCardProps, Tool } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDamage from "@/playthrough/ui/itemcard/ItemDamage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemFranklyn from "@/playthrough/ui/itemcard/ItemFranklyn";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import PermitValue from "@/playthrough/ui/itemcard/PermitValue";

const ToolCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const tool = record as Tool;
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const isCraftable = tool.source.includes("Crafting Table");

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={tool.name}
					renderRightComp={() =>
						isCraftable && (
							<Button
								as={Link}
								href={`/playthrough/${playthroughId}/craftingRecipes?q=${encodeURIComponent(tool.name)}`}
								color="secondary"
								size="xs"
							>
								Crafting Recipe
							</Button>
						)
					}
				/>
			)}
			renderImage={() => (
				<ItemImage src={tool.img} name={tool.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{tool.licence && <ItemDetail label="License" details={tool.licence} />}

					{tool.source && tool.source.length > 0 && (
						<ItemDetail label="Source" details={tool.source.join(", ")} />
					)}

					{tool.damage && tool.damage > 0 && (
						<ItemDamage label="Damage" damage={tool.damage} />
					)}

					{(tool.shinyDiscCount || tool.berkoniumOreCount) && (
						<ItemFranklyn
							shinyDiscCount={tool.shinyDiscCount}
							berkoniumOreCount={tool.berkoniumOreCount}
						/>
					)}

					{tool.inputs && tool.inputs.length > 0 && (
						<ItemResources id={tool.id} label="Ingredients" items={tool.inputs} />
					)}

					{tool.buyPrice !== undefined &&
						(tool.buyUnits === "Permit Points" ? (
							<PermitValue label="Buy Price" price={tool.buyPrice} />
						) : (
							<DinkValue label="Buy Price" price={tool.buyPrice} />
						))}

					{tool.baseSellPrice !== null && (
						<DinkValue
							label="Sell Price"
							price={tool.baseSellPrice}
							showCommerceLicenses
						/>
					)}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={tool.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default ToolCard;
