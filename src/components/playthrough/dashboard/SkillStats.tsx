/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, Badge } from "flowbite-react";
import { skills } from "@/data/dinkum";
import { SkillStatsProps } from "@/types/dinkum";

const SkillStats: React.FC<SkillStatsProps> = ({ skillLevels = {} }) => {
	const hasSkills = Object.keys(skillLevels).length > 0;

	return (
		<Card className="h-full">
			<h2 className="text-primary mb-4 text-xl font-bold">Character Skills</h2>

			{!hasSkills ? (
				<p className="text-gray-500 italic">No skills recorded yet.</p>
			) : (
				<div className="space-y-4">
					{skills.map((skill) => {
						const level = skillLevels[skill.id] || 0;

						return (
							<div key={skill.id} className="flex items-center justify-between">
								<div className="flex items-center">
									{skill.img && (
										<img
											src={skill.img}
											alt={skill.name}
											className="mr-2 h-6 w-6 object-contain"
										/>
									)}
									<span className="font-medium">{skill.name}</span>
								</div>
								<Badge color="blue" size="sm">
									Level {level}
								</Badge>
							</div>
						);
					})}
				</div>
			)}
		</Card>
	);
};

export default SkillStats;
