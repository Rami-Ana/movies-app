import { Component } from '@angular/core';
import { MovieGallery } from './components/movie-gallery/movie-gallery';

@Component({
  imports: [MovieGallery],
  selector: 'app-movies-page',
  styleUrl: './movies-page.css',
  templateUrl: './movies-page.html',
})
export class MoviesPage {}
