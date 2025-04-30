import { Badge } from "flowbite-react";
import { HiCalendarDays, HiClock } from "react-icons/hi2";
import { Building, CollectionCardProps } from "@/types";
import { DeedTypes } from "@/data/constants";
import { getDeedBadgeColor } from "@/data/dinkum";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";

const BuildingCard = ({ record, isCollected = false, onToggleCollected }: CollectionCardProps) => {
	const building = record as Building;
	const isCollectable = building.deedType === DeedTypes.Collectable;
	const hasOperatingHours = building.operatingHours && building.operatingHours.length > 0;

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={building.name}
					renderRightComp={() => (
						<Badge color={getDeedBadgeColor(building.deedType)}>
							{building.deedType}
						</Badge>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={building.img} name={building.name} isCollected={isCollected} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{building.deedName && <ItemDetail label="Deed" details={building.deedName} />}

					{building.npc && (
						<ItemDetail
							label="NPC"
							details={building.npc}
							iconComp={() =>
								building.npcImg && (
									<img
										src={building.npcImg}
										alt={building.npc}
										className="h-5 w-5 object-contain"
									/>
								)
							}
						/>
					)}

					{building.size && <ItemDetail label="Size" details={building.size} />}

					{building.buildTime && (
						<ItemDetail label="Build Time" details={building.buildTime} />
					)}

					{building.deedPrice > 0 && (
						<DinkValue label="Deed Price" price={building.deedPrice} />
					)}

					{hasOperatingHours && (
						<ItemDetail
							label="Hours"
							details={building.operatingHours.join(", ")}
							iconComp={() => <HiClock className="h-4 w-4" />}
						/>
					)}

					{building.daysClosed && (
						<ItemDetail
							label="Closed"
							details={building.daysClosed}
							iconComp={() => <HiCalendarDays className="h-4 w-4" />}
						/>
					)}

					<ItemDetail label="Description" details={building.description} />

					{building.inputs.length > 0 && (
						<ItemResources id={building.id} label="Resources" items={building.inputs} />
					)}
				</div>
			)}
			renderFooter={() =>
				isCollectable && (
					<ItemFooter
						id={building.id}
						leftLabel="Installed"
						isLeftChecked={isCollected}
						handleLeftToggle={(id, checked) => onToggleCollected?.(id, checked)}
					/>
				)
			}
		/>
	);
};

export default BuildingCard;
