import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelPaginationResponse } from '../../models/pagination-model';
import { moviesMock } from '../../mocks/movies-mock';

@Service()
export class MovieService {
    //devuelve las pelis populares. Por ahora usa datos de prueba:
    getPopularMovies(): Observable<ModelPaginationResponse> {
        return of(moviesMock);
    }
}