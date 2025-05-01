import { Badge } from "flowbite-react";
import { Crop } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemBuffs from "@/playthrough/ui/itemcard/ItemBuffs";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

interface CropCardProps {
	crop: Crop;
}

const CropCard = ({ crop }: CropCardProps) => {
	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={crop.name} />}
			renderImage={() => <ItemImage src={crop.img} name={crop.name} isCollected={false} />}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{crop.seed && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seed:</div>
							<div className="col-span-8">
								<div className="flex items-center">
									{crop.seed.img && (
										<img
											src={crop.seed.img}
											alt={crop.seed.name}
											className="mr-1 h-5 w-5 object-contain"
										/>
									)}
									<span>{crop.seed.name}</span>
								</div>
							</div>
						</div>
					)}

					{crop.seed && crop.seed.season && crop.seed.season.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seasons:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{crop.seed.season.map((season, index) => (
										<Badge
											key={`${crop.id}-season-${index}`}
											color={
												season === "Spring"
													? "success"
													: season === "Summer"
														? "warning"
														: season === "Autumn"
															? "orange"
															: "info"
											}
											className="mr-1"
										>
											{season}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}

					{crop.seed && crop.seed.growthPeriod && (
						<ItemDetail
							label="Growth Period"
							details={`${crop.seed.growthPeriod} days`}
						/>
					)}

					{crop.seed && crop.seed.regrowth && (
						<ItemDetail label="Regrowth" details={`${crop.seed.regrowth} days`} />
					)}

					{crop.seed && (crop.seed.outputCountMin || crop.seed.outputCountMax) && (
						<ItemDetail
							label="Output Count"
							details={
								crop.seed.outputCountMin === crop.seed.outputCountMax
									? `${crop.seed.outputCountMin}`
									: `${crop.seed.outputCountMin || "?"}-${
											crop.seed.outputCountMax || "?"
										}`
							}
						/>
					)}

					<DinkValue
						label="Sell Price"
						price={crop.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{crop.source && crop.source.length > 0 && (
						<ItemDetail label="Source" details={crop.source.join(", ")} />
					)}

					{crop.buffs && Object.keys(crop.buffs).length > 0 && (
						<ItemBuffs id={crop.id} buffs={crop.buffs} />
					)}
				</div>
			)}
		/>
	);
};

export default CropCard;
