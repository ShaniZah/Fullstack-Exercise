import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => {
      return import(`./login/login.component`).then((m) => m.LoginComponent);
    },
    canActivate: [loginRedirectGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return import(`./dashboard/dashboard.component`).then(
        (m) => m.DashboardComponent
      );
    },
    canActivate: [authGuard],
  },
];
