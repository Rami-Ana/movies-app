import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-header-component',
  styleUrl: './header-component.css',
  templateUrl: './header-component.html',
})
export class HeaderComponent {

}
