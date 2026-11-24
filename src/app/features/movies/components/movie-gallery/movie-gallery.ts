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

  // Gestión estado de filtros:
  selectedGenre = signal<number | null>(null);
  minimumVote = signal<number | null>(null);
  sortOrder = signal<SortOrder>('popularity');

  // Datos y estado de la carga:
  movies = signal<ModelMovie[]>([]);
  query = signal('');
  status = signal<'loading' | 'error' | 'succes'>('loading');

  ngOnInit(): void {
    this.loadGenres(); // Cargar datos auxiliares para filtros.

    this.route.queryParamMap
      .pipe(
        //  Extrae ?q= de la URL y limpia espacios
        map((params) => (params.get('q') ?? '').trim()),

        // Espera 350 ms tras el último cambio para no pedir por cada tecla
        debounceTime(350),

        // Si el texto resultante es igual al anterior, no repite la búsqueda
        distinctUntilChanged(),

        //  Guarda la búsqueda actual y marca estado de carga antes de pedir
        tap((cleanQuery) => {
          this.query.set(cleanQuery);
          this.status.set('loading');
        }),

        //  Lanza la petición y cancela automáticamente la anterior si llega otra
        switchMap((cleanQuery) => {
          const request$ =
            cleanQuery.length < 2
              ? this.movieService.getPopularMovies()
              : this.movieService.searchMovies(cleanQuery);

          return request$.pipe(
            catchError(() => {
              this.status.set('error');
              return of({ results: [] });
            }),
          );
        }),
      )
      .subscribe((response) => {
        this.movies.set(response.results);
        if (this.status() !== 'error') {
          this.status.set('succes');
        }
      });
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
      error: () => this.genres.set([]),
      // sin géneros el filtro queda vacío, pero la galería sigue funcionando
    });
  }

  // Aplicar filtros: Transformar la lista de películas.
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

    // Orden de visualización:
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