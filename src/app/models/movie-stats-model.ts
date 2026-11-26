export interface MovieStatsModel {
    movieId: number;
    title: string;
    poster_path: string | null;
    ratingSum: number;
    ratingCount: number;
    average: number;
}