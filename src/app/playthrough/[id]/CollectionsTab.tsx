"use client";

import React, { useRef } from "react";
import FishTab, { FishTabHandle } from "@/comps/playthrough/FishTab";
import BugsTab, { BugsTabHandle } from "@/comps/playthrough/BugsTab";
import CrittersTab, { CrittersTabHandle } from "@/comps/playthrough/CrittersTab";
import { fish } from "@/data/dinkum/pedia/fish";
import { bugs } from "@/data/dinkum/pedia/bugs";
import { critters } from "@/data/dinkum/pedia/critters";
import { Collection } from "@/lib/localStorage"

export type CollectionType = "fish" | "bugs" | "critters";

interface CollectionsTabProps {
	collections: Collection;
	donations?: Collection;
	activeCollectionType: CollectionType;
	onUpdate: (collectionType: keyof Collection, itemIds: string[]) => void;
	onDonationUpdate?: (collectionType: keyof Collection, itemIds: string[]) => void;
}

export interface CollectionsTabHandle {
	saveCollections: () => boolean;
}

const CollectionsTab = React.forwardRef<CollectionsTabHandle, CollectionsTabProps>(
	(
		{
			collections,
			donations = {
				fish: [],
				bugs: [],
				critters: [],
			},
			activeCollectionType,
			onUpdate,
			onDonationUpdate = () => {},
		},
		ref
	) => {
		const fishTabRef = useRef<FishTabHandle>(null);
		const bugsTabRef = useRef<BugsTabHandle>(null);
		const crittersTabRef = useRef<CrittersTabHandle>(null);

		const saveCollections = () => {
			if (activeCollectionType === "fish" && fishTabRef.current) {
				const fishState = fishTabRef.current.saveCollectionState();
				onUpdate("fish", fishState.collected);
				onDonationUpdate("fish", fishState.donated);
			}

			if (activeCollectionType === "bugs" && bugsTabRef.current) {
				const bugsState = bugsTabRef.current.saveCollectionState();
				onUpdate("bugs", bugsState.collected);
				onDonationUpdate("bugs", bugsState.donated);
			}

			if (activeCollectionType === "critters" && crittersTabRef.current) {
				const crittersState = crittersTabRef.current.saveCollectionState();
				onUpdate("critters", crittersState.collected);
				onDonationUpdate("critters", crittersState.donated);
			}

			return true
		};

		React.useImperativeHandle(ref, () => ({
			saveCollections,
		}));

		const renderActiveCollection = () => {
			switch (activeCollectionType) {
				case "fish":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Fish ({collections.fish.length}/{fish.length})
							</h2>
							<FishTab
								ref={fishTabRef}
								collected={collections.fish}
								donated={donations.fish}
								onCollectedChange={(id, collected) => {
									const updatedCollection = collected
										? [...collections.fish, id]
										: collections.fish.filter((itemId) => itemId !== id);
									onUpdate("fish", updatedCollection);
								}}
								onDonatedChange={(id, donated) => {
									const updatedDonations = donated
										? [...donations.fish, id]
										: donations.fish.filter((itemId) => itemId !== id);
									onDonationUpdate("fish", updatedDonations);
								}}
							/>
						</div>
					);
				case "bugs":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Bugs ({collections.bugs.length}/{bugs.length})
							</h2>
							<BugsTab
								ref={bugsTabRef}
								collected={collections.bugs}
								donated={donations.bugs}
								onCollectedChange={(id, collected) => {
									const updatedCollection = collected
										? [...collections.bugs, id]
										: collections.bugs.filter((itemId) => itemId !== id);
									onUpdate("bugs", updatedCollection);
								}}
								onDonatedChange={(id, donated) => {
									const updatedDonations = donated
										? [...donations.bugs, id]
										: donations.bugs.filter((itemId) => itemId !== id);
									onDonationUpdate("bugs", updatedDonations);
								}}
							/>
						</div>
					);
				case "critters":
					return (
						<div className="space-y-4">
							<h2 className="text-primary text-2xl font-bold">
								Critters ({collections.critters?.length || 0}/{critters.length})
							</h2>
							<CrittersTab
								ref={crittersTabRef}
								collected={collections.critters || []}
								donated={donations.critters || []}
								onCollectedChange={(id, collected) => {
									const updatedCollection = collected
										? [...(collections.critters || []), id]
										: (collections.critters || []).filter(
												(itemId) => itemId !== id
											);
									onUpdate("critters", updatedCollection);
								}}
								onDonatedChange={(id, donated) => {
									const updatedDonations = donated
										? [...(donations.critters || []), id]
										: (donations.critters || []).filter(
												(itemId) => itemId !== id
											);
									onDonationUpdate("critters", updatedDonations);
								}}
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
