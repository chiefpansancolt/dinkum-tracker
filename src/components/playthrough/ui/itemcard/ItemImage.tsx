/* eslint-disable @next/next/no-img-element */
import { ItemImageProps } from "@/types";
import { HiCheck } from "react-icons/hi2";

const ItemImage = ({ src, name, isCollected }: ItemImageProps) => {
	return (
		<div className="flex items-center justify-center py-4">
			<div className="relative h-24 w-24">
				<img src={src} alt={name} className="h-full w-full object-contain" />
				{isCollected && (
					<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
						<HiCheck className="h-4 w-4" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemImage;
