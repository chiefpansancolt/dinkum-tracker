export interface NotFoundCardProps {
  message: string;
}

export interface CollectionStatsProps {
  collections: {
    fish: string[];
    bugs: string[];
    critters: string[];
  };
  donations?: {
    fish: string[];
    bugs: string[];
    critters: string[];
  };
}
