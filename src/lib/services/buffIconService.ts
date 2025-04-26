import { BuffIcons } from "@/data/constants";

export const getBuffIcon = (
  buffName: string,
  value?: number,
): { icon: string; level?: number } => {
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
        icon: BuffIcons[
          `fastHealthTickSpeedLevel${value}` as keyof typeof BuffIcons
        ],
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
