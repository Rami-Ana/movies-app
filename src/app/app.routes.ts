import { Routes } from '@angular/router';
import { MoviesPage } from './features/movies/movies-page';
import { HomePage } from './features/home/home-page';
import { FavoritesPage } from './features/favorites/favorites-page';
import { ProfilePage } from './features/profile/profile-page';
import { Register } from './features/auth/components/register/register';
import {MovieDetailPage} from './features/movies/movie-detail-page';
import { PersonDetailPage } from './features/people/person-detail-page';
import { NotFoundPage } from './features/not-found/not-found-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'movies', component: MoviesPage },
  { path: 'movie/:id', component: MovieDetailPage, title: 'Detalle de película'}, // Aparece en la pestaña del navegador
  { path: 'person/:id', component: PersonDetailPage, title: 'Detalle de persona'}, //Aparece en la pestaña del navegador
  { path: 'favorites', component: FavoritesPage },
  { path: 'profile', component: ProfilePage },
  { path: 'register', component: Register },

  // Siempre al final: atrapa rutas que no existan (ej. /cualquier-cosa)
  { path: '**', component: NotFoundPage },
];