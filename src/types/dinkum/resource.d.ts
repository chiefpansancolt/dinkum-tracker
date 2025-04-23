export interface Resource {
  name: string;
  img: string;
  count: number;
}

export interface ResourceVariant {
  id: string;
  outputCount?: number;
  inputs: Resource[];
}
