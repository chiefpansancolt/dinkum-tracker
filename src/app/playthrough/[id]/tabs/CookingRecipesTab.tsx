/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import {
	Card,
	Checkbox,
	Label,
	Badge,
	TextInput,
	Select,
	Button,
	ToggleSwitch,
} from "flowbite-react";
import { cookingRecipes } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck, HiFilter, HiX } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";
import { BuffIcons } from "@/data/constants/buffIcons";
import { CookingRecipesTabHandle, CookingRecipesTabProps } from "@/types/dinkum";

const CookingRecipesTab = forwardRef<CookingRecipesTabHandle, CookingRecipesTabProps>(
	({ unlocked }, ref) => {
		const params = useParams();
		const playthroughId = typeof params.id === "string" ? params.id : "";
		const [searchQuery, setSearchQuery] = useState("");
		const [locationFilter, setLocationFilter] = useState<string>("All");
		const [selectedBuffs, setSelectedBuffs] = useState<string[]>([]);
		const [matchAllBuffs, setMatchAllBuffs] = useState<boolean>(false);
		const [showBuffFilter, setShowBuffFilter] = useState<boolean>(false);
		const [localRecipesState, setLocalRecipesState] =
			useState<Record<string, boolean>>(unlocked);

		const isDirty = useRef(false);

		const uniqueLocations = useMemo(() => {
			const locations = new Set<string>();
			cookingRecipes.forEach((recipe) => {
				if (recipe.cookingLocation && recipe.cookingLocation.length > 0) {
					recipe.cookingLocation.forEach((loc) => locations.add(loc));
				}
			});
			return ["All", ...Array.from(locations).sort()];
		}, []);

		const uniqueBuffs = useMemo(() => {
			const buffs = new Set<string>();
			cookingRecipes.forEach((recipe) => {
				if (recipe.buffs) {
					Object.keys(recipe.buffs).forEach((buff) => {
						if (buff !== "length") {
							buffs.add(buff);
						}
					});
				}
			});
			return Array.from(buffs).sort();
		}, []);

		useEffect(() => {
			setLocalRecipesState(unlocked);
			isDirty.current = false;
		}, [unlocked]);

		const handleToggleUnlocked = (id: string, isUnlocked: boolean) => {
			setLocalRecipesState((prev) => ({
				...prev,
				[id]: isUnlocked,
			}));

			isDirty.current = true;
		};

		const saveCookingRecipes = () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				cookingRecipes: localRecipesState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		};

		useImperativeHandle(ref, () => ({
			saveCookingRecipes,
		}));

		const toggleBuffFilter = (buffName: string) => {
			setSelectedBuffs((prev) => {
				if (prev.includes(buffName)) {
					return prev.filter((b) => b !== buffName);
				} else {
					return [...prev, buffName];
				}
			});
		};

		const clearAllBuffFilters = () => {
			setSelectedBuffs([]);
		};

		const getBuffIcon = (
			buffName: string,
			value?: number
		): { icon: string; level?: number } => {
			if (value) {
				if (buffName === "attackLevel" && value <= 3) {
					return {
						icon: BuffIcons[`attackLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "defenseLevel" && value <= 3) {
					return {
						icon: BuffIcons[`defenseLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "experienceLevel" && value <= 3) {
					return {
						icon: BuffIcons[`experienceLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "fishLevel" && value <= 3) {
					return {
						icon: BuffIcons[`fishLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "foragingLevel" && value <= 3) {
					return {
						icon: BuffIcons[`foragingLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "miningLevel" && value <= 3) {
					return {
						icon: BuffIcons[`miningLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "speedLevel" && value <= 3) {
					return {
						icon: BuffIcons[`speedLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "swimmingLevel" && value <= 3) {
					return {
						icon: BuffIcons[`swimmingLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				} else if (buffName === "fastHealthTickSpeedLevel" && value <= 2) {
					return {
						icon: BuffIcons[
							`fastHealthTickSpeedLevel${value}` as keyof typeof BuffIcons
						],
						level: value,
					};
				} else if (buffName === "coolLevel" && value <= 2) {
					return {
						icon: BuffIcons[`coolLevel${value}` as keyof typeof BuffIcons],
						level: value,
					};
				}
			}

			return { icon: BuffIcons[buffName as keyof typeof BuffIcons] };
		};

		const filteredRecipes = useMemo(() => {
			return cookingRecipes.filter((recipe) => {
				if (locationFilter !== "All" && !recipe.cookingLocation.includes(locationFilter)) {
					return false;
				}

				if (selectedBuffs.length > 0) {
					if (!recipe.buffs || Object.keys(recipe.buffs).length <= 1) {
						return false;
					}

					if (matchAllBuffs) {
						const hasAllBuffs = selectedBuffs.every(
							(buff) =>
								recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
						);
						if (!hasAllBuffs) return false;
					} else {
						const hasAnyBuff = selectedBuffs.some(
							(buff) =>
								recipe.buffs && recipe.buffs[buff as keyof typeof recipe.buffs]
						);
						if (!hasAnyBuff) return false;
					}
				}

				if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
					return false;
				}

				return true;
			});
		}, [locationFilter, selectedBuffs, matchAllBuffs, searchQuery]);

		const getUnlockedCount = () => {
			return Object.keys(localRecipesState).filter((key) => localRecipesState[key]).length;
		};

		return (
			<div className="space-y-6">
				<div>
					<div className="mb-2 flex items-center justify-between">
						<h1 className="text-primary text-2xl font-bold">
							Cooking Recipes ({getUnlockedCount()} / {cookingRecipes.length})
						</h1>
						<Badge color="blue" size="lg">
							{Math.round((getUnlockedCount() / cookingRecipes.length) * 100)}%
							unlocked
						</Badge>
					</div>

					{isDirty.current && (
						<SaveAlert message="Your cooking recipes progress has not been saved yet." />
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					<div className="md:col-span-3">
						<div className="mb-2 block">
							<Label htmlFor="location-filter">Cooking Location</Label>
						</div>
						<Select
							id="location-filter"
							value={locationFilter}
							onChange={(e) => setLocationFilter(e.target.value)}
						>
							{uniqueLocations.map((location) => (
								<option key={location} value={location}>
									{location === "All" ? "All Locations" : location}
								</option>
							))}
						</Select>
					</div>

					<div className="md:col-span-8">
						<div className="mb-2 block">
							<Label htmlFor="search-recipes">Search</Label>
						</div>
						<div className="flex gap-2">
							<TextInput
								id="search-recipes"
								type="text"
								icon={HiSearch}
								placeholder="Search by name..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="flex-1"
							/>
						</div>
					</div>

					<div className="flex items-end justify-start">
						<Button
							color={showBuffFilter ? "primary" : "light"}
							onClick={() => setShowBuffFilter(!showBuffFilter)}
						>
							<HiFilter className="mr-2 h-5 w-5" />
							Buffs {selectedBuffs.length > 0 && `(${selectedBuffs.length})`}
						</Button>
					</div>
				</div>

				{showBuffFilter && (
					<Card className="p-4">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-medium">Filter by Buffs</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<span className="text-sm">Match mode:</span>
									<ToggleSwitch
										checked={matchAllBuffs}
										onChange={setMatchAllBuffs}
										label=""
									/>
									<span className="text-sm font-medium">
										{matchAllBuffs ? "ALL" : "ANY"}
									</span>
								</div>
								<Button
									size="xs"
									color="secondary"
									onClick={clearAllBuffFilters}
									disabled={selectedBuffs.length === 0}
								>
									<HiX className="mr-1 h-4 w-4" />
									Clear Selections
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{uniqueBuffs.map((buff) => {
								const isSelected = selectedBuffs.includes(buff);
								const { icon } = getBuffIcon(buff);

								return (
									<div
										key={buff}
										className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 ${
											isSelected
												? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
												: "border-gray-200 dark:border-gray-700"
										}`}
										onClick={() => toggleBuffFilter(buff)}
									>
										{icon && (
											<img
												src={icon}
												alt={buff}
												className="h-5 w-5 object-contain"
											/>
										)}
										<span className="text-sm">
											{buff
												.replace(/([A-Z])/g, " $1")
												.replace(/^./, (str) => str.toUpperCase())}
										</span>
										<Checkbox
											className="ml-auto"
											checked={isSelected}
											onChange={() => toggleBuffFilter(buff)}
										/>
									</div>
								);
							})}
						</div>
					</Card>
				)}

				<div className="mb-4">
					<p className="text-primary font-medium">
						Showing {filteredRecipes.length} of {cookingRecipes.length} recipes •
						Unlocked: {getUnlockedCount()}
						{selectedBuffs.length > 0 && (
							<span>
								{" "}
								• Filtered by {selectedBuffs.length} buff
								{selectedBuffs.length !== 1 ? "s" : ""}
							</span>
						)}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredRecipes.length === 0 ? (
						<Card className="col-span-full py-8 text-center">
							<p className="text-gray-500 dark:text-gray-400">
								No recipes match your filter criteria. Try adjusting your filters.
							</p>
						</Card>
					) : (
						filteredRecipes.map((recipe) => {
							const isUnlocked = localRecipesState[recipe.id] === true;

							return (
								<Card
									key={recipe.id}
									className={`${
										isUnlocked
											? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
											: ""
									}`}
								>
									<div className="flex h-full flex-col">
										<div className="mb-2 flex items-start justify-between">
											<h3 className="text-lg font-medium">
												{recipe.name}
												{typeof recipe.outputCount === "number" &&
													recipe.outputCount > 1 && (
														<span className="ml-1 text-sm text-gray-500">
															(x{recipe.outputCount})
														</span>
													)}
												{recipe.outputCount === "Varies" && (
													<span className="ml-1 text-sm text-gray-500">
														(Varies)
													</span>
												)}
											</h3>
											{isUnlocked && (
												<div className="rounded-full bg-green-500 p-1 text-white">
													<HiCheck className="h-4 w-4" />
												</div>
											)}
										</div>

										<div className="flex items-center justify-center py-4">
											{recipe.img && (
												<div className="relative h-20 w-20">
													<img
														src={recipe.img}
														alt={recipe.name}
														className="h-full w-full object-contain"
													/>
												</div>
											)}
										</div>

										<div className="mt-2 flex-grow space-y-3 text-sm">
											<div className="flex">
												<p className="w-32 font-medium">
													Cooking Location:
												</p>
												<div className="flex flex-wrap gap-1">
													{recipe.cookingLocation.map(
														(location, index) => (
															<Badge
																key={`${recipe.id}-loc-${index}`}
																color="info"
																className="mr-1"
															>
																{location}
															</Badge>
														)
													)}
												</div>
											</div>

											{recipe.buffs &&
												Object.keys(recipe.buffs).length > 1 && (
													<div className="flex">
														<p className="w-32 font-medium">Buffs:</p>
														<div className="flex flex-wrap items-center gap-1">
															{recipe.buffs.length && (
																<div
																	key={`${recipe.id}-buff-length`}
																	className="flex items-center"
																	title="Buff Duration"
																>
																	<img
																		src={BuffIcons.length}
																		alt="Buff Duration"
																		className="h-7 w-7 object-contain"
																	/>
																	<span className="ml-1 text-xs">
																		{recipe.buffs.length}
																	</span>
																</div>
															)}

															{Object.entries(recipe.buffs).map(
																([buffName, value]) => {
																	if (buffName === "length")
																		return null;

																	const { icon, level } =
																		getBuffIcon(
																			buffName,
																			value as number
																		);

																	return (
																		<div
																			key={`${recipe.id}-buff-${buffName}`}
																			className="flex items-center"
																			title={buffName
																				.replace(
																					/([A-Z])/g,
																					" $1"
																				)
																				.replace(
																					/^./,
																					(str) =>
																						str.toUpperCase()
																				)}
																		>
																			{icon && (
																				<img
																					src={icon}
																					alt={buffName}
																					className="h-5 w-5 object-contain"
																				/>
																			)}
																			{typeof value ===
																				"number" &&
																				!level && (
																					<span className="ml-1 text-xs">
																						{value}
																						{buffName ===
																							"healthRegenRate" &&
																							"/t"}
																						{buffName ===
																							"staminaRegenRate" &&
																							"/s"}
																					</span>
																				)}
																		</div>
																	);
																}
															)}
														</div>
													</div>
												)}

											<div className="flex flex-col">
												<p className="mb-1 font-medium">Sell Price:</p>
												<div className="flex items-center gap-2">
													<div className="ml-3 flex items-center">
														<span className="text-xs font-medium">
															Base:
														</span>
														<img
															src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
															alt="Dinks"
															className="ml-1 h-4 w-4"
														/>
														<span className="ml-1">
															{recipe.baseSellPrice.toLocaleString()}
														</span>
													</div>

													{recipe.sheilasSellPrice && (
														<div className="flex items-center">
															<span className="text-xs font-medium">
																Sheila&apos;s:
															</span>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="ml-1 h-4 w-4"
															/>
															<span className="ml-1">
																{recipe.sheilasSellPrice.toLocaleString()}
															</span>
														</div>
													)}

													{recipe.tedsSellPrice && (
														<div className="flex items-center">
															<span className="text-xs font-medium">
																Ted&apos;s:
															</span>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="ml-1 h-4 w-4"
															/>
															<span className="ml-1">
																{recipe.tedsSellPrice.toLocaleString()}
															</span>
														</div>
													)}

													{recipe.jimmysSellPrice && (
														<div className="flex items-center">
															<span className="text-xs font-medium">
																Jimmy&apos;s:
															</span>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="ml-1 h-4 w-4"
															/>
															<span className="ml-1">
																{recipe.jimmysSellPrice.toLocaleString()}
															</span>
														</div>
													)}
												</div>
											</div>

											<div className="flex flex-col">
												<p className="mb-1 font-medium">Resources:</p>
												{recipe.variants && recipe.variants.length > 1 ? (
													<div className="max-h-60 overflow-y-auto">
														{recipe.variants.map(
															(variant, variantIndex) => (
																<div
																	key={`${recipe.id}-variant-${variantIndex}`}
																	className="mb-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
																>
																	<p className="mb-1 text-sm font-medium">
																		Option {variantIndex + 1}:
																		{variant.outputCount && (
																			<span className="ml-1 text-xs text-gray-500">
																				(x
																				{
																					variant.outputCount
																				}
																				)
																			</span>
																		)}
																	</p>
																	<div className="ml-2 space-y-1">
																		{variant.inputs.map(
																			(input, idx) => (
																				<div
																					key={`${recipe.id}-variant-${variantIndex}-input-${idx}`}
																					className="flex items-center gap-1 rounded-md bg-white p-1 dark:bg-gray-700"
																				>
																					{input.img && (
																						<img
																							src={
																								input.img
																							}
																							alt={
																								input.name
																							}
																							className="h-4 w-4"
																						/>
																					)}
																					<span>
																						{
																							input.count
																						}
																						x{" "}
																						{input.name}
																					</span>
																				</div>
																			)
																		)}
																	</div>
																</div>
															)
														)}
													</div>
												) : (
													<div className="ml-2 space-y-1">
														{recipe.variants[0].inputs.map(
															(input, idx) => (
																<div
																	key={`${recipe.variants[0].id}-input-${idx}`}
																	className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-700"
																>
																	{input.img && (
																		<img
																			src={input.img}
																			alt={input.name}
																			className="h-5 w-5 object-contain"
																		/>
																	)}
																	<span>
																		{input.count}x {input.name}
																	</span>
																</div>
															)
														)}
													</div>
												)}
											</div>
										</div>

										<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
											<div className="flex items-center">
												<Checkbox
													id={`unlocked-${recipe.id}`}
													checked={isUnlocked}
													onChange={(e) =>
														handleToggleUnlocked(
															recipe.id,
															e.target.checked
														)
													}
													className="mr-2"
												/>
												<Label
													htmlFor={`unlocked-${recipe.id}`}
													className="cursor-pointer"
												>
													Unlocked
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
	}
);

CookingRecipesTab.displayName = "CookingRecipesTab";

export default CookingRecipesTab;
