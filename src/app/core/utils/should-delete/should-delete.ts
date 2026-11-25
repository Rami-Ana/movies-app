import { UserMovieEntry } from '../../../models/user-movie-entry';

export function shouldDelete(
  entry: UserMovieEntry,
): boolean {
  return (
    !entry.isFavorite &&
    entry.rating === null
  );
}
