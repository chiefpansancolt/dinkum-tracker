/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, Checkbox, Badge, Label } from "flowbite-react";
import { CollectionItemProps, Fish } from "@/types/dinkum";

const getRarityColor = (rarity: string) => {
	switch (rarity) {
		case "Very Rare":
			return "purple";
		case "Super Rare":
			return "indigo";
		case "Rare":
			return "red";
		case "Uncommon":
			return "blue";
		default:
			return "gray";
	}
};

const CollectionItem: React.FC<CollectionItemProps> = ({
	item,
	isCollected,
	isDonated,
	onCollectedChange,
	onDonatedChange,
}) => {
	const isFish = "cookedPrice" in item;

	const handleDonatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isDonated = e.target.checked;

		if (isDonated && !isCollected) {
			onCollectedChange(item.id, true);
		}

		onDonatedChange(item.id, isDonated);
	};

	return (
		<Card className="flex h-full flex-col">
			<div className="flex items-start justify-between">
				<div className="flex items-center space-x-2">
					<h3 className="text-lg font-medium">{item.name}</h3>
					<Badge color={getRarityColor(item.rarity)} className="ml-2">
						{item.rarity}
					</Badge>
				</div>
			</div>

			<div className="mt-3 flex items-center justify-center py-2">
				{item.img && (
					<div className="relative h-16 w-16">
						<img
							src={item.img}
							alt={item.name}
							className="h-full w-full object-contain"
						/>
					</div>
				)}
			</div>

			<div className="mt-2 grid grid-cols-2 gap-1 text-sm">
				<div>
					<p className="font-medium">Biome:</p>
					<p>{item.biome.join(", ")}</p>
				</div>
				<div>
					<p className="font-medium">Seasons:</p>
					<p>{item.seasons.join(", ")}</p>
				</div>
				<div>
					<p className="font-medium">Time:</p>
					<p>{item.timeFound.join(", ")}</p>
				</div>
				<div className="flex items-center">
					<p className="mr-1 font-medium">Price:</p>
					<div className="flex items-center">
						<img
							src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
							alt="Dinks"
							className="mr-1 h-4 w-4"
						/>
						<span>{item.basePrice.toLocaleString()}</span>
					</div>
				</div>
				{isFish && (
					<div className="col-span-2 flex items-center">
						<p className="mr-1 font-medium">Cooked:</p>
						<div className="flex items-center">
							<img
								src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
								alt="Dinks"
								className="mr-1 h-4 w-4"
							/>
							<span>
								{(item as Fish).cookedPrice.toLocaleString()} (
								{(item as Fish).cookedPieces} piece
								{(item as Fish).cookedPieces > 1 ? "s" : ""})
							</span>
						</div>
					</div>
				)}
			</div>

			<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
				<div className="mb-2 flex items-center">
					<Checkbox
						id={`collected-${item.id}`}
						checked={isCollected}
						onChange={(e) => onCollectedChange(item.id, e.target.checked)}
						className="mr-2"
					/>
					<Label htmlFor={`collected-${item.id}`} className="cursor-pointer">
						Captured
					</Label>
				</div>
				<div className="flex items-center">
					<Checkbox
						id={`donated-${item.id}`}
						checked={isDonated}
						onChange={handleDonatedChange}
						className="mr-2"
					/>
					<Label htmlFor={`donated-${item.id}`} className="cursor-pointer">
						Donated to Museum
					</Label>
				</div>
			</div>
		</Card>
	);
};

export default CollectionItem;
