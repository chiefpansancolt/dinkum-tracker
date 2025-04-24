/* eslint-disable @next/next/no-img-element */
import { ItemFranklynProps, ResourceItemProps, Resource } from "@/types";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

const Item = ({ input, isVariantUsage = false }: ResourceItemProps) => {
	return (
		<div
			className={twMerge(
				"flex items-center gap-2 rounded-lg p-2",
				isVariantUsage ? "bg-white dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-900"
			)}
		>
			{input.img && (
				<img src={input.img} alt={input.name} className="h-6 w-6 object-contain" />
			)}
			<span className="text-sm">
				{input.count}x {input.name}
			</span>
		</div>
	);
};

const ItemFranklyn = ({ shinyDiscCount, berkoniumOreCount }: ItemFranklynProps) => {
	const shinyDisc: Resource = {
		name: "Shiny Disc",
		count: shinyDiscCount || 0,
		img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png",
	};

	const berkonium: Resource = {
		name: "Berkonium Ore",
		count: berkoniumOreCount || 0,
		img: "https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Berkonium_Ore.png",
	};

	return (
		<div className="flex flex-col">
			<p className="mb-2 font-medium">Unlocks After:</p>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{shinyDiscCount && <Item input={shinyDisc} />}
				{berkoniumOreCount && <Item input={berkonium} />}
			</div>
		</div>
	);
};

export default ItemFranklyn;
