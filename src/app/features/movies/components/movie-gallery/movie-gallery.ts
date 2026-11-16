import { Component, inject, signal  } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie-service';
import { ActivatedRoute } from '@angular/router';
import { ModelMovie } from '../../../../models/movie-model';


@Component({
  imports: [MovieCard],
  selector: 'app-movie-gallery',
  styleUrl: './movie-gallery.css',
  templateUrl: './movie-gallery.html',
})
export class MovieGallery {
  private movieService = inject(MovieService); // trae peliculas
  private route = inject(ActivatedRoute) // conoce la direccion de la pagina

    movies = signal<ModelMovie[]>([]);
  query = signal('');
  
 constructor() {
    // Cada vez que cambia la dirección (?q=...), guarda el texto y carga películas
    this.route.queryParamMap.subscribe((params) => {
      this.query.set((params.get('q') ?? '').trim());
      this.loadMovies();
    });
  }
   private loadMovies() {
    // Menos de 2 letras: populares. 2 o +: busqueda
    const request =
      this.query().length < 2
        ? this.movieService.getPopularMovies()
        : this.movieService.searchMovies(this.query());

    // Cuando lleguen las películas, guardalas para que el HTML las muestre
    request.subscribe((response) => this.movies.set(response.results));
  }
}
