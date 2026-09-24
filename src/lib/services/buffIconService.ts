import { buffIcons, type BuffIcons } from "dinkum-data";

export const getBuffIcon = (
  buffName: string,
  value?: number,
): { icon: string; level?: number } => {
  const icons = buffIcons();

  if (value) {
    if (buffName === "attackLevel" && value <= 3) {
      return {
        icon: icons[`attackLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "defenseLevel" && value <= 3) {
      return {
        icon: icons[`defenseLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "experienceLevel" && value <= 3) {
      return {
        icon: icons[`experienceLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "fishLevel" && value <= 3) {
      return {
        icon: icons[`fishLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "foragingLevel" && value <= 3) {
      return {
        icon: icons[`foragingLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "miningLevel" && value <= 3) {
      return {
        icon: icons[`miningLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "speedLevel" && value <= 3) {
      return {
        icon: icons[`speedLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "swimmingLevel" && value <= 3) {
      return {
        icon: icons[`swimmingLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "fastHealthTickSpeedLevel" && value <= 2) {
      return {
        icon: icons[`fastHealthTickSpeedLevel${value}` as keyof BuffIcons],
        level: value,
      };
    } else if (buffName === "coolLevel" && value <= 2) {
      return {
        icon: icons[`coolLevel${value}` as keyof BuffIcons],
        level: value,
      };
    }
  }

  return { icon: icons[buffName as keyof BuffIcons] };
};
