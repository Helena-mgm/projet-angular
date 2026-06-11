// interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.status === 0
          ? 'Serveur injoignable'
          : error.error?.message ?? 'Une erreur est survenue';

      console.error(`[HTTP ${error.status}] ${message}`);

      if (error.status === 401) {
        try {
          const auth = inject(AuthService);
          const router = inject(Router);
          auth.logout();
          router.navigate(['/login']);
        } catch (e) {
          console.error('Error while handling 401', e);
        }
      }

      return throwError(() => error);
    }),
  );
};