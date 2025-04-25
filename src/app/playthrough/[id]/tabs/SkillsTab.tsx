/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { skills } from "@/data/dinkum";
import { SkillCardProps, TabHandle, CollectNumberTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import TabHeader from "@/playthrough/ui/TabHeader";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";

const SkillsTab = forwardRef<TabHandle, CollectNumberTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localState, setLocalState] = useState<Record<string, number>>(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalState(collected);
	}, [collected]);

	const handleSkillLevelChange = (skillId: string, delta: number) => {
		setLocalState((prev) => {
			const currentLevel = prev[skillId] || 0;
			const newLevel = Math.max(0, currentLevel + delta);

			if (currentLevel === 0 && delta < 0) return prev;

			isDirty.current = true;
			return {
				...prev,
				[skillId]: newLevel,
			};
		});
	};

	useImperativeHandle(ref, () => ({
		save: () => {
			if (!playthroughId || !isDirty.current) return false;

			const success = updatePlaythroughData(playthroughId, {
				skillLevels: localState,
			});

			if (success) {
				isDirty.current = false;
				return true;
			}

			return false;
		},
	}));

	return (
		<div className="space-y-6">
			<TabHeader
				title="Skills"
				enableCollectionCount={false}
				enableSaveAlert={true}
				isDirty={isDirty.current}
				dirtyMessage="Your skills collection has not been saved yet."
			/>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{skills.map((skill) => (
					<SkillCard
						key={skill.id}
						skill={skill}
						level={localState[skill.id] || 0}
						onLevelChange={(delta) => handleSkillLevelChange(skill.id, delta)}
					/>
				))}
			</div>
		</div>
	);
});

const SkillCard: React.FC<SkillCardProps> = ({ skill, level, onLevelChange }) => {
	return (
		<ItemCard
			renderHeader={() => (
				<div className="flex items-center">
					{skill.img && (
						<img
							src={skill.img}
							alt={skill.name}
							className="mr-3 h-10 w-10 object-contain"
						/>
					)}
					<h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">{skill.name}</h3>
				</div>
			)}
			renderDetails={() => (
				<p className="mb-4 flex-grow text-gray-700 dark:text-gray-100">
					{skill.description}
				</p>
			)}
			renderFooter={() => (
				<div className="mt-auto flex items-center justify-between border-t pt-4 border-gray-200 dark:border-gray-700">
					<div className="font-medium text-gray-900 dark:text-gray-50">Skill Level:</div>
					<div className="flex items-center space-x-2">
						<Button
							color="gray"
							size="sm"
							onClick={() => onLevelChange(-1)}
							disabled={level === 0}
						>
							<HiMinusSm className="h-4 w-4" />
						</Button>

						<span className="w-10 text-center font-medium text-gray-800 dark:text-gray-50">{level}</span>

						<Button color="gray" size="sm" onClick={() => onLevelChange(1)}>
							<HiPlusSm className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		/>
	);
};

SkillsTab.displayName = "SkillsTab";

export default SkillsTab;
