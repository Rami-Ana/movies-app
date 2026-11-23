import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Actor } from '../../../../models/movie-detail-model';
@Component({
  imports: [RouterLink],
  selector: 'app-actor-card',
  styleUrl: './actor-card.css',
  templateUrl: './actor-card.html',
})
export class ActorCard {
  actor = input.required<Actor>();
}
