export interface ISpecies {
  image_label: number;
  common_name: string;
  description: string;
  scientific_name: string;
  family: string;
  fauna_class: string;
  fauna_infra_class: string;
  conservation_status: string;
  habitat: string;
  diet: string;
  lifespan: number;
  geographic_range: string;
  fun_fact: string;
  id: number;
}

export interface ISpeciesResponse {
  data: ISpecies[];
  count: string;
}

export interface ISpeciesQueryParams {
  label?: string;
  scientific_name?: string;
  common_name?: string;
}
