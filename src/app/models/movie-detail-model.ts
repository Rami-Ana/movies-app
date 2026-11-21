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