import { ModelGenre } from './genre-model';

export interface ModelMovieDetail {
    id: number;
    title: string;
    tagline: string;
    overview: string;
    release_date: string;
    runtime: number | null;
    vote_average: number;
    poster_path: string | null;
    genres: ModelGenre[];
}

export interface Director {
    id: number;
    name: string;
}

export interface Actor {
    id: number;
    name: string;
    character: string;
    photo: string | null;
}

export interface Plataforma {
    id: number;
    name: string;
    logo: string | null;
}

export interface ModelMovie {
    id: number;
    title: string;
    tagline: string;
    overview: string;
    releaseDate: string;
    runtime: number | null;
    rating: number;
    poster: string | null;
    genres: ModelGenre[];
    directors: Director[];
    cast: Actor[];
    trailerKey: string | null; // clave de YouTube si hay tráiler
    platforms: Plataforma[]; // plataformas en España
}