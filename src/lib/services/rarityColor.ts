export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Very Rare":
      return "purple";
    case "Super Rare":
      return "indigo";
    case "Rare":
      return "red";
    case "Uncommon":
      return "blue";
    default:
      return "gray";
  }
};
