import { Component, Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class MovieStatsService {
    private readonly db = getFirestore();

  async getStats(movieId: number): Promise<MovieStatsService | null> {
    return null; // de momento solo la estructura
  }

  async getTopMovies(max: number): Promise<MovieStatsService[]> {
    return []; // de momento solo la estructura
  }
}
