import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink], // enlace para movies
  selector: 'app-not-found-page',
  styleUrl: './not-found-page.css',
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
