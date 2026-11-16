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

  minimumVote = input<number | null>(null);
  minimumVoteChange = output<number | null>();

  onGenreChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    const genreId = value === ''
      ? null
      : Number(value);

    this.genreChange.emit(genreId);
  }

  onMinimumVoteChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.validity.badInput) {
      return;
    }

    if (input.value === '') {
      this.minimumVoteChange.emit(null);
      return;
    }

    const typed = Number(input.value);
    const vote = Math.max(0, Math.min(10, typed));

    if (vote !== typed) {
      input.value = String(vote);
    }

    this.minimumVoteChange.emit(vote);
  }

  clearFilters(): void {
    this.genreChange.emit(null);
    this.minimumVoteChange.emit(null);
  }
}