"use client";

import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useParams } from "next/navigation";
import FishTab from "@/playthrough/pedia/FishTab";
import BugsTab from "@/playthrough/pedia/BugsTab";
import CrittersTab from "@/playthrough/pedia/CrittersTab";
import { fish, bugs, critters } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import SaveAlert from "@/comps/SaveAlert";
import {
	Collection,
	CollectionType,
	TabHandle,
	PediaTabHandle,
	CollectionsTabProps,
} from "@/types";

const CollectionsTab = forwardRef<TabHandle, CollectionsTabProps>(
	({ collections, donations, activeCollectionType }, ref) => {
		const params = useParams();
		const playthroughId = typeof params.id === "string" ? params.id : "";
		const fishTabRef = useRef<PediaTabHandle>(null);
		const bugsTabRef = useRef<PediaTabHandle>(null);
		const crittersTabRef = useRef<PediaTabHandle>(null);

		const [localCollections, setLocalCollections] = useState<Collection>(collections);
		const [localDonations, setLocalDonations] = useState<Collection>(donations);

		const isDirty = useRef(false);

		useEffect(() => {
			setLocalCollections(collections);
			setLocalDonations(donations);
			isDirty.current = false;
		}, [collections, donations]);

		useEffect(() => {
			isDirty.current = false;
			setLocalCollections(collections);
			setLocalDonations(donations);
		}, [activeCollectionType, collections, donations]);

		const save = () => {
			if (!playthroughId || !isDirty.current) return false;

			let status = false;
			if (activeCollectionType === "fish" && fishTabRef.current) {
				const fishState = fishTabRef.current.save();
				status = updatePlaythroughData(playthroughId, {
					collections: {
						[activeCollectionType]: fishState.collected,
					} as Partial<Collection>,
					donations: {
						[activeCollectionType]: fishState.donated,
					} as Partial<Collection>,
				});
			}

			if (activeCollectionType === "bugs" && bugsTabRef.current) {
				const bugsState = bugsTabRef.current.save();
				status = updatePlaythroughData(playthroughId, {
					collections: {
						[activeCollectionType]: bugsState.collected,
					} as Partial<Collection>,
					donations: {
						[activeCollectionType]: bugsState.donated,
					} as Partial<Collection>,
				});
			}

			if (activeCollectionType === "critters" && crittersTabRef.current) {
				const crittersState = crittersTabRef.current.save();
				status = updatePlaythroughData(playthroughId, {
					collections: {
						[activeCollectionType]: crittersState.collected,
					} as Partial<Collection>,
					donations: {
						[activeCollectionType]: crittersState.donated,
					} as Partial<Collection>,
				});
			}

			if (status) {
				isDirty.current = false;
			}

			return status;
		};

		useImperativeHandle(ref, () => ({
			save,
		}));

		const handleCollectionChange = (type: CollectionType, id: string, collected: boolean) => {
			setLocalCollections((prev) => {
				const currentItems = prev[type] || [];

				const updatedItems = collected
					? [...currentItems, id]
					: currentItems.filter((itemId) => itemId !== id);

				return {
					...prev,
					[type]: updatedItems,
				};
			});

			isDirty.current = true;
		};

		const handleDonationChange = (type: CollectionType, id: string, donated: boolean) => {
			setLocalDonations((prev) => {
				const currentItems = prev[type] || [];

				const updatedItems = donated
					? [...currentItems, id]
					: currentItems.filter((itemId) => itemId !== id);

				return {
					...prev,
					[type]: updatedItems,
				};
			});

			isDirty.current = true;
		};

		const renderActiveCollection = () => {
			switch (activeCollectionType) {
				case "fish":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Fish ({localCollections.fish.length}/{fish.length})
							</h2>
							{isDirty.current && (
								<SaveAlert message="Your fish collection progress has not been saved yet." />
							)}
							<FishTab
								ref={fishTabRef}
								collected={localCollections.fish}
								donated={localDonations.fish}
								onCollectedChange={(id, collected) =>
									handleCollectionChange("fish", id, collected)
								}
								onDonatedChange={(id, donated) =>
									handleDonationChange("fish", id, donated)
								}
							/>
						</div>
					);
				case "bugs":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Bugs ({localCollections.bugs.length}/{bugs.length})
							</h2>
							{isDirty.current && (
								<SaveAlert message="Your bug collection progress has not been saved yet." />
							)}
							<BugsTab
								ref={bugsTabRef}
								collected={localCollections.bugs}
								donated={localDonations.bugs}
								onCollectedChange={(id, collected) =>
									handleCollectionChange("bugs", id, collected)
								}
								onDonatedChange={(id, donated) =>
									handleDonationChange("bugs", id, donated)
								}
							/>
						</div>
					);
				case "critters":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Critters ({localCollections.critters?.length || 0}/{critters.length}
								)
							</h2>
							{isDirty.current && (
								<SaveAlert message="Your critter collection progress has not been saved yet." />
							)}
							<CrittersTab
								ref={crittersTabRef}
								collected={localCollections.critters || []}
								donated={localDonations.critters || []}
								onCollectedChange={(id, collected) =>
									handleCollectionChange("critters", id, collected)
								}
								onDonatedChange={(id, donated) =>
									handleDonationChange("critters", id, donated)
								}
							/>
						</div>
					);
				default:
					return <div>Please select a collection type</div>;
			}
		};

		return <div className="space-y-6">{renderActiveCollection()}</div>;
	}
);

CollectionsTab.displayName = "CollectionsTab";

export default CollectionsTab;
