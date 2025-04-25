/* eslint-disable @next/next/no-img-element */
import { ItemDamageProps } from "@/types";

const ItemDamage = ({ label, damage }: ItemDamageProps) => {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-4 font-medium">{label}:</div>
			<div className="col-span-8 flex items-center">
				<span className="mr-1">+{damage}</span>
				<img
					src="https://static.wikia.nocookie.net/dinkum/images/3/32/Attack_Buff.png"
					alt="Attack"
					className="w-5"
				/>
			</div>
		</div>
	);
};

export default ItemDamage