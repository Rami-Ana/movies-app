import { Injectable, inject } from '@angular/core';
import { getApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { AuthService } from './auth-service';

export interface UserFavoriteMovie {
    userId: string;
    movieId: number;
    title: string;
    posterPath: string | null;
    rating?: number;
    createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class UserFavoritesService {
    private authService = inject(AuthService);
    private db = getFirestore(getApp());
    private favoritesCollection = collection(this.db, 'user_favorites');

    private getCurrentUserId(): string {
        const user = this.authService.user();
        if (!user) {
            throw new Error('Debes iniciar sesión para gestionar tus favoritos.');
        }
        return user.uid;
    }

    private buildDocId(userId: string, movieId: number): string {
        return `${userId}_${movieId}`;
    }

    async addFavorite(movie: {
        id: number;
        title: string;
        poster_path?: string | null;
        rating?: number;
    }): Promise<void> {
        const userId = this.getCurrentUserId();
        const docRef = doc(this.db, 'user_favorites', this.buildDocId(userId, movie.id));

        const data: UserFavoriteMovie = {
            userId,
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path ?? null,
            ...(movie.rating !== undefined ? { rating: movie.rating } : {}),
            createdAt: Date.now(),
        };

        await setDoc(docRef, data);
    }

    async removeFavorite(movieId: number): Promise<void> {
        const userId = this.getCurrentUserId();
        const docRef = doc(this.db, 'user_favorites', this.buildDocId(userId, movieId));
        await deleteDoc(docRef);
    }

    async getUserFavorites(): Promise<UserFavoriteMovie[]> {
        const userId = this.getCurrentUserId();
        const q = query(this.favoritesCollection, where('userId', '==', userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((docSnap) => docSnap.data() as UserFavoriteMovie);
    }

    async isFavorite(movieId: number): Promise<boolean> {
        const user = this.authService.user();
        if (!user) {
            return false;
        }

        const docRef = doc(this.db, 'user_favorites', this.buildDocId(user.uid, movieId));
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }

    async toggleFavorite(movie: {
        id: number;
        title: string;
        poster_path?: string | null;
        rating?: number;
    }): Promise<boolean> {
        const currentlyFavorite = await this.isFavorite(movie.id);

        if (currentlyFavorite) {
            await this.removeFavorite(movie.id);
            return false;
        } else {
            await this.addFavorite(movie);
            return true;
        }
    }
}