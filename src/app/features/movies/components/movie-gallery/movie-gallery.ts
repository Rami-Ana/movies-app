import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie-service';
import { MovieFilters } from '../movie-filters/movie-filters';


@Component({
  imports: [MovieCard, MovieFilters],
  selector: 'app-movie-gallery',
  styleUrl: './movie-gallery.css',
  templateUrl: './movie-gallery.html',
})
export class MovieGallery {
  private movieService = inject(MovieService);

  movies = toSignal(this.movieService.getPopularMovies());

  selectedGenre = signal<number | null>(null);

  filteredMovies = computed(() => {
    const movies = this.movies()?.results ?? [];
    const genre = this.selectedGenre();

    if (genre === null) {
      return movies
    }

    return movies.filter(movie =>
      movie.genre_ids.includes(genre)
    );
  });

  onGenreChange(genreId: number | null): void {
    this.selectedGenre.set(genreId);
  }
}