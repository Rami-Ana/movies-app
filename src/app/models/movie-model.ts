export interface ModelMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  overview: string;
  genre_ids: number[];
  userRating?: number;
}
