import { ItemDetailProps } from "@/types";

const ItemDetail = ({ label, details, iconComp }: ItemDetailProps) => {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-4 font-medium">{label}:</div>
			<div className="col-span-8 flex items-center whitespace-pre-line">
				{iconComp && iconComp()}
				<span className="ml-1">{details}</span>
			</div>
		</div>
	);
};

export default ItemDetail;
