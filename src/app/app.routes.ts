import { Routes } from '@angular/router';
import { MoviesPage } from './features/movies/movies-page';
import { HomePage } from './features/home/home-page';
import { FavoritesPage } from './features/favorites/favorites-page';
import { ProfilePage } from './features/profile/profile-page';
import { Register } from './features/auth/components/register/register';
import { MovieDetailPage } from './features/movies/movie-detail-page/movie-detail-page';
import { PersonDetailPage } from './features/people/person-detail-page';
import { NotFoundPage } from './features/not-found/not-found-page';
import { Login } from './features/auth/components/login/login';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { StatsPage } from './features/stats/stats-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'movies', component: MoviesPage },
  { path: 'movie/:id', component: MovieDetailPage, title: 'Detalle de película' }, // Aparece en la pestaña del navegador
  { path: 'person/:id', component: PersonDetailPage, title: 'Detalle de persona' }, //Aparece en la pestaña del navegador
  { path: 'register', component: Register, canActivate: [guestGuard], },
  { path: 'login', component: Login, canActivate: [guestGuard], },
  { path: 'favorites', component: FavoritesPage, canActivate: [authGuard], },
  { path: 'profile', component: ProfilePage, canActivate: [authGuard], },
  { path: 'stats', component: StatsPage, canActivate: [authGuard], title: 'Top 10 Comunidad' },

  { path: '**', component: NotFoundPage },
];