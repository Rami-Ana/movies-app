import { Component, computed, inject, signal } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie-service';
import { MovieFilters } from '../movie-filters/movie-filters';
import { GenreService } from '../../../../core/services/genre-service';
import { ModelGenre } from '../../../../models/genre-model';
import { SortOrder } from '../../../../models/sort-order-model';
import { ActivatedRoute } from '@angular/router';
import { ModelMovie } from '../../../../models/movie-model';
import { Subscription } from 'rxjs';

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

  //Gestion estado de filtros:
  selectedGenre = signal<number | null>(null);
  minimumVote = signal<number | null>(null);
  sortOrder = signal<SortOrder>('popularity');

  // Datos y estado de la carga:
  movies = signal<ModelMovie[]>([]);
  query = signal('');
  status = signal<'loading' | 'error' | 'succes'>('loading');

  // Guarda la petición en curso para poder cancelarla si llega otra
  private moviesRequest?: Subscription;


  ngOnInit(): void {
    this.loadGenres(); // Cargar datos auxiliares para filtros.

    this.route.queryParamMap.subscribe((params) => { // Sincroniz navegación
      this.query.set((params.get('q') ?? '').trim());
      this.loadMovies(); // Obtener películas populares o por búsqueda.
    });
  }


  private loadMovies(): void {
    this.moviesRequest?.unsubscribe(); // cancela la petición  si sigue en curso

   this.status.set('loading');

    const request =
      this.query().length < 2
        ? this.movieService.getPopularMovies()
        : this.movieService.searchMovies(this.query());


    this.moviesRequest = request.subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.status.set('succes');
      },
      error: () => {
        this.movies.set([]);
        this.status.set('error');
      },
    });
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (response) => { this.genres.set(response.genres); },
      error: () => this.genres.set([]),
      // sin géneros el filtro queda vacío, pero la galería sigue funcionando
    });
  }


  //Aplicar filtros: Transformar la lista de películas.
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

    //Orden de visualización:
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
