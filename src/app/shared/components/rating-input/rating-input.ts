import { Component, computed, inject, input, signal } from '@angular/core';
import { ModelMovie } from '../../../models/movie-model';
import { UserMoviesService } from '../../../core/services/user-movies-service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-rating-input',
  styleUrl: './rating-input.css',
  templateUrl: './rating-input.html',
})
export class RatingInput {
  movie = input.required<ModelMovie>();

  private userMoviesService = inject(UserMoviesService);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly currentRating = computed(() =>
    this.userMoviesService.getRating(this.movie().id),
  );

  private async ensureAuthenticated(): Promise<boolean> {
    if (!this.authService.user()) {
      await this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return false;
    }
    return true;
  }
  
  async selectRating(value: number): Promise<void> {
    if (!(await this.ensureAuthenticated())) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      await this.userMoviesService.save(this.movie(), { rating: value });
      this.showSuccess(`Puntuación guardada: ${value}/10`);
    } catch {
      this.errorMessage.set('No se pudo guardar la puntuación.');
    } finally {
      this.saving.set(false);
    }
  }

  async clearRating(): Promise<void> {
    if (!(await this.ensureAuthenticated())) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      await this.userMoviesService.save(this.movie(), { rating: null });
      this.showSuccess('Puntuación eliminada');
    } catch {
      this.errorMessage.set('No se pudo quitar la puntuación.');
    } finally {
      this.saving.set(false);
    }
  }

  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 2000);
  }
}
