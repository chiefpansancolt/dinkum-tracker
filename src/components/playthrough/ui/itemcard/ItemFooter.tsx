import { Checkbox, Label } from "flowbite-react";
import { ItemFooterProps } from "@/types";

const ItemFooter = ({
	id,
	showRightCheckbox = false,
	leftLabel,
	isLeftChecked,
	handleLeftToggle,
	rightLabel,
	isRightChecked,
	handleRightToggle,
}: ItemFooterProps) => {
	const leftElementId = `left-element-${id}`;
	const rightElementId = `right-element-${id}`;
	return (
		<div className="mt-4 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
			<div className="flex items-center">
				<Checkbox
					id={leftElementId}
					checked={isLeftChecked}
					onChange={(e) => handleLeftToggle(id, e.target.checked)}
					className="mr-2"
				/>
				<Label htmlFor={leftElementId} className="cursor-pointer">
					{leftLabel}
				</Label>
			</div>
			{showRightCheckbox && (
				<div className="flex items-center">
					<Label htmlFor={rightElementId} className="cursor-pointer">
						{rightLabel}
					</Label>
					<Checkbox
						id={rightElementId}
						checked={isRightChecked}
						onChange={(e) => handleRightToggle?.(id, e.target.checked)}
						className="ml-2"
					/>
				</div>
			)}
		</div>
	);
};

export default ItemFooter;
