import { Injectable, signal } from '@angular/core';
import { UserMovieEntry } from '../../models/user-movie-entry';

@Injectable({ providedIn: 'root', })

export class UserMoviesService {
    private readonly _entries = signal<UserMovieEntry[]>([]);

    readonly entries = this._entries.asReadonly();

    getEntry(movieId: number,): UserMovieEntry | undefined {
        return this.entries().find(entry => entry.movieId === movieId,);
    }

    isFavorite(movieId: number,): boolean {
        return (this.getEntry(movieId)?.isFavorite ?? false);
    }

    getRating(movieId: number,): number | null {
        return (this.getEntry(movieId)?.rating ?? null);
    }
}