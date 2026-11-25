import { inject, Injectable, signal, effect } from '@angular/core';
import { deleteDoc, doc, getFirestore, setDoc, onSnapshot, collection } from 'firebase/firestore';
import { UserMovieEntry } from '../../models/user-movie-entry';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth-service';
import { ModelMovie } from '../../models/movie-model';
import { shouldDelete } from '../utils/should-delete/should-delete';

@Injectable({ providedIn: 'root' })
export class UserMoviesService {
    private authService = inject(AuthService);

    private readonly app = initializeApp(environment.firebase);
    private readonly db = getFirestore(this.app);

    private unsubscribeSnapshot: (() => void) | null = null;

    private readonly _loaded = signal(false);
    readonly loaded = this._loaded.asReadonly();

    private readonly _entries = signal<UserMovieEntry[]>([]);
    readonly entries = this._entries.asReadonly();

    private readonly _error = signal<string | null>(null);
    readonly error = this._error.asReadonly();
    
constructor() {
        effect(() => {
            const user = this.authService.user();

            if (!user) {
                this.unsubscribeSnapshot?.();
                this.unsubscribeSnapshot = null;

                this._entries.set([]);
                this._loaded.set(false);
                this._error.set(null);

                return;
            }

            const moviesCollection = collection(this.db, 'users', user.uid, 'movies');

            this.unsubscribeSnapshot?.();
            this._error.set(null);

            this.unsubscribeSnapshot = onSnapshot(
                moviesCollection,
                (snapshot) => {
                    const entries = snapshot.docs.map(doc => doc.data() as UserMovieEntry,);

                    this._entries.set(entries);
                    this._error.set(null);
                    this._loaded.set(true);
                },
                (error) => {
                    console.error('Error al escuchar las películas del usuario', error);
                    this._error.set('No se han podido cargar tus películas. Inténtalo de nuevo más tarde.');
                    this._loaded.set(false);
                },
            );
        });
    }

    private getUserUid(): string {
        const user = this.authService.user();

        if (!user) {
            throw new Error('No hay usuario autenticado');
        }

        return user.uid;
    }

    private getMovieDoc(movieId: number) {
        const uid = this.getUserUid();

        return doc(
            this.db,
            'users',
            uid,
            'movies',
            movieId.toString(),
        );
    }

    async remove(movieId: number): Promise<void> {
        const movieDoc = this.getMovieDoc(movieId);
        await deleteDoc(movieDoc);
    }

    async save(
        movie: ModelMovie,
        changes: Partial<Pick<UserMovieEntry, 'isFavorite' | 'rating'>>,
    ): Promise<void> {
        const currentEntry = this.getEntry(movie.id);

        const entry: UserMovieEntry = {
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
            vote_average:
                movie.vote_average ??
                currentEntry?.vote_average ??
                null,
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

        if (shouldDelete(entry)) {
            await this.remove(movie.id);
            return;
        }

        const movieDoc = this.getMovieDoc(movie.id);

        await setDoc(movieDoc, entry);
    }

    getEntry(movieId: number): UserMovieEntry | undefined {
        return this.entries().find((entry) => entry.movieId === movieId);
    }

    isFavorite(movieId: number): boolean {
        return this.getEntry(movieId)?.isFavorite ?? false;
    }

    getRating(movieId: number): number | null {
        return this.getEntry(movieId)?.rating ?? null;
    }
}