/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge, TextInput, Select } from "flowbite-react";
import { clothing, getClothingBySlot, getClothingByType, getClothingBySet } from "@/data/dinkum";
import { ClothingSlots } from "@/data/constants";
import { ClothingTabHandle, ClothingTabProps, ClothingSlot } from "@/types/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";

const ClothingTab = forwardRef<ClothingTabHandle, ClothingTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [slotFilter, setSlotFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [setFilter, setSetFilter] = useState<string>("All");
	const [localCollectionState, setLocalCollectionState] =
		useState<Record<string, boolean>>(collected);
	const [availableTypes, setAvailableTypes] = useState<string[]>([]);
	const [availableSets, setAvailableSets] = useState<string[]>([]);

	const isDirty = useRef(false);

	const uniqueSets = useMemo(() => {
		const sets = new Set<string>();
		clothing.forEach((item) => {
			if (item.set) {
				sets.add(item.set);
			}
		});
		return ["All", ...Array.from(sets).sort()];
	}, []);

	useEffect(() => {
		setLocalCollectionState(collected);
		isDirty.current = false;
	}, [collected]);

	useEffect(() => {
		setAvailableSets(uniqueSets);
	}, [uniqueSets]);

	useEffect(() => {
		if (slotFilter === "All") {
			setAvailableTypes(["All"]);
			setTypeFilter("All");
		} else {
			const types = ClothingSlots[slotFilter as ClothingSlot] || [];
			setAvailableTypes(["All", ...types]);
			setTypeFilter("All");
		}
	}, [slotFilter]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalCollectionState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const saveClothing = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			clothing: localCollectionState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		saveClothing,
	}));

	const filteredClothing = useMemo(() => {
		let filtered = [...clothing];

		if (slotFilter !== "All") {
			filtered = getClothingBySlot(slotFilter as ClothingSlot);
		}

		if (typeFilter !== "All") {
			filtered = getClothingByType(typeFilter);
		}

		if (setFilter !== "All") {
			filtered = getClothingBySet(setFilter);
		}

		if (searchQuery) {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		return filtered;
	}, [slotFilter, typeFilter, setFilter, searchQuery]);

	const collectedCount = Object.keys(localCollectionState).filter(
		(id) => localCollectionState[id]
	).length;

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Clothing ({collectedCount} / {clothing.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((collectedCount / clothing.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your clothing collection has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-10">
				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="slot-filter">Slot</Label>
					</div>
					<Select
						id="slot-filter"
						value={slotFilter}
						onChange={(e) => setSlotFilter(e.target.value)}
					>
						<option value="All">All Slots</option>
						{Object.keys(ClothingSlots).map((slot) => (
							<option key={slot} value={slot}>
								{slot}
							</option>
						))}
					</Select>
				</div>

				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="type-filter">Type</Label>
					</div>
					<Select
						id="type-filter"
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
					>
						{availableTypes.map((type) => (
							<option key={type} value={type}>
								{type === "All" ? "All Types" : type}
							</option>
						))}
					</Select>
				</div>

				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="set-filter">Set</Label>
					</div>
					<Select
						id="set-filter"
						value={setFilter}
						onChange={(e) => setSetFilter(e.target.value)}
					>
						{availableSets.map((set) => (
							<option key={set} value={set}>
								{set === "All" ? "All Sets" : set}
							</option>
						))}
					</Select>
				</div>

				<div className="col-span-1 md:col-span-4">
					<div className="mb-2 block">
						<Label htmlFor="search-clothing">Search</Label>
					</div>
					<TextInput
						id="search-clothing"
						type="text"
						icon={HiSearch}
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="mb-4">
				<p className="text-primary font-medium">
					Showing {filteredClothing.length} of {clothing.length} clothing items •
					Collected: {collectedCount}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredClothing.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No clothing items match your filter criteria. Try adjusting your
							filters.
						</p>
					</Card>
				) : (
					filteredClothing.map((item) => {
						const isCollected = localCollectionState[item.id] === true;

						return (
							<Card
								key={item.id}
								className={`${isCollected ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">{item.name}</h3>
										<Badge color="purple">{item.type}</Badge>
									</div>

									<div className="flex items-center justify-center py-2">
										{item.img && (
											<div className="relative h-20 w-20">
												<img
													src={item.img}
													alt={item.name}
													className="h-full w-full object-contain"
												/>
												{isCollected && (
													<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
														<HiCheck className="h-4 w-4" />
													</div>
												)}
											</div>
										)}
									</div>

									<div className="mt-2 flex-grow space-y-2 text-sm">
										<div className="flex">
											<p className="w-32 font-medium">Slot:</p>
											<p>{item.slot.join(", ")}</p>
										</div>

										{item.set && (
											<div className="flex">
												<p className="w-32 font-medium">Set:</p>
												<p>{item.set}</p>
											</div>
										)}

										{item.displayPrice !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{item.displayPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}

										<div className="flex items-center">
											<p className="w-32 font-medium">Sell Price:</p>
											<div className="flex items-center">
												<img
													src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
													alt="Dinks"
													className="mr-1 h-4 w-4"
												/>
												<span>
													{item.baseSellingPrice.toLocaleString()}
												</span>
											</div>
										</div>

										{item.cloversCatalogue && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Available at:</p>
												<span className="text-purple-600 dark:text-purple-400">
													Clover&apos;s Shop
												</span>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`collected-${item.id}`}
												checked={isCollected}
												onChange={(e) =>
													handleToggleCollected(item.id, e.target.checked)
												}
												className="mr-2"
											/>
											<Label
												htmlFor={`collected-${item.id}`}
												className="cursor-pointer"
											>
												Collected
											</Label>
										</div>
									</div>
								</div>
							</Card>
						);
					})
				)}
			</div>
		</div>
	);
});

ClothingTab.displayName = "ClothingTab";

export default ClothingTab;
