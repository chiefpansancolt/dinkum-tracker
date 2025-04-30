import { Badge, Button, Checkbox, Tooltip } from "flowbite-react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MilestoneCardProps } from "@/types";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import PermitValue from "@/playthrough/ui/itemcard/PermitValue";

const MilestoneCard = ({
	milestone,
	milestoneCollection,
	isPreviousLevelObtained,
	onToggleMilestoneLevel,
	onToggleAllLevels,
	areAllLevelsComplete,
}: MilestoneCardProps) => {
	const allComplete = areAllLevelsComplete(milestone);

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={milestone.name}
					renderRightComp={() => (
						<Button
							size="xs"
							color={allComplete ? "accent" : "secondary"}
							onClick={() => onToggleAllLevels(milestone, !allComplete)}
						>
							{allComplete ? "Clear All" : "Complete All"}
						</Button>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={milestone.img} name={milestone.name} isCollected={allComplete} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					<div className="text-gray-800 dark:text-gray-100">{milestone.description}</div>

					{milestone.levels.map((level) => {
						const milestoneKey = `${milestone.id}_level_${level.level}`;
						const isObtained = milestoneCollection[milestoneKey] === true;
						const canObtain = isPreviousLevelObtained(milestone.id, level.level);

						return (
							<div
								key={milestoneKey}
								className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900"
							>
								<div className="flex items-center gap-2">
									{!canObtain ? (
										<Tooltip content="Complete previous level(s) first">
											<span className="inline-flex">
												<HiOutlineLockClosed className="text-gray-400" />
											</span>
										</Tooltip>
									) : (
										<Checkbox
											id={`milestone-${milestone.id}-level-${level.level}`}
											checked={isObtained}
											onChange={() =>
												onToggleMilestoneLevel(milestone.id, level.level)
											}
											disabled={!canObtain}
											className="mr-2"
										/>
									)}
									<label
										htmlFor={`milestone-${milestone.id}-level-${level.level}`}
										className="flex-1 cursor-pointer"
									>
										<span className="font-medium">Level {level.level}:</span>
										<span className="ml-1">{level.count.toLocaleString()}</span>
										{level.unit && <span className="ml-1">{level.unit}</span>}
									</label>
									<Badge color="indigo">
										<PermitValue price={level.permitPoints} />
									</Badge>
								</div>
							</div>
						);
					})}
				</div>
			)}
		/>
	);
};

export default MilestoneCard;
