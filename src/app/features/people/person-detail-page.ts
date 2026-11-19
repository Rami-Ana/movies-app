import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotFoundPage } from '../not-found/not-found-page';

@Component({
  imports: [NotFoundPage],
  selector: 'app-person-detail-page',
  styleUrl: './person-detail-page.css',
  templateUrl: './person-detail-page.html',
})
export class PersonDetailPage implements OnInit {
  private route = inject(ActivatedRoute);

  id = signal<number | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const rawId = params.get('id');
      const numericId = Number(rawId);

      // Comprobamos que rawId no esté vacío y que numericId sea un entero positivo (ej. 287)
      if (rawId && Number.isInteger(numericId) && numericId > 0) {
        this.id.set(numericId);
      } else {
        this.id.set(null);
      }
    });
  }
}