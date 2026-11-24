export interface UserMovieEntry {
  movieId: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];

  isFavorite: boolean;
  rating: number | null;

  addedAt: number;
}