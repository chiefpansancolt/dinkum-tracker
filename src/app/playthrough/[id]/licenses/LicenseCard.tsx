import { Button, Badge, Checkbox, Tooltip } from "flowbite-react";
import { LicenseCardProps } from "@/types";
import { HiOutlineLockClosed } from "react-icons/hi";
import ItemCard from "@/playthrough/ui/itemcard/ItemCard";
import ItemHeader from "@/playthrough/ui/itemcard/ItemHeader";
import ItemImage from "@/playthrough/ui/itemcard/ItemImage";
import ItemDetail from "@/playthrough/ui/itemcard/ItemDetail";
import PermiteValue from "@/playthrough/ui/itemcard/PermiteValue";

const LicenseCard = ({
	license,
	licenseCollection,
	isPreviousLevelObtained,
	onToggleLicenseLevel,
	onToggleAllLevels,
	areAllLevelsComplete,
}: LicenseCardProps) => {
	const allComplete = areAllLevelsComplete(license);

	return (
		<ItemCard
			renderHeader={() => (
				<ItemHeader
					title={license.name}
					renderRightComp={() => (
						<Button
							size="xs"
							color={allComplete ? "accent" : "secondary"}
							onClick={() => onToggleAllLevels(license, !allComplete)}
						>
							{allComplete ? "Clear All" : "Complete All"}
						</Button>
					)}
				/>
			)}
			renderImage={() => (
				<ItemImage src={license.img} name={license.name} isCollected={allComplete} />
			)}
			renderDetails={() => (
				<div className="grid grid-cols-1 gap-2">
					{license.requirements && (
						<ItemDetail label="Requirement" details={license.requirements} />
					)}

					{license.levels.map((level) => {
						const licenseKey = `${license.id}_level_${level.level}`;
						const isObtained = licenseCollection[licenseKey] === true;
						const canObtain = isPreviousLevelObtained(license.id, level.level);

						return (
							<div
								key={licenseKey}
								className="rounded-lg bg-gray-100 p-2 dark:bg-gray-900"
							>
								<div className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											{!canObtain ? (
												<Tooltip content="Complete previous level(s) first">
													<span className="inline-flex">
														<HiOutlineLockClosed className="text-gray-400" />
													</span>
												</Tooltip>
											) : (
												<Checkbox
													id={`license-${license.id}-level-${level.level}`}
													checked={isObtained}
													onChange={() =>
														onToggleLicenseLevel(
															license.id,
															level.level,
															!isObtained
														)
													}
													disabled={!canObtain}
													className="mr-2"
												/>
											)}
											<label
												htmlFor={`license-${license.id}-level-${level.level}`}
												className={`${canObtain ? "cursor-pointer" : "cursor-not-allowed text-gray-500"} font-medium`}
											>
												Level {level.level}
											</label>
										</div>
										<Badge color="indigo">
											<PermiteValue price={level.permitPointCost} />
										</Badge>
									</div>

									{level.skillLevel > 0 && (
										<div className="ml-7 text-sm text-gray-600 dark:text-gray-400">
											<span className="font-medium">
												Required Skill Level:{" "}
											</span>
											{level.skillLevel}
										</div>
									)}

									<div className="ml-7 text-sm text-gray-600 dark:text-gray-400">
										{level.description}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		/>
	);
};

export default LicenseCard;
