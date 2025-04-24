/* eslint-disable @next/next/no-img-element */
import { DinkValueProps, DinkPriceProps } from "@/types";
import { Popover } from "flowbite-react";

const DinkPrice = ({ price }: DinkPriceProps) => {
	return (
		<div className="flex items-center">
			<img
				src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
				alt="Dinks"
				className="mr-1 h-4 w-4"
			/>
			<span>{price.toLocaleString()}</span>
		</div>
	)
}

const CommerceContent = ({ price }: DinkPriceProps) => {
	const commerceLevel1Price = Math.round(price * 1.05);
	const commerceLevel2Price = Math.round(price * 1.1);
	const commerceLevel3Price = Math.round(price * 1.15);

	return (
		<div className="w-64 p-2">
			<h3 className="mb-2 pb-2 border-b border-gray-200 font-medium dark:border-gray-700">
				Commerce License Pricing
			</h3>
			<div className="space-y-1">
				<div className="grid grid-cols-12">
					<div className="col-span-8 font-medium">Base Price:</div>
					<DinkPrice price={price} />
				</div>
				<div className="grid grid-cols-12">
					<div className="col-span-8 font-medium">Commerce Lv.1 (+5%):</div>
					<DinkPrice price={commerceLevel1Price} />
				</div>
				<div className="grid grid-cols-12">
					<div className="col-span-8 font-medium">Commerce Lv.2 (+10%):</div>
					<DinkPrice price={commerceLevel2Price} />
				</div>
				<div className="grid grid-cols-12">
					<div className="col-span-8 font-medium">Commerce Lv.3 (+15%):</div>
					<DinkPrice price={commerceLevel3Price} />
				</div>
			</div>
		</div>
	);
};

const DinkValue = ({
	label,
	price,
	showCommerceLicenses = false,
}: DinkValueProps) => {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-4 font-medium">{label}:</div>
			<div className="col-span-8">
				{showCommerceLicenses ? (
					<Popover
						trigger="hover"
						placement="top"
						content={<CommerceContent price={price} />}
					>
						<a className="cursor-pointer">
							<DinkPrice price={price} />
						</a>
					</Popover>
				) : (
					<DinkPrice price={price} />
				)}
			</div>
		</div>
	);
};

export default DinkValue;
