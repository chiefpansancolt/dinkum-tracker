"use client";

import { Card, Label } from "flowbite-react";
import { useMemo, useState } from "react";
import { weightItems } from "@/data/dinkum/weightItems";
import TabHeader from "@/playthrough/ui/TabHeader";

export default function CalculatorPage() {
	const [selectedItemId, setSelectedItemId] = useState<string>(weightItems[0]?.id || "");
	const [weight, setWeight] = useState<number>(weightItems[0]?.minWeight || 0);

	const selectedItem = useMemo(() => {
		return weightItems.find((item) => item.id === selectedItemId);
	}, [selectedItemId]);

	const calculatedPrice = useMemo(() => {
		if (!selectedItem) return 0;
		return Math.round(selectedItem.pricePerKg * weight);
	}, [selectedItem, weight]);

	const handleItemChange = (itemId: string) => {
		setSelectedItemId(itemId);
		const item = weightItems.find((i) => i.id === itemId);
		if (item) {
			setWeight(item.minWeight);
		}
	};

	const handleWeightChange = (value: number) => {
		if (!isNaN(value) && selectedItem) {
			const constrainedValue = Math.min(
				Math.max(value, selectedItem.minWeight),
				selectedItem.maxWeight
			);
			setWeight(constrainedValue);
		}
	};

	if (!selectedItem) {
		return (
			<div className="space-y-6 p-6">
				<TabHeader
					title="Weight Calculator"
					enableCollectionCount={false}
					enableSaveAlert={false}
				/>
				<div className="text-center">No weight items available.</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-6">
			<TabHeader
				title="Weight Calculator"
				enableCollectionCount={false}
				enableSaveAlert={false}
			/>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Left Side - Item Selection Grid */}
				<div className="lg:col-span-1">
					<Card>
						<h3 className="mb-4 text-lg font-semibold dark:text-white">Select Item</h3>
						<div className="grid grid-cols-3 gap-3">
							{weightItems.map((item) => (
								<button
									key={item.id}
									onClick={() => handleItemChange(item.id)}
									className={`flex flex-col items-center rounded-lg border-2 p-3 transition-all hover:scale-105 ${
										selectedItemId === item.id
											? "border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-900/20"
											: "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
									}`}
								>
									<img
										src={item.img}
										alt={item.name}
										className="h-16 w-16 object-contain"
									/>
									<span className="mt-2 text-center text-xs font-medium dark:text-white">
										{item.name}
									</span>
								</button>
							))}
						</div>
					</Card>
				</div>

				{/* Right Side - Details and Calculator */}
				<div className="lg:col-span-2">
					<Card>
						<div className="space-y-6">
							{/* Item Display */}
							<div className="flex flex-col items-center space-y-4 border-b border-gray-200 pb-6 dark:border-gray-700">
								<img
									src={selectedItem.img}
									alt={selectedItem.name}
									className="h-32 w-32 object-contain"
								/>
								<div className="text-center">
									<h3 className="text-2xl font-semibold dark:text-white">
										{selectedItem.name}
									</h3>
									<div className="mt-2 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
											alt="Dinks"
											className="mr-1 h-4 w-4"
										/>
										<span>{selectedItem.pricePerKg.toLocaleString()} per kg</span>
									</div>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										Weight Range: {selectedItem.minWeight}kg - {selectedItem.maxWeight}kg
									</p>
								</div>
							</div>

							{/* Weight Slider */}
							<div>
								<Label htmlFor="weight-slider" className="mb-2 block">
									Weight: {weight.toFixed(2)}kg
								</Label>
								<input
									id="weight-slider"
									type="range"
									min={selectedItem.minWeight}
									max={selectedItem.maxWeight}
									step="0.01"
									value={weight}
									onChange={(e) => handleWeightChange(parseFloat(e.target.value))}
									className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
									style={{
										background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
											((weight - selectedItem.minWeight) /
												(selectedItem.maxWeight - selectedItem.minWeight)) *
											100
										}%, #e5e7eb ${
											((weight - selectedItem.minWeight) /
												(selectedItem.maxWeight - selectedItem.minWeight)) *
											100
										}%, #e5e7eb 100%)`,
									}}
								/>
								<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
									<span>{selectedItem.minWeight}kg</span>
									<span>{selectedItem.maxWeight}kg</span>
								</div>
							</div>

							{/* Calculated Price */}
							<div className="rounded-lg bg-cyan-50 p-6 dark:bg-cyan-900/20">
								<div className="text-center">
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
										Total Price
									</p>
									<div className="mt-2 flex items-center justify-center text-4xl font-bold text-cyan-600 dark:text-cyan-400">
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
											alt="Dinks"
											className="mr-3 h-10 w-10"
										/>
										<span>{calculatedPrice.toLocaleString()}</span>
									</div>
									<div className="mt-3 flex items-center justify-center text-xs text-gray-500 dark:text-gray-500">
										<span>{weight.toFixed(2)}kg × </span>
										<img
											src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
											alt="Dinks"
											className="mx-1 h-3 w-3"
										/>
										<span>{selectedItem.pricePerKg.toLocaleString()}/kg</span>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
