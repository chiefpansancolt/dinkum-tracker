import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { Weapon, CollectionCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemDamage from "@/playthrough/ui/itemcard/ItemDamage";

const WeaponCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const weapon = record as Weapon;
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const isCraftable = weapon.source.includes("Crafting Table");

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={weapon.name}
					renderRightComp={() =>
						isCraftable && (
							<Button
								as={Link}
								href={`/playthrough/${playthroughId}/craftingRecipes?q=${encodeURIComponent(weapon.name)}`}
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
				<ItemImage src={weapon.img} name={weapon.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{weapon.licenceLevel !== null && (
						<ItemDetail
							label="Hunting License Level"
							details={weapon.licenceLevel.toString()}
						/>
					)}

					{weapon.source && weapon.source.length > 0 && (
						<ItemDetail label="Source" details={weapon.source.join(", ")} />
					)}

					{weapon.damage && <ItemDamage label="Damage" damage={weapon.damage} />}

					{weapon.inputs && weapon.inputs.length > 0 && (
						<ItemResources id={weapon.id} label="Resources" items={weapon.inputs} />
					)}

					{weapon.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={weapon.buyPrice} />
					)}

					{weapon.baseSellPrice !== null && (
						<DinkValue
							label="Sell Price"
							price={weapon.baseSellPrice}
							showCommerceLicenses
						/>
					)}
				</div>
			)}
			renderFooter={() => (
				<ItemFooter
					id={weapon.id}
					leftLabel="Collected"
					isLeftChecked={isCollected}
					handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
				/>
			)}
		/>
	);
};

export default WeaponCard;
