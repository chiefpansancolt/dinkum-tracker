import { Season } from "@/types/dinkum";

// Add a new interface for calendar data
export interface CalendarData {
  currentDay: number;
  currentSeason: Season;
}

// Update the Playthrough interface to include calendar data
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
  // Add the calendar property
  calendar?: CalendarData;
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
    // Initialize with default calendar values (starting in Summer, day 1)
    calendar: {
      currentDay: 1,
      currentSeason: "Summer",
    },
  };
};

// New helper functions specific to calendar operations

// Update the calendar data for a specific playthrough
export const updatePlaythroughCalendar = (playthroughId: string, calendarData: CalendarData): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const playthrough = getPlaythroughById(playthroughId);
  
  if (!playthrough) {
    return false;
  }
  
  // Update the calendar data
  const updatedPlaythrough = {
    ...playthrough,
    calendar: calendarData,
  };
  
  // Save the updated playthrough
  savePlaythrough(updatedPlaythrough);
  
  return true;
};

// Get calendar data for a specific playthrough
export const getPlaythroughCalendar = (playthroughId: string): CalendarData | null => {
  const playthrough = getPlaythroughById(playthroughId);
  
  if (!playthrough || !playthrough.calendar) {
    // Return default values if no calendar data exists
    return {
      currentDay: 1,
      currentSeason: "Summer",
    };
  }
  
  return playthrough.calendar;
};
