"use client";

import { useMemo, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { books } from "@/data/dinkum";
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

const BooksTab = forwardRef<TabHandle, CollectTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [searchQuery, setSearchQuery] = useState("");
	const [localState, setLocalState] = useState<Record<string, boolean>>(collected);

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
				books: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const filteredData = useMemo(() => {
		return books.filter((item) => {
			if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return false;
			}

			return true;
		});
	}, [searchQuery]);

	const getCollectedCount = () => {
		return Object.keys(localState).filter((key) => localState[key]).length;
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="Books"
				collectionName="Collected"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getCollectedCount()}
				collectionTotal={books.length}
				dirtyMessage="Your book collection has not been saved yet."
			/>

			<FilterBar
				showFilters={false}
				showSearch={true}
				searchValue={searchQuery}
				onSearchChange={(value) => setSearchQuery(value)}
			/>

			<FilterDetails
				title="books"
				filteredCount={filteredData.length}
				totalCount={books.length}
				collectedLabel="Collected"
				collectedCount={getCollectedCount()}
			/>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredData.map((item) => {
					const isCollected = localState[item.id] === true;

					return (
						<ItemCard
							key={item.id}
							renderHeader={() => <ItemHeader title={item.name} />}
							renderImage={() => (
								<ItemImage src={item.img} name={item.name} isCollected />
							)}
							renderDetails={() => (
								<>
									{item.details.map((detail, index) => (
										<div
											key={index}
											className="grid grid-cols-12 gap-1.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
										>
											<div className="col-span-12">
												<ItemDetail
													label="Aquired From"
													details={detail.aquiredFrom}
												/>
											</div>

											<div className="col-span-12">
												<ItemDetail
													label="Requirements"
													details={detail.requirements}
												/>
											</div>

											{detail.buyingPrice > 0 && (
												<div className="col-span-6">
													<DinkValue
														label="Buy Price"
														price={detail.buyingPrice}
													/>
												</div>
											)}

											{detail.sellingPrice > 0 && (
												<div className="col-span-6">
													<DinkValue
														label="Sell Price"
														price={detail.sellingPrice}
														showCommerceLicenses
													/>
												</div>
											)}
										</div>
									))}
								</>
							)}
							renderFooter={() => (
								<ItemFooter
									id={item.id}
									leftLabel="Collected"
									isLeftChecked={isCollected}
									handleLeftToggle={(id, checked) =>
										handleToggleCollected(id, checked)
									}
								/>
							)}
						/>
					);
				})}
			</div>
		</div>
	);
});

BooksTab.displayName = "BooksTab";

export default BooksTab;
