import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotFoundPage } from '../not-found/not-found-page';
import { MovieService } from '../../core/services/movie-service';
import { ModelMovie } from '../../models/movie-model';
import { ModelPersonDetail } from '../../models/person-model';

@Component({
  imports: [NotFoundPage],
  selector: 'app-person-detail-page',
  styleUrl: './person-detail-page.css',
  templateUrl: './person-detail-page.html',
})
export class PersonDetailPage implements OnInit {
  private route = inject(ActivatedRoute); // traigo route para leer la url
  private movieService = inject(MovieService); // traigo para poder pedirle los datos a TMDB
  private titleService = inject(Title);

  id = signal<number | null>(null);
  person = signal<ModelPersonDetail | null>(null);
  castMovies = signal<ModelMovie[]>([]);
  directedMovies = signal<ModelMovie[]>([]);

  castLimit = signal<number>(20);
  directedLimit = signal<number>(20);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');
      const numericId = Number(rawId);

      // Comprobamos que rawId no esté vacío y que numericId sea un entero positivo (ej. 287)
      if (rawId && Number.isInteger(numericId) && numericId > 0) {
        this.id.set(numericId);
        this.castLimit.set(20);
        this.directedLimit.set(20);

        // Pedimos los datos de la persona
        this.movieService.getPersonDetails(numericId).subscribe((personData) => {
          this.person.set(personData);
          this.titleService.setTitle(`${personData.name} - Movies App`); // <-- Cambia el <title>
        });

        // Pedimos las películas de la persona (reparto y dirección)
        this.movieService.getPersonMovieCredits(numericId).subscribe((credits) => {
          const orderedCast = this.orderNewestFirst(credits.cast);
          this.castMovies.set(orderedCast);

          // filtramos y ordenamos las dirigidas
          const directed = credits.crew.filter((crewItem) => crewItem.job === 'Director');
          const orderedDirected = this.orderNewestFirst(directed);
          this.directedMovies.set(orderedDirected);
        });
      } else {
        this.id.set(null);
        this.person.set(null);
        this.castMovies.set([]);
        this.directedMovies.set([]);
      }
    });
  }

  showMoreCast(): void {
    this.castLimit.update((current) => current + 20);
  }

  showMoreDirected(): void {
    this.directedLimit.update((current) => current + 20);
  }

  private orderNewestFirst(movieList: ModelMovie[]): ModelMovie[] {
    return [...movieList].sort((firstMovie, secondMovie) => {
      const firstDate = firstMovie.release_date || '0000-00-00';
      const secondDate = secondMovie.release_date || '0000-00-00';

      if (secondDate > firstDate) return 1;
      if (secondDate < firstDate) return -1;
      return 0;
    });
  }
}