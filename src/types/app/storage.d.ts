import { CalendarData } from "../dinkum/calendar";
import { Collection } from "../dinkum/collections";

export interface Playthrough {
  id: string;
  name: string;
  createdAt: string;
  lastUpdated: string;
  collections: Collection;
  donations: Collection;
  milestones: Record<string, boolean>;
  licenses: Record<string, boolean>;
  buildings: Record<string, boolean>;
  skillLevels: Record<string, number>;
  calendar: CalendarData;
  relationships: Record<string, number>;
  cookingRecipes: Record<string, boolean>;
  craftingRecipes: Record<string, boolean>;
  signWritingRecipes: Record<string, boolean>;
  books: Record<string, boolean>;
  tools: Record<string, boolean>;
  weapons: Record<string, boolean>;
  equipment: Record<string, boolean>;
  vehicles: Record<string, boolean>;
  clothing: Record<string, boolean>;
  furniture: Record<string, boolean>;
}

export interface PlaythroughCardProps {
  playthrough: Playthrough;
  onDelete: () => void;
}

export interface DashboardProps {
  playthrough: Playthrough;
}

export interface PlaythroughUpdateData {
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
  signWritingRecipes?: Record<string, boolean>;
  books?: Record<string, boolean>;
  tools?: Record<string, boolean>;
  weapons?: Record<string, boolean>;
  equipment?: Record<string, boolean>;
  vehicles?: Record<string, boolean>;
  clothing?: Record<string, boolean>;
  furniture?: Record<string, boolean>;
}
