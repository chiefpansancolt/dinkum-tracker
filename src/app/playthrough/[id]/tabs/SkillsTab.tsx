/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useParams } from "next/navigation";
import { Card, Label, Button } from "flowbite-react";
import { skills } from "@/data/dinkum";
import { SkillCardProps, TabHandle, CollectNumberTabProps } from "@/types";
import { updatePlaythroughData } from "@/lib/localStorage";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import SaveAlert from "@/comps/SaveAlert";

const SkillsTab = forwardRef<TabHandle, CollectNumberTabProps>(({ collected }, ref) => {
	const params = useParams();
	const playthroughId = typeof params.id === "string" ? params.id : "";
	const [localSkillLevels, setLocalSkillLevels] = useState<Record<string, number>>(collected);

	const isDirty = useRef(false);

	useEffect(() => {
		setLocalSkillLevels(collected);
	}, [collected]);

	const handleSkillLevelChange = (skillId: string, delta: number) => {
		setLocalSkillLevels((prev) => {
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

	const save = () => {
		if (!playthroughId || !isDirty.current) return false;

		const success = updatePlaythroughData(playthroughId, {
			skillLevels: localSkillLevels,
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
				<h1 className="text-primary mb-2 text-2xl font-bold">Skills</h1>
			</div>

			{isDirty.current && <SaveAlert message="Your skill progress has not been saved yet." />}

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{skills.map((skill) => (
					<SkillCard
						key={skill.id}
						skill={skill}
						level={localSkillLevels[skill.id] || 0}
						onLevelChange={(delta) => handleSkillLevelChange(skill.id, delta)}
					/>
				))}
			</div>
		</div>
	);
});

const SkillCard: React.FC<SkillCardProps> = ({ skill, level, onLevelChange }) => {
	return (
		<Card className="h-full">
			<div className="flex h-full flex-col">
				<div className="mb-4 flex items-start justify-between">
					<div className="flex items-center">
						{skill.img && (
							<img
								src={skill.img}
								alt={skill.name}
								className="mr-3 h-10 w-10 object-contain"
							/>
						)}
						<h3 className="text-lg font-bold">{skill.name}</h3>
					</div>
				</div>

				<p className="mb-4 flex-grow text-gray-600 dark:text-gray-400">
					{skill.description}
				</p>

				<div className="mt-auto flex items-center justify-between">
					<Label htmlFor={`skill-level-${skill.id}`} className="mr-2">
						Skill Level:
					</Label>

					<div className="flex items-center space-x-2">
						<Button
							color="light"
							size="sm"
							onClick={() => onLevelChange(-1)}
							disabled={level === 0}
						>
							<HiMinusSm className="h-4 w-4" />
						</Button>

						<span className="w-10 text-center font-medium">{level}</span>

						<Button color="light" size="sm" onClick={() => onLevelChange(1)}>
							<HiPlusSm className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

SkillsTab.displayName = "SkillsTab";

export default SkillsTab;
