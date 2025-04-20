/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, Checkbox, Label, Badge, TextInput, Select, Button } from "flowbite-react";
import { tools } from "@/data/dinkum/tools";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiSearch, HiCheck } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";
import { ToolsTabHandle, ToolsTabProps } from "@/types/dinkum";
import Link from "next/link";

const ToolsTab = forwardRef<ToolsTabHandle, ToolsTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [licenseFilter, setLicenseFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [buyUnitFilter, setBuyUnitFilter] = useState<string>("All");
	const [localToolsState, setLocalToolsState] = useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueLicenses = useMemo(() => {
		const licenses = new Set<string>();
		tools.forEach((tool) => {
			if (tool.licence) {
				licenses.add(tool.licence);
			}
		});
		return ["All", ...Array.from(licenses).sort()];
	}, []);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		tools.forEach((tool) => {
			if (tool.source && tool.source.length > 0) {
				tool.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	useEffect(() => {
		setLocalToolsState(collected);
		isDirty.current = false;
	}, [collected]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalToolsState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const saveTools = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			tools: localToolsState,
		});

		if (success) {
			isDirty.current = false;
			return true;
		}

		return false;
	};

	useImperativeHandle(ref, () => ({
		saveTools,
	}));

	const filteredTools = useMemo(() => {
		return tools.filter((tool) => {
			if (licenseFilter !== "All" && tool.licence !== licenseFilter) {
				return false;
			}

			if (sourceFilter !== "All" && !tool.source.includes(sourceFilter)) {
				return false;
			}

			if (buyUnitFilter !== "All") {
				if (buyUnitFilter === "Dinks" && tool.buyUnits !== "Dinks") {
					return false;
				}
				if (buyUnitFilter === "Permit Points" && tool.buyUnits !== "Permit Points") {
					return false;
				}
				if (buyUnitFilter === "Purchasable" && tool.buyPrice === undefined) {
					return false;
				}
			}

			if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [licenseFilter, sourceFilter, buyUnitFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localToolsState).filter((key) => localToolsState[key]).length;
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-primary text-2xl font-bold">
						Tools ({getCollectedCount()} / {tools.length})
					</h1>
					<Badge color="blue" size="lg">
						{Math.round((getCollectedCount() / tools.length) * 100)}% collected
					</Badge>
				</div>

				{isDirty.current && (
					<SaveAlert message="Your tools collection has not been saved yet." />
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="license-filter">License</Label>
					</div>
					<Select
						id="license-filter"
						value={licenseFilter}
						onChange={(e) => setLicenseFilter(e.target.value)}
					>
						{uniqueLicenses.map((license) => (
							<option key={license} value={license}>
								{license === "All" ? "All Licenses" : license}
							</option>
						))}
					</Select>
				</div>

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
						<Label htmlFor="buy-unit-filter">Purchase Type</Label>
					</div>
					<Select
						id="buy-unit-filter"
						value={buyUnitFilter}
						onChange={(e) => setBuyUnitFilter(e.target.value)}
					>
						<option value="All">All Purchase Types</option>
						<option value="Purchasable">All Purchasable</option>
						<option value="Dinks">Dinks Only</option>
						<option value="Permit Points">Permit Points Only</option>
					</Select>
				</div>

				<div className="col-span-1 md:col-span-2">
					<div className="mb-2 block">
						<Label htmlFor="search-tools">Search</Label>
					</div>
					<TextInput
						id="search-tools"
						type="text"
						icon={HiSearch}
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className="mb-6">
				<div className="flex flex-wrap items-center gap-2">
					<p className="text-primary font-medium">
						Showing {filteredTools.length} of {tools.length} tools • Collected:{" "}
						{getCollectedCount()}
					</p>
					<div className="ml-auto flex flex-wrap gap-2">
						<Badge color="success" size="sm">
							{tools.filter((t) => t.inputs && t.inputs.length > 0).length} Craftable
						</Badge>
						<Badge color="info" size="sm">
							{
								tools.filter(
									(t) => t.buyPrice !== undefined && t.buyUnits === "Dinks"
								).length
							}{" "}
							Purchasable with Dinks
						</Badge>
						<Badge color="purple" size="sm">
							{
								tools.filter(
									(t) =>
										t.buyPrice !== undefined && t.buyUnits === "Permit Points"
								).length
							}{" "}
							Permit Point Items
						</Badge>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredTools.length === 0 ? (
					<Card className="col-span-full py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No tools match your filter criteria. Try adjusting your filters.
						</p>
					</Card>
				) : (
					filteredTools.map((tool) => {
						const isCollected = localToolsState[tool.id] === true;
						const isCraftable = tool.source.includes("Crafting Table");

						return (
							<Card
								key={tool.id}
								className={`${isCollected ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : ""}`}
							>
								<div className="flex h-full flex-col">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="text-lg font-medium">{tool.name}</h3>
										{isCraftable && (
											<Button
												as={Link}
												href={`#craftingRecipes?searchKey=${tool.name}`}
												color="secondary"
												size="xs"
											>
												Crafting Receipe
											</Button>
										)}
									</div>

									<div className="flex items-center justify-center py-4">
										{tool.img && (
											<div className="relative h-24 w-24">
												<img
													src={tool.img}
													alt={tool.name}
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
										{tool.licence && (
											<div className="flex">
												<p className="w-32 font-medium">License:</p>
												<Badge color="purple">{tool.licence}</Badge>
											</div>
										)}

										{tool.source && tool.source.length > 0 && (
											<div className="flex">
												<p className="w-32 font-medium">Source:</p>
												<div className="flex flex-wrap gap-1">
													{tool.source.map((src, index) => (
														<Badge
															key={`${tool.id}-src-${index}`}
															color="info"
															className="mr-1"
														>
															{src}
														</Badge>
													))}
												</div>
											</div>
										)}

										{tool.damage !== null && tool.damage > 0 && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Damage:</p>
												<div className="flex items-center">
													<span className="flex items-center">
														+{tool.damage}
														<img
															src="https://static.wikia.nocookie.net/dinkum/images/3/32/Attack_Buff.png"
															alt="Attack"
															className="ml-1 w-4"
														/>
													</span>
												</div>
											</div>
										)}

										{(tool.shinyDiscCount || tool.berkoniumOreCount) && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Unlocks After:
												</p>
												<div className="ml-2 space-y-1">
													{tool.shinyDiscCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Shiny_Disc.png"
																alt="Shiny Disc"
																className="h-5 w-5"
															/>
															<span>
																{tool.shinyDiscCount}x Shiny Disc
															</span>
														</div>
													)}
													{tool.berkoniumOreCount && (
														<div className="flex items-center gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-800">
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Berkonium_Ore.png"
																alt="Berkonium Ore"
																className="h-5 w-5"
															/>
															<span>
																{tool.berkoniumOreCount}x Berkonium
																Ore
															</span>
														</div>
													)}
												</div>
											</div>
										)}

										{tool.inputs && tool.inputs.length > 0 && (
											<div className="flex flex-col">
												<p className="mb-1 w-32 font-medium">
													Ingredients:
												</p>
												<div className="ml-2 space-y-1">
													{tool.inputs.map((input, idx) => (
														<div
															key={`${tool.id}-input-${idx}`}
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

										{tool.buyPrice !== undefined && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Buy Price:</p>
												<div className="flex items-center">
													{tool.buyUnits === "Permit Points" ? (
														<>
															<span className="mr-1">
																{tool.buyPrice.toLocaleString()}
															</span>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/9/97/Permit_Points.png"
																alt="Permit Points"
																className="h-4 w-4"
															/>
														</>
													) : (
														<>
															<img
																src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
																alt="Dinks"
																className="mr-1 h-4 w-4"
															/>
															<span>
																{tool.buyPrice.toLocaleString()}
															</span>
														</>
													)}
												</div>
											</div>
										)}

										{tool.baseSellPrice !== null && (
											<div className="flex items-center">
												<p className="w-32 font-medium">Sell Price:</p>
												<div className="flex items-center">
													<img
														src="https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Dinks.png"
														alt="Dinks"
														className="mr-1 h-4 w-4"
													/>
													<span>
														{tool.baseSellPrice.toLocaleString()}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
										<div className="flex items-center">
											<Checkbox
												id={`collected-${tool.id}`}
												checked={isCollected}
												onChange={(e) =>
													handleToggleCollected(tool.id, e.target.checked)
												}
												className="mr-2"
											/>
											<Label
												htmlFor={`collected-${tool.id}`}
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

ToolsTab.displayName = "ToolsTab";

export default ToolsTab;
