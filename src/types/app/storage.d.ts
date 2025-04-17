import { CalendarData } from "../dinkum/calendar";
import { Collection } from "../dinkum/collections";

export interface Playthrough {
  id: string;
  name: string;
  createdAt: string;
  lastUpdated: string;
  collections: Collection;
  donations: Collection;
  milestones: {
    [key: string]: boolean;
  };
  licenses: {
    [key: string]: boolean;
  };
  skillLevels: Record<string, number>;
  calendar: CalendarData;
  relationships: Record<string, number>;
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
  skillLevels?: Record<string, number>;
  relationships?: Record<string, number>;
}
