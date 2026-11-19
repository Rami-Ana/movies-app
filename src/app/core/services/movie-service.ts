import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelPaginationResponse } from '../../models/pagination-model';
import { environment } from '../../../environments/environment';

@Service()
export class MovieService {

private http = inject(HttpClient)
    
    //Traigo peliculas populares, con mi clave.
    getPopularMovies(page = 1): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(`${environment.baseUrl}/movie/popular`, {
            params: {
                api_key: environment.tmdbApiKey,
                page,
            }
        });
    }

    //busqueda real de peliculas en API
    searchMovies(textQuery: string): Observable<ModelPaginationResponse> {
        return this.http.get<ModelPaginationResponse>(`${environment.baseUrl}/search/movie`, {
            params: {
                api_key: environment.tmdbApiKey,
                query: textQuery, // La palabra que escribio el usuario
            }
        });
    }
}