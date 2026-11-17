import { Routes } from '@angular/router';
import { MoviesPage } from './features/movies/movies-page';
import { HomePage } from './features/home/home-page';
import { FavoritesPage } from './features/favorites/favorites-page';
import { ProfilePage } from './features/profile/profile-page';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'movies', component: MoviesPage},
    {path: 'favorites', component: FavoritesPage},
    {path: 'profile', component: ProfilePage}
];
