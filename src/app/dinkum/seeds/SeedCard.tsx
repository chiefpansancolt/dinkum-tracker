import { Badge } from "flowbite-react";
import { CollectionCardProps } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

const SeedCard = ({ record }: CollectionCardProps) => {
	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={record.name}
					renderRightComp={() =>
						record.category ? <Badge color="indigo">{record.category}</Badge> : null
					}
				/>
			)}
			renderImage={() => (
				<ItemImage src={record.img} name={record.name} isCollected={false} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{record.season && record.season.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seasons:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{record.season.map((season: string, index: number) => (
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

					{record.growthPeriod && (
						<ItemDetail label="Growth Period" details={`${record.growthPeriod} days`} />
					)}

					{record.regrowth && (
						<ItemDetail label="Regrowth" details={`${record.regrowth} days`} />
					)}

					{(record.outputCountMin || record.outputCountMax) && (
						<ItemDetail
							label="Output Count"
							details={
								record.outputCountMin === record.outputCountMax
									? `${record.outputCountMin}`
									: `${record.outputCountMin || "?"}-${record.outputCountMax || "?"}`
							}
						/>
					)}

					{record.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={record.buyPrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={record.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{record.source && record.source.length > 0 && (
						<ItemDetail label="Source" details={record.source.join(", ")} />
					)}
				</div>
			)}
		/>
	);
};

export default SeedCard;
