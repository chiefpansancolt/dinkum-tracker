/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ItemResourcesProps, ItemsListProps, ResourceItemProps } from "@/types";
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

const ItemsList = ({ id, inputs, isVariantUsage = false }: ItemsListProps) => {
	return (
		<div className="grid grid-cols-2 gap-2">
			{inputs.map((input, idx) => (
				<Item key={`${id}-${idx}`} input={input} isVariantUsage={isVariantUsage} />
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
							className="mb-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
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
									isVariantUsage={true}
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
