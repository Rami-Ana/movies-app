import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserMoviesService } from '../../core/services/user-movies-service';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image-pipe';
import { UserMovieEntry } from '../../models/user-movie-entry';
import { ModelMovie } from '../../models/movie-model';

@Component({
  imports: [RouterLink, TmdbImagePipe],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.css',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  private userMoviesService = inject(UserMoviesService);

  // Estado de carga y error que viene del servicio
  isLoaded = this.userMoviesService.loaded;
  error = this.userMoviesService.error;

  // Orden seleccionado ('rating' | 'addedAt' | 'title')
  selectedOrder = signal<'rating' | 'addedAt' | 'title'>('rating');

  // ID de la película que tiene abierta la confirmación "¿Seguro?"
  confirmingRemoveId = signal<number | null>(null);

  // Mensaje de aviso cuando se completa una acción
  responseUserMessage = signal<string | null>(null);

  // Solo películas marcadas como favoritas
  favoriteMovies = computed(() => {
    return this.userMoviesService.entries().filter((movie) => movie.isFavorite === true);
  });

  // Películas ordenadas según el selector
  orderedFavorites = computed(() => {
    const movies = [...this.favoriteMovies()];
    const order = this.selectedOrder();

    if (order === 'title') {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (order === 'addedAt') {
      return movies.sort((a, b) => b.addedAt - a.addedAt);
    }

    const ratedMovies = movies.filter((movie) => movie.rating !== null);
    const unratedMovies = movies.filter((movie) => movie.rating === null);

    ratedMovies.sort((a, b) => b.rating! - a.rating!);

    return [...ratedMovies, ...unratedMovies];
  });

  // Convierte una película guardada a la forma que espera el servicio para guardar cambios
  private toModelMovie(movie: UserMovieEntry): ModelMovie {
    return {
      id: movie.movieId,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average ?? 0,
      popularity: 0,
      overview: '',
      genre_ids: movie.genre_ids ?? [],
    };
  }

  changeOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedOrder.set(select.value as 'rating' | 'addedAt' | 'title');
  }

  // Cambia la puntuación (1 a 10) al pulsar uno de los botones y muestra el aviso
  async setRating(movie: UserMovieEntry, rating: number, event: Event): Promise<void> {
    event.stopPropagation();

    const movieData = this.toModelMovie(movie);
    await this.userMoviesService.save(movieData, { rating });

    this.responseUserMessage.set(`Puntuación actualizada a ${rating}/10 para "${movie.title}".`);
  }

  // Abre el "¿Seguro?" en la tarjeta
  openRemoveConfirm(movieId: number, event: Event): void {
    event.stopPropagation();
    this.confirmingRemoveId.set(movieId);
  }

  // Cancela el "¿Seguro?"
  cancelRemoveConfirm(event: Event): void {
    event.stopPropagation();
    this.confirmingRemoveId.set(null);
  }

  // Quita de favoritas usando el servicio (conserva la nota si tiene, o borra el documento si no tiene)
  async confirmRemoveFavorite(movie: UserMovieEntry, event: Event): Promise<void> {
    event.stopPropagation();

    const movieData = this.toModelMovie(movie);
    await this.userMoviesService.save(movieData, { isFavorite: false });

    this.confirmingRemoveId.set(null);
    this.responseUserMessage.set(`"${movie.title}" quitada de favoritas.`);
  }
}