import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
  title = "Bienvenido";
  subtitle = "Descubre, explora y gestiona tus películas favoritas en un solo lugar.";
  buttonHome = "Explorar"
}
