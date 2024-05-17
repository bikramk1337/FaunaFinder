export interface IClassificationHistory {
  image_url: string;
  prediction: string;
  id: number;
  user_id: number;
}

export interface IClassificationHistoryResponse {
  data: IClassificationHistory[];
  count: number;
}
