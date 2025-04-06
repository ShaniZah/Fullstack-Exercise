import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MaterialModules } from './material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MaterialModules,
    LoginComponent,
    DashboardComponent,
  ],
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet />`,
})
export class AppComponent {
  title = 'FullstackExercise';
}
