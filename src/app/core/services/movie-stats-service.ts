import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { MovieStatsModel } from '../../models/movie-stats-model';

@Injectable({ providedIn: 'root' })
export class MovieStatsService {
    private readonly db = getFirestore();

  async getStats(movieId: number): Promise<MovieStatsService | null> {
    Promise<MovieStatsModel>
    return null; // de momento solo la estructura
  }

  async getTopMovies(max: number): Promise<MovieStatsModel[]> {
    return []; // de momento solo la estructura
  }
}
