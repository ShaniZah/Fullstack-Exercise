import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { appRoutes, RouteKeys } from '../consts';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  route(route: RouteKeys) {
    this.router.navigate([appRoutes.root, appRoutes[route]]);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate([`/${appRoutes.login}`]),
      error: (err) => console.error('Logout failed', err),
    });
  }
}
