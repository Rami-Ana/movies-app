import { Component, inject, output, signal } from '@angular/core';
import { GenreService } from '../../../../core/services/genre-service';
import { ModelGenre } from '../../../../models/genre-model';

@Component({
  imports: [],
  selector: 'app-movie-filters',
  styleUrl: './movie-filters.css',
  templateUrl: './movie-filters.html',
})
export class MovieFilters {

  private genreService = inject(GenreService);

  genres = signal<ModelGenre[]>([]);

  selectedGenre = signal<string>('');

  genreChange = output<number | null>();

  constructor() {this.loadGenres();}

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (response) => {
        this.genres.set(response.genres);
      },
    });
  }

  onGenreChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    // Actualiza la signal para que el select quede sincronizado
    this.selectedGenre.set(value);

    const genreId = value === ''
      ? null
      : Number(value);

    this.genreChange.emit(genreId);
  }

  clearGenreFilters(): void {
    // Vuelve visualmente a "Todos los géneros"
    this.selectedGenre.set('');

    // Avisa al padre para quitar el filtro
    this.genreChange.emit(null);
  }
}