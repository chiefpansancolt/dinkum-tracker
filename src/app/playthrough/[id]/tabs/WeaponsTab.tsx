/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, Checkbox, Label, Badge, TextInput, Select, Button } from "flowbite-react";
import { weapons } from "@/data/dinkum/weapons";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";
import { WeaponsTabHandle, WeaponsTabProps } from "@/types/dinkum";

const WeaponsTab = forwardRef<WeaponsTabHandle, WeaponsTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [damageFilter, setDamageFilter] = useState<string>("All");
	const [localWeaponsState, setLocalWeaponsState] = useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		weapons.forEach((weapon) => {
			if (weapon.source && weapon.source.length > 0) {
				weapon.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	useEffect(() => {
		setLocalWeaponsState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalWeaponsState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const saveWeapons = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			weapons: localWeaponsState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		saveWeapons,
	}));

	const filteredWeapons = useMemo(() => {
		return weapons.filter((weapon) => {
			if (sourceFilter !== "All" && !weapon.source.includes(sourceFilter)) {
				return false;
			}

			if (damageFilter !== "All") {
				if (damageFilter === "High" && (weapon.damage === null || weapon.damage < 20)) {
					return false;
				}
				if (
					damageFilter === "Medium" &&
					(weapon.damage === null || weapon.damage < 10 || weapon.damage >= 20)
				) {
					return false;
				}
				if (damageFilter === "Low" && (weapon.damage === null || weapon.damage >= 10)) {
					return false;
				}
			}

			if (searchQuery && !weapon.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, damageFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localWeaponsState).filter((key) => localWeaponsState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Weapons ({getCollectedCount()} / {weapons.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getCollectedCount() / weapons.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your weapons collection has not been saved yet." />
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

				<div>
					<div className="mb-2 block">
						<Label htmlFor="damage-filter">Damage</Label>
					</div>
					<Select
						id="damage-filter"
						value={damageFilter}
						onChange={(e) => setDamageFilter(e.target.value)}
					>
						<option value="All">All Damage Levels</option>
						<option value="High">High (20+)</option>
						<option value="Medium">Medium (10-19)</option>
						<option value="Low">Low (1-9)</option>
					</Select>
				</div>

				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="search-weapons">Search</Label>
					</div>
					<TextInput
						id="search-weapons"
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
					Showing {filteredWeapons.length} of {weapons.length} weapons • Collected:{" "}
					{getCollectedCount()}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredWeapons.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No weapons match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				) : (
					filteredWeapons.map((weapon) => {
						const isCollected = localWeaponsState[weapon.id] === true;
						const isCraftable = weapon.source.includes("Crafting Table");

						return (
							<Card
								key={weapon.id}
								className={`${isCollected ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">{weapon.name}</h3>
										{isCraftable && (
											<Button
												as={Link}
												href={`#craftingRecipes?searchKey=${weapon.name}`}
												color="secondary"
												size="xs"
											>
												Crafting Recipe
											</Button>
										)}
									</div>

									<div className="flex items-center justify-center py-4">
										{weapon.img && (
											<div className="relative h-24 w-24">
												<img
													src={weapon.img}
													alt={weapon.name}
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
										{weapon.licenceLevel !== null && (
											<div className="flex">
												<p className="w-32 font-medium">
													Hunting Licence Level:
												</p>
												<Badge color="purple">{weapon.licenceLevel}</Badge>
											</div>
										)}

										{weapon.source && weapon.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{weapon.source.map((src, index) => (
														<Badge
															key={`${weapon.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										{weapon.damage !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Damage:</p>
												<div className="flex items-center">
													<span className="flex items-center">
														+{weapon.damage}
														<img
															src="https://static.wikia.nocookie.net/dinkum/images/3/32/Attack_Buff.png"
															alt="Attack"
															className="ml-1 w-4"
														/>
													</span>
												</div>
											</div>
										)}

										{weapon.inputs && weapon.inputs.length > 0 && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Ingredients:
												</p>
												<div className="ml-2 space-y-1">
													{weapon.inputs.map((input, idx) => (
														<div
															key={`${weapon.id}-input-${idx}`}
															className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800"
														>
															{input.img && (
																<img
																	src={input.img}
																	alt={input.name}
																	className="h-5 w-5"
																/>
															)}
															<span>
																{input.count}x {input.name}
															</span>
														</div>
													))}
												</div>
											</div>
										)}

										{weapon.buyPrice !== undefined && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Buy Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>{weapon.buyPrice.toLocaleString()}</span>
												</div>
											</div>
										)}

										{weapon.baseSellPrice !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Sell Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{weapon.baseSellPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`collected-${weapon.id}`}
												checked={isCollected}
												onChange={(e) =>
													handleToggleCollected(
														weapon.id,
														e.target.checked
													)
												}
												className="mr-2"
											/>
											<Label
												htmlFor={`collected-${weapon.id}`}
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

WeaponsTab.displayName = "WeaponsTab";

export default WeaponsTab;
