import { Component, inject } from '@angular/core';
import { UserMoviesService } from '../../core/services/user-movies-service';
import { ModelMovie } from '../../models/movie-model';

@Component({
  imports: [],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.css',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  private userMoviesService = inject(UserMoviesService);

}
