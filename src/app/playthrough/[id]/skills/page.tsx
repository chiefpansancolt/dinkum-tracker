"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { skills } from "@/data/dinkum";
import { Playthrough } from "@/types";
import TabHeader from "@/playthrough/ui/TabHeader";
import SkillCard from "./SkillCard";
import LoadingPlaythrough from "@/playthrough/LoadingPlaythrough";
import SaveFAB from "@/playthrough/SaveFAB";
import NotFoundCard from "@/comps/NotFoundCard";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";

export default function SkillsPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);

			if (data) {
				setSkillLevels(data.skillLevels || {});
			}

			setIsLoading(false);
		}
	}, [playthroughId]);

	const handleSkillLevelChange = (skillId: string, delta: number) => {
		setSkillLevels((prev) => {
			const currentLevel = prev[skillId] || 0;
			const newLevel = Math.max(0, currentLevel + delta);

			if (currentLevel === 0 && delta < 0) return prev;

			if (currentLevel !== newLevel) {
				setIsDirty(true);
			}

			return {
				...prev,
				[skillId]: newLevel,
			};
		});
	};

	const handleSave = () => {
		if (!isDirty) return false;

		const success = updatePlaythroughData(playthroughId, {
			skillLevels: skillLevels,
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading skills..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="Skills" />
			<div className="space-y-6 p-6">
				<TabHeader
					title="Skills"
					enableCollectionCount={false}
					enableSaveAlert={true}
					isDirty={isDirty}
					dirtyMessage="Your skill levels have not been saved yet."
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{skills.map((skill) => (
						<SkillCard
							key={skill.id}
							skill={skill}
							level={skillLevels[skill.id] || 0}
							onLevelChange={(delta) => handleSkillLevelChange(skill.id, delta)}
						/>
					))}
				</div>

				<SaveFAB isDirty={isDirty} onSave={handleSave} />
			</div>
		</>
	);
}
