import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundPage } from '../../not-found/not-found-page';
import { ModelMovie } from '../../../models/movie-detail-model';
import { ActorCard } from '../components/actor-card/actor-card';
import { MovieService } from '../../../core/services/movie-service';
import { UserMoviesService } from '../../../core/services/user-movies-service';
import { ModelMovie as MovieSummaryModel } from '../../../models/movie-model';
import { AuthService } from '../../../core/services/auth-service';
import { forkJoin } from 'rxjs';
import { RatingInput } from '../../../shared/components/rating-input/rating-input';
import { CommunityRating } from '../../../shared/components/community-rating/community-rating';

@Component({
  imports: [NotFoundPage, RouterLink, ActorCard,RatingInput, CommunityRating],
  selector: 'app-movie-detail-page',
  styleUrl: './movie-detail-page.css',
  templateUrl: './movie-detail-page.html',
})
export class MovieDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private userMoviesService = inject(UserMoviesService);
  private authService = inject(AuthService);
  private titleService = inject(Title);
  private sanitizer = inject(DomSanitizer);

  id = signal<number | null>(null);
  movie = signal<ModelMovie | null>(null);
  showTrailer = signal<boolean>(false);

  isFavorite = signal<boolean>(false);
  isSavingFavorite = signal<boolean>(false);
  favoriteMessage = signal<string | null>(null);

  isLoading = signal<boolean>(false);
  notFound = signal<boolean>(false);
  error = signal<boolean>(false);

  readonly currentUser = this.authService.user;

  readonly ratingMovie = computed<MovieSummaryModel | null>(() => {
    const currentMovie = this.movie();
    return currentMovie ? this.toSummaryMovie(currentMovie) : null;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');
      const numericId = Number(rawId);

      this.showTrailer.set(false);
      this.movie.set(null);
      this.isFavorite.set(false);
      this.favoriteMessage.set(null);
      this.notFound.set(false);
      this.error.set(false);

      if (rawId && Number.isInteger(numericId) && numericId > 0) {
        this.id.set(numericId);
        this.loadMovie(numericId);
      } else {
        this.id.set(null);
        this.isLoading.set(false);
        this.notFound.set(true);
      }
    });
  }

  retry(): void {
    const currentId = this.id();
    if (currentId) {
      this.loadMovie(currentId);
    }
  }

  async onToggleFavorite(): Promise<void> {
    const currentMovie = this.movie();
    if (!currentMovie || this.isSavingFavorite()) {
      return;
    }

    if (!this.currentUser()) {
      this.favoriteMessage.set('Inicia sesión para guardar películas en favoritos.');
      return;
    }

    this.favoriteMessage.set(null);
    this.isSavingFavorite.set(true);

try {
      const nextFavoriteState = !this.isFavorite();
      const movieData = this.toSummaryMovie(currentMovie);

      await this.userMoviesService.save(movieData, { isFavorite: nextFavoriteState });
      this.isFavorite.set(nextFavoriteState);
    } catch (err) {
      console.error('Error al actualizar favorito:', err);
      this.favoriteMessage.set('No se pudo actualizar el favorito. Inténtalo de nuevo.');
    } finally {
      this.isSavingFavorite.set(false);
    }
  }

  private toSummaryMovie(currentMovie: ModelMovie): MovieSummaryModel {
    return {
      id: currentMovie.id,
      title: currentMovie.title,
      poster_path: currentMovie.poster
        ? currentMovie.poster.replace('https://image.tmdb.org/t/p/w500', '')
        : null,
      release_date: currentMovie.releaseDate ?? '',
      vote_average: currentMovie.rating ?? 0,
      popularity: 0,
      overview: currentMovie.overview ?? '',
      genre_ids: currentMovie.genres.map((g) => g.id),
    };
  }

  private async checkFavoriteStatus(numericId: number): Promise<void> {
    try {
      const fav = this.userMoviesService.isFavorite(numericId);
      this.isFavorite.set(fav);
    } catch (err) {
      console.error('Error al comprobar favorito:', err);
      this.isFavorite.set(false);
    }
  }

  private loadMovie(numericId: number): void {
    this.isLoading.set(true);
    this.notFound.set(false);
    this.error.set(false);

    forkJoin({
      details: this.movieService.getMovieDetails (numericId),
      credits: this.movieService.getMovieCredits(numericId),
      videos: this.movieService.getMovieVideos(numericId),
      platforms: this.movieService.getMoviePlatforms(numericId),
    }).subscribe({
      next: async (respuesta) => {
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
        this.isLoading.set(false);

        await this.checkFavoriteStatus(numericId);
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
        this.isLoading.set(false);

        if (err?.status === 404) {
          this.notFound.set(true);
        } else {
          this.error.set(true);
        }
      },
    });
  }

  getSafeTrailerUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${key}`,
    );
  }
}