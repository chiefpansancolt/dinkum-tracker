import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { Vehicle, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemFranklyn from "@/playthrough/ui/itemcard/ItemFranklyn";

const VehicleCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const vehicle = record as Vehicle;
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const isCraftable = vehicle.source.includes("Crafting Table");

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={vehicle.name}
					renderRightComp={() =>
						isCraftable && (
							<Button
								as={Link}
								href={`/playthrough/${playthroughId}/craftingRecipes?q=${encodeURIComponent(vehicle.name)}`}
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
				<ItemImage src={vehicle.img} name={vehicle.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{vehicle.requirementType && vehicle.requirementLevel !== null && (
						<ItemDetail
							label={`${vehicle.requirementType} Level`}
							details={vehicle.requirementLevel.toString()}
						/>
					)}

					{vehicle.source && vehicle.source.length > 0 && (
						<ItemDetail label="Source" details={vehicle.source.join(", ")} />
					)}

					{(vehicle.windmillCompatable || vehicle.solarPanelCompatable) && (
						<ItemDetail
							label="Compatible with"
							details={[
								vehicle.windmillCompatable ? "Windmill" : "",
								vehicle.solarPanelCompatable ? "Solar Panel" : "",
							]
								.filter(Boolean)
								.join(", ")}
						/>
					)}

					{(vehicle.shinyDiscCount || vehicle.berkoniumOreCount) && (
						<ItemFranklyn
							shinyDiscCount={vehicle.shinyDiscCount}
							berkoniumOreCount={vehicle.berkoniumOreCount}
						/>
					)}

					{vehicle.inputs && vehicle.inputs.length > 0 && (
						<ItemResources id={vehicle.id} label="Ingredients" items={vehicle.inputs} />
					)}

					{vehicle.buyPrice && <DinkValue label="Buy Price" price={vehicle.buyPrice} />}

					<DinkValue
						label="Sell Price"
						price={vehicle.baseSellPrice}
						showCommerceLicenses
					/>
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={vehicle.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default VehicleCard;
