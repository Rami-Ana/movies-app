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

  isLoaded = this.userMoviesService.loaded;

  selectedOrder = signal<'rating' | 'addedAt' | 'title'>('rating');

  favoriteMovies = computed(() => {
    return this.userMoviesService.entries().filter((movie) => movie.isFavorite === true);
  });

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

  changeOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedOrder.set(select.value as 'rating' | 'addedAt' | 'title');
  }
}
