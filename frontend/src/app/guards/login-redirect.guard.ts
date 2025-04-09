import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { appRoutes } from '../consts';

export const loginRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.validateToken().pipe(
    map((isValid) => {
      if (isValid) {
        router.navigate([`/${appRoutes.dashboard}`]); //already logged in -> redirect
        return false;
      }
      return true; // not logged in -> allow access to /login
    }),
    catchError(() => of(true)) // assume not logged in on error
  );
};
