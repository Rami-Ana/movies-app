import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelGenreListResponse } from '../../models/genre-model';
import { genresMock } from '../../mocks/genre-mock';

@Injectable({ providedIn: 'root' })
export class GenreService {
    getGenres(): Observable<ModelGenreListResponse> {
        return of(genresMock);
    }
}