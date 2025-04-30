import { Badge, Card } from "flowbite-react";
import React from "react";
import { CollectNumberTabProps } from "@/types";
import { skills } from "@/data/dinkum";

const SkillStats: React.FC<CollectNumberTabProps> = ({ collected }) => {
	const hasSkills = Object.keys(collected).length > 0;

	return (
		<Card className="flex h-full flex-col text-gray-900 dark:text-gray-50">
			<div className="flex h-full flex-col">
				<div className="flex-none">
					<h2 className="text-primary mb-4 text-xl font-bold">Character Skills</h2>
				</div>

				<div className="flex-grow overflow-auto">
					{!hasSkills ? (
						<p className="text-gray-500 italic">No skills recorded yet.</p>
					) : (
						<div className="space-y-4">
							{skills.map((skill) => {
								const level = collected[skill.id] || 0;

								return (
									<div
										key={skill.id}
										className="flex items-center justify-between"
									>
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
				</div>
			</div>
		</Card>
	);
};

export default SkillStats;
