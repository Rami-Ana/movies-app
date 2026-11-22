import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ModelPaginationResponse } from '../../models/pagination-model';
import { ModelMovieDetail, ModelVideoResponse, ModelPlatformResponse } from '../../models/movie-detail-model';
import { ModelCredits } from '../../models/credits-model';
import { ModelPersonDetail } from '../../models/person-model';
import { moviesMock } from '../../mocks/movies-mock';

@Service()
export class MovieService {
    private http = inject(HttpClient);
    private baseUrl = 'https://api.themoviedb.org/3';
    private apiKey = environment.tmdbApiKey;


    //devuelve pelis populares. Por ahora usa datos de prueba.
    getPopularMovies(): Observable<ModelPaginationResponse> {
        return of(moviesMock); // 
    }

    // Busca películas por título dentro de los datos de prueba
    searchMovies(query: string): Observable<ModelPaginationResponse> {
        // Filtra la lista y guarda solo las películas cuyo título contiene lo que escribio el usuario    
        const filteredMovies = moviesMock.results.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()))

        // Devuelve el mismo formato de respuesta,solo con las películas filtradas    
        return of({ ...moviesMock, results: filteredMovies })

    }

    //para traer los datos reales de las pantallas de detalle:
    getMovieDetails(id: number): Observable<ModelMovieDetail> {
        return this.http.get<ModelMovieDetail>(
            `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }

    //trae directores y actores de una pelicula
    getMovieCredits(id: number): Observable<ModelCredits> {
        return this.http.get<ModelCredits>(
            `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
        );
    }

    //trae videos asociados a la pelicula(trailers, clips,etc)   
    getMovieVideos(id: number): Observable<ModelVideoResponse> {
        return this.http.get<ModelVideoResponse>(
            `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`
        );
    }

    //trae plataformas de streaming donde ver la pelicula por pais
    getMoviePlatforms(id: number): Observable<ModelPlatformResponse> {
        return this.http.get<ModelPlatformResponse>(
            `${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`
        );
    }

    //trae los datos biograficos y detalles de un actor o director
    getPersonDetails(id: number): Observable<ModelPersonDetail> {
        return this.http.get<ModelPersonDetail>(
            `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&language=es-ES`
        );
    }
}