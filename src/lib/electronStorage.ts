import { Playthrough, PlaythroughUpdateData } from "@/types/app";
import { STORAGE_KEY } from "./storage";

export const getPlaythroughs = async (): Promise<Playthrough[]> => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = await window.electron?.store.get(STORAGE_KEY);
    return data || [];
  } catch (error) {
    console.error("Error retrieving playthroughs:", error);
    return [];
  }
};

export const getPlaythroughById = async (
  id: string,
): Promise<Playthrough | null> => {
  const playthroughs = await getPlaythroughs();
  return playthroughs.find((playthrough) => playthrough.id === id) || null;
};

export const savePlaythrough = async (
  playthrough: Playthrough,
): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  const playthroughs = await getPlaythroughs();

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

  await window.electron?.store.set(STORAGE_KEY, playthroughs);
};

export const deletePlaythrough = async (id: string): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  const playthroughs = await getPlaythroughs();
  const updatedPlaythroughs = playthroughs.filter((p) => p.id !== id);

  await window.electron?.store.set(STORAGE_KEY, updatedPlaythroughs);
};

export const updatePlaythroughData = async (
  playthroughId: string,
  updates: PlaythroughUpdateData,
): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  const playthrough = await getPlaythroughById(playthroughId);

  if (!playthrough) {
    return false;
  }

  const updatedPlaythrough = {
    ...playthrough,
    lastUpdated: new Date().toISOString(),
  };

  // Handle all possible update fields
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

  if (updates.signWritingRecipes) {
    updatedPlaythrough.signWritingRecipes = {
      ...(updatedPlaythrough.signWritingRecipes || {}),
      ...updates.signWritingRecipes,
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

  if (updates.cassettes) {
    updatedPlaythrough.cassettes = {
      ...(updatedPlaythrough.cassettes || {}),
      ...updates.cassettes,
    };
  }

  await savePlaythrough(updatedPlaythrough);
  return true;
};
