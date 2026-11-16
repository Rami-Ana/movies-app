import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  imports: [],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private router = inject(Router)

  startSearch(text: string) {
    this.router.navigate(['/movies'], { queryParams: { q: text || null } })
}
}
