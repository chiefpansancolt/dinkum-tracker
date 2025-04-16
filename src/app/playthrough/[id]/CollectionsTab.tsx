"use client";

import React, { useRef } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import FishTab, { FishTabHandle } from "@/comps/playthrough/FishTab";
import BugsTab, { BugsTabHandle } from "@/comps/playthrough/BugsTab";
import CrittersTab, { CrittersTabHandle } from "@/comps/playthrough/CrittersTab";
import { fish } from "@/data/dinkum/pedia/fish";
import { bugs } from "@/data/dinkum/pedia/bugs";
import { critters } from "@/data/dinkum/pedia/critters";

interface Collection {
	fish: string[];
	bugs: string[];
	critters: string[];
}

interface DonationCollection {
	fish: string[];
	bugs: string[];
	critters: string[];
}

interface CollectionsTabProps {
	collections: Collection;
	donations?: DonationCollection;
	onUpdate: (collectionType: keyof Collection, itemIds: string[]) => void;
	onDonationUpdate?: (collectionType: keyof DonationCollection, itemIds: string[]) => void;
	onSave?: () => void;
}

export interface CollectionsTabHandle {
	saveCollections: () => void;
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
			onUpdate,
			onDonationUpdate = () => {},
			onSave,
		},
		ref
	) => {
		const fishTabRef = useRef<FishTabHandle>(null);
		const bugsTabRef = useRef<BugsTabHandle>(null);
		const crittersTabRef = useRef<CrittersTabHandle>(null);

		const saveCollections = () => {
			if (fishTabRef.current) {
				const fishState = fishTabRef.current.saveCollectionState();
				onUpdate("fish", fishState.collected);
				onDonationUpdate("fish", fishState.donated);
			}

			if (bugsTabRef.current) {
				const bugsState = bugsTabRef.current.saveCollectionState();
				onUpdate("bugs", bugsState.collected);
				onDonationUpdate("bugs", bugsState.donated);
			}

			if (crittersTabRef.current) {
				const crittersState = crittersTabRef.current.saveCollectionState();
				onUpdate("critters", crittersState.collected);
				onDonationUpdate("critters", crittersState.donated);
			}

			if (onSave) {
				onSave();
			}
		};

		React.useImperativeHandle(ref, () => ({
			saveCollections,
		}));

		return (
			<div className="space-y-6">
				<Accordion>
					<AccordionPanel>
						<AccordionTitle>
							Fish ({collections.fish.length}/{fish.length})
						</AccordionTitle>
						<AccordionContent>
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
						</AccordionContent>
					</AccordionPanel>

					<AccordionPanel>
						<AccordionTitle>
							Bugs ({collections.bugs.length}/{bugs.length})
						</AccordionTitle>
						<AccordionContent>
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
						</AccordionContent>
					</AccordionPanel>

					<AccordionPanel>
						<AccordionTitle>
							Critters ({collections.critters?.length || 0}/{critters.length})
						</AccordionTitle>
						<AccordionContent>
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
						</AccordionContent>
					</AccordionPanel>
				</Accordion>
			</div>
		);
	}
);

CollectionsTab.displayName = "CollectionsTab";

export default CollectionsTab;
