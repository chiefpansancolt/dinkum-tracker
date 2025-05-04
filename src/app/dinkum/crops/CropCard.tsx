import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemBuffs from "@/playthrough/ui/itemcard/ItemBuffs";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const CropCard = ({ record }: CollectionCardProps) => {
	return (
		<ItemCard
			renderHeader={() => <ItemHeader title={record.name} />}
			renderImage={() => (
				<ItemImage src={record.img} name={record.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{record.seed && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seed:</div>
							<div className="col-span-8">
								<div className="flex items-center">
									{record.seed.img && (
										<img
											src={record.seed.img}
											alt={record.seed.name}
											className="mr-1 h-5 w-5 object-contain"
										/>
									)}
									<span>{record.seed.name}</span>
								</div>
							</div>
						</div>
					)}

					{record.seed && record.seed.season && record.seed.season.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seasons:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{record.seed.season.map((season: string, index: number) => (
										<Badge
											key={`${record.id}-season-${index}`}
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

					{record.seed && record.seed.growthPeriod && (
						<ItemDetail
							label="Growth Period"
							details={`${record.seed.growthPeriod} days`}
						/>
					)}

					{record.seed && record.seed.regrowth && (
						<ItemDetail label="Regrowth" details={`${record.seed.regrowth} days`} />
					)}

					{record.seed && (record.seed.outputCountMin || record.seed.outputCountMax) && (
						<ItemDetail
							label="Output Count"
							details={
								record.seed.outputCountMin === record.seed.outputCountMax
									? `${record.seed.outputCountMin}`
									: `${record.seed.outputCountMin || "?"}-${
											record.seed.outputCountMax || "?"
										}`
							}
						/>
					)}

					<DinkValue
						label="Sell Price"
						price={record.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{record.source && record.source.length > 0 && (
						<ItemDetail label="Source" details={record.source.join(", ")} />
					)}

					{record.buffs && Object.keys(record.buffs).length > 0 && (
						<ItemBuffs id={record.id} buffs={record.buffs} />
					)}
				</div>
			)}
		/>
	);
};

export default CropCard;
