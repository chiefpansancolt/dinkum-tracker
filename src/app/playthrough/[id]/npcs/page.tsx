"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Playthrough } from "@/types";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { getNPCMaxPossibleHearts, npcs } from "@/data/dinkum";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";
import NotFoundCard from "@/comps/NotFoundCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import TabHeader from "@/playthrough/ui/TabHeader";
import NPCCard from "./NPCCard";

export default function NPCsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [relationships, setRelationships] = useState<Record<string, number>>({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setRelationships(data.relationships || {});
			}

			setIsLoading(false);
		}
	}, [playthroughId]);

	const handleHeartChange = (npcId: string, hearts: number) => {
		setRelationships((prev) => {
			if (prev[npcId] !== hearts) {
				setIsDirty(true);
			}
			return {
				...prev,
				[npcId]: hearts,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			relationships: relationships,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const getTotalHearts = () => {
		return Object.values(relationships).reduce((sum, hearts) => sum + hearts, 0);
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading NPC relationships..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="NPC's" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="NPC Relationships"
					collectionName="Hearts"
					enableCollectionCount={true}
					enableSaveAlert={true}
					isDirty={isDirty}
					collectedCount={getTotalHearts()}
					collectionTotal={getNPCMaxPossibleHearts()}
					dirtyMessage="Your NPC relationship changes have not been saved yet."
				/>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{npcs.map((npc) => (
						<NPCCard
							key={npc.id}
							npc={npc}
							hearts={relationships[npc.id] || 0}
							onHeartsChange={handleHeartChange}
						/>
					))}
				</div>

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
