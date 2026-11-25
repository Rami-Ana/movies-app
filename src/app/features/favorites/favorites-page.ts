import { Component, inject, } from '@angular/core';
import { UserMoviesService } from '../../core/services/user-movies-service';
import { ModelMovie } from '../../models/movie-model';
import { FavoriteButton } from '../../shared/components/favorite-button/favorite-button';

@Component({
  imports: [FavoriteButton],
  selector: 'app-favorites-page',
  styleUrl: './favorites-page.css',
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  private userMoviesService = inject(UserMoviesService);
  
  readonly loaded = this.userMoviesService.loaded;
  readonly error = this.userMoviesService.error;
  readonly entries = this.userMoviesService.entries;
  
  testMovie: ModelMovie = {
  id: 1,
  title: 'Matrix',
  poster_path: null,
  release_date: '1999-03-31',
  vote_average: 8.7,
  popularity: 100,
  overview: 'Prueba',
  genre_ids: [],
};

}

