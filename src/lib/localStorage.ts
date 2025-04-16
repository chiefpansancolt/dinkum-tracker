import { Season } from "@/types/dinkum";

export interface CalendarData {
  currentDay: number;
  currentSeason: Season;
}
export interface Playthrough {
  id: string;
  name: string;
  createdAt: string;
  lastUpdated: string;
  collections: {
    animals: string[];
    fish: string[];
    bugs: string[];
    minerals: string[];
    items: string[];
  };
  milestones: {
    [key: string]: boolean;
  };
  calendar: CalendarData;
}

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
      animals: [],
      fish: [],
      bugs: [],
      minerals: [],
      items: [],
    },
    milestones: {},
    calendar: {
      currentDay: 1,
      currentSeason: "Summer",
    },
  };
};

export const updatePlaythroughCalendar = (playthroughId: string, calendarData: CalendarData): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const playthrough = getPlaythroughById(playthroughId);
  
  if (!playthrough) {
    return false;
  }
  
  const updatedPlaythrough = {
    ...playthrough,
    calendar: calendarData,
    lastUpdated: new Date().toISOString(),
  };
  
  savePlaythrough(updatedPlaythrough);
  
  return true;
};

export const getPlaythroughCalendar = (playthroughId: string): CalendarData | null => {
  const playthrough = getPlaythroughById(playthroughId);
  
  if (!playthrough || !playthrough.calendar) {
    return {
      currentDay: 1,
      currentSeason: "Summer",
    };
  }
  
  return playthrough.calendar;
};
