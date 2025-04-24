import { ItemHeaderProps } from "@/types";

const ItemHeader = ({ title, renderRightComp }: ItemHeaderProps) => {
	return (
		<div className="mb-2 flex items-start justify-between">
			<h3 className="text-lg font-medium">{title}</h3>
			{renderRightComp && renderRightComp()}
		</div>
	);
};

export default ItemHeader;
