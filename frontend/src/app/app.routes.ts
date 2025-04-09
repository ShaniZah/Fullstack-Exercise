import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { appRoutes } from './consts';

export const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.login,
    pathMatch: 'full',
  },
  {
    path: appRoutes.login,
    pathMatch: 'full',
    loadComponent: () => {
      return import(`./login/login.component`).then((m) => m.LoginComponent);
    },
    canActivate: [loginRedirectGuard],
  },
  {
    path: appRoutes.root,
    loadComponent: () => {
      return import(`./root/root.component`).then((m) => m.RootComponent);
    },
    children: [
      {
        path: appRoutes.dashboard,
        loadComponent: () => {
          return import(`./dashboard/dashboard.component`).then(
            (m) => m.DashboardComponent
          );
        },
      },
      {
        path: appRoutes.reports,
        loadComponent: () => {
          return import(`./report/report.component`).then(
            (m) => m.ReportComponent
          );
        },
      },
      {
        path: appRoutes.runningHistory,
        loadComponent: () => {
          return import(`./upload/upload.component`).then(
            (m) => m.UploadComponent
          );
        },
      },
    ],
    canActivate: [authGuard],
  },
];
