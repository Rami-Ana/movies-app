import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ModelPaginationResponse } from '../../models/pagination-model';
import { ModelMovieDetail, ModelVideoResponse, ModelPlatformResponse } from '../../models/movie-detail-model';
import { ModelCredits } from '../../models/credits-model';
import { ModelPersonDetail, ModelPersonCredits } from '../../models/person-model';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private http = inject(HttpClient);
    private baseUrl = 'https://api.themoviedb.org/3';
    private apiKey = environment.tmdbApiKey;

    // Trae películas populares desde la API real de TMDB con paginación
    getPopularMovies(page: number = 1): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(
            `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=${page}`
        );
    }

    // Busca películas por título en la API real de TMDB con paginación
    searchMovies(query: string, page: number = 1): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(
            `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`
        );
    }

    // para traer los datos reales de las pantallas de detalle:
    getMovieDetails(id: number): Observable<ModelMovieDetail> {
        return this.http.get<ModelMovieDetail>(
            `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }

    // trae directores y actores de una pelicula
    getMovieCredits(id: number): Observable<ModelCredits> {
        return this.http.get<ModelCredits>(
            `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
        );
    }

    // trae videos asociados a la pelicula(trailers, clips, etc)
    getMovieVideos(id: number): Observable<ModelVideoResponse> {
        return this.http.get<ModelVideoResponse>(
            `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`
        );
    }

    // trae plataformas de streaming donde ver la pelicula por pais
    getMoviePlatforms(id: number): Observable<ModelPlatformResponse> {
        return this.http.get<ModelPlatformResponse>(
            `${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`
        );
    }

    // trae los datos biograficos y detalles de un actor o director
    getPersonDetails(id: number): Observable<ModelPersonDetail> {
        return this.http.get<ModelPersonDetail>(
            `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }

    // trae las películas donde actuó (cast) y trabajó detrás de cámaras (crew)
    getPersonMovieCredits(id: number): Observable<ModelPersonCredits> {
        return this.http.get<ModelPersonCredits>(
            `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}&language=es-ES`
        );
    }
}