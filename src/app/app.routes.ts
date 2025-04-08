import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { guardGuard } from './guard.guard';

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
  },
  {
    path: 'dashboard',
    loadComponent: () => {
      return import(`./dashboard/dashboard.component`).then(
        (m) => m.DashboardComponent
      );
    },
    canActivate: [guardGuard],
  },
];
