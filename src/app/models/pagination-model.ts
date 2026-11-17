import { ModelMovie } from './movie-model';

export interface ModelPaginationResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: ModelMovie[];
}