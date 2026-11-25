import { Component, computed, inject, input, signal } from '@angular/core';
import { ModelMovie } from '../../../models/movie-model';
import { UserMoviesService } from '../../../core/services/user-movies-service';

@Component({
  imports: [],
  selector: 'app-favorite-button',
  styleUrl: './favorite-button.css',
  templateUrl: './favorite-button.html',
})

export class FavoriteButton {
  movie = input.required<ModelMovie>();
  private userMoviesService = inject(UserMoviesService);



  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  

  readonly isFavorite = computed(() =>
    this.userMoviesService.isFavorite(
      this.movie().id,
    ),
  );

  async toggleFavorite(): Promise<void> {
    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      await this.userMoviesService.save(this.movie(), {
        isFavorite: !this.isFavorite(),
      });
    } catch {
      this.errorMessage.set('No se pudo actualizar el favorito.');
    } finally {
      this.saving.set(false);
    }
  }
}
