import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundPage } from '../../not-found/not-found-page';
import { ModelMovie } from '../../../models/movie-detail-model';
import { ActorCard } from '../components/actor-card/actor-card';
import { MovieService } from '../../../core/services/movie-service';
import { forkJoin } from 'rxjs';

@Component({
  imports: [NotFoundPage, RouterLink, ActorCard],
  selector: 'app-movie-detail-page',
  styleUrl: './movie-detail-page.css',
  templateUrl: './movie-detail-page.html',
})
export class MovieDetailPage implements OnInit {
  private route = inject(ActivatedRoute); // conoce la URL actual y los parámetros que vienen en ella (ej:id)
  private movieService = inject(MovieService);
  private titleService = inject(Title);
  
  id = signal<number | null>(null); // si no hay id valido null.

  movie = signal<ModelMovie | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id'); // saca de la url lo que corresponde a id.
      const numericId = Number(rawId); // intenta transformar texto en num real.

      // Comprobamos que rawId no esté vacío y que numericId sea un entero positivo (ej. 603)
      if (rawId && Number.isInteger(numericId) && numericId > 0) {
        this.id.set(numericId); //guardo resultado en la signal id.

        forkJoin({
          details: this.movieService.getMovieDetails(numericId),
          credits: this.movieService.getMovieCredits(numericId),
          videos: this.movieService.getMovieVideos(numericId),
          platforms: this.movieService.getMoviePlatforms(numericId),
        }).subscribe({
          next: (respuesta) => {
            console.log('Todo junto:', respuesta);
          },
          error: (err) => {
            console.error('Error al cargar los datos:', err);
          },
        });
      } else {
        this.id.set(null); // null = app-not-found-page
      }
    });
  }
}