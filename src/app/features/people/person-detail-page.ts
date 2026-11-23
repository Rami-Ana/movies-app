import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotFoundPage } from '../not-found/not-found-page';
import { MovieService } from '../../core/services/movie-service';
import { ModelCastMovie, ModelCrewMovie, ModelPersonDetail } from '../../models/person-model';

@Component({
  imports: [NotFoundPage],
  selector: 'app-person-detail-page',
  styleUrl: './person-detail-page.css',
  templateUrl: './person-detail-page.html',
})
export class PersonDetailPage implements OnInit {
  private route = inject(ActivatedRoute); // traigo route para leer la url
  private movieService = inject(MovieService) // traigo para poder pedirle los datos a TMDB
  private titleService = inject(Title);

  id = signal<number | null>(null);
  person = signal<ModelPersonDetail | null>(null);
  castMovies = signal<ModelCastMovie[]>([]);
  directedMovies = signal<ModelCrewMovie[]>([]);

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');
      const numericId = Number(rawId);

      // Comprobamos que rawId no esté vacío y que numericId sea un entero positivo (ej. 287)
      if (rawId && Number.isInteger(numericId) && numericId > 0) {
        this.id.set(numericId);
        //  Pedimos los datos de la persona
        this.movieService.getPersonDetails(numericId).subscribe((personData) => {
          this.person.set(personData);
          this.titleService.setTitle(`${personData.name} - Movies App`); // <--  Cambia el <title>
        });

        //  Pedimos las películas de la persona (reparto y dirección)
        this.movieService.getPersonMovieCredits(numericId).subscribe((credits) => {
          this.castMovies.set(credits.cast);
          //filtramos
          const directed = credits.crew.filter((crewItem) => crewItem.job === 'Director');
          this.directedMovies.set(directed);
        });
      } else {
        this.id.set(null);
        this.person.set(null);
        this.castMovies.set([]);
        this.directedMovies.set([]);
      }
    });
  }
}