import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundPage } from '../../not-found/not-found-page'; 
import { ModelMovie } from '../../../models/movie-detail-model';
import { ActorCard } from '../components/actor-card/actor-card'; 
@Component({
  imports: [NotFoundPage, RouterLink, ActorCard],
  selector: 'app-movie-detail-page',
  styleUrl: './movie-detail-page.css',
  templateUrl: './movie-detail-page.html',
})
export class MovieDetailPage implements OnInit {

  private route = inject(ActivatedRoute); // conoce la URL actual y los parámetros que vienen en ella (ej:id)
  id = signal<number | null>(null); // si no hay id valido null. 

movie = signal<ModelMovie>({
id: 603,
    title: 'Película de prueba',
    tagline: 'Una frase corta que resume el espíritu de la historia.',
    overview: 'Aquí va la sinopsis completa de la película para comprobar cómo se ve el bloque de texto en pantalla.',
    releaseDate: '1999-03-31',
    runtime: 136,
    rating: 8.7,
    poster: 'https://placehold.co/300x450?text=Poster',
    genres: [
      { id: 28, name: 'Acción' },
      { id: 878, name: 'Ciencia ficción' },
    ],
    directors: [
      { id: 9339, name: 'Lana Wachowski' },
      { id: 9340, name: 'Lilly Wachowski' },
    ],
    cast: [
      { id: 6384, name: 'Keanu Reeves', character: 'Neo', photo: null },
      { id: 2975, name: 'Laurence Fishburne', character: 'Morpheus', photo: null },
      { id: 530, name: 'Carrie-Anne Moss', character: 'Trinity', photo: null },
    ],
    trailerKey: null,
    platforms: [],
  });

  ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const rawId = params.get('id'); // saca de la url lo que corresponde a id.
    const numericId = Number(rawId); // intenta transformar texto en num real.


    // Comprobamos que rawId no esté vacío y que numericId sea un entero positivo (ej. 603)
    if (rawId && Number.isInteger(numericId) && numericId > 0) {
      this.id.set(numericId); //guardo resultado en la signal id.
    } else {
      this.id.set(null); // null = app-not-found-page
    }
  });
}
}
