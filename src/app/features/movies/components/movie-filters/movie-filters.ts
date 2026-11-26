import { Component, input, output } from '@angular/core';
import { ModelGenre } from '../../../../models/genre-model';
import { SortOrder } from '../../../../models/sort-order-model';

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

  sortOrder = input<SortOrder>('popularity');
  sortOrderChange = output<SortOrder>();

  onGenreChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    const genreId = value === ''
      ? null
      : Number(value);

    this.genreChange.emit(genreId);
  }

  onSortOrderChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value as SortOrder;

    this.sortOrderChange.emit(value);
  }

  clearFilters(): void {
    this.genreChange.emit(null);
    this.minimumVoteChange.emit(null);
    this.sortOrderChange.emit('popularity');
    }

  changeMinimumVote(delta: number): void {
    const next = Math.min(10, Math.max(0, (this.minimumVote() ?? 0) + delta));
    this.minimumVoteChange.emit(next === 0 ? null : next);
  }
}