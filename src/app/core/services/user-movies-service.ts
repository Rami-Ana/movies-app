import { inject, Injectable, signal } from '@angular/core';
import { deleteDoc, doc, getFirestore,setDoc } from 'firebase/firestore';
import { UserMovieEntry } from '../../models/user-movie-entry';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth-service';
import { ModelMovie } from '../../models/movie-model';
import { shouldDelete } from '../utils/should-delete/should-delete';


@Injectable({ providedIn: 'root', })

export class UserMoviesService {
    private authService = inject(AuthService);

    private readonly app = initializeApp(environment.firebase);
    private readonly db = getFirestore(this.app);

    private readonly _entries = signal<UserMovieEntry[]>([]);

    readonly entries = this._entries.asReadonly();


    private getUserUid(): string {
        const user = this.authService.user();

        if (!user) {
            throw new Error('No hay usuario autenticado',);
        }
        return user.uid;
    }

    private getMovieDoc(movieId: number,) {
        const uid = this.getUserUid();

        return doc(
            this.db,
            'users',
            uid,
            'movies',
            movieId.toString(),
        );
    }

    async remove(movieId: number,): Promise<void> {
        const movieDoc =
            this.getMovieDoc(movieId);
        await deleteDoc(movieDoc);
    }

    async save(movie: ModelMovie, changes: Partial<Pick<UserMovieEntry, 'isFavorite' | 'rating'>>,
    ): Promise<void> {
        const currentEntry =
            this.getEntry(movie.id);

        const entry: UserMovieEntry = {
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,

            isFavorite:
                changes.isFavorite ??
                currentEntry?.isFavorite ??
                false,

            rating:
                changes.rating ??
                currentEntry?.rating ??
                null,

            addedAt:
                currentEntry?.addedAt ??
                Date.now(),
        };

    }

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

