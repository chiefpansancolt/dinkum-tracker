// Types for our playthrough data
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
}

const STORAGE_KEY = "dinkum-tracker-playthroughs";

// Get all playthroughs from localStorage
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

// Get a single playthrough by ID
export const getPlaythroughById = (id: string): Playthrough | null => {
    const playthroughs = getPlaythroughs();
    return playthroughs.find((playthrough) => playthrough.id === id) || null;
};

// Save a new playthrough
export const savePlaythrough = (playthrough: Playthrough): void => {
    if (typeof window === "undefined") {
        return;
    }

    const playthroughs = getPlaythroughs();

    // Check if playthrough with this ID already exists
    const existingIndex = playthroughs.findIndex((p) => p.id === playthrough.id);

    if (existingIndex >= 0) {
        // Update existing playthrough
        playthroughs[existingIndex] = {
            ...playthrough,
            lastUpdated: new Date().toISOString(),
        };
    } else {
        // Add new playthrough
        playthroughs.push({
            ...playthrough,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
        });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(playthroughs));
};

// Delete a playthrough
export const deletePlaythrough = (id: string): void => {
    if (typeof window === "undefined") {
        return;
    }

    const playthroughs = getPlaythroughs();
    const updatedPlaythroughs = playthroughs.filter((p) => p.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlaythroughs));
};

// Create empty playthrough template
export const createEmptyPlaythrough = (name: string): Playthrough => {
    return {
        id: Date.now().toString(),
        name,
        createdAt: "", // Will be set by savePlaythrough
        lastUpdated: "", // Will be set by savePlaythrough
        collections: {
            animals: [],
            fish: [],
            bugs: [],
            minerals: [],
            items: [],
        },
        milestones: {},
    };
};
