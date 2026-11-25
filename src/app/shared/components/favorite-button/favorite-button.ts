import { Component, computed, inject, input, signal } from '@angular/core';
import { ModelMovie } from '../../../models/movie-model';
import { UserMoviesService } from '../../../core/services/user-movies-service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-favorite-button',
  styleUrl: './favorite-button.css',
  templateUrl: './favorite-button.html',
})

export class FavoriteButton {
  movie = input.required<ModelMovie>();
  private userMoviesService = inject(UserMoviesService);

  private authService = inject(AuthService);
  private router = inject(Router);

  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly isFavorite = computed(() =>
    this.userMoviesService.isFavorite(
      this.movie().id,
    ),
  );

  async toggleFavorite(): Promise<void> {

    if (!this.authService.user()) {
      await this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      this.successMessage.set(
        this.isFavorite()
          ? 'Quitada de favoritas'
          : 'Añadida a favoritas',
      );

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
