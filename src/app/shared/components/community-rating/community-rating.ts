import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MovieStatsService } from '../../../core/services/movie-stats-service';
import { MovieStatsModel } from '../../../models/movie-stats-model';

@Component({
  imports: [],
  selector: 'app-community-rating',
  styleUrl: './community-rating.css',
  templateUrl: './community-rating.html',
})
export class CommunityRating implements OnInit {
  private movieStatsService = inject(MovieStatsService);

  movieId = input.required<number>();
  stats = signal<MovieStatsModel | null>(null);

  async ngOnInit() {
    this.stats.set(
      (await this.movieStatsService.getStats(this.movieId())) as MovieStatsModel | null,
    );
  }
}