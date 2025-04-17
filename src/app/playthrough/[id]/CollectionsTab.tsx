"use client";

import React, { useRef, useState, useEffect, useImperativeHandle } from "react";
import { useParams } from "next/navigation";
import FishTab, { FishTabHandle } from "@/playthrough/pedia/FishTab";
import BugsTab, { BugsTabHandle } from "@/playthrough/pedia/BugsTab";
import CrittersTab, { CrittersTabHandle } from "@/playthrough/pedia/CrittersTab";
import { fish } from "@/data/dinkum/pedia/fish";
import { bugs } from "@/data/dinkum/pedia/bugs";
import { critters } from "@/data/dinkum/pedia/critters";
import { updatePlaythroughData } from "@/lib/localStorage";
import {
	CollectionsTabHandle,
	CollectionsTabProps,
	Collection,
	CollectionType,
} from "@/types/dinkum";

const CollectionsTab = React.forwardRef<CollectionsTabHandle, CollectionsTabProps>(
	(
		{
			collections,
			donations,
			activeCollectionType,
		},
		ref
	) => {
		const params = useParams();
		const playthroughId = typeof params.id === "string" ? params.id : "";
		const fishTabRef = useRef<FishTabHandle>(null);
		const bugsTabRef = useRef<BugsTabHandle>(null);
		const crittersTabRef = useRef<CrittersTabHandle>(null);

		const [localCollections, setLocalCollections] = useState<Collection>(collections);
		const [localDonations, setLocalDonations] = useState<Collection>(donations);

		useEffect(() => {
			setLocalCollections(collections);
			setLocalDonations(donations);
		}, [collections, donations]);

		const saveCollections = () => {
			if (!playthroughId) return false;

			let status = false;
			if (activeCollectionType === "fish" && fishTabRef.current) {
				const fishState = fishTabRef.current.saveCollectionState();
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
				const bugsState = bugsTabRef.current.saveCollectionState();
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
				const crittersState = crittersTabRef.current.saveCollectionState();
				status = updatePlaythroughData(playthroughId, {
					collections: {
						[activeCollectionType]: crittersState.collected,
					} as Partial<Collection>,
					donations: {
						[activeCollectionType]: crittersState.donated,
					} as Partial<Collection>,
				});
			}

			return status;
		};

		useImperativeHandle(ref, () => ({
			saveCollections,
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
		};

		const renderActiveCollection = () => {
			switch (activeCollectionType) {
				case "fish":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Fish ({localCollections.fish.length}/{fish.length})
							</h2>
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
