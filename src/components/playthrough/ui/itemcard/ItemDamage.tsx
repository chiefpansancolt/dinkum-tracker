import Image from "next/image";
import { ItemDamageProps } from "@/types";

const ItemDamage = ({ label, damage }: ItemDamageProps) => {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-4 font-medium">{label}:</div>
			<div className="col-span-8 flex items-center">
				<span className="mr-1">+{damage}</span>
				<Image
					src="/images/other/Attack_Buff.png"
					alt="Attack"
					width={20}
					height={20}
					className="w-5"
				/>
			</div>
		</div>
	);
};

export default ItemDamage;
