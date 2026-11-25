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

  // Estado de paginación:
  currentPage = signal(1);
  maxPage = signal(1);
  loadingMore = signal(false);

  ngOnInit(): void {
    this.loadGenres(); // Cargar datos auxiliares para filtros.

    this.route.queryParamMap
      .pipe(
        // 1 Extrae ?q= de la URL y limpia espacios
        map((params) => (params.get('q') ?? '').trim()),

        // 2 Espera 350 ms tras el último cambio para no pedir por cada tecla
        debounceTime(350),

        // 3 Si el texto resultante es igual al anterior, no repite la búsqueda
        distinctUntilChanged(),

        // 4 Guarda la búsqueda, vuelve a página 1, vacía lista y marca carga
        tap((cleanQuery) => {
          this.query.set(cleanQuery);
          this.currentPage.set(1);
          this.maxPage.set(1);
          this.movies.set([]);
          this.status.set('loading');
        }),

        // 5 Lanza la petición de la página 1 y cancela la anterior si llega otra
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
        // TMDB tiene límite máximo de 500 páginas
        this.maxPage.set(response.total_pages > 500 ? 500 : response.total_pages);

        if (this.status() !== 'error') {
          this.status.set('succes');
        }
      });
  }

  // Carga la siguiente página y la suma a la lista actual (sin borrar lo anterior)
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

  // Botón de reinicio (ordenes) cuando falla la carga inicial
  loadMovies(): void {
    this.status.set('loading'); //pon loading
    this.currentPage.set(1); // vuelve a pagina 1
    this.movies.set([]); //vacia la lista de peliculas

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
        this.status.set('succes');
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

  //mis mensajeros: reaccionan a eventos ( se ejecutan cuando cambia un filtro movie-filters)
  onGenreChange(genreId: number | null): void {
    this.selectedGenre.set(genreId);
    this.loadMovies();
  }

  onMinimumVoteChange(vote: number | null): void {
    this.minimumVote.set(vote);
    this.loadMovies();
  }

  onSortOrderChange(order: SortOrder): void {
    this.sortOrder.set(order);
    this.loadMovies();
  }
}