import React from "react";
import { ItemResourcesProps, ItemsListProps, ResourceItemProps } from "@/types";

const Item = ({ input }: ResourceItemProps) => {
	return (
		<div className="flex items-center gap-2 rounded-lg bg-gray-400 p-2 dark:bg-gray-900">
			{input.img && (
				<img src={input.img} alt={input.name} className="h-6 w-6 object-contain" />
			)}
			<span className="text-sm">
				{input.count}x {input.name}
			</span>
		</div>
	);
};

const ItemsList = ({ id, inputs }: ItemsListProps) => {
	return (
		<div className="grid grid-cols-2 gap-2">
			{inputs.map((input, idx) => (
				<Item key={`${id}-${idx}`} input={input} />
			))}
		</div>
	);
};

const ItemResources = ({ id, label, items, variants }: ItemResourcesProps) => {
	return (
		<div className="mt-auto">
			<div className="mb-2 font-medium">{label}:</div>
			{variants && variants.length === 1 ? (
				<ItemsList id={id} inputs={variants[0].inputs} />
			) : variants ? (
				<div className="max-h-60 overflow-y-auto">
					{variants.map((variant, variantIndex) => (
						<div
							key={`${id}-variant-${variantIndex}`}
							className="mb-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
						>
							<p className="mb-1 font-medium">
								Option {variantIndex + 1}:
								{variant.outputCount && (
									<span className="ml-1 text-xs text-gray-500">
										(x{variant.outputCount})
									</span>
								)}
							</p>
							<div className="ml-2">
								<ItemsList
									id={`${id}-variant-${variantIndex}-input`}
									inputs={variant.inputs}
								/>
							</div>
						</div>
					))}
				</div>
			) : items ? (
				<ItemsList id={id} inputs={items} />
			) : null}
		</div>
	);
};

export default ItemResources;
