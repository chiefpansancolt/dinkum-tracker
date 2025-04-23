"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { npcs } from "@/data/dinkum";
import { updatePlaythroughData } from "@/lib/localStorage";
import { TabHandle, CollectNumberTabProps } from "@/types";
import NPCCard from "@/playthrough/npcs/NPCCard";
import SaveAlert from "@/comps/SaveAlert";

const NPCsTab = forwardRef<TabHandle, CollectNumberTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localRelationships, setLocalRelationships] = useState<Record<string, number>>(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalRelationships(collected);
		isDirty.current = false;
	}, [collected]);

	const handleHeartChange = (npcId: string, hearts: number) => {
		setLocalRelationships((prev) => ({
			...prev,
			[npcId]: hearts,
		}));

		isDirty.current = true;
	};

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			relationships: localRelationships,
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

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-primary mb-2 text-2xl font-bold">NPCs</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Track your relationships with Dinkum&apos;s characters. Build friendship with
					NPCs to unlock new shops and features.
				</p>

				{isDirty.current && (
					<SaveAlert message="Your NPC relationship progress has not been saved yet." />
				)}
			</div>

			<div>
				<div className="mb-4 flex items-center">
					<h2 className="text-xl font-bold text-gray-800 dark:text-white">Characters</h2>
					<Badge color="info" className="ml-3">
						{npcs.length} Total
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{npcs.map((npc) => (
						<NPCCard
							key={npc.id}
							npc={npc}
							hearts={localRelationships[npc.id] || 0}
							onHeartsChange={handleHeartChange}
						/>
					))}
				</div>
			</div>
		</div>
	);
});

NPCsTab.displayName = "NPCsTab";

export default NPCsTab;
