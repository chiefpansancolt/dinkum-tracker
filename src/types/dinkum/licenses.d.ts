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

export interface LicensesTabProps {
  licenses: {
    [key: string]: boolean;
  };
}

export interface LicensesTabHandle {
  saveLicenses: () => boolean;
}

export interface LicenseCardProps {
  license: License;
  isObtained: boolean;
  onObtainedChange: (id: string, isObtained: boolean) => void;
}

export interface LicenseStatsProps {
  licenses: {
    [key: string]: boolean;
  };
}
