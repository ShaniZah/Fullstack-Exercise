import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { appRoutes } from './consts';

export const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.login,
    pathMatch: 'full'
  },
  {
    path: appRoutes.login,
    pathMatch: 'full',
    loadComponent: () => {
      return import(`./login/login.component`).then((m) => m.LoginComponent);
    },
    canActivate: [loginRedirectGuard]
  },
  {
    path: appRoutes.dashboard,
    loadComponent: () => {
      return import(`./dashboard/dashboard.component`).then(
        (m) => m.DashboardComponent
      );
    },
    canActivate: [authGuard],
  },
];
