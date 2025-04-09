import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { appRoutes, RouteKeys } from '../consts';
import { AuthService } from '../services/auth.service';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent implements OnInit {
  constructor(private route: Router) {}
  ngOnInit(): void {
    this.route.navigate([appRoutes.root, appRoutes.dashboard]);
  }
}
