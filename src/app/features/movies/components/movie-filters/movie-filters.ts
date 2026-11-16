import { Component, input, output } from '@angular/core';
import { ModelGenre } from '../../../../models/genre-model';

@Component({
  imports: [],
  selector: 'app-movie-filters',
  styleUrl: './movie-filters.css',
  templateUrl: './movie-filters.html',
})
export class MovieFilters {

  genres = input<ModelGenre[]>([]);

  selectedGenre = input<number | null>(null);

  genreChange = output<number | null>();

  onGenreChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    const genreId = value === ''
      ? null
      : Number(value);

    this.genreChange.emit(genreId);
  }

  clearGenreFilters(): void {this.genreChange.emit(null);}

}