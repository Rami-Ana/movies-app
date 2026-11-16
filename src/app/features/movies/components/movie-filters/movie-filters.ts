import { Component, inject, input, output, signal } from '@angular/core';
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
    // Recibe el estado desde el padre
  selectedGenre = input<number | null>(null);

  // Emite cambios al padre
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

    const genreId = value === ''
      ? null
      : Number(value);

    this.genreChange.emit(genreId);
  }

  clearGenreFilters(): void {

    // Avisa al padre para quitar el filtro
    this.genreChange.emit(null);
  }
}