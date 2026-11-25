import { Component, inject } from '@angular/core';
import { UserMoviesService } from '../../core/services/user-movies-service';
import { ModelMovie } from '../../models/movie-model';

@Component({
  imports: [],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.css',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  private userMoviesService = inject(UserMoviesService);

  testFirestore(): void {
    console.log(this.userMoviesService.entries(),);
  }

  async testSave(): Promise<void> {

  const movie: ModelMovie = {
    id: 99999,
    title: 'Pelicula prueba',
    poster_path: null,
    release_date: '2026-01-01',
    vote_average: 0,
    popularity: 0,
    overview: 'Prueba',
    genre_ids: [],
  };

  await this.userMoviesService.save(
    movie,
    {
      isFavorite: true,
    },
  );

  console.log(
    'Película guardada',
  );
}
}
