/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "flowbite-react";
import { SkillCardProps } from "@/types";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";

const SkillCard = ({ skill, level, onLevelChange }: SkillCardProps) => {
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
					<h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
						{skill.name}
					</h3>
				</div>
			)}
			renderDetails={() => (
				<div className="space-y-4">
					<p className="mb-4 flex-grow text-gray-700 dark:text-gray-100">
						{skill.description}
					</p>
				</div>
			)}
			renderFooter={() => (
				<div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
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

						<span className="w-10 text-center font-medium text-gray-800 dark:text-gray-50">
							{level}
						</span>

						<Button color="gray" size="sm" onClick={() => onLevelChange(1)}>
							<HiPlusSm className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		/>
	);
};

export default SkillCard;
