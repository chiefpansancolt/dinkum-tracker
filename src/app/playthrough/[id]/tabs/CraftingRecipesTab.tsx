/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, Checkbox, Label, Badge, TextInput, Select } from "flowbite-react";
import { craftingRecipes } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, UnlockTabProps } from "@/types";
import SaveAlert from "@/comps/SaveAlert";
import { HiSearch, HiCheck } from "react-icons/hi";

const CraftingRecipesTab = forwardRef<TabHandle, UnlockTabProps>(({ unlocked }, ref) => {
	const params = useParams();
	const searchParams = useSearchParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [localRecipesState, setLocalRecipesState] = useState<Record<string, boolean>>(unlocked);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		craftingRecipes.forEach((recipe) => {
			if (recipe.source && recipe.source.length > 0) {
				recipe.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	useEffect(() => {
		const searchKey = searchParams?.get("searchKey");
		if (searchKey) {
			setSearchQuery(searchKey);
		}
	}, [searchParams]);

	useEffect(() => {
		setLocalRecipesState(unlocked);
		isDirty.current = false;
	}, [unlocked]);

	const handleToggleunlocked = (id: string, isUnlocked: boolean) => {
		setLocalRecipesState((prev) => ({
			...prev,
			[id]: isUnlocked,
		}));

		isDirty.current = true;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			craftingRecipes: localRecipesState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		save,
	}));

	const filteredRecipes = useMemo(() => {
		return craftingRecipes.filter((recipe) => {
			if (sourceFilter !== "All" && !recipe.source?.includes(sourceFilter)) {
				return false;
			}

			if (searchQuery) {
				return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
			}

			return true;
		});
	}, [sourceFilter, searchQuery]);

	const getunlockedCount = () => {
		return Object.keys(localRecipesState).filter((key) => localRecipesState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Crafting Recipes ({getunlockedCount()} / {craftingRecipes.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getunlockedCount() / craftingRecipes.length) * 100)}% unlocked
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your crafting recipe collection has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="source-filter">Source</Label>
					</div>
					<Select
						id="source-filter"
						value={sourceFilter}
						onChange={(e) => setSourceFilter(e.target.value)}
					>
						{uniqueSources.map((source) => (
							<option key={source} value={source}>
								{source === "All" ? "All Sources" : source}
							</option>
						))}
					</Select>
				</div>

				<div className="col-span-1 md:col-span-3">
					<div className="mb-2 block">
						<Label htmlFor="search-recipes">Search</Label>
					</div>
					<TextInput
						id="search-recipes"
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
					Showing {filteredRecipes.length} of {craftingRecipes.length} recipes • Unlocked:{" "}
					{getunlockedCount()}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
								className={`${isUnlocked ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">
											{recipe.name}{" "}
											{recipe.outputCount > 1 && `(x${recipe.outputCount})`}
										</h3>
									</div>

									<div className="flex items-center justify-center py-4">
										{recipe.img && (
											<div className="relative h-24 w-24">
												<img
													src={recipe.img}
													alt={recipe.name}
													className="h-full w-full object-contain"
												/>
												{isUnlocked && (
													<div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1 text-white">
														<HiCheck className="h-4 w-4" />
													</div>
												)}
											</div>
										)}
									</div>

									<div className="mt-2 flex-grow space-y-3">
										{recipe.source && recipe.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{recipe.source.map((src, index) => (
														<Badge
															key={`${recipe.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										<div>
											<p className="mb-2 font-medium">Resources:</p>
											{recipe.variants.length > 1 ? (
												<>
													{recipe.variants.map(
														(variant, variantIndex) => (
															<div
																key={variant.id}
																className="mb-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
															>
																<p className="mb-1 text-sm font-medium">
																	Option {variantIndex + 1}:
																</p>
																<div className="ml-2 space-y-1">
																	{variant.inputs.map(
																		(input, idx) => (
																			<div
																				key={`${variant.id}-input-${idx}`}
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
																						className="h-5 w-5 object-contain"
																					/>
																				)}
																				<span>
																					{input.count}x{" "}
																					{input.name}
																				</span>
																			</div>
																		)
																	)}
																</div>
															</div>
														)
													)}
												</>
											) : (
												<div className="ml-2 space-y-1">
													{recipe.variants[0].inputs.map((input, idx) => (
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
													))}
												</div>
											)}
										</div>

										{recipe.baseSellPrice > 0 && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Sell Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{recipe.baseSellPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`unlocked-${recipe.id}`}
												checked={isUnlocked}
												onChange={(e) =>
													handleToggleunlocked(
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
												Blueprint Unlocked
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

CraftingRecipesTab.displayName = "CraftingRecipesTab";

export default CraftingRecipesTab;
