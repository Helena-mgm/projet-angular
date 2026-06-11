import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tracks', pathMatch: 'full' }, // D1R2T3
  {
    path: 'tracks',
    loadComponent: () => import('./track-search/track-search').then((m) => m.TrackSearch),
  },
  {
    path: 'tracks/new',
    canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm),
  },
  {
    path: 'tracks/:id', // R5O6U7
    loadComponent: () => import('./track-detail/track-detail').then((m) => m.TrackDetail),
  },
  {
    path: 'tracks/:id/edit',
    canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm),
  },
  {
    path: 'login', // L4G5N6
    loadComponent: () => import('./auth-login/auth-login').then((m) => m.AuthLogin),
  },
];
