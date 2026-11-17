import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelPaginationResponse } from '../../models/pagination-model';
import { moviesMock } from '../../mocks/movies-mock';

@Service()
export class MovieService {
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
}