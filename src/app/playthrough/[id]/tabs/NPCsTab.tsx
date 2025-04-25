"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { npcs } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, CollectNumberTabProps } from "@/types";
import NPCCard from "@/playthrough/npcs/NPCCard";
import TabHeader from "@/components/playthrough/ui/TabHeader";

const NPCsTab = forwardRef<TabHandle, CollectNumberTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localstate, setLocalstate] = useState<Record<string, number>>(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalstate(collected);
		isDirty.current = false;
	}, [collected]);

	const handleHeartChange = (npcId: string, hearts: number) => {
		setLocalstate((prev) => ({
			...prev,
			[npcId]: hearts,
		}));

		isDirty.current = true;
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				relationships: localstate,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	const getTotalHearts = () => {
		return Object.values(localstate).reduce((sum, hearts) => sum + hearts, 0);
	};

	const getMaxPossibleHearts = () => {
		return npcs.length * 5;
	};

	return (
		<div className="space-y-6">
			<TabHeader
				title="NPC's"
				collectionName="Friendship"
				enableCollectionCount={true}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				collectedCount={getTotalHearts()}
				collectionTotal={getMaxPossibleHearts()}
				dirtyMessage="Your NPC Friendship has not been saved yet."
			/>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{npcs.map((npc) => (
					<NPCCard
						key={npc.id}
						npc={npc}
						hearts={localstate[npc.id] || 0}
						onHeartsChange={handleHeartChange}
					/>
				))}
			</div>
		</div>
	);
});

NPCsTab.displayName = "NPCsTab";

export default NPCsTab;
