import { Component, computed, inject, signal } from '@angular/core';
import { UserMoviesService } from '../../core/services/user-movies-service';
import { RouterLink } from '@angular/router';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';

@Component({
  imports: [RouterLink, TmdbImagePipe],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.css',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  private userMoviesService = inject(UserMoviesService);
  
  readonly loaded = this.userMoviesService.loaded;
  readonly error = this.userMoviesService.error;
  readonly entries = this.userMoviesService.entries;
  
  testMovie: ModelMovie = {
  id: 1,
  title: 'Matrix',
  poster_path: null,
  release_date: '1999-03-31',
  vote_average: 8.7,
  popularity: 100,
  overview: 'Prueba',
  genre_ids: [],
};

  // avisa cuando Firebase terminó de cargar los datos
  isLoaded = this.userMoviesService.loaded;

  // Guarda cómo queremos ordenar ('rating' | 'addedAt' | 'title')
  selectedOrder = signal<'rating' | 'addedAt' | 'title'>('rating');

  //Nos quedamos solo con las películas favoritas
  favoriteMovies = computed(() => {
    return this.userMoviesService.entries().filter((movie) => movie.isFavorite === true);
  });

  // Ordenamos las favoritas según lo que eligió el usuario
  orderedFavorites = computed(() => {
    const movies = [...this.favoriteMovies()];
    const order = this.selectedOrder();

    if (order === 'title') {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (order === 'addedAt') {
      return movies.sort((a, b) => b.addedAt - a.addedAt);
    }

    // Si es 'rating': separamos las que tienen nota de las que no tienen
    const ratedMovies = movies.filter((movie) => movie.rating !== null);
    const unratedMovies = movies.filter((movie) => movie.rating === null);

    // Ordenamos las que tienen nota de mayor a menor
    ratedMovies.sort((a, b) => b.rating! - a.rating!);

    // Devolvemos primero las puntuadas y al final las sin puntuar
    return [...ratedMovies, ...unratedMovies];
  });

  // Se ejecuta cuando el usuario cambia el desplegable en el HTML
  changeOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedOrder.set(select.value as 'rating' | 'addedAt' | 'title');
  }
}
