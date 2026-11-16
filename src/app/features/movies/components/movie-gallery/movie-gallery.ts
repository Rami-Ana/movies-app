import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie-service';
import { MovieFilters } from '../movie-filters/movie-filters';
import { GenreService } from '../../../../core/services/genre-service';
import { ModelGenre } from '../../../../models/genre-model';
import { SortOrder } from '../../../../models/sort-order-model';


@Component({
  imports: [MovieCard, MovieFilters],
  selector: 'app-movie-gallery',
  styleUrl: './movie-gallery.css',
  templateUrl: './movie-gallery.html',
})
export class MovieGallery {
  private movieService = inject(MovieService);
  private genreService = inject(GenreService);

  movies = toSignal(this.movieService.getPopularMovies());

  genres = signal<ModelGenre[]>([]);
  sortOrder = signal<SortOrder>('popularity');

  selectedGenre = signal<number | null>(null);
  minimumVote = signal<number | null>(null);

  constructor() { this.loadGenres(); }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
    });
  }

  filteredMovies = computed(() => {
    let filtered = this.movies()?.results ?? [];

    const genre = this.selectedGenre();
    const minimumVote = this.minimumVote();
    const sortOrder = this.sortOrder();

    if (genre !== null) {
      filtered = filtered.filter(movie =>
        movie.genre_ids.includes(genre)
      );
    }

    if (minimumVote !== null) {
      filtered = filtered.filter(movie =>
        Math.round(movie.vote_average * 10) / 10 >= minimumVote
      );
    }

    switch (sortOrder) {
      case 'popularity':
        return [...filtered].sort(
          (a, b) => b.popularity - a.popularity
        );

      case 'vote':
        return [...filtered].sort(
          (a, b) => b.vote_average - a.vote_average
        );

      case 'release':
        return [...filtered].sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;

          return dateB - dateA;
        });
    }
  });

  onGenreChange(genreId: number | null): void {
    this.selectedGenre.set(genreId);
  }

  onMinimumVoteChange(vote: number | null): void {
    this.minimumVote.set(vote);
  }

  onSortOrderChange(order: SortOrder): void {
    this.sortOrder.set(order);
  }

}