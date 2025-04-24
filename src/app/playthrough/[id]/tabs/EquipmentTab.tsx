"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { equipment } from "@/data/dinkum";
import { TabHandle, CollectTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
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
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";
import ItemFranklyn from "@/components/playthrough/ui/itemcard/ItemFranklyn";

const EquipmentTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [requirementFilter, setRequirementFilter] = useState<string>("All");
	const [localEquipmentState, setLocalEquipmentState] =
		useState<Record<string, boolean>>(collected);

	const isDirty = useRef(false);

	const uniqueSources = useMemo(() => {
		const sources = new Set<string>();
		equipment.forEach((item) => {
			if (item.source && item.source.length > 0) {
				item.source.forEach((src) => {
					sources.add(src);
				});
			}
		});
		return ["All", ...Array.from(sources).sort()];
	}, []);

	const uniqueRequirementTypes = useMemo(() => {
		const types = new Set<string>();
		equipment.forEach((item) => {
			if (item.requirementType) {
				types.add(item.requirementType);
			}
		});
		return ["All", ...Array.from(types).sort()];
	}, []);

	useEffect(() => {
		setLocalEquipmentState(collected);
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
		setLocalEquipmentState((prev) => ({
			...prev,
			[id]: isCollected,
		}));

		isDirty.current = true;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			equipment: localEquipmentState,
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

	const filteredEquipment = useMemo(() => {
		return equipment.filter((item) => {
			if (sourceFilter !== "All" && !item.source.includes(sourceFilter)) {
				return false;
			}

			if (requirementFilter !== "All" && item.requirementType !== requirementFilter) {
				return false;
			}

			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [sourceFilter, requirementFilter, searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localEquipmentState).filter((key) => localEquipmentState[key]).length;
	};

	const filters = {
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		requirement: {
			value: requirementFilter,
			options: uniqueRequirementTypes,
			label: "Requirement Type",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "requirement") {
			setRequirementFilter(value);
		}
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Equipment"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCollectedCount()}
				collectionTotal={equipment.length}
				dirtyMessage="Your equipment collection has not been saved yet."
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
				title="equipment items"
				filteredCount={filteredEquipment.length}
				totalCount={equipment.length}
				collectedLabel="Collected"
				collectedCount={getCollectedCount()}
			/>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredEquipment.length === 0 ? (
					<EmptyFilterCard />
				) : (
					filteredEquipment.map((item) => {
						const isCollected = localEquipmentState[item.id] === true;
						const isCraftable = item.source.includes("Crafting Table");

						return (
							<ItemCard
								key={item.id}
								renderHeader={() => (
									<ItemHeader
										title={item.name}
										renderRightComp={() =>
											isCraftable && (
												<Button
													as={Link}
													href={`#craftingRecipes?q=${item.name}`}
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
										src={item.img}
										name={item.name}
										isCollected={isCollected}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										<p className="border-b border-gray-200 pb-2 text-gray-900 dark:border-gray-700 dark:text-gray-50">
											{item.description}
										</p>

										{item.requirementType && item.requirementLevel !== null && (
											<ItemDetail
												label={`${item.requirementType} Level`}
												details={item.requirementLevel.toString()}
											/>
										)}

										{item.source && item.source.length > 0 && (
											<ItemDetail
												label="Source"
												details={item.source.join(", ")}
											/>
										)}

										{(item.windmillCompatable || item.solarPanelCompatable) && (
											<ItemDetail
												label="Compatible with"
												details={[
													item.windmillCompatable ? "Windmill" : "",
													item.solarPanelCompatable ? "Solar Panel" : "",
												]
													.filter(Boolean)
													.join(", ")}
											/>
										)}

										{item.shinyDiscCount ||
											(item.berkoniumOreCount && (
												<ItemFranklyn
													shinyDiscCount={item.shinyDiscCount}
													berkoniumOreCount={item.berkoniumOreCount}
												/>
											))}

										{item.inputs && item.inputs.length > 0 && (
											<ItemResources
												id={item.id}
												label="Resources"
												items={item.inputs}
											/>
										)}

										{item.buyPrice !== undefined && (
											<DinkValue label="Buy Price" price={item.buyPrice} />
										)}

										{item.baseSellPrice !== null && (
											<DinkValue
												label="Sell Price"
												price={item.baseSellPrice}
												showCommerceLicenses
											/>
										)}
									</div>
								)}
								renderFooter={() => (
									<ItemFooter
										id={item.id}
										leftLabel="Collected"
										isLeftChecked={isCollected}
										handleLeftToggle={handleToggleCollected}
									/>
								)}
							/>
						);
					})
				)}
			</div>
		</div>
	);
});

EquipmentTab.displayName = "EquipmentTab";

export default EquipmentTab;
