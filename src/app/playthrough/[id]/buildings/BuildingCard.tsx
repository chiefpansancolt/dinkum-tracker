/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Badge } from "flowbite-react";
import { Building } from "@/types/dinkum";
import { getDeedBadgeColor } from "@/data/dinkum";
import { DeedTypes } from "@/data/constants";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import { HiClock, HiCalendarDays } from "react-icons/hi2";

interface BuildingCardProps {
	building: Building;
	isInstalled: boolean;
	onToggleInstalled: (id: string, isInstalled: boolean) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({
	building,
	isInstalled,
	onToggleInstalled,
}) => {
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
				<ItemImage src={building.img} name={building.name} isCollected={isInstalled} />
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
						isLeftChecked={isInstalled}
						handleLeftToggle={(id, checked) => onToggleInstalled(id, checked)}
					/>
				)
			}
		/>
	);
};

export default BuildingCard;
