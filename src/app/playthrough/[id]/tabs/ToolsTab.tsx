"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { tools } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, CollectTabProps } from "@/types";
import { getHashQueryParams, setHashQueryParam } from "@/service/urlService";
import TabHeader from "@/playthrough/ui/TabHeader";
import FilterBar from "@/playthrough/ui/FilterBar";
import FilterDetails from "@/playthrough/ui/FilterDetails";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import DinkValue from "@/playthrough/ui/itemcard/DinkValue";
import ItemFooter from "@/playthrough/ui/itemcard/ItemFooter";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemResources from "@/playthrough/ui/itemcard/ItemResources";
import ItemFranklyn from "@/playthrough/ui/itemcard/ItemFranklyn";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import ItemDamage from "@/playthrough/ui/itemcard/ItemDamage";

const ToolsTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [licenseFilter, setLicenseFilter] = useState<string>("All");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [buyUnitFilter, setBuyUnitFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>(collected);

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
		setLocalState(collected);
		isDirty.current = false;

		const hashParams = getHashQueryParams();
		if (hashParams.q) {
			setSearchQuery(hashParams.q);
		}
	}, [collected]);

	useEffect(() => {
		if (searchQuery) {
			setHashQueryParam("q", searchQuery);
		} else {
			setHashQueryParam("q", "");
		}
	}, [searchQuery]);

	const handleToggleCollected = (id: string, isCollected: boolean) => {
		setLocalState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				tools: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const filteredData = useMemo(() => {
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
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const filters = {
		license: {
			value: licenseFilter,
			options: uniqueLicenses,
			label: "License",
		},
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		buyUnit: {
			value: buyUnitFilter,
			options: ["All", "Purchasable", "Dinks", "Permit Points"],
			label: "Purchase Type",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "license") {
			setLicenseFilter(value);
		} else if (name === "source") {
			setSourceFilter(value);
		} else if (name === "buyUnit") {
			setBuyUnitFilter(value);
		}
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Tools"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCollectedCount()}
				collectionTotal={tools.length}
				dirtyMessage="Your tools collection has not been saved yet."
			/>

			<FilterBar
				showFilters={true}
				filters={filters}
				onFilterChange={handleFilterChange}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
				searchPlaceholder="Search by name..."
			/>

			<FilterDetails
				title="tools"
				filteredCount={filteredData.length}
				totalCount={tools.length}
				collectedLabel="Collected"
				collectedCount={getCollectedCount()}
			/>

			{filteredData.length > 0 && (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredData.map((tool) => {
						const isCollected = localState[tool.id] === true;
						const isCraftable = tool.source.includes("Crafting Table");

						return (
							<ItemCard
								key={tool.id}
								renderHeader={() => (
									<ItemHeader
										title={tool.name}
										renderRightComp={() =>
											isCraftable && (
												<Button
													as={Link}
													href={`#craftingRecipes?q=${tool.name}`}
													color="secondary"
													size="xs"
												>
													Crafting Recipe
												</Button>
											)
										}
									/>
								)}
								renderImage={() => (
									<ItemImage
										src={tool.img}
										name={tool.name}
										isCollected={isCollected}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										{tool.licence && (
											<ItemDetail label="License" details={tool.licence} />
										)}

										{tool.source && tool.source.length > 0 && (
											<ItemDetail
												label="Source"
												details={tool.source.join(", ")}
											/>
										)}

										{tool.damage && tool.damage > 0 && (
											<ItemDamage label="Damage" damage={tool.damage} />
										)}

										{(tool.shinyDiscCount || tool.berkoniumOreCount) && (
											<ItemFranklyn
												shinyDiscCount={tool.shinyDiscCount}
												berkoniumOreCount={tool.berkoniumOreCount}
											/>
										)}

										{tool.inputs && tool.inputs.length > 0 && (
											<ItemResources
												id={tool.id}
												label="Ingredients"
												items={tool.inputs}
											/>
										)}

										{tool.buyPrice !== undefined && (
											<DinkValue label="Buy Price" price={tool.buyPrice} />
										)}

										{tool.baseSellPrice !== null && (
											<DinkValue
												label="Sell Price"
												price={tool.baseSellPrice}
												showCommerceLicenses
											/>
										)}
									</div>
								)}
								renderFooter={() => (
									<ItemFooter
										id={tool.id}
										leftLabel="Collected"
										isLeftChecked={isCollected}
										handleLeftToggle={handleToggleCollected}
									/>
								)}
							/>
						);
					})}
				</div>
			)}

			{filteredData.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

ToolsTab.displayName = "ToolsTab";

export default ToolsTab;
