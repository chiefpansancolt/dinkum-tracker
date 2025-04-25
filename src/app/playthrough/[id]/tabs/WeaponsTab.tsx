"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { weapons } from "@/data/dinkum";
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
import ItemDamage from "@/playthrough/ui/itemcard/ItemDamage";
import EmptyFilterCard from "@/playthrough/ui/EmptyFilterCard";

const WeaponsTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<string>("All");
	const [damageFilter, setDamageFilter] = useState<string>("All");
	const [localState, setLocalState] = useState<Record<string, boolean>>(collected);

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

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			weapons: localState,
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
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	const filters = {
		source: {
			value: sourceFilter,
			options: uniqueSources,
			label: "Source",
		},
		damage: {
			value: damageFilter,
			options: ["All", "High", "Medium", "Low"],
			label: "Damage",
		},
	};

	const handleFilterChange = (name: string, value: string) => {
		if (name === "source") {
			setSourceFilter(value);
		} else if (name === "damage") {
			setDamageFilter(value);
		}
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Weapons"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCollectedCount()}
				collectionTotal={weapons.length}
				dirtyMessage="Your weapons collection has not been saved yet."
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
				title="weapons"
				filteredCount={filteredWeapons.length}
				totalCount={weapons.length}
				collectedLabel="Collected"
				collectedCount={getCollectedCount()}
			/>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredWeapons.length === 0 ? (
					<EmptyFilterCard />
				) : (
					filteredWeapons.map((weapon) => {
						const isCollected = localState[weapon.id] === true;
						const isCraftable = weapon.source.includes("Crafting Table");

						return (
							<ItemCard
								key={weapon.id}
								renderHeader={() => (
									<ItemHeader
										title={weapon.name}
										renderRightComp={() =>
											isCraftable && (
												<Button
													as={Link}
													href={`#craftingRecipes?q=${weapon.name}`}
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
										src={weapon.img}
										name={weapon.name}
										isCollected={isCollected}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										{weapon.licenceLevel !== null && (
											<ItemDetail
												label="Hunting License Level"
												details={weapon.licenceLevel.toString()}
											/>
										)}

										{weapon.source && weapon.source.length > 0 && (
											<ItemDetail
												label="Source"
												details={weapon.source.join(", ")}
											/>
										)}

										{weapon.damage && (
											<ItemDamage label="Damage" damage={weapon.damage} />
										)}

										{weapon.inputs && weapon.inputs.length > 0 && (
											<ItemResources
												id={weapon.id}
												label="Resources"
												items={weapon.inputs}
											/>
										)}

										{weapon.buyPrice !== undefined && (
											<DinkValue label="Buy Price" price={weapon.buyPrice} />
										)}

										<DinkValue
											label="Sell Price"
											price={weapon.baseSellPrice}
											showCommerceLicenses
										/>
									</div>
								)}
								renderFooter={() => (
									<ItemFooter
										id={weapon.id}
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

WeaponsTab.displayName = "WeaponsTab";

export default WeaponsTab;
