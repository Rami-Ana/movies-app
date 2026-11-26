import { Component, computed, inject, signal } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MovieFilters } from '../movie-filters/movie-filters';
import { ModelGenre } from '../../../../models/genre-model';
import { SortOrder } from '../../../../models/sort-order-model';
import { ActivatedRoute } from '@angular/router';
import { ModelMovie } from '../../../../models/movie-model';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { MovieService } from '../../../../core/services/movie-service';
import { GenreService } from '../../../../core/services/genre-service';

@Component({
  imports: [MovieCard, MovieFilters],
  selector: 'app-movie-gallery',
  styleUrl: './movie-gallery.css',
  templateUrl: './movie-gallery.html',
})
export class MovieGallery {
  private movieService = inject(MovieService);
  private genreService = inject(GenreService);
  private route = inject(ActivatedRoute);

  genres = signal<ModelGenre[]>([]);

  selectedGenre = signal<number | null>(null);
  minimumVote = signal<number | null>(null);
  sortOrder = signal<SortOrder>('popularity');

  movies = signal<ModelMovie[]>([]);
  query = signal('');
  status = signal<'loading' | 'error' | 'success'>('loading');

  currentPage = signal(1);
  maxPage = signal(1);
  loadingMore = signal(false);

  ngOnInit(): void {
    this.loadGenres();  

    this.route.queryParamMap
      .pipe(
        map((params) => (params.get('q') ?? '').trim()),

        debounceTime(350),

        distinctUntilChanged(),

        tap((cleanQuery) => {
          this.query.set(cleanQuery);
          this.currentPage.set(1);
          this.maxPage.set(1);
          this.movies.set([]);
          this.status.set('loading');
        }),

        switchMap((cleanQuery) => {
          const request$ =
            cleanQuery.length < 2
              ? this.movieService.getPopularMovies(1)
              : this.movieService.searchMovies(cleanQuery, 1);

          return request$.pipe(
            catchError(() => {
              this.status.set('error');
              return of(null);
            }),
          );
        }),
      )
      .subscribe((response) => {
        if (!response) {
          return;
        }

        this.movies.set(response.results);
        this.currentPage.set(response.page);
        this.maxPage.set(response.total_pages > 500 ? 500 : response.total_pages);

        if (this.status() !== 'error') {
          this.status.set('success');
        }
      });
  }

  loadMore(): void {
    const nextPage = this.currentPage() + 1;

    if (this.loadingMore() || nextPage > this.maxPage() || nextPage > 500) {
      return;
    }

    this.loadingMore.set(true);

    const cleanQuery = this.query();
    const request$ =
      cleanQuery.length < 2
        ? this.movieService.getPopularMovies(nextPage)
        : this.movieService.searchMovies(cleanQuery, nextPage);

    request$.subscribe({
      next: (response) => {
        this.movies.set([...this.movies(), ...response.results]);
        this.currentPage.set(response.page);
        this.maxPage.set(response.total_pages > 500 ? 500 : response.total_pages);
        this.loadingMore.set(false);
      },
      error: () => {
        this.loadingMore.set(false);
      },
    });
  }

  loadMovies(): void {
    this.status.set('loading');
    this.currentPage.set(1);
    this.movies.set([]);  

    const cleanQuery = this.query();
    const request$ =
      cleanQuery.length < 2
        ? this.movieService.getPopularMovies(1)
        : this.movieService.searchMovies(cleanQuery, 1);

    request$.subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.currentPage.set(response.page);
        this.maxPage.set(response.total_pages > 500 ? 500 : response.total_pages);
        this.status.set('success');
      },
      error: () => {
        this.status.set('error');
      },
    });
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
      error: () => this.genres.set([]),
    });
  }

  filteredMovies = computed(() => {
    let filtered = this.movies();
    const genre = this.selectedGenre();
    const minimumVote = this.minimumVote();
    const sortOrder = this.sortOrder();

    if (genre !== null) {
      filtered = filtered.filter((movie) => movie.genre_ids.includes(genre));
    }

    if (minimumVote !== null) {
      filtered = filtered.filter(
        (movie) => Math.round(movie.vote_average * 10) / 10 >= minimumVote,
      );
    }

    switch (sortOrder) {
      case 'popularity':
        return [...filtered].sort((a, b) => b.popularity - a.popularity);

      case 'vote':
        return [...filtered].sort((a, b) => b.vote_average - a.vote_average);

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