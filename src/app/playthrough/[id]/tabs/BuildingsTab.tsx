/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { buildings, getCollectableBuildingsCount, getDeedBadgeColor } from "@/data/dinkum";
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
import { HiClock } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import { DeedTypes } from "@/data/constants";

const BuildingsTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [localState, setLocalState] = useState(collected);

	const isDirty = useRef(false);

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

	const handleToggleInstalled = (buildingId: string, isInstalled: boolean) => {
		setLocalState((prev) => ({
			...prev,
			[buildingId]: isInstalled,
		}));

		isDirty.current = true;
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				buildings: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		}
	}));

	const filteredData = useMemo(() => {
		return buildings.filter((item) => {
			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [searchQuery]);

	const getInstalledCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Buildings"
				collectionName="Installed"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getInstalledCount()}
				collectionTotal={getCollectableBuildingsCount()}
				dirtyMessage="Your buildings progress has not been saved yet."
			/>

			<FilterBar
				showFilters={false}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
			/>

			<FilterDetails
				title="buildings"
				filteredCount={filteredData.length}
				totalCount={getCollectableBuildingsCount()}
				collectedLabel="Installed"
				collectedCount={getInstalledCount()}
			/>

			{filteredData.length > 0 && (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredData.map((item) => {
						const isInstalled = localState[item.id] === true;
						const isCollectable = item.deedType === DeedTypes.Collectable;
						const hasOperatingHours =
							item.operatingHours && item.operatingHours.length > 0;

						return (
							<ItemCard
								key={item.id}
								renderHeader={() => (
									<ItemHeader
										title={item.name}
										renderRightComp={() => (
											<Badge color={getDeedBadgeColor(item.deedType)}>
												{item.deedType}
											</Badge>
										)}
									/>
								)}
								renderImage={() => (
									<ItemImage
										src={item.img}
										name={item.name}
										isCollected={isInstalled}
									/>
								)}
								renderDetails={() => (
									<div className="grid grid-cols-1 gap-2">
										{item.deedName && (
											<ItemDetail label="Deed" details={item.deedName} />
										)}
										{item.npc && (
											<ItemDetail
												label="NPC"
												details={item.npc}
												iconComp={() =>
													item.npcImg && (
														<img
															src={item.npcImg}
															alt={item.npc}
															className="h-5 w-5 object-contain"
														/>
													)
												}
											/>
										)}
										{item.size && (
											<ItemDetail label="Size" details={item.size} />
										)}

										{item.buildTime && (
											<ItemDetail
												label="Build Time"
												details={item.buildTime}
											/>
										)}
										{item.deedPrice > 0 && (
											<DinkValue
												label="Deed Price"
												price={item.deedPrice}
											/>
										)}

										{hasOperatingHours && (
											<ItemDetail
												label="Hours"
												details={item.operatingHours.join(", ")}
												iconComp={() => <HiClock className="h-4 w-4" />}
											/>
										)}

										{item.daysClosed && (
											<ItemDetail
												label="Closed"
												details={item.daysClosed}
												iconComp={() => (
													<HiCalendarDays className="h-4 w-4" />
												)}
											/>
										)}

										<ItemDetail
											label="Description"
											details={item.description}
										/>

										{item.inputs.length > 0 && (
											<ItemResources
												id={item.id}
												label="Resources"
												items={item.inputs}
											/>
										)}
									</div>
								)}
								renderFooter={() =>
									isCollectable && (
										<ItemFooter
											id={item.id}
											leftLabel="Installed"
											isLeftChecked={isInstalled}
											handleLeftToggle={(id, checked) =>
												handleToggleInstalled(id, checked)
											}
										/>
									)
								}
							/>
						);
					})}
				</div>
			)}

			{filteredData.length === 0 && <EmptyFilterCard />}
		</div>
	);
});

BuildingsTab.displayName = "BuildingsTab";

export default BuildingsTab;
