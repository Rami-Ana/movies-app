import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotFoundPage } from '../not-found/not-found-page';

@Component({
  imports: [NotFoundPage],
  selector: 'app-movie-detail-page',
  styleUrl: './movie-detail-page.css',
  templateUrl: './movie-detail-page.html',
})
export class MovieDetailPage implements OnInit {

  private route = inject(ActivatedRoute); // conoce la URL actual y los parámetros que vienen en ella (ej:id)
  id = signal<number | null>(null); // si no hay id valido null. 

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
