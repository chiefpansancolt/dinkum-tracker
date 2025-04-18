import { CalendarData, Collection } from "@/types/dinkum";
import { Playthrough } from "@/types/app";

const STORAGE_KEY = "dinkum-tracker-playthroughs";

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
      ...updatedPlaythrough.collections,
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
      ...updatedPlaythrough.milestones,
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

  savePlaythrough(updatedPlaythrough);

  return true;
};
