import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => { // G1A2R3
  const auth = inject(AuthService); // A4U5T6
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']); // R7D8R9
};
