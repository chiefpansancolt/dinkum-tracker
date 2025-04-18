import { Season, SeasonStyle } from "@/types/dinkum";

export const getSeasonStyles = (season: Season): SeasonStyle => {
  switch (season) {
    case "Summer":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        border: "border-yellow-400",
        text: "text-yellow-800 dark:text-yellow-200",
        accent: "bg-yellow-500",
        hover: "hover:bg-yellow-200 dark:hover:bg-yellow-800/50",
        cardBg: "bg-yellow-50 dark:bg-yellow-900/20",
      };
    case "Autumn":
      return {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        border: "border-orange-400",
        text: "text-orange-800 dark:text-orange-200",
        accent: "bg-orange-500",
        hover: "hover:bg-orange-200 dark:hover:bg-orange-800/50",
        cardBg: "bg-orange-50 dark:bg-orange-900/20",
      };
    case "Winter":
      return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-400",
        text: "text-blue-800 dark:text-blue-200",
        accent: "bg-blue-500",
        hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
        cardBg: "bg-blue-50 dark:bg-blue-900/20",
      };
    case "Spring":
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        border: "border-green-400",
        text: "text-green-800 dark:text-green-200",
        accent: "bg-green-500",
        hover: "hover:bg-green-200 dark:hover:bg-green-800/50",
        cardBg: "bg-green-50 dark:bg-green-900/20",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-800",
        border: "border-gray-400",
        text: "text-gray-800 dark:text-gray-200",
        accent: "bg-gray-500",
        hover: "hover:bg-gray-200 dark:hover:bg-gray-700",
        cardBg: "bg-gray-50 dark:bg-gray-800/50",
      };
  }
};

export const getSeasonEmoji = (season: Season): string => {
  switch (season) {
    case "Summer":
      return "☀️";
    case "Autumn":
      return "🍂";
    case "Winter":
      return "❄️";
    case "Spring":
      return "🌱";
    default:
      return "📅";
  }
};
