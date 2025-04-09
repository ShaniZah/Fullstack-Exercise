import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { appRoutes } from '../consts';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    map((isValid) => {
      if (isValid) {
        return true;
      } else {
        router.navigate([`/${appRoutes.login}`]);
        return false;
      }
    }),
    catchError(() => {
      router.navigate([`/${appRoutes.login}`]);
      return of(false);
    })
  );
};
