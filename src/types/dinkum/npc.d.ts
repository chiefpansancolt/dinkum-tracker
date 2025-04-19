export interface NPC {
  id: string;
  name: string;
  img: string;
  occupation: string;
  requirements: {
    visit: string;
    moveIn: string;
  };
  foodPreferences: {
    likes: string;
    likesImg: string;
    dislikes: string;
    dislikesImg: string;
  };
}

export interface NPCsTabProps {
  collected: Record<string, number>;
}

export interface NPCsTabHandle {
  saveRelationships: () => boolean;
}

export interface NPCCardProps {
  npc: NPC;
  hearts: number;
  onHeartsChange: (id: string, hearts: number) => void;
}

export interface NPCStatsProps {
  collected: Record<string, number>;
}
