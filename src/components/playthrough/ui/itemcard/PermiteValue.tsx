/* eslint-disable @next/next/no-img-element */
import { PermitValueProps, DinkPriceProps } from "@/types";

const PermitPrice = ({ price }: DinkPriceProps) => {
	return (
		<div className="flex items-center">
			<span>{price.toLocaleString()}</span>
			<img
				src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
				alt="Permit Points"
				className="ml-1 w-4"
			/>
		</div>
	);
};

const PermiteValue = ({ label, price }: PermitValueProps) => {
	if (label) {
		return (
			<div className="grid grid-cols-12">
				<div className="col-span-4 font-medium">{label}:</div>
				<div className="col-span-8">
					<PermitPrice price={price} />
				</div>
			</div>
		);
	}

	return <PermitPrice price={price} />;
};

export default PermiteValue;
