import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModelMovie } from '../../../../models/movie-model';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image-pipe';

@Component({
  imports: [TmdbImagePipe, RouterLink], // El pipe tmdbImage convierte /abc123.jpg en la dirección completa del póste
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  movieData = input.required<ModelMovie>(); // Recibo pelicula ( y muestro)
}
