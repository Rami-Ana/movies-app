import { MovieStatsModel } from "../../../models/movie-stats-model";

export type RatingTotals = Pick<MovieStatsModel, 'ratingSum' | 'ratingCount' | 'average'>;

export function applyRatingChange(
  current: RatingTotals,
  oldRating: number | null,
  newRating: number | null,
): RatingTotals {
  const ratingSum = current.ratingSum - (oldRating ?? 0) + (newRating ?? 0);

  const ratingCount =
    current.ratingCount - (oldRating !== null ? 1 : 0) + (newRating !== null ? 1 : 0);

  const average = ratingCount === 0 ? 0 : ratingSum / ratingCount;

  return { ratingSum, ratingCount, average };
}
