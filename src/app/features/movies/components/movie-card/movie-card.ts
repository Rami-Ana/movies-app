import { Component, input } from '@angular/core';
import { ModelMovie } from '../../../../models/movie-model';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image-pipe';

@Component({
  imports: [TmdbImagePipe],
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  movieData = input.required<ModelMovie>();
}
