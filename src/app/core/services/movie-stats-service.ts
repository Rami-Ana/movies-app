import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, Transaction } from 'firebase/firestore';
import { MovieStatsModel } from '../../models/movie-stats-model';
import { Injectable } from '@angular/core';
import { applyRatingChange, RatingTotals } from '../utils/apply-rating-change/apply-rating-change';

export const movieStatsCollection = 'movieStats';

@Injectable({ providedIn: 'root' })
export class MovieStatsService {
  private readonly db = getFirestore();

  getStatsDoc(movieId: number) {
    return doc(this.db, movieStatsCollection, String(movieId));
  }

  async getStats(movieId: number): Promise<MovieStatsModel | null> {
    const snapshot = await getDoc(this.getStatsDoc(movieId));
    return snapshot.exists() ? (snapshot.data() as MovieStatsModel) : null;
  }

  async updateRatingInTransaction(
    transaction: Transaction,
    movie: Pick<MovieStatsModel, 'movieId' | 'title' | 'poster_path'>,
    oldRating: number | null,
    newRating: number | null,
  ): Promise<void> {
    const statsRef = this.getStatsDoc(movie.movieId);
    const snapshot = await transaction.get(statsRef);

    const current: RatingTotals = snapshot.exists()
      ? (snapshot.data() as MovieStatsModel)
      : { ratingSum: 0, ratingCount: 0, average: 0 };

    if (oldRating === newRating) {
      return; // nada que actualizar
    }

    const updated = applyRatingChange(current, oldRating, newRating);

    if (updated.ratingCount === 0) {
      transaction.delete(statsRef);
      return;
    }

    transaction.set(statsRef, {
      movieId: movie.movieId,
      title: movie.title,
      poster_path: movie.poster_path,
      ...updated,
    });
  }

  async getTopMovies(max: number): Promise<MovieStatsModel[]> {
    const topQuery = query(
      collection(this.db, movieStatsCollection),
      orderBy('average', 'desc'),
      limit(max),
    );

    const snapshot = await getDocs(topQuery);
    return snapshot.docs.map((document) => document.data() as MovieStatsModel);
  }
}
