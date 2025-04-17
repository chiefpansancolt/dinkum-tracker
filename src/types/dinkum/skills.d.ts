export interface Skill {
  id: string;
  name: string;
  img: string;
  description: string;
}

export interface SkillCardProps {
  skill: Skill;
  level: number;
  onLevelChange: (delta: number) => void;
}

export interface SkillsTabProps {
  skillLevels: Record<string, number>;
}

export interface SkillsTabHandle {
  saveSkills: () => boolean;
}

export interface SkillStatsProps {
  skillLevels: Record<string, number>;
}