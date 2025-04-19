import { CalendarData, Collection } from "@/types/dinkum";
import { Playthrough } from "@/types/app";

export const STORAGE_KEY = "dinkum-tracker-playthroughs";

export const getPlaythroughs = (): Playthrough[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    return [];
  }

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error parsing playthroughs from localStorage:", error);
    return [];
  }
};

export const getPlaythroughById = (id: string): Playthrough | null => {
  const playthroughs = getPlaythroughs();
  return playthroughs.find((playthrough) => playthrough.id === id) || null;
};

export const savePlaythrough = (playthrough: Playthrough): void => {
  if (typeof window === "undefined") {
    return;
  }

  const playthroughs = getPlaythroughs();

  const existingIndex = playthroughs.findIndex((p) => p.id === playthrough.id);

  if (existingIndex >= 0) {
    playthroughs[existingIndex] = {
      ...playthrough,
      lastUpdated: new Date().toISOString(),
    };
  } else {
    playthroughs.push({
      ...playthrough,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(playthroughs));
};

export const deletePlaythrough = (id: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  const playthroughs = getPlaythroughs();
  const updatedPlaythroughs = playthroughs.filter((p) => p.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlaythroughs));
};

export const createEmptyPlaythrough = (name: string): Playthrough => {
  return {
    id: Date.now().toString(),
    name,
    createdAt: "",
    lastUpdated: "",
    collections: {
      fish: [],
      bugs: [],
      critters: [],
    },
    donations: {
      fish: [],
      bugs: [],
      critters: [],
    },
    milestones: {},
    licenses: {},
    buildings: {},
    skillLevels: {},
    calendar: {
      currentDay: 1,
      currentSeason: "Summer",
    },
    relationships: {},
    cookingRecipes: {},
    craftingRecipes: {},
    books: {},
    tools: {},
    weapons: {},
    equipment: {},
    vehicles: {},
    clothing: {},
    furniture: {},
  };
};

export const updatePlaythroughData = (
  playthroughId: string,
  updates: {
    collections?: Partial<Collection>;
    donations?: Partial<Collection>;
    calendar?: CalendarData;
    milestones?: Record<string, boolean>;
    licenses?: Record<string, boolean>;
    buildings?: Record<string, boolean>;
    skillLevels?: Record<string, number>;
    relationships?: Record<string, number>;
    cookingRecipes?: Record<string, boolean>;
    craftingRecipes?: Record<string, boolean>;
    books?: Record<string, boolean>;
    tools?: Record<string, boolean>;
    weapons?: Record<string, boolean>;
    equipment?: Record<string, boolean>;
    vehicles?: Record<string, boolean>;
    clothing?: Record<string, boolean>;
    furniture?: Record<string, boolean>;
  },
): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const playthrough = getPlaythroughById(playthroughId);

  if (!playthrough) {
    return false;
  }

  const updatedPlaythrough = {
    ...playthrough,
    lastUpdated: new Date().toISOString(),
  };

  if (updates.collections) {
    updatedPlaythrough.collections = {
      ...(updatedPlaythrough.collections || {
        fish: [],
        bugs: [],
        critters: [],
      }),
      ...updates.collections,
    };
  }

  if (updates.donations) {
    updatedPlaythrough.donations = {
      ...(updatedPlaythrough.donations || {
        fish: [],
        bugs: [],
        critters: [],
      }),
      ...updates.donations,
    };
  }

  if (updates.calendar) {
    updatedPlaythrough.calendar = updates.calendar;
  }

  if (updates.milestones) {
    updatedPlaythrough.milestones = {
      ...(updatedPlaythrough.milestones || {}),
      ...updates.milestones,
    };
  }

  if (updates.licenses) {
    updatedPlaythrough.licenses = {
      ...(updatedPlaythrough.licenses || {}),
      ...updates.licenses,
    };
  }

  if (updates.buildings) {
    updatedPlaythrough.buildings = {
      ...(updatedPlaythrough.buildings || {}),
      ...updates.buildings,
    };
  }

  if (updates.skillLevels) {
    updatedPlaythrough.skillLevels = {
      ...(updatedPlaythrough.skillLevels || {}),
      ...updates.skillLevels,
    };
  }

  if (updates.relationships) {
    updatedPlaythrough.relationships = {
      ...(updatedPlaythrough.relationships || {}),
      ...updates.relationships,
    };
  }

  if (updates.cookingRecipes) {
    updatedPlaythrough.cookingRecipes = {
      ...(updatedPlaythrough.cookingRecipes || {}),
      ...updates.cookingRecipes,
    };
  }

  if (updates.craftingRecipes) {
    updatedPlaythrough.craftingRecipes = {
      ...(updatedPlaythrough.craftingRecipes || {}),
      ...updates.craftingRecipes,
    };
  }

  if (updates.books) {
    updatedPlaythrough.books = {
      ...(updatedPlaythrough.books || {}),
      ...updates.books,
    };
  }

  if (updates.tools) {
    updatedPlaythrough.tools = {
      ...(updatedPlaythrough.tools || {}),
      ...updates.tools,
    };
  }

  if (updates.weapons) {
    updatedPlaythrough.weapons = {
      ...(updatedPlaythrough.weapons || {}),
      ...updates.weapons,
    };
  }

  if (updates.equipment) {
    updatedPlaythrough.equipment = {
      ...(updatedPlaythrough.equipment || {}),
      ...updates.equipment,
    };
  }

  if (updates.vehicles) {
    updatedPlaythrough.vehicles = {
      ...(updatedPlaythrough.vehicles || {}),
      ...updates.vehicles,
    };
  }

  if (updates.clothing) {
    updatedPlaythrough.clothing = {
      ...(updatedPlaythrough.clothing || {}),
      ...updates.clothing,
    };
  }

  if (updates.furniture) {
    updatedPlaythrough.furniture = {
      ...(updatedPlaythrough.furniture || {}),
      ...updates.furniture,
    };
  }

  savePlaythrough(updatedPlaythrough);

  return true;
};
