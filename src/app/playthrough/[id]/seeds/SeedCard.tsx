import { Badge } from "flowbite-react";
import { Seed } from "@/types";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";

interface SeedCardProps {
	seed: Seed;
}

const SeedCard = ({ seed }: SeedCardProps) => {
	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={seed.name}
					renderRightComp={() =>
						seed.category ? <Badge color="indigo">{seed.category}</Badge> : null
					}
				/>
			)}
			renderImage={() => <ItemImage src={seed.img} name={seed.name} isCollected={false} />}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{seed.season && seed.season.length > 0 && (
						<div className="grid grid-cols-12">
							<div className="col-span-4 font-medium">Seasons:</div>
							<div className="col-span-8">
								<div className="flex flex-wrap gap-1">
									{seed.season.map((season, index) => (
										<Badge
											key={`${seed.id}-season-${index}`}
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

					{seed.growthPeriod && (
						<ItemDetail label="Growth Period" details={`${seed.growthPeriod} days`} />
					)}

					{seed.regrowth && (
						<ItemDetail label="Regrowth" details={`${seed.regrowth} days`} />
					)}

					{(seed.outputCountMin || seed.outputCountMax) && (
						<ItemDetail
							label="Output Count"
							details={
								seed.outputCountMin === seed.outputCountMax
									? `${seed.outputCountMin}`
									: `${seed.outputCountMin || "?"}-${seed.outputCountMax || "?"}`
							}
						/>
					)}

					{seed.buyPrice !== undefined && (
						<DinkValue label="Buy Price" price={seed.buyPrice} />
					)}

					<DinkValue
						label="Sell Price"
						price={seed.baseSellPrice}
						showCommerceLicenses={true}
					/>

					{seed.source && seed.source.length > 0 && (
						<ItemDetail label="Source" details={seed.source.join(", ")} />
					)}
				</div>
			)}
		/>
	);
};

export default SeedCard;
