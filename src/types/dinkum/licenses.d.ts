export interface LicenseLevel {
  level: number;
  skillLevel: number;
  permitPointCost: number;
  description: string;
}

export interface License {
  id: string;
  name: string;
  img: string;
  requirements: string;
  levels: LicenseLevel[];
}

export interface Skill {
  id: string;
  name: string;
  img: string;
  description: string;
}
