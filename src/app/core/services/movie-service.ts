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

    getPopularMovies(page: number = 1): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(
            `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=${page}`
        );
    }

    searchMovies(query: string, page: number = 1): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(
            `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`
        );
    }

    getMovieDetails(id: number): Observable<ModelMovieDetail> {
        return this.http.get<ModelMovieDetail>(
            `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }


    getMovieCredits(id: number): Observable<ModelCredits> {
        return this.http.get<ModelCredits>(
            `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
        );
    }


    getMovieVideos(id: number): Observable<ModelVideoResponse> {
        return this.http.get<ModelVideoResponse>(
            `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`
        );
    }


    getMoviePlatforms(id: number): Observable<ModelPlatformResponse> {
        return this.http.get<ModelPlatformResponse>(
            `${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`
        );
    }


    getPersonDetails(id: number): Observable<ModelPersonDetail> {
        return this.http.get<ModelPersonDetail>(
            `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }

    
    getPersonMovieCredits(id: number): Observable<ModelPersonCredits> {
        return this.http.get<ModelPersonCredits>(
            `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}&language=es-ES`
        );
    }
}