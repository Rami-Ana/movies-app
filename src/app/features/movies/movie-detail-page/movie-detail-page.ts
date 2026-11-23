import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
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
  private sanitizer = inject(DomSanitizer); // permite marcar como segura la URL del iframe de YouTube

  id = signal<number | null>(null); // si no hay id valido null.

  movie = signal<ModelMovie | null>(null);
  showTrailer = signal<boolean>(false); // indica si se muestra el iframe del tráiler

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id'); // saca de la url lo que corresponde a id.
      const numericId = Number(rawId); // intenta transformar texto en num real.
      this.showTrailer.set(false); // oculta el tráiler al cambiar de película

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
            const directors = respuesta.credits.crew
              .filter((persona) => persona.job === 'Director')
              .map((director) => ({
                id: director.id,
                name: director.name,
              }));

            const actors = respuesta.credits.cast.slice(0, 12).map((actor) => ({
              id: actor.id,
              name: actor.name,
              character: actor.character,
              photo: actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : null,
            }));

            const trailer =
              respuesta.videos.results.find(
                (video) => video.site === 'YouTube' && video.type === 'Trailer',
              ) ?? respuesta.videos.results.find((video) => video.site === 'YouTube');

            const flatratePlatforms = respuesta.platforms.results['ES']?.flatrate ?? [];
            const platforms = flatratePlatforms.map((item) => ({
              id: item.provider_id,
              name: item.provider_name,
              logo: item.logo_path
                ? `https://image.tmdb.org/t/p/w92${item.logo_path}`
                : null,
            }));

            this.movie.set({
              id: respuesta.details.id,
              title: respuesta.details.title,
              tagline: respuesta.details.tagline,
              overview: respuesta.details.overview,
              releaseDate: respuesta.details.release_date,
              runtime: respuesta.details.runtime,
              rating: respuesta.details.vote_average,
              poster: respuesta.details.poster_path
                ? `https://image.tmdb.org/t/p/w500${respuesta.details.poster_path}`
                : null,
              genres: respuesta.details.genres,
              directors,
              cast: actors,
              trailerKey: trailer ? trailer.key : null,
              platforms,
            });

            this.titleService.setTitle(`${respuesta.details.title} | MoviesApp`);
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

  getSafeTrailerUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${key}`,
    );
  }
}