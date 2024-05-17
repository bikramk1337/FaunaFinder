export interface ISpecies {
  label: string;
  common_name: string;
  other_names: string;
  description: string;
  scientific_name: string;
  class_name: string;
  order: string;
  family: string;
  size: string;
  habitat: string;
  diet: string;
  breeding: string;
  geographic_range: string;
  other_info: string;
  id: number;
}

export interface ISpeciesResponse {
  data: ISpecies[];
  count: number;
}

export interface ISpeciesQueryParams {
  label?: string;
  scientific_name?: string;
  common_name?: string;
}
