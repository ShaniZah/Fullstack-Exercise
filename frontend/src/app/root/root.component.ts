import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { appRoutes } from '../consts';
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
