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
