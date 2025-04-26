/* eslint-disable @next/next/no-img-element */
import { ItemBuffsProps } from "@/types";
import { BuffIcons } from "@/data/constants";

const getBuffIcon = (buffName: string, value?: number): { icon: string; level?: number } => {
	if (value) {
		if (buffName === "attackLevel" && value <= 3) {
			return {
				icon: BuffIcons[`attackLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "defenseLevel" && value <= 3) {
			return {
				icon: BuffIcons[`defenseLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "experienceLevel" && value <= 3) {
			return {
				icon: BuffIcons[`experienceLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "fishLevel" && value <= 3) {
			return {
				icon: BuffIcons[`fishLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "foragingLevel" && value <= 3) {
			return {
				icon: BuffIcons[`foragingLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "miningLevel" && value <= 3) {
			return {
				icon: BuffIcons[`miningLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "speedLevel" && value <= 3) {
			return {
				icon: BuffIcons[`speedLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "swimmingLevel" && value <= 3) {
			return {
				icon: BuffIcons[`swimmingLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "fastHealthTickSpeedLevel" && value <= 2) {
			return {
				icon: BuffIcons[`fastHealthTickSpeedLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		} else if (buffName === "coolLevel" && value <= 2) {
			return {
				icon: BuffIcons[`coolLevel${value}` as keyof typeof BuffIcons],
				level: value,
			};
		}
	}

	return { icon: BuffIcons[buffName as keyof typeof BuffIcons] };
};

const ItemBuffs = ({ id, buffs }: ItemBuffsProps) => {
	return (
		<>
			{buffs && Object.keys(buffs).length > 1 && (
				<div className="grid grid-cols-12">
					<div className="col-span-4 font-medium">Buffs:</div>
					<div className="col-span-8">
						<div className="flex flex-wrap items-center gap-1">
							{buffs.length && (
								<div
									key={`${id}-buff-length`}
									className="flex items-center"
									title="Buff Duration"
								>
									<img
										src={BuffIcons.length}
										alt="Buff Duration"
										className="h-7 w-7 object-contain"
									/>
									<span className="ml-1 text-xs">{buffs.length}</span>
								</div>
							)}

							{Object.entries(buffs).map(([buffName, value]) => {
								if (buffName === "length") return null;

								const { icon, level } = getBuffIcon(buffName, value as number);

								return (
									<div
										key={`${id}-buff-${buffName}`}
										className="flex items-center"
										title={buffName
											.replace(/([A-Z])/g, " $1")
											.replace(/^./, (str) => str.toUpperCase())}
									>
										{icon && (
											<img
												src={icon}
												alt={buffName}
												className="h-5 w-5 object-contain"
											/>
										)}
										{typeof value === "number" && !level && (
											<span className="ml-1 text-xs">
												{value}
												{buffName === "healthRegenRate" && "/t"}
												{buffName === "staminaRegenRate" && "/s"}
											</span>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ItemBuffs;
