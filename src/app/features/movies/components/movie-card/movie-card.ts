import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModelMovie } from '../../../../models/movie-model';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image-pipe';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';

@Component({
  imports: [TmdbImagePipe, RouterLink, FavoriteButton], 
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  movieData = input.required<ModelMovie>(); 
}
