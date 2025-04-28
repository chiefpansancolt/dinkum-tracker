import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { Equipment, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemFranklyn from "@/playthrough/ui/itemcard/ItemFranklyn";

const EquipmentCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const equipment = record as Equipment;
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const isCraftable = equipment.source.includes("Crafting Table");

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={equipment.name}
					renderRightComp={() =>
						isCraftable && (
							<Button
								as={Link}
								href={`/playthrough/${playthroughId}/craftingRecipes?q=${encodeURIComponent(equipment.name)}`}
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
				<ItemImage src={equipment.img} name={equipment.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<p className="border-b border-gray-200 pb-2 text-gray-900 dark:border-gray-700 dark:text-gray-50">
						{equipment.description}
					</p>

					{equipment.requirementType && equipment.requirementLevel !== null && (
						<ItemDetail
							label={`${equipment.requirementType} Level`}
							details={equipment.requirementLevel.toString()}
						/>
					)}

					{equipment.source && equipment.source.length > 0 && (
						<ItemDetail label="Source" details={equipment.source.join(", ")} />
					)}

					{(equipment.windmillCompatable || equipment.solarPanelCompatable) && (
						<ItemDetail
							label="Compatible with"
							details={[
								equipment.windmillCompatable ? "Windmill" : "",
								equipment.solarPanelCompatable ? "Solar Panel" : "",
							]
								.filter(Boolean)
								.join(", ")}
						/>
					)}

					{(equipment.shinyDiscCount || equipment.berkoniumOreCount) && (
						<ItemFranklyn
							shinyDiscCount={equipment.shinyDiscCount}
							berkoniumOreCount={equipment.berkoniumOreCount}
						/>
					)}

					{equipment.inputs && equipment.inputs.length > 0 && (
						<ItemResources
							id={equipment.id}
							label="Resources"
							items={equipment.inputs}
						/>
					)}

					{equipment.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={equipment.buyPrice} />
					)}

					{equipment.baseSellPrice !== null && (
						<DinkValue
							label="Sell Price"
							price={equipment.baseSellPrice}
							showCommerceLicenses
						/>
					)}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={equipment.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default EquipmentCard;
