import { Component } from '@angular/core';
import { MovieGallery } from './components/movie-gallery/movie-gallery';
import { SearchBar } from './components/search-bar/search-bar';
@Component({
  imports: [MovieGallery, SearchBar],
  selector: 'app-movies-page',
  styleUrl: './movies-page.css',
  templateUrl: './movies-page.html',
})
export class MoviesPage { }
