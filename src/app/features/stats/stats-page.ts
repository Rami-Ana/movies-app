import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieStatsService } from '../../core/services/movie-stats-service';
import { MovieStatsModel } from '../../models/movie-stats-model';

@Component({
  imports: [RouterLink],
  selector: 'app-stats-page',
  styleUrl: './stats-page.css',
  templateUrl: './stats-page.html',
})
export class StatsPage implements OnInit {
  private movieStatsService = inject(MovieStatsService);

  topMovies = signal<MovieStatsModel[]>([]);
  loading = signal(true);

  async ngOnInit() {
    const movies = await this.movieStatsService.getTopMovies(10);
    this.topMovies.set(movies);
    this.loading.set(false);
  }
}